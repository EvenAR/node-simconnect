const simConnect = require('./build/Release/node-simconnect');

const SIMCONNECT_PERIOD_NEVER = 0;
const SIMCONNECT_PERIOD_ONCE = 1;
const SIMCONNECT_PERIOD_VISUAL_FRAME = 2;
const SIMCONNECT_PERIOD_SIM_FRAME = 3;
const SIMCONNECT_PERIOD_SECOND = 4;

const SIMCONNECT_DATA_REQUEST_FLAG_CHANGED = 1;

// Open connection
var simConnectId = simConnect.open("VNPCv2", function(name) {
    console.log("Connection is open! :) " + name);

    simConnect.requestSystemState(simConnectId, "AircraftLoaded", function(obj) {
        console.log(obj.string);
    });

    simConnect.requestDataOnSimObject(simConnectId, [
		["ENG COMBUSTION:1","bool"], // 0
		["ENG COMBUSTION:2","bool"], 
		["ENG COMBUSTION:3","bool"], 
		["ENG COMBUSTION:4","bool"], // 3

		["ENG FUEL FLOW PPH:1","Pounds per hour"], 
		["ENG FUEL FLOW PPH:2","Pounds per hour"], 
		["ENG FUEL FLOW PPH:3","Pounds per hour"], 
		["ENG FUEL FLOW PPH:4","Pounds per hour"], // 7

		["AIRSPEED TRUE","Knots"], 
		["Plane Latitude","degrees"], 
		["Plane Longitude","degrees"], 				// 10
		["PLANE ALTITUDE","feet"],
		["RADIO HEIGHT","feet"],
		["VERTICAL SPEED","feet per minute"],
		["PLANE HEADING DEGREES TRUE","degrees"],
		["PLANE BANK DEGREES","degrees"],			// 15
		["PLANE PITCH DEGREES","degrees"],
		["GROUND VELOCITY","knots"],
		["VELOCITY BODY Z","knots"],		

		["SIM ON GROUND","Bool"],
		["OVERSPEED WARNING","Bool"],			// 20
		["BRAKE PARKING POSITION","Position"],
		["GEAR TOTAL PCT EXTENDED","Percentage"],
		["COM ACTIVE FREQUENCY:1","Megahertz"],
		["COM ACTIVE FREQUENCY:2","Megahertz"],
		["SPOILERS HANDLE POSITION","Percent"], // 25
		["LIGHT STROBE","Bool"],
		["LIGHT PANEL","Bool"],
		["LIGHT LANDING","Bool"],
		["LIGHT TAXI","Bool"],
		["LIGHT BEACON","Bool"],				// 30
		["LIGHT NAV","Bool"],
		["LIGHT LOGO","Bool"],
		["LIGHT WING","Bool"],
		["LIGHT RECOGNITION","Bool"],
		["LIGHT CABIN","Bool"],					// 35

		["PUSHBACK STATE","Enum"],				
		["FUEL TOTAL QUANTITY WEIGHT","kg"],

		["TITLE", null, 11]
		
	], function(data) {

        console.log(data);
	}, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);

}, function() {
    console.log("Quit.... :(");
}, function(exception) {
    console.log("SimConnect exception: " + exception.name + " (" + exception.dwException + ", " + exception.dwSendID + ", " + exception.dwIndex + ", " + exception.cbData);
});

if(simConnectId >= 0) {
    console.log("Connected to simconnect");
} else {
    console.log("Failed to connect to sim");
}

// Subscribe to system events
/*simConnect.subscribeToSystemEvent(simConnectId, "Paused", () => { 
    console.log("Sim paused"); 
});

simConnect.subscribeToSystemEvent(simConnectId, "Unpaused", () => { 
    console.log("Sim unpaused"); 
    simConnect.setDataOnSimObject(simConnectId, "BRAKE PARKING POSITION:1", "Position", 1);
})*/

/*simConnect.requestDataOnSimObject(simConnectId, [
        ["AIRSPEED TRUE","Knots"],
        ["TITLE", null, 11],
    ], function(data) {

        console.log("New aircraft title:    " + data[1] + "\n" +
                    "Airspeed:              " + data[0]);

}, 0, SIMCONNECT_PERIOD_SECOND, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED, 0, 0, 0);*/




