import { RawBuffer } from '../RawBuffer';
import { readFields } from '../internal/decode';

export class RecvOpen {
    applicationName!: string;

    applicationVersionMajor!: number;

    applicationVersionMinor!: number;

    applicationBuildMajor!: number;

    applicationBuildMinor!: number;

    simConnectVersionMajor!: number;

    simConnectVersionMinor!: number;

    simConnectBuildMajor!: number;

    simConnectBuildMinor!: number;

    reserved1!: number;

    reserved2!: number;

    constructor(data: RawBuffer) {
        Object.assign(
            this,
            readFields(data, {
                applicationName: buffer => buffer.readString256(),
                applicationVersionMajor: buffer => buffer.readInt32(),
                applicationVersionMinor: buffer => buffer.readInt32(),
                applicationBuildMajor: buffer => buffer.readInt32(),
                applicationBuildMinor: buffer => buffer.readInt32(),
                simConnectVersionMajor: buffer => buffer.readInt32(),
                simConnectVersionMinor: buffer => buffer.readInt32(),
                simConnectBuildMajor: buffer => buffer.readInt32(),
                simConnectBuildMinor: buffer => buffer.readInt32(),
                reserved1: buffer => buffer.readInt32(),
                reserved2: buffer => buffer.readInt32(),
            })
        );
    }
}
