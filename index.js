var nodeSimconnect = null;

if(process.platform == "win32" && process.arch == "ia32") {
	try {
		// Try loading manual build first
		nodeSimconnect = require('./build/Release/node-simconnect');
		console.log("Manual build loaded");
	} catch(ex) {
		// If it fails, load the included binary
		nodeSimconnect = require('./bin/win_ia32/node-simconnect');
		console.log("Pre-built binary loaded: " + ex);
	}
} else if(process.platform == "win32" && process.arch == "x64") {
	console.log(new Error("Node.js 64 bit is not supported. Please install Node.js 32 bit."))
} else if(process.platform != "win32") {
    console.log(new Error("The only supported platform is Windows (win32). Found: " + process.platform))
}

module.exports = nodeSimconnect;