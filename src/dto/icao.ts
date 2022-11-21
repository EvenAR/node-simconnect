import { RawBuffer } from '../RawBuffer';

export class Icao {
    type: 'V' | 'N' | 'W';

    ident: string;

    region: string;

    airport: string;

    constructor(data: RawBuffer) {
        this.type = data.readString(1)[0] as 'V' | 'N' | 'W';
        this.ident = data.readString(6);
        this.region = data.readString(3);
        this.airport = data.readString(5);
    }
}
