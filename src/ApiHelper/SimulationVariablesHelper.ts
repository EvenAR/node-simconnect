import { SimConnectConstants } from '../SimConnectConstants';
import { SimConnectDataType } from '../enums/SimConnectDataType';
import { SimConnectPeriod } from '../enums/SimConnectPeriod';
import { DataRequestFlag } from '../flags/DataRequestFlag';
import { SimConnectConnection } from '../SimConnectConnection';
import { RawBuffer } from '../RawBuffer';
import { SimObjectType } from '../enums/SimObjectType';
import { SimConnectException } from '../enums/SimConnectException';
import { BaseHelper } from './BaseHelper';
import {
    InitPosition,
    LatLonAlt,
    MarkerState,
    readInitPosition,
    readLatLonAlt,
    readMarkerState,
    readWaypoint,
    readXYZ,
    Waypoint,
    XYZ,
} from '../dto';

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

function readSimConnectValue<T extends SimConnectDataType>(
    rawBuffer: RawBuffer,
    dataType: T
): JavascriptDataType[T] {
    switch (dataType) {
        case SimConnectDataType.INVALID:
            return undefined as JavascriptDataType[T];
        case SimConnectDataType.INT32:
            return rawBuffer.readInt32() as JavascriptDataType[T];
        case SimConnectDataType.INT64:
            return rawBuffer.readInt64() as JavascriptDataType[T];
        case SimConnectDataType.FLOAT32:
            return rawBuffer.readFloat32() as JavascriptDataType[T];
        case SimConnectDataType.FLOAT64:
            return rawBuffer.readFloat64() as JavascriptDataType[T];
        case SimConnectDataType.STRING8:
            return rawBuffer.readString8() as JavascriptDataType[T];
        case SimConnectDataType.STRING32:
            return rawBuffer.readString32() as JavascriptDataType[T];
        case SimConnectDataType.STRING64:
            return rawBuffer.readString64() as JavascriptDataType[T];
        case SimConnectDataType.STRING128:
            return rawBuffer.readString128() as JavascriptDataType[T];
        case SimConnectDataType.STRING256:
            return rawBuffer.readString256() as JavascriptDataType[T];
        case SimConnectDataType.STRING260:
            return rawBuffer.readString260() as JavascriptDataType[T];
        case SimConnectDataType.STRINGV:
            return rawBuffer.readStringV() as JavascriptDataType[T];
        case SimConnectDataType.INITPOSITION:
            return readInitPosition(rawBuffer) as JavascriptDataType[T];
        case SimConnectDataType.MARKERSTATE:
            return readMarkerState(rawBuffer) as JavascriptDataType[T];
        case SimConnectDataType.WAYPOINT:
            return readWaypoint(rawBuffer) as JavascriptDataType[T];
        case SimConnectDataType.LATLONALT:
            return readLatLonAlt(rawBuffer) as JavascriptDataType[T];
        case SimConnectDataType.XYZ:
            return readXYZ(rawBuffer) as JavascriptDataType[T];
        case SimConnectDataType.MAX:
            return undefined as JavascriptDataType[T];
        default:
            return undefined as JavascriptDataType[T];
    }
}

function writeSimConnectValue<T extends SimConnectDataType>(
    rawBuffer: RawBuffer,
    value: JavascriptDataType[T],
    dataType: T
) {
    switch (dataType) {
        case SimConnectDataType.INVALID:
            break;
        case SimConnectDataType.INT32:
            rawBuffer.writeInt32(value as number);
            break;
        case SimConnectDataType.INT64:
            rawBuffer.writeInt64(value as number);
            break;
        case SimConnectDataType.FLOAT32:
            rawBuffer.writeFloat32(value as number);
            break;
        case SimConnectDataType.FLOAT64:
            rawBuffer.writeFloat64(value as number);
            break;
        case SimConnectDataType.STRING8:
            rawBuffer.writeString8(value as string);
            break;
        case SimConnectDataType.STRING32:
            rawBuffer.writeString32(value as string);
            break;
        case SimConnectDataType.STRING64:
            rawBuffer.writeString64(value as string);
            break;
        case SimConnectDataType.STRING128:
            rawBuffer.writeString128(value as string);
            break;
        case SimConnectDataType.STRING256:
            rawBuffer.writeString256(value as string);
            break;
        case SimConnectDataType.STRING260:
            rawBuffer.writeString260(value as string);
            break;
        case SimConnectDataType.STRINGV:
            rawBuffer.writeString(value as string);
            break;
        default:
            // TODO: implement writing of the struct types
            throw Error(`Unhandled data type: ${dataType} (${SimConnectDataType[dataType]})`);
    }
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

/** Maps the SimConnect data types to JS data types */
type JavascriptDataType = {
    [T in SimConnectDataType]: {
        [SimConnectDataType.INVALID]: undefined;
        [SimConnectDataType.INT32]: number;
        [SimConnectDataType.INT64]: number;
        [SimConnectDataType.FLOAT32]: number;
        [SimConnectDataType.FLOAT64]: number;
        [SimConnectDataType.STRING8]: string;
        [SimConnectDataType.STRING32]: string;
        [SimConnectDataType.STRING64]: string;
        [SimConnectDataType.STRING128]: string;
        [SimConnectDataType.STRING256]: string;
        [SimConnectDataType.STRING260]: string;
        [SimConnectDataType.STRINGV]: string;
        [SimConnectDataType.INITPOSITION]: InitPosition;
        [SimConnectDataType.MARKERSTATE]: MarkerState;
        [SimConnectDataType.WAYPOINT]: Waypoint;
        [SimConnectDataType.LATLONALT]: LatLonAlt;
        [SimConnectDataType.XYZ]: XYZ;
        [SimConnectDataType.MAX]: undefined;
    }[T];
};

export { SimulationVariablesHelper };
