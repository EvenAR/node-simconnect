import { RawBuffer } from '../RawBuffer';

export class RecvException {
    exception: number;

    sendId: number;

    index: number;

    constructor(data: RawBuffer) {
        this.exception = data.readInt32();
        this.sendId = data.readInt32();
        this.index = data.readInt32();
    }
}

module.exports = { RecvException };
