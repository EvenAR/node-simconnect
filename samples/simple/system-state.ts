import { ConnectionEvent, Protocol, SimConnectApi, SimConnectDataType } from '../../dist';

// Create a new instance of the SimConnectApp
const app = new SimConnectApi('My App');

// Connect to the simulator with specified configuration
app.connect({
    minimumCompatability: Protocol.FSX_SP2,
    onConnect: onConnectedHandler,
    onRetry: reason => console.log('Retrying to connect', reason),
});

// Event handler for successful connection
async function onConnectedHandler({ simulatorInfo, apiHelpers }: ConnectionEvent) {
    console.log(`Connected to ${simulatorInfo.applicationName}`);

    const fltFilePath = await apiHelpers.systemState.getFlightLoaded();
    const cfgFilePath = await apiHelpers.systemState.getAircraftLoaded();
    const dialogMode = await apiHelpers.systemState.getDialogMode();
    const flightPlanFilePath = await apiHelpers.systemState.getFlightPlan();
    const simulationIsRunning = await apiHelpers.systemState.getSimulationIsRunning();

    console.log({
        fltFilePath,
        cfgFilePath,
        dialogMode,
        flightPlanFilePath,
        simulationIsRunning,
    });
}
