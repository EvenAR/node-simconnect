import { RawBuffer } from '../RawBuffer';

export class RecvFlowEvent {
    flowEventID: number;

    fltPath: string;

    constructor(data: RawBuffer) {
        this.flowEventID = data.readInt32();
        this.fltPath = data.readString256();
    }
}
