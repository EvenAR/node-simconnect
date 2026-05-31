// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { FacilityWaypoint } from './FacilityWaypoint';

export class FacilityNDB extends FacilityWaypoint {
    frequency: number;

    constructor(data: RawBuffer, protocol: Protocol) {
        super(data, protocol);
        this.frequency = data.readUint32();
    }
}
