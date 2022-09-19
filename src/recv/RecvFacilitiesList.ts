import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';

export class RecvFacilitiesList {
    requestID: DataRequestId;

    arraySize: number;

    entryNumber: number;

    outOf: number;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt() as DataRequestId;
        this.arraySize = data.readInt();
        this.entryNumber = data.readInt();
        this.outOf = data.readInt();
    }
}
