import {
    Protocol,
    SimConnectDataType,
    SimConnectConstants,
    SimConnectPeriod,
    RecvSimObjectData,
    SimConnectException,
    RecvException,
    RecvWeatherObservation,
    open,
} from '../../dist';

/**
 * A little app to show METAR at current position
 */

const DEF_ID_POSITION = 0;
const REQ_ID_POSITION = 0;
const REQ_ID_METAR = 1;

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected: ', recvOpen);
        handle.addToDataDefinition(
            DEF_ID_POSITION,
            'Plane longitude',
            'degrees',
            SimConnectDataType.FLOAT32
        );
        handle.addToDataDefinition(
            DEF_ID_POSITION,
            'Plane latitude',
            'degrees',
            SimConnectDataType.FLOAT32
        );
        handle.requestDataOnSimObject(
            REQ_ID_POSITION,
            DEF_ID_POSITION,
            SimConnectConstants.OBJECT_ID_USER,
            SimConnectPeriod.ONCE
        );

        handle.on('simObjectData', (recvSimObjectData: RecvSimObjectData) => {
            const lon = recvSimObjectData.data.readFloat();
            const lat = recvSimObjectData.data.readFloat();
            console.log(`Requesting METAR at ${lat}, ${lon}`);
            handle.weatherRequestObservationAtNearestStation(REQ_ID_METAR, lat, lon);
        });

        handle.on('weatherObservation', (recvWeatherObservation: RecvWeatherObservation) => {
            console.log(recvWeatherObservation.metar);
        });

        handle.on('exception', (recvException: RecvException) => {
            if (recvException.exception === SimConnectException.WEATHER_UNABLE_TO_GET_OBSERVATION) {
                console.log('Unable to get weather observation');
            } else {
                console.log(`Unexpected exception: ${recvException.exception}`);
            }
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
