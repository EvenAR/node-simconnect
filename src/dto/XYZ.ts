import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';

class XYZ implements SimConnectData {
    x = 0;

    y = 0;

    z = 0;

    read(buffer: RawBuffer) {
        this.x = buffer.readFloat64();
        this.y = buffer.readFloat64();
        this.z = buffer.readFloat64();
    }

    write(buffer: RawBuffer) {
        buffer.writeFloat64(this.x);
        buffer.writeFloat64(this.y);
        buffer.writeFloat64(this.z);
    }
}

export { XYZ };
