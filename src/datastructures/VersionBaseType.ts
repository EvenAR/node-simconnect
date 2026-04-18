import { RawBuffer } from '../RawBuffer';
import { readFields } from '../internal/decode';

export class VersionBaseType {
    major!: number;

    minor!: number;

    revision!: number;

    build!: number;

    constructor(data: RawBuffer) {
        Object.assign(
            this,
            readFields(data, {
                major: buffer => buffer.readInt16(),
                minor: buffer => buffer.readInt16(),
                revision: buffer => buffer.readInt16(),
                build: buffer => buffer.readInt16(),
            })
        );
    }
}
