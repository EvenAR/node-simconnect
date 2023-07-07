import { ApiHelper } from '../../dist/apiHelper';
import { open, Protocol, SimConnectDataType } from '../../dist';

open('API-helper example', Protocol.KittyHawk)
    .then(async ({ recvOpen, handle }) => {
        console.log('Yay, connected!', recvOpen);
        await doStuff(new ApiHelper(handle));
    })
    .catch(e => {
        console.log('Unhandled error', e);
    });

async function doStuff(apiHelper: ApiHelper) {
    const { systemEvents, simulationVariables, facilities } = apiHelper;

    /** Subscribe to a system event */
    systemEvents.addEventListener('Pause', data => {
        console.log(data === 0 ? 'UnPaused' : 'Paused');
    });

    /** Get a set of simulation variables once */
    simulationVariables
        .request({
            TITLE: {
                units: null,
                dataType: SimConnectDataType.STRING128,
            },
            CATEGORY: {
                units: null,
                dataType: SimConnectDataType.STRING128,
            },
            'FUEL TOTAL QUANTITY': {
                units: 'liters',
                dataType: SimConnectDataType.INT32,
            },
        })
        .then(data => {
            console.log(
                `Current aircraft is '${data.TITLE}'. It has ${data['FUEL TOTAL QUANTITY']} liters of fuel on board`
            );
        })
        .catch(err => console.log(err));

    /** Get simulation variables whenever they change */
    simulationVariables.monitor(
        {
            'AIRSPEED INDICATED': {
                units: 'knots',
                dataType: SimConnectDataType.INT32,
            },
            'STRUCT LATLONALT': {
                units: null,
                dataType: SimConnectDataType.LATLONALT,
            },
        },
        (err, data) => {
            if (err) {
                console.log(err);
            } else if (data) {
                console.log('Airspeed:', data['AIRSPEED INDICATED']);
                console.log('Altitude:', data['STRUCT LATLONALT'].altitude);
            }
        },
        { onlyOnChange: true }
    );

    /** Set throttles to 50% */
    simulationVariables.set(
        {
            'GENERAL ENG THROTTLE LEVER POSITION:1': {
                value: 50,
                units: 'Percent',
                dataType: SimConnectDataType.INT32,
            },
            'GENERAL ENG THROTTLE LEVER POSITION:2': {
                value: 50,
                units: 'Percent',
                dataType: SimConnectDataType.INT32,
            },
        },
        err => console.log(err)
    );

    /** Get some details about a nearby airport  */
    const airportsAroundAircraft = await facilities.getAirportList();

    const airportInfo = await facilities.getAirport(airportsAroundAircraft[0].icao, {
        /**
         * The property names and corresponding data types are defined here:
         * https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm
         */
        ICAO: SimConnectDataType.STRING8,
        NAME: SimConnectDataType.STRING32,
        RUNWAY: {
            PRIMARY_NUMBER: SimConnectDataType.INT32,
            SECONDARY_NUMBER: SimConnectDataType.INT32,
            HEADING: SimConnectDataType.FLOAT32,
            LENGTH: SimConnectDataType.FLOAT32,
        },
    });
    console.log('Got airport', airportInfo);
}
