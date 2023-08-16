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

    // Make a one-time request for a set of simulation variables
    const aircraftInfo = await apiHelpers.simulationVariables.getValues({
        simulationVariables: {
            TITLE: {
                dataType: SimConnectDataType.STRING128,
            },
        },
    });
    console.log(`Current aircraft is '${aircraftInfo.TITLE}'`);

    // Observe aircraft position data
    apiHelpers.simulationVariables.observe({
        changesOnly: true, // We only want to get the position data if it changes
        simulationVariables: {
            // All property names of this object must match a simulation variable name
            PLANE_LATITUDE: {
                dataType: SimConnectDataType.FLOAT32,
                units: 'Degrees',
            },
            PLANE_LONGITUDE: {
                dataType: SimConnectDataType.FLOAT32,
                units: 'Degrees',
            },
        },
        onData: data => {
            // The data object will have the same props as the input object (simulationVariables)
            console.log(`Aircraft position: ${data.PLANE_LONGITUDE}, ${data.PLANE_LONGITUDE}`);
        },
        onError: err => {
            // An error could occur if a simulation variable name is unknown
            console.log(`Error:`, err);
        },
    });
}
