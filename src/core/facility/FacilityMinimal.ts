import type { RawBuffer } from '../RawBuffer';
import { Icao } from '../dto/icao';
import type { LatLonAlt } from '../dto/LatLonAlt';

export class FacilityMinimal {
    icao: Icao;

    latLonAlt: LatLonAlt;

    constructor(data: RawBuffer) {
        this.icao = new Icao(data);
        this.latLonAlt = data.readLatLonAlt();
    }
}
