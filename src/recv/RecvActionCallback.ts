import { RawBuffer } from '../RawBuffer';
import { RecvEvent } from './RecvEvent';
import type { DataRequestId } from '../Types';

export class RecvActionCallback extends RecvEvent {
    requestID: DataRequestId;

    actionID: string;

    constructor(data: RawBuffer) {
        super(data);
        this.actionID = data.readString260();
        this.requestID = data.readUint32();
    }
}
