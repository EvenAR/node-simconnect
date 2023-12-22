import { Socket } from 'net';
import { Duplex } from 'stream';
import { RawBuffer } from './RawBuffer';
import { ConnectionParameters } from './connectionParameters';

const HEADER_LENGTH = 4;

enum RecvID {
    ID_NULL,
    ID_EXCEPTION,
    ID_OPEN,
    ID_QUIT,
    ID_EVENT,
    ID_EVENT_OBJECT_ADDREMOVE,
    ID_EVENT_FILENAME,
    ID_EVENT_FRAME,
    ID_SIMOBJECT_DATA,
    ID_SIMOBJECT_DATA_BYTYPE,
    ID_WEATHER_OBSERVATION,
    ID_CLOUD_STATE,
    ID_ASSIGNED_OBJECT_ID,
    ID_RESERVED_KEY,
    ID_CUSTOM_ACTION,
    ID_SYSTEM_STATE,
    ID_CLIENT_DATA,
    ID_EVENT_WEATHER_MODE,
    ID_AIRPORT_LIST,
    ID_VOR_LIST,
    ID_NDB_LIST,
    ID_WAYPOINT_LIST,
    ID_EVENT_MULTIPLAYER_SERVER_STARTED,
    ID_EVENT_MULTIPLAYER_CLIENT_STARTED,
    ID_EVENT_MULTIPLAYER_SESSION_ENDED,
    ID_EVENT_RACE_END,
    ID_EVENT_RACE_LAP,
    // KittyHawk:
    ID_EVENT_EX1,
    ID_FACILITY_DATA,
    ID_FACILITY_DATA_END,
    ID_FACILITY_MINIMAL_LIST,
    ID_JETWAY_DATA,
    ID_CONTROLLERS_LIST,
    ID_ACTION_CALLBACK,
    ID_ENUMERATE_INPUT_EVENTS,
    ID_GET_INPUT_EVENT,
    ID_SUBSCRIBE_INPUT_EVENT,
    ID_ENUMERATE_INPUT_EVENT_PARAMS,
}

interface SimConnectMessage {
    protocolVersion: number;
    packetTypeId: RecvID;
    data: RawBuffer;
}

/**
 * For connecting, reading and writing to the SimConnect server.
 * The emitted "data"-event contains a SimConnectMessage-object.
 * Inspired by https://www.derpturkey.com/extending-tcp-socket-in-node-js/
 */
class SimConnectSocket extends Duplex {
    private readonly _socket: Socket;

    private _dataBuffer: Buffer;

    private _readingPaused: boolean;

    constructor() {
        super({ objectMode: true });
        this._dataBuffer = Buffer.from([]);
        this._readingPaused = false;
        this._socket = new Socket();
        this._socket.setNoDelay(false);
        this._wrapSocket();
    }

    connect(address: ConnectionParameters) {
        switch (address.type) {
            case 'pipe':
                this._socket.connect(address.address);
                break;
            case 'ipv4':
                this._socket.connect(address.port, address.host);
                break;
            default:
                throw Error('Unsupported address type. Must be "ipv4" or "pipe"');
        }
    }

    close() {
        this._socket.destroy();
    }

    private _wrapSocket() {
        this._socket.on('close', hadError => this.emit('close', hadError));
        this._socket.on('connect', () => this.emit('connect'));
        this._socket.on('drain', () => this.emit('drain'));
        this._socket.on('end', () => this.emit('end'));
        this._socket.on('error', err => this.emit('error', err));
        this._socket.on('lookup', (err, address, family, host) => this.emit('lookup', err, address, family, host)); // prettier-ignore
        this._socket.on('ready', () => this.emit('ready'));
        this._socket.on('timeout', () => this.emit('timeout'));

        this._socket.on('readable', this._onReadable.bind(this));
    }

    private _onReadable() {
        while (!this._readingPaused) {
            const chunk: Buffer | null = this._socket.read();
            if (chunk === null) break;

            this._dataBuffer = Buffer.concat([this._dataBuffer, chunk]);

            while (this._dataBuffer.length >= HEADER_LENGTH) {
                const totalMessageSize: number = this._dataBuffer.readInt32LE(0);

                if (this._dataBuffer.length >= totalMessageSize) {
                    const messageBody: Buffer = this._dataBuffer.slice(
                        HEADER_LENGTH,
                        totalMessageSize
                    );

                    const simConnectMessage: SimConnectMessage = {
                        protocolVersion: messageBody.readInt32LE(0),
                        packetTypeId: messageBody.readInt32LE(4),
                        data: new RawBuffer(messageBody.slice(8)),
                    };

                    const pushOk = this.push(simConnectMessage);

                    if (!pushOk) {
                        this._readingPaused = true;
                        break; // Pause reading if consumer is slow
                    }

                    this._dataBuffer = this._dataBuffer.slice(totalMessageSize); // Remove processed message from the buffer
                } else {
                    break; // Not enough data for a complete SimConnect message, break out of the loop
                }
            }
        }
    }

    _read() {
        this._readingPaused = false;
        setImmediate(this._onReadable.bind(this));
    }

    _write(data: Buffer, encoding: BufferEncoding, cb: (error?: Error | null) => void) {
        this._socket.write(data, encoding, cb);
    }
}

export { SimConnectSocket, RecvID, SimConnectMessage, ConnectionParameters };
