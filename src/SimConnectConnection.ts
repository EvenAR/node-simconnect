import { EventEmitter } from 'events';
import { SimConnectDataType } from './enums/SimConnectDataType';
import { SimConnectPeriod } from './enums/SimConnectPeriod';
import { SimObjectType } from './enums/SimObjectType';
import { RawBuffer } from './RawBuffer';
import { autodetectServerAddress, ConnectionParameters } from './connectionParameters';
import { NotificationPriority } from './enums/NotificationPriority';
import { IcaoType, InitPosition, SimConnectData } from './dto';
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
import Timeout = NodeJS.Timeout;
import { RecvFacilityData } from './recv/RecvFacilityData';
import { RecvFacilityDataEnd } from './recv/RecvFacilityDataEnd';
import { RecvFacilityMinimalList } from './recv/RecvFacilityMinimalList';
import { RecvEventEx1 } from './recv/RecvEventEx1';

const RECEIVE_SIZE = 65536;

type OpenPacketData = {
    major: number;
    minor: number;
    buildMajor: number;
    buildMinor: number;
    alias: string;
};

const openPacketData: { [key in Protocol]: OpenPacketData } = {
    [Protocol.FSX_RTM]: {
        major: 0,
        minor: 0,
        buildMajor: 60905,
        buildMinor: 0,
        alias: 'XSF',
    },
    [Protocol.FSX_SP1]: {
        major: 10,
        minor: 0,
        buildMajor: 61355,
        buildMinor: 0,
        alias: 'XSF',
    },
    [Protocol.FSX_SP2]: {
        major: 10,
        minor: 0,
        buildMajor: 61259,
        buildMinor: 0,
        alias: 'XSF',
    },
    [Protocol.KittyHawk]: {
        major: 11,
        minor: 0,
        buildMajor: 62651,
        buildMinor: 3,
        alias: 'HK', // "Hawk" + "Kitty"?
    },
};

interface SimConnectRecvEvents {
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
}

