var nodeSimconnect = null;

if (process.platform !== `win32`) {
    throw `node-simconnect: The only supported platform is Windows (win32). Found: ${process.platform}`;
}
try {
    // Try loading manual build first
    nodeSimconnect = require(`./build/Release/node-simconnect`);
    console.info(`node-simconnect: Manual build loaded`);
} catch (ex) {
    // If it fails, load the included binary
    console.info(`node-simconnect: Loading pre-built binary`);
    if (process.arch === `x64`) {
        throw `node-simconnect: The pre-built binary only works with the 32-bit version of Node.js`;
    }
    nodeSimconnect = require(`./bin/win_ia32/node-simconnect`);
    console.info(`node-simconnect: Pre-built binary loaded: ${ex}`);
}

nodeSimconnect.objectId = {
	USER: 0
};

nodeSimconnect.dataRequestFlag = {
	DEFAULT: 0,
	CHANGED: 1,
	TAGGED: 2
};

nodeSimconnect.datatype = {
	INVALID: 0,  
	INT32: 1,    
	INT64: 2,    
	FLOAT32: 3,  
	FLOAT64: 4,  
	STRING8: 5,  
	STRING32: 6, 
	STRING64: 7, 
	STRING128: 8,
	STRING256: 9,
	STRING260: 10,
	STRINGV: 11
};

nodeSimconnect.simobjectType = {
	USER: 0,
	ALL: 1,
	AIRCRAFT: 2,
	HELICOPTER: 3,
	BOAT: 4,
	GROUND: 5,
};

nodeSimconnect.period = {
	NEVER: 0,
	ONCE: 1,
	VISUAL_FRAME: 2,
	SIM_FRAME: 3,
	SECOND: 4,
};



module.exports = nodeSimconnect;