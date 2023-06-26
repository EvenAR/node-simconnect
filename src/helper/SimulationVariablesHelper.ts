import { SimConnectConstants } from '../SimConnectConstants';
import { SimConnectDataType } from '../enums/SimConnectDataType';
import { SimConnectPeriod } from '../enums/SimConnectPeriod';
import { DataRequestFlag } from '../flags/DataRequestFlag';
import { SimConnectConnection } from '../SimConnectConnection';
import { RawBuffer } from '../RawBuffer';
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

class SimulationVariablesHelper {
    private _handle: SimConnectConnection;

    private _nextDataDefinitionId: number;

    private _nextDataRequestId: number;

    constructor(handle: SimConnectConnection) {
        this._handle = handle;
        this._nextDataDefinitionId = 0;
        this._nextDataRequestId = 0;
    }

    /**
     * Read a single simulation variable
     * TODO: perhaps this is not really needed?
     */
    async readValue<T extends SimConnectDataType>(
        simulationVariable: string,
        units: string | null,
        dataType: SimConnectDataType,
        simObjectId: number = SimConnectConstants.OBJECT_ID_USER,
        epsilon?: number
    ): Promise<OutputVariableType[T]> {
        const values = await this.readValues(
            { value: { simulationVariable, units, dataType, simObjectId, epsilon } },
            simObjectId
        );
        return values.value as OutputVariableType[T];
    }

    /**
     * Read a set of simulation variables once
     * @param requestStructure
     * @param simObjectId
     */
    async readValues<T extends RequestedVariables>(
        requestStructure: T,
        simObjectId: number = SimConnectConstants.OBJECT_ID_USER
    ): Promise<VariablesResponse<T>> {
        const sub = this.makeSubscription({
            requestStructure,
            simObjectId,
            period: SimConnectPeriod.ONCE,
        });

        return new Promise(resolve => {
            this._handle.once('simObjectData', recvSimObjectData => {
                if (
                    sub.requestId === recvSimObjectData.requestID &&
                    sub.defineId === recvSimObjectData.defineID
                ) {
                    resolve(
                        extractDataStructureFromBuffer(requestStructure, recvSimObjectData.data)
                    );
                }
            });
        });
    }

    /**
     * Continuously read a set of simulation variables
     * @param simulationVariables
     * @param callback
     * @param options
     */
    monitorValues<T extends RequestedVariables>(
        simulationVariables: T,
        callback: (values: VariablesResponse<T>) => void,
        options?: {
            onlyOnChange?: boolean;
            simObjectId?: number;
            interval?: SimConnectPeriod;
        }
    ) {
        const sub = this.makeSubscription({
            requestStructure: simulationVariables,
            simObjectId: options?.simObjectId || SimConnectConstants.OBJECT_ID_USER,
            period: options?.interval || SimConnectPeriod.SIM_FRAME,
            flags: options?.onlyOnChange ? DataRequestFlag.DATA_REQUEST_FLAG_CHANGED : 0,
        });

        this._handle.on('simObjectData', recvSimObjectData => {
            if (
                sub.requestId === recvSimObjectData.requestID &&
                sub.defineId === recvSimObjectData.defineID
            ) {
                callback(
                    extractDataStructureFromBuffer(simulationVariables, recvSimObjectData.data)
                );
            }
        });
    }

    private makeSubscription<T extends RequestedVariables>(params: {
        requestStructure: T;
        period: SimConnectPeriod;
        simObjectId: number;
        flags?: number;
    }): { defineId: number; requestId: number } {
        const requestId = this._nextDataRequestId++;
        const defineId = this._nextDataDefinitionId++;

        Object.values(params.requestStructure)
            .reverse()
            .forEach(requestedValue => {
                this._handle.addToDataDefinition(
                    defineId,
                    requestedValue.simulationVariable,
                    requestedValue.units,
                    requestedValue.dataType,
                    requestedValue.epsilon
                );
            });

        this._handle.requestDataOnSimObject(
            requestId,
            defineId,
            params.simObjectId,
            params.period,
            DataRequestFlag.DATA_REQUEST_FLAG_DEFAULT | (params.flags || 0)
        );

        return { requestId, defineId };
    }
}

function extractDataStructureFromBuffer<T extends RequestedVariables>(
    requestStructure: T,
    rawBuffer: RawBuffer
) {
    return Object.keys(requestStructure)
        .reverse() // Reverse to get the same order as requested order
        .reduce((result, propName) => {
            return {
                [propName]: extractSimConnectValue(rawBuffer, requestStructure[propName].dataType),
                ...result,
            };
            return result;
        }, {} as VariablesResponse<T>);
}

function extractSimConnectValue<T extends SimConnectDataType>(
    rawBuffer: RawBuffer,
    dataType: T
): OutputVariableType[T] {
    switch (dataType) {
        case SimConnectDataType.INVALID:
            return undefined as OutputVariableType[T];
        case SimConnectDataType.INT32:
            return rawBuffer.readInt32() as OutputVariableType[T];
        case SimConnectDataType.INT64:
            return rawBuffer.readInt64() as OutputVariableType[T];
        case SimConnectDataType.FLOAT32:
            return rawBuffer.readFloat32() as OutputVariableType[T];
        case SimConnectDataType.FLOAT64:
            return rawBuffer.readFloat64() as OutputVariableType[T];
        case SimConnectDataType.STRING8:
            return rawBuffer.readString8() as OutputVariableType[T];
        case SimConnectDataType.STRING32:
            return rawBuffer.readString32() as OutputVariableType[T];
        case SimConnectDataType.STRING64:
            return rawBuffer.readString64() as OutputVariableType[T];
        case SimConnectDataType.STRING128:
            return rawBuffer.readString128() as OutputVariableType[T];
        case SimConnectDataType.STRING256:
            return rawBuffer.readString256() as OutputVariableType[T];
        case SimConnectDataType.STRING260:
            return rawBuffer.readString260() as OutputVariableType[T];
        case SimConnectDataType.STRINGV:
            return rawBuffer.readStringV() as OutputVariableType[T];
        case SimConnectDataType.INITPOSITION:
            return readInitPosition(rawBuffer) as OutputVariableType[T];
        case SimConnectDataType.MARKERSTATE:
            return readMarkerState(rawBuffer) as OutputVariableType[T];
        case SimConnectDataType.WAYPOINT:
            return readWaypoint(rawBuffer) as OutputVariableType[T];
        case SimConnectDataType.LATLONALT:
            return readLatLonAlt(rawBuffer) as OutputVariableType[T];
        case SimConnectDataType.XYZ:
            return readXYZ(rawBuffer) as OutputVariableType[T];
        case SimConnectDataType.MAX:
            return undefined as OutputVariableType[T];
        default:
            return undefined as OutputVariableType[T];
    }
}

// Types:

type VariableRequestDefinition = {
    simulationVariable: string;
    units: string | null;
    dataType: SimConnectDataType;
    epsilon?: number | undefined;
};

type RequestedVariables = {
    [propName: string]: VariableRequestDefinition;
};

type VariablesResponse<R extends RequestedVariables> = {
    [K in keyof R]: OutputVariableType[R[K]['dataType']];
};

type OutputVariableType = {
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
