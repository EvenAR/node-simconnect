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
        this.requestID = data.readInt() as DataRequestId;
        this.objectID = data.readInt() as ObjectId;
        this.defineID = data.readInt() as DataDefinitionId;
        this.flags = data.readInt() as DataRequestFlag;
        this.entryNumber = data.readInt();
        this.outOf = data.readInt();
        this.defineCount = data.readInt();
        this.data = data;
    }
}
