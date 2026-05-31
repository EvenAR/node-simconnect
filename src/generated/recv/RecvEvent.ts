// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class RecvEvent {
    groupID: number;
    clientEventId: number;
    data: number;

    constructor(data: RawBuffer) {
        this.groupID = data.readUint32();
        this.clientEventId = data.readUint32();
        this.data = data.readUint32();
    }
}
