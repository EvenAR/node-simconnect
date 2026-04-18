import { createTransport } from '../src/internal/transport/createTransport';
import { autodetectServerAddress } from '../src/connectionParameters';
import { SimConnectConnection } from '../src/SimConnectConnection';
import { Protocol } from '../src/enums/Protocol';
import { RecvID } from '../src/SimConnectSocket';
import { HANDLED_RECV_IDS } from '../src/internal/SimConnectMessageDispatcher';
import { FakeTransport } from './fakeTransport';

jest.mock('../src/internal/transport/createTransport', () => ({
    createTransport: jest.fn(),
}));

jest.mock('../src/connectionParameters', () => {
    const actual = jest.requireActual('../src/connectionParameters');
    return {
        ...actual,
        autodetectServerAddress: jest.fn(),
    };
});

const mockedCreateTransport = createTransport as jest.MockedFunction<typeof createTransport>;
const mockedAutodetectServerAddress = autodetectServerAddress as jest.MockedFunction<
    typeof autodetectServerAddress
>;

function flushMicrotasks(): Promise<void> {
    return new Promise(resolve => {
        setImmediate(resolve);
    });
}

describe('SimConnectConnection lifecycle and dispatch', () => {
    let connection: SimConnectConnection;
    let transport: FakeTransport;

    beforeEach(() => {
        jest.useRealTimers();
        transport = new FakeTransport();
        mockedCreateTransport.mockReturnValue(transport);
        mockedAutodetectServerAddress.mockReset();
        connection = new SimConnectConnection('Lifecycle', Protocol.KittyHawk);
    });

    afterEach(() => {
        connection.close();
        mockedCreateTransport.mockReset();
    });

    test('re-emits autodetect failures through the error event', async () => {
        const errorHandler = jest.fn();
        const expectedError = new Error('autodetect failed');
        mockedAutodetectServerAddress.mockRejectedValue(expectedError);
        connection.on('error', errorHandler);

        connection.connect();
        await flushMicrotasks();

        expect(errorHandler).toHaveBeenCalledWith(expectedError);
    });

    test('re-emits transport close and error events', () => {
        const closeHandler = jest.fn();
        const errorHandler = jest.fn();
        const socketError = new Error('socket');

        connection.on('close', closeHandler);
        connection.on('error', errorHandler);

        transport.emit('close', false);
        transport.emit('error', socketError);

        expect(closeHandler).toHaveBeenCalledTimes(1);
        expect(errorHandler).toHaveBeenCalledWith(socketError);
    });

    test('times out opening connections and closes the transport', () => {
        jest.useFakeTimers();
        const errorHandler = jest.fn();
        connection.on('error', errorHandler);

        transport.emit('connect');
        jest.advanceTimersByTime(5000);

        expect(transport.closed).toBe(true);
        expect(errorHandler).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Open timeout' })
        );
    });

    test('dispatches open packets to the open event', () => {
        const openHandler = jest.fn();
        connection.on('open', openHandler);

        const payload = Buffer.alloc(256 + 10 * 4);
        payload.write('MSFS', 0, 'utf-8');
        payload.writeInt32LE(1, 256);
        payload.writeInt32LE(2, 260);
        payload.writeInt32LE(3, 264);
        payload.writeInt32LE(4, 268);
        payload.writeInt32LE(5, 272);
        payload.writeInt32LE(6, 276);
        payload.writeInt32LE(7, 280);
        payload.writeInt32LE(8, 284);
        payload.writeInt32LE(9, 288);
        payload.writeInt32LE(10, 292);

        transport.emitMessage(RecvID.ID_OPEN, payload);

        expect(openHandler).toHaveBeenCalledWith(
            expect.objectContaining({
                applicationBuildMajor: 3,
                applicationName: 'MSFS',
                simConnectBuildMinor: 8,
            })
        );
    });

    test('dispatches simObjectData packets with the remaining payload buffer intact', () => {
        const dataHandler = jest.fn();
        connection.on('simObjectData', dataHandler);

        const payload = Buffer.alloc(28 + 8);
        payload.writeInt32LE(11, 0);
        payload.writeInt32LE(22, 4);
        payload.writeInt32LE(33, 8);
        payload.writeInt32LE(44, 12);
        payload.writeInt32LE(55, 16);
        payload.writeInt32LE(66, 20);
        payload.writeInt32LE(77, 24);
        payload.writeDoubleLE(123.5, 28);

        transport.emitMessage(RecvID.ID_SIMOBJECT_DATA, payload);

        const event = dataHandler.mock.calls[0][0];
        expect(event.requestID).toBe(11);
        expect(event.objectID).toBe(22);
        expect(event.defineCount).toBe(77);
        expect(event.data.readFloat64()).toBeCloseTo(123.5);
    });

    test('tracks handled dispatcher ids for every receive id', () => {
        const numericRecvIds = Object.values(RecvID).filter(
            (value): value is RecvID => typeof value === 'number'
        );

        expect(new Set(HANDLED_RECV_IDS)).toEqual(new Set(numericRecvIds));
    });

    test('guards KittyHawk-only APIs on older protocols', () => {
        const legacyConnection = new SimConnectConnection('Legacy', Protocol.FSX_SP2);

        expect(() => legacyConnection.enumerateInputEvents(1)).toThrow(
            /requires protocol KittyHawk.*but current protocol is FSX_SP2/
        );
    });
});
