import { ConnectionEvent, Protocol, SimConnectApi } from '../../dist';

const app = new SimConnectApi('My App');

app.connect({
    minimumCompatability: Protocol.FSX_SP2,
    onConnect: onConnectedHandler,
    onRetry: reason => console.log('Retrying to connect', reason),
});

function onConnectedHandler({ apiHelpers }: ConnectionEvent) {
    /** Subscribe to a system event */
    apiHelpers.events.on(
        'Pause',
        data => {
            console.log(data === 0 ? 'Sim un-paused' : 'Sim Paused');
        },
        err => {
            console.log('Error subscribing to event:', err);
        }
    );

    /** Make the heading bug and the sun spin */
    setInterval(() => {
        apiHelpers.events.trigger('HEADING_BUG_INC', {
            onError: err => console.log(err),
        });
        apiHelpers.events.trigger('CLOCK_HOURS_INC', {
            onError: err => console.log(err),
        });
    }, 100);

    /** Set COM1 frequency */
    apiHelpers.events.trigger('COM_RADIO_SET_HZ', {
        value: 118.3 * 1000000,
        onError: err => console.log(err),
    });
}
