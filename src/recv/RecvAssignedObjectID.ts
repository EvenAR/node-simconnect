import { RawBuffer } from '../RawBuffer';
import { DataRequestId, ObjectId } from '../Types';

export class RecvAssignedObjectID {
    requestID: DataRequestId;

    objectID: ObjectId;

    constructor(data: RawBuffer) {
        this.requestID = data.readUint32() as DataRequestId;
        this.objectID = data.readUint32() as ObjectId;
    }
}
