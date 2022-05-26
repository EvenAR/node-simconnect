import {RawBuffer}from "../RawBuffer";

export class RecvEvent {
    groupID: number;

    eventID: number;

    data: number;

    constructor(data: RawBuffer) {
        this.groupID = data.readInt();
        this.eventID = data.readInt();
        this.data = data.readInt();
    }
}
