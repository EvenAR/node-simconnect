import { ConnectionEvent, Protocol, SimConnectApp, SimConnectDataType } from '../../dist';

// Create a new instance of the SimConnectApp
const app = new SimConnectApp('My App');

// Connect to the simulator with specified configuration
app.connect({
    minimumCompatability: Protocol.FSX_SP2,
    onConnect: onConnectedHandler,
    onRetry: reason => console.log('Retrying to connect', reason),
});

// Event handler for successful connection
async function onConnectedHandler({ simulatorInfo, apiHelpers }: ConnectionEvent) {
    console.log(`Connected to ${simulatorInfo.applicationName}`);

    /** Set aircraft throttles to 50% */
    apiHelpers.simulationVariables.updateValues({
        variables: [
            {
                name: 'GENERAL ENG THROTTLE LEVER POSITION:1',
                value: 50,
                units: 'Percent',
                dataType: SimConnectDataType.INT32,
            },
            {
                name: 'GENERAL ENG THROTTLE LEVER POSITION:2',
                value: 50,
                units: 'Percent',
                dataType: SimConnectDataType.INT32,
            },
        ],
        onError: err => console.log(err),
    });
}
