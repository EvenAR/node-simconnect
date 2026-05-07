import { RawBuffer } from '../RawBuffer';
import { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';
import { PositionReferential } from '../enums/PositionReferential';
import { PBH } from './PBH';
import { XYZ } from './XYZ';

export class CameraData {
    position: XYZ = new XYZ();

    positionReferential: PositionReferential = PositionReferential.NONE;

    positionReferentialObjectId = 0;

    targetedPos: XYZ = new XYZ();

    pbh: PBH = new PBH();

    rotationReferential: PositionReferential = PositionReferential.NONE;

    rotationReferentialObjectId = 0;

    fov = 0;

    readFrom(buffer: RawBuffer) {
        this.position.readFrom(buffer);
        this.positionReferential = buffer.readUint32() as PositionReferential;
        this.positionReferentialObjectId = buffer.readUint32();
        this.targetedPos.readFrom(buffer);
        this.pbh.readFrom(buffer);
        this.rotationReferential = buffer.readUint32() as PositionReferential;
        this.rotationReferentialObjectId = buffer.readUint32();
        this.fov = buffer.readFloat64();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        this.position.writeTo(packetBuilder);
        packetBuilder
            .putUint32(this.positionReferential)
            .putUint32(this.positionReferentialObjectId);
        this.targetedPos.writeTo(packetBuilder);
        this.pbh.writeTo(packetBuilder);
        packetBuilder
            .putUint32(this.rotationReferential)
            .putUint32(this.rotationReferentialObjectId)
            .putFloat64(this.fov);
    }
}
