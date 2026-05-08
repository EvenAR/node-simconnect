import { RawBuffer } from '../RawBuffer';

export class EnumerateSimobjectLivery {
    aircraftTitle: string;

    liveryName: string;

    constructor(data: RawBuffer) {
        this.aircraftTitle = data.readString256();
        this.liveryName = data.readString256();
    }
}
