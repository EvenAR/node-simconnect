// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { RecvFacilitiesList } from './RecvFacilitiesList';
import { FacilityMinimal } from '../datastructures/FacilityMinimal';

export class RecvFacilityMinimalList extends RecvFacilitiesList {
    data: FacilityMinimal[];

    constructor(data: RawBuffer, protocol: Protocol) {
        super(data);
        this.data = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.data.push(new FacilityMinimal(data, protocol));
        }
    }
}
