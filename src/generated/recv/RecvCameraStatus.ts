// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { CameraAvailability } from '../enums/CameraAvailability';

export class RecvCameraStatus {
    acquiredState: CameraAvailability;
    gameControlled: boolean;

    constructor(data: RawBuffer) {
        this.acquiredState = data.readUint32() as CameraAvailability;
        this.gameControlled = data.readInt32() !== 0;
    }
}
