// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { CameraData } from '../dto/CameraData';

export class RecvCameraData {
    cameraData: CameraData;

    constructor(data: RawBuffer) {
        this.cameraData = new CameraData();
        this.cameraData.readFrom(data);
    }
}
