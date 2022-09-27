import { EventEmitter } from 'events';
import { SimConnectDataType } from './enums/SimConnectDataType';
import { SimConnectPeriod } from './enums/SimConnectPeriod';
import { SimObjectType } from './enums/SimObjectType';
import { RawBuffer } from './RawBuffer';
import { discoverServer, SimConnectServerAddress } from './Utils';
import { NotificationPriority } from './enums/NotificationPriority';
import { InitPosition, SimConnectData } from './dto';
import { TextType } from './enums/TextType';
import { FacilityListType } from './enums/FacilityListType';
import { ClientDataPeriod } from './enums/ClientDataPeriod';
import { Protocol } from './enums/Protocol';

import { RecvID, SimConnectMessage, SimConnectSocket } from './SimConnectSocket';
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
import { DataRequestFlag } from './flags/DataRequestFlag';
import { EventFlag } from './flags/EventFlag';
import { DataSetFlag } from './flags/DataSetFlag';
import { ClientDataRequestFlag } from './flags/ClientDataRequestFlag';
import { SimConnectConstants } from './SimConnectConstants';
import {
    ClientDataDefinitionId,
    ClientDataId,
    ClientEventId,
    DataDefinitionId,
    DataRequestId,
    InputGroupId,
    NotificationGroupId,
    ObjectId,
} from './Types';

const RECEIVE_SIZE = 65536;

enum SimConnectBuild {
    SP0 = 60905,
    SP1 = 61355,
    SP2_XPACK = 61259,
}

interface SimConnectRecvEvents {
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
    weatherObservation: (recvWeatherObservation: RecvWeatherObservation) => void;
    cloudState: (recvCloudState: RecvCloudState) => void;
    eventMultiplayerServerStarted: () => void;
    eventMultiplayerClientStarted: () => void;
    eventMultiplayerSessionEnded: () => void;
    eventRaceEnd: (recvEventRaceEnd: RecvEventRaceEnd) => void;
    eventRaceLap: (recvEventRaceLap: RecvEventRaceLap) => void;
}

interface ConnectionOptions {
    remote: { host: string; port: number };
}

enum SimConnectError {
    UnknownHost = 'Unknown host',
    GuidInvalidSize = 'GUID is not 16 bytes long',
    Unimplemented = 'Not yet implemented',
    VersionMismatch = 'Invalid version2',
    PacketTooLarge = 'Packet too large',
    InvalidRead = 'Invalid read',
    InvalidProtocol = 'Invalid protocol version',
    BadVersion = 'Unsupported protocol version',
}

class SimConnectConnection extends EventEmitter {
    appName: string;

    writeBuffer: RawBuffer;

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
        this.writeBuffer = new RawBuffer(RECEIVE_SIZE);

        this.clientSocket = new SimConnectSocket();

