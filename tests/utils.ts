/**
 *
 * @param actual
 * @param expected Expected message content encoded as a string of hex-values (eg: 14 01 00 00 05 00 00 00 ...)
 */
export function expectBufferContent(actual: Buffer, expected: string) {
    const expectedBuffer = toBuffer(expected);
    expect(formattedBufferContent(actual)).toBe(formattedBufferContent(expectedBuffer));
}

function toBuffer(hexData: string): Buffer {
    const buffer = Buffer.from(hexData.replace(/\W/g, ''), 'hex');
    resetPacketId(buffer);
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
