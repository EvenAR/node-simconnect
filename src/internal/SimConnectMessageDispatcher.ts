import debug from 'debug';
import { SimConnectRecvEvents } from '../SimConnectRecvEvents';
import { SimConnectMessage, RecvID } from '../SimConnectSocket';
import {
    RecvActionCallback,
    RecvAirportList,
    RecvAssignedObjectID,
    RecvCloudState,
    RecvControllersList,
    RecvCustomAction,
    RecvEnumerateInputEventParams,
    RecvEnumerateInputEvents,
    RecvEnumerateSimobjectAndLiveryList,
    RecvEvent,
    RecvEventAddRemove,
    RecvEventEx1,
    RecvEventFilename,
    RecvEventFrame,
    RecvEventRaceEnd,
    RecvEventRaceLap,
    RecvEventWeatherMode,
    RecvException,
    RecvFacilityData,
    RecvFacilityDataEnd,
    RecvFacilityMinimalList,
    RecvFlowEvent,
    RecvGetInputEvent,
    RecvJetwayData,
    RecvNDBList,
    RecvOpen,
    RecvReservedKey,
    RecvSimObjectData,
    RecvSubscribeInputEvent,
    RecvSystemState,
    RecvVORList,
    RecvWaypointList,
    RecvWeatherObservation,
} from '../recv';

const logger = debug('node-simconnect');

type EmitFn = <U extends keyof SimConnectRecvEvents>(
    event: U,
    ...args: Parameters<SimConnectRecvEvents[U]>
) => boolean;

type DispatchEntry = (emit: EmitFn, message: SimConnectMessage) => boolean;

