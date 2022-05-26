import {RawBuffer} from "../RawBuffer";

export class FacilityAirport {
    icao: string;

    latitude: number;

    longitude: number;

    altitude: number;

    constructor(data: RawBuffer) {
        this.icao = data.readString(9);
        this.latitude = data.readDouble();
        this.longitude = data.readDouble();
        this.altitude = data.readDouble();
    }
}
