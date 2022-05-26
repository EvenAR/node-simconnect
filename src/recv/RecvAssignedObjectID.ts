import {RawBuffer}from "../RawBuffer";

export class RecvAssignedObjectID {
    requestID: number;

    objectID: number;

    constructor(data: RawBuffer) {
        this.requestID = data.readInt();
        this.objectID = data.readInt();
    }
}
