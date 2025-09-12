import { RawBuffer } from '../RawBuffer';
import { RecvEvent } from './RecvEvent';

export class RecvFlowEvent extends RecvEvent {
    flowEventID: number;

    fltPath: string;

    constructor(data: RawBuffer) {
        super(data);
        this.flowEventID = data.readInt32();
        this.fltPath = data.readString256();
    }
}
