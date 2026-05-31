// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { InputEventType } from '../enums/InputEventType';

export class InputEventDescriptor {
    name: string;
    inputEventIdHash: bigint;
    type: InputEventType;

    constructor(data: RawBuffer) {
        this.name = data.readString(64);
        this.inputEventIdHash = data.readUint64();
        this.type = data.readUint32() as InputEventType;
    }
}
