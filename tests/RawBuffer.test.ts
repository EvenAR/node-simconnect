import { RawBuffer } from '../src/RawBuffer';
import { SimConnectPacketBuilder } from '../src/SimConnectPacketBuilder';
import { Protocol } from '../src/enums/Protocol';
import { expectBufferContent } from './utils';

describe('RawBuffer', () => {
    test('reads and writes numeric primitives using little-endian encoding', () => {
        const buffer = new RawBuffer(64);

        buffer.writeInt16(-1234);
        buffer.writeInt32(0x12345678);
        buffer.writeUint32(0x90abcdef);
        buffer.writeInt64(-123456789);
        buffer.writeUint64(BigInt('0x0102030405060708'));
        buffer.writeFloat32(12.5);
        buffer.writeFloat64(99.25);

        const bytes = buffer.getBuffer();
        const reader = new RawBuffer(bytes);

        expect(reader.readInt16()).toBe(-1234);
        expect(reader.readInt32()).toBe(0x12345678);
        expect(reader.readUint32()).toBe(0x90abcdef);
        expect(reader.readInt64()).toBe(-123456789);
        expect(reader.readUint64()).toBe(BigInt('0x0102030405060708'));
        expect(reader.readFloat32()).toBeCloseTo(12.5);
        expect(reader.readFloat64()).toBeCloseTo(99.25);
    });

    test('preserves utf-8 strings and pads fixed-length fields', () => {
        const buffer = new RawBuffer(32);

        buffer.writeString256('Ø');
        const bytes = buffer.getBuffer();

        expect(bytes.subarray(0, 4)).toEqual(Buffer.from([0xc3, 0x98, 0x00, 0x00]));

        const reader = new RawBuffer(bytes);
        expect(reader.readString256()).toBe('Ø');
    });

    test('supports variable-length null-terminated strings', () => {
        const buffer = new RawBuffer(Buffer.from('METAR\0\0NEXT', 'utf-8'));

        expect(buffer.readStringV()).toBe('METAR');
        expect(buffer.readString(4)).toBe('NEXT');
    });

    test('reuses the buffer after clear and tracks offsets correctly', () => {
        const buffer = new RawBuffer(16);

        buffer.writeInt32(1);
        expect(buffer.getOffset()).toBe(4);

        expect(buffer.getBuffer()).toEqual(Buffer.from([0x01, 0x00, 0x00, 0x00]));

        buffer.clear();
        buffer.setOffset(4);
        buffer.writeInt32(2);

        expect(buffer.getOffset()).toBe(8);
        expect(buffer.getBuffer()).toEqual(
            Buffer.from([0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00])
        );
    });
});

test('packet builder writes uint32 values as 4 bytes and uint64 values as 8 bytes', () => {
    const packet = new SimConnectPacketBuilder(0x99, Protocol.KittyHawk);

    packet.putUint32(0x11223344).putUint64(BigInt('0x0102030405060708'));

    expectBufferContent(
        packet.build(0),
        `
1C 00 00 00 05 00 00 00
99 00 00 F0 00 00 00 00
44 33 22 11
08 07 06 05 04 03 02 01
`
    );
});
