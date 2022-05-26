import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';

class XYZ implements SimConnectData {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    read(buffer: RawBuffer) {
        this.x = buffer.readDouble();
        this.y = buffer.readDouble();
        this.z = buffer.readDouble();
    }

    write(buffer: RawBuffer) {}
}

export { XYZ };
