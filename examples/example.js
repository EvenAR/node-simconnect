const {
    SimConnect,
    Protocol,
    FacilityListType,
    FacilityVOR,
} = require('../dist');

const sc = new SimConnect('My app', 3);

sc.on('open', (recvOpen) => {
    console.log('Open yay');

    sc.requestSystemState(1, 'AircraftLoaded');
    sc.subscribeToSystemEvent(2, 'AircraftLoaded');
    sc.subscribeToSystemEvent(3, 'WeatherModeChanged');
    sc.requestFacilitiesList(FacilityListType.WAYPOINT, 88);
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

sc.on('weatherMode', (recvWeatherMode) => {
    console.log(recvWeatherMode);
});

sc.on('airportList', (recvAirportList) => {
    console.log(recvAirportList);
});

sc.on('vorList', (recvVorList) => {
    console.log(
        recvVorList.vors.filter(
            (vor) => !vor.hasFlag(FacilityVOR.HAS_GLIDE_SLOPE)
        )
    );
});

sc.on('waypointList', (recvNdbList) => {
    console.log(recvNdbList.waypoints);
});
