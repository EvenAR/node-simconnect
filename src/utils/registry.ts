import { execFile } from 'child_process';
import * as Path from 'path';

// Matches a value line from `reg query`, e.g. "    Name    REG_SZ    data".
const VALUE_LINE = /^ {4}(.*?) {4}(REG_[A-Z_]+)(?: {4}(.*))?$/;

/**
 * Returns `undefined` if the key does not exist.
 */
export function readRegistryValue(key: string, subKey: string): Promise<string | undefined> {
    if (process.platform !== 'win32') return Promise.resolve(undefined);

    const regExe = Path.join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'reg.exe');

    return new Promise<string | undefined>((resolve, reject) => {
        execFile(
            regExe,
            ['query', key, '/v', subKey],
            { windowsHide: true },
            (err, stdout, stderr) => {
                if (err) {
                    // reg exits with 1 when the key or value is missing
                    if (err.code === 1) {
                        resolve(undefined);
                    } else {
                        reject(
                            new Error(
                                `Failed to read registry value ${key} (${stderr.trim() || err.message})`
                            )
                        );
                    }
                } else {
                    resolve(parseRegQueryOutput(stdout, subKey));
                }
            }
        );
    });
}

export function parseRegQueryOutput(stdout: string, valueName: string): string | undefined {
    for (const line of stdout.split(/\r?\n/)) {
        const match = VALUE_LINE.exec(line);
        if (match && match[1]!.toLowerCase() === valueName.toLowerCase()) {
            const type = match[2]!;
            const data = match[3] ?? '';
            // reg prints DWORD/QWORD as hex, callers expect decimal
            if (type === 'REG_DWORD' || type === 'REG_QWORD') {
                return BigInt(data).toString();
            }
            return data;
        }
    }
    return undefined;
}
