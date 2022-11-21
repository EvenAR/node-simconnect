import { Icao, LatLonAlt, readLatLonAlt } from '../dto';
import { RawBuffer } from '../RawBuffer';

export class FacilityMinimal {
    icao: Icao;

    latLonAlt: LatLonAlt;

    constructor(data: RawBuffer) {
        this.icao = new Icao(data);
        this.latLonAlt = readLatLonAlt(data);
    }
}
