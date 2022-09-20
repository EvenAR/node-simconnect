import {
    open,
    Protocol,
    RecvEvent,
    TextType,
    TextResult,
    FacilityListType,
    NotificationPriority,
} from '../../dist';

/**
 * SimConnect FaciliitesData sample
 *
 *      Description:
 *                              Ctrl F1 displays the Get Facilities menu on the screen
 *                              Ctrl F2 displays the Subscribe to Faciliites menu on the screen
 *
 */

enum NotificationGroupID {
    GROUP0,
}

enum EventID {
    OPEN_MENU_1,
    OPEN_MENU_2,
    EVENT_MENU_1,
    EVENT_MENU_2,
}

enum InputGroupID {
    INPUT0,
}

enum RequestID {
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

open('My app', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log('Connected: ', recvOpen);

        handle.mapClientEventToSimEvent(EventID.OPEN_MENU_1);
        handle.mapClientEventToSimEvent(EventID.OPEN_MENU_2);
        handle.addClientEventToNotificationGroup(
            NotificationGroupID.GROUP0,
            EventID.OPEN_MENU_1,
            true
        );
        handle.addClientEventToNotificationGroup(
            NotificationGroupID.GROUP0,
            EventID.OPEN_MENU_2,
            true
        );
        handle.setNotificationGroupPriority(
            NotificationGroupID.GROUP0,
            NotificationPriority.HIGHEST
        );
        handle.mapInputEventToClientEvent(
            InputGroupID.INPUT0,
            'Ctrl+F1',
            EventID.OPEN_MENU_1
        );
        handle.mapInputEventToClientEvent(
            InputGroupID.INPUT0,
            'Ctrl+F2',
            EventID.OPEN_MENU_2
        );
        handle.setInputGroupState(InputGroupID.INPUT0, true);

        handle.text(TextType.PRINT_RED, 15, 3, 'Facilities Data');
        handle.text(
            TextType.PRINT_RED,
            15,
            3,
            'Press Ctrl-F1 for Get Facilities, Ctrl-F2 for Subscribe to Facilities'
        );

        handle.on('event', ({ clientEventId, data }: RecvEvent) => {
            switch (clientEventId) {
                case EventID.OPEN_MENU_1:
                    openMenu(GET_FACILITIES_MENU_OPTIONS);
                    break;
                case EventID.OPEN_MENU_2:
                    openMenu(SUBSCRIBE_FACILITIES_MENU_OPTIONS);
                    break;
                case EventID.EVENT_MENU_1:
                    {
                        if (data > TextResult.MENU_SELECT_10) return;
                        if (data < FacilityListType.COUNT) {
                            handle.requestFacilitiesList(
                                data as FacilityListType,
                                RequestID.REQUEST_0
                            );
                        }
                    }
                    break;
                case EventID.EVENT_MENU_2:
                    {
                        if (data > TextResult.MENU_SELECT_10) return;
                        if (data < FacilityListType.COUNT) {
                            handle.subscribeToFacilities(
                                data as FacilityListType,
                                RequestID.REQUEST_1
                            );
                        } else if (data < 2 * FacilityListType.COUNT) {
                            handle.unSubscribeToFacilities(
                                (data -
                                    FacilityListType.COUNT) as FacilityListType
                            );
                        }
                    }
                    break;
            }
        });

        function openMenu(items: string[]) {
            handle.menu(
                0.0,
                EventID.EVENT_MENU_1,
                'SimConnect Facilities Test',
                'Choose which item:',
                ...items
            );
        }

        handle.on('airportList', (recvAirportList) => {
            console.log(recvAirportList.aiports.map((ap) => ap.icao).join(','));
        });

        handle.on('ndbList', (recvNDBList) => {
            console.log(recvNDBList.ndbs.map((ndb) => ndb.icao).join(','));
        });

        handle.on('vorList', (recvVORList) => {
            console.log(recvVORList.vors.map((vor) => vor.icao).join(','));
        });

        handle.on('waypointList', (recvWaypointList) => {
            console.log(
                recvWaypointList.waypoints.map((wp) => wp.icao).join(',')
            );
        });
    })
    .catch((error) => {
        console.log('Failed to connect', error);
    });
