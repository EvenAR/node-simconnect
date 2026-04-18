class RawBuffer {
    private buffer: Buffer;

    private limit: number;

    private offset = 0;

    constructor(b: Buffer | number) {
        this.buffer = typeof b === 'number' ? Buffer.alloc(b) : b;
        this.limit = this.buffer.length;
    }

    clear(): void {
        this.offset = 0;
        this.limit = this.buffer.length;
    }

    setOffset(offset: number): void {
        this.ensureCapacity(offset);
        this.offset = offset;
    }

    getOffset(): number {
        return this.offset;
    }

    getBuffer(): Buffer {
        const output = this.buffer.subarray(0, this.offset);
        this.limit = this.offset;
        this.offset = 0;
        return Buffer.from(output);
    }

    write(bytes: Buffer): void {
        this.writeBuffer(bytes);
    }

    writeByte(byte: number): void {
        this.writeNumber(1, offset => this.buffer.writeInt8(byte, offset));
    }

    readBytes(length: number): Buffer {
        this.ensureReadable(length);
        const bytes = Buffer.from(this.buffer.subarray(this.offset, this.offset + length));
        this.offset += length;
        return bytes;
    }

    readInt16(): number {
        return this.readNumber(2, offset => this.buffer.readInt16LE(offset));
    }

    readInt32(): number {
        return this.readNumber(4, offset => this.buffer.readInt32LE(offset));
    }

    readUint32(): number {
        return this.readNumber(4, offset => this.buffer.readUInt32LE(offset));
    }

    writeInt16(value: number, offset?: number): void {
        this.writeNumber(2, writeOffset => this.buffer.writeInt16LE(value, writeOffset), offset);
    }

    /** @deprecated use readInt32() instead */
    readInt = this.readInt32;

    writeInt32(value: number, offset?: number): void {
        this.writeNumber(4, writeOffset => this.buffer.writeInt32LE(value, writeOffset), offset);
    }

    /** @deprecated use writeInt32() instead */
    writeInt = this.writeInt32;

    readInt64(): number {
        return Number(this.readBigInt(8, offset => this.buffer.readBigInt64LE(offset)));
    }

    readUint64(): bigint {
        return this.readBigInt(8, offset => this.buffer.readBigUInt64LE(offset));
    }

    /** @deprecated use readInt64() instead */
    readLong = this.readInt64;

    writeInt64(value: number): void {
        this.writeNumber(8, offset => this.buffer.writeBigInt64LE(BigInt(value), offset));
    }

    writeUint32(value: number, offset?: number): void {
        this.writeNumber(4, writeOffset => this.buffer.writeUInt32LE(value, writeOffset), offset);
    }

    writeUint64(value: bigint, offset?: number): void {
        this.writeNumber(
            8,
            writeOffset => this.buffer.writeBigUInt64LE(value, writeOffset),
            offset
        );
    }

    /** @deprecated use writeInt64() instead */
    writeLong = this.writeInt64;

    readFloat32(): number {
        return this.readNumber(4, offset => this.buffer.readFloatLE(offset));
    }

    /** @deprecated use readFloat32() instead */
    readFloat = this.readFloat32;

    writeFloat32(value: number): void {
        this.writeNumber(4, offset => this.buffer.writeFloatLE(value, offset));
    }

    /** @deprecated use writeFloat32() instead */
    writeFloat = this.writeFloat32;

    readFloat64(): number {
        return this.readNumber(8, offset => this.buffer.readDoubleLE(offset));
    }

    /** @deprecated use readFloat64() instead */
    readDouble = this.readFloat64;

    writeFloat64(value: number): void {
        this.writeNumber(8, offset => this.buffer.writeDoubleLE(value, offset));
    }

    /** @deprecated use writeFloat64() instead */
    writeDouble = this.writeFloat64;

    writeString(value: string, fixedLength?: number): void {
        this.writeStringBytes(value, fixedLength ?? value.length);
    }

    readString8(): string {
        return this.readFixedString(8);
    }

    writeString8(value: string): void {
        this.writeStringBytes(value, 8);
    }

    writeString30(value: string): void {
        this.writeStringBytes(value, 30);
    }

    readString32(): string {
        return this.readFixedString(32);
    }

    writeString32(value: string): void {
        this.writeStringBytes(value, 32);
    }

    readString64(): string {
        return this.readFixedString(64);
    }

    writeString64(value: string): void {
        this.writeStringBytes(value, 64);
    }

    readString128(): string {
        return this.readFixedString(128);
    }

    writeString128(value: string): void {
        this.writeStringBytes(value, 128);
    }

    readString256(): string {
        return this.readFixedString(256);
    }

    writeString256(value: string | null): void {
        this.writeStringBytes(value, 256);
    }

    readString260(): string {
        return this.readFixedString(260);
    }

    writeString260(value: string): void {
        this.writeStringBytes(value, 260);
    }

    readStringV(): string {
        let bytesRead = 0;
        let strLen = 0;
        let endFound = false;

        while (this.offset + bytesRead < this.limit) {
            const currentByte = this.buffer.readInt8(this.offset + bytesRead);
            bytesRead += 1;

            if (endFound && currentByte !== 0) {
                break;
            }

            if (currentByte === 0) {
                endFound = true;
            }

            strLen += 1;
        }

        return this.readFixedString(strLen);
    }

    readString(length: number): string {
        return this.readFixedString(length);
    }

    remaining(): number {
        return this.limit - this.offset;
    }

    private ensureCapacity(requiredSize: number): void {
        if (requiredSize <= this.buffer.length) {
            return;
        }

        let nextLength = this.buffer.length || 1;
        while (nextLength < requiredSize) {
            nextLength *= 2;
        }

        const nextBuffer = Buffer.alloc(nextLength);
        this.buffer.copy(nextBuffer, 0, 0, this.limit);
        this.buffer = nextBuffer;
        this.limit = this.buffer.length;
    }

    private ensureReadable(length: number): void {
        if (this.offset + length > this.limit) {
            throw new RangeError('Attempted to read beyond the available buffer length');
        }
    }

    private readBigInt(length: number, reader: (offset: number) => bigint): bigint {
        this.ensureReadable(length);
        const value = reader(this.offset);
        this.offset += length;
        return value;
    }

    private readNumber(length: number, reader: (offset: number) => number): number {
        this.ensureReadable(length);
        const value = reader(this.offset);
        this.offset += length;
        return value;
    }

    private writeBuffer(bytes: Buffer, offset?: number): void {
        const writeOffset = offset ?? this.offset;
        const endOffset = writeOffset + bytes.length;
        this.ensureCapacity(endOffset);
        bytes.copy(this.buffer, writeOffset);

        if (offset === undefined) {
            this.offset = endOffset;
        }
    }

    private writeNumber(
        byteLength: number,
        writer: (offset: number) => number,
        offset?: number
    ): void {
        const writeOffset = offset ?? this.offset;
        const endOffset = writeOffset + byteLength;
        this.ensureCapacity(endOffset);
        writer(writeOffset);

        if (offset === undefined) {
            this.offset = endOffset;
        }
    }

    private writeStringBytes(value: string | null, fixedLength: number): void {
        const bytes = Buffer.from(value ?? '', 'utf-8');
        this.writeBuffer(bytes);

        if (bytes.length < fixedLength) {
            this.writeBuffer(Buffer.alloc(fixedLength - bytes.length));
        }
    }

    private readFixedString(expectedLength: number): string {
        this.ensureReadable(expectedLength);
        const bytes = this.buffer.subarray(this.offset, this.offset + expectedLength);
        const endIndex = bytes.indexOf(0);
        this.offset += expectedLength;

        return bytes.subarray(0, endIndex === -1 ? bytes.length : endIndex).toString('utf-8');
    }
}

export { RawBuffer };
