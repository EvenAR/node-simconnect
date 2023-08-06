import type { SimConnectData } from './SimConnectData';
import type { RawBuffer } from '../RawBuffer';
import type { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';

class PBH implements SimConnectData {
    pitch = 0;

    bank = 0;

    heading = 0;

    readFrom(buffer: RawBuffer) {
        this.pitch = buffer.readFloat32();
        this.bank = buffer.readFloat32();
        this.heading = buffer.readFloat32();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder //
            .putFloat32(this.pitch)
            .putFloat32(this.bank)
            .putFloat32(this.heading);
    }
}

export { PBH };