/*simConnect.subscribeToSystemEvent(simConnectId, "AircraftLoaded", (data) => { 
    console.log("New aircraft loaded: " + data); 

    simConnect.requestDataOnSimObject(simConnectId, [["TITLE", null, 11]], function(data) {
        console.log("New aircraft title:    " + data[0]);
    }, 0, SIMCONNECT_PERIOD_ONCE, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED, 0, 0, 0);
})

simConnect.requestDataOnSimObject(simConnectId, [
    ["PUSHBACK STATE","Enum"]
], function(data) {
    console.log("Pushback state:  " + data[0]);
    simConnect.transmitClientEvent(simConnectId, "PAUSE_ON");
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED, 0, 0, 0);
*/


/*simConnect.requestDataOnSimObject(simConnectId, [
    ["ENG COMBUSTION:1","bool"], 
    ["ENG COMBUSTION:2","bool"], 
    ["ENG COMBUSTION:3","bool"], 
    ["ENG COMBUSTION:4","bool"]
], function(data) {
    console.log("Engine state:  " + data[0] + data[1] + data[2] + data[3]);
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED, 0, 0, 0);

simConnect.requestDataOnSimObject(simConnectId, [
    ["ENG FUEL FLOW PPH:1","Pounds per hour"], 
    ["ENG FUEL FLOW PPH:2","Pounds per hour"], 
    ["ENG FUEL FLOW PPH:3","Pounds per hour"], 
    ["ENG FUEL FLOW PPH:4","Pounds per hour"]
], function(data) {
    console.log("Engine fuel flow:  " + data[0]*0.4535 + ", " + data[1]*0.4535 + ", " + data[2]*0.4535 + ", " + data[3]*0.4535);
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED, 0, 0, 0);

simConnect.requestDataOnSimObject(simConnectId, [
    ["AIRSPEED TRUE","Knots"], 
    ["Plane Latitude","degrees"], 
    ["Plane Longitude","degrees"], 
    ["PLANE ALTITUDE","feet"],
    ["RADIO HEIGHT","feet"],
    ["SIM ON GROUND","Bool"]
], function(data) {
    console.log("Speed:     " + data[0] + "\n" +
                "Latitude:  " + data[1] + "\n" +
                "Longitude: " + data[2] + "\n" +
                "Altitude:  " + data[3] + "\n" + 
                "Radio alt.:" + data[4] + "\n" + 
                "Ground:    " + data[5] + "\n" + 
                "-------------------------------");
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, 1, 0, 0, 0);*/

/*
var vs = 0;
var gnd = 0;
var gear = 0;

simConnect.requestDataOnSimObject(simConnectId, [["SIM ON GROUND","Bool"], ["VERTICAL SPEED","feet per minute"]], function(data) {
    if(data[0] == 0)
        vs = data[1];
    else if(gnd != data[0])
        console.log("Landed with " + vs + " feet/min");
    gnd = data[0];
}, 0, SIMCONNECT_PERIOD_SIM_FRAME);

simConnect.requestDataOnSimObject(simConnectId, [["BRAKE PARKING POSITION","Position"]], function(data) {
    if(data[0] == 1)
        console.log("Parking brake set");
    else if(data[0] == 0)
        console.log("Parking brake released");
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED, 0, 0, 0);

simConnect.requestDataOnSimObject(simConnectId, [["SPOILERS HANDLE POSITION","Percent"]], function(data) {
    console.log("Spoilers: " + data[0] + "%");
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED, 0, 0, 0);


simConnect.requestDataOnSimObject(simConnectId, [["GEAR TOTAL PCT EXTENDED","Percentage"]], function(data) {
    if(data[0] == 0 && gear != data[0])
        console.log("Gear up");
    else if(data[0] == 1 && gear != data[0])
        console.log("Gear down");
    gear = data[0];
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED, 0, 0, 0);

simConnect.requestDataOnSimObject(simConnectId, [["COM ACTIVE FREQUENCY:2","Megahertz"]], function(data) {
    console.log("COM2: " + Math.round(data[0] * 1000) / 1000);
}, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED, 0, 0, 0);
*/
//simConnect.startDispatchWorker(simConnectId);

//simConnect.setAircraftInitialPosition(simConnectId, 1000.0, 60, 11, 0, 0, 0, 0, 100 );