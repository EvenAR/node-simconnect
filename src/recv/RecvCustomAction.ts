import { RawBuffer } from '../RawBuffer';

export class RecvCustomAction {
    guid: Buffer;

    waitForCompletion: number;

    payload: string;

    constructor(data: RawBuffer) {
        this.guid = data.readBytes(16);
        this.waitForCompletion = data.readInt32();
        this.payload = data.readString(data.remaining());
    }
}
