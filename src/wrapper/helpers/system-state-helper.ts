import { SimConnectApiHelper } from './sim-connect-api-helper';
import { RecvSystemState, SimConnectConnection } from '../../core';

type SystemStateRequest = {
    requestId: number;
    responseHandlers: ResponseHandler[];
};

type ResponseHandler = (state: RecvSystemState) => void;

export class SystemStateHelper extends SimConnectApiHelper {
    private readonly _requests: { [systemEventName: string]: SystemStateRequest };

    constructor(handle: SimConnectConnection) {
        super(handle);
        this._requests = {};
    }

    getAircraftLoaded() {
        return this.makeSystemStatePromise('AircraftLoaded', state => state.dataString);
    }

    getDialogMode() {
        return this.makeSystemStatePromise('DialogMode', state => state.dataInteger === 1);
    }

    getFlightLoaded() {
        return this.makeSystemStatePromise('FlightLoaded', state => state.dataString);
    }

    getFlightPlan() {
        return this.makeSystemStatePromise('FlightPlan', state => state.dataString);
    }

    getSimulationIsRunning() {
        return this.makeSystemStatePromise('Sim', state => state.dataInteger === 1);
    }

    private makeSystemStatePromise<T>(
        name: string,
        callback: (recvSystemState: RecvSystemState) => T
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            this.request(
                name,
                recvSystemState => resolve(callback(recvSystemState)),
                err => reject(err)
            );
        });
    }

    private request(
        stateName: string,
        resHandler: ResponseHandler,
        errHandler: (err: string) => void
    ) {
        const requestId = this._handle.idFactory.nextDataRequestId;
        const sendId = this._handle.requestSystemState(requestId, stateName);

        this._checkForException(sendId, ex => {
            errHandler(`Failed to request system state '${stateName}': ${ex}`);
        });

        this._handle.once('systemState', recvSystemState => resHandler(recvSystemState));
    }
}
