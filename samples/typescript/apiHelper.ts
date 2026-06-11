import { FlightSimulatorApi } from '../../dist/ApiHelper';
import { open, Protocol, SimConnectDataType } from '../../dist';

open('API-helper example', Protocol.SunRise)
    .then(async ({ recvOpen, handle }) => {
        console.log('Yay, connected!', recvOpen);
        await doStuff(new FlightSimulatorApi(handle));
    })
    .catch(e => {
        console.log('Unhandled error', e.code);
    });

async function doStuff(apiHelper: FlightSimulatorApi) {
    const { systemEvents, simulationVariables, facilities } = apiHelper;

    /** Subscribe to a system event */
    systemEvents.on('Pause', data => {
        console.log(data === 0 ? 'UnPaused' : 'Paused');
    });

    /** Get a set of simulation variables once */
    const aircraftTitle = await simulationVariables.get('TITLE');
    const atcMdel = await simulationVariables.get('ATC MODEL');
    const fuelOnBoard = await simulationVariables.get('FUEL TOTAL QUANTITY');
    const fuelOnBoardKgs = await simulationVariables.get({
        name: 'FUEL TOTAL QUANTITY',
        units: 'kilograms',
        dataType: SimConnectDataType.FLOAT64,
    });

    console.log(
        `Current aircraft is '${aircraftTitle}' (${atcMdel}). It has ${fuelOnBoard} gallons (${fuelOnBoardKgs} kgs) of fuel on board`
    );

    /** Get simulation variables whenever they change */
    simulationVariables.watch(
        [
            'AIRSPEED INDICATED',
            'GENERAL ENG THROTTLE LEVER POSITION:1',
            'GENERAL ENG THROTTLE LEVER POSITION:2',
            { name: 'PLANE LATITUDE', units: 'Degrees', dataType: SimConnectDataType.FLOAT64 },
            { name: 'PLANE LONGITUDE', units: 'Degrees', dataType: SimConnectDataType.FLOAT64 },
        ],
        simvars => {
            console.log(simvars);
        },
        { onlyOnChange: true }
    );

    /** Set throttles to 50% */
    simulationVariables.set(
        {
            'GENERAL ENG THROTTLE LEVER POSITION:1': 0.5,
        },
        err => console.log(err)
    );

    /**
     * The property names and corresponding data types are defined here:
     * https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm
     */
    /* const airportInfo = await facilities.getAirport('ENKJ', {
         ICAO: SimConnectDataType.STRING8,
         NAME: SimConnectDataType.STRING32,
         RUNWAY: {
             // TODO: fix return type. This should be a list in the returned type definition
             PRIMARY_NUMBER: SimConnectDataType.INT32,
             HEADING: SimConnectDataType.FLOAT32,
             LENGTH: SimConnectDataType.FLOAT32,
         },
     });
    console.log('Got airport', airportInfo);*/
}
