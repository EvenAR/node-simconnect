// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class RecvFacilityDataEnd {
    userRequestId: number;

    constructor(data: RawBuffer) {
        this.userRequestId = data.readUint32();
    }
}
