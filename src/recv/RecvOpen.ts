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
        this.applicationVersionMajor = data.readUint32();
        this.applicationVersionMinor = data.readUint32();
        this.applicationBuildMajor = data.readUint32();
        this.applicationBuildMinor = data.readUint32();
        this.simConnectVersionMajor = data.readUint32();
        this.simConnectVersionMinor = data.readUint32();
        this.simConnectBuildMajor = data.readUint32();
        this.simConnectBuildMinor = data.readUint32();
        this.reserved1 = data.readUint32();
        this.reserved2 = data.readUint32();
    }
}
