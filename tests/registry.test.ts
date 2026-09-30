import { parseRegQueryOutput, readRegistryValue } from '../src/utils/registry';

const KEY = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Microsoft Games\\Flight Simulator';

describe('parseRegQueryOutput', () => {
    test('reads a REG_SZ value', () => {
        const stdout = `\r\n${KEY}\r\n    SimConnect_Port_IPv4    REG_SZ    500\r\n\r\n`;
        expect(parseRegQueryOutput(stdout, 'SimConnect_Port_IPv4')).toBe('500');
    });

    test('converts DWORD hex to decimal', () => {
        const stdout = `\r\n${KEY}\r\n    SimConnect_Port_IPv4    REG_DWORD    0x800\r\n\r\n`;
        expect(parseRegQueryOutput(stdout, 'SimConnect_Port_IPv4')).toBe('2048');
    });

    test('picks the requested value among several', () => {
        const stdout = [
            '',
            KEY,
            '    SimConnect_Port_IPv6    REG_SZ    501',
            '    SimConnect_Port_IPv4    REG_SZ    500',
            '',
        ].join('\r\n');
        expect(parseRegQueryOutput(stdout, 'SimConnect_Port_IPv4')).toBe('500');
    });

    test('handles value names with spaces and empty data', () => {
        const stdout = `\r\n${KEY}\r\n    Some Value    REG_SZ    \r\n`;
        expect(parseRegQueryOutput(stdout, 'Some Value')).toBe('');
    });

    test('returns undefined when the value is absent', () => {
        expect(parseRegQueryOutput(`\r\n${KEY}\r\n`, 'SimConnect_Port_IPv4')).toBeUndefined();
    });
});

describe('readRegistryValue', () => {
    const onWindows = process.platform === 'win32' ? test : test.skip;

    onWindows('returns undefined for a missing key', async () => {
        await expect(
            readRegistryValue('HKCU\\Software\\node-simconnect-does-not-exist', 'X')
        ).resolves.toBeUndefined();
    });

    onWindows('reads an existing value', async () => {
        const value = await readRegistryValue('HKCU\\Environment', 'TEMP');
        expect(typeof value).toBe('string');
    });
});
