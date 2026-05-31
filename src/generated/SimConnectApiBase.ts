// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { EventEmitter } from 'events';
import { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';
import { RawBuffer } from '../RawBuffer';
import { CameraDataMask } from './enums/CameraDataMask';
import { CameraFlag } from './enums/CameraFlag';
import { ClientDataPeriod } from './enums/ClientDataPeriod';
import { CommBusBroadcastTo } from './enums/CommBusBroadcastTo';
import { DataSetFlag } from './enums/DataSetFlag';
import { FacilityListType } from './enums/FacilityListType';
import { NotificationPriority } from './enums/NotificationPriority';
import { PositionReferential } from './enums/PositionReferential';
import { Protocol } from './enums/Protocol';
import { SimConnectDataType } from './enums/SimConnectDataType';
import { SimConnectPeriod } from './enums/SimConnectPeriod';
import { SimObjectType } from './enums/SimObjectType';
import { TextType } from './enums/TextType';
import { CameraData } from './dto/CameraData';
import { InitPosition } from './dto/InitPosition';
import { SimConnectConstants } from './SimConnectConstants';

const BAD_VERSION = 'Unsupported protocol version';

export abstract class SimConnectApiBase extends EventEmitter {
    protected abstract _ourProtocol: Protocol;
    protected abstract _beginPacket(packetId: number): SimConnectPacketBuilder;
    protected abstract _buildAndSend(builder: SimConnectPacketBuilder): number;

    abstract weatherSetObservation(seconds: number, metar: string): number;

    abstract executeMissionAction(guidInstanceId: Buffer): number;

    abstract completeCustomMissionAction(guidInstanceId: Buffer): number;

    abstract setClientData(
        clientDataId: number,
        clientDataDefineID: number,
        reserved: number,
        arrayCount: number,
        unitSize: number,
        data: Buffer
    ): number;

    abstract flightSave(
        fileName: string,
        title: string | null,
        description: string,
        flags?: number
    ): number;

    abstract text(
        type: TextType,
        timeSeconds: number,
        clientEventId: number,
        message: string
    ): number;

    abstract menu(
        timeSeconds: number,
        clientEventId: number,
        title?: string,
        prompt?: string,
        ...items: string[]
    ): number;

    abstract requestJetwayData(airportIcao: string, parkingIndices?: number[]): number;

    abstract executeAction(dataRequestID: number, actionID: string, values: RawBuffer): number;

    abstract setInputEvent(inputEventHashID: bigint, value: number | string): number;

    abstract addFacilityDataDefinitionFilter(
        dataDefinitionId: number,
        filterPath: string,
        filterData: RawBuffer | null
    ): number;

    abstract callCommBusEvent(
        eventName: string,
        broadcastTo: CommBusBroadcastTo,
        payload: string
    ): number;

    mapClientEventToSimEvent(clientEventId: number, eventName = ''): number {
        const packet = this._beginPacket(4);
        packet.putUint32(clientEventId);
        packet.putString256(eventName);
        return this._buildAndSend(packet);
    }

    transmitClientEvent(
        objectId: number,
        clientEventId: number,
        data: number,
        notificationGroupId: number,
        flags: number
    ): number {
        const packet = this._beginPacket(5);
        packet.putUint32(objectId);
        packet.putUint32(clientEventId);
        packet.putUint32(data);
        packet.putUint32(notificationGroupId);
        packet.putUint32(flags);
        return this._buildAndSend(packet);
    }

    setSystemEventState(clientEventId: number, state: boolean): number {
        const packet = this._beginPacket(6);
        packet.putUint32(clientEventId);
        packet.putUint32(state ? 1 : 0);
        return this._buildAndSend(packet);
    }

    addClientEventToNotificationGroup(
        notificationGroupId: number,
        clientEventId: number,
        maskable: boolean
    ): number {
        const packet = this._beginPacket(7);
        packet.putUint32(notificationGroupId);
        packet.putUint32(clientEventId);
        packet.putUint32(maskable ? 1 : 0);
        return this._buildAndSend(packet);
    }

    removeClientEvent(notificationGroupId: number, clientEventId: number): number {
        const packet = this._beginPacket(8);
        packet.putUint32(notificationGroupId);
        packet.putUint32(clientEventId);
        return this._buildAndSend(packet);
    }

    setNotificationGroupPriority(
        notificationGroupId: number,
        priority: NotificationPriority
    ): number {
        const packet = this._beginPacket(9);
        packet.putUint32(notificationGroupId);
        packet.putUint32(priority);
        return this._buildAndSend(packet);
    }

    clearNotificationGroup(notificationGroupId: number): number {
        const packet = this._beginPacket(0xa);
        packet.putUint32(notificationGroupId);
        return this._buildAndSend(packet);
    }

    requestNotificationGroup(notificationGroupId: number, reserved: number, flags: number): number {
        const packet = this._beginPacket(0xb);
        packet.putUint32(notificationGroupId);
        packet.putUint32(reserved);
        packet.putUint32(flags);
        return this._buildAndSend(packet);
    }

    addToDataDefinition(
        dataDefinitionId: number,
        datumName: string,
        unitsName: string | null,
        dataType = SimConnectDataType.FLOAT64,
        epsilon = 0,
        datumId = SimConnectConstants.UNUSED
    ): number {
        const packet = this._beginPacket(0xc);
        packet.putUint32(dataDefinitionId);
        packet.putString256(datumName);
        packet.putString256(unitsName);
        packet.putUint32(dataType);
        packet.putFloat32(epsilon);
        packet.putUint32(datumId);
        return this._buildAndSend(packet);
    }

    clearDataDefinition(dataDefinitionId: number): number {
        const packet = this._beginPacket(0xd);
        packet.putUint32(dataDefinitionId);
        return this._buildAndSend(packet);
    }

    requestDataOnSimObject(
        dataRequestId: number,
        dataDefinitionId: number,
        objectId: number,
        period: SimConnectPeriod,
        flags = 0,
        origin = 0,
        interval = 0,
        limit = 0
    ): number {
        const packet = this._beginPacket(0xe);
        packet.putUint32(dataRequestId);
        packet.putUint32(dataDefinitionId);
        packet.putUint32(objectId);
        packet.putUint32(period);
        packet.putUint32(flags);
        packet.putUint32(origin);
        packet.putUint32(interval);
        packet.putUint32(limit);
        return this._buildAndSend(packet);
    }

    requestDataOnSimObjectType(
        dataRequestId: number,
        dataDefinitionId: number,
        radiusMeters: number,
        type: SimObjectType
    ): number {
        const packet = this._beginPacket(0xf);
        packet.putUint32(dataRequestId);
        packet.putUint32(dataDefinitionId);
        packet.putUint32(radiusMeters);
        packet.putUint32(type);
        return this._buildAndSend(packet);
    }

    setDataOnSimObject(
        dataDefinitionId: number,
        objectId: number,
        flags: DataSetFlag,
        arrayCount: number,
        cbUnitSize: number,
        data: Buffer
    ): number {
        const packet = this._beginPacket(0x10);
        packet.putUint32(dataDefinitionId);
        packet.putUint32(objectId);
        packet.putUint32(flags);
        packet.putUint32(arrayCount);
        packet.putUint32(cbUnitSize);
        packet.putBytes(data);
        return this._buildAndSend(packet);
    }

    mapInputEventToClientEvent(
        inputGroupId: number,
        inputDefinition: string,
        clientEventDownID: number,
        downValue = 0,
        clientEventUpID = SimConnectConstants.UNUSED,
        upValue = 0,
        maskable = false
    ): number {
        const packet = this._beginPacket(0x11);
        packet.putUint32(inputGroupId);
        packet.putString256(inputDefinition);
        packet.putUint32(clientEventDownID);
        packet.putUint32(downValue);
        packet.putUint32(clientEventUpID);
        packet.putUint32(upValue);
        packet.putUint32(maskable ? 1 : 0);
        return this._buildAndSend(packet);
    }

    setInputGroupPriority(inputGroupId: number, priority: NotificationPriority): number {
        const packet = this._beginPacket(0x12);
        packet.putUint32(inputGroupId);
        packet.putUint32(priority);
        return this._buildAndSend(packet);
    }

    removeInputEvent(inputGroupId: number, inputDefinition: string): number {
        const packet = this._beginPacket(0x13);
        packet.putUint32(inputGroupId);
        packet.putString256(inputDefinition);
        return this._buildAndSend(packet);
    }

    clearInputGroup(inputGroupId: number): number {
        const packet = this._beginPacket(0x14);
        packet.putUint32(inputGroupId);
        return this._buildAndSend(packet);
    }

    setInputGroupState(inputGroupId: number, state: boolean): number {
        const packet = this._beginPacket(0x15);
        packet.putUint32(inputGroupId);
        packet.putUint32(state ? 1 : 0);
        return this._buildAndSend(packet);
    }

    requestReservedKey(
        clientEventId: number,
        keyChoice1 = '',
        keyChoice2 = '',
        keyChoice3 = ''
    ): number {
        const packet = this._beginPacket(0x16);
        packet.putUint32(clientEventId);
        packet.putString(keyChoice1, 30);
        packet.putString(keyChoice2, 30);
        packet.putString(keyChoice3, 30);
        return this._buildAndSend(packet);
    }

    subscribeToSystemEvent(clientEventId: number, eventName: string): number {
        const packet = this._beginPacket(0x17);
        packet.putUint32(clientEventId);
        packet.putString256(eventName);
        return this._buildAndSend(packet);
    }

    unsubscribeFromSystemEvent(clientEventId: number): number {
        const packet = this._beginPacket(0x18);
        packet.putUint32(clientEventId);
        return this._buildAndSend(packet);
    }

    weatherRequestInterpolatedObservation(
        dataRequestId: number,
        lat: number,
        lon: number,
        alt: number
    ): number {
        const packet = this._beginPacket(0x19);
        packet.putUint32(dataRequestId);
        packet.putFloat32(lat);
        packet.putFloat32(lon);
        packet.putFloat32(alt);
        return this._buildAndSend(packet);
    }

    weatherRequestObservationAtStation(dataRequestId: number, ICAO: string): number {
        const packet = this._beginPacket(0x1a);
        packet.putUint32(dataRequestId);
        packet.putString(ICAO, 5);
        return this._buildAndSend(packet);
    }

    weatherRequestObservationAtNearestStation(
        dataRequestId: number,
        lat: number,
        lon: number
    ): number {
        const packet = this._beginPacket(0x1b);
        packet.putUint32(dataRequestId);
        packet.putFloat32(lat);
        packet.putFloat32(lon);
        return this._buildAndSend(packet);
    }

    weatherCreateStation(
        dataRequestId: number,
        ICAO: string,
        name: string,
        lat: number,
        lon: number,
        alt: number
    ): number {
        const packet = this._beginPacket(0x1c);
        packet.putUint32(dataRequestId);
        packet.putString(ICAO, 5);
        packet.putString256(name);
        packet.putFloat32(lat);
        packet.putFloat32(lon);
        packet.putFloat32(alt);
        return this._buildAndSend(packet);
    }

    weatherRemoveStation(dataRequestId: number, ICAO: string): number {
        const packet = this._beginPacket(0x1d);
        packet.putUint32(dataRequestId);
        packet.putString(ICAO, 5);
        return this._buildAndSend(packet);
    }

    weatherSetModeServer(port: number, seconds: number): number {
        const packet = this._beginPacket(0x1f);
        packet.putUint32(port);
        packet.putUint32(seconds);
        return this._buildAndSend(packet);
    }

    weatherSetModeTheme(themeName: string): number {
        const packet = this._beginPacket(0x20);
        packet.putString256(themeName);
        return this._buildAndSend(packet);
    }

    weatherSetModeGlobal(): number {
        return this._buildAndSend(this._beginPacket(0x21));
    }

    weatherSetModeCustom(): number {
        return this._buildAndSend(this._beginPacket(0x22));
    }

    weatherSetDynamicUpdateRate(rate: number): number {
        const packet = this._beginPacket(0x23);
        packet.putUint32(rate);
        return this._buildAndSend(packet);
    }

    weatherRequestCloudState(
        dataRequestId: number,
        minLat: number,
        minLon: number,
        minAlt: number,
        maxLat: number,
        maxLon: number,
        maxAlt: number,
        flags = 0
    ): number {
        const packet = this._beginPacket(0x24);
        packet.putUint32(dataRequestId);
        packet.putFloat32(minLat);
        packet.putFloat32(minLon);
        packet.putFloat32(minAlt);
        packet.putFloat32(maxLat);
        packet.putFloat32(maxLon);
        packet.putFloat32(maxAlt);
        packet.putUint32(flags);
        return this._buildAndSend(packet);
    }

    weatherCreateThermal(
        dataRequestId: number,
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
        const packet = this._beginPacket(0x25);
        packet.putUint32(dataRequestId);
        packet.putFloat32(lat);
        packet.putFloat32(lon);
        packet.putFloat32(alt);
        packet.putFloat32(radius);
        packet.putFloat32(height);
        packet.putFloat32(coreRate);
        packet.putFloat32(coreTurbulence);
        packet.putFloat32(sinkRate);
        packet.putFloat32(sinkTurbulence);
        packet.putFloat32(coreSize);
        packet.putFloat32(coreTransitionSize);
        packet.putFloat32(sinkLayerSize);
        packet.putFloat32(sinkTransitionSize);
        return this._buildAndSend(packet);
    }

    weatherRemoveThermal(objectId: number): number {
        const packet = this._beginPacket(0x26);
        packet.putUint32(objectId);
        return this._buildAndSend(packet);
    }

    aICreateParkedATCAircraft(
        containerTitle: string,
        tailNumber: string,
        airportID: string,
        dataRequestId: number
    ): number {
        const packet = this._beginPacket(0x27);
        packet.putString256(containerTitle);
        packet.putString(tailNumber, 12);
        packet.putString(airportID, 5);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    aICreateEnrouteATCAircraft(
        containerTitle: string,
        tailNumber: string,
        flightNumber: number,
        flightPlanPath: string,
        flightPlanPosition: number,
        touchAndGo: boolean,
        dataRequestId: number
    ): number {
        const packet = this._beginPacket(0x28);
        packet.putString256(containerTitle);
        packet.putString(tailNumber, 12);
        packet.putInt32(flightNumber);
        packet.putString(flightPlanPath, 260);
        packet.putFloat64(flightPlanPosition);
        packet.putUint32(touchAndGo ? 1 : 0);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    aICreateNonATCAircraft(
        containerTitle: string,
        tailNumber: string,
        initPos: InitPosition,
        dataRequestId: number
    ): number {
        const packet = this._beginPacket(0x29);
        packet.putString256(containerTitle);
        packet.putString(tailNumber, 12);
        initPos.writeTo(packet);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    aICreateSimulatedObject(
        containerTitle: string,
        initPos: InitPosition,
        dataRequestId: number
    ): number {
        const packet = this._beginPacket(0x2a);
        packet.putString256(containerTitle);
        initPos.writeTo(packet);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    aIReleaseControl(objectId: number, dataRequestId: number): number {
        const packet = this._beginPacket(0x2b);
        packet.putUint32(objectId);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    aIRemoveObject(objectId: number, dataRequestId: number): number {
        const packet = this._beginPacket(0x2c);
        packet.putUint32(objectId);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    aISetAircraftFlightPlan(
        objectId: number,
        flightPlanPath: string,
        dataRequestId: number
    ): number {
        const packet = this._beginPacket(0x2d);
        packet.putUint32(objectId);
        packet.putString(flightPlanPath, 260);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    cameraSetRelative6DOF(
        deltaX: number,
        deltaY: number,
        deltaZ: number,
        pitchDeg: number,
        bankDeg: number,
        headingDeg: number
    ): number {
        const packet = this._beginPacket(0x30);
        packet.putFloat32(deltaX);
        packet.putFloat32(deltaY);
        packet.putFloat32(deltaZ);
        packet.putFloat32(pitchDeg);
        packet.putFloat32(bankDeg);
        packet.putFloat32(headingDeg);
        return this._buildAndSend(packet);
    }

    menuAddItem(menuItem: string, menuEventId: number, data: number): number {
        const packet = this._beginPacket(0x31);
        packet.putString256(menuItem);
        packet.putUint32(menuEventId);
        packet.putUint32(data);
        return this._buildAndSend(packet);
    }

    menuDeleteItem(menuEventId: number): number {
        const packet = this._beginPacket(0x32);
        packet.putUint32(menuEventId);
        return this._buildAndSend(packet);
    }

    menuAddSubItem(
        menuEventId: number,
        menuItem: string,
        subMenuEventId: number,
        data: number
    ): number {
        const packet = this._beginPacket(0x33);
        packet.putUint32(menuEventId);
        packet.putString256(menuItem);
        packet.putUint32(subMenuEventId);
        packet.putUint32(data);
        return this._buildAndSend(packet);
    }

    menuDeleteSubItem(menuEventId: number, subMenuEventId: number): number {
        const packet = this._beginPacket(0x34);
        packet.putUint32(menuEventId);
        packet.putUint32(subMenuEventId);
        return this._buildAndSend(packet);
    }

    requestSystemState(dataRequestId: number, state: string): number {
        const packet = this._beginPacket(0x35);
        packet.putUint32(dataRequestId);
        packet.putString256(state);
        return this._buildAndSend(packet);
    }

    setSystemState(
        state: string,
        paramInt: number,
        paramFloat: number,
        paramString: string
    ): number {
        const packet = this._beginPacket(0x36);
        packet.putString256(state);
        packet.putUint32(paramInt);
        packet.putFloat32(paramFloat);
        packet.putString256(paramString);
        packet.putUint32(0);
        return this._buildAndSend(packet);
    }

    mapClientDataNameToID(clientDataName: string, clientDataId: number): number {
        const packet = this._beginPacket(0x37);
        packet.putString256(clientDataName);
        packet.putUint32(clientDataId);
        return this._buildAndSend(packet);
    }

    createClientData(clientDataId: number, size: number, readOnly: boolean): number {
        const packet = this._beginPacket(0x38);
        packet.putUint32(clientDataId);
        packet.putUint32(size);
        packet.putUint32(readOnly ? 1 : 0);
        return this._buildAndSend(packet);
    }

    addToClientDataDefinition(
        dataDefinitionId: number,
        offset: number,
        sizeOrType: number,
        epsilon = 0,
        datumId = 0
    ): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x39);
        packet.putUint32(dataDefinitionId);
        packet.putUint32(offset);
        packet.putUint32(sizeOrType);
        packet.putFloat32(epsilon);
        packet.putUint32(datumId);
        return this._buildAndSend(packet);
    }

    clearClientDataDefinition(dataDefinitionId: number): number {
        const packet = this._beginPacket(0x3a);
        packet.putUint32(dataDefinitionId);
        return this._buildAndSend(packet);
    }

    requestClientData(
        clientDataId: number,
        dataRequestId: number,
        clientDataDefineID: number,
        period: ClientDataPeriod,
        flags: number,
        origin = 0,
        interval = 0,
        limit = 0
    ): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x3b);
        packet.putUint32(clientDataId);
        packet.putUint32(dataRequestId);
        packet.putUint32(clientDataDefineID);
        packet.putUint32(period);
        packet.putUint32(flags);
        packet.putUint32(origin);
        packet.putUint32(interval);
        packet.putUint32(limit);
        return this._buildAndSend(packet);
    }

    flightLoad(fileName: string): void {
        const packet = this._beginPacket(0x3d);
        packet.putString(fileName, 260);
        this._buildAndSend(packet);
    }

    flightPlanLoad(fileName: string): number {
        const packet = this._beginPacket(0x3f);
        packet.putString(fileName, 260);
        return this._buildAndSend(packet);
    }

    subscribeToFacilities(type: FacilityListType, clientEventId: number): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x41);
        packet.putUint32(type);
        packet.putUint32(clientEventId);
        return this._buildAndSend(packet);
    }

    unSubscribeToFacilities(type: FacilityListType): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x42);
        packet.putUint32(type);
        return this._buildAndSend(packet);
    }

    requestFacilitiesList(type: FacilityListType, clientEventId: number): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x43);
        packet.putUint32(type);
        packet.putUint32(clientEventId);
        return this._buildAndSend(packet);
    }

    transmitClientEventEx(
        objectId: number,
        clientEventId: number,
        notificationGroupId: number,
        flags: number,
        data0 = 0,
        data1 = 0,
        data2 = 0,
        data3 = 0,
        data4 = 0
    ): number {
        const packet = this._beginPacket(0x44);
        packet.putUint32(objectId);
        packet.putUint32(clientEventId);
        packet.putUint32(notificationGroupId);
        packet.putUint32(flags);
        packet.putUint32(data0);
        packet.putUint32(data1);
        packet.putUint32(data2);
        packet.putUint32(data3);
        packet.putUint32(data4);
        return this._buildAndSend(packet);
    }

    addToFacilityDefinition(dataDefinitionId: number, fieldName: string): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x45);
        packet.putUint32(dataDefinitionId);
        packet.putString256(fieldName);
        return this._buildAndSend(packet);
    }

    requestFacilityData(
        dataDefinitionId: number,
        dataRequestId: number,
        icao: string,
        region = ''
    ): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x46);
        packet.putUint32(dataDefinitionId);
        packet.putUint32(dataRequestId);
        packet.putString(icao, 16);
        packet.putString(region, 4);
        return this._buildAndSend(packet);
    }

    requestFacilityDataEx1(
        dataDefinitionId: number,
        dataRequestId: number,
        icao: string,
        region = '',
        type = ''
    ): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x4a);
        packet.putUint32(dataDefinitionId);
        packet.putUint32(dataRequestId);
        packet.putString(icao, 16);
        packet.putString(region, 4);
        packet.putString(type, 1);
        return this._buildAndSend(packet);
    }

    subscribeToFacilitiesEx1(
        type: FacilityListType,
        newElemInRangeRequestID: number,
        oldElemOutRangeRequestID: number
    ): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x47);
        packet.putUint32(type);
        packet.putUint32(newElemInRangeRequestID);
        packet.putUint32(oldElemOutRangeRequestID);
        return this._buildAndSend(packet);
    }

    unSubscribeToFacilitiesEx1(
        type: FacilityListType,
        unsubscribeNewInRange: boolean,
        unsubscribeOldOutRange: boolean
    ): number {
        if (this._ourProtocol < Protocol.FSX_SP1) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x48);
        packet.putUint32(type);
        packet.putByte(unsubscribeNewInRange ? 1 : 0);
        packet.putByte(unsubscribeOldOutRange ? 1 : 0);
        return this._buildAndSend(packet);
    }

    requestFacilitiesListEx1(type: FacilityListType, clientEventId: number): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x49);
        packet.putUint32(type);
        packet.putUint32(clientEventId);
        return this._buildAndSend(packet);
    }

    enumerateControllers(): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        return this._buildAndSend(this._beginPacket(0x4c));
    }

    mapInputEventToClientEventEx1(
        inputGroupId: number,
        inputDefinition: string,
        clientEventDownID: number,
        downValue = 0,
        clientEventUpID = SimConnectConstants.UNUSED,
        upValue = 0,
        maskable = false
    ): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x4d);
        packet.putUint32(inputGroupId);
        packet.putString256(inputDefinition);
        packet.putUint32(clientEventDownID);
        packet.putUint32(downValue);
        packet.putUint32(clientEventUpID);
        packet.putUint32(upValue);
        packet.putUint32(maskable ? 1 : 0);
        return this._buildAndSend(packet);
    }

    enumerateInputEvents(dataRequestID: number): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x4f);
        packet.putUint32(dataRequestID);
        return this._buildAndSend(packet);
    }

    getInputEvent(dataRequestID: number, inputEventHashID: bigint): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x50);
        packet.putUint32(dataRequestID);
        packet.putUint64(inputEventHashID);
        return this._buildAndSend(packet);
    }

    subscribeInputEvent(inputEventHashID: bigint): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x52);
        packet.putUint64(inputEventHashID);
        return this._buildAndSend(packet);
    }

    unsubscribeInputEvent(inputEventHashID: bigint): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x53);
        packet.putUint64(inputEventHashID);
        return this._buildAndSend(packet);
    }

    enumerateInputEventParams(inputEventHashID: bigint): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x54);
        packet.putUint64(inputEventHashID);
        return this._buildAndSend(packet);
    }

    clearAllFacilityDataDefinitionFilters(dataDefinitionId: number): number {
        if (this._ourProtocol < Protocol.KittyHawk) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x56);
        packet.putUint32(dataDefinitionId);
        return this._buildAndSend(packet);
    }

    aICreateParkedATCAircraftEx1(
        containerTitle: string,
        livery: string,
        tailNumber: string,
        airportID: string,
        dataRequestId: number
    ): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x57);
        packet.putString256(containerTitle);
        packet.putString256(livery);
        packet.putString(tailNumber, 12);
        packet.putString(airportID, 5);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    aICreateEnrouteATCAircraftEx1(
        containerTitle: string,
        livery: string,
        tailNumber: string,
        flightNumber: number,
        flightPlanPath: string,
        flightPlanPosition: number,
        touchAndGo: boolean,
        dataRequestId: number
    ): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x58);
        packet.putString256(containerTitle);
        packet.putString256(livery);
        packet.putString(tailNumber, 12);
        packet.putInt32(flightNumber);
        packet.putString(flightPlanPath, 260);
        packet.putFloat64(flightPlanPosition);
        packet.putUint32(touchAndGo ? 1 : 0);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    aICreateNonATCAircraftEx1(
        containerTitle: string,
        livery: string,
        tailNumber: string,
        initPos: InitPosition,
        dataRequestId: number
    ): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x59);
        packet.putString256(containerTitle);
        packet.putString256(livery);
        packet.putString(tailNumber, 12);
        initPos.writeTo(packet);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    aICreateSimulatedObjectEx1(
        containerTitle: string,
        livery: string,
        initPos: InitPosition,
        dataRequestId: number
    ): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x5a);
        packet.putString256(containerTitle);
        packet.putString256(livery);
        initPos.writeTo(packet);
        packet.putUint32(dataRequestId);
        return this._buildAndSend(packet);
    }

    enumerateSimObjectsAndLiveries(dataRequestId: number, type: SimObjectType): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x5b);
        packet.putUint32(dataRequestId);
        packet.putUint32(type);
        return this._buildAndSend(packet);
    }

    subscribeToFlowEvent(): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        return this._buildAndSend(this._beginPacket(0x5c));
    }

    unsubscribeToFlowEvent(): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        return this._buildAndSend(this._beginPacket(0x5d));
    }

    requestAllFacilities(dataRequestId: number, type: FacilityListType): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x5e);
        packet.putUint32(dataRequestId);
        packet.putUint32(type);
        return this._buildAndSend(packet);
    }

    cameraAcquire(clientId: string): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x5f);
        packet.putString(clientId, 2048);
        return this._buildAndSend(packet);
    }

    cameraRelease(cameraDefName: string): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x60);
        packet.putString(cameraDefName, 2048);
        return this._buildAndSend(packet);
    }

    cameraGetStatus(): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        return this._buildAndSend(this._beginPacket(0x61));
    }

    cameraSet(cameraData: CameraData, dataMask: CameraDataMask): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x62);
        cameraData.writeTo(packet);
        packet.putUint32(dataMask);
        return this._buildAndSend(packet);
    }

    cameraGet(positionReferential: PositionReferential): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x63);
        packet.putUint32(positionReferential);
        return this._buildAndSend(packet);
    }

    cameraEnableFlag(flag: CameraFlag): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x64);
        packet.putUint32(flag);
        return this._buildAndSend(packet);
    }

    cameraDisableFlag(flag: CameraFlag): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x65);
        packet.putUint32(flag);
        return this._buildAndSend(packet);
    }

    subscribeToCameraStatusUpdate(): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        return this._buildAndSend(this._beginPacket(0x66));
    }

    unsubscribeToCameraStatusUpdate(): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        return this._buildAndSend(this._beginPacket(0x67));
    }

    enumerateCameraDefinitions(): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        return this._buildAndSend(this._beginPacket(0x68));
    }

    cameraSetUsingCameraDefinition(cameraDefinition: string): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x69);
        packet.putString(cameraDefinition, 2048);
        return this._buildAndSend(packet);
    }

    subscribeToCommBusEvent(eventId: number, eventName: string): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x6a);
        packet.putUint32(eventId);
        packet.putString256(eventName);
        return this._buildAndSend(packet);
    }

    unsubscribeToCommBusEvent(eventId: number): number {
        if (this._ourProtocol < Protocol.SunRise) throw Error(BAD_VERSION);
        const packet = this._beginPacket(0x6b);
        packet.putUint32(eventId);
        return this._buildAndSend(packet);
    }
}
