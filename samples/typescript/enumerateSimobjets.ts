import { open, Protocol, SimObjectType } from '../../dist';

open('My app', Protocol.SunRise)
    .then(({ recvOpen, handle }) => {
        console.log('Connected: ', recvOpen);

        handle.enumerateSimObjectsAndLiveries(123, SimObjectType.AIRCRAFT);

        handle.on('enumerateSimobjectAndLiveryList', recv => {
            console.log(recv.simobjectLiveries);
        });

        handle.on('eventWeatherMode', recvWeatherMode => {
            console.log('New weather mode:', recvWeatherMode.mode);
        });

        handle.on('eventFrame', recvEventFrame => {
            // console.log('Framerate:', recvEventFrame.frameRate);
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
