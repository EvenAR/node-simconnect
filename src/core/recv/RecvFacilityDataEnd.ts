import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';

export class RecvFacilityDataEnd {
    // extends RecvEvent
    userRequestId: DataRequestId;

    constructor(data: RawBuffer) {
        this.userRequestId = data.readInt32();
    }
}
