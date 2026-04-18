import { Protocol } from '../src/enums/Protocol';

/**
 *
 * @param actual
 * @param expected Expected message content encoded as a string of hex-values (eg: 14 01 00 00 05 00 00 00 ...)
 */
export function expectBufferContent(actual: Buffer, expected: string) {
    const expectedBuffer = toBuffer(expected);
    expect(formattedBufferContent(actual)).toBe(formattedBufferContent(expectedBuffer));
}

export function getRequiredWrite(writes: Buffer[], index = 0): Buffer {
    const packet = writes[index];

    if (packet === undefined) {
        throw new Error(`Expected write at index ${index}, but only found ${writes.length} writes`);
    }

    return packet;
}

function toBuffer(hexData: string): Buffer {
    const buffer = Buffer.from(hexData.replace(/\W/g, ''), 'hex');
    resetPacketId(buffer);
    return buffer;
}

export function createExpectedPacket(
    packetTypeId: number,
    payloadLength: number,
    fillPayload: (payload: Buffer) => void,
    options?: {
        protocol?: Protocol;
        sendId?: number;
    }
): Buffer {
    const buffer = Buffer.alloc(16 + payloadLength);
    buffer.writeInt32LE(buffer.length, 0);
    buffer.writeInt32LE(options?.protocol ?? Protocol.KittyHawk, 4);
    buffer.writeUInt32LE(0xf0000000 + packetTypeId, 8);
    buffer.writeInt32LE(options?.sendId ?? 0, 12);
    fillPayload(buffer.subarray(16));
    return buffer;
}

function resetPacketId(buffer: Buffer) {
    // Byte at index 12-16 is the packet ID which will vay
    buffer.set([0, 0, 0, 0], 12);
}

function formattedBufferContent(data: Buffer): string {
    const decodedString = data.toString();
    const rawBytes = data.toString('hex').replace(/(.{2})/g, ' 0x$1');
    return `String:\r\n${decodedString}\r\nBytes:\r\n${rawBytes}`;
}
