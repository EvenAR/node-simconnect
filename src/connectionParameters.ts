import * as Path from 'path';
import * as os from 'os';
import debug from 'debug';
import { readIniFile } from './utils/ini';
import { readRegistryValue } from './utils/registry';
import { checkIfNamedPipeExist } from './utils/network';

const logger = debug('node-simconnect');

async function findSimConnectPortIPv4(): Promise<number> {
    try {
        const port = await readRegistryValue(
            'HKCU\\Software\\Microsoft\\Microsoft Games\\Flight Simulator',
            'SimConnect_Port_IPv4'
        );
        return parseInt(port, 10);
    } catch {
        return 2048;
    }
}

export type ConnectionParameters =
    | { type: 'pipe'; address: string }
    | { type: 'ipv4'; host: string; port: number };

async function readNetworkConfigFromSimConnectCfg(
    folderPath: string,
    index?: number
): Promise<ConnectionParameters | undefined> {
    const filePath = Path.join(folderPath, 'SimConnect.cfg');

    let fullCfg;
    try {
        // SimConnect.cfg uses the INI fileformat
        fullCfg = await readIniFile(filePath);
    } catch (e) {
        logger('Could not read SimConnect.cfg due to to the following error:', e);
        return undefined;
    }

    if (fullCfg.SimConnect === undefined) {
        throw new Error(`Invalid SimConnect.cfg file: ${filePath}`);
    }

    const indexStr = index !== undefined ? index.toString(10) : '0';
    const cfg = fullCfg.SimConnect[indexStr] ? fullCfg.SimConnect[indexStr] : fullCfg.SimConnect;

    if (cfg.Protocol === undefined || cfg.Address === undefined || cfg.Port === undefined) {
        throw new Error(`The loaded SimConnect.cfg (${filePath}) is missing required parameters.`);
    } else if (cfg.Protocol && cfg.Protocol.toUpperCase() !== 'IPV4') {
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

    const homeConfig = await readNetworkConfigFromSimConnectCfg(os.homedir(), cfgIndex);
    if (homeConfig) return homeConfig;

    if (cfgIndex !== undefined) {
        throw new Error(
            `No SimConnect.cfg file containing the given config index ${cfgIndex} was found`
        );
    }

    // Check if named pipe exist
    const PIPE = '\\\\.\\pipe\\Microsoft Flight Simulator\\SimConnect';
    const msfsSimconnectPipeOk = await checkIfNamedPipeExist(PIPE);
    if (msfsSimconnectPipeOk) {
        return { type: 'pipe', address: PIPE };
    }

    // Read port number from Windows registry
    const ipv4port = await findSimConnectPortIPv4();
    return { type: 'ipv4', host: 'localhost', port: ipv4port };
}

export { autodetectServerAddress };
