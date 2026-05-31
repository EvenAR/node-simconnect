// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { SimConnectPacketBuilder } from '../../SimConnectPacketBuilder';
import { SimConnectData } from '../../dto/SimConnectData';

export class XYZ implements SimConnectData {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    readFrom(buffer: RawBuffer) {
        this.x = buffer.readFloat64();
        this.y = buffer.readFloat64();
        this.z = buffer.readFloat64();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder.putFloat64(this.x);
        packetBuilder.putFloat64(this.y);
        packetBuilder.putFloat64(this.z);
    }
}
