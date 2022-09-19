import { RawBuffer } from '../RawBuffer';
import { DataRequestId } from '../Types';

export class RecvCloudState {
    requestID: DataRequestId;

    arraySize: number;

    data: number[][];

    constructor(data: RawBuffer) {
        this.requestID = data.readInt() as DataRequestId;
        this.arraySize = data.readInt();
        this.data = [];
        // Read 2D-array of 64x64 bytes
        for (let i = 0; i < 64; i++) {
            this.data[i] = [...data.readBytes(64)];
        }
    }
}
