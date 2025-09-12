import { RecvListTemplate } from './RecvListTemplate';
import { RawBuffer } from '../RawBuffer';
import { EnumerateSimobjectLivery } from '../datastructures/EnumerateSimobjectLivery';

export class RecvEnumerateSimobjectAndLiveryList extends RecvListTemplate {
    simobjectLiveries: EnumerateSimobjectLivery[] = [];

    constructor(data: RawBuffer) {
        super(data);

        this.simobjectLiveries = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.simobjectLiveries.push(new EnumerateSimobjectLivery(data));
        }
    }
}
