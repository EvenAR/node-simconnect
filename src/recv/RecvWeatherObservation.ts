import { RawBuffer } from '../RawBuffer';
import type { DataRequestId } from '../Types';

export class RecvWeatherObservation {
    requestID: DataRequestId;

    metar: string;

    constructor(data: RawBuffer) {
        this.requestID = data.readUint32() as DataRequestId;
        this.metar = data.readStringV();
    }
}