const dispatchTable: Partial<Record<RecvID, DispatchEntry>> = {
    [RecvID.ID_NULL]: () => true,
    [RecvID.ID_EXCEPTION]: (emit, { data }) => emit('exception', new RecvException(data)),
    [RecvID.ID_OPEN]: (emit, { data }) => emit('open', new RecvOpen(data)),
    [RecvID.ID_QUIT]: emit => emit('quit'),
    [RecvID.ID_EVENT]: (emit, { data }) => emit('event', new RecvEvent(data)),
    [RecvID.ID_EVENT_OBJECT_ADDREMOVE]: (emit, { data }) =>
        emit('eventAddRemove', new RecvEventAddRemove(data)),
    [RecvID.ID_EVENT_FILENAME]: (emit, { data }) =>
        emit('eventFilename', new RecvEventFilename(data)),
    [RecvID.ID_EVENT_FRAME]: (emit, { data }) => emit('eventFrame', new RecvEventFrame(data)),
    [RecvID.ID_SIMOBJECT_DATA]: (emit, { data }) =>
        emit('simObjectData', new RecvSimObjectData(data)),
    [RecvID.ID_SIMOBJECT_DATA_BYTYPE]: (emit, { data }) =>
        emit('simObjectDataByType', new RecvSimObjectData(data)),
    [RecvID.ID_WEATHER_OBSERVATION]: (emit, { data }) =>
        emit('weatherObservation', new RecvWeatherObservation(data)),
    [RecvID.ID_CLOUD_STATE]: (emit, { data }) => emit('cloudState', new RecvCloudState(data)),
    [RecvID.ID_ASSIGNED_OBJECT_ID]: (emit, { data }) =>
        emit('assignedObjectID', new RecvAssignedObjectID(data)),
    [RecvID.ID_RESERVED_KEY]: (emit, { data }) => emit('reservedKey', new RecvReservedKey(data)),
    [RecvID.ID_CUSTOM_ACTION]: (emit, { data }) => emit('customAction', new RecvCustomAction(data)),
    [RecvID.ID_SYSTEM_STATE]: (emit, { data }) => emit('systemState', new RecvSystemState(data)),
    [RecvID.ID_CLIENT_DATA]: (emit, { data }) => emit('clientData', new RecvSimObjectData(data)),
    [RecvID.ID_EVENT_WEATHER_MODE]: (emit, { data }) =>
        emit('eventWeatherMode', new RecvEventWeatherMode(data)),
    [RecvID.ID_AIRPORT_LIST]: (emit, { data }) => emit('airportList', new RecvAirportList(data)),
    [RecvID.ID_VOR_LIST]: (emit, { data }) => emit('vorList', new RecvVORList(data)),
    [RecvID.ID_NDB_LIST]: (emit, { data }) => emit('ndbList', new RecvNDBList(data)),
    [RecvID.ID_WAYPOINT_LIST]: (emit, { data }) => emit('waypointList', new RecvWaypointList(data)),
    [RecvID.ID_EVENT_MULTIPLAYER_SERVER_STARTED]: emit => emit('eventMultiplayerServerStarted'),
    [RecvID.ID_EVENT_MULTIPLAYER_CLIENT_STARTED]: emit => emit('eventMultiplayerClientStarted'),
    [RecvID.ID_EVENT_MULTIPLAYER_SESSION_ENDED]: emit => emit('eventMultiplayerSessionEnded'),
    [RecvID.ID_EVENT_RACE_END]: (emit, { data }) =>
        emit('eventRaceEnd', new RecvEventRaceEnd(data)),
    [RecvID.ID_EVENT_RACE_LAP]: (emit, { data }) =>
        emit('eventRaceLap', new RecvEventRaceLap(data)),
    [RecvID.ID_EVENT_EX1]: (emit, { data }) => emit('eventEx1', new RecvEventEx1(data)),
    [RecvID.ID_FACILITY_DATA]: (emit, { data }) => emit('facilityData', new RecvFacilityData(data)),
    [RecvID.ID_FACILITY_DATA_END]: (emit, { data }) =>
        emit('facilityDataEnd', new RecvFacilityDataEnd(data)),
    [RecvID.ID_FACILITY_MINIMAL_LIST]: (emit, { data }) =>
        emit('facilityMinimalList', new RecvFacilityMinimalList(data)),
    [RecvID.ID_JETWAY_DATA]: (emit, { data }) => emit('jetwayData', new RecvJetwayData(data)),
    [RecvID.ID_CONTROLLERS_LIST]: (emit, { data }) =>
        emit('controllersList', new RecvControllersList(data)),
    [RecvID.ID_ACTION_CALLBACK]: (emit, { data }) =>
        emit('actionCallback', new RecvActionCallback(data)),
    [RecvID.ID_ENUMERATE_INPUT_EVENTS]: (emit, { data }) =>
        emit('inputEventsList', new RecvEnumerateInputEvents(data)),
    [RecvID.ID_GET_INPUT_EVENT]: (emit, { data }) =>
        emit('getInputEvent', new RecvGetInputEvent(data)),
    [RecvID.ID_SUBSCRIBE_INPUT_EVENT]: (emit, { data }) =>
        emit('subscribeInputEvent', new RecvSubscribeInputEvent(data)),
    [RecvID.ID_ENUMERATE_INPUT_EVENT_PARAMS]: (emit, { data }) =>
        emit('enumerateInputEventParams', new RecvEnumerateInputEventParams(data)),
    [RecvID.ID_ENUMERATE_SIMOBJECT_AND_LIVERY_LIST]: (emit, { data }) =>
        emit('enumerateSimobjectAndLiveryList', new RecvEnumerateSimobjectAndLiveryList(data)),
    [RecvID.ID_FLOW_EVENT]: (emit, { data }) => emit('flowEvent', new RecvFlowEvent(data)),
};

export const HANDLED_RECV_IDS = Object.freeze(
    Object.keys(dispatchTable).map(key => Number(key) as RecvID)
);

export class SimConnectMessageDispatcher {
    constructor(private readonly emit: EmitFn) {}

    dispatch(message: SimConnectMessage): boolean {
        const dispatch = dispatchTable[message.packetTypeId];
        if (!dispatch) {
            logger('Unknown packet type id %d', message.packetTypeId, message.data);
            return false;
        }

        return dispatch(this.emit, message);
    }
}
