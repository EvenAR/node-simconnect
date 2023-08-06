import type { SimConnectData } from './SimConnectData';
import type { RawBuffer } from '../RawBuffer';
import type { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';

class LatLonAlt implements SimConnectData {
    latitude = 0;

    longitude = 0;

    altitude = 0;

    readFrom(buffer: RawBuffer) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder
            .putFloat64(this.latitude)
            .putFloat64(this.longitude)
            .putFloat64(this.altitude);
    }
}

export { LatLonAlt };
