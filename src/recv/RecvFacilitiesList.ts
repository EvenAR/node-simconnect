import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';
import { readFields } from '../internal/decode';

export class RecvFacilitiesList {
    requestID!: DataRequestId;

    arraySize!: number;

    entryNumber!: number;

    outOf!: number;

    constructor(data: RawBuffer) {
        Object.assign(
            this,
            readFields(data, {
                requestID: buffer => buffer.readInt32() as DataRequestId,
                arraySize: buffer => buffer.readInt32(),
                entryNumber: buffer => buffer.readInt32(),
                outOf: buffer => buffer.readInt32(),
            })
        );
    }
}
