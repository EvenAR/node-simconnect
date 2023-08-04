import {
    ConnectionEvent,
    FacilityListType,
    Protocol,
    SimConnectApp,
    SimConnectDataType,
} from '../../dist';

const app = new SimConnectApp('My App');

app.connect({
    baseProtocol: Protocol.FSX_SP1,
    onConnect: onConnectedHandler,
    onRetry: reason => console.log('Retrying to connect', reason),
});

async function onConnectedHandler({ apiHelpers }: ConnectionEvent) {
    /** Get all airports in the world */
    const allAirports = await apiHelpers.facilities.requestList({
        facilityListType: FacilityListType.AIRPORT,
        includeWholeWorld: false,
    });
    console.log(`There are currently ${allAirports.length} airports in MSFS!`);

    /** Subscribe to changes in the list of surrounding waypoints */
    apiHelpers.facilities.observeList({
        facilityListType: FacilityListType.WAYPOINT,
        onListUpdated: list => {
            console.log(
                `Number of elements in waypoint cache updated: ${list.length}. Here is one of them:`,
                list[0]
            );
        },
        onError: err => console.log(err),
    });

    /** Get details about some airports  */
    const favoriteAirports = ['ENGM', 'ENKJ', 'VNLK'];
    const airportDetails = favoriteAirports.map(apIcao =>
        apiHelpers.facilities.requestAirport(apIcao, {
            ICAO: SimConnectDataType.STRING8,
            NAME: SimConnectDataType.STRING32,
            N_RUNWAYS: SimConnectDataType.INT32,
            N_TAXI_PARKINGS: SimConnectDataType.INT32,
            RUNWAY: {
                PRIMARY_NUMBER: SimConnectDataType.INT32,
                SECONDARY_NUMBER: SimConnectDataType.INT32,
                HEADING: SimConnectDataType.FLOAT32,
                LENGTH: SimConnectDataType.FLOAT32,
            },
        })
    );

    console.log('Favorite airports:', await Promise.all(airportDetails));
}
