import { RawBuffer } from '../RawBuffer';
import { FacilityNDB } from '../datastructures/FacilityNDB';
import { RecvFacilitiesList } from './RecvFacilitiesList';
import { Protocol } from '../enums/Protocol';

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
