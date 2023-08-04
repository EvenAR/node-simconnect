import { RawBuffer } from '../RawBuffer';
import { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';

interface SimConnectData {
    readonly readFrom: (buffer: RawBuffer) => void;
    readonly writeTo: (packetBuilder: SimConnectPacketBuilder) => void;
}

export { SimConnectData };
