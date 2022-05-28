import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';

class MarkerState implements SimConnectData {
    markerName = '';

    markerState = false;

    read(buffer: RawBuffer) {
        this.markerName = buffer.readString64();
        this.markerState = buffer.readInt() !== 0;
    }

    // eslint-disable-next-line
    write(buffer: RawBuffer) {}
}

export { MarkerState };
