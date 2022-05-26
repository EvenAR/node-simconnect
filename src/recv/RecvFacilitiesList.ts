import {RawBuffer}from "../RawBuffer";

export class RecvFacilitiesList {
    requestID: number;

    arraySize: number;

    entryNumber: number;

    outOf: number;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt();
        this.arraySize = data.readInt();
        this.entryNumber = data.readInt();
        this.outOf = data.readInt();
    }
}
