const simConnect = require('./build/Release/node-simconnect');

const SIMCONNECT_PERIOD_NEVER = 0;
const SIMCONNECT_PERIOD_ONCE = 1;
const SIMCONNECT_PERIOD_VISUAL_FRAME = 2;
const SIMCONNECT_PERIOD_SIM_FRAME = 3;
const SIMCONNECT_PERIOD_SECOND = 4;

// Open connection
var simConnectId = simConnect.open();

if(simConnectId >= 0) {
    console.log("Connected to simconnect");
} else {
    console.log("Failed to connect to sim");
}

// Subscribe to system events
simConnect.subscribeToSystemEvent(simConnectId, "Paused", () => { 
    console.log("Sim paused"); 
});

simConnect.subscribeToSystemEvent(simConnectId, "Unpaused", () => { 
    console.log("Sim unpaused"); 
})


simConnect.requestDataOnSimObject(simConnectId, [
    ["LIGHT STROBE", "Bool", 4], 
    ["LIGHT LANDING","Bool", 4], 
    ["LIGHT TAXI","Bool", 4], 
    ["LIGHT BEACON","Bool", 4], 
    ["LIGHT RECOGNITION","Bool", 4]
], function(data) {
    console.log("Strobe:    " + data[0] + "\n" +
                "Landing:   " + data[1] + "\n" +
                "Taxi:      " + data[2] + "\n" +
                "Beacon:    " + data[3] + "\n" +
                "Recogn.:   " + data[4] + "\n" + 
                "-------------------------------");
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, 1, 0, 10, 0);

simConnect.requestDataOnSimObject(simConnectId, [
    ["AIRSPEED TRUE","Knots", 4], 
    ["Plane Latitude","degrees", 4], 
    ["Plane Longitude","degrees", 4], 
    ["PLANE ALTITUDE","feet", 4]
], function(data) {
    console.log("Speed:     " + data[0] + "\n" +
                "Latitude:  " + data[1] + "\n" +
                "Longitude: " + data[2] + "\n" +
                "Altitude:  " + data[3] + "\n" + 
                "-------------------------------");
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, 1, 0, 10, 0);

simConnect.startDispatchWorker(simConnectId);

simConnect.setAircraftInitialPosition(simConnectId, 1000.0, 60, 11, 0, 0, 0, 0, 100 );

