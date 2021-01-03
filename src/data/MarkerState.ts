import SimConnectData from "./SimConnectData";
import DataWrapper from "../wrappers/DataWrapper";

class MarkerState implements SimConnectData {
    markerName: string = "";
    markerState: boolean = false;

    read(buffer: DataWrapper) {
        this.markerName = buffer.readString64();
        this.markerState = buffer.readInt() !== 0;
    };

    write(buffer: DataWrapper) {

    };
}

export default MarkerState;