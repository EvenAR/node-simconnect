import { FacilityMinimal } from '../datastructures/FacilityMinimal';
import { RawBuffer } from '../RawBuffer';
import { RecvFacilitiesList } from './RecvFacilitiesList';
import { Protocol } from '../enums/Protocol';

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
