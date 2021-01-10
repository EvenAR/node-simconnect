import { SimConnect, Protocol } from '../dist';

const sc = new SimConnect('My app', Protocol.FSX_SP2);

sc.on('airportList', (recvAirportList) => {
    console.log(recvAirportList);
});

sc.on('open', (recvOpen) => {
    console.log(recvOpen);

    sc.requestSystemState(1, 'AircraftLoaded');
    sc.subscribeToSystemEvent(2, 'AircraftLoaded');
    sc.subscribeToSystemEvent(3, 'WeatherModeChanged');
});

sc.on('quit', () => {
    console.log('Quitted');
});

sc.on('eventFilename', (filename) => {
    console.log('Filename:', filename);
});

sc.on('systemState', (filename) => {
    console.log('System state:', filename);
});

sc.on('eventFrame', (frame) => {
    console.log(frame);
});

sc.on('eventWeatherMode', (recvWeatherMode) => {
    console.log(recvWeatherMode);
});

sc.on('exception', (recvException) => {});
