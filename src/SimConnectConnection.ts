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
import { DataRequestFlag } from './flags/DataRequestFlag';
import { EventFlag } from './flags/EventFlag';
import { DataSetFlag } from './flags/DataSetFlag';
import { ClientDataRequestFlag } from './flags/ClientDataRequestFlag';
import { SimConnectConstants } from './SimConnectConstants';
import Timeout = NodeJS.Timeout;
import { SimConnectPacketBuilder } from './SimConnectPacketBuilder';
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
    RecvFacilityData,
    RecvFacilityDataEnd,
    RecvFacilityMinimalList,
    RecvEventEx1,
    RecvJetwayData,
} from './recv';
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
    jetwayData: (recvJetwayData: RecvJetwayData) => void;
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

    private readonly _ourProtocol: Protocol;

    _clientSocket: SimConnectSocket;

    private _openTimeout: null | Timeout;

    private _packetsSent: number;

    private packetDataBuffer = new RawBuffer(256);

    constructor(appName: string, protocolVersion: Protocol) {
        super();
        this._appName = appName;
        this._packetsSent = 0;
        this._ourProtocol = protocolVersion;

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

    public once<U extends keyof SimConnectRecvEvents>(
        event: U,
        listener: SimConnectRecvEvents[U]
    ): this {
        return super.once(event, listener);
    }

    public removeListener<U extends keyof SimConnectRecvEvents>(
        event: U,
        listener: SimConnectRecvEvents[U]
    ): this {
        return super.removeListener(event, listener);
    }

    public removeAllListeners<U extends keyof SimConnectRecvEvents>(event: U): this {
        return super.removeAllListeners(event);
    }

    public off = this.removeListener;

    public addListener = this.on;

    public emit<U extends keyof SimConnectRecvEvents>(
        event: U,
        ...args: Parameters<SimConnectRecvEvents[U]>
    ): boolean {
        return super.emit(event, ...args);
    }

    connect(options?: ConnectionOptions): void {
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

    // eslint-disable-next-line
    requestResponseTimes(nCount: number) {
        // TODO: implement simconnect function
        // this one needs special care: it send a packet (id 0x03, one param : nCount)
        // and receive 8 float data (with response id 0x00010001) . Some calculations
        // has to be done
        throw Error(SimConnectError.Unimplemented);
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    mapClientEventToSimEvent(clientEventId: ClientEventId, eventName?: string): number {
        return this._buildAndSend(
            this._beginPacket(0x04)
                .putInt32(clientEventId)
                .putString256(eventName || '')
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    transmitClientEvent(
        objectId: ObjectId,
        clientEventId: ClientEventId,
        data: number,
        notificationGroupId: NotificationGroupId,
        flags: EventFlag
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x05)
                .putInt32(objectId)
                .putInt32(clientEventId)
                .putInt32(data)
                .putInt32(notificationGroupId)
                .putInt32(flags)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    setSystemEventState(clientEventId: ClientEventId, state: boolean): number {
        return this._buildAndSend(
            this._beginPacket(0x06)
                .putInt32(clientEventId)
                .putInt32(state ? 1 : 0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    addClientEventToNotificationGroup(
        notificationGroupId: NotificationGroupId,
        clientEventId: ClientEventId,
        maskable: boolean
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x07)
                .putInt32(notificationGroupId)
                .putInt32(clientEventId)
                .putInt32(maskable ? 1 : 0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    removeClientEvent(
        notificationGroupId: NotificationGroupId,
        clientEventId: ClientEventId
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x08) //
                .putInt32(notificationGroupId)
                .putInt32(clientEventId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    setNotificationGroupPriority(
        notificationGroupId: NotificationGroupId,
        priority: NotificationPriority
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x09) //
                .putInt32(notificationGroupId)
                .putInt32(priority)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    clearNotificationGroup(notificationGroupId: NotificationGroupId): number {
        return this._buildAndSend(
            this._beginPacket(0x0a) //
                .putInt32(notificationGroupId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestNotificationGroup(
        notificationGroupId: NotificationGroupId,
        reserved: number,
        flags: number
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x0b) //
                .putInt32(notificationGroupId)
                .putInt32(reserved)
                .putInt32(flags)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    addToDataDefinition(
        dataDefinitionId: DataDefinitionId,
        datumName: string,
        unitsName: string | null,
        dataType?: SimConnectDataType,
        epsilon?: number,
        datumId?: number
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x0c)
                .putInt32(dataDefinitionId)
                .putString256(datumName)
                .putString256(unitsName)
                .putInt32(dataType === undefined ? SimConnectDataType.FLOAT64 : dataType)
                .putFloat32(epsilon || 0)
                .putInt32(datumId === undefined ? SimConnectConstants.UNUSED : datumId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    clearDataDefinition(dataDefinitionId: DataDefinitionId): number {
        return this._buildAndSend(
            this._beginPacket(0x0d) //
                .putInt32(dataDefinitionId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestDataOnSimObject(
        dataRequestId: DataRequestId,
        dataDefinitionId: DataDefinitionId,
        objectId: ObjectId,
        period: SimConnectPeriod,
        flags?: DataRequestFlag,
        origin?: number,
        interval?: number,
        limit?: number
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x0e)
                .putInt32(dataRequestId)
                .putInt32(dataDefinitionId)
                .putInt32(objectId)
                .putInt32(period)
                .putInt32(flags || 0)
                .putInt32(origin || 0)
                .putInt32(interval || 0)
                .putInt32(limit || 0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestDataOnSimObjectType(
        dataRequestId: DataRequestId,
        dataDefinitionId: DataDefinitionId,
        radiusMeters: number,
        type: SimObjectType
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x0f)
                .putInt32(dataRequestId)
                .putInt32(dataDefinitionId)
                .putInt32(radiusMeters)
                .putInt32(type)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    setDataOnSimObject(
        dataDefinitionId: DataDefinitionId,
        objectId: ObjectId,
        data: { buffer: RawBuffer; arrayCount: number; tagged: boolean } | SimConnectData[]
    ): number {
        const packet = this._beginPacket(0x10) //
            .putInt32(dataDefinitionId)
            .putInt32(objectId);

        if (data instanceof Array) {
            packet
                .putInt32(DataSetFlag.DEFAULT) //
                .putInt32(data.length) //
                .putInt32(0); // Just a placeholder for array unit size

            const arrayStartPos = packet.getRawBuffer().getOffset();

            data.forEach(simConnectData => {
                simConnectData.writeTo(packet);
            });

            const arrayTotalSize = packet.getRawBuffer().getOffset() - arrayStartPos;
            const unitSize = arrayTotalSize / data.length;
            packet.putInt32(unitSize, arrayStartPos - 4); // Replace placeholder
        } else {
            const { tagged, arrayCount, buffer } = data;
            const bytes = buffer.getBuffer();
            packet
                .putInt32(tagged ? DataSetFlag.TAGGED : DataSetFlag.DEFAULT)
                .putInt32(arrayCount === 0 ? 1 : arrayCount)
                .putInt32(bytes.length)
                .putBytes(bytes);
        }

        return this._buildAndSend(packet);
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    mapInputEventToClientEvent(
        inputGroupId: InputGroupId,
        inputDefinition: string,
        clientEventDownID: ClientEventId,
        downValue?: number,
        clientEventUpID?: ClientEventId,
        upValue?: number,
        maskable?: boolean
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x11)
                .putInt32(inputGroupId)
                .putString256(inputDefinition)
                .putInt32(clientEventDownID)
                .putInt32(downValue || 0)
                .putInt32(
                    clientEventUpID === undefined ? SimConnectConstants.UNUSED : clientEventUpID
                )
                .putInt32(upValue || 0)
                .putInt32(maskable ? 1 : 0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    setInputGroupPriority(inputGroupId: InputGroupId, priority: NotificationPriority): number {
        return this._buildAndSend(
            this._beginPacket(0x12) //
                .putInt32(inputGroupId)
                .putInt32(priority)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    removeInputEvent(inputGroupId: InputGroupId, inputDefinition: string): number {
        return this._buildAndSend(
            this._beginPacket(0x13) //
                .putInt32(inputGroupId)
                .putString256(inputDefinition)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    clearInputGroup(inputGroupId: InputGroupId): number {
        return this._buildAndSend(
            this._beginPacket(0x14) //
                .putInt32(inputGroupId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    setInputGroupState(inputGroupId: InputGroupId, state: boolean): number {
        return this._buildAndSend(
            this._beginPacket(0x15)
                .putInt32(inputGroupId)
                .putInt32(state ? 1 : 0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestReservedKey(
        clientEventId: ClientEventId,
        keyChoice1?: string,
        keyChoice2?: string,
        keyChoice3?: string
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x16)
                .putInt32(clientEventId)
                .putString(keyChoice1 || '', 30)
                .putString(keyChoice2 || '', 30)
                .putString(keyChoice3 || '', 30)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    subscribeToSystemEvent(clientEventId: ClientEventId, eventName: string): number {
        return this._buildAndSend(
            this._beginPacket(0x17) //
                .putInt32(clientEventId)
                .putString256(eventName)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    unsubscribeFromSystemEvent(clientEventId: ClientEventId): number {
        return this._buildAndSend(
            this._beginPacket(0x18) //
                .putInt32(clientEventId)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherRequestInterpolatedObservation(
        dataRequestId: DataRequestId,
        lat: number,
        lon: number,
        alt: number
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x19)
                .putInt32(dataRequestId)
                .putFloat32(lat)
                .putFloat32(lon)
                .putFloat32(alt)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherRequestObservationAtStation(dataRequestId: DataRequestId, ICAO: string): number {
        return this._buildAndSend(
            this._beginPacket(0x1a) //
                .putInt32(dataRequestId)
                .putString(ICAO, 5)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherRequestObservationAtNearestStation(
        dataRequestId: DataRequestId,
        lat: number,
        lon: number
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x1b) //
                .putInt32(dataRequestId)
                .putFloat32(lat)
                .putFloat32(lon)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherCreateStation(
        dataRequestId: DataRequestId,
        ICAO: string,
        name: string,
        lat: number,
        lon: number,
        alt: number
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x1c)
                .putInt32(dataRequestId)
                .putString(ICAO, 5)
                .putString256(name)
                .putFloat32(lat)
                .putFloat32(lon)
                .putFloat32(alt)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherRemoveStation(dataRequestId: DataRequestId, ICAO: string): number {
        return this._buildAndSend(
            this._beginPacket(0x1d) //
                .putInt32(dataRequestId)
                .putString(ICAO, 5)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherSetObservation(seconds: number, metar: string): number {
        return this._buildAndSend(
            this._beginPacket(0x1e) //
                .putInt32(seconds)
                .putString(metar)
                .putByte(0)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherSetModeServer(port: number, seconds: number): number {
        return this._buildAndSend(
            this._beginPacket(0x1f) //
                .putInt32(port)
                .putInt32(seconds)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherSetModeTheme(themeName: string): number {
        return this._buildAndSend(
            this._beginPacket(0x20) //
                .putString256(themeName)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherSetModeGlobal(): number {
        return this._buildAndSend(this._beginPacket(0x21));
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherSetModeCustom(): number {
        return this._buildAndSend(this._beginPacket(0x22));
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherSetDynamicUpdateRate(rate: number): number {
        return this._buildAndSend(
            this._beginPacket(0x23) //
                .putInt32(rate)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
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
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x24)
                .putInt32(dataRequestId)
                .putFloat32(minLat)
                .putFloat32(minLon)
                .putFloat32(minAlt)
                .putFloat32(maxLat)
                .putFloat32(maxLon)
                .putFloat32(maxAlt)
                .putInt32(flags || 0)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
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
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x25)
                .putInt32(dataRequestId)
                .putFloat32(lat)
                .putFloat32(lon)
                .putFloat32(alt)
                .putFloat32(radius)
                .putFloat32(height)
                .putFloat32(coreRate)
                .putFloat32(coreTurbulence)
                .putFloat32(sinkRate)
                .putFloat32(sinkTurbulence)
                .putFloat32(coreSize)
                .putFloat32(coreTransitionSize)
                .putFloat32(sinkLayerSize)
                .putFloat32(sinkTransitionSize)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherRemoveThermal(objectId: ObjectId): number {
        return this._buildAndSend(
            this._beginPacket(0x26) //
                .putInt32(objectId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    aICreateParkedATCAircraft(
        containerTitle: string,
        tailNumber: string,
        airportID: string,
        dataRequestId: DataRequestId
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x27)
                .putString256(containerTitle)
                .putString(tailNumber, 12)
                .putString(airportID, 5)
                .putInt32(dataRequestId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    aICreateEnrouteATCAircraft(
        containerTitle: string,
        tailNumber: string,
        flightNumber: number,
        flightPlanPath: string,
        flightPlanPosition: number,
        touchAndGo: boolean,
        dataRequestId: DataRequestId
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x28)
                .putString256(containerTitle)
                .putString(tailNumber, 12)
                .putInt32(flightNumber)
                .putString(flightPlanPath, 260)
                .putFloat64(flightPlanPosition)
                .putInt32(touchAndGo ? 1 : 0)
                .putInt32(dataRequestId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    aICreateNonATCAircraft(
        containerTitle: string,
        tailNumber: string,
        initPos: InitPosition,
        dataRequestId: DataRequestId
    ): number {
        const packet = this._beginPacket(0x29)
            .putString256(containerTitle)
            .putString(tailNumber, 12);

        initPos.writeTo(packet);
        packet.putInt32(dataRequestId);

        return this._buildAndSend(packet);
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    aICreateSimulatedObject(
        containerTitle: string,
        initPos: InitPosition,
        dataRequestId: DataRequestId
    ): number {
        const packet = this._beginPacket(0x2a);

        packet.putString256(containerTitle);
        initPos.writeTo(packet);
        packet.putInt32(dataRequestId);

        return this._buildAndSend(packet);
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    aIReleaseControl(objectId: ObjectId, dataRequestId: DataRequestId): number {
        return this._buildAndSend(
            this._beginPacket(0x2b) //
                .putInt32(objectId)
                .putInt32(dataRequestId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    aIRemoveObject(objectId: ObjectId, dataRequestId: DataRequestId): number {
        return this._buildAndSend(
            this._beginPacket(0x2c) //
                .putInt32(objectId)
                .putInt32(dataRequestId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    aISetAircraftFlightPlan(
        objectId: ObjectId,
        flightPlanPath: string,
        dataRequestId: DataRequestId
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x2d)
                .putInt32(objectId)
                .putString(flightPlanPath, 260)
                .putInt32(dataRequestId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    executeMissionAction(guidInstanceId: Buffer): number {
        if (guidInstanceId.length !== 16) throw Error(SimConnectError.GuidInvalidSize);

        return this._buildAndSend(
            this._beginPacket(0x2e) //
                .putBytes(guidInstanceId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    completeCustomMissionAction(guidInstanceId: Buffer): number {
        if (guidInstanceId.length !== 16) throw Error(SimConnectError.GuidInvalidSize); // $NON-NLS-1$

        return this._buildAndSend(
            this._beginPacket(0x2f) //
                .putBytes(guidInstanceId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    cameraSetRelative6DOF(
        deltaX: number,
        deltaY: number,
        deltaZ: number,
        pitchDeg: number,
        bankDeg: number,
        headingDeg: number
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x30)
                .putFloat32(deltaX)
                .putFloat32(deltaY)
                .putFloat32(deltaZ)
                .putFloat32(pitchDeg)
                .putFloat32(bankDeg)
                .putFloat32(headingDeg)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    menuAddItem(menuItem: string, menuEventId: ClientEventId, data: number): number {
        return this._buildAndSend(
            this._beginPacket(0x31) //
                .putString256(menuItem)
                .putInt32(menuEventId)
                .putInt32(data)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    menuDeleteItem(menuEventId: ClientEventId): number {
        return this._buildAndSend(
            this._beginPacket(0x32) //
                .putInt32(menuEventId)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    menuAddSubItem(
        menuEventId: ClientEventId,
        menuItem: string,
        subMenuEventId: ClientEventId,
        data: number
    ) {
        return this._buildAndSend(
            this._beginPacket(0x33)
                .putInt32(menuEventId)
                .putString256(menuItem)
                .putInt32(subMenuEventId)
                .putInt32(data)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    menuDeleteSubItem(menuEventId: ClientEventId, subMenuEventId: ClientEventId): number {
        return this._buildAndSend(
            this._beginPacket(0x34) //
                .putInt32(menuEventId)
                .putInt32(subMenuEventId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestSystemState(dataRequestId: DataRequestId, state: string): number {
        return this._buildAndSend(
            this._beginPacket(0x35) //
                .putInt32(dataRequestId)
                .putString256(state)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    setSystemState(
        state: string,
        paramInt: number,
        paramFloat: number,
        paramString: string
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x36)
                .putString256(state)
                .putInt32(paramInt)
                .putFloat32(paramFloat)
                .putString256(paramString)
                .putInt32(0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    mapClientDataNameToID(clientDataName: string, clientDataId: ClientDataId): number {
        return this._buildAndSend(
            this._beginPacket(0x37) //
                .putString256(clientDataName)
                .putInt32(clientDataId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    createClientData(clientDataId: ClientDataId, size: number, readOnly: boolean): number {
        return this._buildAndSend(
            this._beginPacket(0x38)
                .putInt32(clientDataId)
                .putInt32(size)
                .putInt32(readOnly ? 1 : 0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    addToClientDataDefinition(
        dataDefinitionId: DataDefinitionId,
        offset: number,
        sizeOrType: number,
        epsilon?: number,
        datumId?: number
    ): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        return this._buildAndSend(
            this._beginPacket(0x39)
                .putInt32(dataDefinitionId)
                .putInt32(offset)
                .putInt32(sizeOrType)
                .putFloat32(epsilon || 0)
                .putInt32(datumId || 0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    clearClientDataDefinition(dataDefinitionId: DataDefinitionId): number {
        return this._buildAndSend(
            this._beginPacket(0x3a) //
                .putInt32(dataDefinitionId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestClientData<O extends number, I extends number, L extends number>(
        clientDataId: ClientDataId,
        dataRequestId: DataRequestId,
        clientDataDefineID: ClientDataDefinitionId,
        period: ClientDataPeriod,
        flags: ClientDataRequestFlag,
        origin?: O,
        interval?: I,
        limit?: L
    ): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        return this._buildAndSend(
            this._beginPacket(0x3b)
                .putInt32(clientDataId)
                .putInt32(dataRequestId)
                .putInt32(clientDataDefineID)
                .putInt32(period)
                .putInt32(flags)
                .putInt32(origin || 0)
                .putInt32(interval || 0)
                .putInt32(limit || 0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    setClientData(
        clientDataId: ClientDataId,
        clientDataDefineID: ClientDataDefinitionId,
        reserved: number,
        arrayCount: number,
        unitSize: number,
        data: Buffer
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x3c)
                .putInt32(clientDataId)
                .putInt32(clientDataDefineID)
                .putInt32(0) // do not use arg
                .putInt32(1) // do not use arg
                // TODO: add support for arrays https://github.com/mharj/jsimconnect/blob/master/src/flightsim/simconnect/SimConnect.java#L3803
                .putInt32(unitSize)
                .putBytes(data)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    flightLoad(fileName: string) {
        this._buildAndSend(
            this._beginPacket(0x3d) //
                .putString(fileName, SimConnectConstants.MAX_PATH)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    flightSave(
        fileName: string,
        title: string | null,
        description: string,
        flags?: number // eslint-disable-line
    ): number {
        // packet size 0x918 (SP1), 0xA1C (SP2)
        const packet = this._beginPacket(0x3e);

        packet.putString(fileName, SimConnectConstants.MAX_PATH);

        if (this._ourProtocol >= Protocol.FSX_SP2) {
            packet.putString(title === null ? fileName : title, SimConnectConstants.MAX_PATH);
        }

        packet.putString(description, 2048);
        packet.putInt32(SimConnectConstants.UNUSED);

        return this._buildAndSend(packet);
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    flightPlanLoad(fileName: string): number {
        return this._buildAndSend(
            this._beginPacket(0x3f) //
                .putString(fileName, SimConnectConstants.MAX_PATH)
        );
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    text(
        type: TextType,
        timeSeconds: number,
        clientEventId: ClientEventId,
        message: string
    ): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        const packet = this._beginPacket(0x40)
            .putInt32(type)
            .putFloat32(timeSeconds)
            .putInt32(clientEventId);

        if (message !== null && message.length > 0) {
            packet.putInt32(message.length + 1);
            packet.putString(message);
        } else {
            packet.putInt32(1);
        }
        packet.putByte(0);
        return this._buildAndSend(packet);
    }

    /**
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    menu(
        timeSeconds: number,
        clientEventId: ClientEventId,
        title?: string,
        prompt?: string,
        ...items: string[]
    ): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        const packet = this._beginPacket(0x40)
            .putInt32(TextType.MENU)
            .putFloat32(timeSeconds)
            .putInt32(clientEventId)
            .putInt32(0); // size, will be set later

        if (!title && !prompt && items.length === 0) {
            packet.putByte(0);
        } else if (title && prompt) {
            packet
                .putString(title) //
                .putByte(0)
                .putString(prompt)
                .putByte(0);

            items.forEach(s => {
                packet.putString(s).putByte(0);
            });
        }
        // set size
        packet.putInt32(packet.getRawBuffer().getOffset() - 32, 28);

        return this._buildAndSend(packet);
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    subscribeToFacilities(type: FacilityListType, clientEventId: ClientEventId): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        return this._buildAndSend(
            this._beginPacket(0x41) //
                .putInt32(type)
                .putInt32(clientEventId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    unSubscribeToFacilities(type: FacilityListType): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        return this._buildAndSend(
            this._beginPacket(0x42) //
                .putInt32(type)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestFacilitiesList(type: FacilityListType, clientEventId: ClientEventId): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        return this._buildAndSend(
            this._beginPacket(0x43) //
                .putInt32(type)
                .putInt32(clientEventId)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
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
    ): number {
        return this._buildAndSend(
            this._beginPacket(0x44)
                .putInt32(objectId)
                .putInt32(clientEventId)
                .putInt32(notificationGroupId)
                .putInt32(flags)
                .putInt32(data0)
                .putInt32(data1)
                .putInt32(data2)
                .putInt32(data3)
                .putInt32(data4)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    addToFacilityDefinition(dataDefinitionId: DataDefinitionId, fieldName: string): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion);

        return this._buildAndSend(
            this._beginPacket(0x45) //
                .putInt32(dataDefinitionId)
                .putString256(fieldName)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestFacilityData(
        dataDefinitionId: DataDefinitionId,
        dataRequestId: DataRequestId,
        icao: string,
        region?: string,
        type?: IcaoType
    ): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion);

        const packet = this._beginPacket(type === undefined ? 0x46 : 0x4a)
            .putInt32(dataDefinitionId)
            .putInt32(dataRequestId)
            .putString(icao, 16)
            .putString(region || '', 4);

        if (type !== undefined) {
            // SimConnect_RequestFacilityData
            packet.putString(type, 1);
        }

        return this._buildAndSend(packet);
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    subscribeToFacilitiesEx1(
        type: FacilityListType,
        newElemInRangeRequestID: DataRequestId,
        oldElemOutRangeRequestID: DataRequestId
    ): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        return this._buildAndSend(
            this._beginPacket(0x47) //
                .putInt32(type)
                .putInt32(newElemInRangeRequestID)
                .putInt32(oldElemOutRangeRequestID)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    unSubscribeToFacilitiesEx1(
        type: FacilityListType,
        unsubscribeNewInRange: boolean,
        unsubscribeOldOutRange: boolean
    ): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        return this._buildAndSend(
            this._beginPacket(0x48) //
                .putInt32(type)
                .putByte(unsubscribeNewInRange ? 1 : 0)
                .putByte(unsubscribeOldOutRange ? 1 : 0)
        );
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestFacilitiesListEx1(type: FacilityListType, clientEventId: ClientEventId): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion); // $NON-NLS-1$

        return this._buildAndSend(
            this._beginPacket(0x49) //
                .putInt32(type)
                .putInt32(clientEventId)
        );
    }

    requestJetwayData(airportIcao: string, parkingIndices?: number[]): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion);

        const packet = this._beginPacket(0x4b)
            .putString(airportIcao, 16)
            .putInt32(parkingIndices?.length || 0);

        if (parkingIndices === undefined || parkingIndices.length === 0) {
            packet.putInt32(0);
        } else {
            parkingIndices.forEach(parkingIndex => {
                packet.putInt32(parkingIndex);
            });
        }

        return this._buildAndSend(packet);
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

    private _beginPacket(packetId: number): SimConnectPacketBuilder {
        return new SimConnectPacketBuilder(packetId, this._ourProtocol, this.packetDataBuffer);
    }

    private _buildAndSend(builder: SimConnectPacketBuilder): number {
        const thisPacketId = this._packetsSent;
        this._clientSocket.write(builder.build(thisPacketId));
        this._packetsSent++;
        return thisPacketId;
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
            case RecvID.ID_JETWAY_DATA:
                this.emit('jetwayData', new RecvJetwayData(data));
                break;
        }
    }

    private _open() {
        this._openTimeout = setTimeout(() => {
            this.close();
            this.emit('error', Error('Open timeout'));
        }, 5000);

        const version = openPacketData[this._ourProtocol];
        if (!version) {
            throw Error(SimConnectError.InvalidProtocol);
        }

        this._buildAndSend(
            this._beginPacket(0x01)
                .putString256(this._appName)
                .putInt32(0)
                .putByte(0x00)
                .putString(version.alias, 3)
                .putInt32(version.major)
                .putInt32(version.minor)
                .putInt32(version.buildMajor)
                .putInt32(version.buildMinor)
        );
    }
}

export { SimConnectConnection, ConnectionOptions, SimConnectRecvEvents };
module.exports = { SimConnectConnection };
