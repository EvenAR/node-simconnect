import { SimConnectConstants } from "../SimConnectConstants";
import {RawBuffer}from "../RawBuffer";


export class RecvSystemState {
    requestID: number;

    dataInteger: number;

    dataFloat: number;

    dataString: string;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt();
        this.dataInteger = data.readInt();
        this.dataFloat = data.readFloat();
        this.dataString = data.readString(SimConnectConstants.MAX_PATH);
    }
}
