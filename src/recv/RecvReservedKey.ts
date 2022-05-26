import {RawBuffer}from "../RawBuffer";

export class RecvReservedKey {
    choiceReserved: string;

    reservedKey: string;

    constructor(data: RawBuffer) {
        this.choiceReserved = data.readString(50)
           this.reservedKey = data.readString(30)
    }
}
