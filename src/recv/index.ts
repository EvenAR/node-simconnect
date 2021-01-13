import DataWrapper from '../wrappers/DataWrapper';
import { SimObjectType } from '../enums/SimObjectType';
import { WeatherMode } from '../enums/WeatherMode';
import {
    FacilityAirport,
    FacilityNDB,
    FacilityVOR,
    FacilityWaypoint,
} from './facility';
import { SimConnectConstants } from '../SimConnectConstants';

export class RecvOpen {
    applicationName: string;
    applicationVersionMajor: number;
    applicationVersionMinor: number;
    applicationBuildMajor: number;
    applicationBuildMinor: number;
    simConnectVersionMajor: number;
    simConnectVersionMinor: number;
    simConnectBuildMajor: number;
    simConnectBuildMinor: number;
    reserved1: number;
    reserved2: number;

    constructor(data: DataWrapper) {
        this.applicationName = data.readString256();
        this.applicationVersionMajor = data.readInt();
        this.applicationVersionMinor = data.readInt();
        this.applicationBuildMajor = data.readInt();
        this.applicationBuildMinor = data.readInt();
        this.simConnectVersionMajor = data.readInt();
        this.simConnectVersionMinor = data.readInt();
        this.simConnectBuildMajor = data.readInt();
        this.simConnectBuildMinor = data.readInt();
        this.reserved1 = data.readInt();
        this.reserved2 = data.readInt();
    }
}

export class RecvException {
    exception: number;
    sendId: number;
    index: number;

    constructor(data: DataWrapper) {
        this.exception = data.readInt();
        this.sendId = data.readInt();
        this.index = data.readInt();
    }
}

export class RecvSimObjectData {
    requestID: number;
    objectID: number;
    defineID: number;
    flags: number;
    entryNumber: number;
    outOf: number;
    defineCount: number;
    data: DataWrapper;

    constructor(data: DataWrapper) {
        //data.skip(8)
        this.requestID = data.readInt();
        this.objectID = data.readInt();
        this.defineID = data.readInt();
        this.flags = data.readInt();
        this.entryNumber = data.readInt();
        this.outOf = data.readInt();
        this.defineCount = data.readInt();
        this.data = data;
    }
}

export class RecvWeatherObservation {
    requestID: number;
    metar: string;

    constructor(data: DataWrapper) {
        this.requestID = data.readInt();
        this.metar = data.readStringV();
    }
}

export class RecvSystemState {
    requestID: number;
    dataInteger: number;
    dataFloat: number;
    dataString: string;

    constructor(data: DataWrapper) {
        this.requestID = data.readInt();
        this.dataInteger = data.readInt();
        this.dataFloat = data.readFloat();
        this.dataString = data.readString(SimConnectConstants.MAX_PATH);
    }
}

export class RecvCloudState {
    requestID: number;
    arraySize: number;
    data: number[][];

    constructor(data: DataWrapper) {
        this.requestID = data.readInt();
        this.arraySize = data.readInt();
        this.data = [];
        // Read 2D-array of 64x64 bytes
        for (let i = 0; i < 64; i++) {
            this.data[i] = [...data.readBytes(64)];
        }
    }
}

export class RecvAssignedObjectID {
    requestID: number;
    objectID: number;

    constructor(data: DataWrapper) {
        this.requestID = data.readInt();
        this.objectID = data.readInt();
    }
}

export class RecvReservedKey {
    choiceReserved: string;
    reservedKey: string;

    constructor(data: DataWrapper) {
        (this.choiceReserved = data.readString(50)),
            (this.reservedKey = data.readString(30));
    }
}

export class RecvCustomAction {
    guid: Buffer;
    waitForCompletion: number;
    payload: string;

    constructor(data: DataWrapper) {
        this.guid = data.readBytes(16);
        this.waitForCompletion = data.readInt();
        this.payload = data.readString(data.remaining());
    }
}

// Facilities lists //////////////////////

export class RecvFacilitiesList {
    requestID: number;
    arraySize: number;
    entryNumber: number;
    outOf: number;

    constructor(data: DataWrapper) {
        this.requestID = data.readInt();
        this.arraySize = data.readInt();
        this.entryNumber = data.readInt();
        this.outOf = data.readInt();
    }
}

