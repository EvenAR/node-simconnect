import SimConnectData from "./SimConnectData";
import DataWrapper from "../DataWrapper";
import ByteBuffer from "bytebuffer";

class MarkerState implements SimConnectData {
    markerName: string = "";
    markerState: boolean = false;

    read(buffer: DataWrapper) {
        this.markerName = buffer.readString64();
        this.markerState = buffer.readInt32() !== 0;
    };

    write(buffer: ByteBuffer) {

    };
}

export default MarkerState;