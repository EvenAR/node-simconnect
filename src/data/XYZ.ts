import SimConnectData from "./SimConnectData";
import DataWrapper from "../DataWrapper";

class XYZ implements SimConnectData {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    read(buffer: DataWrapper) {
        this.x = buffer.readFloat64();
        this.y = buffer.readFloat64();
        this.z = buffer.readFloat64();
    };

    write(buffer: DataWrapper) {

    };
}

export default XYZ;