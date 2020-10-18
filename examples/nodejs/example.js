const { SimConnect } = require("../../build/Release/node_simconnect");

const simConnect = new SimConnect()

simConnect.open("My app", (error, simInfo, handler) => {
    if(error) {
        throw(error)
    } else {
        console.log(simInfo);
        
        handler.subscribeToSystemEvent("Pause", value => {
            console.log("PAUSE", value)
        })

        handler.requestSystemState("AircraftLoaded", function(obj) {
            console.log(obj);
        });

        handler.requestDataOnSimObject([
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
})
