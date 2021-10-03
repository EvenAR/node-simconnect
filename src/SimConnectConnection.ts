import { EventEmitter } from 'events';
import { SimConnectDataType } from './enums/SimConnectDataType';
import { SimConnectPeriod } from './enums/SimConnectPeriod';
import { SimObjectType } from './enums/SimObjectType';
import { SimConnectConstants } from './SimConnectConstants';
import DataWrapper from './wrappers/DataWrapper';
import { discoverServer, SimConnectServerAddress } from './Utils';
import SimConnectData from './types/SimConnectData';
import { NotificationPriority } from './enums/NotificationPriority';
import { InitPosition } from './types';
import { TextType } from './enums/TextType';
import { FacilityListType } from './enums/FacilityListType';
import { ClientDataPeriod } from './enums/ClientDataPeriod';
import {
    RecvID,
    SimConnectMessage,
    SimConnectSocket,
} from './SimConnectSocket';
import {
    RecvAirportList,
    RecvAssignedObjectID,
    RecvCloudState,
    RecvCustomAction,
    RecvEvent,
    RecvEventAddRemove,
    RecvEventFilename,
    RecvEventFrame,
    RecvEventRaceEnd,
    RecvEventRaceLap,
    RecvEventWeatherMode,
    RecvException,
    RecvNDBList,
    RecvOpen,
    RecvReservedKey,
    RecvSimObjectData,
    RecvSystemState,
    RecvVORList,
    RecvWaypointList,
    RecvWeatherObservation,
} from './recv';
import { ErrorMessage } from './texts';
import { Protocol } from './enums/Protocol';
import ConnectionOptions from './types/ConnectionOptions';

const RECEIVE_SIZE = 65536;

enum SimConnectBuild {
    SP0 = 60905,
    SP1 = 61355,
    SP2_XPACK = 61259,
}

type DataToSet =
    | { buffer: DataWrapper; arrayCount: number; tagged: boolean }
    | SimConnectData[];

interface SimConnectEvents {
    open: (recvOpen: RecvOpen) => void;
    close: () => void;
    error: (error: Error) => void;
    quit: () => void;
    exception: (recvException: RecvException) => void;
    event: (recvEvent: RecvEvent) => void;
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
    weatherObservation: (
        recvWeatherObservation: RecvWeatherObservation
    ) => void;
    cloudState: (recvCloudState: RecvCloudState) => void;
    eventMultiplayerServerStarted: () => void;
    eventMultiplayerClientStarted: () => void;
    eventMultiplayerSessionEnded: () => void;
    eventRaceEnd: (recvEventRaceEnd: RecvEventRaceEnd) => void;
    eventRaceLap: (recvEventRaceLap: RecvEventRaceLap) => void;
}

declare interface SimConnectConnection extends EventEmitter {
    on<U extends keyof SimConnectEvents>(
        event: U,
        listener: SimConnectEvents[U]
    ): this;

    emit<U extends keyof SimConnectEvents>(
        event: U,
        ...args: Parameters<SimConnectEvents[U]>
    ): boolean;
}

class SimConnectConnection extends EventEmitter {
    appName: string;
    writeBuffer: DataWrapper;
    ourProtocol: number;
    packetsSent: number;
    bytesSent: number;
    currentIndex: number;
    clientSocket: SimConnectSocket;

    constructor(appName: string, protocolVersion: Protocol) {
        super();
        this.appName = appName;
        this.packetsSent = 0;
        this.bytesSent = 0;
        this.currentIndex = 0;
        this.ourProtocol = protocolVersion;
        this.writeBuffer = new DataWrapper(RECEIVE_SIZE);

        this.clientSocket = new SimConnectSocket();

        this.clientSocket.on('connect', this._open.bind(this));
        this.clientSocket.on('data', this._handleMessage.bind(this));
        this.clientSocket.on('close', () => this.emit('close'));
        this.clientSocket.on('error', (connectError: Error) =>
            this.emit('error', connectError)
        );
    }

