import { open, Protocol } from '../../dist';

/**
 * Demonstrates a few system events
 */

const enum EVENT_ID {
    PAUSE,
    AIRCRAFT_LOADED,
    FRAME,
    NEW_WEATHER_MODE,
}

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected: ', recvOpen);

        handle.subscribeToSystemEvent(EVENT_ID.PAUSE, 'Pause');
        handle.subscribeToSystemEvent(
            EVENT_ID.AIRCRAFT_LOADED,
            'AircraftLoaded'
        );
        handle.subscribeToSystemEvent(EVENT_ID.FRAME, 'Frame');
        handle.subscribeToSystemEvent(
            EVENT_ID.NEW_WEATHER_MODE,
            'WeatherModeChanged'
        );

        handle.on('event', (recvEvent) => {
            switch (recvEvent.eventID) {
                case EVENT_ID.PAUSE:
                    console.log(recvEvent.data === 1 ? 'Paused' : 'Unpaused');
                    break;
                case EVENT_ID.AIRCRAFT_LOADED:
                    break;
            }
        });

        handle.on('eventFilename', (recvEventFilename) => {
            console.log('New aircraft:', recvEventFilename.fileName);
        });

        handle.on('eventWeatherMode', (recvWeatherMode) => {
            console.log('New weather mode:', recvWeatherMode.mode);
        });

        handle.on('eventFrame', (recvEventFrame) => {
            // console.log('Framerate:', recvEventFrame.frameRate);
        });
    })
    .catch((error) => {
        console.log('Failed to connect', error);
    });
