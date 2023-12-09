import { RawBuffer } from '../RawBuffer';
import { FacilityAirport } from '../datastructures/FacilityAirport';
import { RecvFacilitiesList } from './RecvFacilitiesList';

export class RecvAirportList extends RecvFacilitiesList {
    airports: FacilityAirport[];

    constructor(data: RawBuffer) {
        super(data);
        this.airports = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.airports.push(new FacilityAirport(data));
        }
    }
}
