// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { RecvListTemplate } from './RecvListTemplate';
import { JetwayData } from '../datastructures/JetwayData';

export class RecvJetwayData extends RecvListTemplate {
    jetways: JetwayData[];

    constructor(data: RawBuffer) {
        super(data);
        this.jetways = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.jetways.push(new JetwayData(data));
        }
    }
}
