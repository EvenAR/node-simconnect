import { Socket } from 'node:net';
import { Duplex } from 'node:stream';
import { RawBuffer } from './RawBuffer';
import { RecvID, SimConnectMessage } from './SimConnectProtocolMessage';
import { ConnectionParameters } from './connectionParameters';
import { SimConnectTransport } from './internal/transport/SimConnectTransport';

const HEADER_LENGTH = 4;
/**
 * For connecting, reading and writing to the SimConnect server.
 * The emitted "data"-event contains a SimConnectMessage-object.
 * Inspired by https://www.derpturkey.com/extending-tcp-socket-in-node-js/
 */
class SimConnectSocket extends Duplex implements SimConnectTransport {
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

    override _read() {
        this._readingPaused = false;
        setImmediate(this._onReadable.bind(this));
    }

    override _write(data: Buffer, encoding: BufferEncoding, cb: (error?: Error | null) => void) {
        this._socket.write(data, encoding, cb);
    }
}

export { SimConnectSocket, RecvID };
export type { SimConnectMessage, ConnectionParameters };
