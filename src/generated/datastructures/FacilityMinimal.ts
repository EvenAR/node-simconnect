// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { Icao } from './Icao';
import { LatLonAlt } from '../dto/LatLonAlt';

export class FacilityMinimal {
    icao: Icao;
    latLonAlt: LatLonAlt;

    constructor(data: RawBuffer, protocol: Protocol) {
        this.icao = new Icao(data, protocol);
        this.latLonAlt = new LatLonAlt();
        this.latLonAlt.readFrom(data);
    }
}
