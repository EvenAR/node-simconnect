import { RawBuffer } from '../RawBuffer';
import { FacilityAirport } from '../facility/FacilityAirport';
import { RecvFacilitiesList } from './RecvFacilitiesList';

export class RecvAirportList extends RecvFacilitiesList {
    aiports: FacilityAirport[];

    constructor(data: RawBuffer) {
        super(data);
        this.airports = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.airports.push(new FacilityAirport(data));
        }
    }
}
