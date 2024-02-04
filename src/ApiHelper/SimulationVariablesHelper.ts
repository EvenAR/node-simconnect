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
import { simvarPredefinitions, SimvarPredefinitions } from '../../generated/simvars';

export type SimConnectError = {
    message: string;
    exception: SimConnectException;
};

type RequestedSimulationVariable = CustomSimulationVariableRequest | keyof SimvarPredefinitions;

/**
 * Used for requesting a simulation variable that is not predefined, or for requesting a predefined variable with different units.
 */
type CustomSimulationVariableRequest = {
    name: string;
    units: string | null;
    dataType: SimConnectDataType;
    epsilon?: number;
};

/**
 * A callback for when subscription data is received
 */
export type SimvarCallback<A extends RequestedSimulationVariable> = (
    err: SimConnectError | null,
    data: VariablesResponse<A> | null
) => void;

/**
 * The output object structure when requesting multiple simulation variables
 */
type VariablesResponse<T extends RequestedSimulationVariable> = {
    [U in T as SimulationVariableName<U>]: SimulationVariableType<U>;
};

/**
 * The output type of the requested simulation variable
 */
type SimulationVariableType<Var extends RequestedSimulationVariable> =
    Var extends keyof SimvarPredefinitions
        ? JavascriptDataType[SimvarPredefinitions[Var] extends {
              dataType: infer D extends keyof JavascriptDataType;
          }
              ? D
              : never]
        : Var extends CustomSimulationVariableRequest
          ? JavascriptDataType[Var['dataType']]
          : never;

/**
 * The name of the requested simulation variable
 */
type SimulationVariableName<T extends RequestedSimulationVariable> =
    T extends keyof SimvarPredefinitions
        ? T
        : T extends CustomSimulationVariableRequest
          ? T['name']
          : never;

