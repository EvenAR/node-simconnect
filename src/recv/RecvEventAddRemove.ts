import { SimObjectType } from '../enums/SimObjectType';
import { RawBuffer } from '../RawBuffer';
import { RecvEvent } from './RecvEvent';

export class RecvEventAddRemove extends RecvEvent {
    type: SimObjectType;

    constructor(data: RawBuffer) {
        super(data);
        this.type = data.readInt();
    }
}
