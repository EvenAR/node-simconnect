import { RecvOpen } from './recv';
import { SimConnectConnection } from './SimConnectConnection';
import { Protocol } from './enums/Protocol';
import ConnectionOptions from './types/ConnectionOptions';
import OpenEvent from './types/OpenEvent';

export * from './SimConnectConstants';
export * from './enums/SimConnectDataType';
export * from './enums/TextType';
export * from './enums/TextResult';
export * from './enums/SimConnectPeriod';
export * from './enums/SimConnectException';
export * from './enums/SimObjectType';
export * from './enums/FacilityListType';
export * from './enums/NotificationPriority';
export * from './enums/Protocol';

export * from './recv/facility';
export * from './types';
export * from './recv';
export { default as DataWrapper } from './wrappers/DataWrapper';

/***
 * Try opening a connection to SimConnect
 * @param appName An appropriate name for the client program
 * @param protocolVersion Lowest protocol version
 * @param options Used for connecting to a remote instance of SimConnect.
 */
export function open(
    appName: string,
    protocolVersion: Protocol,
    options?: ConnectionOptions
): Promise<OpenEvent> {
    const simConnectConnection = new SimConnectConnection(
        appName,
        protocolVersion
    );
    simConnectConnection._connect(options);
    return new Promise<OpenEvent>((resolve, reject) => {
        simConnectConnection.on('open', (data) => {
            resolve({ recvOpen: data, handle: simConnectConnection });
        });
        simConnectConnection.on('error', (err) => {
            reject(err);
        });
    });
}

export type ConnectionHandle = InstanceType<typeof SimConnectConnection>;
