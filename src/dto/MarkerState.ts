import { SimConnectData } from './SimConnectData';
import {RawBuffer} from '../RawBuffer';

class MarkerState implements SimConnectData {
    markerName: string = '';
    markerState: boolean = false;

    read(buffer: RawBuffer) {
        this.markerName = buffer.readString64();
        this.markerState = buffer.readInt() !== 0;
    }

    write(buffer: RawBuffer) {}
}

export { MarkerState };
