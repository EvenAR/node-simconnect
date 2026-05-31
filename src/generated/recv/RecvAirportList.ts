// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { RecvFacilitiesList } from './RecvFacilitiesList';
import { FacilityAirport } from '../datastructures/FacilityAirport';

export class RecvAirportList extends RecvFacilitiesList {
    airports: FacilityAirport[];

    constructor(data: RawBuffer, protocol: Protocol) {
        super(data);
        this.airports = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.airports.push(new FacilityAirport(data, protocol));
        }
    }
}
