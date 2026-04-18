import { createTransport } from '../src/internal/transport/createTransport';
import { SimConnectConnection } from '../src/SimConnectConnection';
import { FacilityListType } from '../src/enums/FacilityListType';
import { Protocol } from '../src/enums/Protocol';
import { SimConnectDataType } from '../src/enums/SimConnectDataType';
import { SimConnectPeriod } from '../src/enums/SimConnectPeriod';
import { FakeTransport } from './fakeTransport';
import { createExpectedPacket, getRequiredWrite } from './utils';

jest.mock('../src/internal/transport/createTransport', () => ({
    createTransport: jest.fn(),
}));

const mockedCreateTransport = createTransport as jest.MockedFunction<typeof createTransport>;

describe('SimConnectConnection packet encoding', () => {
    let connection: SimConnectConnection;
    let transport: FakeTransport;

    beforeEach(() => {
        transport = new FakeTransport();
        mockedCreateTransport.mockReturnValue(transport);
        connection = new SimConnectConnection('My App', Protocol.KittyHawk);
    });

    afterEach(() => {
        connection.close();
        mockedCreateTransport.mockReset();
    });

    test('writes the open handshake packet on transport connect', () => {
        transport.emit('connect');

        expect(getRequiredWrite(transport.writes)).toEqual(
            createExpectedPacket(0x01, 280, payload => {
                payload.write('My App', 0, 'utf-8');
                payload.writeInt32LE(0, 256);
                payload.writeUInt8(0, 260);
                payload.write('HK', 261, 'utf-8');
                payload.writeInt32LE(11, 264);
                payload.writeInt32LE(0, 268);
                payload.writeInt32LE(62651, 272);
                payload.writeInt32LE(3, 276);
            })
        );
    });

    test('encodes addToDataDefinition packets with fixed-length strings', () => {
        connection.addToDataDefinition(42, 'TITLE', 'string', SimConnectDataType.STRING256, 0.5, 7);

        expect(getRequiredWrite(transport.writes)).toEqual(
            createExpectedPacket(0x0c, 528, payload => {
                payload.writeInt32LE(42, 0);
                payload.write('TITLE', 4, 'utf-8');
                payload.write('string', 260, 'utf-8');
                payload.writeInt32LE(SimConnectDataType.STRING256, 516);
                payload.writeFloatLE(0.5, 520);
                payload.writeInt32LE(7, 524);
            })
        );
    });

    test('encodes requestDataOnSimObject packets with all request fields', () => {
        connection.requestDataOnSimObject(10, 20, 30, SimConnectPeriod.SECOND, 4, 5, 6, 7);

        expect(getRequiredWrite(transport.writes)).toEqual(
            createExpectedPacket(0x0e, 32, payload => {
                payload.writeInt32LE(10, 0);
                payload.writeInt32LE(20, 4);
                payload.writeInt32LE(30, 8);
                payload.writeInt32LE(SimConnectPeriod.SECOND, 12);
                payload.writeInt32LE(4, 16);
                payload.writeInt32LE(5, 20);
                payload.writeInt32LE(6, 24);
                payload.writeInt32LE(7, 28);
            })
        );
    });

    test('encodes weatherSetModeGlobal packets without payload', () => {
        connection.weatherSetModeGlobal();

        expect(getRequiredWrite(transport.writes)).toEqual(
            createExpectedPacket(0x21, 0, () => undefined)
        );
    });

    test('encodes requestFacilitiesListEx1 packets', () => {
        connection.requestFacilitiesListEx1(FacilityListType.AIRPORT, 77);

        expect(getRequiredWrite(transport.writes)).toEqual(
            createExpectedPacket(0x49, 8, payload => {
                payload.writeInt32LE(FacilityListType.AIRPORT, 0);
                payload.writeInt32LE(77, 4);
            })
        );
    });

    test('encodes enumerateInputEvents packets', () => {
        connection.enumerateInputEvents(123);

        expect(getRequiredWrite(transport.writes)).toEqual(
            createExpectedPacket(0x4f, 4, payload => {
                payload.writeInt32LE(123, 0);
            })
        );
    });
});
