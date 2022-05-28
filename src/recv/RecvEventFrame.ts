import { RawBuffer } from '../RawBuffer';
import { RecvEvent } from './RecvEvent';

export class RecvEventFrame extends RecvEvent {
    frameRate: number;

    simSpeed: number;

    constructor(data: RawBuffer) {
        super(data);
        this.frameRate = data.readFloat();
        this.simSpeed = data.readFloat();
    }
}
