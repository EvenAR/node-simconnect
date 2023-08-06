import { LatLonAlt } from '../dto/LatLonAlt';
import { PBH } from '../dto/PBH';
import { JetwayStatus } from '../enums/JetwayStatus';
import { XYZ } from '../dto/XYZ';
import { ObjectId } from '../id-types';
import { RawBuffer } from '../RawBuffer';

export class JetwayData {
    airportIcao: string;

    parkingIndex: number;

    latLngAlt: LatLonAlt;

    pbh: PBH;

    status: JetwayStatus;

    door: number;

    exitDoorRelativePos: XYZ;

    mainHandlePos: XYZ;

    secondaryHandle: XYZ;

    wheelGroundLock: XYZ;

    jetwayObjectId: ObjectId;

    attachedObjectId: ObjectId;

    constructor(data: RawBuffer) {
        this.airportIcao = data.readString(8);
        this.parkingIndex = data.readInt32();
        this.latLngAlt = data.readLatLonAlt();
        this.pbh = data.readPBH();
        this.status = data.readInt32();
        this.door = data.readInt32();
        this.exitDoorRelativePos = data.readXYZ();
        this.mainHandlePos = data.readXYZ();
        this.secondaryHandle = data.readXYZ();
        this.wheelGroundLock = data.readXYZ();
        this.jetwayObjectId = data.readUint32() as ObjectId;
        this.attachedObjectId = data.readUint32() as ObjectId;
    }
}
