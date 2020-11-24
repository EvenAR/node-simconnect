const { SimConnect } = require("../../build/Debug/node_simconnect");

const simConnect = new SimConnect()

tryToConnect();

function tryToConnect() {
    const ok = simConnect.open(
        "My app's name", 
        onOpen,
        onQuit,
        onException,
        onError
    )
    if (!ok) {
        setTimeout(() => {
            console.log("Failed to connect. Retrying...")
            tryToConnect();
        }, 5000);
    }
}

function onOpen(simulator) {
    console.log(simulator.name, simulator.version);
            
    simulator.subscribeToSystemEvent("Pause", value => {
        console.log("Pause status:", value)
    })

    simulator.requestSystemState("AircraftLoaded", function(obj) {
        console.log("Loaded aircraft:", obj.string);
    });

    const navInfoDefId = simulator.createDataDefinition([
        ["ATC FLIGHT NUMBER", null, 11], // SIMCONNECT_DATATYPE_STRINGV
        ["NAV NAME:1", null, 11], // SIMCONNECT_DATATYPE_STRINGV
        ["Plane Latitude", "degrees"],
        ["Plane Longitude", "degrees"],
    ]);
    
    simulator.requestDataOnSimObject(navInfoDefId, {
        period: 1, // SIMCONNECT_PERIOD_ONCE
        objectId: 0, // SIMCONNECT_OBJECT_ID_USER
        flags: 0, // SIMCONNECT_DATA_REQUEST_FLAG_DEFAULT
    }, (data) => {
        console.log(data)
    });

    simulator.requestDataOnSimObjectType([
        ["ATC MODEL", null, 11], // SIMCONNECT_DATATYPE_STRINGV
        ["Plane Latitude", "degrees"],
        ["Plane Longitude", "degrees"]
    ], { 
        radius: 10000, 
        type: 2 // SIMCONNECT_SIMOBJECT_TYPE_AIRCRAFT
    }, (data) => {
        // Called for each aircraft
        console.log(data);
    });
}

function onQuit() {
    console.log("Quit :(")
    tryToConnect();
}

function onException(ex) {
    console.log("Exception: ", ex)
}

function onError(err) {
    console.log("Error: ", err)
}