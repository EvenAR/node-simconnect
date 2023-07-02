import { ApiHelper } from '../../dist/apiHelper';
import { open, Protocol, SimConnectDataType } from '../../dist';

open('API-helper example', Protocol.KittyHawk, { host: '192.168.0.21', port: 1337 })
    .then(async ({ recvOpen, handle }) => {
        console.log('Yay, connected!', recvOpen);
        await doStuff(new ApiHelper(handle));
    })
    .catch(e => {
        console.log('Unhandled error', e);
    });

async function doStuff(apiHelper: ApiHelper) {
    const { systemEvents, simulationVariables } = apiHelper;

    /** Subscribe to a system event */
    systemEvents.addEventListener('Pause', data => {
        console.log(data === 0 ? 'UnPaused' : 'Paused');
    });

    /** Get a set of simulation variables once */
    simulationVariables
        .readValues({
            acTitle: {
                simulationVariable: 'TITLE',
                units: null,
                dataType: SimConnectDataType.STRING128,
            },
            cat: {
                simulationVariable: 'CATEGORY',
                units: null,
                dataType: SimConnectDataType.STRING128,
            },
            fuelOnBoard: {
                simulationVariable: 'FUEL TOTA L QUANTITY',
                units: 'liters',
                dataType: SimConnectDataType.INT32,
            },
        })
        .then(data => {
            console.log(
                `Current aircraft is '${data.acTitle}'. It has ${data.fuelOnBoard} liters of fuel on board`
            );
        })
        .catch(err => console.log(err));

    /** Get simulation variables whenever they changes */
    simulationVariables.monitorValues(
        {
            airspeed: {
                simulationVariable: 'AIRSPEED INDICATED',
                units: 'knots',
                dataType: SimConnectDataType.INT32,
            },
            position: {
                simulationVariable: 'STRUCT LATLONALT',
                units: null,
                dataType: SimConnectDataType.LATLONALT,
            },
        },
        (err, data) => {
            if (err) {
                console.log(err);
            } else if (data) {
                console.log('Airspeed:', data.airspeed);
                console.log('Position:', data.position);
            }
        },
        { onlyOnChange: true }
    );
}
