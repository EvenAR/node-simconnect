// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { SimConnectPacketBuilder } from '../../SimConnectPacketBuilder';
import { SimConnectData } from '../../dto/SimConnectData';
import { XYZ } from './XYZ';
import { PositionReferential } from '../enums/PositionReferential';
import { PBH } from './PBH';

export class CameraData implements SimConnectData {
    position: XYZ = new XYZ();
    positionReferential: PositionReferential = 0 as PositionReferential;
    positionReferentialObjectId: number = 0;
    targetedPos: XYZ = new XYZ();
    pbh: PBH = new PBH();
    rotationReferential: PositionReferential = 0 as PositionReferential;
    rotationReferentialObjectId: number = 0;
    fov: number = 0;

    readFrom(buffer: RawBuffer) {
        this.position = new XYZ();
        this.position.readFrom(buffer);
        this.positionReferential = buffer.readUint32() as PositionReferential;
        this.positionReferentialObjectId = buffer.readUint32();
        this.targetedPos = new XYZ();
        this.targetedPos.readFrom(buffer);
        this.pbh = new PBH();
        this.pbh.readFrom(buffer);
        this.rotationReferential = buffer.readUint32() as PositionReferential;
        this.rotationReferentialObjectId = buffer.readUint32();
        this.fov = buffer.readFloat64();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        this.position.writeTo(packetBuilder);
        packetBuilder.putUint32(this.positionReferential);
        packetBuilder.putUint32(this.positionReferentialObjectId);
        this.targetedPos.writeTo(packetBuilder);
        this.pbh.writeTo(packetBuilder);
        packetBuilder.putUint32(this.rotationReferential);
        packetBuilder.putUint32(this.rotationReferentialObjectId);
        packetBuilder.putFloat64(this.fov);
    }
}
