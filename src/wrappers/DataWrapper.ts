import ByteBuffer = require('bytebuffer');
import InitPosition from '../data/InitPosition';
import SimConnectData from '../data/SimConnectData';
import MarkerState from '../data/MarkerState';
import Waypoint from '../data/Waypoint';
import LatLonAlt from '../data/LatLonAlt';
import XYZ from '../data/XYZ';

class DataWrapper {
    private readonly buffer: ByteBuffer;

    constructor(b: Buffer | number) {
        if (typeof b === 'number') {
            this.buffer = ByteBuffer.allocate(b).LE(true);
        } else {
            this.buffer = ByteBuffer.wrap(b).LE(true);
        }
    }

    clear() {
        this.buffer.clear();
    }
    setOffset(offset: number) {
        this.buffer.offset = offset;
    }
    flip() {
        this.buffer.flip();
    }

    getOffset(): number {
        return this.buffer.offset;
    }

    getBuffer(): Buffer {
        this.buffer.flip();
        return this.buffer.toBuffer(true);
    }
    write(bytes: Buffer) {
        this.buffer.append(bytes);
    }
    writeByte(byte: number) {
        this.buffer.writeByte(byte);
    }
    readBytes(length: number): Buffer {
        const bytes = this.buffer.readBytes(length).copy();
        return bytes.toBuffer();
    }
    readInt(): number {
        return this.buffer.readInt32();
    }
    writeInt(value: number, offset?: number) {
        this.buffer.writeInt32(value, offset);
    }
    readLong(): Long {
        return this.buffer.readInt64();
    }
    writeLong(value: number) {
        this.buffer.writeInt64(value);
    }
    readFloat(): number {
        return this.buffer.readFloat32();
    }
    writeFloat(value: number) {
        this.buffer.writeFloat32(value);
    }
    readDouble() {
        return this.buffer.readFloat64();
    }
    writeDouble(value: number) {
        this.buffer.writeFloat64(value);
    }
    writeString(value: string, fixedLength?: number) {
        putString(this.buffer, value, fixedLength || value.length);
    }
    readString8() {
        return makeString(this.buffer, 8);
    }
    writeString8(value: string) {
        putString(this.buffer, value, 8);
    }
    writeString30(value: string) {
        putString(this.buffer, value, 30);
    }
    readString32() {
        return makeString(this.buffer, 32);
    }
    writeString32(value: string) {
        putString(this.buffer, value, 32);
    }
    readString64() {
        return makeString(this.buffer, 64);
    }
    writeString64(value: string) {
        putString(this.buffer, value, 64);
    }
    readString128() {
        return makeString(this.buffer, 128);
    }
    writeString128(value: string) {
        putString(this.buffer, value, 128);
    }
    readString256() {
        return makeString(this.buffer, 256);
    }
    writeString256(value: string | null) {
        putString(this.buffer, value, 256);
    }
    readString260() {
        return makeString(this.buffer, 260);
    }
    writeString260(value: string) {
        putString(this.buffer, value, 260);
    }
    readStringV() {
        const offset = this.buffer.offset;
        let strLen = 0;
        while (this.buffer.offset < this.buffer.limit) {
            strLen++;
            if (this.buffer.readByte() === 0) break;
        }
        this.buffer.offset -= strLen;
        return makeString(this.buffer, strLen);
    }
    readString(length: number) {
        return makeString(this.buffer, length);
    }
    getData<T extends SimConnectData>(obj: T, offset?: number): T {
        obj.read(this);
        return obj;
    }
    readInitPosition(): InitPosition {
        return this.getData(new InitPosition());
    }
    readMarkerState(): MarkerState {
        return this.getData(new MarkerState());
    }
    readWaypoint(): Waypoint {
        return this.getData(new Waypoint());
    }
    readLatLonAlt(): LatLonAlt {
        return this.getData(new LatLonAlt());
    }
    readXYZ(): XYZ {
        return this.getData(new XYZ());
    }
    remaining() {
        return this.buffer.remaining();
    }
}

function makeString(bf: ByteBuffer, maxLength: number) {
    const length = bf.buffer
        .slice(bf.offset, bf.offset + maxLength)
        .indexOf(0x00);
    const output = bf.readString(length);
    bf.skip(maxLength - length);
    return output;
}

function putString(bf: ByteBuffer, s: string | null, fixed: number) {
    if (s === null) s = '';
    bf.writeString(s);
    if (s.length < fixed) {
        for (let i = 0; i < fixed - s.length; i++) {
            bf.writeByte(0x00);
        }
    }
}

export default DataWrapper;