    _connect(options?: ConnectionOptions) {
        if (options?.remote) {
            this.clientSocket.connect({ type: 'ipv4', ...options.remote });
        } else {
            discoverServer()
                .then((address: SimConnectServerAddress) => {
                    this.clientSocket.connect(address);
                })
                .catch((connectError) => {
                    this.emit('error', connectError);
                });
        }
    }

    private _handleMessage({ id, data }: SimConnectMessage) {
        switch (id) {
            case RecvID.ID_NULL:
                break;
            case RecvID.ID_EXCEPTION:
                this.emit('exception', new RecvException(data));
                break;
            case RecvID.ID_OPEN:
                this.emit('open', new RecvOpen(data));
                break;
            case RecvID.ID_QUIT:
                this.emit('quit');
                break;
            case RecvID.ID_EVENT:
                this.emit('event', new RecvEvent(data));
                break;
            case RecvID.ID_EVENT_OBJECT_ADDREMOVE:
                this.emit('eventAddRemove', new RecvEventAddRemove(data));
                break;
            case RecvID.ID_EVENT_FILENAME:
                this.emit('eventFilename', new RecvEventFilename(data));
                break;
            case RecvID.ID_EVENT_FRAME:
                this.emit('eventFrame', new RecvEventFrame(data));
                break;
            case RecvID.ID_SIMOBJECT_DATA:
                this.emit('simObjectData', new RecvSimObjectData(data));
                break;
            case RecvID.ID_SIMOBJECT_DATA_BYTYPE:
                this.emit('simObjectDataByType', new RecvSimObjectData(data));
                break;
            case RecvID.ID_WEATHER_OBSERVATION:
                this.emit(
                    'weatherObservation',
                    new RecvWeatherObservation(data)
                );
                break;
            case RecvID.ID_CLOUD_STATE:
                this.emit('cloudState', new RecvCloudState(data));
                break;
            case RecvID.ID_ASSIGNED_OBJECT_ID:
                this.emit('assignedObjectID', new RecvAssignedObjectID(data));
                break;
            case RecvID.ID_RESERVED_KEY:
                this.emit('reservedKey', new RecvReservedKey(data));
                break;
            case RecvID.ID_CUSTOM_ACTION:
                this.emit('customAction', new RecvCustomAction(data));
                break;
            case RecvID.ID_SYSTEM_STATE:
                this.emit('systemState', new RecvSystemState(data));
                break;
            case RecvID.ID_CLIENT_DATA:
                this.emit('clientData', new RecvSimObjectData(data));
                break;
            case RecvID.ID_EVENT_WEATHER_MODE:
                this.emit('eventWeatherMode', new RecvEventWeatherMode(data));
                break;
            case RecvID.ID_AIRPORT_LIST:
                this.emit('airportList', new RecvAirportList(data));
                break;
            case RecvID.ID_VOR_LIST:
                this.emit('vorList', new RecvVORList(data));
                break;
            case RecvID.ID_NDB_LIST:
                this.emit('ndbList', new RecvNDBList(data));
                break;
            case RecvID.ID_WAYPOINT_LIST:
                this.emit('waypointList', new RecvWaypointList(data));
                break;
            case RecvID.ID_EVENT_MULTIPLAYER_SERVER_STARTED:
                this.emit('eventMultiplayerServerStarted');
                break;
            case RecvID.ID_EVENT_MULTIPLAYER_CLIENT_STARTED:
                this.emit('eventMultiplayerClientStarted');
                break;
            case RecvID.ID_EVENT_MULTIPLAYER_SESSION_ENDED:
                this.emit('eventMultiplayerSessionEnded');
                break;
            case RecvID.ID_EVENT_RACE_END:
                this.emit('eventRaceEnd', new RecvEventRaceEnd(data));
                break;
            case RecvID.ID_EVENT_RACE_LAP:
                this.emit('eventRaceLap', new RecvEventRaceLap(data));
                break;
            default:
                console.log('UNK', data);
                break;
        }
    }

    clean(buffer: DataWrapper) {
        buffer.clear();
        buffer.setOffset(16);
    }

