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
} from './recv';

export interface SimConnectRecvEvents {
    open: (recvOpen: RecvOpen) => void;
    close: () => void;
    error: (error: Error) => void;
    quit: () => void;
    exception: (recvException: RecvException) => void;
    event: (recvEvent: RecvEvent) => void;
    eventEx1: (recvEvent: RecvEventEx1) => void;
    airportList: (recvAirportList: RecvAirportList) => void;
    vorList: (recvVORList: RecvVORList) => void;
    ndbList: (recvNDBList: RecvNDBList) => void;
    waypointList: (recvWaypointList: RecvWaypointList) => void;
    reservedKey: (recvReservedKey: RecvReservedKey) => void;
    customAction: (recvCustomAction: RecvCustomAction) => void;
    clientData: (recvSimObjectData: RecvSimObjectData) => void;
    eventWeatherMode: (recvWeatherMode: RecvEventWeatherMode) => void;
    assignedObjectID: (recvAssignedObjectID: RecvAssignedObjectID) => void;
    eventFilename: (recvEventFilename: RecvEventFilename) => void;
    eventFrame: (recvEventFrame: RecvEventFrame) => void;
    eventAddRemove: (recvEvent: RecvEventAddRemove) => void;
    simObjectData: (recvSimObjectData: RecvSimObjectData) => void;
    simObjectDataByType: (recvSimObjectData: RecvSimObjectData) => void;
    systemState: (recvSystemState: RecvSystemState) => void;
    weatherObservation: (recvWeatherObservation: RecvWeatherObservation) => void;
    cloudState: (recvCloudState: RecvCloudState) => void;
    eventMultiplayerServerStarted: () => void;
    eventMultiplayerClientStarted: () => void;
    eventMultiplayerSessionEnded: () => void;
    eventRaceEnd: (recvEventRaceEnd: RecvEventRaceEnd) => void;
    eventRaceLap: (recvEventRaceLap: RecvEventRaceLap) => void;
    facilityData: (recvFacilityData: RecvFacilityData) => void;
    facilityDataEnd: (recvFacilityDataEnd: RecvFacilityDataEnd) => void;
    facilityMinimalList: (recvFacilityMinimalList: RecvFacilityMinimalList) => void;
    jetwayData: (recvJetwayData: RecvJetwayData) => void;
    actionCallback: (recvActionCallback: RecvActionCallback) => void;
    controllersList: (recvControllersList: RecvControllersList) => void;
    inputEventsList: (recvEnumerateInputEvents: RecvEnumerateInputEvents) => void;
    getInputEvent: (recvGetInputEvent: RecvGetInputEvent) => void;
    subscribeInputEvent: (recvSubscribeInputEvent: RecvSubscribeInputEvent) => void;
    enumerateInputEventParams: (
        recvEnumerateInputEventParams: RecvEnumerateInputEventParams
    ) => void;
    enumerateSimobjectAndLiveryList: (
        recvEnumerateSimobjectAndLiveryList: RecvEnumerateSimobjectAndLiveryList
    ) => void;
    flowEvent: (recvFlowEvent: RecvFlowEvent) => void;
}
