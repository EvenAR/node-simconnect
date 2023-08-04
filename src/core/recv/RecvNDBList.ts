import { RawBuffer } from '../RawBuffer';
import { FacilityNDB } from '../facility/FacilityNDB';
import { RecvFacilitiesList } from './RecvFacilitiesList';

export class RecvNDBList extends RecvFacilitiesList {
    ndbs: FacilityNDB[];

    constructor(data: RawBuffer) {
        super(data);
        this.ndbs = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.ndbs.push(new FacilityNDB(data));
        }
    }
}
