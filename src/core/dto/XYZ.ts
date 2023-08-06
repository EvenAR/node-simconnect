import type { SimConnectData } from './SimConnectData';
import type { RawBuffer } from '../RawBuffer';
import type { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';

class XYZ implements SimConnectData {
    x = 0;

    y = 0;

    z = 0;

    readFrom(buffer: RawBuffer) {
        this.x = buffer.readFloat64();
        this.y = buffer.readFloat64();
        this.z = buffer.readFloat64();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder //
            .putFloat64(this.x)
            .putFloat64(this.y)
            .putFloat64(this.z);
    }
}

export { XYZ };
