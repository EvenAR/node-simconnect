import ByteBuffer = require('bytebuffer');

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

    readLong(): number {
        return this.buffer.readInt64().toNumber();
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
