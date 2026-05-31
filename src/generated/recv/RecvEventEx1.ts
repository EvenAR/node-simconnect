// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class RecvEventEx1 {
    groupID: number;
    clientEventId: number;
    data: [number, number, number, number, number];

    constructor(data: RawBuffer) {
        this.groupID = data.readUint32();
        this.clientEventId = data.readUint32();
        this.data = [
            data.readUint32(),
            data.readUint32(),
            data.readUint32(),
            data.readUint32(),
            data.readUint32(),
        ];
    }
}
