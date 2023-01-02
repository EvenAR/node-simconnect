import {
    ConnectionHandle,
    open,
    Protocol,
    RawBuffer,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
    SimObjectType,
} from '../../../dist';
import { client } from './websocketServer';

/**
 * Lists all aircraft within a 10 km radius
 */

const enum DefinitionID {
    AIRCRAFT_DETAILS,
}

const enum RequestID {
    NEARBY_AIRCRAFT,
    MY_POSITION,
}

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected:', recvOpen);

        registerAircraftDetailsDefinition(handle);
        handle.requestDataOnSimObject(
            RequestID.MY_POSITION,
            DefinitionID.AIRCRAFT_DETAILS,
            SimConnectConstants.OBJECT_ID_USER,
            SimConnectPeriod.SECOND
        );

        handle.on('simObjectData', recvSimObjectData => {
            if (recvSimObjectData.requestID === RequestID.MY_POSITION) {
                const aircraftDetails = readAircraftPosition(recvSimObjectData.data);
                client?.send(
                    JSON.stringify({
                        type: 'myPosition',
                        data: aircraftDetails,
                    })
                );

                // Request info about all aircraft in a 10 NM radius
                handle.requestDataOnSimObjectType(
                    RequestID.NEARBY_AIRCRAFT,
                    DefinitionID.AIRCRAFT_DETAILS,
                    10000,
                    SimObjectType.AIRCRAFT
                );
            }
        });

        handle.on('simObjectDataByType', recvSimObjectData => {
            if (recvSimObjectData.requestID === RequestID.NEARBY_AIRCRAFT) {
                const aircraftDetails = readAircraftPosition(recvSimObjectData.data);
                client?.send(
                    JSON.stringify({
                        type: 'traffic',
                        data: aircraftDetails,
                    })
                );
            }
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });

function registerAircraftDetailsDefinition(handle: ConnectionHandle) {
    handle.addToDataDefinition(
        DefinitionID.AIRCRAFT_DETAILS,
        'Plane Latitude',
        'degrees',
        SimConnectDataType.FLOAT64
    );
    handle.addToDataDefinition(
        DefinitionID.AIRCRAFT_DETAILS,
        'Plane Longitude',
        'degrees',
        SimConnectDataType.FLOAT64
    );
    handle.addToDataDefinition(
        DefinitionID.AIRCRAFT_DETAILS,
        'Indicated Altitude',
        'feet',
        SimConnectDataType.INT32
    );
    handle.addToDataDefinition(
        DefinitionID.AIRCRAFT_DETAILS,
        'ATC MODEL',
        null,
        SimConnectDataType.STRING32
    );
    handle.addToDataDefinition(
        DefinitionID.AIRCRAFT_DETAILS,
        'ATC ID',
        null,
        SimConnectDataType.STRING32
    );
    handle.addToDataDefinition(
        DefinitionID.AIRCRAFT_DETAILS,
        'ATC AIRLINE',
        null,
        SimConnectDataType.STRING64
    );
    handle.addToDataDefinition(
        DefinitionID.AIRCRAFT_DETAILS,
        'ATC FLIGHT NUMBER',
        null,
        SimConnectDataType.STRING8
    );
}

function readAircraftPosition(rawBuffer: RawBuffer) {
    return {
        // Read order is important
        lat: rawBuffer.readFloat64(),
        lng: rawBuffer.readFloat64(),
        altitude: rawBuffer.readInt32(),
        model: rawBuffer.readString(32),
        id: rawBuffer.readString(32),
        airline: rawBuffer.readString(64),
        flightNumber: rawBuffer.readString(8),
    };
}
