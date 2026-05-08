import { RawBuffer } from '../RawBuffer';

export class CameraDefinitionItem {
    name: string;

    constructor(data: RawBuffer) {
        this.name = data.readString256();
    }
}
