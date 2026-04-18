import { EventEmitter } from 'node:events';
import { ConnectionParameters } from '../src/connectionParameters';
import { RawBuffer } from '../src/RawBuffer';
import { RecvID, SimConnectMessage } from '../src/SimConnectSocket';
import {
    SimConnectTransport,
    SimConnectTransportEvents,
} from '../src/internal/transport/SimConnectTransport';

export class FakeTransport extends EventEmitter implements SimConnectTransport {
    readonly connections: ConnectionParameters[] = [];

    readonly writes: Buffer[] = [];

    closed = false;

    connect(address: ConnectionParameters): void {
        this.connections.push(address);
    }

    close(): void {
        this.closed = true;
    }

    emitMessage(packetTypeId: RecvID, data: Buffer, protocolVersion = 0): boolean {
        const message: SimConnectMessage = {
            data: new RawBuffer(data),
            packetTypeId,
            protocolVersion,
        };

        return this.emit('data', message);
    }

    override on<U extends keyof SimConnectTransportEvents>(
        event: U,
        listener: SimConnectTransportEvents[U]
    ): this {
        return super.on(event, listener);
    }

    write(data: Buffer): boolean {
        this.writes.push(Buffer.from(data));
        return true;
    }
}
