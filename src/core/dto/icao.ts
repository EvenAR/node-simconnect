import { RawBuffer } from '../RawBuffer';

export type IcaoType = 'V' | 'N' | 'W';

export class Icao {
    type: IcaoType;

    ident: string;

    region: string;

    airport: string;

    constructor(data: RawBuffer) {
        this.type = data.readString(1)[0] as IcaoType;
        this.ident = data.readString(6);
        this.region = data.readString(3);
        this.airport = data.readString(5);
    }
}
