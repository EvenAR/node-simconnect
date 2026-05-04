import { CommBusBroadcastTo, open, Protocol } from '../../dist';

const MY_COMM_BUS_EVENT_ID = 1234;

open('CommBus sample', Protocol.SunRise)
    .then(({ recvOpen, handle }) => {
        console.log('Connected: ', recvOpen);

        handle.subscribeToCommBusEvent(MY_COMM_BUS_EVENT_ID, 'MyCommBusEvent');

        setInterval(() => {
            const payload = JSON.stringify({
                message: 'Hello from Node.js!',
                timestamp: new Date(),
            });
            handle.callCommBusEvent('MyCommBusEvent', CommBusBroadcastTo.ALL_SIMCONNECT, payload);
        }, 1000);

        setTimeout(() => {
            console.log('Unsubscribing from CommBus event');
            handle.unsubscribeToCommBusEvent(MY_COMM_BUS_EVENT_ID);
        }, 5000);

        function handleReceivedData(text: string) {
            const json = JSON.parse(text);
            console.log('Received commbus event data:', json);
        }

        let receptionBuffer = ''; // In case the data is split across multiple events, we buffer it until we have the full message
        handle.on('commBusEvent', recvCommBusEvent => {
            switch (recvCommBusEvent.eventId) {
                case MY_COMM_BUS_EVENT_ID:
                    if (recvCommBusEvent.outOf === 1) {
                        handleReceivedData(recvCommBusEvent.data);
                    } else {
                        receptionBuffer += recvCommBusEvent.data;
                        if (recvCommBusEvent.entryNumber + 1 === recvCommBusEvent.outOf) {
                            handleReceivedData(receptionBuffer);
                            receptionBuffer = '';
                        }
                    }

                    break;
            }
        });

        handle.on('error', error => {
            console.log('Error:', error);
        });

        handle.on('exception', recvException => {
            console.log('SimConnect Exception:', recvException);
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
