import {
    Protocol,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
    open,
    readLatLonAlt,
} from '../../dist';

/**
 * Demonstrates a few system events
 */

const enum EventID {
    PAUSE,
}

const enum DefinitionID {
    LIVE_DATA,
}

const enum RequestID {
    LIVE_DATA,
}

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected:', recvOpen);

        handle.subscribeToSystemEvent(EventID.PAUSE, 'Pause');

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'STRUCT LATLONALT',
            null,
            SimConnectDataType.LATLONALT
        );

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'AIRSPEED INDICATED',
            'knots',
            SimConnectDataType.INT32
        );

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'VERTICAL SPEED',
            'Feet per second',
            SimConnectDataType.INT32
        );

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'PLANE HEADING DEGREES TRUE',
            'Degrees',
            SimConnectDataType.INT32
        );

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'LIGHT LANDING',
            'bool',
            SimConnectDataType.INT32
        );

        handle.requestDataOnSimObject(
            RequestID.LIVE_DATA,
            DefinitionID.LIVE_DATA,
            SimConnectConstants.OBJECT_ID_USER,
            SimConnectPeriod.SIM_FRAME
        );

        handle.on('simObjectData', recvSimObjectData => {
            if (recvSimObjectData.requestID === RequestID.LIVE_DATA) {
                console.log({
                    // Read order is important
                    position: readLatLonAlt(recvSimObjectData.data),
                    airspeed: recvSimObjectData.data.readInt32(),
                    verticalSpeed: recvSimObjectData.data.readInt32(),
                    heading: recvSimObjectData.data.readInt32(),
                    landingLight: recvSimObjectData.data.readInt32() === 1,
                });
            }
        });

        handle.on('event', recvEvent => {
            if (recvEvent.clientEventId === EventID.PAUSE) {
                console.log(recvEvent.data === 1 ? 'Paused' : 'Unpaused');
            }
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
