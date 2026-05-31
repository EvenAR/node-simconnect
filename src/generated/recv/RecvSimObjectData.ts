// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { DataRequestFlag } from '../enums/DataRequestFlag';

export class RecvSimObjectData {
    requestID: number;
    objectID: number;
    defineID: number;
    flags: DataRequestFlag;
    entryNumber: number;
    outOf: number;
    defineCount: number;
    data: RawBuffer;

    constructor(data: RawBuffer) {
        this.requestID = data.readUint32();
        this.objectID = data.readUint32();
        this.defineID = data.readUint32();
        this.flags = data.readUint32() as DataRequestFlag;
        this.entryNumber = data.readUint32();
        this.outOf = data.readUint32();
        this.defineCount = data.readUint32();
        this.data = data;
    }
}
