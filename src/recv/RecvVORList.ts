import { RawBuffer } from '../RawBuffer';
import { FacilityVOR } from '../datastructures/FacilityVOR';
import { RecvFacilitiesList } from './RecvFacilitiesList';
import { Protocol } from '../enums/Protocol';

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
