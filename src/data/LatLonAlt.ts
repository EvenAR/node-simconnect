import SimConnectData from "./SimConnectData";
import DataWrapper from "../DataWrapper";
import ByteBuffer from "bytebuffer";

class LatLonAlt implements SimConnectData {
    latitude: number = 0;
    longitude: number = 0;
    altitude: number = 0;

    read(buffer: DataWrapper) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
    };

    write(buffer: ByteBuffer) {

    };
}

export default LatLonAlt;