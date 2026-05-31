// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { SimConnectPacketBuilder } from '../../SimConnectPacketBuilder';
import { Protocol } from '../enums/Protocol';

export function buildFlightLoadPacket(
    protocol: Protocol,
    fileName: string
): SimConnectPacketBuilder {
    const builder = new SimConnectPacketBuilder(0x3d, protocol);
    builder.putString(fileName, 260);
    return builder;
}
