import type { SimConnectData } from './SimConnectData';
import type { RawBuffer } from '../RawBuffer';
import type { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';

class MarkerState implements SimConnectData {
    markerName = '';

    markerState = false;

    readFrom(buffer: RawBuffer) {
        this.markerName = buffer.readString64();
        this.markerState = buffer.readInt32() !== 0;
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder //
            .putString(this.markerName, 64)
            .putInt32(this.markerState ? 1 : 0);
    }
}

export { MarkerState };
