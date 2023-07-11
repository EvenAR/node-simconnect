import { SimConnectDataType } from '../enums/SimConnectDataType';
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
import { FacilityListType } from '../enums/FacilityListType';
import { FacilityWaypoint } from '../facility/FacilityWaypoint';
import { FacilityNDB } from '../facility/FacilityNDB';
import { FacilityAirport } from '../facility/FacilityAirport';
import { FacilityVOR } from '../facility/FacilityVOR';
import { SimConnectException } from '../enums/SimConnectException';

export function readSimConnectValue<T extends SimConnectDataType>(
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

export function writeSimConnectValue<T extends SimConnectDataType>(
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

/** Maps the SimConnect data types to JS data types */
export type JavascriptDataType = {
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

export type FacilityResponseType = {
    [T in FacilityListType]: {
        [FacilityListType.WAYPOINT]: FacilityWaypoint;
        [FacilityListType.NDB]: FacilityNDB;
        [FacilityListType.AIRPORT]: FacilityAirport;
        [FacilityListType.VOR]: FacilityVOR;
    }[T];
};

export type ApiHelperError = {
    message: string;
    exception: SimConnectException;
};
