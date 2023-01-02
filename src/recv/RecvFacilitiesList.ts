import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';

export class RecvFacilitiesList {
    requestID: DataRequestId;

    arraySize: number;

    entryNumber: number;

    outOf: number;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt32() as DataRequestId;
        this.arraySize = data.readInt32();
        this.entryNumber = data.readInt32();
        this.outOf = data.readInt32();
    }
}
