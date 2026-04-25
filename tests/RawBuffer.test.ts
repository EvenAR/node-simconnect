import { RawBuffer } from '../src/RawBuffer';

describe('RawBuffer', () => {
    test('round-trips numeric values in little-endian order', () => {
        const buffer = new RawBuffer(64);

        buffer.writeByte(0x12);
        buffer.writeInt16(-1234);
        buffer.writeInt32(-56789);
        buffer.writeUint32(4000000000);
        buffer.writeInt64(900719925);
        buffer.writeUint64(18446744073709551615n);
        buffer.writeFloat32(12.5);
        buffer.writeFloat64(Math.PI);

        const raw = buffer.getBuffer();
        const reader = new RawBuffer(raw);

        expect(reader.readBytes(1)).toEqual(Buffer.from([0x12]));
        expect(reader.readInt16()).toBe(-1234);
        expect(reader.readInt32()).toBe(-56789);
        expect(reader.readUint32()).toBe(4000000000);
        expect(reader.readInt64()).toBe(900719925);
        expect(reader.readUint64()).toBe(18446744073709551615n);
        expect(reader.readFloat32()).toBeCloseTo(12.5);
        expect(reader.readFloat64()).toBeCloseTo(Math.PI);
        expect(reader.remaining()).toBe(0);
    });

    test('supports writing 16-bit and 32-bit values at an explicit offset', () => {
        const buffer = new RawBuffer(10);

        buffer.writeInt32(0x11223344);
        buffer.writeUint32(0xaabbccdd, 4);
        buffer.writeInt16(-2, 8);
        buffer.setOffset(10);

        const reader = new RawBuffer(buffer.getBuffer());

        expect(reader.readInt32()).toBe(0x11223344);
        expect(reader.readUint32()).toBe(0xaabbccdd);
        expect(reader.readInt16()).toBe(-2);
    });

    test('reads and writes fixed-length strings with null padding', () => {
        const buffer = new RawBuffer(64);

        buffer.writeString8('abc');
        buffer.writeString32('hello');
        buffer.writeString256(null);

        const raw = buffer.getBuffer();

        expect(raw.subarray(0, 8)).toEqual(Buffer.from([0x61, 0x62, 0x63, 0, 0, 0, 0, 0]));
        const expectedString32 = Buffer.alloc(32);
        expectedString32.write('hello', 0, 'latin1');
        expect(raw.subarray(8, 40)).toEqual(expectedString32);
        expect(raw.subarray(40, 296)).toEqual(Buffer.alloc(256));

        const reader = new RawBuffer(raw);
        expect(reader.readString8()).toBe('abc');
        expect(reader.readString32()).toBe('hello');
        expect(reader.readString256()).toBe('');
        expect(reader.remaining()).toBe(0);
    });

    test('readStringV stops before the next value while consuming the padded field', () => {
        const raw = Buffer.from([0x41, 0x42, 0x00, 0x00, 0x7a, 0x79, 0x00]);
        const buffer = new RawBuffer(raw);

        expect(buffer.readStringV()).toBe('AB');
        expect(buffer.getOffset()).toBe(4);
        expect(buffer.readString(3)).toBe('zy');
        expect(buffer.remaining()).toBe(0);
    });

    test('clear resets the offset and allows the buffer to be reused', () => {
        const buffer = new RawBuffer(16);

        buffer.writeString('test');
        expect(buffer.getOffset()).toBe(4);

        buffer.clear();
        expect(buffer.getOffset()).toBe(0);

        buffer.writeInt32(42);

        const reader = new RawBuffer(buffer.getBuffer());
        expect(reader.readInt32()).toBe(42);
        expect(reader.remaining()).toBe(0);
    });

    test('can read slices and manually adjust the offset', () => {
        const buffer = new RawBuffer(Buffer.from([1, 2, 3, 4, 5]));

        expect(buffer.readBytes(2)).toEqual(Buffer.from([1, 2]));
        expect(buffer.getOffset()).toBe(2);

        buffer.setOffset(1);
        expect(buffer.readBytes(3)).toEqual(Buffer.from([2, 3, 4]));
        expect(buffer.remaining()).toBe(1);
    });
});
