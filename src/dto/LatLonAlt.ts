import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';

class LatLonAlt implements SimConnectData {
    latitude: number = 0;
    longitude: number = 0;
    altitude: number = 0;

    read(buffer: RawBuffer) {
        this.latitude = buffer.readDouble();
        this.longitude = buffer.readDouble();
        this.altitude = buffer.readDouble();
    }

    write(buffer: RawBuffer) {}
}

export { LatLonAlt };
