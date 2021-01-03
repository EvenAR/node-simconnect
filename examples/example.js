const {SimConnectDataType, SimConnect, SimConnectConstants, SimConnectPeriod, SimObjectType, InitPosition, DataWrapper} = require("..")

const sc = new SimConnect("My app", "", 2);

sc.on("event", (recvEvent) => {
    switch(recvEvent.eventID) {
        case 1:
            console.log("Paused:", recvEvent.data);
            break;
    }
});

sc.on("simObjectData", (recvSimObjectData) => {
    switch(recvSimObjectData.requestID) {
        case 1:
            console.log("Lat:", recvSimObjectData.data.readDouble());
            console.log("Lng:", recvSimObjectData.data.readDouble());
            console.log("Alt:", recvSimObjectData.data.readDouble());
            console.log("Cat:", recvSimObjectData.data.readStringV());
            break;
        case 4:
            console.log("Thr:", recvSimObjectData.data.readDouble());
    }
});

sc.on("simObjectDataByType", (recv) => {
    switch (recv.requestID) {
        case 2:
            console.log("Pos:", recv.data.readLatLonAlt());
            break;
    }
});

sc.on("systemState", (recv) => {
    console.log(recv)
})

sc.on("cloudState", (recv) => {
    console.log(recv)
})

const data = new DataWrapper(512);

sc.on("open", (recvOpen) => {
    console.log("Connected to", recvOpen);
    sc.subscribeToSystemEvent(1, "pause");

    // Get position every second
    sc.addToDataDefinition(1, "PLANE LATITUDE", "degrees", SimConnectDataType.FLOAT64, 0, SimConnectConstants.UNUSED);
    sc.addToDataDefinition(1, "PLANE LONGITUDE", "degrees", SimConnectDataType.FLOAT64, 0, SimConnectConstants.UNUSED);
    sc.addToDataDefinition(1, "Indicated Altitude", "feet", SimConnectDataType.FLOAT64, 0, SimConnectConstants.UNUSED);
    sc.addToDataDefinition(1, "Category", null, SimConnectDataType.STRING32, 0, SimConnectConstants.UNUSED);
    sc.requestDataOnSimObject(1, 1, SimConnectConstants.OBJECT_ID_USER, SimConnectPeriod.SECOND, 0, 0, 0, 0);

    // Request LATLONALT structure
    sc.addToDataDefinition(2, "STRUCT LATLONALT", null, SimConnectDataType.LATLONALT, 0, SimConnectConstants.UNUSED);
    sc.requestDataOnSimObjectType(2, 2, 0, SimObjectType.USER);

    // Set throttle to 50%
    sc.addToDataDefinition(3, "GENERAL ENG THROTTLE LEVER POSITION:1", "percent");
    data.writeDouble(50.0);
    sc.setDataOnSimObject(3, SimConnectConstants.OBJECT_ID_USER, { buffer: data, arrayCount: 1, tagged: false });

    /*const initPosition = new InitPosition();
    initPosition.latitude = 60;
    initPosition.longitude = 11;
    initPosition.altitude = 2000;
    initPosition.airspeed = 80;

    sc.addToDataDefinition(5, "Initial Position", null, SimConnectDataType.INITPOSITION);
    sc.setDataOnSimObject(5, SimConnectConstants.OBJECT_ID_USER, [initPosition])*/

    sc.requestSystemState(5, "AircraftLoaded");

    sc.weatherRequestObservationAtNearestStation(88, 60, 11);

    sc.weatherRequestCloudState(777, 60, 11, 1000, 61, 12, 5000)

    // Get throttle value whenever it changes
    sc.requestDataOnSimObject(4, 3, SimConnectConstants.OBJECT_ID_USER, SimConnectPeriod.SIM_FRAME, SimConnectConstants.CLIENT_DATA_REQUEST_FLAG_CHANGED)
});
