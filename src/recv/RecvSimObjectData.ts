import {RawBuffer}from "../RawBuffer";

export class RecvSimObjectData {
    requestID: number;

    objectID: number;

    defineID: number;

    flags: number;

    entryNumber: number;

    outOf: number;

    defineCount: number;

    data: RawBuffer;

    constructor(data: RawBuffer) {
        // data.skip(8)
        this.requestID = data.readInt();
        this.objectID = data.readInt();
        this.defineID = data.readInt();
        this.flags = data.readInt();
        this.entryNumber = data.readInt();
        this.outOf = data.readInt();
        this.defineCount = data.readInt();
        this.data = data;
    }
}
