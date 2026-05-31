// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { SimObjectType } from '../enums/SimObjectType';
import { RecvEvent } from './RecvEvent';

export class RecvEventAddRemove extends RecvEvent {
    type: SimObjectType;

    constructor(data: RawBuffer) {
        super(data);
        this.type = data.readUint32() as SimObjectType;
    }
}
