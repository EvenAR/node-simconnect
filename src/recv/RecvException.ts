import { RawBuffer } from '../RawBuffer';
import { SimConnectException } from '../enums/SimConnectException';

export class RecvException {
    exception: number;

    sendId: number;

    index: number;

    exceptionName: string;

    constructor(data: RawBuffer) {
        this.exception = data.readUint32();
        this.sendId = data.readUint32();
        this.index = data.readUint32();

        this.exceptionName = SimConnectException[this.exception] ?? 'Unknown Exception';
    }
}

module.exports = { RecvException };
