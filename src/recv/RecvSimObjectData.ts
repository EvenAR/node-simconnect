import { RawBuffer } from '../RawBuffer';
import { DataRequestFlag } from '../flags/DataRequestFlag';
import { DataDefinitionId, DataRequestId, ObjectId } from '../Types';
import { readFields } from '../internal/decode';

export class RecvSimObjectData {
    requestID!: DataRequestId;

    objectID!: ObjectId;

    defineID!: DataDefinitionId;

    flags!: DataRequestFlag;

    entryNumber!: number;

    outOf!: number;

    defineCount!: number;

    data: RawBuffer;

    constructor(data: RawBuffer) {
        Object.assign(
            this,
            readFields(data, {
                requestID: buffer => buffer.readInt32() as DataRequestId,
                objectID: buffer => buffer.readInt32() as ObjectId,
                defineID: buffer => buffer.readInt32() as DataDefinitionId,
                flags: buffer => buffer.readInt32() as DataRequestFlag,
                entryNumber: buffer => buffer.readInt32(),
                outOf: buffer => buffer.readInt32(),
                defineCount: buffer => buffer.readInt32(),
            })
        );
        this.data = data;
    }
}
