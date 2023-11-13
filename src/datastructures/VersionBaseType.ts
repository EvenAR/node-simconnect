import { RawBuffer } from '../RawBuffer';

export class VersionBaseType {
    major: number;

    minor: number;

    revision: number;

    build: number;

    constructor(data: RawBuffer) {
        this.major = data.readInt16();
        this.minor = data.readInt16();
        this.revision = data.readInt16();
        this.build = data.readInt16();
    }
}
