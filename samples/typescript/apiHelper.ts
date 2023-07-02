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
    const { systemEvents, simulationVariables } = apiHelper;

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
}
