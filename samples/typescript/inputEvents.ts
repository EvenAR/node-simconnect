import { open, Protocol } from '../../dist';

/**
 * Collects information about all available input events for the aircraft and prints them
 */
open('My app', Protocol.KittyHawk)
    .then(({ recvOpen, handle }) => {
        console.log('Connected: ', recvOpen);

        let allInputEvents: {
            inputEventName: string;
            inputEventIdHash: bigint;
            params?: string;
        }[] = [];

        handle.on('inputEventsList', recvEnumerateInputEvents => {
            recvEnumerateInputEvents.inputEventDescriptors.forEach(e => {
                allInputEvents.push({
                    inputEventName: e.name,
                    inputEventIdHash: e.inputEventIdHash,
                });
                handle.enumerateInputEventParams(e.inputEventIdHash);
            });
        });

        handle.on('enumerateInputEventParams', recvEnumerateInputEventParams => {
            // Update the list with the received value
            allInputEvents = allInputEvents.map(inputEvent => {
                if (
                    inputEvent.inputEventIdHash === recvEnumerateInputEventParams.inputEventIdHash
                ) {
                    return { ...inputEvent, params: recvEnumerateInputEventParams.value };
                } else {
                    return inputEvent;
                }
            });

            // Finally, when no input events are missing the params value, print the list
            if (allInputEvents.filter(ev => ev.params === undefined).length === 0) {
                console.log(allInputEvents);
            }
        });

        handle.on('exception', ex => console.log('Exception', ex));

        handle.enumerateInputEvents(0 /* request-id */);
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
