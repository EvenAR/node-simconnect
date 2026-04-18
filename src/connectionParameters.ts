import { homedir } from 'node:os';
import { join } from 'node:path';
import debug from 'debug';
import { IniSection, readIniFile } from './utils/ini';
import { readRegistryValue } from './utils/registry';
import { checkIfNamedPipeExist } from './utils/network';

const logger = debug('node-simconnect');

async function findSimConnectPortIPv4(): Promise<number> {
    if (process.platform !== 'win32') {
        return 2048;
    }

    try {
        const port = await readRegistryValue(
            'HKCU\\Software\\Microsoft\\Microsoft Games\\Flight Simulator',
            'SimConnect_Port_IPv4'
        );
        if (!port) {
            throw new Error('Could not find SimConnect_Port_IPv4 in the Windows registry');
        }
        return parseInt(port, 10);
    } catch {
        return 2048;
    }
}

export type ConnectionParameters =
    | { type: 'pipe'; address: string }
    | { type: 'ipv4'; host: string; port: number };

type SimConnectCfgFile = {
    SimConnect?: IniSection;
};

type SimConnectCfgSection = IniSection & {
    Address?: string;
    Port?: string;
    Protocol?: string;
};

function asIniSection(value: IniSection | string | undefined): IniSection | undefined {
    return value !== undefined && typeof value === 'object' ? value : undefined;
}

async function readNetworkConfigFromSimConnectCfg(
    folderPath: string,
    index?: number
): Promise<ConnectionParameters | undefined> {
    const filePath = join(folderPath, 'SimConnect.cfg');

    let fullCfg: SimConnectCfgFile;
    try {
        // SimConnect.cfg uses the INI fileformat
        fullCfg = await readIniFile<SimConnectCfgFile>(filePath);
    } catch (error: unknown) {
        logger('Could not read SimConnect.cfg due to to the following error: %O', error);
        return undefined;
    }

    const simConnectCfg = asIniSection(fullCfg.SimConnect);
    if (simConnectCfg === undefined) {
        throw new Error(`Invalid SimConnect.cfg file: ${filePath}`);
    }

    const indexStr = index !== undefined ? index.toString(10) : '0';
    const indexedCfg = asIniSection(simConnectCfg[indexStr]);
    const cfg = (indexedCfg ?? simConnectCfg) as SimConnectCfgSection;

    if (
        typeof cfg.Protocol !== 'string' ||
        typeof cfg.Address !== 'string' ||
        typeof cfg.Port !== 'string'
    ) {
        throw new Error(`The loaded SimConnect.cfg (${filePath}) is missing required parameters.`);
    } else if (cfg.Protocol.toUpperCase() !== 'IPV4') {
        throw new Error('Only the Ipv4 protocol is supported at the moment');
    }

    return {
        type: 'ipv4',
        host: cfg.Address,
        port: parseInt(cfg.Port, 10),
    };
}

async function autodetectServerAddress(cfgIndex?: number): Promise<ConnectionParameters> {
    // Check for SimConnect.cfg in current dir
    const localConfig = await readNetworkConfigFromSimConnectCfg(process.cwd(), cfgIndex);
    if (localConfig) return localConfig;

    const homeConfig = await readNetworkConfigFromSimConnectCfg(homedir(), cfgIndex);
    if (homeConfig) return homeConfig;

    if (cfgIndex !== undefined) {
        throw new Error(
            `No SimConnect.cfg file containing the given config index ${cfgIndex} was found`
        );
    }

    if (process.platform === 'win32') {
        const pipe = '\\\\.\\pipe\\Microsoft Flight Simulator\\SimConnect';
        const msfsSimconnectPipeOk = await checkIfNamedPipeExist(pipe);
        if (msfsSimconnectPipeOk) {
            return { type: 'pipe', address: pipe };
        }
    }

    // Read port number from Windows registry
    const ipv4port = await findSimConnectPortIPv4();
    return { type: 'ipv4', host: 'localhost', port: ipv4port };
}

export { autodetectServerAddress };
