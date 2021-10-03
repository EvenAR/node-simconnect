import {ConnectionHandle, open, Protocol, SimConnectDataType, SimObjectType} from '../../dist';

/**
 * Lists all aircraft within a 10 km radius
 */

const enum DEF_ID {
    AIRCRAFT_DETAILS,
}

const enum REQ_ID {
    NEARBY_AIRCRAFT,
}

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected:', recvOpen);


        // Register the data structure we are interested in
        registerDefinition(handle);

        // Request info about all aircraft in a 10 NM radius
        handle.requestDataOnSimObjectType(
            REQ_ID.NEARBY_AIRCRAFT,
            DEF_ID.AIRCRAFT_DETAILS,
            10000,
            SimObjectType.AIRCRAFT
        );

        handle.on('simObjectDataByType', (recvSimObjectData) => {
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
    })
    .catch((error) => {
        console.log('Failed to connect', error);
    });

function registerDefinition(handle: ConnectionHandle) {
    handle.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'Plane Latitude',
        'degrees',
        SimConnectDataType.FLOAT64
    );
    handle.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'Plane Longitude',
        'degrees',
        SimConnectDataType.FLOAT64
    );
    handle.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'Indicated Altitude',
        'feet',
        SimConnectDataType.INT32
    );
    handle.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'ATC MODEL',
        null,
        SimConnectDataType.STRING32
    );
    handle.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'ATC ID',
        null,
        SimConnectDataType.STRING32
    );
    handle.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'ATC AIRLINE',
        null,
        SimConnectDataType.STRING64
    );
    handle.addToDataDefinition(
        DEF_ID.AIRCRAFT_DETAILS,
        'ATC FLIGHT NUMBER',
        null,
        SimConnectDataType.STRING8
    );
}
