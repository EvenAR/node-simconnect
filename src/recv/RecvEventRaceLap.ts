import { RawBuffer } from "../RawBuffer";
import { RecvEvent } from "./RecvEvent";

export class RecvEventRaceLap extends RecvEvent {
    /** The index of the racer the results are for */
    lapIndex: number;

    /** The total number of racers */
    numberRacers: number;

    /** The name of the mission to execute, NULL if no mission */
    missionGUID: Buffer;

    /** The name of the player */
    playerName: string;

    /** The type of the multiplayer session: "LAN", "GAMESPY") */
    sessionType: string;

    /** The aircraft type */
    aircraft: string;

    /** The player role in the mission */
    playerRole: string;

    /** Total time in seconds, 0 means DNF */
    totalTime: number;

    /** Total penalty time in seconds */
    penaltyTime: number;

    /** non 0 - disqualified, 0 - not disqualified */
    disqualified: boolean;

    constructor(data: RawBuffer) {
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
        this.disqualified = data.readInt() === 1;
    }
}
