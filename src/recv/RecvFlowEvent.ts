import { RawBuffer } from '../RawBuffer';

export class RecvFlowEvent {
    flowEventID: number;

    fltPath: string;

    constructor(data: RawBuffer) {
        this.flowEventID = data.readUint32();
        this.fltPath = data.readString256();
    }
}
