import { InputEventType } from '../enums/InputEventType';
import { RawBuffer } from '../RawBuffer';

export class InputEventDescriptor {
    name: string;

    inputEventIdHash: Long;

    type: InputEventType;

    constructor(data: RawBuffer) {
        this.name = data.readString64();
        this.inputEventIdHash = data.readUint64();
        this.type = data.readUint32() as InputEventType;
    }
}
