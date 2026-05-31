// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { SimConnectPacketBuilder } from '../../SimConnectPacketBuilder';
import { SimConnectData } from '../../dto/SimConnectData';

export class LatLonAlt implements SimConnectData {
    latitude: number = 0;
    longitude: number = 0;
    altitude: number = 0;

    readFrom(buffer: RawBuffer) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder.putFloat64(this.latitude);
        packetBuilder.putFloat64(this.longitude);
        packetBuilder.putFloat64(this.altitude);
    }
}
