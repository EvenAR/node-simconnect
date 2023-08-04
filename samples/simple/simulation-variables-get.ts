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

    // Make a one-time request for a set of simulation variables
    const aircraftInfo = await apiHelpers.simulationVariables.requestValues({
        requestStructure: {
            TITLE: {
                dataType: SimConnectDataType.STRING128,
            },
        },
    });
    console.log(`Current aircraft is '${aircraftInfo.TITLE}'`);

    // Observe aircraft position data
    apiHelpers.simulationVariables.observe({
        simulationVariables: {
            PLANE_LATITUDE: {
                dataType: SimConnectDataType.FLOAT32,
                units: 'Degrees',
            },
            PLANE_LONGITUDE: {
                dataType: SimConnectDataType.FLOAT32,
                units: 'Degrees',
            },
        },
        // We only want to get the position data if it changes
        onlyOnChange: true,
        onData: data => {
            console.log(`Aircraft position: ${data.PLANE_LATITUDE}, ${data.PLANE_LONGITUDE}`);
        },
        onError: err => {
            // An error could occur if a simulation variable name is unknown
            console.log(`Error:`, err);
        },
    });
}
