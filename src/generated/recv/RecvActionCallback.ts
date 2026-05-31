// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { RecvEvent } from './RecvEvent';

export class RecvActionCallback extends RecvEvent {
    actionID: string;
    requestID: number;

    constructor(data: RawBuffer) {
        super(data);
        this.actionID = data.readString(260);
        this.requestID = data.readUint32();
    }
}
