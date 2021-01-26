import {
    Protocol,
    RecvEvent,
    RecvOpen,
    SimConnect,
    TextType,
    TextResult,
    FacilityListType,
    NotificationPriority,
} from '../dist';

/**
 * SimConnect FaciliitesData sample
 *
 *      Description:
 *                              Ctrl F1 displays the Get Facilities menu on the screen
 *                              Ctrl F2 displays the Subscribe to Faciliites menu on the screen
 *
 */

enum NOTIFICATION_GROUP_ID {
    GROUP0,
}

enum EVENT_ID {
    OPEN_MENU_1,
    OPEN_MENU_2,
    EVENT_MENU_1,
    EVENT_MENU_2,
}

enum INPUT_GROUP_ID {
    INPUT0,
}

enum REQUEST_ID {
    REQUEST_0,
    REQUEST_1,
}

const GET_FACILITIES_MENU_OPTIONS: string[] = [
    'Get airport facilities',
    'Get waypoints',
    'Get NDB',
    'Get VOR',
    'Close menu',
];

const SUBSCRIBE_FACILITIES_MENU_OPTIONS: string[] = [
    'Subscribe to airports',
    'Subscribe to waypoints',
    'Subscribe to NDB',
    'Subscribe to VOR',
    'Unsubscribe to airports',
    'Unsubscribe to waypoints',
    'Unsubscribe to NDB',
    'Unsubscribe to VOR',
    'Close menu',
];

const sc = new SimConnect('My app', Protocol.FSX_SP2);

sc.on('open', (recvOpen: RecvOpen) => {
    console.log('Connected: ', recvOpen);

    sc.mapClientEventToSimEvent(EVENT_ID.OPEN_MENU_1);
    sc.mapClientEventToSimEvent(EVENT_ID.OPEN_MENU_2);
    sc.addClientEventToNotificationGroup(
        NOTIFICATION_GROUP_ID.GROUP0,
        EVENT_ID.OPEN_MENU_1,
        true
    );
    sc.addClientEventToNotificationGroup(
        NOTIFICATION_GROUP_ID.GROUP0,
        EVENT_ID.OPEN_MENU_2,
        true
    );
    sc.setNotificationGroupPriority(
        NOTIFICATION_GROUP_ID.GROUP0,
        NotificationPriority.HIGHEST
    );
    sc.mapInputEventToClientEvent(
        INPUT_GROUP_ID.INPUT0,
        'Ctrl+F1',
        EVENT_ID.OPEN_MENU_1
    );
    sc.mapInputEventToClientEvent(
        INPUT_GROUP_ID.INPUT0,
        'Ctrl+F2',
        EVENT_ID.OPEN_MENU_2
    );
    sc.setInputGroupState(INPUT_GROUP_ID.INPUT0, true);

    sc.text(TextType.PRINT_RED, 15, 3, 'Facilities Data');
    sc.text(
        TextType.PRINT_RED,
        15,
        3,
        'Press Ctrl-F1 for Get Facilities, Ctrl-F2 for Subscribe to Facilities'
    );
});

sc.on('event', ({ eventID, data }: RecvEvent) => {
    switch (eventID) {
        case EVENT_ID.OPEN_MENU_1:
            openMenu(GET_FACILITIES_MENU_OPTIONS);
            break;
        case EVENT_ID.OPEN_MENU_2:
            openMenu(SUBSCRIBE_FACILITIES_MENU_OPTIONS);
            break;
        case EVENT_ID.EVENT_MENU_1:
            {
                if (data > TextResult.MENU_SELECT_10) return;
                if (data < FacilityListType.COUNT) {
                    sc.requestFacilitiesList(
                        data as FacilityListType,
                        REQUEST_ID.REQUEST_0
                    );
                }
            }
            break;
        case EVENT_ID.EVENT_MENU_2:
            {
                if (data > TextResult.MENU_SELECT_10) return;
                if (data < FacilityListType.COUNT) {
                    sc.subscribeToFacilities(
                        data as FacilityListType,
                        REQUEST_ID.REQUEST_1
                    );
                } else if (data < 2 * FacilityListType.COUNT) {
                    sc.unSubscribeToFacilities(
                        (data - FacilityListType.COUNT) as FacilityListType
                    );
                }
            }
            break;
    }
});

function openMenu(items: string[]) {
    sc.menu(
        0.0,
        EVENT_ID.EVENT_MENU_1,
        'SimConnect Facilities Test',
        'Choose which item:',
        ...items
    );
}

sc.on('airportList', (recvAirportList) => {
    console.log(recvAirportList.aiports.map((ap) => ap.icao).join(','));
});

sc.on('ndbList', (recvNDBList) => {
    console.log(recvNDBList.ndbs.map((ndb) => ndb.icao).join(','));
});

sc.on('vorList', (recvVORList) => {
    console.log(recvVORList.vors.map((vor) => vor.icao).join(','));
});

sc.on('waypointList', (recvWaypointList) => {
    console.log(recvWaypointList.waypoints.map((wp) => wp.icao).join(','));
});
