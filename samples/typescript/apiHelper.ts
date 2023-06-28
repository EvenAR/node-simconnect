import { ApiHelper } from '../../dist/helper/ApiHelper';
import { open, Protocol, SimConnectDataType, SimObjectType } from '../../dist';

open('Testing', Protocol.KittyHawk, { host: '192.168.0.21', port: 1337 })
    .then(async ({ recvOpen, handle }) => {
        console.log('Yay, connected', recvOpen);
        handle.on('exception', ex => console.log(ex));

        const { systemEvents, simulationVariables } = new ApiHelper(handle);

        systemEvents.addEventListener('Pause', data => {
            console.log(data === 0 ? 'UnPaused' : 'Paused');
        });

        const pos = await simulationVariables.readValues({
            cat: {
                simulationVariable: 'CATEGORY',
                units: null,
                dataType: SimConnectDataType.STRINGV,
            },
            fuel3: {
                simulationVariable: 'FUEL TOTAL QUANTItTY',
                units: 'liters',
                dataType: SimConnectDataType.INT32,
            },
        });

        simulationVariables.monitorSimulationObjects(
            SimObjectType.AIRCRAFT,
            10000,
            {
                lat: {
                    simulationVariable: 'PLANE LATITUDE',
                    units: 'degrees',
                    dataType: SimConnectDataType.FLOAT64,
                },
                lng: {
                    simulationVariable: 'PLANE LONGITUDE',
                    units: 'degrees',
                    dataType: SimConnectDataType.FLOAT64,
                },
                cat: {
                    simulationVariable: 'TITLE',
                    units: null,
                    dataType: SimConnectDataType.STRING128,
                },
                ias: {
                    simulationVariable: 'AIRSPEED INDICATED',
                    units: 'knots',
                    dataType: SimConnectDataType.INT32,
                },
            },
            values => {
                console.log('nearby aircraft', values);
            }
        );

        console.log(pos);
    })
    .catch(e => {
        console.log('Failed to connect', e);
    });
