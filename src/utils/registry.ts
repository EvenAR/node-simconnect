// @ts-ignore // eslint-disable-line
import regedit = require('regedit');

export function readRegistryValue(FS_KEY: string, subKey: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        // eslint-disable-next-line
        regedit.list(FS_KEY, (err: any, result: any) => {
            if (err) {
                reject(new Error(`Failed to read registry value ${FS_KEY} (${err})`));
            } else {
                resolve(result[FS_KEY].values[subKey].value);
            }
        });
    });
}
