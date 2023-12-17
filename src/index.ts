import { SimConnectConnection, ConnectionOptions } from './SimConnectConnection';
import { Protocol } from './enums/Protocol';
import { RecvOpen } from './recv';

export * from './SimConnectConstants';
export * from './SimConnectPacketBuilder';
export * from './enums';
export * from './SimConnectConnection';
export * from './SimConnectSocket';
export * from './flags';
export * from './datastructures';
export * from './Types';
export * from './recv';
export * from './dto';
export { RawBuffer } from './RawBuffer';

/**
 * @member recvOpen - Information about the flight simulator
 * @member handle - The object used to interact with SimConnect
 */
export interface OpenEvent {
    recvOpen: RecvOpen;
    handle: SimConnectConnection;
}

/**
 * Try opening a connection to SimConnect
 *
 * @param appName - An appropriate name for the client program. Your app will appear with this name in the SimConnect inspector in MSFS.
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