    sendPacket(type: number) {
        // finalize packet
        const packetSize = this.writeBuffer.getOffset();
        this.writeBuffer.writeInt(packetSize, 0); // size
        this.writeBuffer.writeInt(this.ourProtocol, 4);
        this.writeBuffer.writeInt(0xf0000000 | type, 8);
        this.writeBuffer.writeInt(this.currentIndex++, 12);
        const data = this.writeBuffer.getBuffer();
        this.clientSocket.write(data);
        this.packetsSent++;
        this.bytesSent += packetSize;
        //console.log("Sent " + ok + ": " + this.writeBuffer.buffer)
    }

    //////////////////////////////////////

    private _open() {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString256(this.appName);
        this.writeBuffer.writeInt(0);
        this.writeBuffer.writeByte(0x00);
        this.writeBuffer.writeByte(0x58); // X
        this.writeBuffer.writeByte(0x53); // S
        this.writeBuffer.writeByte(0x46); // F
        if (this.ourProtocol == 2) {
            this.writeBuffer.writeInt(0); // major version
            this.writeBuffer.writeInt(0); // minor version
            this.writeBuffer.writeInt(SimConnectBuild.SP0); // major build
            this.writeBuffer.writeInt(0); // minor build
        } else if (this.ourProtocol == 3) {
            this.writeBuffer.writeInt(10); // major version
            this.writeBuffer.writeInt(0); // minor version
            this.writeBuffer.writeInt(SimConnectBuild.SP1); // major build
            this.writeBuffer.writeInt(0); // minor build
        } else if (this.ourProtocol == 4) {
            this.writeBuffer.writeInt(10); // major version
            this.writeBuffer.writeInt(0); // minor version
            this.writeBuffer.writeInt(SimConnectBuild.SP2_XPACK); // major build
            this.writeBuffer.writeInt(0); // minor build
        } else {
            throw ErrorMessage['SimConnect.InvalidProtocol']; //$NON-NLS-1$
        }
        this.sendPacket(0x01);
    }

