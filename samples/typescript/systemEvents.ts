import { SimConnect, Protocol, RecvOpen } from '../dist';

/**
 * Demonstrates a few system events
 */

const enum EVENT_ID {
    PAUSE,
    AIRCRAFT_LOADED,
    FRAME,
    NEW_WEATHER_MODE,
}

const sc = new SimConnect('My app', Protocol.FSX_SP2);

sc.on('open', (recvOpen: RecvOpen) => {
    console.log('Connected: ', recvOpen);

    sc.subscribeToSystemEvent(EVENT_ID.PAUSE, 'Pause');
    sc.subscribeToSystemEvent(EVENT_ID.AIRCRAFT_LOADED, 'AircraftLoaded');
    sc.subscribeToSystemEvent(EVENT_ID.FRAME, 'Frame');
    sc.subscribeToSystemEvent(EVENT_ID.NEW_WEATHER_MODE, 'WeatherModeChanged');
});

sc.on('event', (recvEvent) => {
    switch (recvEvent.eventID) {
        case EVENT_ID.PAUSE:
            console.log(recvEvent.data === 1 ? 'Paused' : 'Unpaused');
            break;
        case EVENT_ID.AIRCRAFT_LOADED:
            break;
    }
});

sc.on('eventFilename', (recvEventFilename) => {
    console.log('New aircraft:', recvEventFilename.fileName);
});

sc.on('eventWeatherMode', (recvWeatherMode) => {
    console.log('New weather mode:', recvWeatherMode.mode);
});

sc.on('eventFrame', (recvEventFrame) => {
    //console.log('Framerate:', recvEventFrame.frameRate);
});
