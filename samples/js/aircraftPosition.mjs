import { SimConnect, Protocol, SimConnectDataType, SimConnectPeriod, SimConnectConstants } from "simconnect-js-client"

const POSITION_DATA = 1;
const REQUEST_ID_POSITION_DATA = 1;
const EVENT_ID_PAUSE = 1;

const simConnect = new SimConnect('My SimConnect app', Protocol.FSX_SP2);

simConnect.on('open', function(recvOpen) {
    console.log("Connected to ", recvOpen.applicationName);
    simconnect.addToDataDefinition(POSITION_DATA, "Plane Latitude", "degrees",
        SimConnectDataType.FLOAT64, 0.0, SimConnectConstants.UNUSED);
    simconnect.addToDataDefinition(POSITION_DATA, "Plane Longitude", "degrees",
        SimConnectDataType.FLOAT64, 0.0, SimConnectConstants.UNUSED);
    simConnect.requestDataOnSimObject(
        REQUEST_ID_POSITION_DATA,
        POSITION_DATA,
        SimConnectConstants.OBJECT_ID_USER,
        SimConnectPeriod.SECOND,
        0, 0, 0, 0
    )
    simConnect.subscribeToSystemEvent(EVENT_ID_PAUSE, "Pause");
})

simConnect.on('event', function(recvEvent) {
    switch (recvEvent.eventID) {
        case EVENT_ID_PAUSE:
            console.log(recvEvent.data === 1 ? "Sim paused" : "Sim unpaused");
            break;
    }
})

simConnect.on('simObjectData', function(recvSimObjectData) {
    switch (recvSimObjectData.requestID) {
        case POSITION_DATA:
            console.log({
                latitude: recvSimObjectData.data.readDouble(),
                longitude: recvSimObjectData.data.readDouble()
            });
            break;
    }
});
