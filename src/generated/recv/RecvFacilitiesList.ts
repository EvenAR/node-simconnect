// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class RecvFacilitiesList {
    requestID: number;
    arraySize: number;
    entryNumber: number;
    outOf: number;

    constructor(data: RawBuffer) {
        this.requestID = data.readUint32();
        this.arraySize = data.readUint32();
        this.entryNumber = data.readUint32();
        this.outOf = data.readUint32();
    }
}
