// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class RecvSystemState {
    requestID: number;
    dataInteger: number;
    dataFloat: number;
    dataString: string;

    constructor(data: RawBuffer) {
        this.requestID = data.readUint32();
        this.dataInteger = data.readUint32();
        this.dataFloat = data.readFloat32();
        this.dataString = data.readString(260);
    }
}
