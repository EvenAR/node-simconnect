import SimConnectData from "./SimConnectData";
import DataWrapper from "../DataWrapper";

class MarkerState implements SimConnectData {
    markerName: string = "";
    markerState: boolean = false;

    read(buffer: DataWrapper) {
        this.markerName = buffer.readString64();
        this.markerState = buffer.readInt32() !== 0;
    };

    write(buffer: DataWrapper) {

    };
}

export default MarkerState;