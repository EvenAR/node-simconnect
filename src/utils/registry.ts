import regedit from 'regedit';

/**
 * Returns `undefined` if the key does not exist.
 */
export function readRegistryValue(key: string, subKey: string): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve, reject) => {
        regedit.list([key], (err, result) => {
            if (err) {
                reject(new Error(`Failed to read registry value ${key} (${err})`));
            } else {
                const values = result[key]?.values;
                if (subKey in values) {
                    resolve(values[subKey].value as string);
                } else {
                    resolve(undefined);
                }
            }
        });
    });
}
