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
            tryToConnect();
        }, 5000);
    }
}

function onOpen(simInfo, simulator) {
    console.log(simInfo);
            
    simulator.subscribeToSystemEvent("Pause", value => {
        console.log("PAUSE", value)
    })

    simulator.requestSystemState("AircraftLoaded", function(obj) {
        console.log(obj);
    });

    simulator.requestDataOnSimObject([
        ["Plane Latitude", "degrees"],
        ["Plane Longitude", "degrees"],  
        ["PLANE ALTITUDE", "feet"]
    ], (data) => {
        console.log(
            "Latitude:  " + data["Plane Latitude"] + "\n" +
            "Longitude: " + data["Plane Longitude"] + "\n" +
            "Altitude:  " + data["PLANE ALTITUDE"] + " feet"
        );
    }, 0, 4);
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