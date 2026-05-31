// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { SimConnectPacketBuilder } from '../../SimConnectPacketBuilder';
import { SimConnectData } from '../../dto/SimConnectData';

export class PBH implements SimConnectData {
    pitch: number = 0;
    bank: number = 0;
    heading: number = 0;

    readFrom(buffer: RawBuffer) {
        this.pitch = buffer.readFloat32();
        this.bank = buffer.readFloat32();
        this.heading = buffer.readFloat32();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder.putFloat32(this.pitch);
        packetBuilder.putFloat32(this.bank);
        packetBuilder.putFloat32(this.heading);
    }
}
