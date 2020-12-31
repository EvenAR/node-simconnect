import SimConnectData from "./SimConnectData";
import DataWrapper from "../DataWrapper";

class InitPosition implements SimConnectData {
    longitude: number = 0;
    altitude: number = 0;
    pitch: number = 0;
    bank: number = 0;
    heading: number = 0;
    onGround: boolean = false;
    airspeed: number = 0;


    read(buffer: DataWrapper) {
        return {
            latitude: buffer.readFloat64(),
            longitude: buffer.readFloat64(),
            altitude: buffer.readFloat64(),
            pitch: buffer.readFloat64(),
            bank: buffer.readFloat64(),
            heading: buffer.readFloat64(),
            onGround: buffer.readInt32() !== 0,
            airspeed: buffer.readInt32(),
        }
    }

    write(buffer: DataWrapper) {

    }
}

export default InitPosition