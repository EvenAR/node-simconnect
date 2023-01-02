import { SimConnectConstants } from '../SimConnectConstants';
import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';

export class RecvSystemState {
    requestID: DataRequestId;

    dataInteger: number;

    dataFloat: number;

    dataString: string;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt32() as DataRequestId;
        this.dataInteger = data.readInt32();
        this.dataFloat = data.readFloat32();
        this.dataString = data.readString(SimConnectConstants.MAX_PATH);
    }
}
