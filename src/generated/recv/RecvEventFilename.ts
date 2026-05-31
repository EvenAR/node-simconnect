// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { RecvEvent } from './RecvEvent';

export class RecvEventFilename extends RecvEvent {
    fileName: string;
    flags: number;

    constructor(data: RawBuffer) {
        super(data);
        this.fileName = data.readString(260);
        this.flags = data.readUint32();
    }
}
