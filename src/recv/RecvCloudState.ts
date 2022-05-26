import {RawBuffer}from "../RawBuffer";

export class RecvCloudState {
    requestID: number;

    arraySize: number;

    data: number[][];

    constructor(data: RawBuffer) {
        this.requestID = data.readInt();
        this.arraySize = data.readInt();
        this.data = [];
        // Read 2D-array of 64x64 bytes
        for (let i = 0; i < 64; i++) {
            this.data[i] = [...data.readBytes(64)];
        }
    }
}
