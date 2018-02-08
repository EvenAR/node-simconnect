const simConnect = require('../../');


// From SimConnect.h:
const SIMCONNECT_PERIOD_NEVER = 0;
const SIMCONNECT_PERIOD_ONCE = 1;
const SIMCONNECT_PERIOD_VISUAL_FRAME = 2;
const SIMCONNECT_PERIOD_SIM_FRAME = 3;
const SIMCONNECT_PERIOD_SECOND = 4;

const SIMCONNECT_DATA_REQUEST_FLAG_CHANGED = 1;
const SIMCONNECT_DATA_REQUEST_FLAG_TAGGED = 2;

const SIMCONNECT_DATATYPE_STRINGV = 11

connectToSim();


// Open connection
function connectToSim() {
    console.log("Trying to connect...")

    var success = simConnect.open("MyAppName", function(name, version) {
        console.log("\n-----------------------------------------------\nConnected to: " + name + "\nSimConnect version: " + version + "\n-----------------------------------------------");
        doStuffWithSimconnect();

    }, () => {
        console.log("Quit.... :(");
        connectToSim();
    }, (exception) => {
        console.log("SimConnect exception: " + exception.name + " (" + exception.dwException + ", " + exception.dwSendID + ", " + exception.dwIndex + ", " + exception.cbData + ")");
    }, (error) => {
        // Happens for example when connection with SimConnect is lost unexpectedly. For crash details: ntstatus.h
        console.log("SimConnect error: " + error);

        // The connection must be re-opened
        connectToSim();
    });

    if(!success) {
        setTimeout(() => {
            connectToSim();
        }, 5000);
    }
}









function doStuffWithSimconnect() {
    var vs = 0;
    var gnd = 1;

    // Pause the sim
    simConnect.transmitClientEvent("PAUSE_ON");

    // Move aircraft
    simConnect.setAircraftInitialPosition({ 
        "latitude": 60.187982,
        "longitude":  11.075415,
        "altitude": 0,
        "pitch": 0,
        "bank": 0,
        "heading": 15,
        "onGround": 1,
        "airspeed": 0
    });

    // Set throttle lever positions
    simConnect.setDataOnSimObject("GENERAL ENG THROTTLE LEVER POSITION:1", "Percent", 0);
    simConnect.setDataOnSimObject("GENERAL ENG THROTTLE LEVER POSITION:2", "Percent", 0);

    // Get the .air file name of the loaded aircraft. Then get the aircraft title.
    simConnect.requestSystemState("AircraftLoaded", function(obj) {
        simConnect.requestDataOnSimObject([["NUMBER OF ENGINES", "Number"], ["TITLE", null, SIMCONNECT_DATATYPE_STRINGV]], function(data) {
            console.log("Aircraft Name:    " + data["TITLE"]);
            console.log("Aircraft Path:    " + obj.string);
            console.log("Aircraft number of engines: " + data["NUMBER OF ENGINES"]);
        }, 0, SIMCONNECT_PERIOD_ONCE);
    });

    // Subscribe to paused/unpaused event
    simConnect.subscribeToSystemEvent("Pause", (paused) => { 
        if(paused)
            console.log("Sim paused"); 
        else 
            console.log("Sim un-paused"); 
    });

    // Request pushback state and get updates whenever it changes
    simConnect.requestDataOnSimObject([["LIGHT CABIN","Bool"], ["PUSHBACK STATE","Enum"]], function(data) {
        console.log(data);
    }, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);

    // Get updates when the combustion (running or not) state of each engine changes
    simConnect.requestDataOnSimObject([
        ["ENG COMBUSTION:1","bool"], 
        ["ENG COMBUSTION:2","bool"], 
        ["ENG COMBUSTION:3","bool"], 
        ["ENG COMBUSTION:4","bool"]
    ], function(data) {
        console.log("Engine state:  " + data["ENG COMBUSTION:1"] + "," + data["ENG COMBUSTION:2"] + ","  + data["ENG COMBUSTION:3"] + ","  + data["ENG COMBUSTION:4"]);
    }, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);

    // Check if sim is on ground. When aircraft hits the ground, print the vertical speed.
    simConnect.requestDataOnSimObject([
        ["SIM ON GROUND","Bool"], 
        ["VERTICAL SPEED","feet per minute"]
    ], function(data) {
        let onGndNow = data["SIM ON GROUND"] == 1;
        if(!onGndNow)
            vs = data["VERTICAL SPEED"];
        else if(gnd != onGndNow)
            console.log("Landed with " + vs + " feet/min");
        gnd = onGndNow;
    }, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);
}