// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { RecvEvent } from './RecvEvent';

export class RecvEventFrame extends RecvEvent {
    frameRate: number;
    simSpeed: number;

    constructor(data: RawBuffer) {
        super(data);
        this.frameRate = data.readFloat32();
        this.simSpeed = data.readFloat32();
    }
}
