import { LatLonAlt } from '../dto/LatLonAlt';
import { PBH } from '../dto/PBH';
import { JetwayStatus } from '../enums/JetwayStatus';
import { XYZ } from '../dto/XYZ';
import { ObjectId } from '../Types';
import { RawBuffer } from '../RawBuffer';
import { readLatLonAlt, readPBH, readXYZ } from '../dto/bufferHelpers';

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
        this.latLngAlt = readLatLonAlt(data);
        this.pbh = readPBH(data);
        this.status = data.readInt32();
        this.door = data.readInt32();
        this.exitDoorRelativePos = readXYZ(data);
        this.mainHandlePos = readXYZ(data);
        this.secondaryHandle = readXYZ(data);
        this.wheelGroundLock = readXYZ(data);
        this.jetwayObjectId = data.readUint32() as ObjectId;
        this.attachedObjectId = data.readUint32() as ObjectId;
    }
}
