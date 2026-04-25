import { FacilityDataType } from '../enums/FacilityDataType';
import { RawBuffer } from '../RawBuffer';
import type { DataDefinitionId, DataRequestId } from '../Types';

export class RecvFacilityData {
    userRequestId: DataRequestId;

    uniqueRequestId: DataDefinitionId;

    parentUniqueRequestId: DataDefinitionId;

    type: FacilityDataType;

    isListItem: boolean;

    itemIndex: number;

    listSize: number;

    data: RawBuffer;

    constructor(data: RawBuffer) {
        this.userRequestId = data.readUint32();
        this.uniqueRequestId = data.readUint32();
        this.parentUniqueRequestId = data.readUint32();
        this.type = data.readUint32();
        this.isListItem = data.readUint32() === 1;
        this.itemIndex = data.readUint32();
        this.listSize = data.readUint32();
        this.data = data;
    }
}
