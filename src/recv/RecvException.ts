import { RawBuffer } from '../RawBuffer';
import { SimConnectException } from '../enums/SimConnectException';

export class RecvException {
    exception: number;

    sendId: number;

    index: number;

    exceptionName: string;

    constructor(data: RawBuffer) {
        this.exception = data.readInt32();
        this.sendId = data.readInt32();
        this.index = data.readInt32();

        this.exceptionName = SimConnectException[this.exception];
    }
}

module.exports = { RecvException };
