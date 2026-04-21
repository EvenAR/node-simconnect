import { RawBuffer } from '../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { FacilityWaypoint } from './FacilityWaypoint';

export class FacilityNDB extends FacilityWaypoint {
    frequency: number;

    constructor(data: RawBuffer, protocol: Protocol) {
        super(data, protocol);
        this.frequency = data.readInt32();
    }
}
