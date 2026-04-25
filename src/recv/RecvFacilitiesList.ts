import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';

export class RecvFacilitiesList {
    requestID: DataRequestId;

    arraySize: number;

    entryNumber: number;

    outOf: number;

    constructor(data: RawBuffer) {
        this.requestID = data.readUint32() as DataRequestId;
        this.arraySize = data.readUint32();
        this.entryNumber = data.readUint32();
        this.outOf = data.readUint32();
    }
}
