// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { FacilityAirport } from './FacilityAirport';

export class FacilityWaypoint extends FacilityAirport {
    magVar: number;

    constructor(data: RawBuffer, protocol: Protocol) {
        super(data, protocol);
        this.magVar = data.readFloat32();
    }
}
