// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { Protocol } from '../enums/Protocol';
import { RecvFacilitiesList } from './RecvFacilitiesList';
import { FacilityVOR } from '../datastructures/FacilityVOR';

export class RecvVORList extends RecvFacilitiesList {
    vors: FacilityVOR[];

    constructor(data: RawBuffer, protocol: Protocol) {
        super(data);
        this.vors = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.vors.push(new FacilityVOR(data, protocol));
        }
    }
}