export class RecvAirportList extends RecvFacilitiesList {
    aiports: FacilityAirport[];
    constructor(data: DataWrapper) {
        super(data);
        this.aiports = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.aiports.push(new FacilityAirport(data));
        }
    }
}

export class RecvVORList extends RecvFacilitiesList {
    vors: FacilityVOR[];
    constructor(data: DataWrapper) {
        super(data);
        this.vors = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.vors.push(new FacilityVOR(data));
        }
    }
}

export class RecvNDBList extends RecvFacilitiesList {
    ndbs: FacilityNDB[];

    constructor(data: DataWrapper) {
        super(data);
        this.ndbs = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.ndbs.push(new FacilityNDB(data));
        }
    }
}

export class RecvWaypointList extends RecvFacilitiesList {
    waypoints: FacilityWaypoint[];

    constructor(data: DataWrapper) {
        super(data);
        this.waypoints = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.waypoints.push(new FacilityWaypoint(data));
        }
    }
}

// Events ///////////////////////////

export class RecvEvent {
    groupID: number;
    eventID: number;
    data: number;

    constructor(data: DataWrapper) {
        this.groupID = data.readInt();
        this.eventID = data.readInt();
        this.data = data.readInt();
    }
}

export class RecvEventWeatherMode extends RecvEvent {
    mode: WeatherMode;
    constructor(data: DataWrapper) {
        super(data);
        this.mode =
            this.data < 0 || this.data > WeatherMode.GLOBAL
                ? WeatherMode.THEME
                : this.data;
    }
}

export class RecvEventFilename extends RecvEvent {
    fileName: string;
    flags: number;
    constructor(data: DataWrapper) {
        super(data);
        this.fileName = data.readString(SimConnectConstants.MAX_PATH);
        this.flags = data.readInt();
    }
}

export class RecvEventAddRemove extends RecvEvent {
    type: SimObjectType;
    constructor(data: DataWrapper) {
        super(data);
        this.type = data.readInt();
    }
}

export class RecvEventFrame extends RecvEvent {
    frameRate: number;
    simSpeed: number;
    constructor(data: DataWrapper) {
        super(data);
        this.frameRate = data.readFloat();
        this.simSpeed = data.readFloat();
    }
}

export class RecvEventRaceEnd extends RecvEvent {
    racerNumber: number; // The index of the racer the results are for
    numberRacers: number; // The total number of racers
    missionGUID: Buffer; // The name of the mission to execute, NULL if no mission
    playerName: string; // The name of the player
    sessionType: string; // The type of the multiplayer session: "LAN", "GAMESPY")
    aircraft: string; // The aircraft type
    playerRole: string; // The player role in the mission
    totalTime: number; // Total time in seconds, 0 means DNF
    penaltyTime: number; // Total penalty time in seconds
    disqualified: boolean; // non 0 - disqualified, 0 - not disqualified

    constructor(data: DataWrapper) {
        super(data);
        this.racerNumber = data.readInt();
        this.numberRacers = data.readInt();
        this.missionGUID = data.readBytes(16);
        this.playerName = data.readString(260);
        this.sessionType = data.readString(260);
        this.aircraft = data.readString(260);
        this.playerRole = data.readString(260);
        this.totalTime = data.readDouble();
        this.penaltyTime = data.readDouble();
        this.disqualified = data.readInt() == 1;
    }
}

export class RecvEventRaceLap extends RecvEvent {
    lapIndex: number; // The index of the racer the results are for
    numberRacers: number; // The total number of racers
    missionGUID: Buffer; // The name of the mission to execute, NULL if no mission
    playerName: string; // The name of the player
    sessionType: string; // The type of the multiplayer session: "LAN", "GAMESPY")
    aircraft: string; // The aircraft type
    playerRole: string; // The player role in the mission
    totalTime: number; // Total time in seconds, 0 means DNF
    penaltyTime: number; // Total penalty time in seconds
    disqualified: boolean; // non 0 - disqualified, 0 - not disqualified

    constructor(data: DataWrapper) {
        super(data);
        this.lapIndex = data.readInt();
        this.numberRacers = data.readInt();
        this.missionGUID = data.readBytes(16);
        this.playerName = data.readString(260);
        this.sessionType = data.readString(260);
        this.aircraft = data.readString(260);
        this.playerRole = data.readString(260);
        this.totalTime = data.readDouble();
        this.penaltyTime = data.readDouble();
        this.disqualified = data.readInt() == 1;
    }
}
