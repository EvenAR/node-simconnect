import { RawBuffer } from '../RawBuffer';
import { FacilityWaypoint } from '../datastructures/FacilityWaypoint';
import { RecvFacilitiesList } from './RecvFacilitiesList';
import { Protocol } from '../enums/Protocol';

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
