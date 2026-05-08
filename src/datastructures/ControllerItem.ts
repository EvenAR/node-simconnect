import { RawBuffer } from '../RawBuffer';
import { VersionBaseType } from './VersionBaseType';

export class ControllerItem {
    deviceName: string;

    deviceId: number;

    productId: number;

    compositeId: number;

    hardwareVersion: VersionBaseType;

    constructor(data: RawBuffer) {
        this.deviceName = data.readString256();
        this.deviceId = data.readUint32();
        this.productId = data.readUint32();
        this.compositeId = data.readUint32();
        this.hardwareVersion = new VersionBaseType(data);
    }
}
