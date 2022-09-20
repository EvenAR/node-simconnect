import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';

class LatLonAlt implements SimConnectData {
    latitude = 0;

    longitude = 0;

    altitude = 0;

    read(buffer: RawBuffer) {
        this.latitude = buffer.readDouble();
        this.longitude = buffer.readDouble();
        this.altitude = buffer.readDouble();
    }

    // eslint-disable-next-line
    write(buffer: RawBuffer) {}
}

export { LatLonAlt };
