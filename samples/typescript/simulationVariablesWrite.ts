import {
    open,
    Protocol,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
    RawBuffer,
} from '../../dist';

const enum DefinitionID {
    LIGHTS,
}

open('Flick lights', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected:', recvOpen);

        const lights = ['LIGHT LANDING', 'LIGHT LOGO', 'LIGHT TAXI', 'LIGHT WING', 'LIGHT NAV'];

        lights.forEach(lightName => {
            handle.addToDataDefinition(
                DefinitionID.LIGHTS,
                lightName,
                'Bool',
                SimConnectDataType.INT32
            );
        });

        let lightsOn = false;
        const dataToSet = new RawBuffer(100);

        // Toggle all lights on/off every second
        setInterval(() => {
            lightsOn = !lightsOn;

            dataToSet.clear();
            lights.forEach(() => {
                dataToSet.writeInt32(lightsOn ? 1 : 0);
            });

            handle.setDataOnSimObject(DefinitionID.LIGHTS, SimConnectConstants.OBJECT_ID_USER, {
                buffer: dataToSet,
                arrayCount: 0,
                tagged: false,
            });
        }, 1000);

        handle.on('exception', recvException => {
            console.log(recvException);
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
