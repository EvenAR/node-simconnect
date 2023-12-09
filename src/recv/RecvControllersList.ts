import { RawBuffer } from '../RawBuffer';
import { RecvListTemplate } from './RecvListTemplate';
import { ControllerItem } from '../datastructures/ControllerItem';

export class RecvControllersList extends RecvListTemplate {
    controllers: ControllerItem[] = [];

    constructor(data: RawBuffer) {
        super(data);

        this.controllers = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.controllers.push(new ControllerItem(data));
        }
    }
}
