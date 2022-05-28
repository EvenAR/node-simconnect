import { RawBuffer } from '../RawBuffer';
import { FacilityWaypoint } from './FacilityWaypoint';

export class FacilityNDB extends FacilityWaypoint {
    frequency: number;

    constructor(data: RawBuffer) {
        super(data);
        this.frequency = data.readInt();
    }
}
