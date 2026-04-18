import { readFile } from 'node:fs/promises';
import { parse } from 'ini';

export interface IniSection {
    [key: string]: IniSection | string | undefined;
}

export type IniStructure = Record<string, IniSection | string | undefined>;

export async function readIniFile<T extends IniStructure = IniStructure>(
    filePath: string
): Promise<T> {
    try {
        const data = await readFile(filePath, { encoding: 'utf-8' });
        return parse(data) as T;
    } catch (error: unknown) {
        throw new Error(`Failed to load INI-file: ${String(error)}`);
    }
}
