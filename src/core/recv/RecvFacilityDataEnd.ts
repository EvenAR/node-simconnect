import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../id-types';

export class RecvFacilityDataEnd {
    // extends RecvEvent
    userRequestId: DataRequestId;

    constructor(data: RawBuffer) {
        this.userRequestId = data.readInt32();
    }
}
