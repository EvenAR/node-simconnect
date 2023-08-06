import { ConnectionEvent, Protocol, SimConnectApp, SimConnectDataType } from '../../dist';

const app = new SimConnectApp('My App');

app.connect({
    minimumCompatability: Protocol.KittyHawk,
    onConnect: onConnectedHandler,
    onRetry: reason => console.log('Retrying to connect', reason),
});

async function onConnectedHandler({ apiHelpers }: ConnectionEvent) {
    /** Get all airports in the world */
    const allAirports = await apiHelpers.facilities.getAirports(true);
    console.log(`There are currently ${allAirports.length} airports in MSFS!`);

    /** Subscribe to changes in the list of surrounding waypoints */
    apiHelpers.facilities.observeWaypoints({
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
        apiHelpers.facilities
            .getAirportDetails(apIcao, {
                ICAO: SimConnectDataType.STRING8,
                NAME: SimConnectDataType.STRING32,
                N_RUNWAYS: SimConnectDataType.INT32,
                N_TAXI_PARKINGS: SimConnectDataType.INT32,
                RUNWAY: {
                    PRIMARY_NUMBER: SimConnectDataType.INT32,
                    SECONDARY_NUMBER: SimConnectDataType.INT32,
                    PRIMARY_DESIGNATOR: SimConnectDataType.INT32, // 0=none, 1=L, 2=R, 3=C
                    HEADING: SimConnectDataType.FLOAT32,
                    LENGTH: SimConnectDataType.FLOAT32,
                },
                DEPARTURE: {
                    NAME: SimConnectDataType.STRING8,
                },
                ARRIVAL: {
                    NAME: SimConnectDataType.STRING8,
                },
            })
            .catch(err => console.log(err))
    );

    console.log('Favorite airports:', JSON.stringify(await Promise.all(airportDetails)));
}
