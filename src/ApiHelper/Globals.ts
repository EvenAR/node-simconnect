import { ClientDataDefinitionId, ClientEventId, DataDefinitionId, DataRequestId } from '../Types';

/**
 * Singleton class that keeps track of IDs
 */
export class Globals {
    private _nextDataRequestId: DataRequestId;

    private _nextDataDefinitionId: DataDefinitionId;

    private _nextClientDataDefinitionId: ClientDataDefinitionId;

    private _nextClientEventId: ClientEventId;

    private static instance: Globals;

    private constructor() {
        this._nextDataRequestId = 0 as DataRequestId;
        this._nextDataDefinitionId = 0 as DataDefinitionId;
        this._nextClientDataDefinitionId = 0 as ClientDataDefinitionId;
        this._nextClientEventId = 0 as ClientEventId;
    }

    public static getInstance(): Globals {
        if (!Globals.instance) {
            Globals.instance = new Globals();
        }

        return Globals.instance;
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
