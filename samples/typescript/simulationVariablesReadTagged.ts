import {
    open,
    Protocol,
    readLatLonAlt,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
} from '../../dist';
import { DataRequestFlag } from '../../dist';

const enum DefinitionID {
    LIVE_DATA,
}

const enum RequestID {
    LIVE_DATA,
}

const enum Tag {
    LAT_LON_ALT,
    AIRSPEED,
    VERTICAL_SPEED,
    HEADING,
    LANDING_LIGHT,
}

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected:', recvOpen);

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'STRUCT LATLONALT',
            null,
            SimConnectDataType.LATLONALT,
            0,
            Tag.LAT_LON_ALT
        );

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'AIRSPEED INDICATED',
            'knots',
            SimConnectDataType.INT32,
            0,
            Tag.AIRSPEED
        );

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'VERTICAL SPEED',
            'Feet per second',
            SimConnectDataType.INT32,
            0,
            Tag.VERTICAL_SPEED
        );

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'PLANE HEADING DEGREES TRUE',
            'Degrees',
            SimConnectDataType.INT32,
            0,
            Tag.HEADING
        );

        handle.addToDataDefinition(
            DefinitionID.LIVE_DATA,
            'LIGHT LANDING',
            'bool',
            SimConnectDataType.INT32,
            0,
            Tag.LANDING_LIGHT
        );

        handle.requestDataOnSimObject(
            RequestID.LIVE_DATA,
            DefinitionID.LIVE_DATA,
            SimConnectConstants.OBJECT_ID_USER,
            SimConnectPeriod.SIM_FRAME,
            DataRequestFlag.DATA_REQUEST_FLAG_CHANGED | DataRequestFlag.DATA_REQUEST_FLAG_TAGGED
        );

        handle.on('simObjectData', recvSimObjectData => {
            if (recvSimObjectData.requestID === RequestID.LIVE_DATA) {
                let counter = 0;

                while (counter < recvSimObjectData.defineCount) {
                    /**
                     * Read all datums in the message. The values are separated by their tag number.
                     * Important: if not all data are read you might end up with corrupt data.
                     */
                    const datumId = recvSimObjectData.data.readInt32();

                    switch (datumId) {
                        case Tag.LAT_LON_ALT:
                            {
                                const value = readLatLonAlt(recvSimObjectData.data);
                                console.log('Position', value);
                            }
                            break;
                        case Tag.AIRSPEED:
                            {
                                const value = recvSimObjectData.data.readInt32();
                                console.log('Airspeed', value);
                            }
                            break;
                        case Tag.HEADING:
                            {
                                const value = recvSimObjectData.data.readInt32();
                                console.log('Heading', value);
                            }
                            break;
                        case Tag.VERTICAL_SPEED:
                            {
                                const value = recvSimObjectData.data.readInt32();
                                console.log('Vertical speed', value);
                            }
                            break;
                        case Tag.LANDING_LIGHT:
                            {
                                const value = recvSimObjectData.data.readInt32();
                                console.log('Landing light on', value);
                            }
                            break;
                        default: {
                            throw Error(`Unknown datum ID: $datumId`);
                        }
                    }
                    counter++;
                }
            }
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
