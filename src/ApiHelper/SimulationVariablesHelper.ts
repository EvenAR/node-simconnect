import { SimConnectConstants } from '../SimConnectConstants';
import { SimConnectDataType } from '../enums/SimConnectDataType';
import { SimConnectPeriod } from '../enums/SimConnectPeriod';
import { DataRequestFlag } from '../flags/DataRequestFlag';
import { SimConnectConnection } from '../SimConnectConnection';
import { RawBuffer } from '../RawBuffer';
import { SimObjectType } from '../enums/SimObjectType';
import { SimConnectException } from '../enums/SimConnectException';
import { SimConnectHelperBase } from './BaseHelper';
import { JavascriptDataType, readSimConnectValue, writeSimConnectValue } from './utils';
import { simvarPredefinitions, SimvarPredefinitions } from '../generated/simvars';

export type SimConnectError = {
    message: string;
    exception: SimConnectException;
};

type RequestedSimulationVariable =
    | CustomSimulationVariableRequest
    | keyof SimvarPredefinitions
    | `${IndexedSimvarKey}:${number}`;

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
        : Var extends `${infer Base}:${number}`
          ? Base extends keyof SimvarPredefinitions
              ? JavascriptDataType[SimvarPredefinitions[Base] extends {
                    dataType: infer D extends keyof JavascriptDataType;
                }
                    ? D
                    : never]
              : never
          : Var extends CustomSimulationVariableRequest
            ? JavascriptDataType[Var['dataType']]
            : never;

/**
 * The name of the requested simulation variable
 */
type SimulationVariableName<T extends RequestedSimulationVariable> =
    T extends keyof SimvarPredefinitions
        ? T
        : T extends `${string}:${number}`
          ? T
          : T extends CustomSimulationVariableRequest
            ? T['name']
            : never;

type SimvarValue<propName extends keyof SimvarPredefinitions> =
    JavascriptDataType[(typeof simvarPredefinitions)[propName]['dataType']];

type IndexedSimvarKey = keyof {
    [K in keyof SimvarPredefinitions as (typeof simvarPredefinitions)[K]['supportsIndex'] extends true
        ? K
        : never]: K;
};

type NonIndexedSimvarKey = keyof {
    [K in keyof SimvarPredefinitions as (typeof simvarPredefinitions)[K]['supportsIndex'] extends true
        ? never
        : K]: K;
};

type SetKey = `${IndexedSimvarKey}:${number}` | NonIndexedSimvarKey;

type SetValue<K extends SetKey> = K extends `${infer Base}:${number}`
    ? Base extends keyof SimvarPredefinitions
        ? SimvarValue<Base>
        : never
    : K extends NonIndexedSimvarKey
      ? SimvarValue<K>
      : never;

type VariablesToSet<T extends SetKey> = { [K in T]: SetValue<K> };

