import ByteBuffer = require('bytebuffer');
import { SimConnectDataType } from './enums/SimConnectDataType';
import { InitPosition } from './dto/InitPosition';
import { MarkerState } from './dto/MarkerState';
import { Waypoint } from './dto/Waypoint';
import { LatLonAlt } from './dto/LatLonAlt';
import { XYZ } from './dto/XYZ';
import { SimConnectData } from './dto/SimConnectData';
import { PBH } from './dto/PBH';
import { JavascriptDataType } from './type-helpers';

class RawBuffer {
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

    readInt32(): number {
        return this.buffer.readInt32();
    }

    readUint32(): number {
        return this.buffer.readUint32();
    }

    /** @deprecated use readInt32() instead */
    readInt = this.readInt32;

    writeInt32(value: number, offset?: number) {
        this.buffer.writeInt32(value, offset);
    }

    /** @deprecated use writeInt32() instead */
    writeInt = this.writeInt32;

    readInt64(): number {
        return this.buffer.readInt64().toNumber();
    }

    /** @deprecated use readInt64() instead */
    readLong = this.readInt64;

    writeInt64(value: number) {
        this.buffer.writeInt64(value);
    }

    /** @deprecated use writeInt64() instead */
    writeLong = this.writeInt64;

    readFloat32(): number {
        return this.buffer.readFloat32();
    }

    /** @deprecated use readFloat32() instead */
    readFloat = this.readFloat32;

    writeFloat32(value: number) {
        this.buffer.writeFloat32(value);
    }

    /** @deprecated use writeFloat32() instead */
    writeFloat = this.writeFloat32;

    readFloat64() {
        return this.buffer.readFloat64();
    }

    /** @deprecated use readFloat64() instead */
    readDouble = this.readFloat64;

    writeFloat64(value: number) {
        this.buffer.writeFloat64(value);
    }

    /** @deprecated use writeFloat64() instead */
    writeDouble = this.writeFloat64;

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
        let bytesRead = 0;
        let strLen = 0;
        let endFound = false;
        while (this.buffer.offset < this.buffer.limit) {
            const currentByte = this.buffer.readByte();
            bytesRead++;
            if (endFound && currentByte !== 0) {
                break; // Reached beginning of new value
            } else if (currentByte === 0) {
                endFound = true;
            }
            strLen++;
        }
        // Reset offset so we can read the same bytes later
        this.buffer.offset -= bytesRead;
        return makeString(this.buffer, strLen);
    }

    readString(length: number) {
        return makeString(this.buffer, length);
    }

    remaining() {
        return this.buffer.remaining();
    }

    readInitPosition(): InitPosition {
        return this.readData(new InitPosition());
    }

    readMarkerState(): MarkerState {
        return this.readData(new MarkerState());
    }

    readWaypoint(): Waypoint {
        return this.readData(new Waypoint());
    }

    readLatLonAlt(): LatLonAlt {
        return this.readData(new LatLonAlt());
    }

    readXYZ(): XYZ {
        return this.readData(new XYZ());
    }

    readData<T extends SimConnectData>(obj: T): T {
        obj.readFrom(this);
        return obj;
    }

    readPBH(): PBH {
        return this.readData(new PBH());
    }

    readSimConnectValue<T extends SimConnectDataType>(dataType: T): JavascriptDataType[T] {
        switch (dataType) {
            case SimConnectDataType.INVALID:
                return undefined as JavascriptDataType[T];
            case SimConnectDataType.INT32:
                return this.readInt32() as JavascriptDataType[T];
            case SimConnectDataType.INT64:
                return this.readInt64() as JavascriptDataType[T];
            case SimConnectDataType.FLOAT32:
                return this.readFloat32() as JavascriptDataType[T];
            case SimConnectDataType.FLOAT64:
                return this.readFloat64() as JavascriptDataType[T];
            case SimConnectDataType.STRING8:
                return this.readString8() as JavascriptDataType[T];
            case SimConnectDataType.STRING32:
                return this.readString32() as JavascriptDataType[T];
            case SimConnectDataType.STRING64:
                return this.readString64() as JavascriptDataType[T];
            case SimConnectDataType.STRING128:
                return this.readString128() as JavascriptDataType[T];
            case SimConnectDataType.STRING256:
                return this.readString256() as JavascriptDataType[T];
            case SimConnectDataType.STRING260:
                return this.readString260() as JavascriptDataType[T];
            case SimConnectDataType.STRINGV:
                return this.readStringV() as JavascriptDataType[T];
            case SimConnectDataType.INITPOSITION:
                return this.readInitPosition() as JavascriptDataType[T];
            case SimConnectDataType.MARKERSTATE:
                return this.readMarkerState() as JavascriptDataType[T];
            case SimConnectDataType.WAYPOINT:
                return this.readWaypoint() as JavascriptDataType[T];
            case SimConnectDataType.LATLONALT:
                return this.readLatLonAlt() as JavascriptDataType[T];
            case SimConnectDataType.XYZ:
                return this.readXYZ() as JavascriptDataType[T];
            case SimConnectDataType.MAX:
                return undefined as JavascriptDataType[T];
            default:
                return undefined as JavascriptDataType[T];
        }
    }

    writeSimConnectValue<T extends SimConnectDataType>(value: JavascriptDataType[T], dataType: T) {
        switch (dataType) {
            case SimConnectDataType.INVALID:
                break;
            case SimConnectDataType.INT32:
                this.writeInt32(value as number);
                break;
            case SimConnectDataType.INT64:
                this.writeInt64(value as number);
                break;
            case SimConnectDataType.FLOAT32:
                this.writeFloat32(value as number);
                break;
            case SimConnectDataType.FLOAT64:
                this.writeFloat64(value as number);
                break;
            case SimConnectDataType.STRING8:
                this.writeString8(value as string);
                break;
            case SimConnectDataType.STRING32:
                this.writeString32(value as string);
                break;
            case SimConnectDataType.STRING64:
                this.writeString64(value as string);
                break;
            case SimConnectDataType.STRING128:
                this.writeString128(value as string);
                break;
            case SimConnectDataType.STRING256:
                this.writeString256(value as string);
                break;
            case SimConnectDataType.STRING260:
                this.writeString260(value as string);
                break;
            case SimConnectDataType.STRINGV:
                this.writeString(value as string);
                break;
            default:
                // TODO: implement writing of the struct types
                throw Error(`Unhandled data type: ${dataType} (${SimConnectDataType[dataType]})`);
        }
    }
}

function makeString(bf: ByteBuffer, expectedLength: number) {
    const content = bf.readCString(bf.offset);
    bf.skip(expectedLength);
    return content.string;
}

function putString(bf: ByteBuffer, s: string | null, fixed: number) {
    const value = s === null ? '' : s;
    const bytes = Buffer.from(value, 'utf-8');
    bf.append(bytes);
    if (bytes.length < fixed) {
        for (let i = 0; i < fixed - bytes.length; i++) {
            bf.writeByte(0x00);
        }
    }
}

export { RawBuffer };
