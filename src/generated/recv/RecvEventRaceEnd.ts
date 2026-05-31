// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { RecvEvent } from './RecvEvent';

export class RecvEventRaceEnd extends RecvEvent {
    racerNumber: number;
    numberRacers: number;
    missionGUID: Buffer;
    playerName: string;
    sessionType: string;
    aircraft: string;
    playerRole: string;
    totalTime: number;
    penaltyTime: number;
    disqualified: boolean;

    constructor(data: RawBuffer) {
        super(data);
        this.racerNumber = data.readUint32();
        this.numberRacers = data.readUint32();
        this.missionGUID = data.readBytes(16);
        this.playerName = data.readString(260);
        this.sessionType = data.readString(260);
        this.aircraft = data.readString(260);
        this.playerRole = data.readString(260);
        this.totalTime = data.readFloat64();
        this.penaltyTime = data.readFloat64();
        this.disqualified = data.readUint32() !== 0;
    }
}
