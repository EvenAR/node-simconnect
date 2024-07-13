import { RawBuffer } from './RawBuffer';
import { Protocol } from './enums/Protocol';

export class SimConnectPacketBuilder {
    private readonly packetContent: RawBuffer;

    constructor(packetTypeId: number, protocol: Protocol, packetDataBuffer?: RawBuffer) {
        packetDataBuffer?.clear(); // Prepare for new message
        /**
         * Packet header content (16 bytes):
         *    0-3    packet size (set later)
         *    4-7    protocol
         *    8-11   packet type / SimConnect function
         *    12-15  packet id (set later)
         */
        this.packetContent = packetDataBuffer || new RawBuffer(256);
        this.packetContent.writeInt32(protocol, 4);
        this.packetContent.writeInt32(0xf0000000 | packetTypeId, 8);
        this.packetContent.setOffset(16);
    }

    putFloat32(value: number) {
        this.packetContent.writeFloat32(value);
        return this;
    }

    putFloat64(value: number) {
        this.packetContent.writeFloat64(value);
        return this;
    }

    putString(value: string, fixedLength?: number) {
        this.packetContent.writeString(value, fixedLength);
        return this;
    }

    putString256(value: string | null) {
        this.packetContent.writeString256(value);
        return this;
    }

    putInt16(value: number, offset?: number) {
        this.packetContent.writeInt16(value, offset);
        return this;
    }

    putInt32(value: number, offset?: number) {
        this.packetContent.writeInt32(value, offset);
        return this;
    }

    putUint32(value: number, offset?: number) {
        this.packetContent.writeUint32(value, offset);
        return this;
    }

    putUint64(value: bigint, offset?: number) {
        this.packetContent.writeUint64(value, offset);
        return this;
    }

    putByte(value: number) {
        this.packetContent.writeByte(value);
        return this;
    }

    putBytes(value: Buffer) {
        this.packetContent.write(value);
        return this;
    }

    getRawBuffer(): RawBuffer {
        return this.packetContent;
    }

    /**
     * Finalize
     * @param sendId - of packet (can be used to identify packet when exception event occurs)
     */
    build(sendId: number): Buffer {
        const packetSize = this.packetContent.getOffset();

        // Finish packet header
        this.packetContent.writeInt32(packetSize, 0);
        this.packetContent.writeInt32(sendId, 12);

        return this.packetContent.getBuffer();
    }
}
