import {RawBuffer}from "../RawBuffer";

export class RecvWeatherObservation {
    requestID: number;

    metar: string;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt();
        this.metar = data.readStringV();
    }
}
