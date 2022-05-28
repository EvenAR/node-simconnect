import { RawBuffer } from '../RawBuffer';

interface SimConnectData {
    readonly read: (buffer: RawBuffer) => void;
    readonly write: (buffer: RawBuffer) => void;
}

export { SimConnectData };
