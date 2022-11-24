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
        this.userRequestId = data.readInt();
        this.uniqueRequestId = data.readInt();
        this.parentUniqueRequestId = data.readInt();
        this.type = data.readInt();
        this.isListItem = data.readInt() === 1;
        this.itemIndex = data.readInt();
        this.listSize = data.readInt();
        this.data = data;
    }
}
