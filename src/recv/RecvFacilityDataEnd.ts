import { RawBuffer } from '../RawBuffer';
import type { DataRequestId } from '../Types';

export class RecvFacilityDataEnd {
    // extends RecvEvent
    userRequestId: DataRequestId;

    constructor(data: RawBuffer) {
        this.userRequestId = data.readUint32();
    }
}
