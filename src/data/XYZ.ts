import SimConnectData from "./SimConnectData";
import DataWrapper from "../wrappers/DataWrapper";

class XYZ implements SimConnectData {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    read(buffer: DataWrapper) {
        this.x = buffer.readDouble();
        this.y = buffer.readDouble();
        this.z = buffer.readDouble();
    };

    write(buffer: DataWrapper) {

    };
}

export default XYZ;