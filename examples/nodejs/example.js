const { SimConnect, PERIOD, SIMOBJECT_TYPE, DATATYPE } = require(`../..`);

const simConnect = new SimConnect()

tryToConnect();

function tryToConnect() {
    const ok = simConnect.open(
        "My app's name", 
        onOpen,
        onQuit,
        onException,
        onError
    );
    if (!ok) {
        setTimeout(() => {
            console.log("Failed to connect. Retrying...")
            tryToConnect();
        }, 5000);
    }
}

function onOpen(client) {
    console.log(client.name, client.version);
            
    client.subscribeToSystemEvent("Pause", value => {
        console.log("Pause status:", value)
    })

    client.requestSystemState("AircraftLoaded", function(obj) {
        console.log("Loaded aircraft:", obj.string);
    });

    const navInfoDefId = client.createDataDefinition([
        ["ATC FLIGHT NUMBER", null, DATATYPE.STRINGV],      // SIMCONNECT_DATATYPE_STRINGV
        ["NAV NAME:1", null, DATATYPE.STRINGV],             // SIMCONNECT_DATATYPE_STRINGV
        ["Plane Latitude", "degrees"],
        ["Plane Longitude", "degrees"],
    ]);
    
    client.requestDataOnSimObject(navInfoDefId, {
        period: PERIOD.ONCE,                // SIMCONNECT_PERIOD_ONCE
        objectId: SIMOBJECT_TYPE.USER,      // SIMCONNECT_OBJECT_ID_USER
        flags: 0,                           // SIMCONNECT_DATA_REQUEST_FLAG_DEFAULT
    }, (data) => {
        console.log(data)
    });

    client.requestDataOnSimObjectType([
        ["ATC MODEL", null, DATATYPE.STRINGV], // SIMCONNECT_DATATYPE_STRINGV
        ["Plane Latitude", "degrees"],
        ["Plane Longitude", "degrees"]
    ], { 
        radius: 10000, 
        type: SIMOBJECT_TYPE.AIRCRAFT // SIMCONNECT_SIMOBJECT_TYPE_AIRCRAFT
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