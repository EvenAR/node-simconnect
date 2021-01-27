import {
    Protocol,
    RecvOpen,
    SimConnect,
    SimConnectDataType,
    SimObjectType,
} from '../dist';

/**
 * Lists all aircraft within a 10 km radius
 */

const enum EVENT_ID {
    PAUSE,
}

const enum DEF_ID {
    AIRCRAFT_DETAILS,
}

const enum REQ_ID {
    NEARBY_AIRCRAFT,
}

const sc = new SimConnect('My app', Protocol.FSX_SP2);

sc.on('open', (recvOpen: RecvOpen) => {
    console.log('Connected:', recvOpen);

    sc.subscribeToSystemEvent(EVENT_ID.PAUSE, 'Pause');

    sc.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'Plane Latitude',
        'degrees',
        SimConnectDataType.FLOAT64
    );
    sc.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'Plane Longitude',
        'degrees',
        SimConnectDataType.FLOAT64
    );
    sc.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'Indicated Altitude',
        'feet',
        SimConnectDataType.INT32
    );
    sc.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'ATC MODEL',
        null,
        SimConnectDataType.STRING32
    );
    sc.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'ATC ID',
        null,
        SimConnectDataType.STRING32
    );
    sc.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'ATC AIRLINE',
        null,
        SimConnectDataType.STRING64
    );
    sc.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'ATC FLIGHT NUMBER',
        null,
        SimConnectDataType.STRING8
    );

    // Request info about all aircraft in a 10 NM radius
    sc.requestDataOnSimObjectType(
        REQ_ID.NEARBY_AIRCRAFT,
        DEF_ID.AIRCRAFT_DETAILS,
        10000,
        SimObjectType.AIRCRAFT
    );
});

sc.on('simObjectDataByType', (recvSimObjectData) => {
    if (recvSimObjectData.requestID === REQ_ID.NEARBY_AIRCRAFT) {
        const dataBuffer = recvSimObjectData.data;
        console.log({
            // Read order is important
            lat: dataBuffer.readDouble(),
            lng: dataBuffer.readDouble(),
            altitude: dataBuffer.readInt(),
            model: dataBuffer.readString(32),
            id: dataBuffer.readString(32),
            airline: dataBuffer.readString(64),
            flightNumber: dataBuffer.readString(8),
        });
    }
});
