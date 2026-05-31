// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { FacilityDataType } from '../enums/FacilityDataType';

export class RecvFacilityData {
    userRequestId: number;
    uniqueRequestId: number;
    parentUniqueRequestId: number;
    type: FacilityDataType;
    isListItem: boolean;
    itemIndex: number;
    listSize: number;
    data: RawBuffer;

    constructor(data: RawBuffer) {
        this.userRequestId = data.readUint32();
        this.uniqueRequestId = data.readUint32();
        this.parentUniqueRequestId = data.readUint32();
        this.type = data.readUint32() as FacilityDataType;
        this.isListItem = data.readUint32() !== 0;
        this.itemIndex = data.readUint32();
        this.listSize = data.readUint32();
        this.data = data;
    }
}
