import {RawBuffer}from "../RawBuffer";
import { FacilityAirport } from "./FacilityAirport";

export class FacilityWaypoint extends FacilityAirport {

    magVar: number;

    constructor(data: RawBuffer) {
        super(data);
        this.magVar = data.readFloat();
    }
}
