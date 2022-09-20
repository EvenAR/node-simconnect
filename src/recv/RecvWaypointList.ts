import { RawBuffer } from '../RawBuffer';
import { FacilityWaypoint } from '../facility/FacilityWaypoint';
import { RecvFacilitiesList } from './RecvFacilitiesList';

export class RecvWaypointList extends RecvFacilitiesList {
    waypoints: FacilityWaypoint[];

    constructor(data: RawBuffer) {
        super(data);
        this.waypoints = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.waypoints.push(new FacilityWaypoint(data));
        }
    }
}
