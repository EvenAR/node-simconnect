import { SimConnectConnection, ConnectionOptions } from './SimConnectConnection';
import { Protocol } from './enums/Protocol';
import { RecvOpen } from './recv';

export * from './SimConnectConstants';
export * from './enums/ClientDataPeriod';
export * from './enums/SimConnectDataType';
export * from './enums/TextType';
export * from './enums/TextResult';
export * from './enums/SimConnectPeriod';
export * from './enums/SimConnectException';
export * from './enums/SimObjectType';
export * from './enums/FacilityListType';
export * from './enums/FacilityDataType';
export * from './enums/NotificationPriority';
export * from './enums/Protocol';
export * from './enums/WeatherMode';
export * from './SimConnectConnection';
export * from './SimConnectSocket';
export * from './flags/EventFlag';
export * from './flags/DataRequestFlag';
export * from './flags/DataSetFlag';
export * from './flags/ClientDataRequestFlag';
export * from './facility/FacilityAirport';
export * from './facility/FacilityNDB';
export * from './facility/FacilityVOR';
export * from './facility/FacilityWaypoint';
export * from './id-types';
export * from './type-helpers';
export * from './recv';
export * from './dto/XYZ';
export * from './dto/PBH';
export * from './dto/icao';
export * from './dto/LatLonAlt';
export * from './dto/MarkerState';
export * from './dto/InitPosition';
export * from './dto/SimConnectData';
export * from './dto/Waypoint';

export { RawBuffer } from './RawBuffer';

export interface OpenEvent {
    recvOpen: RecvOpen;
    handle: SimConnectConnection;
}

/**
 * Try opening a connection to SimConnect
 *
 * @param appName - An appropriate name for the client program
 * @param protocolVersion - Lowest protocol version
 * @param options - Used for connecting to a remote instance of SimConnect. If omitted it will attempt to read connection parameters from the following sources:
 *
 * - IP + port number from SimConnect.cfg in the node.js installation directory (or the installation directory of the Electron app)
 *
 * - IP + port number from SimConnect.cfg in the user's home directory
 *
 * - Named pipe found in the Windows registry (available when the sim has started)
 *
 * - Port number, for use with localhost, found in the Windows registry (available when the sim has started)
 *
 */
export function open(
    appName: string,
    protocolVersion: Protocol,
    options?: ConnectionOptions
): Promise<OpenEvent> {
    const simConnectConnection = new SimConnectConnection(appName, protocolVersion);
    return new Promise<OpenEvent>((resolve, reject) => {
        simConnectConnection.on('open', data => {
            resolve({ recvOpen: data, handle: simConnectConnection });
        });
        simConnectConnection.on('error', error => {
            reject(error);
        });
        simConnectConnection.connect(options);
    });
}

export type ConnectionHandle = InstanceType<typeof SimConnectConnection>;
