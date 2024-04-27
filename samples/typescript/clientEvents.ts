import { EventFlag, open, Protocol, SimConnectConstants } from '../../dist';

/**
 * Demonstrates how to use client events to interact with the simulator
 */

enum ClientEventID {
    INCREMENT,
    DECREMENT,
}

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected: ', recvOpen);

        handle.mapClientEventToSimEvent(ClientEventID.INCREMENT, 'AP_ALT_VAR_INC');
        handle.mapClientEventToSimEvent(ClientEventID.DECREMENT, 'AP_ALT_VAR_DEC');

        let step = 0;
        let rise = true;

        // Increment and decrement the altitude every 50ms
        setInterval(() => {
            step++;
            handle.transmitClientEvent(
                SimConnectConstants.OBJECT_ID_USER,
                rise ? ClientEventID.INCREMENT : ClientEventID.DECREMENT,
                0,
                1,
                EventFlag.EVENT_FLAG_GROUPID_IS_PRIORITY
            );

            if (step === 100) {
                rise = !rise; // Change direction
                step = 0;
            }
        }, 50);

        handle.on('error', error => {
            console.log('Error:', error);
        });

        handle.on('exception', recvException => {
            console.log('recvException:', recvException);
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
