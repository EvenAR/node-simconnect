const {SimConnectDataType, SimConnect, SimConnectConstants, SimConnectPeriod, SimObjectType} = require("..")

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
            console.log("Lat:", recvSimObjectData.data.readFloat64());
            console.log("Lng:", recvSimObjectData.data.readFloat64());
            console.log("Alt:", recvSimObjectData.data.readFloat64());
            console.log("Cat:", recvSimObjectData.data.readStringV());
            break;
    }
});

sc.on("simObjectDataByType", (recv) => {
    switch (recv.requestID) {
        case 2:
            console.log("Pos:", recv.data.getLatLonAlt());
            break;
    }
});


sc.on("open", (recvOpen) => {
    console.log(recvOpen);
    sc.subscribeToSystemEvent(1, "pause");

    sc.addToDataDefinition(1, "PLANE LATITUDE", "degrees", SimConnectDataType.FLOAT64, 0, SimConnectConstants.UNUSED);
    sc.addToDataDefinition(1, "PLANE LONGITUDE", "degrees", SimConnectDataType.FLOAT64, 0, SimConnectConstants.UNUSED);
    sc.addToDataDefinition(1, "Indicated Altitude", "feet", SimConnectDataType.FLOAT64, 0, SimConnectConstants.UNUSED);
    sc.addToDataDefinition(1, "Category", null, SimConnectDataType.STRING32, 0, SimConnectConstants.UNUSED);
    sc.requestDataOnSimObject(1, 1, SimConnectConstants.OBJECT_ID_USER, SimConnectPeriod.SECOND, 0, 0, 0, 0);

    sc.addToDataDefinition(2, "STRUCT LATLONALT", null, SimConnectDataType.LATLONALT, 0, SimConnectConstants.UNUSED);
    sc.requestDataOnSimObjectType(2, 2, 0, SimObjectType.USER)
});
