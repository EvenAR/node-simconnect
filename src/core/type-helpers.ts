import { SimConnectDataType } from './enums/SimConnectDataType';
import type { InitPosition, LatLonAlt, MarkerState, Waypoint, XYZ } from '.';

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
