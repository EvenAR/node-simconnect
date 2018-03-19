const simConnect = require('../../');
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
        simConnect.requestDataOnSimObject([["NUMBER OF ENGINES", "Number"], ["TITLE", null, simConnect.datatype.STRINGV]], function(data) {
            console.log("Aircraft Name:    " + data["TITLE"]);
            console.log("Aircraft Path:    " + obj.string);
            console.log("Aircraft number of engines: " + data["NUMBER OF ENGINES"]);
        }, simConnect.objectId.USER, simConnect.period.ONCE);
    });

    // Subscribe to paused/unpaused event
    simConnect.subscribeToSystemEvent("Pause", (paused) => { 
        if(paused)
            console.log("Sim paused"); 
        else 
            console.log("Sim un-paused"); 
    });

    // Subscribe to aircraft change
	simConnect.subscribeToSystemEvent("AircraftLoaded", (filePath) => {
        console.log("New aircraft loaded: " + filePath);
	});

    // Request pushback state and get updates whenever it changes
    simConnect.requestDataOnSimObject([["LIGHT CABIN","Bool"], ["PUSHBACK STATE","Enum"]], function(data) {
        console.log(data);
    }, simConnect.objectId.USER, simConnect.period.SIM_FRAME, simConnect.dataRequestFlag.CHANGED);

    // Get positions of all aircraft within a 10 km radius
    simConnect.requestDataOnSimObjectType([
        ["ATC MODEL",null,simConnect.datatype.STRINGV],
        ["Plane Latitude", "degrees"],
        ["Plane Longitude", "degrees"]
    ], function(data) {
        console.log(data);
    }, 10000, simConnect.simobjectType.AIRCRAFT);


    // Get updates when the combustion (running or not) state of each engine changes
    simConnect.requestDataOnSimObject([
        ["ENG COMBUSTION:1","bool"], 
        ["ENG COMBUSTION:2","bool"], 
        ["ENG COMBUSTION:3","bool"], 
        ["ENG COMBUSTION:4","bool"]
    ], function(data) {
        console.log("Engine state:  " + data["ENG COMBUSTION:1"] + "," + data["ENG COMBUSTION:2"] + ","  + data["ENG COMBUSTION:3"] + ","  + data["ENG COMBUSTION:4"]);
    }, simConnect.objectId.USER, simConnect.period.SIM_FRAME, simConnect.dataRequestFlag.CHANGED);

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
    }, simConnect.objectId.USER, simConnect.period.SIM_FRAME, simConnect.dataRequestFlag.CHANGED);
}