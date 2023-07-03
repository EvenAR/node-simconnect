import { SimConnectConstants } from '../SimConnectConstants';
import { SimConnectDataType } from '../enums/SimConnectDataType';
import { SimConnectPeriod } from '../enums/SimConnectPeriod';
import { DataRequestFlag } from '../flags/DataRequestFlag';
import { SimConnectConnection } from '../SimConnectConnection';
import { RawBuffer } from '../RawBuffer';
import { SimObjectType } from '../enums/SimObjectType';
import { SimConnectException } from '../enums/SimConnectException';
import { BaseHelper } from './BaseHelper';
import { JavascriptDataType, readSimConnectValue, writeSimConnectValue } from './utils';

export type SimvarCallback<T extends VariablesToGet> = (
    err: SimConnectError | null,
    data: VariablesResponse<T> | null
) => void;

export type SimConnectError = {
    message: string;
    exception: SimConnectException;
};

class SimulationVariablesHelper extends BaseHelper {
    private _nextDataDefinitionId: number;

    private _nextDataRequestId: number;

    constructor(handle: SimConnectConnection) {
        super(handle);
        this._nextDataDefinitionId = 0;
        this._nextDataRequestId = 0;
    }

    /**
     * Read a set of simulation variables once
     * @param requestStructure
     * @param simObjectId
     */
    async request<T extends VariablesToGet>(
        requestStructure: T,
        simObjectId: number = SimConnectConstants.OBJECT_ID_USER
    ): Promise<VariablesResponse<T>> {
        return new Promise((resolve, reject) => {
            let hasFailed = false;
            const sub = this._makeSubscription({
                requestStructure,
                simObjectId,
                period: SimConnectPeriod.ONCE,
                errorHandler: error => {
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
                        extractDataStructureFromBuffer(requestStructure, recvSimObjectData.data)
                    );
                    this._handle.clearDataDefinition(sub.defineId);
                }
            });
        });
    }

    /**
     * Updates a set of simulation variables
     * @param variablesToSet
     * @param errorHandler Called in case of an error
     * @param simObjectId
     */
    set<T extends VariablesToSet>(
        variablesToSet: T,
        errorHandler?: (err: SimConnectError) => void,
        simObjectId = SimConnectConstants.OBJECT_ID_USER
    ) {
        const defineId = this._createDataDefinition(
            variablesToSet,
            error => errorHandler && errorHandler(error)
        );
        const rawBuffer = new RawBuffer(0);

        Object.keys(variablesToSet).forEach(name => {
            writeSimConnectValue(
                rawBuffer,
                variablesToSet[name].value,
                variablesToSet[name].dataType
            );
        });

        const sendId = this._handle.setDataOnSimObject(defineId, simObjectId, {
            buffer: rawBuffer,
            arrayCount: 0,
            tagged: false,
        });

        this._checkForException(sendId, ex => {
            if (errorHandler) {
                errorHandler({
                    message: `Failed to set data on sim object: ${SimConnectException[ex]}`,
                    exception: ex,
                });
            }
        });

        this._handle.clearDataDefinition(defineId);
    }

    /**
     * Continuously read a set of simulation variables
     * @param simulationVariables
     * @param callback
     * @param options
     * @param options.onlyOnChange If the callback should trigger only when one of the variables change
     * @param options.simObjectId Defaults to the user's aircraft
     * @param {SimConnectPeriod} options.interval
     */
    monitor<T extends VariablesToGet>(
        simulationVariables: T,
        callback: SimvarCallback<T>,
        options?: {
            onlyOnChange?: boolean;
            simObjectId?: number;
            interval?: SimConnectPeriod;
        }
    ) {
        let hasFailed = false;
        const sub = this._makeSubscription({
            requestStructure: simulationVariables,
            simObjectId: options?.simObjectId || SimConnectConstants.OBJECT_ID_USER,
            period: options?.interval || SimConnectPeriod.SIM_FRAME,
            flags: options?.onlyOnChange ? DataRequestFlag.DATA_REQUEST_FLAG_CHANGED : 0,
            errorHandler: err => {
                hasFailed = true;
                callback(err, null);
                this._handle.clearDataDefinition(sub.defineId);
            },
        });

        this._handle.on('simObjectData', recvSimObjectData => {
            if (
                !hasFailed &&
                sub.requestId === recvSimObjectData.requestID &&
                sub.defineId === recvSimObjectData.defineID
            ) {
                callback(
                    null,
                    extractDataStructureFromBuffer(simulationVariables, recvSimObjectData.data)
                );
            }
        });
    }

    /**
     * Read simulation variables for a certain object type
     * @param type
     * @param radiusMeters Radius from user's aircraft
     * @param simulationVariables
     * @param callback
     */
    monitorObjects<T extends VariablesToGet>(
        type: SimObjectType,
        radiusMeters: number,
        simulationVariables: T,
        callback: SimvarCallback<T>
    ) {
        const sub = this._makeSubscriptionByType({
            requestStructure: simulationVariables,
            radiusMeters,
            type,
            errorHandler: err => callback(err, null),
        });

        this._handle.on('simObjectDataByType', recvSimObjectData => {
            if (
                sub.requestId === recvSimObjectData.requestID &&
                sub.defineId === recvSimObjectData.defineID
            ) {
                callback(
                    null,
                    extractDataStructureFromBuffer(simulationVariables, recvSimObjectData.data)
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
        errorHandler: (error: SimConnectError) => void;
    }): { defineId: number; requestId: number } {
        const defineId = this._createDataDefinition(params.requestStructure, params.errorHandler);
        const requestId = this._nextDataRequestId++;

        const sendId = this._handle.requestDataOnSimObject(
            requestId,
            defineId,
            params.simObjectId,
            params.period,
            DataRequestFlag.DATA_REQUEST_FLAG_DEFAULT | (params.flags || 0)
        );

        this._checkForException(sendId, ex =>
            params.errorHandler({
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
        errorHandler: (error: SimConnectError) => void;
    }): { defineId: number; requestId: number } {
        const requestId = this._nextDataRequestId++;

        const defineId = this._createDataDefinition(params.requestStructure, params.errorHandler);

        const sendId = this._handle.requestDataOnSimObjectType(
            requestId,
            defineId,
            params.radiusMeters,
            params.type
        );

        this._checkForException(sendId, ex =>
            params.errorHandler({
                message: `Failed to request data for sim object type: ${SimConnectException[ex]}`,
                exception: ex,
            })
        );

        return { requestId, defineId };
    }

    private _createDataDefinition<T extends VariablesToGet>(
        requestStructure: T,
        errorHandler: (error: SimConnectError) => void
    ): number {
        const defineId = this._nextDataDefinitionId++;

        /**
         * We register the simulation variables in reverse order, so we receive them in the same order
         * that they were defined in the requestStructure (because the result looks more professional).
         */
        const variableNames = Object.keys(requestStructure).reverse();
        const variableDefinitions = Object.values(requestStructure).reverse();

        variableDefinitions.forEach((requestedValue, index) => {
            const sendId = this._handle.addToDataDefinition(
                defineId,
                variableNames[index],
                requestedValue.units,
                requestedValue.dataType,
                requestedValue.epsilon
            );
            this._checkForException(sendId, ex =>
                errorHandler({
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
                [variableName]: readSimConnectValue(
                    rawBuffer,
                    requestStructure[variableName].dataType
                ),
                ...result,
            }),
            {} as VariablesResponse<T>
        );
}

// Types:

type SimulationVariable = {
    units: string | null;
    dataType: SimConnectDataType;
    epsilon?: number;
};

type VariablesToSet = {
    [propName: string]: SimulationVariable & {
        value: JavascriptDataType[SimulationVariable['dataType']];
    };
};

type VariablesToGet = {
    [propName: string]: SimulationVariable;
};

type VariablesResponse<R extends VariablesToGet> = {
    [K in keyof R]: JavascriptDataType[R[K]['dataType']];
};

export { SimulationVariablesHelper };
