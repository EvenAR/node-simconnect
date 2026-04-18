import { access } from 'node:fs/promises';

export async function checkIfNamedPipeExist(pipeName: string): Promise<boolean> {
    try {
        await access(pipeName);
        return true;
    } catch {
        return false;
    }
}
