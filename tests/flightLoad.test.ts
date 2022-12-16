import { SimConnectConnection } from '../src/SimConnectConnection';
import { Protocol } from '../src/enums/Protocol';
import { expectBufferContent } from './utils';

test('The packet content when loading a flight is correctly formatted', () => {
    const MockSocket = jest.fn();
    const scc = new SimConnectConnection('', Protocol.KittyHawk);
    // @ts-ignore
    scc._clientSocket = new MockSocket();
    scc._clientSocket.write = MockSocket.bind(null);

    scc.flightLoad('C:\\Users\\Øystein\\flightplan');

    expectBufferContent(MockSocket.mock.calls[1][0], expectedMessageContent);
});

/** *
 * This sample was found by inspecting the data sent from an application that uses
 * the official SDK. This tool was used: https://github.com/Dragonlaird/SimConnect_Proxy
 */
const expectedMessageContent = `14 01 00 00 05 00 00 00
    3D 00 00 F0 02 00 00 00
    43 3A 5C 55 73 65 72 73 
    5C D8 79 73 74 65 69 6E 
    5C 66 6C 69 67 68 74 70 
    6C 61 6E 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00 00 00 00 00
    00 00 00 00`;
