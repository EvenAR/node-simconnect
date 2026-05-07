import { CameraData } from '../dto/CameraData';
import { RawBuffer } from '../RawBuffer';

export class RecvCameraData {
    cameraData: CameraData;

    constructor(data: RawBuffer) {
        this.cameraData = new CameraData();
        this.cameraData.readFrom(data);
    }
}
