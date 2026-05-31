// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { SimConnectPacketBuilder } from '../../SimConnectPacketBuilder';
import { SimConnectData } from '../../dto/SimConnectData';

export class MarkerState implements SimConnectData {
    markerName: string = '';
    markerState: boolean = false;

    readFrom(buffer: RawBuffer) {
        this.markerName = buffer.readString(64);
        this.markerState = buffer.readUint32() !== 0;
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder.putString(this.markerName, 64);
        packetBuilder.putUint32(this.markerState ? 1 : 0);
    }
}
