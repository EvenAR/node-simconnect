import { RecvException } from '../recv';
import { SimConnectException } from '../enums/SimConnectException';
import { SimConnectConnection } from '../SimConnectConnection';

export function checkForExceptions(
    connection: SimConnectConnection,
    sendId: number,
    handler: (exception: string) => void
) {
    function exceptionHandler(recvException: RecvException) {
        if (recvException.sendId === sendId) {
            handler(SimConnectException[recvException.exception]);
        }
    }

    connection.on('exception', exceptionHandler);

    // Give SimConnect server some time to throw the exception, then remove the listener
    setTimeout(() => {
        connection.off('exception', exceptionHandler);
    }, 1000);
}
