import { Socket } from 'net';
import { Duplex } from 'stream';
import DataWrapper from './wrappers/DataWrapper';

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
}

interface SimConnectMessage {
    version: number;
    id: RecvID;
    data: DataWrapper;
}

/**
 * For connecting, reading and writing to the SimConnect server.
 * The emitted "data"-event contains a SimConnectMessage-object.
 * Inspired by https://www.derpturkey.com/extending-tcp-socket-in-node-js/
 */
class SimConnectSocket extends Duplex {
    _socket: Socket;
    _readingPaused;

    constructor() {
        super({ objectMode: true });
        this._readingPaused = false;
        this._socket = new Socket();
        this._socket.setNoDelay(false);
        this._wrapSocket();
    }

    connect(address: string | { host: string; port: number }) {
        if (typeof address === 'string') {
            this._socket.connect(address);
        } else {
            this._socket.connect(address.port, address.host);
        }
    }

    close() {
        this._socket.destroy();
    }

    _wrapSocket() {
        this._socket.on('close', (hadError) => this.emit('close', hadError));
        this._socket.on('connect', () => this.emit('connect'));
        this._socket.on('drain', () => this.emit('drain'));
        this._socket.on('end', () => this.emit('end'));
        this._socket.on('error', (err) => this.emit('error', err));
        this._socket.on('lookup', (err, address, family, host) => this.emit('lookup', err, address, family, host)); // prettier-ignore
        this._socket.on('ready', () => this.emit('ready'));
        this._socket.on('timeout', () => this.emit('timeout'));

        this._socket.on('readable', this._onReadable.bind(this));
    }

    _onReadable() {
        while (!this._readingPaused) {
            // Read message length header
            const lenBuf = this._socket.read(HEADER_LENGTH);
            if (!lenBuf) return;
            const bodyLength = lenBuf.readInt32LE() - HEADER_LENGTH;

            // Read message body
            const body: Buffer = this._socket.read(bodyLength);
            if (!body) {
                // Put header back in read buffer
                this._socket.unshift(lenBuf);
                return;
            }

            const message: SimConnectMessage = {
                // Mandatory fields
                version: body.readInt32LE(0),
                id: body.readInt32LE(4),
                data: new DataWrapper(body.slice(8)),
            };

            // Add object to read buffer
            let pushOk = this.push(message);

            // Pause reading if consumer is slow
            if (!pushOk) this._readingPaused = true;
        }
    }

    _read() {
        this._readingPaused = false;
        setImmediate(this._onReadable.bind(this));
    }

    _write(data: Buffer, encoding: any, cb: any) {
        this._socket.write(data, encoding, cb);
    }
}

export { SimConnectSocket, RecvID, SimConnectMessage };
