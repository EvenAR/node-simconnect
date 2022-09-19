import { SimConnectConstants } from '../SimConnectConstants';
import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';

export class RecvSystemState {
    requestID: DataRequestId;

    dataInteger: number;

    dataFloat: number;

    dataString: string;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt() as DataRequestId;
        this.dataInteger = data.readInt();
        this.dataFloat = data.readFloat();
        this.dataString = data.readString(SimConnectConstants.MAX_PATH);
    }
}
