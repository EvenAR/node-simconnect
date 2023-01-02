import { RawBuffer } from '../RawBuffer';

export class RecvOpen {
    applicationName: string;

    applicationVersionMajor: number;

    applicationVersionMinor: number;

    applicationBuildMajor: number;

    applicationBuildMinor: number;

    simConnectVersionMajor: number;

    simConnectVersionMinor: number;

    simConnectBuildMajor: number;

    simConnectBuildMinor: number;

    reserved1: number;

    reserved2: number;

    constructor(data: RawBuffer) {
        this.applicationName = data.readString256();
        this.applicationVersionMajor = data.readInt32();
        this.applicationVersionMinor = data.readInt32();
        this.applicationBuildMajor = data.readInt32();
        this.applicationBuildMinor = data.readInt32();
        this.simConnectVersionMajor = data.readInt32();
        this.simConnectVersionMinor = data.readInt32();
        this.simConnectBuildMajor = data.readInt32();
        this.simConnectBuildMinor = data.readInt32();
        this.reserved1 = data.readInt32();
        this.reserved2 = data.readInt32();
    }
}
