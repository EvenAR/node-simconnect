// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { RecvListTemplate } from './RecvListTemplate';

export class RecvCommBus extends RecvListTemplate {
    eventId: number;
    data: string;

    constructor(data: RawBuffer) {
        super(data);
        this.eventId = data.readUint32();
        this.data = data.readStringV();
    }
}
