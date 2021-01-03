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

enum SimConnectBuild{
    SP0		    = 60905,
    SP1		    = 61355,
    SP2_XPACK	= 61259
}

export {
    findSimConnectPortIPv4,
    SimConnectBuild
}