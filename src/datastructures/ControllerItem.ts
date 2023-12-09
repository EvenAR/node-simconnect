import { VersionBaseType } from '../dto';
import { RawBuffer } from '../RawBuffer';

export class ControllerItem {
    deviceName: string;

    deviceId: number;

    productId: number;

    compositeId: number;

    hardwareVersion: VersionBaseType;

    constructor(data: RawBuffer) {
        this.deviceName = data.readString256();
        this.deviceId = data.readInt32();
        this.productId = data.readInt32();
        this.compositeId = data.readInt32();
        this.hardwareVersion = new VersionBaseType(data);
    }
}
