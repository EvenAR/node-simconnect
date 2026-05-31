// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { RecvListTemplate } from './RecvListTemplate';
import { InputEventDescriptor } from '../datastructures/InputEventDescriptor';

export class RecvEnumerateInputEvents extends RecvListTemplate {
    inputEventDescriptors: InputEventDescriptor[];

    constructor(data: RawBuffer) {
        super(data);
        this.inputEventDescriptors = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.inputEventDescriptors.push(new InputEventDescriptor(data));
        }
    }
}
