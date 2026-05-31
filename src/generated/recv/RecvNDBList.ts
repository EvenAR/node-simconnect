// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { RecvFacilitiesList } from './RecvFacilitiesList';
import { FacilityNDB } from '../datastructures/FacilityNDB';

export class RecvNDBList extends RecvFacilitiesList {
    ndbs: FacilityNDB[];

    constructor(data: RawBuffer, protocol: Protocol) {
        super(data);
        this.ndbs = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.ndbs.push(new FacilityNDB(data, protocol));
        }
    }
}
