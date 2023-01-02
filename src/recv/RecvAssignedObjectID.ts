import { RawBuffer } from '../RawBuffer';
import { DataRequestId, ObjectId } from '../Types';

export class RecvAssignedObjectID {
    requestID: DataRequestId;

    objectID: ObjectId;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt32() as DataRequestId;
        this.objectID = data.readInt32() as ObjectId;
    }
}
