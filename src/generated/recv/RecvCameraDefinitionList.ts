// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { RecvListTemplate } from './RecvListTemplate';
import { CameraDefinitionItem } from '../datastructures/CameraDefinitionItem';

export class RecvCameraDefinitionList extends RecvListTemplate {
    cameraDefinitions: CameraDefinitionItem[];

    constructor(data: RawBuffer) {
        super(data);
        this.cameraDefinitions = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.cameraDefinitions.push(new CameraDefinitionItem(data));
        }
    }
}
