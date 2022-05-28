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
        this.applicationVersionMajor = data.readInt();
        this.applicationVersionMinor = data.readInt();
        this.applicationBuildMajor = data.readInt();
        this.applicationBuildMinor = data.readInt();
        this.simConnectVersionMajor = data.readInt();
        this.simConnectVersionMinor = data.readInt();
        this.simConnectBuildMajor = data.readInt();
        this.simConnectBuildMinor = data.readInt();
        this.reserved1 = data.readInt();
        this.reserved2 = data.readInt();
    }
}
