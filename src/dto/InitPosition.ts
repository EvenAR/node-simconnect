import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';
import { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';

enum Airspeed {
    Keep = -2,
    Cruise = -1,
}

class InitPosition implements SimConnectData {
    latitude = 0;

    longitude = 0;

    altitude = 0;

    pitch = 0;

    bank = 0;

    heading = 0;

    onGround = false;

    airspeed: Airspeed | number = 0;

    readFrom(buffer: RawBuffer) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
        this.pitch = buffer.readFloat64();
        this.bank = buffer.readFloat64();
        this.heading = buffer.readFloat64();
        this.onGround = buffer.readInt32() !== 0;
        this.airspeed = buffer.readInt32();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder
            .putFloat64(this.latitude)
            .putFloat64(this.longitude)
            .putFloat64(this.altitude)
            .putFloat64(this.pitch)
            .putFloat64(this.bank)
            .putFloat64(this.heading)
            .putInt32(this.onGround ? 1 : 0)
            .putInt32(this.airspeed);
    }
}

export { InitPosition, Airspeed };
