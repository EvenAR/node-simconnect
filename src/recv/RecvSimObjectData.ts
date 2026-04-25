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
        this.requestID = data.readUint32() as DataRequestId;
        this.objectID = data.readUint32() as ObjectId;
        this.defineID = data.readUint32() as DataDefinitionId;
        this.flags = data.readUint32() as DataRequestFlag;
        this.entryNumber = data.readUint32();
        this.outOf = data.readUint32();
        this.defineCount = data.readUint32();
        this.data = data;
    }
}
