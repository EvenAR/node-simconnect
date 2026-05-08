import { RawBuffer } from '../RawBuffer';
import { Protocol } from '../enums/Protocol';

export class FacilityAirport {
    icao: string;

    region: string;

    latitude: number;

    longitude: number;

    altitude: number;

    constructor(data: RawBuffer, protocol: Protocol) {
        const icaoLength = protocol >= Protocol.SunRise ? 9 : 6;
        this.icao = data.readString(icaoLength);
        this.region = data.readString(3);
        this.latitude = data.readFloat64();
        this.longitude = data.readFloat64();
        this.altitude = data.readFloat64();
    }
}
