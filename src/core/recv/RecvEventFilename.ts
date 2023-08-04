import { SimConnectConstants } from '../SimConnectConstants';
import { RawBuffer } from '../RawBuffer';
import { RecvEvent } from './RecvEvent';

export class RecvEventFilename extends RecvEvent {
    fileName: string;

    flags: number;

    constructor(data: RawBuffer) {
        super(data);
        this.fileName = data.readString(SimConnectConstants.MAX_PATH);
        this.flags = data.readInt32();
    }
}
