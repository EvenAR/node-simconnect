import { RawBuffer } from '../RawBuffer';
import { RecvEvent } from './RecvEvent';

export class RecvEventRaceEnd extends RecvEvent {
    /** The index of the racer the results are for */
    racerNumber: number;

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
        this.racerNumber = data.readInt32();
        this.numberRacers = data.readInt32();
        this.missionGUID = data.readBytes(16);
        this.playerName = data.readString(260);
        this.sessionType = data.readString(260);
        this.aircraft = data.readString(260);
        this.playerRole = data.readString(260);
        this.totalTime = data.readFloat64();
        this.penaltyTime = data.readFloat64();
        this.disqualified = data.readInt32() === 1;
    }
}
