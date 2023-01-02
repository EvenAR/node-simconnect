import { FacilityDataType } from '../enums/FacilityDataType';
import { RawBuffer } from '../RawBuffer';
import { DataDefinitionId, DataRequestId } from '../Types';

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
        this.userRequestId = data.readInt32();
        this.uniqueRequestId = data.readInt32();
        this.parentUniqueRequestId = data.readInt32();
        this.type = data.readInt32();
        this.isListItem = data.readInt32() === 1;
        this.itemIndex = data.readInt32();
        this.listSize = data.readInt32();
        this.data = data;
    }
}
