import { RawBuffer } from '../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { FacilityAirport } from './FacilityAirport';

export class FacilityWaypoint extends FacilityAirport {
    magVar: number;

    constructor(data: RawBuffer, protocol: Protocol) {
        super(data, protocol);
        this.magVar = data.readFloat32();
    }
}
