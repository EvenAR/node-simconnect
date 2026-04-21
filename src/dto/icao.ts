import { RawBuffer } from '../RawBuffer';
import { Protocol } from '../enums/Protocol';

export type IcaoType = 'V' | 'N' | 'W';

export class Icao {
    type: IcaoType;

    ident: string;

    region: string;

    airport: string;

    constructor(data: RawBuffer, protocol: Protocol) {
        const identLength = protocol >= Protocol.SunRise ? 9 : 6;
        this.type = data.readString(1)[0] as IcaoType;
        this.ident = data.readString(identLength);
        this.region = data.readString(3);
        this.airport = data.readString(5);
    }
}
