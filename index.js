if (process.platform !== `win32`) {
    throw `node-simconnect: The only supported platform is Windows (win32). Found: ${process.platform}`;
}

let nodeSimconnect = undefined;

try {
    const TEXT_COLOR = '\x1b[30m\x1b[44m%s\x1b[0m';
    // Try loading manual build first
    try {
        nodeSimconnect = require(`./build/Release/node_simconnect`);
        console.info(TEXT_COLOR, `node-simconnect: Local Debug build loaded`);
    } catch {
        nodeSimconnect = require(`./build/Debug/node_simconnect`);
        console.info(TEXT_COLOR, `node-simconnect: Local Release build loaded`);
    }
} catch (ex) {
    // If it fails, load the included binary
    console.info(`node-simconnect: Failed to load manual build (${ex.code})`);
    console.info(`node-simconnect: Loading pre-built binary`);
    if (process.arch === `x64`) {
        throw `node-simconnect: The pre-built binary only works with the 32-bit version of Node.js`;
    }
    nodeSimconnect = require(`./bin/win_ia32/node-simconnect`);
    console.info(`node-simconnect: Pre-built binary loaded`);
}

module.exports = {
    SimConnect: nodeSimconnect.SimConnect,
    ...require("./src/generated/constants")
};