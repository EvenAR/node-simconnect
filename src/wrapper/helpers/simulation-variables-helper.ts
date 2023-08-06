import { ApiHelperError, SimConnectApiHelper } from './sim-connect-api-helper';
import {
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
    DataRequestFlag,
    RawBuffer,
    SimObjectType,
    SimConnectException,
    JavascriptDataType,
} from '../../core';

export type SimvarCallback<T extends VariablesToGet> = (data: VariablesResponse<T>) => void;
export type ErrorCallback = (err: ApiHelperError) => void;

type SimulationVariable = {
    /** This should match the data type in the SimConnect documentation */
    dataType: SimConnectDataType;
    /** The unit (like "degrees", "meter", "radians", etc). See {@link https://docs.flightsimulator.com/html/Programming_Tools/SimVars/Simulation_Variable_Units.htm} */
    units?: string | null;
    /** When `onlyOnChange` on used, this can be used to tell how much the value needs to change before the updated value is sent */
    epsilon?: number;
};

type VariablesToSet = {
    [simulationVariableName: string]: SimulationVariable & {
        value: JavascriptDataType[SimulationVariable['dataType']];
    };
};

type VariablesToGet = {
    [simulationVariableName: string]: SimulationVariable;
};

type VariablesResponse<R extends VariablesToGet> = {
    [K in keyof R]: JavascriptDataType[R[K]['dataType']];
};

type VariablesSetOptions<T extends VariablesToSet> = {
    /** The simulation variables to set */
    variables: T;
    onError?: (err: ApiHelperError) => void;
    simObjectId?: number;
};

type VariablesGetOptions<T extends VariablesToGet> = {
    variables: T;
    simObjectId?: number;
};

type ObserveOptions<T extends VariablesToGet> = {
    /** Requested simulation variables */
    simulationVariables: T;
    /** Called whenever data is received from SimConnect */
    onData: SimvarCallback<T>;
    /** Called if an error occured */
    onError?: ErrorCallback;
};

type ObjectObserveOptions<T extends VariablesToGet> = ObserveOptions<T> & {
    /** The sim object ID (defaults to 0 = the user's aircraft) */
    simObjectId?: number;
    /** How often should the simulation variables be read */
    updateRate?: SimConnectPeriod;
    /** Used to specify that only data should be sent when one of the simulation variables has changed */
    onlyOnChange?: boolean;
};

type ObjectsObserveOptions<T extends VariablesToGet> = ObserveOptions<T> & {
    /** The type of objects to observe */
    type: SimObjectType;
    /** The radius around the user's aircraft to observe */
    radiusMeters: number;
};

export class SimulationVariablesHelper extends SimConnectApiHelper {
    /**
     * Request a set of simulation variables once
     */
    async getValues<T extends VariablesToGet>(
        options: VariablesGetOptions<T>
    ): Promise<VariablesResponse<T>> {
        return new Promise((resolve, reject) => {
            let hasFailed = false;
            const sub = this._makeSubscription({
                requestStructure: options.variables,
                simObjectId: options.simObjectId || SimConnectConstants.OBJECT_ID_USER,
                period: SimConnectPeriod.ONCE,
                onError: error => {
                    hasFailed = true;
                    reject(error);
                    this._handle.clearDataDefinition(sub.defineId);
                },
            });
            this._handle.once('simObjectData', recvSimObjectData => {
                if (
                    !hasFailed &&
                    sub.requestId === recvSimObjectData.requestID &&
                    sub.defineId === recvSimObjectData.defineID
                ) {
                    resolve(
                        extractDataStructureFromBuffer(options.variables, recvSimObjectData.data)
                    );
                    this._handle.clearDataDefinition(sub.defineId);
                }
            });
        });
    }

    /**
     * Update a set of simulation variables
     */
    updateValues<T extends VariablesToSet>(options: VariablesSetOptions<T>) {
        const defineId = this._createDataDefinition(
            options.variables,
            error => options.onError && options.onError(error)
        );
        const rawBuffer = new RawBuffer(0);

        Object.keys(options.variables).forEach(name => {
            rawBuffer.writeSimConnectValue(
                options.variables[name].value,
                options.variables[name].dataType
            );
        });

        const sendId = this._handle.setDataOnSimObject(
            defineId,
            options.simObjectId || SimConnectConstants.OBJECT_ID_USER,
            {
                buffer: rawBuffer,
                arrayCount: 0,
                tagged: false,
            }
        );

        this._checkForException(sendId, ex => {
            if (options.onError) {
                options.onError({
                    message: `Failed to set data on sim object: ${SimConnectException[ex]}`,
                    exception: ex,
                });
            }
        });

        this._handle.clearDataDefinition(defineId);
    }