class SimulationVariablesHelper extends SimConnectHelperBase {
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
    set<T extends SetKey>(
        variablesToSet: VariablesToSet<T>,
        errorHandler?: (err: SimConnectError) => void,
        simObjectId = SimConnectConstants.OBJECT_ID_USER
    ) {
        const entries = Object.entries(variablesToSet) as [T, SetValue<T>][];

        const requests: CustomSimulationVariableRequest[] = entries.map(([key]) => {
            const colonIndex = key.lastIndexOf(':');
            const isColonSyntax = colonIndex !== -1 && /^\d+$/.test(key.slice(colonIndex + 1));
            const baseName = (
                isColonSyntax ? key.slice(0, colonIndex) : key
            ) as keyof SimvarPredefinitions;
            const predefined = simvarPredefinitions[baseName];
            return { name: key, units: predefined.units, dataType: predefined.dataType };
        });

        const rawValues = entries.map(([, val]) => val);

        const defineId = this._createDataDefinition(
            requests,
            error => errorHandler && errorHandler(error)
        );
        const rawBuffer = new RawBuffer(0);

        requests.forEach((request, i) => {
            if (rawValues[i] == undefined) {
                throw new Error(`Value for simvar '${request.name}' is undefined`);
            }
            writeSimConnectValue(
                rawBuffer,
                rawValues[i] as JavascriptDataType[typeof request.dataType],
                request.dataType
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
     * @param simulationVariables The variables to watch
     * @param onData Called when the variables change
     * @param options Additional options
     * @param options.onlyOnChange If the callback should trigger only when a variable changes
     * @param options.simObjectId Defaults to the user's aircraft
     * @param options.period Defaults to SimConnectPeriod.SIM_FRAME
     */
    watch<const T extends RequestedSimulationVariable>(
        simulationVariables: T[],
        onData: (simulationVariables: VariablesResponse<T>) => void,
        options?: {
            onlyOnChange?: boolean;
            simObjectId?: number;
            period?: SimConnectPeriod;
        }
    ) {
        const simulationVariableRequests = simulationVariables.map(
            toStandardizedSimulationVariableRequest
        );

        let hasFailed = false;

        const sub = this._makeSubscription({
            simulationVariableRequests,
            simObjectId: options?.simObjectId || SimConnectConstants.OBJECT_ID_USER,
            period: options?.period || SimConnectPeriod.SIM_FRAME,
            flags: options?.onlyOnChange ? DataRequestFlag.DATA_REQUEST_FLAG_CHANGED : 0,
            errorHandler: err => {
                hasFailed = true;
                this._handle.clearDataDefinition(sub.defineId);

                const simvarNames = simulationVariableRequests.map(varReq => varReq.name);

                throw new Error(
                    `SimConnect exception (${SimConnectException[err.exception]}) was thrown when trying to watch the following simvars: ${simvarNames}`
                );
            },
        });

        this._handle.on('simObjectData', recvSimObjectData => {
            if (
                !hasFailed &&
                sub.requestId === recvSimObjectData.requestID &&
                sub.defineId === recvSimObjectData.defineID
            ) {
                onData(
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
     * @param simobjectType The type of object to watch
     * @param radiusMeters Radius from user's aircraft
     * @param simulationVariables The variables to watch
     * @param onData Called when the variables change
     */
    watchObjects<const T extends RequestedSimulationVariable>(
        simobjectType: SimObjectType,
        radiusMeters: number,
        simulationVariables: T[],
        onData: (simulationVariables: VariablesResponse<T>) => void
    ) {
        const simulationVariableRequests = simulationVariables.map(
            toStandardizedSimulationVariableRequest
        );
        const sub = this._makeSubscriptionByType({
            simulationVariableRequests,
            radiusMeters,
            simobjectType,
            errorHandler: err => {
                const simvarNames = simulationVariableRequests.map(varReq => varReq.name);
                throw new Error(
                    `SimConnect exception (${SimConnectException[err.exception]}) was thrown when trying to watch the following simvars for object type ${SimObjectType[simobjectType]}: ${simvarNames}`
                );
            },
        });

        this._handle.on('simObjectDataByType', recvSimObjectData => {
            if (
                sub.requestId === recvSimObjectData.requestID &&
                sub.defineId === recvSimObjectData.defineID
            ) {
                onData(extractVariablesFromBuffer(simulationVariables, recvSimObjectData.data));
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
        const defineId = this._createDataDefinition(
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
        simobjectType: SimObjectType;
        errorHandler: (error: SimConnectError) => void;
    }): { defineId: number; requestId: number } {
        const requestId = this._nextDataRequestId++;

        const defineId = this._createDataDefinition(
            params.simulationVariableRequests,
            params.errorHandler
        );

        const sendId = this._handle.requestDataOnSimObjectType(
            requestId,
            defineId,
            params.radiusMeters,
            params.simobjectType
        );

        this._checkForException(sendId, ex =>
            params.errorHandler({
                message: `Failed to request data for sim object type: ${SimConnectException[ex]}`,
                exception: ex,
            })
        );

        return { requestId, defineId };
    }

    private _createDataDefinition<T extends CustomSimulationVariableRequest>(
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
    return requestedSimvars.map(toStandardizedSimulationVariableRequest).reduce(
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
        const colonIndex = simvar.lastIndexOf(':');
        const isColonSyntax = colonIndex !== -1 && /^\d+$/.test(simvar.slice(colonIndex + 1));
        const baseName = (
            isColonSyntax ? simvar.slice(0, colonIndex) : simvar
        ) as keyof SimvarPredefinitions;
        const predefinition = simvarPredefinitions[baseName];
        return {
            name: simvar,
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
