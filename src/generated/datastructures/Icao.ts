// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { Protocol } from '../enums/Protocol';

export class Icao {
    type: string;
    ident: string;
    region: string;
    airport: string;

    constructor(data: RawBuffer, protocol: Protocol) {
        this.type = data.readString(1);
        this.ident = data.readString(protocol >= Protocol.SunRise ? 9 : 6);
        this.region = data.readString(3);
        this.airport = data.readString(5);
    }
}
