import { RawBuffer } from '../RawBuffer';
import { RecvEvent } from './RecvEvent';

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
