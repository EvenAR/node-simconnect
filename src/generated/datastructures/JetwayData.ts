// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { LatLonAlt } from '../dto/LatLonAlt';
import { PBH } from '../dto/PBH';
import { JetwayStatus } from '../enums/JetwayStatus';
import { XYZ } from '../dto/XYZ';

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
    jetwayObjectId: number;
    attachedObjectId: number;

    constructor(data: RawBuffer) {
        this.airportIcao = data.readString(8);
        this.parkingIndex = data.readInt32();
        this.latLngAlt = new LatLonAlt();
        this.latLngAlt.readFrom(data);
        this.pbh = new PBH();
        this.pbh.readFrom(data);
        this.status = data.readUint32() as JetwayStatus;
        this.door = data.readInt32();
        this.exitDoorRelativePos = new XYZ();
        this.exitDoorRelativePos.readFrom(data);
        this.mainHandlePos = new XYZ();
        this.mainHandlePos.readFrom(data);
        this.secondaryHandle = new XYZ();
        this.secondaryHandle.readFrom(data);
        this.wheelGroundLock = new XYZ();
        this.wheelGroundLock.readFrom(data);
        this.jetwayObjectId = data.readUint32();
        this.attachedObjectId = data.readUint32();
    }
}
