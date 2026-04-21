import { Icao, LatLonAlt, readLatLonAlt } from '../dto';
import { RawBuffer } from '../RawBuffer';
import { Protocol } from '../enums/Protocol';

export class FacilityMinimal {
    icao: Icao;

    latLonAlt: LatLonAlt;

    constructor(data: RawBuffer, protocol: Protocol) {
        this.icao = new Icao(data, protocol);
        this.latLonAlt = readLatLonAlt(data);
    }
}
