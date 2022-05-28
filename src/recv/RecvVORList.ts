import { RawBuffer } from '../RawBuffer';
import { FacilityVOR } from '../facility/FacilityVOR';
import { RecvFacilitiesList } from './RecvFacilitiesList';

export class RecvVORList extends RecvFacilitiesList {
    vors: FacilityVOR[];

    constructor(data: RawBuffer) {
        super(data);
        this.vors = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.vors.push(new FacilityVOR(data));
        }
    }
}