    /**
     * Continuously read a set of simulation variables
     */
    observe<T extends VariablesToGet>(options: ObjectObserveOptions<T>) {
        let hasFailed = false;
        const sub = this._makeSubscription({
            requestStructure: options.simulationVariables,
            simObjectId: options.simObjectId || SimConnectConstants.OBJECT_ID_USER,
            period: options.updateRate || SimConnectPeriod.SIM_FRAME,
            flags: options.onlyOnChange ? DataRequestFlag.DATA_REQUEST_FLAG_CHANGED : 0,
            onError: err => {
                hasFailed = true;
                if (options.onError) options.onError(err);
                this._handle.clearDataDefinition(sub.defineId);
            },
        });

        this._handle.on('simObjectData', recvSimObjectData => {
            if (
                !hasFailed &&
                sub.requestId === recvSimObjectData.requestID &&
                sub.defineId === recvSimObjectData.defineID
            ) {
                options.onData(
                    extractDataStructureFromBuffer(
                        options.simulationVariables,
                        recvSimObjectData.data
                    )
                );
            }
        });
    }

    /**
     * Read simulation variables for a certain object type
     */
    observeObjects<T extends VariablesToGet>(options: ObjectsObserveOptions<T>) {
        const sub = this._makeSubscriptionByType({
            requestStructure: options.simulationVariables,
            radiusMeters: options.radiusMeters,
            type: options.type,
            onError: err => options.onError && options.onError(err),
        });

        this._handle.on('simObjectDataByType', recvSimObjectData => {
            if (
                sub.requestId === recvSimObjectData.requestID &&
                sub.defineId === recvSimObjectData.defineID
            ) {
                options.onData(
                    extractDataStructureFromBuffer(
                        options.simulationVariables,
                        recvSimObjectData.data
                    )
                );
                // this._handle.clearDataDefinition(sub.defineId);
            }
        });
    }

    private _makeSubscription<T extends VariablesToGet>(params: {
        requestStructure: T;
        period: SimConnectPeriod;
        simObjectId: number;
        flags?: number;
        onError: (error: ApiHelperError) => void;
    }): { defineId: number; requestId: number } {
        const defineId = this._createDataDefinition(params.requestStructure, params.onError);
        const requestId = this._handle.idFactory.nextDataRequestId;

        const sendId = this._handle.requestDataOnSimObject(
            requestId,
            defineId,
            params.simObjectId,
            params.period,
            DataRequestFlag.DATA_REQUEST_FLAG_DEFAULT | (params.flags || 0)
        );

        this._checkForException(sendId, ex =>
            params.onError({
                message: `Failed to request data for sim object: ${SimConnectException[ex]}`,
                exception: ex,
            })
        );

        return { requestId, defineId };
    }

    private _makeSubscriptionByType<T extends VariablesToGet>(params: {
        requestStructure: T;
        radiusMeters: number;
        type: SimObjectType;
        onError: (error: ApiHelperError) => void;
    }): { defineId: number; requestId: number } {
        const requestId = this._handle.idFactory.nextDataRequestId;

        const defineId = this._createDataDefinition(params.requestStructure, params.onError);

        const sendId = this._handle.requestDataOnSimObjectType(
            requestId,
            defineId,
            params.radiusMeters,
            params.type
        );

        this._checkForException(sendId, ex =>
            params.onError({
                message: `Failed to request data for sim object type: ${SimConnectException[ex]}`,
                exception: ex,
            })
        );

        return { requestId, defineId };
    }

    private _createDataDefinition<T extends VariablesToGet>(
        requestStructure: T,
        onError: (error: ApiHelperError) => void
    ): number {
        const defineId = this._handle.idFactory.nextDataRequestId;

        /**
         * We register the simulation variables in reverse order, so we receive them in the same order
         * that they were defined in the requestStructure (because the result looks more professional).
         */
        const variableNames = Object.keys(requestStructure)
            .reverse()
            .map(name => name.replace(/_/g, ' '));
        const variableDefinitions = Object.values(requestStructure).reverse();

        variableDefinitions.forEach((requestedValue, index) => {
            const sendId = this._handle.addToDataDefinition(
                defineId,
                variableNames[index],
                requestedValue.units || null,
                requestedValue.dataType,
                requestedValue.epsilon
            );
            this._checkForException(sendId, ex =>
                onError({
                    message: `Something is wrong with the definition of '${variableNames[index]}': ${SimConnectException[ex]}`,
                    exception: ex,
                })
            );
        });

        return defineId;
    }
}

function extractDataStructureFromBuffer<T extends VariablesToGet>(
    requestStructure: T,
    rawBuffer: RawBuffer
) {
    return Object.keys(requestStructure)
        .reverse() // Reverse to get the same order as requested order
        .reduce(
            (result, variableName) => ({
                [variableName]: rawBuffer.readSimConnectValue(
                    requestStructure[variableName].dataType
                ),
                ...result,
            }),
            {} as VariablesResponse<T>
        );
}
