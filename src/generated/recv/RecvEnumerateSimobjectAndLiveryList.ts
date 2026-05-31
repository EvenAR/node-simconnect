// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { RecvListTemplate } from './RecvListTemplate';
import { EnumerateSimobjectLivery } from '../datastructures/EnumerateSimobjectLivery';

export class RecvEnumerateSimobjectAndLiveryList extends RecvListTemplate {
    simobjectLiveries: EnumerateSimobjectLivery[];

    constructor(data: RawBuffer) {
        super(data);
        this.simobjectLiveries = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.simobjectLiveries.push(new EnumerateSimobjectLivery(data));
        }
    }
}
