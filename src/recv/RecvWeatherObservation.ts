import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';

export class RecvWeatherObservation {
    requestID: DataRequestId;

    metar: string;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt() as DataRequestId;
        this.metar = data.readStringV();
    }
}
