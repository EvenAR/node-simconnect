import {
    SimConnect,
    Protocol,
    SimConnectDataType,
    SimConnectConstants,
    SimConnectPeriod,
    RecvSimObjectData,
    SimConnectException,
    RecvOpen,
    RecvException,
    RecvWeatherObservation,
} from '../dist';

/**
 * A little app to show METAR at current position
 */

const DEF_ID_POSITION = 0;
const REQ_ID_POSITION = 0;
const REQ_ID_METAR = 1;

const sc = new SimConnect('My app', Protocol.FSX_SP2);

sc.on('open', (recvOpen: RecvOpen) => {
    console.log('Connected: ', recvOpen);

    sc.addToDataDefinition(
        DEF_ID_POSITION,
        'Plane longitude',
        'degrees',
        SimConnectDataType.FLOAT32
    );
    sc.addToDataDefinition(
        DEF_ID_POSITION,
        'Plane latitude',
        'degrees',
        SimConnectDataType.FLOAT32
    );
    sc.requestDataOnSimObject(
        REQ_ID_POSITION,
        DEF_ID_POSITION,
        SimConnectConstants.OBJECT_ID_USER,
        SimConnectPeriod.ONCE
    );

    sc.on('simObjectData', (recvSimObjectData: RecvSimObjectData) => {
        const lon = recvSimObjectData.data.readFloat();
        const lat = recvSimObjectData.data.readFloat();
        console.log(`Requesting METAR at ${lat}, ${lon}`);
        sc.weatherRequestObservationAtNearestStation(REQ_ID_METAR, lat, lon);
    });
});

sc.on(
    'weatherObservation',
    (recvWeatherObservation: RecvWeatherObservation) => {
        console.log(recvWeatherObservation.metar);
    }
);

sc.on('exception', (recvException: RecvException) => {
    if (
        recvException.exception ===
        SimConnectException.WEATHER_UNABLE_TO_GET_OBSERVATION
    ) {
        console.log('Unable to get weather observation');
    } else {
        console.log(`Unexpected exception: ${recvException.exception}`);
    }
});
