import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';

class XYZ implements SimConnectData {
    x = 0;

    y = 0;

    z = 0;

    read(buffer: RawBuffer) {
        this.x = buffer.readDouble();
        this.y = buffer.readDouble();
        this.z = buffer.readDouble();
    }

    // eslint-disable-next-line
    write(buffer: RawBuffer) {}
}

export { XYZ };