type VariablesToSet<T extends keyof SimvarPredefinitions> = {
    [propName in T]: JavascriptDataType[(typeof simvarPredefinitions)[propName]['dataType']];
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
     * Read a simulation variable once
     * @param simulationVariable The variable to retrieve
     * @param simObjectId Defaults to the user's aircraft
     */
    async get<T extends RequestedSimulationVariable>(
        simulationVariable: T,
        simObjectId: number = SimConnectConstants.OBJECT_ID_USER
    ) {
        return this.getAll([simulationVariable], simObjectId).then(
            data => Object.values(data)[0] as SimulationVariableType<T>
        );
    }

    /**
     * Read a set of simulation variables once
     * @param simulationVariables The variables to retrieve
     * @param simObjectId Defaults to the user's aircraft
     */
    async getAll<const T extends RequestedSimulationVariable>(
        simulationVariables: T[],
        simObjectId: number = SimConnectConstants.OBJECT_ID_USER
    ): Promise<VariablesResponse<T>> {
        return new Promise((resolve, reject) => {
            let hasFailed = false;
            const simulationVariableRequests = simulationVariables.map(
                toStandardizedSimulationVariableRequest
            );

            const sub = this._makeSubscription({
                simulationVariableRequests,
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
                        extractVariablesFromBuffer(simulationVariables, recvSimObjectData.data)
                    );
                    this._handle.clearDataDefinition(sub.defineId);
                }
            });
        });
    }

    /**
     * Updates a set of simulation variables
     * @param variablesToSet The variables to update
     * @param errorHandler Called in case of an error
     * @param simObjectId Defaults to the user's aircraft
     */
    set<T extends keyof SimvarPredefinitions>(
        variablesToSet: VariablesToSet<T>,
        errorHandler?: (err: SimConnectError) => void,
        simObjectId = SimConnectConstants.OBJECT_ID_USER
    ) {
        const vars = Object.keys(variablesToSet).map(name => simvarPredefinitions[name as T]);
        const values = Object.values(
            variablesToSet
        ) as JavascriptDataType[(typeof vars)[number]['dataType']][];

        const defineId = this._createDataDefinition2(
            vars,
            error => errorHandler && errorHandler(error)
        );
        const rawBuffer = new RawBuffer(0);

        vars.forEach((simvar, index) => {
            writeSimConnectValue(rawBuffer, values[index], simvar.dataType);
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
     * @param simulationVariables The variables to monitor
     * @param callback Called when the variables change
     * @param options Additional options
     * @param options.onlyOnChange If the callback should trigger only when a variable changes
     * @param options.simObjectId Defaults to the user's aircraft
     * @param {SimConnectPeriod} options.interval Defaults to SimConnectPeriod.SIM_FRAME
     */
    monitor<const T extends RequestedSimulationVariable>(
        simulationVariables: T[],
        callback: SimvarCallback<T>,
        options?: {
            onlyOnChange?: boolean;
            simObjectId?: number;
            interval?: SimConnectPeriod;
        }
    ) {
        const simulationVariableRequests = simulationVariables.map(
            toStandardizedSimulationVariableRequest
        );

        let hasFailed = false;

        const sub = this._makeSubscription({
            simulationVariableRequests,
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
                    extractVariablesFromBuffer(
                        simulationVariableRequests,
                        recvSimObjectData.data
                    ) as VariablesResponse<T>
                );
            }
        });
    }

    /**
     * Read simulation variables for a certain object type
     * @param type The type of object to monitor
     * @param radiusMeters Radius from user's aircraft
     * @param simulationVariables The variables to monitor
     * @param callback Called when the variables change
     */
    monitorObjects<const T extends RequestedSimulationVariable>(
        type: SimObjectType,
        radiusMeters: number,
        simulationVariables: T[],
        callback: SimvarCallback<T>
    ) {
        const sub = this._makeSubscriptionByType({
            simulationVariableRequests: simulationVariables.map(
                toStandardizedSimulationVariableRequest
            ),
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
                    extractVariablesFromBuffer(simulationVariables, recvSimObjectData.data)
                );
                // this._handle.clearDataDefinition(sub.defineId);
            }
        });
    }

    private _makeSubscription(params: {
        simulationVariableRequests: CustomSimulationVariableRequest[];
        period: SimConnectPeriod;
        simObjectId: number;
        flags?: number;
        errorHandler: (error: SimConnectError) => void;
    }): { defineId: number; requestId: number } {
        const defineId = this._createDataDefinition2(
            params.simulationVariableRequests,
            params.errorHandler
        );
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

    private _makeSubscriptionByType(params: {
        simulationVariableRequests: CustomSimulationVariableRequest[];
        radiusMeters: number;
        type: SimObjectType;
        errorHandler: (error: SimConnectError) => void;
    }): { defineId: number; requestId: number } {
        const requestId = this._nextDataRequestId++;

        const defineId = this._createDataDefinition2(
            params.simulationVariableRequests,
            params.errorHandler
        );

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

    private _createDataDefinition2<T extends CustomSimulationVariableRequest>(
        requestedSimvars: T[],
        errorHandler: (error: SimConnectError) => void
    ): number {
        const defineId = this._nextDataDefinitionId++;

        /**
         * We register the simulation variables in reverse order, so we receive them
         * in the same order that they were defined in the requestedSimvars list.
         */
        requestedSimvars.reverse().forEach(requestedValue => {
            const sendId = this._handle.addToDataDefinition(
                defineId,
                requestedValue.name,
                requestedValue.units,
                requestedValue.dataType,
                requestedValue.epsilon
            );
            this._checkForException(sendId, ex =>
                errorHandler({
                    message: `Something is wrong with the definition of '${requestedValue.name}': ${SimConnectException[ex]}`,
                    exception: ex,
                })
            );
        });

        return defineId;
    }
}

function extractVariablesFromBuffer<const T extends RequestedSimulationVariable>(
    requestedSimvars: T[],
    rawBuffer: RawBuffer
): VariablesResponse<T> {
    return requestedSimvars
        .map(toStandardizedSimulationVariableRequest)
        .reverse() // Reverse to get the same order as requested order
        .reduce(
            (result, simvar) => ({
                [simvar.name]: readSimConnectValue(rawBuffer, simvar.dataType),
                ...result,
            }),
            {} as VariablesResponse<T>
        );
}

function toStandardizedSimulationVariableRequest(
    simvar: RequestedSimulationVariable
): CustomSimulationVariableRequest {
    if (typeof simvar === 'string') {
        const predefinition = simvarPredefinitions[simvar as keyof SimvarPredefinitions];
        return {
            name: predefinition.name,
            units: predefinition.units,
            dataType: predefinition.dataType,
        };
    }
    if (simvar.name !== undefined && simvar.units !== undefined && simvar.dataType !== undefined) {
        return simvar;
    }
    throw new Error('Invalid simvar request');
}

export { SimulationVariablesHelper };
