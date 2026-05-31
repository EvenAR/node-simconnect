// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { RecvFacilitiesList } from './RecvFacilitiesList';
import { FacilityWaypoint } from '../datastructures/FacilityWaypoint';

export class RecvWaypointList extends RecvFacilitiesList {
    waypoints: FacilityWaypoint[];

    constructor(data: RawBuffer, protocol: Protocol) {
        super(data);
        this.waypoints = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.waypoints.push(new FacilityWaypoint(data, protocol));
        }
    }
}
