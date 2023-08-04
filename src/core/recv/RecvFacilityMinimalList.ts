import { FacilityMinimal } from '../facility/FacilityMinimal';
import { RawBuffer } from '../RawBuffer';
import { RecvFacilitiesList } from './RecvFacilitiesList';

export class RecvFacilityMinimalList extends RecvFacilitiesList {
    data: FacilityMinimal[];

    constructor(data: RawBuffer) {
        super(data);
        this.data = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.data.push(new FacilityMinimal(data));
        }
    }
}
