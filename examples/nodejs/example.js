const simConnect = require('../../build/Release/node-simconnect');


// From SimConnect.h:
const SIMCONNECT_PERIOD_NEVER = 0;
const SIMCONNECT_PERIOD_ONCE = 1;
const SIMCONNECT_PERIOD_VISUAL_FRAME = 2;
const SIMCONNECT_PERIOD_SIM_FRAME = 3;
const SIMCONNECT_PERIOD_SECOND = 4;

const SIMCONNECT_DATA_REQUEST_FLAG_CHANGED = 1;







// Open connection
var res = simConnect.open("MyAppName", function(name) {
    setupDataRequests(name);
}, function() {
    console.log("Quit.... :(");
}, function(exception) {
    console.log("SimConnect exception: " + exception.name + " (" + exception.dwException + ", " + exception.dwSendID + ", " + exception.dwIndex + ", " + exception.cbData);
});

if(res < 0)
    console.log("Failed to connect to sim");










function setupDataRequests(name) {
    var vs = 0;
    var gnd = 1;

    console.log("\n-----------------------------------------------\nConnected to: " + name + "\n-----------------------------------------------");

    // Set the aircraft's parking brake on
    simConnect.setDataOnSimObject("BRAKE PARKING POSITION:1", "Position", 1);

    // Get the .air file name of the loaded aircraft. Then get the aircraft title.
    simConnect.requestSystemState("AircraftLoaded", function(obj) {
        var airFile = obj.string;

        simConnect.requestDataOnSimObject([["TITLE", null, 11]], function(data) {
            console.log("Aircraft loaded: " + data[0] + " (" + airFile + ")");
        }, 0, SIMCONNECT_PERIOD_ONCE, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);
    });

    // Subscribe to paused/unpaused event
    simConnect.subscribeToSystemEvent("Pause", (paused) => { 
        if(paused)
            console.log("Sim paused"); 
        else 
            console.log("Sim un-paused"); 
    });

    // Request pushback state and get updates whenever it changes
    simConnect.requestDataOnSimObject([["PUSHBACK STATE","Enum"]], function(data) {
            console.log("Pushback state:  " + data[0]);
    }, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);

    // Get updates when the combustion (running or not) state of each engine changes
    simConnect.requestDataOnSimObject([
        ["ENG COMBUSTION:1","bool"], 
        ["ENG COMBUSTION:2","bool"], 
        ["ENG COMBUSTION:3","bool"], 
        ["ENG COMBUSTION:4","bool"]
    ], function(data) {
        console.log("Engine state:  " + data[0] + "," + data[1] + ","  + data[2] + ","  + data[3]);
    }, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);

    simConnect.requestDataOnSimObject([
        ["LIGHT STROBE","Bool"],
        ["LIGHT PANEL","Bool"],
        ["LIGHT LANDING","Bool"],
        ["LIGHT TAXI","Bool"],
        ["LIGHT BEACON","Bool"],
        ["LIGHT NAV","Bool"],
        ["LIGHT LOGO","Bool"],
        ["LIGHT WING","Bool"],
        ["LIGHT RECOGNITION","Bool"],
        ["LIGHT CABIN","Bool"],

    ], function(data) {
        console.log(data);
    }, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);

    // Continously check if sim is on ground. When aircraft hits the ground, get the vertical speed.
    simConnect.requestDataOnSimObject([["SIM ON GROUND","Bool"], ["VERTICAL SPEED","feet per minute"]], function(data) {
        if(data[0] == 0)
            vs = data[1];
        else if(gnd != data[0])
            console.log("Landed with " + vs + " feet/min");
        gnd = data[0];
    }, 0, SIMCONNECT_PERIOD_SIM_FRAME);
}