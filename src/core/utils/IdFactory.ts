export type DataRequestId = number;
export type DataDefinitionId = number;
export type ClientDataDefinitionId = number;
export type ObjectId = number;
export type ClientEventId = number;
export type NotificationGroupId = number;
export type InputGroupId = number;
export type ClientDataId = number;

/**
 * Helper class that keeps track of IDs
 */
export class IdFactory {
    private _nextDataRequestId: DataRequestId;

    private _nextDataDefinitionId: DataDefinitionId;

    private _nextClientDataDefinitionId: ClientDataDefinitionId;

    private _nextClientEventId: ClientEventId;

    constructor() {
        this._nextDataRequestId = 0 as DataRequestId;
        this._nextDataDefinitionId = 0 as DataDefinitionId;
        this._nextClientDataDefinitionId = 0 as ClientDataDefinitionId;
        this._nextClientEventId = 0 as ClientEventId;
    }

    get nextDataRequestId() {
        return this._nextDataRequestId++ as DataRequestId;
    }

    get nextDataDefinitionId() {
        return this._nextDataDefinitionId++ as DataDefinitionId;
    }

    get nextClientDataDefinitionId() {
        return this._nextClientDataDefinitionId++ as ClientDataDefinitionId;
    }

    get nextClientEventId() {
        return this._nextClientEventId++ as ClientEventId;
    }
}
