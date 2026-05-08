import { CameraAvailability } from '../enums/CameraAvailability';
import { RawBuffer } from '../RawBuffer';

export class RecvCameraStatus {
    acquiredState: CameraAvailability;

    gameControlled: boolean;

    constructor(data: RawBuffer) {
        this.acquiredState = data.readUint32() as CameraAvailability;
        this.gameControlled = data.readInt32() !== 0;
    }
}