    addToDataDefinition(
        dataDefId: number,
        datumName: string,
        unitsName: string | null,
        dataType?: SimConnectDataType,
        epsilon?: number,
        datumId?: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataDefId);
        this.writeBuffer.writeString256(datumName);
        this.writeBuffer.writeString256(unitsName);
        this.writeBuffer.writeInt(dataType || SimConnectDataType.FLOAT64);
        this.writeBuffer.writeFloat(epsilon || 0);
        this.writeBuffer.writeInt(datumId || SimConnectConstants.UNUSED);
        this.sendPacket(0x0c);
    }

    requestDataOnSimObject(
        dataRequestId: number,
        dataDefinitionId: number,
        objectId: number,
        period: SimConnectPeriod,
        flags?: number,
        origin?: number,
        interval?: number,
        limit?: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeInt(dataDefinitionId);
        this.writeBuffer.writeInt(objectId);
        this.writeBuffer.writeInt(period);
        this.writeBuffer.writeInt(flags || 0);
        this.writeBuffer.writeInt(origin || 0);
        this.writeBuffer.writeInt(interval || 0);
        this.writeBuffer.writeInt(limit || 0);
        this.sendPacket(0x0e);
    }

    clearDataDefinition(dataDefinitionId: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataDefinitionId);
        this.sendPacket(0x0d);
    }

    requestDataOnSimObjectType(
        dataRequestId: number,
        dataDefinitionId: number,
        radiusMeters: number,
        type: SimObjectType
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeInt(dataDefinitionId);
        this.writeBuffer.writeInt(radiusMeters);
        this.writeBuffer.writeInt(type);
        this.sendPacket(0x0f);
    }

    subscribeToSystemEvent(clientEventID: number, eventName: string) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(clientEventID);
        this.writeBuffer.writeString256(eventName);
        this.sendPacket(0x17);
    }

    unsubscribeFromSystemEvent(clientEventID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(clientEventID);
        this.sendPacket(0x18);
    }

    requestSystemState(dataRequestID: number, state: string) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.writeBuffer.writeString256(state);
        this.sendPacket(0x35);
    }

    setSystemState(
        state: string,
        paramInt: number,
        paramFloat: number,
        paramString: string
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString256(state);
        this.writeBuffer.writeInt(paramInt);
        this.writeBuffer.writeFloat(paramFloat);
        this.writeBuffer.writeString256(paramString);
        this.writeBuffer.writeInt(0);
        this.sendPacket(0x36);
    }

    addClientEventToNotificationGroup(
        notificationGroupID: number,
        clientEventID: number,
        maskable: boolean
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(notificationGroupID);
        this.writeBuffer.writeInt(clientEventID);
        this.writeBuffer.writeInt(maskable ? 1 : 0);
        this.sendPacket(0x07);
    }

    mapClientEventToSimEvent(clientEventId: number, eventName?: string) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(clientEventId);
        this.writeBuffer.writeString256(eventName || '');
        this.sendPacket(0x04);
    }

    transmitClientEvent(
        objectID: number,
        eventID: number,
        data: number,
        groupID: number,
        flags: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(objectID);
        this.writeBuffer.writeInt(eventID);
        this.writeBuffer.writeInt(data);
        this.writeBuffer.writeInt(groupID);
        this.writeBuffer.writeInt(flags);
        this.sendPacket(0x05);
    }

    setSystemEventState(eventID: number, state: boolean) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(eventID);
        this.writeBuffer.writeInt(state ? 1 : 0);
        this.sendPacket(0x06);
    }

    removeClientEvent(groupID: number, eventID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(eventID);
        this.writeBuffer.writeInt(eventID);
        this.sendPacket(0x08);
    }

    setNotificationGroupPriority(
        groupID: number,
        priority: NotificationPriority
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(groupID);
        this.writeBuffer.writeInt(priority);
        this.sendPacket(0x09);
    }

    clearNotificationGroup(groupID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(groupID);
        this.sendPacket(0x0a);
    }

    requestNotificationGroup(groupID: number, reserved: number, flags: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(groupID);
        this.writeBuffer.writeInt(reserved);
        this.writeBuffer.writeInt(flags);
        this.sendPacket(0x0b);
    }

    setDataOnSimObject(
        dataDefinitionID: number,
        objectID: number,
        data: DataToSet
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataDefinitionID);
        this.writeBuffer.writeInt(objectID);

        if (data instanceof Array) {
            this.writeBuffer.writeInt(
                SimConnectConstants.DATA_SET_FLAG_DEFAULT
            );
            this.writeBuffer.writeInt(data.length);
            this.writeBuffer.writeInt(0); // size
            data.forEach((simConnectData) => {
                simConnectData.write(this.writeBuffer);
            });
            this.writeBuffer.writeInt(this.writeBuffer.getOffset() - 36, 32);
        } else {
            let { tagged, arrayCount, buffer } = data;
            this.writeBuffer.writeInt(
                tagged
                    ? SimConnectConstants.DATA_SET_FLAG_TAGGED
                    : SimConnectConstants.DATA_SET_FLAG_DEFAULT
            );
            if (arrayCount == 0) arrayCount = 1;
            this.writeBuffer.writeInt(arrayCount);
            const bytes = buffer.getBuffer();
            this.writeBuffer.writeInt(bytes.length);
            this.writeBuffer.write(bytes);
        }

        this.sendPacket(0x10);
    }

    mapInputEventToClientEvent(
        inputGroupID: number,
        inputDefinition: string,
        clientEventDownID: number,
        downValue?: number,
        clientEventUpID?: number,
        upValue?: number,
        maskable?: boolean
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(inputGroupID);
        this.writeBuffer.writeString256(inputDefinition);
        this.writeBuffer.writeInt(clientEventDownID);
        this.writeBuffer.writeInt(downValue || 0);
        this.writeBuffer.writeInt(
            clientEventUpID || SimConnectConstants.UNUSED
        );
        this.writeBuffer.writeInt(upValue || 0);
        this.writeBuffer.writeInt(maskable ? 1 : 0);
        this.sendPacket(0x11);
    }

    setInputGroupPriority(
        inputGroupID: number,
        priority: NotificationPriority
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(inputGroupID);
        this.writeBuffer.writeInt(priority);
        this.sendPacket(0x12);
    }

    removeInputEvent(inputGroupID: number, inputDefinition: string) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(inputGroupID);
        this.writeBuffer.writeString256(inputDefinition);
        this.sendPacket(0x13);
    }

    clearInputGroup(inputGroupID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(inputGroupID);
        this.sendPacket(0x14);
    }

    setInputGroupState(inputGroupID: number, state: boolean) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(inputGroupID);
        this.writeBuffer.writeInt(state ? 1 : 0);
        this.sendPacket(0x15);
    }

    requestReservedKey(
        eventID: number,
        keyChoice1?: string,
        keyChoice2?: string,
        keyChoice3?: string
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(eventID);
        this.writeBuffer.writeString30(keyChoice1 || '');
        this.writeBuffer.writeString30(keyChoice2 || '');
        this.writeBuffer.writeString30(keyChoice3 || '');
        this.sendPacket(0x16);
    }

    weatherRequestInterpolatedObservation(
        dataRequestID: number,
        lat: number,
        lon: number,
        alt: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.writeBuffer.writeFloat(lat);
        this.writeBuffer.writeFloat(lon);
        this.writeBuffer.writeFloat(alt);
        this.sendPacket(0x19);
    }

    weatherRequestObservationAtStation(dataRequestID: number, ICAO: string) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.writeBuffer.writeString(ICAO, 5); // ICAO is 4 chars, null terminated
        this.sendPacket(0x1a);
    }

    weatherRequestObservationAtNearestStation(
        dataRequestID: number,
        lat: number,
        lon: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.writeBuffer.writeFloat(lat);
        this.writeBuffer.writeFloat(lon);
        this.sendPacket(0x1b);
    }

    weatherCreateStation(
        dataRequestID: number,
        ICAO: string,
        name: string,
        lat: number,
        lon: number,
        alt: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.writeBuffer.writeString(ICAO, 5);
        this.writeBuffer.writeString(name, 256);
        this.writeBuffer.writeFloat(lat);
        this.writeBuffer.writeFloat(lon);
        this.writeBuffer.writeFloat(alt);
        this.sendPacket(0x1c);
    }

    weatherRemoveStation(dataRequestID: number, ICAO: string) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.writeBuffer.writeString(ICAO, 5);
        this.sendPacket(0x1d);
    }

    weatherSetObservation(seconds: number, metar: string) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(seconds);
        this.writeBuffer.writeString(metar);
        this.writeBuffer.writeByte(0); // null terminated
        this.sendPacket(0x1e);
    }

    weatherSetModeServer(port: number, seconds: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(port);
        this.writeBuffer.writeInt(seconds);
        this.sendPacket(0x1f);
    }

    weatherSetModeTheme(themeName: string) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(themeName, 256);
        this.sendPacket(0x20);
    }

    weatherSetModeGlobal() {
        this.clean(this.writeBuffer);
        this.sendPacket(0x21);
    }

    weatherSetModeCustom() {
        this.clean(this.writeBuffer);
        this.sendPacket(0x22);
    }

    weatherSetDynamicUpdateRate(rate: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(rate);
        this.sendPacket(0x23);
    }

    weatherRequestCloudState(
        dataRequestID: number,
        minLat: number,
        minLon: number,
        minAlt: number,
        maxLat: number,
        maxLon: number,
        maxAlt: number,
        flags?: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.writeBuffer.writeFloat(minLat);
        this.writeBuffer.writeFloat(minLon);
        this.writeBuffer.writeFloat(minAlt);
        this.writeBuffer.writeFloat(maxLat);
        this.writeBuffer.writeFloat(maxLon);
        this.writeBuffer.writeFloat(maxAlt);
        this.writeBuffer.writeInt(flags || 0);
        this.sendPacket(0x24);
    }

    weatherCreateThermal(
        dataRequestID: number,
        lat: number,
        lon: number,
        alt: number,
        radius: number,
        height: number,
        coreRate: number,
        coreTurbulence: number,
        sinkRate: number,
        sinkTurbulence: number,
        coreSize: number,
        coreTransitionSize: number,
        sinkLayerSize: number,
        sinkTransitionSize: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.writeBuffer.writeFloat(lat);
        this.writeBuffer.writeFloat(lon);
        this.writeBuffer.writeFloat(alt);
        this.writeBuffer.writeFloat(radius);
        this.writeBuffer.writeFloat(height);
        this.writeBuffer.writeFloat(coreRate);
        this.writeBuffer.writeFloat(coreTurbulence);
        this.writeBuffer.writeFloat(sinkRate);
        this.writeBuffer.writeFloat(sinkTurbulence);
        this.writeBuffer.writeFloat(coreSize);
        this.writeBuffer.writeFloat(coreTransitionSize);
        this.writeBuffer.writeFloat(sinkLayerSize);
        this.writeBuffer.writeFloat(sinkTransitionSize);
        this.sendPacket(0x25);
    }

    weatherRemoveThermal(objectID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(objectID);
        this.sendPacket(0x26);
    }

    aICreateParkedATCAircraft(
        containerTitle: string,
        tailNumber: string,
        airportID: string,
        dataRequestID: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(containerTitle, 256);
        this.writeBuffer.writeString(tailNumber, 12);
        this.writeBuffer.writeString(airportID, 5);
        this.writeBuffer.writeInt(dataRequestID);
        this.sendPacket(0x27);
    }

    aICreateEnrouteATCAircraft(
        containerTitle: string,
        tailNumber: string,
        flightNumber: number,
        flightPlanPath: string,
        flightPlanPosition: number,
        touchAndGo: boolean,
        dataRequestID: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(containerTitle, 256);
        this.writeBuffer.writeString(tailNumber, 12);
        this.writeBuffer.writeInt(flightNumber);
        this.writeBuffer.writeString(flightPlanPath, 260);
        this.writeBuffer.writeDouble(flightPlanPosition);
        this.writeBuffer.writeInt(touchAndGo ? 1 : 0);
        this.writeBuffer.writeInt(dataRequestID);
        this.sendPacket(0x28);
    }

    aICreateNonATCAircraft(
        containerTitle: string,
        tailNumber: string,
        initPos: InitPosition,
        dataRequestID: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(containerTitle, 256);
        this.writeBuffer.writeString(tailNumber, 12);
        initPos.write(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.sendPacket(0x29);
    }

    aICreateSimulatedObject(
        containerTitle: string,
        initPos: InitPosition,
        dataRequestID: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(containerTitle, 256);
        initPos.write(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestID);
        this.sendPacket(0x2a);
    }

    aIReleaseControl(objectID: number, dataRequestID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(objectID);
        this.writeBuffer.writeInt(dataRequestID);
        this.sendPacket(0x2b);
    }

    aIRemoveObject(objectID: number, dataRequestID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(objectID);
        this.writeBuffer.writeInt(dataRequestID);
        this.sendPacket(0x2c);
    }

    aISetAircraftFlightPlan(
        objectID: number,
        flightPlanPath: string,
        dataRequestID: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(objectID);
        this.writeBuffer.writeString(flightPlanPath, 260);
        this.writeBuffer.writeInt(dataRequestID);
        this.sendPacket(0x2d);
    }

    executeMissionAction(guidInstanceId: Buffer) {
        if (guidInstanceId.length != 16)
            throw ErrorMessage['SimConnect.GUID_invalid_size'];
        this.clean(this.writeBuffer);
        this.writeBuffer.write(guidInstanceId);
        this.sendPacket(0x2e);
    }

    completeCustomMissionAction(guidInstanceId: Buffer) {
        if (guidInstanceId.length != 16)
            throw ErrorMessage['SimConnect.GUID_invalid_size']; //$NON-NLS-1$
        this.clean(this.writeBuffer);
        this.writeBuffer.write(guidInstanceId);
        this.sendPacket(0x2f);
    }

    requestResponseTimes(nCount: number) {
        // TODO: implement simconnect function
        // this one needs special care: it send a packet (id 0x03, one param : nCount)
        // and receive 8 float data (with response id 0x00010001) . Some calculations
        // has to be done
        throw ErrorMessage['SimConnect.Unimplemented'];
    }

    cameraSetRelative6DOF(
        deltaX: number,
        deltaY: number,
        deltaZ: number,
        pitchDeg: number,
        bankDeg: number,
        headingDeg: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeFloat(deltaX);
        this.writeBuffer.writeFloat(deltaY);
        this.writeBuffer.writeFloat(deltaZ);
        this.writeBuffer.writeFloat(pitchDeg);
        this.writeBuffer.writeFloat(bankDeg);
        this.writeBuffer.writeFloat(headingDeg);
        this.sendPacket(0x30);
    }

    menuAddItem(menuItem: string, clientMenuEventID: number, data: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(menuItem, 256);
        this.writeBuffer.writeInt(clientMenuEventID);
        this.writeBuffer.writeInt(data);
        this.sendPacket(0x31);
    }

    menuDeleteItem(clientMenuEventID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(clientMenuEventID);
        this.sendPacket(0x32);
    }

    menuAddSubItem(
        clientMenuEventID: number,
        menuItem: string,
        clientSubMenuEventID: number,
        data: number
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(clientMenuEventID);
        this.writeBuffer.writeString(menuItem, 256);
        this.writeBuffer.writeInt(clientSubMenuEventID);
        this.writeBuffer.writeInt(data);
        this.sendPacket(0x33);
    }

    menuDeleteSubItem(clientMenuEventID: number, clientSubMenuEventID: number) {
        // packet size 0x18
        // packet id 0x34

        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(clientMenuEventID);
        this.writeBuffer.writeInt(clientSubMenuEventID);
        this.sendPacket(0x34);
    }

    mapClientDataNameToID(clientDataName: string, clientDataID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(clientDataName, 256);
        this.writeBuffer.writeInt(clientDataID);
        this.sendPacket(0x37);
    }

    createClientData(clientDataID: number, size: number, readOnly: boolean) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(clientDataID);
        this.writeBuffer.writeInt(size);
        this.writeBuffer.writeInt(readOnly ? 1 : 0);
        this.sendPacket(0x38);
    }

    addToClientDataDefinition(
        dataDefineID: number,
        offset: number,
        sizeOrType: number,
        epsilon?: number,
        datumId?: number
    ) {
        if (this.ourProtocol < Protocol.FSX_SP1)
            throw ErrorMessage['SimConnect.badversion']; //$NON-NLS-1$

        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataDefineID);
        this.writeBuffer.writeInt(offset);
        this.writeBuffer.writeInt(sizeOrType);
        this.writeBuffer.writeFloat(epsilon || 0);
        this.writeBuffer.writeInt(datumId || 0);
        this.sendPacket(0x39);
    }

    clearClientDataDefinition(dataDefineID: number) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(dataDefineID);
        this.sendPacket(0x3a);
    }

    requestClientData(
        clientDataID: number,
        dataRequestID: number,
        clientDataDefineID: number,
        period: ClientDataPeriod,
        flags: number,
        origin?: number,
        interval?: number,
        limit?: number
    ) {
        if (this.ourProtocol < Protocol.FSX_SP1)
            throw ErrorMessage['SimConnect.badversion']; //$NON-NLS-1$

        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(clientDataID);
        this.writeBuffer.writeInt(dataRequestID);
        this.writeBuffer.writeInt(clientDataDefineID);
        this.writeBuffer.writeInt(period);
        this.writeBuffer.writeInt(flags);
        this.writeBuffer.writeInt(origin || 0);
        this.writeBuffer.writeInt(interval || 0);
        this.writeBuffer.writeInt(limit || 0);
        this.sendPacket(0x3b);
    }

    setClientData(
        clientDataID: number,
        clientDataDefineID: number,
        reserved: number,
        arrayCount: number,
        unitSize: number,
        data: Buffer
    ) {
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(clientDataID);
        this.writeBuffer.writeInt(clientDataDefineID);
        this.writeBuffer.writeInt(0); // do not use arg
        this.writeBuffer.writeInt(1); // do not use arg
        // TODO: add support for arrays https://github.com/mharj/jsimconnect/blob/master/src/flightsim/simconnect/SimConnect.java#L3803
        this.writeBuffer.writeInt(unitSize);
        this.writeBuffer.write(data);
        this.sendPacket(0x3c);
    }

    flightLoad(fileName: string) {
        // packet size 0x114
        // packet id 0x3D

        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(fileName, SimConnectConstants.MAX_PATH);
        this.sendPacket(0x3d);
    }

    flightSave(
        fileName: string,
        title: string | null,
        description: string,
        flags?: number
    ) {
        // packet size 0x918 (SP1), 0xA1C (SP2)
        // packet id 0x3E
        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(fileName, SimConnectConstants.MAX_PATH);

        if (this.ourProtocol >= Protocol.FSX_SP2) {
            if (title == null) title = fileName;
            this.writeBuffer.writeString(title, SimConnectConstants.MAX_PATH);
        }

        this.writeBuffer.writeString(description, 2048);
        this.writeBuffer.writeInt(SimConnectConstants.UNUSED);
        this.sendPacket(0x3e);
    }

    flightPlanLoad(fileName: string) {
        // packet size 0x114
        // packet id 0x3F

        this.clean(this.writeBuffer);
        this.writeBuffer.writeString(fileName, SimConnectConstants.MAX_PATH);
        this.sendPacket(0x3f);
    }

    text(
        type: TextType,
        timeSeconds: number,
        eventId: number,
        message: string
    ) {
        if (this.ourProtocol < Protocol.FSX_SP1)
            throw ErrorMessage['SimConnect.badversion']; //$NON-NLS-1$

        // packet id 0x40
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(type);
        this.writeBuffer.writeFloat(timeSeconds);
        this.writeBuffer.writeInt(eventId);
        if (message != null && message.length > 0) {
            this.writeBuffer.writeInt(message.length + 1);
            this.writeBuffer.writeString(message);
        } else {
            this.writeBuffer.writeInt(1);
        }
        this.writeBuffer.writeByte(0);
        this.sendPacket(0x40);
    }

    menu(
        timeSeconds: number,
        eventId: number,
        title?: string,
        prompt?: string,
        ...items: string[]
    ) {
        if (this.ourProtocol < Protocol.FSX_SP1)
            throw ErrorMessage['SimConnect.badversion']; //$NON-NLS-1$

        // packet id 0x40

        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(TextType.MENU);
        this.writeBuffer.writeFloat(timeSeconds);
        this.writeBuffer.writeInt(eventId);
        this.writeBuffer.writeInt(0); // size, will be set later
        if (!title && !prompt && items.length == 0) {
            this.writeBuffer.writeByte(0);
        } else if (title && prompt) {
            this.writeBuffer.writeString(title);
            this.writeBuffer.writeByte(0);
            this.writeBuffer.writeString(prompt);
            this.writeBuffer.writeByte(0);
            items.forEach((s) => {
                this.writeBuffer.writeString(s);
                this.writeBuffer.writeByte(0);
            });
        }
        // set size
        this.writeBuffer.writeInt(this.writeBuffer.getOffset() - 32, 28);

        this.sendPacket(0x40);
    }

    requestFacilitiesList(type: FacilityListType, eventId: number) {
        if (this.ourProtocol < Protocol.FSX_SP1)
            throw ErrorMessage['SimConnect.badversion']; //$NON-NLS-1$
        // ID 0x43
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(type);
        this.writeBuffer.writeInt(eventId);
        this.sendPacket(0x43);
    }

    subscribeToFacilities(type: FacilityListType, eventId: number) {
        if (this.ourProtocol < Protocol.FSX_SP1)
            throw ErrorMessage['SimConnect.badversion']; //$NON-NLS-1$

        // ID 0x41
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(type);
        this.writeBuffer.writeInt(eventId);
        this.sendPacket(0x41);
    }

    unSubscribeToFacilities(type: FacilityListType) {
        if (this.ourProtocol < Protocol.FSX_SP1)
            throw ErrorMessage['SimConnect.badversion']; //$NON-NLS-1$

        // ID 0x42
        this.clean(this.writeBuffer);
        this.writeBuffer.writeInt(type);
        this.sendPacket(0x42);
    }

    close() {
        this.clientSocket.close();
    }

    /////

    getLastSentPacketID() {
        return this.currentIndex - 1;
    }
}

export { SimConnectConnection };
module.exports = { SimConnectConnection };
