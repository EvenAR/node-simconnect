import { RawBuffer } from '../RawBuffer';

export class FacilityAirport {
    icao: string;

    region: string;

    latitude: number;

    longitude: number;

    altitude: number;

    constructor(data: RawBuffer) {
        this.icao = data.readString(6);
        this.region = data.readString(3);
        this.latitude = data.readFloat64();
        this.longitude = data.readFloat64();
        this.altitude = data.readFloat64();
    }
}
