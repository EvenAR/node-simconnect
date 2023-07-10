import { ApiHelper } from '../../dist/apiHelper';
import { open, Protocol, SimConnectDataType, SimConnectPeriod } from '../../dist';

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
    const aircraftInfo = await simulationVariables.get({
        TITLE: {
            dataType: SimConnectDataType.STRING128,
        },
        CATEGORY: {
            dataType: SimConnectDataType.STRING128,
        },
        FUEL_TOTAL_QUANTITY: {
            units: 'liters',
            dataType: SimConnectDataType.INT32,
        },
    });

    console.log(
        `Current aircraft is '${aircraftInfo.TITLE}'. It has ${aircraftInfo.FUEL_TOTAL_QUANTITY} liters of fuel on board`
    );

    /** Get simulation variables whenever one of them change */
    simulationVariables.monitor(
        {
            LIGHT_LANDING: {
                units: 'Bool',
                dataType: SimConnectDataType.INT32,
            },
            BRAKE_PARKING_POSITION: {
                units: 'Bool',
                dataType: SimConnectDataType.INT32,
            },
        },
        data => {
            console.log('Landing lights:', data.LIGHT_LANDING === 1 ? 'On' : 'Off');
            console.log('Parking brakes:', data.BRAKE_PARKING_POSITION === 1 ? 'Set' : 'Released');
        },
        err => console.log(`Something went wrong: ${err}`),
        { onlyOnChange: true, updateRate: SimConnectPeriod.VISUAL_FRAME }
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
