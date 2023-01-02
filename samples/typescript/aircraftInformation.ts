import {
    open,
    Protocol,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
} from '../../dist';

const AIRCRAFT_DATA_REQUEST = 0;
const AIRCRAFT_DATA_DEFINITION = 0;

open('My app', Protocol.FSX_SP2).then(recv => {
    console.log('Connected to', recv.recvOpen.applicationName);

    recv.handle.addToDataDefinition(
        AIRCRAFT_DATA_DEFINITION,
        'Plane Latitude',
        'degrees',
        SimConnectDataType.FLOAT64,
        0,
        SimConnectConstants.UNUSED
    );
    recv.handle.addToDataDefinition(
        AIRCRAFT_DATA_DEFINITION,
        'Plane Longitude',
        'degrees',
        SimConnectDataType.FLOAT64,
        0,
        SimConnectConstants.UNUSED
    );
    recv.handle.addToDataDefinition(
        AIRCRAFT_DATA_DEFINITION,
        'CATEGORY',
        null,
        SimConnectDataType.STRINGV,
        0,
        SimConnectConstants.UNUSED
    );
    recv.handle.addToDataDefinition(
        AIRCRAFT_DATA_DEFINITION,
        'TITLE',
        null,
        SimConnectDataType.STRINGV,
        0,
        SimConnectConstants.UNUSED
    );
    recv.handle.addToDataDefinition(
        AIRCRAFT_DATA_DEFINITION,
        'ATC ID',
        null,
        SimConnectDataType.STRING32,
        0,
        SimConnectConstants.UNUSED
    );

    recv.handle.requestDataOnSimObject(
        AIRCRAFT_DATA_REQUEST,
        AIRCRAFT_DATA_DEFINITION,
        SimConnectConstants.OBJECT_ID_USER,
        SimConnectPeriod.ONCE,
        0,
        0,
        0,
        0
    );

    recv.handle.on('simObjectData', recvSimObjectData => {
        console.log(`Lat: "${recvSimObjectData.data.readFloat64()}"`);
        console.log(`Lng: "${recvSimObjectData.data.readFloat64()}"`);
        console.log(`Type: "${recvSimObjectData.data.readStringV()}"`);
        console.log(`Title: "${recvSimObjectData.data.readStringV()}"`);
        console.log(`ATC ID: "${recvSimObjectData.data.readString32()}"`);
    });
});
