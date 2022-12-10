// @ts-ignore // eslint-disable-line
import regedit = require('regedit');

/**
 * Returns `undefined` if the key does not exist.
 */
export function readRegistryValue(FS_KEY: string, subKey: string): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve, reject) => {
        // eslint-disable-next-line
        regedit.list(FS_KEY, (err: any, result: any) => {
            if (err) {
                reject(new Error(`Failed to read registry value ${FS_KEY} (${err})`));
            } else {
                const values: { [key: string]: any } = result[FS_KEY]?.values;
                resolve(values ? values[subKey].value : undefined);
            }
        });
    });
}
