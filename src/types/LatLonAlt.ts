import SimConnectData from './SimConnectData';
import DataWrapper from '../wrappers/DataWrapper';

class LatLonAlt implements SimConnectData {
    latitude: number = 0;
    longitude: number = 0;
    altitude: number = 0;

    read(buffer: DataWrapper) {
        this.latitude = buffer.readDouble();
        this.longitude = buffer.readDouble();
        this.altitude = buffer.readDouble();
    }

    write(buffer: DataWrapper) {}
}

export default LatLonAlt;
