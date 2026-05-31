// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class RecvEnumerateInputEventParams {
    inputEventIdHash: bigint;
    value: string;

    constructor(data: RawBuffer) {
        this.inputEventIdHash = data.readUint64();
        this.value = data.readStringV();
    }
}
