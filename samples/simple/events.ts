import { ConnectionEvent, Protocol, SimConnectApp } from '../../dist';

const app = new SimConnectApp('My App');

app.connect({
    minimumCompatability: Protocol.FSX_SP2,
    onConnect: onConnectedHandler,
    onRetry: reason => console.log('Retrying to connect', reason),
});

function onConnectedHandler({ apiHelpers }: ConnectionEvent) {
    /** Subscribe to a system event */
    apiHelpers.systemEvents.on(
        'Pause',
        data => {
            console.log(data === 0 ? 'Sim un-paused' : 'Sim Paused');
        },
        err => {
            console.log('Error subscribing to event:', err);
        }
    );
}
