import { RawBuffer } from '../RawBuffer';
import type { ClientEventId, InputGroupId, NotificationGroupId } from '../Types';

export class RecvEvent {
    groupID: NotificationGroupId | InputGroupId;

    clientEventId: ClientEventId;

    data: number;

    constructor(data: RawBuffer) {
        this.groupID = data.readUint32() as NotificationGroupId;
        this.clientEventId = data.readUint32() as ClientEventId;
        this.data = data.readUint32();
    }
}
