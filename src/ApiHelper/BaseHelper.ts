import { SimConnectConnection } from '../SimConnectConnection';
import { SimConnectException } from '../enums/SimConnectException';

export class BaseHelper {
    protected readonly _handle: SimConnectConnection;

    private _exceptionHandlers: { [sendId: number]: (ex: SimConnectException) => void } = {};

    constructor(handle: SimConnectConnection) {
        this._handle = handle;

        this._handle.on('exception', recvException => {
            const handler = this._exceptionHandlers[recvException.sendId];
            if (handler !== undefined) {
                handler(recvException.exception);
            }
        });
    }

    /**
     * Should be called immediately after sending a simconnect packet
     * @param sendId the ID of the newly sent packet
     * @param handler function to be called in case of an exception
     * @private
     */
    protected _checkForException(
        sendId: number,
        handler: (exception: SimConnectException) => void
    ) {
        this._exceptionHandlers[sendId] = handler;
        setTimeout(() => {
            // Give SimConnect server some time to throw the exception, then remove the listener
            delete this._exceptionHandlers[sendId];
        }, 1000);
    }
}
