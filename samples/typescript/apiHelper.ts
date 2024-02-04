import { ApiHelper } from '../../dist/src/apiHelper';
import { open, Protocol, SimConnectDataType } from '../../dist/src';

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
    const aircraftTitle = await simulationVariables.get('TITLE');
    const atcMdel = await simulationVariables.get('ATC_MODEL');
    const fuelOnBoard = await simulationVariables.get('FUEL_TOTAL_QUANTITY');
    const fuelOnBoardKgs = await simulationVariables.get({
        name: 'FUEL_TOTAL_QUANTITY',
        units: 'kilograms',
        dataType: SimConnectDataType.FLOAT64,
    });

    console.log(
        `Current aircraft is '${aircraftTitle}' (${atcMdel}). It has ${fuelOnBoard} gallons (${fuelOnBoardKgs} kgs) of fuel on board`
    );

    /** Get simulation variables whenever they change */
    simulationVariables.monitor(
        ['AIRSPEED_INDICATED', 'STRUCT_LATLONALT'],
        (err, data) => {
            if (err) {
                console.log(err);
            } else if (data) {
                console.log('Airspeed:', data.AIRSPEED_INDICATED);
                console.log('Altitude:', data.STRUCT_LATLONALT.altitude);
            }
        },
        { onlyOnChange: true }
    );

    /** Set throttles to 50% */
    simulationVariables.set(['GENERAL ENG THROTTLE LEVER POSITION:1', 50, 'Percent'], err =>
        console.log(err)
    );

    /**
     * The property names and corresponding data types are defined here:
     * https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm
     */
    const airportInfo = await facilities.getAirport('ENKJ', {
        ICAO: SimConnectDataType.STRING8,
        NAME: SimConnectDataType.STRING32,
        RUNWAY: {
            // TODO: fix return type. This should be a list in the returned type definition
            PRIMARY_NUMBER: SimConnectDataType.INT32,
            HEADING: SimConnectDataType.FLOAT32,
            LENGTH: SimConnectDataType.FLOAT32,
        },
    });
    console.log('Got airport', airportInfo);
}
