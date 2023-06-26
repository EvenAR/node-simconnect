import { ApiHelper } from '../../dist/helper/ApiHelper';
import { open, Protocol, SimConnectDataType } from '../../dist';

open('Testing', Protocol.KittyHawk, { host: '192.168.0.21', port: 1337 })
    .then(async ({ recvOpen, handle }) => {
        console.log('Yay, connected', recvOpen);
        handle.on('exception', ex => console.log(ex));

        const api = new ApiHelper(handle);

        api.systemEvents.addEventListener('Pause', data => {
            console.log(data === 0 ? 'UnPaused' : 'Paused');
        });

        const pos = await api.simulationVariables.readValues({
            cat: {
                simulationVariable: 'CATEGORY',
                units: null,
                dataType: SimConnectDataType.STRINGV,
            },
            fuel: {
                simulationVariable: 'FUEL TOTAL QUANTITY',
                units: 'liters',
                dataType: SimConnectDataType.INT32,
            },
            aircraft: {
                simulationVariable: 'TITLE',
                units: null,
                dataType: SimConnectDataType.STRINGV,
            },
        });

        api.simulationVariables.monitorValues(
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
            data => {
                console.log('Some of this data changed:', data);
            },
            { onlyOnChange: true }
        );

        console.log(pos);
    })
    .catch(e => {
        console.log('Failed to connect', e);
    });
