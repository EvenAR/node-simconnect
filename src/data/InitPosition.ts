import SimConnectData from "./SimConnectData";
import DataWrapper from "../wrappers/DataWrapper";

enum Airspeed {
    Keep = -2,
    Cruise = -1
}

export default class InitPosition implements SimConnectData {
    latitude: number = 0;
    longitude: number = 0;
    altitude: number = 0;
    pitch: number = 0;
    bank: number = 0;
    heading: number = 0;
    onGround: boolean = false;
    airspeed: Airspeed | number = 0;

    read(buffer: DataWrapper) {
        this.latitude = buffer.readDouble();
        this.longitude = buffer.readDouble();
        this.altitude = buffer.readDouble();
        this.pitch = buffer.readDouble();
        this.bank = buffer.readDouble();
        this.heading = buffer.readDouble();
        this.onGround = buffer.readInt() !== 0;
        this.airspeed = buffer.readInt();
    }

    write(buffer: DataWrapper) {
        buffer.writeDouble(this.latitude);
        buffer.writeDouble(this.longitude);
        buffer.writeDouble(this.altitude);
        buffer.writeDouble(this.pitch);
        buffer.writeDouble(this.bank);
        buffer.writeDouble(this.heading);
        buffer.writeInt(this.onGround ? 1 : 0);
        buffer.writeInt(this.airspeed);
    }
}