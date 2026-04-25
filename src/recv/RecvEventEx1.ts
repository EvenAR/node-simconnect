import { RawBuffer } from '../RawBuffer';
import { ClientEventId, InputGroupId, NotificationGroupId } from '../Types';

export class RecvEventEx1 {
    groupID: NotificationGroupId | InputGroupId;

    clientEventId: ClientEventId;

    /** Contains max 5 bytes of data */
    data: [number, number, number, number, number];

    constructor(data: RawBuffer) {
        this.groupID = data.readUint32() as NotificationGroupId;
        this.clientEventId = data.readUint32() as ClientEventId;
        this.data = [
            data.readUint32(),
            data.readUint32(),
            data.readUint32(),
            data.readUint32(),
            data.readUint32(),
        ];
    }
}
