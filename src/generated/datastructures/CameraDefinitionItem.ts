// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class CameraDefinitionItem {
    name: string;

    constructor(data: RawBuffer) {
        this.name = data.readString(256);
    }
}
