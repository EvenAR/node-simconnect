import { RawBuffer } from '../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';
import { SimConnectTransport } from './transport/SimConnectTransport';

export class PacketSender {
    private packetsSent = 0;

    private readonly packetDataBuffer = new RawBuffer(256);

    constructor(
        private readonly protocol: Protocol,
        private readonly transport: SimConnectTransport
    ) {}

    beginPacket(packetTypeId: number): SimConnectPacketBuilder {
        return new SimConnectPacketBuilder(packetTypeId, this.protocol, this.packetDataBuffer);
    }

    send(builder: SimConnectPacketBuilder): number {
        const packetId = this.packetsSent;
        this.transport.write(builder.build(packetId));
        this.packetsSent += 1;
        return packetId;
    }

    getLastSentPacketID(): number {
        return this.packetsSent - 1;
    }
}
