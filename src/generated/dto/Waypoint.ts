// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { SimConnectPacketBuilder } from '../../SimConnectPacketBuilder';
import { SimConnectData } from '../../dto/SimConnectData';

export class Waypoint implements SimConnectData {
    latitude: number = 0;
    longitude: number = 0;
    altitude: number = 0;
    flags: number = 0;
    speed: number = 0;
    throttle: number = 0;

    readFrom(buffer: RawBuffer) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
        this.flags = buffer.readUint32();
        this.speed = buffer.readFloat64();
        this.throttle = buffer.readFloat64();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder.putFloat64(this.latitude);
        packetBuilder.putFloat64(this.longitude);
        packetBuilder.putFloat64(this.altitude);
        packetBuilder.putUint32(this.flags);
        packetBuilder.putFloat64(this.speed);
        packetBuilder.putFloat64(this.throttle);
    }
}
