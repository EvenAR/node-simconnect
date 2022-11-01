import * as fs from 'fs';
import * as ini from 'ini';

// eslint-disable-next-line
export type IniStructure = { [key: string]: any };

export function readIniFile(filePath: string): Promise<IniStructure> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(new Error(`Failed to load INI-file: err ${err}`));
            } else {
                resolve(ini.parse(data));
            }
        });
    });
}
