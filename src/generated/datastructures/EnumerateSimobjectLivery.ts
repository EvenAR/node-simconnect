// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class EnumerateSimobjectLivery {
    aircraftTitle: string;
    liveryName: string;

    constructor(data: RawBuffer) {
        this.aircraftTitle = data.readString(256);
        this.liveryName = data.readString(256);
    }
}
