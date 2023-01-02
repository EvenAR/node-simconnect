import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';

class LatLonAlt implements SimConnectData {
    latitude = 0;

    longitude = 0;

    altitude = 0;

    read(buffer: RawBuffer) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
    }

    write(buffer: RawBuffer) {
        buffer.writeFloat64(this.latitude);
        buffer.writeFloat64(this.longitude);
        buffer.writeFloat64(this.altitude);
    }
}

export { LatLonAlt };
