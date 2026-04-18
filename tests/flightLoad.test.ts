import { createTransport } from '../src/internal/transport/createTransport';
import { SimConnectConnection } from '../src/SimConnectConnection';
import { Protocol } from '../src/enums/Protocol';
import { FakeTransport } from './fakeTransport';
import { expectBufferContent, getRequiredWrite } from './utils';

jest.mock('../src/internal/transport/createTransport', () => ({
    createTransport: jest.fn(),
}));

const mockedCreateTransport = createTransport as jest.MockedFunction<typeof createTransport>;

describe('flightLoad packet encoding', () => {
    let transport: FakeTransport;

    beforeEach(() => {
        transport = new FakeTransport();
        mockedCreateTransport.mockReturnValue(transport);
    });

    afterEach(() => {
        mockedCreateTransport.mockReset();
    });

    test('The packet content when loading a flight is correctly formatted', () => {
        const scc = new SimConnectConnection('', Protocol.KittyHawk);

        scc.flightLoad('C:\\Users\\Øystein\\flightplan');

        expectBufferContent(getRequiredWrite(transport.writes), expectedMessageContent);
    });
});

/** *
 * This sample was found by inspecting the data sent from an application that uses
 * the official SDK. This tool was used: https://github.com/Dragonlaird/SimConnect_Proxy
 */
const expectedMessageContent = `
14 01 00 00 05 00 00 00
3D 00 00 F0 00 00 00 00
43 3A 5C 55 73 65 72 73
5C C3 98 79 73 74 65 69
6E 5C 66 6C 69 67 68 74
70 6C 61 6E 00 00 00 00
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
00 00 00 00
`;
