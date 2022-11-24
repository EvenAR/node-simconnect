import { RawBuffer } from '../RawBuffer';
import { ClientEventId, InputGroupId, NotificationGroupId } from '../Types';

export class RecvEventEx1 {
    groupID: NotificationGroupId | InputGroupId;

    clientEventId: ClientEventId;

    /** Contains max 5 bytes of data */
    data: [number, number, number, number, number];

    constructor(data: RawBuffer) {
        this.groupID = data.readInt() as NotificationGroupId;
        this.clientEventId = data.readInt() as ClientEventId;
        this.data = [
            data.readInt(),
            data.readInt(),
            data.readInt(),
            data.readInt(),
            data.readInt(),
        ];
    }
}
