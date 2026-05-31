import { SimConnectApiBase } from './generated/SimConnectApiBase';
import { RawBuffer } from './RawBuffer';
import { autodetectServerAddress } from './connectionParameters';
import { TextType } from './enums/TextType';
import { Protocol } from './enums/Protocol';
import { RecvID, SimConnectSocket } from './SimConnectSocket';
import { SimConnectConstants } from './SimConnectConstants';
import { SimConnectPacketBuilder } from './SimConnectPacketBuilder';
import {
    RecvActionCallback,
    RecvAirportList,
    RecvAssignedObjectID,
    RecvCommBus,
    RecvCameraData,
    RecvCameraDefinitionList,
    RecvCameraStatus,
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
    RecvJetwayData,
    RecvNDBList,
    RecvOpen,
    RecvReservedKey,
    RecvSimObjectData,
    RecvSystemState,
    RecvVORList,
    RecvWaypointList,
    RecvWeatherObservation,
} from './generated/recv';
import { RecvCloudState } from './recv/RecvCloudState';
import { RecvGetInputEvent } from './recv/RecvGetInputEvent';
import { RecvSubscribeInputEvent } from './recv/RecvSubscribeInputEvent';
import { ClientDataDefinitionId, ClientDataId, ClientEventId, DataDefinitionId } from './Types';
import type { ConnectionParameters } from './connectionParameters';
import type { SimConnectMessage } from './SimConnectSocket';
import Timeout = NodeJS.Timeout;
import { CommBusBroadcastTo } from './generated/enums';

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
    [Protocol.SunRise]: {
        major: 12,
        minor: 2,
        buildMajor: 282174,
        buildMinor: 999,
        alias: 'RS',
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
    cameraData: (recvCameraData: RecvCameraData) => void;
    cameraDefinitionList: (recvCameraDefinitionList: RecvCameraDefinitionList) => void;
    cameraStatus: (recvCameraStatus: RecvCameraStatus) => void;
    commBusEvent: (recvCommBus: RecvCommBus) => void;
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

class SimConnectConnection extends SimConnectApiBase {
    private readonly _appName: string;

    protected readonly _ourProtocol: Protocol;

    _clientSocket: SimConnectSocket;

    private _openTimeout: null | Timeout;

    private _packetsSent: number;

    private readonly _packetDataBuffer = new RawBuffer(256);

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
     * @deprecated since MSFS (KittyHawk)
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    weatherSetObservation(seconds: number, metar: string): number {
        return this._buildAndSend(
            this._beginPacket(0x1e) //
                .putUint32(seconds)
                .putString(metar)
                .putByte(0)
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
                .putUint32(clientDataId)
                .putUint32(clientDataDefineID)
                .putUint32(reserved)
                .putUint32(arrayCount === 0 ? 1 : arrayCount)
                .putUint32(unitSize)
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
        packet.putUint32(SimConnectConstants.UNUSED);

        return this._buildAndSend(packet);
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
            .putUint32(type)
            .putFloat32(timeSeconds)
            .putUint32(clientEventId);

        if (message !== null && message.length > 0) {
            packet.putUint32(message.length + 1);
            packet.putString(message);
        } else {
            packet.putUint32(1);
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
            .putUint32(TextType.MENU)
            .putFloat32(timeSeconds)
            .putUint32(clientEventId)
            .putUint32(0); // size, will be set later

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
    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    requestJetwayData(airportIcao: string, parkingIndices?: number[]): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion);

        const packet = this._beginPacket(0x4b)
            .putString(airportIcao, 16)
            .putUint32(parkingIndices?.length || 0);

        if (parkingIndices === undefined || parkingIndices.length === 0) {
            packet.putUint32(0);
        } else {
            parkingIndices.forEach(parkingIndex => {
                packet.putUint32(parkingIndex);
            });
        }

        return this._buildAndSend(packet);
    }

    /**
     * See https://www.fsdeveloper.com/wiki/index.php/MSFS_Mission_Script_-_Actions
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    executeAction(dataRequestID: number, actionID: string, values: RawBuffer) {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion);

        const paramValues = values.getBuffer();

        const packet = this._beginPacket(0x4e)
            .putUint32(dataRequestID)
            .putString256(actionID)
            .putUint32(paramValues.length)
            .putBytes(paramValues);
        return this._buildAndSend(packet);
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    setInputEvent(inputEventHashID: bigint, value: number | string): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion);

        const packet = this._beginPacket(0x51).putUint64(inputEventHashID);

        if (typeof value === 'string') {
            packet.putUint32(value.length).putString(value);
        } else {
            packet.putUint32(8).putFloat64(value);
        }

        return this._buildAndSend(packet);
    }

    /**
     *
     * @param dataDefinitionId -
     * @param filterPath -
     * @param filterData - use null to remove a previously applied filter
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    addFacilityDataDefinitionFilter(
        dataDefinitionId: DataDefinitionId,
        filterPath: string,
        filterData: RawBuffer | null
    ) {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(SimConnectError.BadVersion);

        const packet = this._beginPacket(0x55).putUint32(dataDefinitionId).putString256(filterPath);

        if (filterData === null) {
            packet.putUint32(0);
        } else {
            const filterDataBuffer = filterData.getBuffer();
            packet.putUint32(filterDataBuffer.length).putBytes(filterDataBuffer);
        }

        return this._buildAndSend(packet);
    }

    /**
     *
     * @returns sendId of packet (can be used to identify packet when exception event occurs)
     */
    callCommBusEvent(eventName: string, broadcastTo: CommBusBroadcastTo, payload: string): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(SimConnectError.BadVersion);

        const packet = this._beginPacket(0x6c)
            .putString256(eventName)
            .putUint32(broadcastTo)
            .putUint32(payload.length)
            .putString(payload);
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

    protected _beginPacket(packetId: number): SimConnectPacketBuilder {
        return new SimConnectPacketBuilder(packetId, this._ourProtocol, this._packetDataBuffer);
    }

    protected _buildAndSend(builder: SimConnectPacketBuilder): number {
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
                this.emit('airportList', new RecvAirportList(data, this._ourProtocol));
                break;
            case RecvID.ID_VOR_LIST:
                this.emit('vorList', new RecvVORList(data, this._ourProtocol));
                break;
            case RecvID.ID_NDB_LIST:
                this.emit('ndbList', new RecvNDBList(data, this._ourProtocol));
                break;
            case RecvID.ID_WAYPOINT_LIST:
                this.emit('waypointList', new RecvWaypointList(data, this._ourProtocol));
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
                this.emit(
                    'facilityMinimalList',
                    new RecvFacilityMinimalList(data, this._ourProtocol)
                );
                break;
            case RecvID.ID_JETWAY_DATA:
                this.emit('jetwayData', new RecvJetwayData(data));
                break;
            case RecvID.ID_CONTROLLERS_LIST:
                this.emit('controllersList', new RecvControllersList(data));
                break;
            case RecvID.ID_ACTION_CALLBACK:
                this.emit('actionCallback', new RecvActionCallback(data));
                break;
            case RecvID.ID_ENUMERATE_INPUT_EVENTS:
                this.emit('inputEventsList', new RecvEnumerateInputEvents(data));
                break;
            case RecvID.ID_GET_INPUT_EVENT:
                this.emit('getInputEvent', new RecvGetInputEvent(data));
                break;
            case RecvID.ID_SUBSCRIBE_INPUT_EVENT:
                this.emit('subscribeInputEvent', new RecvSubscribeInputEvent(data));
                break;
            case RecvID.ID_ENUMERATE_INPUT_EVENT_PARAMS:
                this.emit('enumerateInputEventParams', new RecvEnumerateInputEventParams(data));
                break;
            case RecvID.ID_ENUMERATE_SIMOBJECT_AND_LIVERY_LIST:
                this.emit(
                    'enumerateSimobjectAndLiveryList',
                    new RecvEnumerateSimobjectAndLiveryList(data)
                );
                break;
            case RecvID.ID_FLOW_EVENT:
                this.emit('flowEvent', new RecvFlowEvent(data));
                break;
            case RecvID.ID_CAMERA_DATA:
                this.emit('cameraData', new RecvCameraData(data));
                break;
            case RecvID.ID_CAMERA_STATUS:
                this.emit('cameraStatus', new RecvCameraStatus(data));
                break;
            case RecvID.ID_CAMERA_DEFINITION_LIST:
                this.emit('cameraDefinitionList', new RecvCameraDefinitionList(data));
                break;
            case RecvID.ID_COMM_BUS:
                this.emit('commBusEvent', new RecvCommBus(data));
                break;
            case RecvID.ID_CAMERA_WORLD_LOCKER:
                // TODO
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
                .putUint32(0)
                .putByte(0x00)
                .putString(version.alias, 3)
                .putUint32(version.major)
                .putUint32(version.minor)
                .putUint32(version.buildMajor)
                .putUint32(version.buildMinor)
        );
    }
}

export { SimConnectConnection };
export type { ConnectionOptions, SimConnectRecvEvents };
