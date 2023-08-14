import { ApiHelperError, SimConnectApiHelper } from './sim-connect-api-helper';
import {
    DataRequestFlag,
    JavascriptDataType,
    RawBuffer,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectException,
    SimConnectPeriod,
    SimObjectType,
} from '../../core';

export type SimvarCallback<T extends SimulationVariable> = (data: VariablesResponse<T>) => void;

export type ErrorCallback = (err: ApiHelperError) => void;

export type SimulationVariable = {
    name: string;
    /** This should match the data type in the SimConnect documentation */
    dataType: SimConnectDataType;
    /** The unit (like "degrees", "meter", "radians", etc). See {@link https://docs.flightsimulator.com/html/Programming_Tools/SimVars/Simulation_Variable_Units.htm} */
    units?: string | null;
    /** When `changesOnly` on used, this can be used to tell how much the value needs to change before the updated value is sent */
    epsilon?: number;
};

type VariablesResponse<T extends SimulationVariable> = {
    [K in T['name']]: JavascriptDataType[T['dataType']];
};

type VariableToSet<T extends SimulationVariable> = T & {
    value: JavascriptDataType[T['dataType']];
};

type VariablesSetOptions<T extends SimulationVariable> = {
    /** The simulation variables to set */
    variables: VariableToSet<T>[];
    onError?: (err: ApiHelperError) => void;
    simObjectId?: number;
};

type VariablesGetOptions<T extends SimulationVariable> = {
    variables: T[];
    simObjectId?: number;
};

type ObserveOptions<T extends SimulationVariable> = {
    /** Requested simulation variables */
    simulationVariables: T[];
    /** Called whenever data is received from SimConnect */
    onData: SimvarCallback<T>;
    /** Called if an error occured */
    onError?: ErrorCallback;
};

type ObjectObserveOptions<T extends SimulationVariable> = ObserveOptions<T> & {
    /** The sim object ID (defaults to 0 = the user's aircraft) */
    simObjectId?: number;
    /** How often should the simulation variables be read */
    updateRate?: SimConnectPeriod;
    /** Used to specify that only data should be sent when one of the simulation variables has changed */
    changesOnly?: boolean;
};

type ObjectsObserveOptions<T extends SimulationVariable> = ObserveOptions<T> & {
    /** The type of objects to observe */
    type: SimObjectType;
    /** The radius around the user's aircraft to observe */
    radiusMeters: number;
};

export class SimulationVariablesHelper extends SimConnectApiHelper {
    /**
     * Request a set of simulation variables once
     */
    async getValues<const T extends SimulationVariable>(
        options: VariablesGetOptions<T>
    ): Promise<VariablesResponse<T>> {
        return new Promise((resolve, reject) => {
            let hasFailed = false;
            const sub = this._makeSubscription({
                simulationVariables: options.variables,
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
    updateValues<T extends SimulationVariable>(options: VariablesSetOptions<T>) {
        const defineId = this._createDataDefinition(
            options.variables,
            error => options.onError && options.onError(error)
        );
        const rawBuffer = new RawBuffer(0);

        options.variables.forEach(simVar => {
            rawBuffer.writeSimConnectValue(simVar.value, simVar.dataType);
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
    observe<const T extends SimulationVariable>(options: ObjectObserveOptions<T>) {
        let hasFailed = false;
        const sub = this._makeSubscription({
            simulationVariables: options.simulationVariables,
            simObjectId: options.simObjectId || SimConnectConstants.OBJECT_ID_USER,
            period: options.updateRate || SimConnectPeriod.SIM_FRAME,
            flags: options.changesOnly ? DataRequestFlag.DATA_REQUEST_FLAG_CHANGED : 0,
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
    observeObjects<T extends SimulationVariable>(options: ObjectsObserveOptions<T>) {
        const sub = this._makeSubscriptionByType({
            simulationVariables: options.simulationVariables,
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

    private _makeSubscription(params: {
        simulationVariables: SimulationVariable[];
        period: SimConnectPeriod;
        simObjectId: number;
        flags?: number;
        onError: (error: ApiHelperError) => void;
    }): { defineId: number; requestId: number } {
        const defineId = this._createDataDefinition(params.simulationVariables, params.onError);
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

    private _makeSubscriptionByType<T extends SimulationVariable>(params: {
        simulationVariables: T[];
        radiusMeters: number;
        type: SimObjectType;
        onError: (error: ApiHelperError) => void;
    }): { defineId: number; requestId: number } {
        const requestId = this._handle.idFactory.nextDataRequestId;

        const defineId = this._createDataDefinition(params.simulationVariables, params.onError);

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

    private _createDataDefinition<T extends SimulationVariable>(
        simulationVariables: T[],
        onError: (error: ApiHelperError) => void
    ): number {
        const defineId = this._handle.idFactory.nextDataRequestId;

        simulationVariables.forEach(requestedValue => {
            const varName = requestedValue.name.replace(/_/g, ' ');
            const sendId = this._handle.addToDataDefinition(
                defineId,
                varName,
                requestedValue.units || null,
                requestedValue.dataType,
                requestedValue.epsilon
            );
            this._checkForException(sendId, ex =>
                onError({
                    message: `Something is wrong with the definition of '${varName}': ${SimConnectException[ex]}`,
                    exception: ex,
                })
            );
        });

        return defineId;
    }
}

function extractDataStructureFromBuffer<T extends SimulationVariable>(
    requestedVariables: T[],
    rawBuffer: RawBuffer
) {
    return requestedVariables.reduce(
        (result, variable) => ({
            [variable.name]: rawBuffer.readSimConnectValue(variable.dataType),
            ...result,
        }),
        {} as VariablesResponse<T>
    );
}