type ConnectionOptions =
    | { host: string; port: number }
    | { simConnectCfgIndex: number }
    | { remote: { host: string; port: number } };

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
    private readonly _appName: string;

    private readonly _writeBuffer: RawBuffer;

    private readonly _ourProtocol: Protocol;

    _clientSocket: SimConnectSocket;

    private _openTimeout: null | Timeout;

    private _packetsSent: number;

    constructor(appName: string, protocolVersion: Protocol) {
        super();
        this._appName = appName;
        this._packetsSent = 0;
        this._ourProtocol = protocolVersion;
        this._writeBuffer = new RawBuffer(RECEIVE_SIZE);

        this._openTimeout = null;

        this._clientSocket = new SimConnectSocket();

        this._clientSocket.on('connect', this._open.bind(this));
        this._clientSocket.on('data', this._handleMessage.bind(this));
        this._clientSocket.on('close', () => this.emit('close'));
        this._clientSocket.on('error', (connectError: Error) => this.emit('error', connectError));
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
        if (options && 'host' in options && 'port' in options) {
            this._clientSocket.connect({ type: 'ipv4', ...options });
        } else if (options && 'remote' in options) {
            // For backwards-compatibility
            this._clientSocket.connect({ type: 'ipv4', ...options.remote });
        } else {
            autodetectServerAddress(options?.simConnectCfgIndex).then(
                (address: ConnectionParameters) => {
                    this._clientSocket.connect(address);
                }
            );
        }
    }

    addToDataDefinition(
        dataDefinitionId: DataDefinitionId,
        datumName: string,
        unitsName: string | null,
        dataType?: SimConnectDataType,
        epsilon?: number,
        datumId?: number
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataDefinitionId);
        this._writeBuffer.writeString256(datumName);
        this._writeBuffer.writeString256(unitsName);
        this._writeBuffer.writeInt32(
            dataType === undefined ? SimConnectDataType.FLOAT64 : dataType
        );
        this._writeBuffer.writeFloat32(epsilon || 0);
        this._writeBuffer.writeInt32(datumId === undefined ? SimConnectConstants.UNUSED : datumId);
        this._sendPacket(0x0c);
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
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeInt32(dataDefinitionId);
        this._writeBuffer.writeInt32(objectId);
        this._writeBuffer.writeInt32(period);
        this._writeBuffer.writeInt32(flags || 0);
        this._writeBuffer.writeInt32(origin || 0);
        this._writeBuffer.writeInt32(interval || 0);
        this._writeBuffer.writeInt32(limit || 0);
        this._sendPacket(0x0e);
    }

    clearDataDefinition(dataDefinitionId: DataDefinitionId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataDefinitionId);
        this._sendPacket(0x0d);
    }

    requestDataOnSimObjectType(
        dataRequestId: DataRequestId,
        dataDefinitionId: DataDefinitionId,
        radiusMeters: number,
        type: SimObjectType
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeInt32(dataDefinitionId);
        this._writeBuffer.writeInt32(radiusMeters);
        this._writeBuffer.writeInt32(type);
        this._sendPacket(0x0f);
    }

    subscribeToSystemEvent(clientEventId: ClientEventId, eventName: string) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(clientEventId);
        this._writeBuffer.writeString256(eventName);
        this._sendPacket(0x17);
    }

    unsubscribeFromSystemEvent(clientEventId: ClientEventId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(clientEventId);
        this._sendPacket(0x18);
    }

    requestSystemState(dataRequestId: DataRequestId, state: string) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeString256(state);
        this._sendPacket(0x35);
    }

    setSystemState(state: string, paramInt: number, paramFloat: number, paramString: string) {
        this._resetBuffer();
        this._writeBuffer.writeString256(state);
        this._writeBuffer.writeInt32(paramInt);
        this._writeBuffer.writeFloat32(paramFloat);
        this._writeBuffer.writeString256(paramString);
        this._writeBuffer.writeInt32(0);
        this._sendPacket(0x36);
    }

    addClientEventToNotificationGroup(
        notificationGroupId: NotificationGroupId,
        clientEventId: ClientEventId,
        maskable: boolean
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(notificationGroupId);
        this._writeBuffer.writeInt32(clientEventId);
        this._writeBuffer.writeInt32(maskable ? 1 : 0);
        this._sendPacket(0x07);
    }

    mapClientEventToSimEvent(clientEventId: ClientEventId, eventName?: string) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(clientEventId);
        this._writeBuffer.writeString256(eventName || '');
        this._sendPacket(0x04);
    }

    transmitClientEvent(
        objectId: ObjectId,
        clientEventId: ClientEventId,
        data: number,
        notificationGroupId: NotificationGroupId,
        flags: EventFlag
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(objectId);
        this._writeBuffer.writeInt32(clientEventId);
        this._writeBuffer.writeInt32(data);
        this._writeBuffer.writeInt32(notificationGroupId);
        this._writeBuffer.writeInt32(flags);
        this._sendPacket(0x05);
    }

    setSystemEventState(clientEventId: ClientEventId, state: boolean) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(clientEventId);
        this._writeBuffer.writeInt32(state ? 1 : 0);
        this._sendPacket(0x06);
    }

    removeClientEvent(notificationGroupId: NotificationGroupId, clientEventId: ClientEventId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(notificationGroupId);
        this._writeBuffer.writeInt32(clientEventId);
        this._sendPacket(0x08);
    }

    setNotificationGroupPriority(
        notificationGroupId: NotificationGroupId,
        priority: NotificationPriority
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(notificationGroupId);
        this._writeBuffer.writeInt32(priority);
        this._sendPacket(0x09);
    }

    clearNotificationGroup(notificationGroupId: NotificationGroupId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(notificationGroupId);
        this._sendPacket(0x0a);
    }

    requestNotificationGroup(
        notificationGroupId: NotificationGroupId,
        reserved: number,
        flags: number
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(notificationGroupId);
        this._writeBuffer.writeInt32(reserved);
        this._writeBuffer.writeInt32(flags);
        this._sendPacket(0x0b);
    }

    setDataOnSimObject(
        dataDefinitionId: DataDefinitionId,
        objectId: ObjectId,
        data: { buffer: RawBuffer; arrayCount: number; tagged: boolean } | SimConnectData[]
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataDefinitionId);
        this._writeBuffer.writeInt32(objectId);

        if (data instanceof Array) {
            this._writeBuffer.writeInt32(DataSetFlag.DEFAULT);
            this._writeBuffer.writeInt32(data.length);
            this._writeBuffer.writeInt32(0); // Just a placeholder for array unit size
            const arrayStartPos = this._writeBuffer.getOffset();
            data.forEach(simConnectData => {
                simConnectData.write(this._writeBuffer);
            });
            const arrayTotalSize = this._writeBuffer.getOffset() - arrayStartPos;
            const unitSize = arrayTotalSize / data.length;
            this._writeBuffer.writeInt32(unitSize, arrayStartPos - 4); // Replace placeholder
        } else {
            const { tagged, arrayCount, buffer } = data;
            this._writeBuffer.writeInt32(tagged ? DataSetFlag.TAGGED : DataSetFlag.DEFAULT);
            this._writeBuffer.writeInt32(arrayCount === 0 ? 1 : arrayCount);
            const bytes = buffer.getBuffer();
            this._writeBuffer.writeInt32(bytes.length);
            this._writeBuffer.write(bytes);
        }

        this._sendPacket(0x10);
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
        this._resetBuffer();
        this._writeBuffer.writeInt32(inputGroupId);
        this._writeBuffer.writeString256(inputDefinition);
        this._writeBuffer.writeInt32(clientEventDownID);
        this._writeBuffer.writeInt32(downValue || 0);
        this._writeBuffer.writeInt32(
            clientEventUpID === undefined ? SimConnectConstants.UNUSED : clientEventUpID
        );
        this._writeBuffer.writeInt32(upValue || 0);
        this._writeBuffer.writeInt32(maskable ? 1 : 0);
        this._sendPacket(0x11);
    }

    setInputGroupPriority(inputGroupId: InputGroupId, priority: NotificationPriority) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(inputGroupId);
        this._writeBuffer.writeInt32(priority);
        this._sendPacket(0x12);
    }

    removeInputEvent(inputGroupId: InputGroupId, inputDefinition: string) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(inputGroupId);
        this._writeBuffer.writeString256(inputDefinition);
        this._sendPacket(0x13);
    }

    clearInputGroup(inputGroupId: InputGroupId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(inputGroupId);
        this._sendPacket(0x14);
    }

    setInputGroupState(inputGroupId: InputGroupId, state: boolean) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(inputGroupId);
        this._writeBuffer.writeInt32(state ? 1 : 0);
        this._sendPacket(0x15);
    }

    requestReservedKey(
        clientEventId: ClientEventId,
        keyChoice1?: string,
        keyChoice2?: string,
        keyChoice3?: string
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(clientEventId);
        this._writeBuffer.writeString30(keyChoice1 || '');
        this._writeBuffer.writeString30(keyChoice2 || '');
        this._writeBuffer.writeString30(keyChoice3 || '');
        this._sendPacket(0x16);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherRequestInterpolatedObservation(
        dataRequestId: DataRequestId,
        lat: number,
        lon: number,
        alt: number
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeFloat32(lat);
        this._writeBuffer.writeFloat32(lon);
        this._writeBuffer.writeFloat32(alt);
        this._sendPacket(0x19);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherRequestObservationAtStation(dataRequestId: DataRequestId, ICAO: string) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeString(ICAO, 5); // ICAO is 4 chars, null terminated
        this._sendPacket(0x1a);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherRequestObservationAtNearestStation(
        dataRequestId: DataRequestId,
        lat: number,
        lon: number
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeFloat32(lat);
        this._writeBuffer.writeFloat32(lon);
        this._sendPacket(0x1b);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherCreateStation(
        dataRequestId: DataRequestId,
        ICAO: string,
        name: string,
        lat: number,
        lon: number,
        alt: number
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeString(ICAO, 5);
        this._writeBuffer.writeString(name, 256);
        this._writeBuffer.writeFloat32(lat);
        this._writeBuffer.writeFloat32(lon);
        this._writeBuffer.writeFloat32(alt);
        this._sendPacket(0x1c);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherRemoveStation(dataRequestId: DataRequestId, ICAO: string) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeString(ICAO, 5);
        this._sendPacket(0x1d);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherSetObservation(seconds: number, metar: string) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(seconds);
        this._writeBuffer.writeString(metar);
        this._writeBuffer.writeByte(0); // null terminated
        this._sendPacket(0x1e);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherSetModeServer(port: number, seconds: number) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(port);
        this._writeBuffer.writeInt32(seconds);
        this._sendPacket(0x1f);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherSetModeTheme(themeName: string) {
        this._resetBuffer();
        this._writeBuffer.writeString(themeName, 256);
        this._sendPacket(0x20);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherSetModeGlobal() {
        this._resetBuffer();
        this._sendPacket(0x21);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherSetModeCustom() {
        this._resetBuffer();
        this._sendPacket(0x22);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherSetDynamicUpdateRate(rate: number) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(rate);
        this._sendPacket(0x23);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
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
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeFloat32(minLat);
        this._writeBuffer.writeFloat32(minLon);
        this._writeBuffer.writeFloat32(minAlt);
        this._writeBuffer.writeFloat32(maxLat);
        this._writeBuffer.writeFloat32(maxLon);
        this._writeBuffer.writeFloat32(maxAlt);
        this._writeBuffer.writeInt32(flags || 0);
        this._sendPacket(0x24);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
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
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeFloat32(lat);
        this._writeBuffer.writeFloat32(lon);
        this._writeBuffer.writeFloat32(alt);
        this._writeBuffer.writeFloat32(radius);
        this._writeBuffer.writeFloat32(height);
        this._writeBuffer.writeFloat32(coreRate);
        this._writeBuffer.writeFloat32(coreTurbulence);
        this._writeBuffer.writeFloat32(sinkRate);
        this._writeBuffer.writeFloat32(sinkTurbulence);
        this._writeBuffer.writeFloat32(coreSize);
        this._writeBuffer.writeFloat32(coreTransitionSize);
        this._writeBuffer.writeFloat32(sinkLayerSize);
        this._writeBuffer.writeFloat32(sinkTransitionSize);
        this._sendPacket(0x25);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    weatherRemoveThermal(objectId: ObjectId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(objectId);
        this._sendPacket(0x26);
    }

    aICreateParkedATCAircraft(
        containerTitle: string,
        tailNumber: string,
        airportID: string,
        dataRequestId: DataRequestId
    ) {
        this._resetBuffer();
        this._writeBuffer.writeString(containerTitle, 256);
        this._writeBuffer.writeString(tailNumber, 12);
        this._writeBuffer.writeString(airportID, 5);
        this._writeBuffer.writeInt32(dataRequestId);
        this._sendPacket(0x27);
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
        this._resetBuffer();
        this._writeBuffer.writeString(containerTitle, 256);
        this._writeBuffer.writeString(tailNumber, 12);
        this._writeBuffer.writeInt32(flightNumber);
        this._writeBuffer.writeString(flightPlanPath, 260);
        this._writeBuffer.writeFloat64(flightPlanPosition);
        this._writeBuffer.writeInt32(touchAndGo ? 1 : 0);
        this._writeBuffer.writeInt32(dataRequestId);
        this._sendPacket(0x28);
    }

    aICreateNonATCAircraft(
        containerTitle: string,
        tailNumber: string,
        initPos: InitPosition,
        dataRequestId: DataRequestId
    ) {
        this._resetBuffer();
        this._writeBuffer.writeString(containerTitle, 256);
        this._writeBuffer.writeString(tailNumber, 12);
        initPos.write(this._writeBuffer);
        this._writeBuffer.writeInt32(dataRequestId);
        this._sendPacket(0x29);
    }

    aICreateSimulatedObject(
        containerTitle: string,
        initPos: InitPosition,
        dataRequestId: DataRequestId
    ) {
        this._resetBuffer();
        this._writeBuffer.writeString(containerTitle, 256);
        initPos.write(this._writeBuffer);
        this._writeBuffer.writeInt32(dataRequestId);
        this._sendPacket(0x2a);
    }

    aIReleaseControl(objectId: ObjectId, dataRequestId: DataRequestId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(objectId);
        this._writeBuffer.writeInt32(dataRequestId);
        this._sendPacket(0x2b);
    }

    aIRemoveObject(objectId: ObjectId, dataRequestId: DataRequestId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(objectId);
        this._writeBuffer.writeInt32(dataRequestId);
        this._sendPacket(0x2c);
    }

    aISetAircraftFlightPlan(
        objectId: ObjectId,
        flightPlanPath: string,
        dataRequestId: DataRequestId
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(objectId);
        this._writeBuffer.writeString(flightPlanPath, 260);
        this._writeBuffer.writeInt32(dataRequestId);
        this._sendPacket(0x2d);
    }

    executeMissionAction(guidInstanceId: Buffer) {
        if (guidInstanceId.length !== 16) throw Error(SimConnectError.GuidInvalidSize);
        this._resetBuffer();
        this._writeBuffer.write(guidInstanceId);
        this._sendPacket(0x2e);
    }

    completeCustomMissionAction(guidInstanceId: Buffer) {
        if (guidInstanceId.length !== 16) throw Error(SimConnectError.GuidInvalidSize); // $NON-NLS-1$
        this._resetBuffer();
        this._writeBuffer.write(guidInstanceId);
        this._sendPacket(0x2f);
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
        this._resetBuffer();
        this._writeBuffer.writeFloat32(deltaX);
        this._writeBuffer.writeFloat32(deltaY);
        this._writeBuffer.writeFloat32(deltaZ);
        this._writeBuffer.writeFloat32(pitchDeg);
        this._writeBuffer.writeFloat32(bankDeg);
        this._writeBuffer.writeFloat32(headingDeg);
        this._sendPacket(0x30);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    menuAddItem(menuItem: string, menuEventId: ClientEventId, data: number) {
        this._resetBuffer();
        this._writeBuffer.writeString(menuItem, 256);
        this._writeBuffer.writeInt32(menuEventId);
        this._writeBuffer.writeInt32(data);
        this._sendPacket(0x31);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    menuDeleteItem(menuEventId: ClientEventId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(menuEventId);
        this._sendPacket(0x32);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    menuAddSubItem(
        menuEventId: ClientEventId,
        menuItem: string,
        subMenuEventId: ClientEventId,
        data: number
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(menuEventId);
        this._writeBuffer.writeString(menuItem, 256);
        this._writeBuffer.writeInt32(subMenuEventId);
        this._writeBuffer.writeInt32(data);
        this._sendPacket(0x33);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    menuDeleteSubItem(menuEventId: ClientEventId, subMenuEventId: ClientEventId) {
        // packet size 0x18
        // packet id 0x34

        this._resetBuffer();
        this._writeBuffer.writeInt32(menuEventId);
        this._writeBuffer.writeInt32(subMenuEventId);
        this._sendPacket(0x34);
    }

    mapClientDataNameToID(clientDataName: string, clientDataId: ClientDataId) {
        this._resetBuffer();
        this._writeBuffer.writeString(clientDataName, 256);
        this._writeBuffer.writeInt32(clientDataId);
        this._sendPacket(0x37);
    }

    createClientData(clientDataId: ClientDataId, size: number, readOnly: boolean) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(clientDataId);
        this._writeBuffer.writeInt32(size);
        this._writeBuffer.writeInt32(readOnly ? 1 : 0);
        this._sendPacket(0x38);
    }

    addToClientDataDefinition(
        dataDefinitionId: DataDefinitionId,
        offset: number,
        sizeOrType: number,
        epsilon?: number,
        datumId?: number
    ) {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        this._resetBuffer();
        this._writeBuffer.writeInt32(dataDefinitionId);
        this._writeBuffer.writeInt32(offset);
        this._writeBuffer.writeInt32(sizeOrType);
        this._writeBuffer.writeFloat32(epsilon || 0);
        this._writeBuffer.writeInt32(datumId || 0);
        this._sendPacket(0x39);
    }

    clearClientDataDefinition(dataDefinitionId: DataDefinitionId) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataDefinitionId);
        this._sendPacket(0x3a);
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
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        this._resetBuffer();
        this._writeBuffer.writeInt32(clientDataId);
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeInt32(clientDataDefineID);
        this._writeBuffer.writeInt32(period);
        this._writeBuffer.writeInt32(flags);
        this._writeBuffer.writeInt32(origin || 0);
        this._writeBuffer.writeInt32(interval || 0);
        this._writeBuffer.writeInt32(limit || 0);
        this._sendPacket(0x3b);
    }

    setClientData(
        clientDataId: ClientDataId,
        clientDataDefineID: ClientDataDefinitionId,
        reserved: number,
        arrayCount: number,
        unitSize: number,
        data: Buffer
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(clientDataId);
        this._writeBuffer.writeInt32(clientDataDefineID);
        this._writeBuffer.writeInt32(0); // do not use arg
        this._writeBuffer.writeInt32(1); // do not use arg
        // TODO: add support for arrays https://github.com/mharj/jsimconnect/blob/master/src/flightsim/simconnect/SimConnect.java#L3803
        this._writeBuffer.writeInt32(unitSize);
        this._writeBuffer.write(data);
        this._sendPacket(0x3c);
    }

    flightLoad(fileName: string) {
        // packet size 0x114
        // packet id 0x3D

        this._resetBuffer();
        this._writeBuffer.writeString(fileName, SimConnectConstants.MAX_PATH);
        this._sendPacket(0x3d);
    }

    flightSave(
        fileName: string,
        title: string | null,
        description: string,
        flags?: number // eslint-disable-line
    ) {
        // packet size 0x918 (SP1), 0xA1C (SP2)
        // packet id 0x3E
        this._resetBuffer();
        this._writeBuffer.writeString(fileName, SimConnectConstants.MAX_PATH);

        if (this._ourProtocol >= Protocol.FSX_SP2) {
            this._writeBuffer.writeString(
                title === null ? fileName : title,
                SimConnectConstants.MAX_PATH
            );
        }

        this._writeBuffer.writeString(description, 2048);
        this._writeBuffer.writeInt32(SimConnectConstants.UNUSED);
        this._sendPacket(0x3e);
    }

    flightPlanLoad(fileName: string) {
        // packet size 0x114
        // packet id 0x3F

        this._resetBuffer();
        this._writeBuffer.writeString(fileName, SimConnectConstants.MAX_PATH);
        this._sendPacket(0x3f);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    text(type: TextType, timeSeconds: number, clientEventId: ClientEventId, message: string) {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        // packet id 0x40
        this._resetBuffer();
        this._writeBuffer.writeInt32(type);
        this._writeBuffer.writeFloat32(timeSeconds);
        this._writeBuffer.writeInt32(clientEventId);
        if (message !== null && message.length > 0) {
            this._writeBuffer.writeInt32(message.length + 1);
            this._writeBuffer.writeString(message);
        } else {
            this._writeBuffer.writeInt32(1);
        }
        this._writeBuffer.writeByte(0);
        this._sendPacket(0x40);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     */
    menu(
        timeSeconds: number,
        clientEventId: ClientEventId,
        title?: string,
        prompt?: string,
        ...items: string[]
    ) {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        // packet id 0x40

        this._resetBuffer();
        this._writeBuffer.writeInt32(TextType.MENU);
        this._writeBuffer.writeFloat32(timeSeconds);
        this._writeBuffer.writeInt32(clientEventId);
        this._writeBuffer.writeInt32(0); // size, will be set later
        if (!title && !prompt && items.length === 0) {
            this._writeBuffer.writeByte(0);
        } else if (title && prompt) {
            this._writeBuffer.writeString(title);
            this._writeBuffer.writeByte(0);
            this._writeBuffer.writeString(prompt);
            this._writeBuffer.writeByte(0);
            items.forEach(s => {
                this._writeBuffer.writeString(s);
                this._writeBuffer.writeByte(0);
            });
        }
        // set size
        this._writeBuffer.writeInt32(this._writeBuffer.getOffset() - 32, 28);

        this._sendPacket(0x40);
    }

    subscribeToFacilities(type: FacilityListType, clientEventId: ClientEventId) {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        // ID 0x41
        this._resetBuffer();
        this._writeBuffer.writeInt32(type);
        this._writeBuffer.writeInt32(clientEventId);
        this._sendPacket(0x41);
    }

    subscribeToFacilitiesEx1(
        type: FacilityListType,
        newElemInRangeRequestID: DataRequestId,
        oldElemOutRangeRequestID: DataRequestId
    ) {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        this._resetBuffer();
        this._writeBuffer.writeInt32(type);
        this._writeBuffer.writeInt32(newElemInRangeRequestID);
        this._writeBuffer.writeInt32(oldElemOutRangeRequestID);
        this._sendPacket(0x47);
    }

    unSubscribeToFacilities(type: FacilityListType) {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        // ID 0x42
        this._resetBuffer();
        this._writeBuffer.writeInt32(type);
        this._sendPacket(0x42);
    }

    unSubscribeToFacilitiesEx1(
        type: FacilityListType,
        unsubscribeNewInRange: boolean,
        unsubscribeOldOutRange: boolean
    ) {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        this._resetBuffer();
        this._writeBuffer.writeInt32(type);
        this._writeBuffer.writeString(unsubscribeNewInRange ? '1' : '0', 1);
        this._writeBuffer.writeString(unsubscribeOldOutRange ? '1' : '0', 1);
        this._sendPacket(0x48);
    }

    requestFacilitiesList(type: FacilityListType, clientEventId: ClientEventId) {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$
        this._resetBuffer();
        this._writeBuffer.writeInt32(type);
        this._writeBuffer.writeInt32(clientEventId);
        this._sendPacket(0x43);
    }

    requestFacilitiesListEx1(type: FacilityListType, clientEventId: ClientEventId) {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$
        this._resetBuffer();
        this._writeBuffer.writeInt32(type);
        this._writeBuffer.writeInt32(clientEventId);
        this._sendPacket(0x49);
    }

    transmitClientEventEx(
        objectId: ObjectId,
        clientEventId: ClientEventId,
        notificationGroupId: NotificationGroupId,
        flags: EventFlag,
        data0 = 0,
        data1 = 0,
        data2 = 0,
        data3 = 0,
        data4 = 0
    ) {
        this._resetBuffer();
        this._writeBuffer.writeInt32(objectId);
        this._writeBuffer.writeInt32(clientEventId);
        this._writeBuffer.writeInt32(notificationGroupId);
        this._writeBuffer.writeInt32(flags);
        this._writeBuffer.writeInt32(data0);
        this._writeBuffer.writeInt32(data1);
        this._writeBuffer.writeInt32(data2);
        this._writeBuffer.writeInt32(data3);
        this._writeBuffer.writeInt32(data4);
        this._sendPacket(0x44);
    }

    addToFacilityDefinition(dataDefinitionId: DataDefinitionId, fieldName: string) {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion);
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataDefinitionId);
        this._writeBuffer.writeString256(fieldName);
        this._sendPacket(0x45);
    }

    requestFacilityData(
        dataDefinitionId: DataDefinitionId,
        dataRequestId: DataRequestId,
        icao: string,
        region?: string,
        type?: IcaoType
    ) {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion);
        this._resetBuffer();
        this._writeBuffer.writeInt32(dataDefinitionId);
        this._writeBuffer.writeInt32(dataRequestId);
        this._writeBuffer.writeString(icao, 16);
        this._writeBuffer.writeString(region || '', 4);
        if (type === undefined) {
            // SimConnect_RequestFacilityData
            this._sendPacket(0x46);
        } else {
            // SimConnect_RequestFacilityData_EX1
            this._writeBuffer.writeString(type, 1);
            this._sendPacket(0x4a);
        }
    }

    close() {
        if (this._openTimeout !== null) {
            clearTimeout(this._openTimeout);
            this._openTimeout = null;
        }
        this._clientSocket.close();
    }

    getLastSentPacketID() {
        return this._packetsSent - 1;
    }

    private _handleMessage({ packetTypeId, data }: SimConnectMessage) {
        if (!(packetTypeId in RecvID)) {
            console.log('Unknown packet type id', packetTypeId, data);
        }

        switch (packetTypeId) {
            case RecvID.ID_NULL:
                break;
            case RecvID.ID_EXCEPTION:
                this.emit('exception', new RecvException(data));
                break;
            case RecvID.ID_OPEN:
                if (this._openTimeout !== null) {
                    clearTimeout(this._openTimeout);
                    this._openTimeout = null;
                }
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
            case RecvID.ID_EVENT_EX1:
                this.emit('eventEx1', new RecvEventEx1(data));
                break;
            case RecvID.ID_FACILITY_DATA:
                this.emit('facilityData', new RecvFacilityData(data));
                break;
            case RecvID.ID_FACILITY_DATA_END:
                this.emit('facilityDataEnd', new RecvFacilityDataEnd(data));
                break;
            case RecvID.ID_FACILITY_MINIMAL_LIST:
                this.emit('facilityMinimalList', new RecvFacilityMinimalList(data));
                break;
        }
    }

    private _resetBuffer() {
        this._writeBuffer.clear();
        this._writeBuffer.setOffset(16); // Bytes 0-16 are for the packet header
    }

    private _sendPacket(type: number) {
        const packetSize = this._writeBuffer.getOffset();

        // Replace byte 0-16 with package header
        this._writeBuffer.writeInt32(packetSize, 0);
        this._writeBuffer.writeInt32(this._ourProtocol, 4);
        this._writeBuffer.writeInt32(0xf0000000 | type, 8);
        this._writeBuffer.writeInt32(this._packetsSent++, 12);

        const data = this._writeBuffer.getBuffer();
        this._clientSocket.write(data);
    }

    private _open() {
        this._openTimeout = setTimeout(() => {
            this.close();
            this.emit('error', Error('Open timeout'));
        }, 5000);

        const version = openPacketData[this._ourProtocol];
        if (!version) {
            throw Error(SimConnectError.InvalidProtocol); // $NON-NLS-1$
        }

        this._resetBuffer();
        this._writeBuffer.writeString256(this._appName);
        this._writeBuffer.writeInt32(0);
        this._writeBuffer.writeByte(0x00);
        this._writeBuffer.writeString(version.alias, 3);
        this._writeBuffer.writeInt32(version.major);
        this._writeBuffer.writeInt32(version.minor);
        this._writeBuffer.writeInt32(version.buildMajor);
        this._writeBuffer.writeInt32(version.buildMinor);

        this._sendPacket(0x01);
    }
}

export { SimConnectConnection, ConnectionOptions, SimConnectRecvEvents };
module.exports = { SimConnectConnection };
