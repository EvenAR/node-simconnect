import * as fs from 'fs';

export async function checkIfNamedPipeExist(pipeName: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
        fs.access(pipeName, fs.constants.F_OK, err => {
            if (err) resolve(false);
            else resolve(true);
        });
    });
}
