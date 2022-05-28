import { RawBuffer } from '../RawBuffer';

export class RecvException {
    exception: number;

    sendId: number;

    index: number;

    constructor(data: RawBuffer) {
        this.exception = data.readInt();
        this.sendId = data.readInt();
        this.index = data.readInt();
    }
}

module.exports = { RecvException };
