import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';

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

    read(buffer: RawBuffer) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
        this.pitch = buffer.readFloat64();
        this.bank = buffer.readFloat64();
        this.heading = buffer.readFloat64();
        this.onGround = buffer.readInt32() !== 0;
        this.airspeed = buffer.readInt32();
    }

    write(buffer: RawBuffer) {
        buffer.writeFloat64(this.latitude);
        buffer.writeFloat64(this.longitude);
        buffer.writeFloat64(this.altitude);
        buffer.writeFloat64(this.pitch);
        buffer.writeFloat64(this.bank);
        buffer.writeFloat64(this.heading);
        buffer.writeInt32(this.onGround ? 1 : 0);
        buffer.writeInt32(this.airspeed);
    }
}

export { InitPosition, Airspeed };