        this.clientSocket.on('connect', this._open.bind(this));
        this.clientSocket.on('data', this._handleMessage.bind(this));
        this.clientSocket.on('close', () => this.emit('close'));
        this.clientSocket.on('error', (connectError: Error) => this.emit('error', connectError));
    }

    public on<U extends keyof SimConnectRecvEvents>(
        event: U,
        listener: SimConnectRecvEvents[U]
    ): this {
        return super.on(event, listener);
    }

    public emit<U extends keyof SimConnectRecvEvents>(
        event: U,
        ...args: Parameters<SimConnectRecvEvents[U]>
    ): boolean {
        return super.emit(event, ...args);
    }

    connect(options?: ConnectionOptions) {
        if (options?.remote) {
            this.clientSocket.connect({ type: 'ipv4', ...options.remote });
        } else {
            discoverServer().then((address: SimConnectServerAddress) => {
                this.clientSocket.connect(address);
            });
        }
    }

    private _handleMessage({ packetTypeId, data }: SimConnectMessage) {
        switch (packetTypeId) {
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
                this.emit('weatherObservation', new RecvWeatherObservation(data));
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

    resetBuffer() {
        this.writeBuffer.clear();
        this.writeBuffer.setOffset(16);
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
        // console.log("Sent " + ok + ": " + this.writeBuffer.buffer)
    }

    /// ///////////////////////////////////

    private _open() {
        this.resetBuffer();
        this.writeBuffer.writeString256(this.appName);
        this.writeBuffer.writeInt(0);
        this.writeBuffer.writeByte(0x00);
        this.writeBuffer.writeByte(0x58); // X
        this.writeBuffer.writeByte(0x53); // S
        this.writeBuffer.writeByte(0x46); // F
        if (this.ourProtocol === 2) {
            this.writeBuffer.writeInt(0); // major version
            this.writeBuffer.writeInt(0); // minor version
            this.writeBuffer.writeInt(SimConnectBuild.SP0); // major build
            this.writeBuffer.writeInt(0); // minor build
        } else if (this.ourProtocol === 3) {
            this.writeBuffer.writeInt(10); // major version
            this.writeBuffer.writeInt(0); // minor version
            this.writeBuffer.writeInt(SimConnectBuild.SP1); // major build
            this.writeBuffer.writeInt(0); // minor build
        } else if (this.ourProtocol === 4) {
            this.writeBuffer.writeInt(10); // major version
            this.writeBuffer.writeInt(0); // minor version
            this.writeBuffer.writeInt(SimConnectBuild.SP2_XPACK); // major build
            this.writeBuffer.writeInt(0); // minor build
        } else {
            throw Error(SimConnectError.InvalidProtocol); // $NON-NLS-1$
        }
        this.sendPacket(0x01);
    }

    addToDataDefinition(
        dataDefinitionId: DataDefinitionId,
        datumName: string,
        unitsName: string | null,
        dataType?: SimConnectDataType,
        epsilon?: number,
        datumId?: number
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataDefinitionId);
        this.writeBuffer.writeString256(datumName);
        this.writeBuffer.writeString256(unitsName);
        this.writeBuffer.writeInt(dataType === undefined ? SimConnectDataType.FLOAT64 : dataType);
        this.writeBuffer.writeFloat(epsilon || 0);
        this.writeBuffer.writeInt(datumId === undefined ? SimConnectConstants.UNUSED : datumId);
        this.sendPacket(0x0c);
    }

    requestDataOnSimObject(
        dataRequestId: DataRequestId,
        dataDefinitionId: DataDefinitionId,
        objectId: ObjectId,
        period: SimConnectPeriod,
        flags?: DataRequestFlag,
        origin?: number,
        interval?: number,
        limit?: number
    ) {
        this.resetBuffer();
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

    clearDataDefinition(dataDefinitionId: DataDefinitionId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataDefinitionId);
        this.sendPacket(0x0d);
    }

    requestDataOnSimObjectType(
        dataRequestId: DataRequestId,
        dataDefinitionId: DataDefinitionId,
        radiusMeters: number,
        type: SimObjectType
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeInt(dataDefinitionId);
        this.writeBuffer.writeInt(radiusMeters);
        this.writeBuffer.writeInt(type);
        this.sendPacket(0x0f);
    }

    subscribeToSystemEvent(clientEventId: ClientEventId, eventName: string) {
        this.resetBuffer();
        this.writeBuffer.writeInt(clientEventId);
        this.writeBuffer.writeString256(eventName);
        this.sendPacket(0x17);
    }

    unsubscribeFromSystemEvent(clientEventId: ClientEventId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(clientEventId);
        this.sendPacket(0x18);
    }

    requestSystemState(dataRequestId: DataRequestId, state: string) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeString256(state);
        this.sendPacket(0x35);
    }

    setSystemState(state: string, paramInt: number, paramFloat: number, paramString: string) {
        this.resetBuffer();
        this.writeBuffer.writeString256(state);
        this.writeBuffer.writeInt(paramInt);
        this.writeBuffer.writeFloat(paramFloat);
        this.writeBuffer.writeString256(paramString);
        this.writeBuffer.writeInt(0);
        this.sendPacket(0x36);
    }

    addClientEventToNotificationGroup(
        notificationGroupId: NotificationGroupId,
        clientEventId: ClientEventId,
        maskable: boolean
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(notificationGroupId);
        this.writeBuffer.writeInt(clientEventId);
        this.writeBuffer.writeInt(maskable ? 1 : 0);
        this.sendPacket(0x07);
    }

    mapClientEventToSimEvent(clientEventId: ClientEventId, eventName?: string) {
        this.resetBuffer();
        this.writeBuffer.writeInt(clientEventId);
        this.writeBuffer.writeString256(eventName || '');
        this.sendPacket(0x04);
    }

    transmitClientEvent(
        objectId: ObjectId,
        clientEventId: ClientEventId,
        data: number,
        notificationGroupId: NotificationGroupId,
        flags: EventFlag
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(objectId);
        this.writeBuffer.writeInt(clientEventId);
        this.writeBuffer.writeInt(data);
        this.writeBuffer.writeInt(notificationGroupId);
        this.writeBuffer.writeInt(flags);
        this.sendPacket(0x05);
    }

    setSystemEventState(clientEventId: ClientEventId, state: boolean) {
        this.resetBuffer();
        this.writeBuffer.writeInt(clientEventId);
        this.writeBuffer.writeInt(state ? 1 : 0);
        this.sendPacket(0x06);
    }

    removeClientEvent(notificationGroupId: NotificationGroupId, clientEventId: ClientEventId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(notificationGroupId);
        this.writeBuffer.writeInt(clientEventId);
        this.sendPacket(0x08);
    }

    setNotificationGroupPriority(
        notificationGroupId: NotificationGroupId,
        priority: NotificationPriority
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(notificationGroupId);
        this.writeBuffer.writeInt(priority);
        this.sendPacket(0x09);
    }

    clearNotificationGroup(notificationGroupId: NotificationGroupId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(notificationGroupId);
        this.sendPacket(0x0a);
    }

    requestNotificationGroup(
        notificationGroupId: NotificationGroupId,
        reserved: number,
        flags: number
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(notificationGroupId);
        this.writeBuffer.writeInt(reserved);
        this.writeBuffer.writeInt(flags);
        this.sendPacket(0x0b);
    }

    setDataOnSimObject(
        dataDefinitionId: DataDefinitionId,
        objectId: ObjectId,
        data: { buffer: RawBuffer; arrayCount: number; tagged: boolean } | SimConnectData[]
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataDefinitionId);
        this.writeBuffer.writeInt(objectId);

        if (data instanceof Array) {
            this.writeBuffer.writeInt(DataSetFlag.DEFAULT);
            this.writeBuffer.writeInt(data.length);
            this.writeBuffer.writeInt(0); // size
            data.forEach(simConnectData => {
                simConnectData.write(this.writeBuffer);
            });
            this.writeBuffer.writeInt(this.writeBuffer.getOffset() - 36, 32);
        } else {
            const { tagged, arrayCount, buffer } = data;
            this.writeBuffer.writeInt(tagged ? DataSetFlag.TAGGED : DataSetFlag.DEFAULT);
            this.writeBuffer.writeInt(arrayCount === 0 ? 1 : arrayCount);
            const bytes = buffer.getBuffer();
            this.writeBuffer.writeInt(bytes.length);
            this.writeBuffer.write(bytes);
        }

        this.sendPacket(0x10);
    }

    mapInputEventToClientEvent(
        inputGroupId: InputGroupId,
        inputDefinition: string,
        clientEventDownID: ClientEventId,
        downValue?: number,
        clientEventUpID?: ClientEventId,
        upValue?: number,
        maskable?: boolean
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(inputGroupId);
        this.writeBuffer.writeString256(inputDefinition);
        this.writeBuffer.writeInt(clientEventDownID);
        this.writeBuffer.writeInt(downValue || 0);
        this.writeBuffer.writeInt(
            clientEventUpID === undefined ? SimConnectConstants.UNUSED : clientEventUpID
        );
        this.writeBuffer.writeInt(upValue || 0);
        this.writeBuffer.writeInt(maskable ? 1 : 0);
        this.sendPacket(0x11);
    }

    setInputGroupPriority(inputGroupId: InputGroupId, priority: NotificationPriority) {
        this.resetBuffer();
        this.writeBuffer.writeInt(inputGroupId);
        this.writeBuffer.writeInt(priority);
        this.sendPacket(0x12);
    }

    removeInputEvent(inputGroupId: InputGroupId, inputDefinition: string) {
        this.resetBuffer();
        this.writeBuffer.writeInt(inputGroupId);
        this.writeBuffer.writeString256(inputDefinition);
        this.sendPacket(0x13);
    }

    clearInputGroup(inputGroupId: InputGroupId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(inputGroupId);
        this.sendPacket(0x14);
    }

    setInputGroupState(inputGroupId: InputGroupId, state: boolean) {
        this.resetBuffer();
        this.writeBuffer.writeInt(inputGroupId);
        this.writeBuffer.writeInt(state ? 1 : 0);
        this.sendPacket(0x15);
    }

    requestReservedKey(
        clientEventId: ClientEventId,
        keyChoice1?: string,
        keyChoice2?: string,
        keyChoice3?: string
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(clientEventId);
        this.writeBuffer.writeString30(keyChoice1 || '');
        this.writeBuffer.writeString30(keyChoice2 || '');
        this.writeBuffer.writeString30(keyChoice3 || '');
        this.sendPacket(0x16);
    }

    weatherRequestInterpolatedObservation(
        dataRequestId: DataRequestId,
        lat: number,
        lon: number,
        alt: number
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeFloat(lat);
        this.writeBuffer.writeFloat(lon);
        this.writeBuffer.writeFloat(alt);
        this.sendPacket(0x19);
    }

    weatherRequestObservationAtStation(dataRequestId: DataRequestId, ICAO: string) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeString(ICAO, 5); // ICAO is 4 chars, null terminated
        this.sendPacket(0x1a);
    }

    weatherRequestObservationAtNearestStation(
        dataRequestId: DataRequestId,
        lat: number,
        lon: number
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeFloat(lat);
        this.writeBuffer.writeFloat(lon);
        this.sendPacket(0x1b);
    }

    weatherCreateStation(
        dataRequestId: DataRequestId,
        ICAO: string,
        name: string,
        lat: number,
        lon: number,
        alt: number
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeString(ICAO, 5);
        this.writeBuffer.writeString(name, 256);
        this.writeBuffer.writeFloat(lat);
        this.writeBuffer.writeFloat(lon);
        this.writeBuffer.writeFloat(alt);
        this.sendPacket(0x1c);
    }

    weatherRemoveStation(dataRequestId: DataRequestId, ICAO: string) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeString(ICAO, 5);
        this.sendPacket(0x1d);
    }

    weatherSetObservation(seconds: number, metar: string) {
        this.resetBuffer();
        this.writeBuffer.writeInt(seconds);
        this.writeBuffer.writeString(metar);
        this.writeBuffer.writeByte(0); // null terminated
        this.sendPacket(0x1e);
    }

    weatherSetModeServer(port: number, seconds: number) {
        this.resetBuffer();
        this.writeBuffer.writeInt(port);
        this.writeBuffer.writeInt(seconds);
        this.sendPacket(0x1f);
    }

    weatherSetModeTheme(themeName: string) {
        this.resetBuffer();
        this.writeBuffer.writeString(themeName, 256);
        this.sendPacket(0x20);
    }

    weatherSetModeGlobal() {
        this.resetBuffer();
        this.sendPacket(0x21);
    }

    weatherSetModeCustom() {
        this.resetBuffer();
        this.sendPacket(0x22);
    }

    weatherSetDynamicUpdateRate(rate: number) {
        this.resetBuffer();
        this.writeBuffer.writeInt(rate);
        this.sendPacket(0x23);
    }

    weatherRequestCloudState(
        dataRequestId: DataRequestId,
        minLat: number,
        minLon: number,
        minAlt: number,
        maxLat: number,
        maxLon: number,
        maxAlt: number,
        flags?: number
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataRequestId);
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
        dataRequestId: DataRequestId,
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
        this.resetBuffer();
        this.writeBuffer.writeInt(dataRequestId);
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

    weatherRemoveThermal(objectId: ObjectId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(objectId);
        this.sendPacket(0x26);
    }

    aICreateParkedATCAircraft(
        containerTitle: string,
        tailNumber: string,
        airportID: string,
        dataRequestId: DataRequestId
    ) {
        this.resetBuffer();
        this.writeBuffer.writeString(containerTitle, 256);
        this.writeBuffer.writeString(tailNumber, 12);
        this.writeBuffer.writeString(airportID, 5);
        this.writeBuffer.writeInt(dataRequestId);
        this.sendPacket(0x27);
    }

    aICreateEnrouteATCAircraft(
        containerTitle: string,
        tailNumber: string,
        flightNumber: number,
        flightPlanPath: string,
        flightPlanPosition: number,
        touchAndGo: boolean,
        dataRequestId: DataRequestId
    ) {
        this.resetBuffer();
        this.writeBuffer.writeString(containerTitle, 256);
        this.writeBuffer.writeString(tailNumber, 12);
        this.writeBuffer.writeInt(flightNumber);
        this.writeBuffer.writeString(flightPlanPath, 260);
        this.writeBuffer.writeDouble(flightPlanPosition);
        this.writeBuffer.writeInt(touchAndGo ? 1 : 0);
        this.writeBuffer.writeInt(dataRequestId);
        this.sendPacket(0x28);
    }

    aICreateNonATCAircraft(
        containerTitle: string,
        tailNumber: string,
        initPos: InitPosition,
        dataRequestId: DataRequestId
    ) {
        this.resetBuffer();
        this.writeBuffer.writeString(containerTitle, 256);
        this.writeBuffer.writeString(tailNumber, 12);
        initPos.write(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestId);
        this.sendPacket(0x29);
    }

    aICreateSimulatedObject(
        containerTitle: string,
        initPos: InitPosition,
        dataRequestId: DataRequestId
    ) {
        this.resetBuffer();
        this.writeBuffer.writeString(containerTitle, 256);
        initPos.write(this.writeBuffer);
        this.writeBuffer.writeInt(dataRequestId);
        this.sendPacket(0x2a);
    }

    aIReleaseControl(objectId: ObjectId, dataRequestId: DataRequestId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(objectId);
        this.writeBuffer.writeInt(dataRequestId);
        this.sendPacket(0x2b);
    }

    aIRemoveObject(objectId: ObjectId, dataRequestId: DataRequestId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(objectId);
        this.writeBuffer.writeInt(dataRequestId);
        this.sendPacket(0x2c);
    }

    aISetAircraftFlightPlan(
        objectId: ObjectId,
        flightPlanPath: string,
        dataRequestId: DataRequestId
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(objectId);
        this.writeBuffer.writeString(flightPlanPath, 260);
        this.writeBuffer.writeInt(dataRequestId);
        this.sendPacket(0x2d);
    }

    executeMissionAction(guidInstanceId: Buffer) {
        if (guidInstanceId.length !== 16) throw Error(SimConnectError.GuidInvalidSize);
        this.resetBuffer();
        this.writeBuffer.write(guidInstanceId);
        this.sendPacket(0x2e);
    }

    completeCustomMissionAction(guidInstanceId: Buffer) {
        if (guidInstanceId.length !== 16) throw Error(SimConnectError.GuidInvalidSize); // $NON-NLS-1$
        this.resetBuffer();
        this.writeBuffer.write(guidInstanceId);
        this.sendPacket(0x2f);
    }

    // eslint-disable-next-line
    requestResponseTimes(nCount: number) {
        // TODO: implement simconnect function
        // this one needs special care: it send a packet (id 0x03, one param : nCount)
        // and receive 8 float data (with response id 0x00010001) . Some calculations
        // has to be done
        throw Error(SimConnectError.Unimplemented);
    }

    cameraSetRelative6DOF(
        deltaX: number,
        deltaY: number,
        deltaZ: number,
        pitchDeg: number,
        bankDeg: number,
        headingDeg: number
    ) {
        this.resetBuffer();
        this.writeBuffer.writeFloat(deltaX);
        this.writeBuffer.writeFloat(deltaY);
        this.writeBuffer.writeFloat(deltaZ);
        this.writeBuffer.writeFloat(pitchDeg);
        this.writeBuffer.writeFloat(bankDeg);
        this.writeBuffer.writeFloat(headingDeg);
        this.sendPacket(0x30);
    }

    menuAddItem(menuItem: string, menuEventId: ClientEventId, data: number) {
        this.resetBuffer();
        this.writeBuffer.writeString(menuItem, 256);
        this.writeBuffer.writeInt(menuEventId);
        this.writeBuffer.writeInt(data);
        this.sendPacket(0x31);
    }

    menuDeleteItem(menuEventId: ClientEventId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(menuEventId);
        this.sendPacket(0x32);
    }

    menuAddSubItem(
        menuEventId: ClientEventId,
        menuItem: string,
        subMenuEventId: ClientEventId,
        data: number
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(menuEventId);
        this.writeBuffer.writeString(menuItem, 256);
        this.writeBuffer.writeInt(subMenuEventId);
        this.writeBuffer.writeInt(data);
        this.sendPacket(0x33);
    }

    menuDeleteSubItem(menuEventId: ClientEventId, subMenuEventId: ClientEventId) {
        // packet size 0x18
        // packet id 0x34

        this.resetBuffer();
        this.writeBuffer.writeInt(menuEventId);
        this.writeBuffer.writeInt(subMenuEventId);
        this.sendPacket(0x34);
    }

    mapClientDataNameToID(clientDataName: string, clientDataId: ClientDataId) {
        this.resetBuffer();
        this.writeBuffer.writeString(clientDataName, 256);
        this.writeBuffer.writeInt(clientDataId);
        this.sendPacket(0x37);
    }

    createClientData(clientDataId: ClientDataId, size: number, readOnly: boolean) {
        this.resetBuffer();
        this.writeBuffer.writeInt(clientDataId);
        this.writeBuffer.writeInt(size);
        this.writeBuffer.writeInt(readOnly ? 1 : 0);
        this.sendPacket(0x38);
    }

    addToClientDataDefinition(
        dataDefinitionId: DataDefinitionId,
        offset: number,
        sizeOrType: number,
        epsilon?: number,
        datumId?: number
    ) {
        if (this.ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        this.resetBuffer();
        this.writeBuffer.writeInt(dataDefinitionId);
        this.writeBuffer.writeInt(offset);
        this.writeBuffer.writeInt(sizeOrType);
        this.writeBuffer.writeFloat(epsilon || 0);
        this.writeBuffer.writeInt(datumId || 0);
        this.sendPacket(0x39);
    }

    clearClientDataDefinition(dataDefinitionId: DataDefinitionId) {
        this.resetBuffer();
        this.writeBuffer.writeInt(dataDefinitionId);
        this.sendPacket(0x3a);
    }

    requestClientData<O extends number, I extends number, L extends number>(
        clientDataId: ClientDataId,
        dataRequestId: DataRequestId,
        clientDataDefineID: ClientDataDefinitionId,
        period: ClientDataPeriod,
        flags: ClientDataRequestFlag,
        origin?: O,
        interval?: I,
        limit?: L
    ) {
        if (this.ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        this.resetBuffer();
        this.writeBuffer.writeInt(clientDataId);
        this.writeBuffer.writeInt(dataRequestId);
        this.writeBuffer.writeInt(clientDataDefineID);
        this.writeBuffer.writeInt(period);
        this.writeBuffer.writeInt(flags);
        this.writeBuffer.writeInt(origin || 0);
        this.writeBuffer.writeInt(interval || 0);
        this.writeBuffer.writeInt(limit || 0);
        this.sendPacket(0x3b);
    }

    setClientData(
        clientDataId: ClientDataId,
        clientDataDefineID: ClientDataDefinitionId,
        reserved: number,
        arrayCount: number,
        unitSize: number,
        data: Buffer
    ) {
        this.resetBuffer();
        this.writeBuffer.writeInt(clientDataId);
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

        this.resetBuffer();
        this.writeBuffer.writeString(fileName, SimConnectConstants.MAX_PATH);
        this.sendPacket(0x3d);
    }

    flightSave(
        fileName: string,
        title: string | null,
        description: string,
        flags?: number // eslint-disable-line
    ) {
        // packet size 0x918 (SP1), 0xA1C (SP2)
        // packet id 0x3E
        this.resetBuffer();
        this.writeBuffer.writeString(fileName, SimConnectConstants.MAX_PATH);

        if (this.ourProtocol >= Protocol.FSX_SP2) {
            this.writeBuffer.writeString(
                title === null ? fileName : title,
                SimConnectConstants.MAX_PATH
            );
        }

        this.writeBuffer.writeString(description, 2048);
        this.writeBuffer.writeInt(SimConnectConstants.UNUSED);
        this.sendPacket(0x3e);
    }

    flightPlanLoad(fileName: string) {
        // packet size 0x114
        // packet id 0x3F

        this.resetBuffer();
        this.writeBuffer.writeString(fileName, SimConnectConstants.MAX_PATH);
        this.sendPacket(0x3f);
    }

    text(type: TextType, timeSeconds: number, clientEventId: ClientEventId, message: string) {
        if (this.ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        // packet id 0x40
        this.resetBuffer();
        this.writeBuffer.writeInt(type);
        this.writeBuffer.writeFloat(timeSeconds);
        this.writeBuffer.writeInt(clientEventId);
        if (message !== null && message.length > 0) {
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
        clientEventId: ClientEventId,
        title?: string,
        prompt?: string,
        ...items: string[]
    ) {
        if (this.ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        // packet id 0x40

        this.resetBuffer();
        this.writeBuffer.writeInt(TextType.MENU);
        this.writeBuffer.writeFloat(timeSeconds);
        this.writeBuffer.writeInt(clientEventId);
        this.writeBuffer.writeInt(0); // size, will be set later
        if (!title && !prompt && items.length === 0) {
            this.writeBuffer.writeByte(0);
        } else if (title && prompt) {
            this.writeBuffer.writeString(title);
            this.writeBuffer.writeByte(0);
            this.writeBuffer.writeString(prompt);
            this.writeBuffer.writeByte(0);
            items.forEach(s => {
                this.writeBuffer.writeString(s);
                this.writeBuffer.writeByte(0);
            });
        }
        // set size
        this.writeBuffer.writeInt(this.writeBuffer.getOffset() - 32, 28);

        this.sendPacket(0x40);
    }

    requestFacilitiesList(type: FacilityListType, clientEventId: ClientEventId) {
        if (this.ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$
        // ID 0x43
        this.resetBuffer();
        this.writeBuffer.writeInt(type);
        this.writeBuffer.writeInt(clientEventId);
        this.sendPacket(0x43);
    }

    subscribeToFacilities(type: FacilityListType, clientEventId: ClientEventId) {
        if (this.ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        // ID 0x41
        this.resetBuffer();
        this.writeBuffer.writeInt(type);
        this.writeBuffer.writeInt(clientEventId);
        this.sendPacket(0x41);
    }

    unSubscribeToFacilities(type: FacilityListType) {
        if (this.ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        // ID 0x42
        this.resetBuffer();
        this.writeBuffer.writeInt(type);
        this.sendPacket(0x42);
    }

    close() {
        this.clientSocket.close();
    }

    /// //

    getLastSentPacketID() {
        return this.currentIndex - 1;
    }
}

export { SimConnectConnection, ConnectionOptions, SimConnectRecvEvents };
module.exports = { SimConnectConnection };
