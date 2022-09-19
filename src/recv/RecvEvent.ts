import { RawBuffer } from '../RawBuffer';
import { ClientEventId, InputGroupId, NotificationGroupId } from '../Types';

export class RecvEvent {
    groupID: NotificationGroupId | InputGroupId;

    clientEventId: ClientEventId;

    data: number;

    constructor(data: RawBuffer) {
        this.groupID = data.readInt() as NotificationGroupId;
        this.clientEventId = data.readInt() as ClientEventId;
        this.data = data.readInt();
    }
}
