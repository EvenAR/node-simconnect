// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { SimConnectPacketBuilder } from '../../SimConnectPacketBuilder';
import { SimConnectData } from '../../dto/SimConnectData';

export class InitPosition implements SimConnectData {
    latitude: number = 0;
    longitude: number = 0;
    altitude: number = 0;
    pitch: number = 0;
    bank: number = 0;
    heading: number = 0;
    onGround: boolean = false;
    airspeed: number = 0;

    readFrom(buffer: RawBuffer) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
        this.pitch = buffer.readFloat64();
        this.bank = buffer.readFloat64();
        this.heading = buffer.readFloat64();
        this.onGround = buffer.readInt32() !== 0;
        this.airspeed = buffer.readInt32();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder.putFloat64(this.latitude);
        packetBuilder.putFloat64(this.longitude);
        packetBuilder.putFloat64(this.altitude);
        packetBuilder.putFloat64(this.pitch);
        packetBuilder.putFloat64(this.bank);
        packetBuilder.putFloat64(this.heading);
        packetBuilder.putInt32(this.onGround ? 1 : 0);
        packetBuilder.putInt32(this.airspeed);
    }
}
