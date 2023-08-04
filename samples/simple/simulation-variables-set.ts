import { ConnectionEvent, Protocol, SimConnectApp, SimConnectDataType } from '../../dist';

// Create a new instance of the SimConnectApp
const app = new SimConnectApp('My App');

// Connect to the simulator with specified configuration
app.connect({
    baseProtocol: Protocol.FSX_SP1,
    onConnect: onConnectedHandler,
    onRetry: reason => console.log('Retrying to connect', reason),
});

// Event handler for successful connection
async function onConnectedHandler({ simulatorInfo, apiHelpers }: ConnectionEvent) {
    console.log(`Connected to ${simulatorInfo.applicationName}`);

    /** Set aircraft throttles to 50% */
    apiHelpers.simulationVariables.updateValues({
        variablesToSet: {
            'GENERAL ENG THROTTLE LEVER POSITION:1': {
                value: 50,
                units: 'Percent',
                dataType: SimConnectDataType.INT32,
            },
            'GENERAL ENG THROTTLE LEVER POSITION:2': {
                value: 50,
                units: 'Percent',
                dataType: SimConnectDataType.INT32,
            },
        },
        errorHandler: err => console.log(err),
    });
}
