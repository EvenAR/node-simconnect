import {
    ConnectionHandle,
    DataWrapper,
    open,
    Protocol,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
    SimObjectType,
} from '../../../dist';
import { client } from './websocketServer';

/**
 * Lists all aircraft within a 10 km radius
 */

const enum DEF_ID {
    AIRCRAFT_DETAILS,
}

const enum REQ_ID {
    NEARBY_AIRCRAFT,
    MY_POSITION,
}

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected:', recvOpen);

        registerAircraftDetailsDefinition(handle);
        handle.requestDataOnSimObject(
            REQ_ID.MY_POSITION,
            DEF_ID.AIRCRAFT_DETAILS,
            SimConnectConstants.OBJECT_ID_USER,
            SimConnectPeriod.SECOND
        );

        handle.on('simObjectData', (recvSimObjectData) => {
            switch (recvSimObjectData.requestID as REQ_ID) {
                case REQ_ID.MY_POSITION:
                    {
                        const aircraftDetails = readAircraftPosition(
                            recvSimObjectData.data
                        );
                        client?.send(
                            JSON.stringify({
                                type: 'myPosition',
                                data: aircraftDetails,
                            })
                        );

                        // Request info about all aircraft in a 10 NM radius
                        handle.requestDataOnSimObjectType(
                            REQ_ID.NEARBY_AIRCRAFT,
                            DEF_ID.AIRCRAFT_DETAILS,
                            10000,
                            SimObjectType.AIRCRAFT
                        );
                    }
                    break;
            }
        });

        handle.on('simObjectDataByType', (recvSimObjectData) => {
            switch (recvSimObjectData.requestID as REQ_ID) {
                case REQ_ID.NEARBY_AIRCRAFT:
                    {
                        const aircraftDetails = readAircraftPosition(
                            recvSimObjectData.data
                        );
                        client?.send(
                            JSON.stringify({
                                type: 'traffic',
                                data: aircraftDetails,
                            })
                        );
                    }
                    break;
            }
        });
    })
    .catch((error) => {
        console.log('Failed to connect', error);
    });

function registerAircraftDetailsDefinition(handle: ConnectionHandle) {
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

function readAircraftPosition(dataBuffer: DataWrapper) {
    return {
        // Read order is important
        lat: dataBuffer.readDouble(),
        lng: dataBuffer.readDouble(),
        altitude: dataBuffer.readInt(),
        model: dataBuffer.readString(32),
        id: dataBuffer.readString(32),
        airline: dataBuffer.readString(64),
        flightNumber: dataBuffer.readString(8),
    };
}
