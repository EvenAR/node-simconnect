import {
    Protocol,
    RecvOpen,
    SimConnect,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
    open
} from '../dist';

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

const sc = new SimConnect('My app', Protocol.FSX_SP2);

open('My app', Protocol.FSX_SP2)
    .then()

sc.on('open', (recvOpen: RecvOpen) => {
    console.log('Connected:', recvOpen);

    sc.subscribeToSystemEvent(EVENT_ID.PAUSE, 'Pause');

    sc.addToDataDefinition(
        DEF_ID.LIVE_DATA,
        'STRUCT LATLONALT',
        null,
        SimConnectDataType.LATLONALT
    );

    sc.addToDataDefinition(
        DEF_ID.LIVE_DATA,
        'AIRSPEED INDICATED',
        'knots',
        SimConnectDataType.INT32
    );

    sc.addToDataDefinition(
        DEF_ID.LIVE_DATA,
        'VERTICAL SPEED',
        'Feet per second',
        SimConnectDataType.INT32
    );

    sc.addToDataDefinition(
        DEF_ID.LIVE_DATA,
        'PLANE HEADING DEGREES TRUE',
        'Degrees',
        SimConnectDataType.INT32
    );

    sc.addToDataDefinition(
        DEF_ID.LIVE_DATA,
        'LIGHT LANDING',
        'bool',
        SimConnectDataType.INT32
    );

    sc.requestDataOnSimObject(
        REQ_ID.LIVE_DATA,
        DEF_ID.LIVE_DATA,
        SimConnectConstants.OBJECT_ID_USER,
        SimConnectPeriod.SIM_FRAME
    );
});

sc.on('simObjectData', (recvSimObjectData) => {
    if (recvSimObjectData.requestID === REQ_ID.LIVE_DATA) {
        console.log({
            // Read order is important
            position: recvSimObjectData.data.readLatLonAlt(),
            airspeed: recvSimObjectData.data.readInt(),
            verticalSpeed: recvSimObjectData.data.readInt(),
            heading: recvSimObjectData.data.readInt(),
            landingLight: recvSimObjectData.data.readInt() === 1,
        });
    }
});

sc.on('event', (recvEvent) => {
    if (recvEvent.eventID === EVENT_ID.PAUSE) {
        console.log(recvEvent.data === 1 ? 'Paused' : 'Unpaused');
    }
});
