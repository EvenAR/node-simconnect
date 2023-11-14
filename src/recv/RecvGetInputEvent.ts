import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';
import { InputEventType } from '../enums/InputEventType';

export class RecvGetInputEvent {
    requestID: DataRequestId;

    type: InputEventType;

    value: number | string;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt32();
        this.type = data.readUint32();

        switch (this.type) {
            case InputEventType.STRING:
                this.value = data.readString256();
                break;
            case InputEventType.DOUBLE:
                this.value = data.readFloat64();
                break;
            default:
                throw Error(`Unknown input event type: ${this.type}`);
        }
    }
}
