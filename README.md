# node-simconnect
Wrapper for the SimConnect SDK for Flight Simulator X and Prepar3D (Windows only)

This project is at a very early stage and wraps only a few basic SimConnect function calls. Feel free to join the development! :)

## Installation

node-simconnect is a native NodeJS addon written in C++ and must be compiled to a dynamic C++ library before it can be loaded as a module in NodeJS. Included in this repository is a prebuilt binary built with SimConnect 10.0.61259.0 (FSX SP2), which is compatible with FSX SP2, FSX:SE and all versions of Prepar3D. Because SimConnect 10.0.61259.0 is a 32 bit library, you must use the 32 bit version of NodeJS in order to import the module.

To install node-simconnect using the included binary: 
`npm install node-simconnect --ignore-scripts`

**Note: The included binary requires the 32 bit version of NodeJS.**

Then import the module:
`const simConnect = require('node-simconnect');`

## Usage
The available functions are described below. Please refer to [example.js](examples/nodejs/example.js) for more help.

### open
`requestDataOnSimObject(connectedCallback, simExitedCallback, exceptionCallback, errorCallback)`
Open connection and provide callback functions for handling critical events. Returns `false` if it failed to call `open` (eg. if sim is not running).
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
`requestDataOnSimObject(reqData, callback, objectId, period, dataRequestFlag)`
Request one or more [Simulation Variables](https://msdn.microsoft.com/en-us/library/cc526981.aspx) and set a callback function to later handle the received data. See [SDK Reference](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SimConnect_RequestDataOnSimObject) for more details.

Each simulation variable is defined by an array. Example:
```javascript
[
    "Plane Latitude",              // Datum name
    "degrees",                     // Units name
    simConnect.datatype.FLOAT64,   // Datum type (optional, FLOAT64 is default and works for most data types)
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
    simConnect.objectId.USER,               // User aircraft
    simConnect.period.SIM_FRAME,            // Get data every sim frame...
    simConnect.dataRequestFlag.CHANGED      // ...but only if one of the variables have changed
);
```


### requestDataOnSimObjectType
`requestDataOnSimObjectType(reqData, callback, radius, simobjectType)`
Similar to `requestDataOnSimObject`. Used to retrieve information about simulation objects of a given type that are within a specified radius of the user's aircraft. See [SDK Reference](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SimConnect_RequestDataOnSimObjectType) for more details.

**Example**:
This will receive info about the user's aircraft. For this, a radius of 0 is used. Notice that when `STRINGV` is requested, the unit should be `null`.
```javascript
simConnect.requestDataOnSimObjectType([
    ["NAV IDENT:1", null, simConnect.datatype.STRINGV],
    ["NAV NAME:1", null, simConnect.datatype.STRINGV],
    ["NAV DME:1","Nautical miles"],
], function(data) {
    console.log(data);
}, 0 /* radius=0 */, simConnect.simobjectType.USER);
```

**Example**:
This will receive info about all aircraft within a 10 km radius. The callback will one time for each identified aircraft.
```javascript
simConnect.requestDataOnSimObjectType([
    ["ATC MODEL",null,simConnect.datatype.STRINGV],
    ["Plane Latitude", "degrees"],
    ["Plane Longitude", "degrees"]
], function(data) {
    console.log(data);
}, 10000, simConnect.simobjectType.AIRCRAFT);
```

### createDataDefinition
`createDataDefinition(reqData)`
Used to create a data definition. Returns an id which can be used with `requestDataOnSimObjectType` in place of the array. This should be used when you have multiple requests for the same data - otherwise the app will crash after receiving too many requests. 

**Example**:
```javascript
var navInfoDefId = simConnect.createDataDefinition([
    ["NAV DME:1", "Nautical miles"],
    ["NAV GLIDE SLOPE ERROR:1", "Degrees"],
    ["NAV RADIAL ERROR:1", "Degrees"],
]);

setInterval(() => {
    simConnect.requestDataOnSimObjectType(navInfoDefId, function(data) {
        console.log(data)
    }, 0, simConnect.simobjectType.USER)
},100)
```

### setDataOnSimObject
`setDataOnSimObject(variableName, unit, value)`
Set a single [Simulation Variable](https://msdn.microsoft.com/en-us/library/cc526981.aspx) on user aircraft. First parameter is the datum name, second is the units name and last is the value.

**Example**:
```javascript
simConnect.setDataOnSimObject("GENERAL ENG THROTTLE LEVER POSITION:1", "Percent", 50);
```

### subscribeToSystemEvent
`subscribeToSystemEvent(eventName, callback)`
Subscribe to a system event. See [SDK Reference](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SimConnect_SubscribeToSystemEvent) for available events.

**Example**:
```javascript
simConnect.subscribeToSystemEvent("Pause", (paused) => { 
    // Called when the system event occurs
    console.log(paused ? "Sim paused" : "Sim un-paused");
});
```
### close
`close()`
Manually close the connection to SimConnect. Returns `false` if it fails.

**Example**:
```javascript
var success = simConnect.close();
```

## Manual build
You might wish to build node-simconnect manually (eg. with the 64-bit SimConnect SDK that comes with Prepar3D v4). Due to the licensing of the SimConnect SDK the library files are not included in this repository, so you must provide these yourself.

### Requirements
* Node.js (32 bit if building for FSX)
* MS Visual Studio (Community version is sufficient)
* FSX or P3D SimConnect SDK files (.lib and .h). 

### Build
You must provide your own copy of the SDK files. For FSX:SE, these can be found under `FSX\SDK\Core Utilities Kit\SimConnect SDK`. Follow these steps carefully:

* Navigate to `[your project]/node-modules/node-simconnect`. Create a folder named `SimConnect` and copy the two folders `inc` and `lib` from the SimConnect SDK installation over to the new directory. These should include `SimConnect.h` and `SimConnect.lib`, respectively.
* Open a terminal in `[your project]/node-modules/node-simconnect` and run `npm run build`.
* Run the simple example program using `node examples/nodejs/example.js`.

**Note:** Your app will first try to load the binary from `\build\Release` (generated by manual build). If it fails, it will try to load the pre-built binary located in the `bin` folder.

## Using node-simconnect with Electron or NW.JS
To use `node-simconnect` with Electron or NW.JS, the package must be built specifically for those frameworks. Read more about using native addons here: [Electron](https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md),  [NW.JS](http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/) 

* To build native Electron addon: `node-gyp rebuild --target=1.6.11 --arch=ia32 --msvs_version=2013` (where `--target` is the version of Electron).
* To build native NW.JS addon: `nw-gyp rebuild --target=0.20.3 --arch=ia32 --msvs_version=2013` (where `--target` is the version of NW.JS).

## Licence

### MIT

Copyright (c) 2018 Even Arneberg Rognlien <even.rognlien@gmail.com>

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
