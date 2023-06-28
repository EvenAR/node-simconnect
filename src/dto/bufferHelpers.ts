import { RawBuffer } from '../RawBuffer';
import { InitPosition } from './InitPosition';
import { MarkerState } from './MarkerState';
import { Waypoint } from './Waypoint';
import { LatLonAlt } from './LatLonAlt';
import { XYZ } from './XYZ';
import { SimConnectData } from './SimConnectData';
import { PBH } from './PBH';

function readInitPosition(dataWrapper: RawBuffer): InitPosition {
    return readData(dataWrapper, new InitPosition());
}

function readMarkerState(dataWrapper: RawBuffer): MarkerState {
    return readData(dataWrapper, new MarkerState());
}

function readWaypoint(dataWrapper: RawBuffer): Waypoint {
    return readData(dataWrapper, new Waypoint());
}

function readLatLonAlt(dataWrapper: RawBuffer): LatLonAlt {
    return readData(dataWrapper, new LatLonAlt());
}

function readXYZ(dataWrapper: RawBuffer): XYZ {
    return readData(dataWrapper, new XYZ());
}

function readData<T extends SimConnectData>(dataWrapper: RawBuffer, obj: T): T {
    obj.readFrom(dataWrapper);
    return obj;
}

function readPBH(dataWrapper: RawBuffer): PBH {
    return readData(dataWrapper, new PBH());
}

export { readInitPosition, readMarkerState, readWaypoint, readLatLonAlt, readXYZ, readPBH };
