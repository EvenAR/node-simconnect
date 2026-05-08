import { CameraDefinitionItem } from '../datastructures/CameraDefinitionItem';
import { RawBuffer } from '../RawBuffer';
import { RecvListTemplate } from './RecvListTemplate';

export class RecvCameraDefinitionList extends RecvListTemplate {
    cameraDefinitions: CameraDefinitionItem[] = [];

    constructor(data: RawBuffer) {
        super(data);

        this.cameraDefinitions = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.cameraDefinitions.push(new CameraDefinitionItem(data));
        }
    }
}
