import { RawBuffer } from '../RawBuffer';
import { DataRequestFlag } from '../flags/DataRequestFlag';
import { DataDefinitionId, DataRequestId, ObjectId } from '../Types';

export class RecvSimObjectData {
    requestID: DataRequestId;

    objectID: ObjectId;

    defineID: DataDefinitionId;

    flags: DataRequestFlag;

    entryNumber: number;

    outOf: number;

    defineCount: number;

    data: RawBuffer;

    constructor(data: RawBuffer) {
        // data.skip(8)
        this.requestID = data.readInt32() as DataRequestId;
        this.objectID = data.readInt32() as ObjectId;
        this.defineID = data.readInt32() as DataDefinitionId;
        this.flags = data.readInt32() as DataRequestFlag;
        this.entryNumber = data.readInt32();
        this.outOf = data.readInt32();
        this.defineCount = data.readInt32();
        this.data = data;
    }
}
