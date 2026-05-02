import { SimConnectConstants } from '../SimConnectConstants';
import { RawBuffer } from '../RawBuffer';

export class RecvCommBus {
    /** The name of the CommBus event */
    eventName: string;

    /** The data payload associated with the CommBus event, decoded as a string */
    data: string;

    constructor(data: RawBuffer) {
        this.eventName = data.readString(SimConnectConstants.MAX_PATH);
        this.data = data.readBytes(data.remaining()).toString('utf8');
    }
}
