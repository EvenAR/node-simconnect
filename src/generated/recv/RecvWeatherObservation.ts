// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';

export class RecvWeatherObservation {
    requestID: number;
    metar: string;

    constructor(data: RawBuffer) {
        this.requestID = data.readUint32();
        this.metar = data.readStringV();
    }
}
