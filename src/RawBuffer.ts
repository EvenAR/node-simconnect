class RawBuffer {
    private buffer: Buffer;

    private offset = 0;

    private limit: number;

    constructor(b: Buffer | number) {
        if (typeof b === 'number') {
            this.buffer = Buffer.alloc(b);
            this.limit = b;
        } else {
            this.buffer = Buffer.alloc(b.length);
            this.buffer.set(b);
            this.limit = b.length;
        }
    }

    clear() {
        this.offset = 0;
        this.limit = this.buffer.length;
    }

    setOffset(offset: number) {
        this.assertBounds(offset, 0);
        this.offset = offset;
    }

    getOffset(): number {
        return this.offset;
    }

    getBuffer(): Buffer {
        const copy = Buffer.alloc(this.offset);
        copy.set(this.buffer.subarray(0, this.offset));
        return copy;
    }

    write(bytes: Buffer) {
        this.writeBuffer(bytes);
    }

    writeByte(byte: number) {
        this.writeAtCurrentOffset(1, currentOffset => {
            this.buffer.writeUInt8(byte & 0xff, currentOffset);
        });
    }

    readBytes(length: number): Buffer {
        const start = this.offset;
        this.assertReadable(length);
        this.offset += length;
        const copy = Buffer.alloc(length);
        copy.set(this.buffer.subarray(start, start + length));
        return copy;
    }

    readInt16(): number {
        return this.readNumber(2, currentOffset => this.buffer.readInt16LE(currentOffset));
    }

    readInt32(): number {
        return this.readNumber(4, currentOffset => this.buffer.readInt32LE(currentOffset));
    }

    readUint32(): number {
        return this.readNumber(4, currentOffset => this.buffer.readUInt32LE(currentOffset));
    }

    writeInt16(value: number, offset?: number) {
        this.writeNumber(
            2,
            currentOffset => this.buffer.writeInt16LE(value, currentOffset),
            offset
        );
    }

    /** @deprecated use readInt32() instead */
    readInt = this.readInt32;

    writeInt32(value: number, offset?: number) {
        this.writeNumber(
            4,
            currentOffset => this.buffer.writeInt32LE(value, currentOffset),
            offset
        );
    }

    /** @deprecated use writeInt32() instead */
    writeInt = this.writeInt32;

    readInt64(): number {
        return this.readNumber(8, currentOffset =>
            Number(this.buffer.readBigInt64LE(currentOffset))
        );
    }

    readUint64(): bigint {
        return this.readNumber(8, currentOffset => this.buffer.readBigUInt64LE(currentOffset));
    }

    /** @deprecated use readInt64() instead */
    readLong = this.readInt64;

    writeInt64(value: number) {
        this.writeAtCurrentOffset(8, currentOffset => {
            this.buffer.writeBigInt64LE(BigInt(value), currentOffset);
        });
    }

    writeUint32(value: number, offset?: number) {
        this.writeNumber(
            4,
            currentOffset => this.buffer.writeUInt32LE(value, currentOffset),
            offset
        );
    }

    writeUint64(value: bigint, offset?: number) {
        this.writeNumber(
            8,
            currentOffset => this.buffer.writeBigUInt64LE(value, currentOffset),
            offset
        );
    }

    /** @deprecated use writeInt64() instead */
    writeLong = this.writeInt64;

    readFloat32(): number {
        return this.readNumber(4, currentOffset => this.buffer.readFloatLE(currentOffset));
    }

    /** @deprecated use readFloat32() instead */
    readFloat = this.readFloat32;

    writeFloat32(value: number) {
        this.writeAtCurrentOffset(4, currentOffset => {
            this.buffer.writeFloatLE(value, currentOffset);
        });
    }

    /** @deprecated use writeFloat32() instead */
    writeFloat = this.writeFloat32;

    readFloat64(): number {
        return this.readNumber(8, currentOffset => this.buffer.readDoubleLE(currentOffset));
    }

    /** @deprecated use readFloat64() instead */
    readDouble = this.readFloat64;

    writeFloat64(value: number) {
        this.writeAtCurrentOffset(8, currentOffset => {
            this.buffer.writeDoubleLE(value, currentOffset);
        });
    }

    /** @deprecated use writeFloat64() instead */
    writeDouble = this.writeFloat64;

    writeString(value: string, fixedLength?: number) {
        putString(this, value, fixedLength || value.length);
    }

    readString8() {
        return makeString(this, 8);
    }

    writeString8(value: string) {
        putString(this, value, 8);
    }

    writeString30(value: string) {
        putString(this, value, 30);
    }

    readString32() {
        return makeString(this, 32);
    }

    writeString32(value: string) {
        putString(this, value, 32);
    }

    readString64() {
        return makeString(this, 64);
    }

    writeString64(value: string) {
        putString(this, value, 64);
    }

    readString128() {
        return makeString(this, 128);
    }

    writeString128(value: string) {
        putString(this, value, 128);
    }

    readString256() {
        return makeString(this, 256);
    }

    writeString256(value: string | null) {
        putString(this, value, 256);
    }

    readString260() {
        return makeString(this, 260);
    }

    writeString260(value: string) {
        putString(this, value, 260);
    }

    readStringV() {
        let bytesRead = 0;
        let strLen = 0;
        let endFound = false;

        while (this.offset < this.limit) {
            const currentByte = this.buffer.readUInt8(this.offset);
            this.offset++;
            bytesRead++;

            if (endFound && currentByte !== 0) {
                break;
            } else if (currentByte === 0) {
                endFound = true;
            }

            strLen++;
        }

        this.offset -= bytesRead;
        return makeString(this, strLen);
    }

    readString(length: number) {
        return makeString(this, length);
    }

    remaining() {
        return this.limit - this.offset;
    }

    private readNumber<T>(byteLength: number, reader: (offset: number) => T): T {
        const currentOffset = this.offset;
        this.assertReadable(byteLength);
        this.offset += byteLength;
        return reader(currentOffset);
    }

    private writeNumber(byteLength: number, writer: (offset: number) => void, offset?: number) {
        if (offset === undefined) {
            this.writeAtCurrentOffset(byteLength, writer);
            return;
        }

        this.ensureCapacity(offset + byteLength);
        writer(offset);
    }

    private writeAtCurrentOffset(byteLength: number, writer: (offset: number) => void) {
        const currentOffset = this.offset;
        this.ensureCapacity(currentOffset + byteLength);
        writer(currentOffset);
        this.offset += byteLength;
    }

    private writeBuffer(bytes: Buffer) {
        this.writeAtCurrentOffset(bytes.length, currentOffset => {
            this.buffer.set(bytes, currentOffset);
        });
    }

    private assertReadable(byteLength: number) {
        if (this.offset < 0 || this.offset + byteLength > this.limit) {
            throw new RangeError(
                `Illegal offset: 0 <= ${this.offset} (+${byteLength}) <= ${this.limit}`
            );
        }
    }

    private assertBounds(offset: number, byteLength: number) {
        if (offset < 0 || offset + byteLength > this.limit) {
            throw new RangeError(
                `Illegal offset: 0 <= ${offset} (+${byteLength}) <= ${this.limit}`
            );
        }
    }

    private ensureCapacity(requiredLength: number) {
        if (requiredLength <= this.buffer.length) {
            return;
        }

        let nextLength = this.buffer.length === 0 ? 1 : this.buffer.length;
        while (nextLength < requiredLength) {
            nextLength *= 2;
        }

        const nextBuffer = Buffer.alloc(nextLength);
        nextBuffer.set(this.buffer.subarray(0, this.limit));
        this.buffer = nextBuffer;
        this.limit = nextLength;
    }
}

function makeString(buffer: RawBuffer, expectedLength: number) {
    const contentBytes = buffer.readBytes(expectedLength);
    const endIndex = contentBytes.indexOf(0x00);
    const stringBytes = endIndex === -1 ? contentBytes : contentBytes.subarray(0, endIndex);
    return stringBytes.toString('latin1');
}

function putString(buffer: RawBuffer, value: string | null, fixed: number) {
    const content = value === null ? '' : value;
    const bytes = Buffer.from(content, 'latin1');

    buffer.write(bytes);

    if (bytes.length < fixed) {
        buffer.write(Buffer.alloc(fixed - bytes.length));
    }
}

export { RawBuffer };
