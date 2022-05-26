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

const enum EVENT_ID {
    PAUSE,
}

const enum DEF_ID {
    LIVE_DATA,
}

const enum REQ_ID {
    LIVE_DATA,
}

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected:', recvOpen);

        handle.subscribeToSystemEvent(EVENT_ID.PAUSE, 'Pause');

        handle.addToDataDefinition(
            DEF_ID.LIVE_DATA,
            'STRUCT LATLONALT',
            null,
            SimConnectDataType.LATLONALT
        );

        handle.addToDataDefinition(
            DEF_ID.LIVE_DATA,
            'AIRSPEED INDICATED',
            'knots',
            SimConnectDataType.INT32
        );

        handle.addToDataDefinition(
            DEF_ID.LIVE_DATA,
            'VERTICAL SPEED',
            'Feet per second',
            SimConnectDataType.INT32
        );

        handle.addToDataDefinition(
            DEF_ID.LIVE_DATA,
            'PLANE HEADING DEGREES TRUE',
            'Degrees',
            SimConnectDataType.INT32
        );

        handle.addToDataDefinition(
            DEF_ID.LIVE_DATA,
            'LIGHT LANDING',
            'bool',
            SimConnectDataType.INT32
        );

        handle.requestDataOnSimObject(
            REQ_ID.LIVE_DATA,
            DEF_ID.LIVE_DATA,
            SimConnectConstants.OBJECT_ID_USER,
            SimConnectPeriod.SIM_FRAME
        );

        handle.on('simObjectData', (recvSimObjectData) => {
            if (recvSimObjectData.requestID === REQ_ID.LIVE_DATA) {
                console.log({
                    // Read order is important
                    position: readLatLonAlt(recvSimObjectData.data),
                    airspeed: recvSimObjectData.data.readInt(),
                    verticalSpeed: recvSimObjectData.data.readInt(),
                    heading: recvSimObjectData.data.readInt(),
                    landingLight: recvSimObjectData.data.readInt() === 1,
                });
            }
        });

        handle.on('event', (recvEvent) => {
            if (recvEvent.eventID === EVENT_ID.PAUSE) {
                console.log(recvEvent.data === 1 ? 'Paused' : 'Unpaused');
            }
        });
    })
    .catch((error) => {
        console.log('Failed to connect', error);
    });
