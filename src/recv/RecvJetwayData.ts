import { RecvListTemplate } from './RecvListTemplate';
import { JetwayData } from '../datastructures/JetwayData';
import { RawBuffer } from '../RawBuffer';

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
