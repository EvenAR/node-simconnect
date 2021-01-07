import * as fs from "fs";
import * as ini from "ini";
import * as Path from "path";
import * as os from "os";

const regedit = require("regedit");

async function findSimConnectPortIPv4(): Promise<number> {
    const port = await readRegistryValue("SimConnect_Port_IPv4");
    return parseInt(port, 10);
}

function readRegistryValue(subKey: string): Promise<string> {
    const FS_KEY = "HKCU\\Software\\Microsoft\\Microsoft Games\\Flight Simulator";
    return new Promise((resolve, reject) => {
        regedit.list(FS_KEY, (err: any, result: any) => {
            if(err) {
                reject()
            } else {
                resolve(result[FS_KEY].values[subKey].value);
            }
        })
    })
}

type IniFile = { [key: string]: any; }

function readIniFile(path: string): Promise<IniFile> {
    return new Promise<IniFile>((resolve, reject) => {
        fs.readFile(path,{ encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(ini.parse(data))
            }
        });
    })
}

async function readSimConnectCfg(folder: string) {
    const simconnectCfg = await readIniFile(Path.join(folder, "SimConnect.cfg"));
    return simconnectCfg.SimConnect;
}

async function checkIfNamedPipeExist(pipeName: string): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
        fs.access(pipeName, fs.constants.F_OK, (err) => {
            if(err) resolve(false);
            else resolve(true);
        })
    }))
}

async function discoverServer(): Promise<string | {host: string, port: number}> {
    // Check for SimConnect.cfg in current dir
    try {
        const localConfig = await readSimConnectCfg(process.cwd());
        const {Address, Port} = localConfig[1];
        if (Address && Port) {
            return { host: Address, port: Port }
        }
    } catch {}

    // Check for SimConnect.cfg in home directory
    try {
        const homeConfig = await readSimConnectCfg(os.homedir());
        const {Address, Port} = homeConfig[1];
        if (Address && Port) {
            return { host: Address, port: Port }
        }
    } catch {}

    // Check if named pipe exist
    const PIPE = "\\\\.\\pipe\\Microsoft Flight Simulator\\SimConnect";
    const msfsSimconnectPipeOk = await checkIfNamedPipeExist(PIPE);
    if (msfsSimconnectPipeOk) {
        return PIPE;
    }

    // Read port number from Windows registry
    const ipv4port = await findSimConnectPortIPv4();
    return { host: "localhost", port: ipv4port }
}

export {
    discoverServer
}

