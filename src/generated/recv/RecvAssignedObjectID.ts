// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class RecvAssignedObjectID {
    requestID: number;
    objectID: number;

    constructor(data: RawBuffer) {
        this.requestID = data.readUint32();
        this.objectID = data.readUint32();
    }
}
