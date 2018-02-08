# node-simconnect
An easy way to interact with FSX and Prepar3D through SimConnect. (Windows only)

This project is at a very early stage and wraps only a few basic SimConnect function calls. Feel free to join the development :)

## Installation
**Important: node-simconnect can only be used with Node.js 32 bit**

`npm install node-simconnect`

A pre-built binary file for SimConnect 10.0.61259.0 (FSX SP2) is included. This is compatible with all simulators from FSX SP2 up to Prepar3D v4.


## Usage
For better readability, start by defining these constants in your code. More values can be found here: [SIMCONNECT_DATATYPE](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SIMCONNECT_DATATYPE), and here: [SIMCONNECT_CLIENT_DATA_PERIOD](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SIMCONNECT_CLIENT_DATA_PERIOD) (first item has value 0, next item has value 1, then 2, etc).
```javascript
const SIMCONNECT_OBJECT_ID_USER = 0;

const SIMCONNECT_DATATYPE_FLOAT64 = 4
const SIMCONNECT_DATATYPE_STRINGV = 11

const SIMCONNECT_PERIOD_NEVER = 0
const SIMCONNECT_PERIOD_ONCE = 1
const SIMCONNECT_PERIOD_VISUAL_FRAME = 2
const SIMCONNECT_PERIOD_SIM_FRAME = 3
const SIMCONNECT_PERIOD_SECOND = 4
```

### open
Open connection and provide callback functions for handling critical events. Returns `false` if it failed to call `open`.
```javascript
var success = simConnect.open("MyAppName", 
    function(name, version) {
        console.log("Connected to: " + name + "\nSimConnect version: " + version);
        // Safe to start interacting with SimConnect here (request data, etc)
    }, () => {
        console.log("Simulator exited by user");
    }, (exception) => {
        console.log("SimConnect exception: " + exception.name + " (" + exception.dwException + ", " + exception.dwSendID + ", " + exception.dwIndex + ", " + exception.cbData + ")");
    }, (error) => {
        console.log("Undexpected disconnect/error: " + error); // Look up error code in ntstatus.h for details
});
```

### requestDataOnSimObject
Request one or more [Simulation Variables](https://msdn.microsoft.com/en-us/library/cc526981.aspx) and set a callback function to later handle the received data. Each simulation variable is defined by an array. Example:
```javascript
[
    "Plane Latitude",              // Datum name
    "degrees",                     // Units name
    SIMCONNECT_DATATYPE_FLOAT64,   // Datum type (optional, FLOAT64 is default and works for most data types)
    0                              // Epsilon (optional, 0 is default)
]    
```
Full example:
```javascript
simConnect.requestDataOnSimObject([
        ["Plane Latitude", "degrees"],
        ["Plane Longitude", "degrees"],  
        ["PLANE ALTITUDE", "feet"]
    ], (data) => {
        // Called when data is received
        console.log(
            "Latitude:  " + data["Plane Latitude"] + "\n" +
            "Longitude: " + data["Plane Longitude"] + "\n" +
            "Altitude:  " + data["PLANE ALTITUDE"] + " feet"
        );
    }, 
    SIMCONNECT_OBJECT_ID_USER,                // User aircraft = 0
    SIMCONNECT_PERIOD_SIM_FRAME,              // Get data every sim frame...
    SIMCONNECT_DATA_REQUEST_FLAG_CHANGED      // ...but only if one of the variables have changed
);
```
[SDK Reference](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SimConnect_RequestDataOnSimObject)

### setDataOnSimObject
Set a single [Simulation Variable](https://msdn.microsoft.com/en-us/library/cc526981.aspx) on user aircraft. First parameter is the datum name, second is the units name and last is the value.
```javascript
simConnect.setDataOnSimObject("GENERAL ENG THROTTLE LEVER POSITION:1", "Percent", 50);
```

### subscribeToSystemEvent
Subscribe to a system event. See [SDK Reference](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SimConnect_SubscribeToSystemEvent) for available events.
```javascript
simConnect.subscribeToSystemEvent("Pause", (paused) => { 
    // Called when the system event occurs
    console.log(paused ? "Sim paused" : "Sim un-paused");
});
```
### close
Manually close the connection to SimConnect. Returns `false` if it fails.
```javascript
var success = simConnect.close();
```

## Manual build
### Requirements
* Node.js (32-bit version)
* Visual Studio 2013 (32-bit version)
* FSX or P3D SimConnect SDK files (.lib and .h). 

NOTE: If your app need to work with both FSX and P3D you must use the FSX SDK.

### Build
Due to the licensing of the Flight Simulator / Prepar3D SDK, those libraries are not included in this repository, so automatic build is not possible at the moment. 

To build the native node module you must provide your own SDK files. For FSX:SE, these can be found under `FSX\SDK\Core Utilities Kit\SimConnect SDK`. Follow these steps carefully:

* Navigate to `[your project]/node-modules/node-simconnect`. Create a folder named `SimConnect` and copy the two folders `inc` and `lib` from the SimConnect SDK installation over to the new directory. These should include `SimConnect.h` and `SimConnect.lib`, respectively.
* Open a terminal in `[your project]/node-modules/node-simconnect` and run `npm run build`.
* Run the simple example program using `node examples/nodejs/example.js`.

**Note:** Your app will first try to load the binary from `\build\Release` (generated by manual build). If it fails, it will try to load the pre-built binary located in the `bin` folder.

## Using node-simconnect with Electron or NW.JS
To use `node-simconnect` with Electron or NW.JS, the package must be built specifically for those frameworks. See build instructions above. Read more about using native addons here: [Electron](https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md),  [NW.JS](http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/) 

* To build native Electron addon: `node-gyp rebuild --target=1.6.11 --arch=ia32 --msvs_version=2013` (where `--target` is the version of Electron).
* To build native NW.JS addon: `nw-gyp rebuild --target=0.20.3 --arch=ia32 --msvs_version=2013` (where `--target` is the version of NW.JS).
