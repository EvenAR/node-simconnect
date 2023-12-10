import { RecvListTemplate } from './RecvListTemplate';
import { RawBuffer } from '../RawBuffer';
import { InputEventDescriptor } from '../datastructures/InputEventDescriptor';

export class RecvEnumerateInputEvents extends RecvListTemplate {
    inputEventDescriptors: InputEventDescriptor[] = [];

    constructor(data: RawBuffer) {
        super(data);

        this.inputEventDescriptors = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.inputEventDescriptors.push(new InputEventDescriptor(data));
        }
    }
}
