# node-simconnect :airplane: 
Wrapper for the SimConnect SDK for Flight Simulator X and Prepar3D (Windows only)

This project is at a very early stage and wraps only a few basic SimConnect function calls. Feel free to join the development! :)

# Installation 📦

node-simconnect is a native NodeJS addon written in C++ and must be compiled to a dynamic C++ library before it can be loaded as a module in NodeJS. Included in this repository is a prebuilt binary built with SimConnect 10.0.61259.0 (FSX SP2), which is compatible with FSX SP2, FSX:SE and all versions of Prepar3D. Because SimConnect 10.0.61259.0 is a 32 bit library, you must use the 32 bit version of NodeJS in order to import the module.

To install node-simconnect using the included binary:

`npm install node-simconnect`

**Note: The included binary requires the 32 bit version of NodeJS.**

# Usage :grey_question:
Import the module and create an instance:

```ts
const { SimConnect } = require('node-simconnect');

const simConnect = new SimConnect();
```

## <a name="open"></a>open

Attempts to opens a session with SimConnect. If it fails to connect (eg. if sim is not running), the function immediately returns `false`. The success callback function will provide the `Client` object which you will use to interact with the simulator. The available features are described below. Please refer to [example.js](examples/nodejs/example.js) for more help.

```ts
open(
    appName: string, 
    onSuccess: (client: Client) => void, 
    onQuit: () => void, 
    onException: (details) => void, 
    onError: (details) => void
) : boolean;
```

```ts
const ok = simConnect.open(
    "My app's name", 
    successCallback,
    quitCallback,
    exceptionCallback,
    errorCallback
);

if (!ok) {
    console.log('Failed to connect. Please try again.');
}

function successCallback(client) {
    const { name, version } = client;
    console.log(`Connected to: ${name}\nSimConnect version: ${version}`);
    // ... do stuff with client 
}

function quitCallback() {
    console.log('Sim quit');
}

function exceptionCallback(details) {
    const { name, dwException, dwSendID, dwIndex } = details;
    console.log(`The following exception occured: ${name}`);
}

function errorCallback(details) {
    const { message, NTSTATUS } = details;
    console.log(`The following error occured: ${message}`);
}
```

## <a name="requestDataOnSimObject"></a>requestDataOnSimObject

Request one or more [Simulation Variables](https://msdn.microsoft.com/en-us/library/cc526981.aspx) and set a callback function to later handle the received data. See [SDK Reference](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SimConnect_RequestDataOnSimObject) for more details.

Each simulation variable is defined by an array. 

Definition:
```ts
requestDataOnSimObject(
    requestedValues: any[][] | number,
    options: {
        period: PERIOD,           // SIMCONNECT_PERIOD_...
        objectId: OBJECT_ID,      // SIMCONNECT_OBJECT_...
        flags: DATA_REQUEST_FLAG, // SIMCONNECT_DATA_REQUEST_FLAG_...
    },
    callback: (data: any) => void
) : void
```
Requested value example: 
```ts
[
    "Plane Latitude",      // Datum name
    "degrees",             // Units name
    DATA_TYPE.FLOAT64,     // Datum type (optional, FLOAT64 is default and works for most data types)
    0                      // Epsilon (optional, 0 is default)
]    
```
Full example:
```ts
client.requestDataOnSimObject([
    ["Plane Latitude", "degrees"],
    ["Plane Longitude", "degrees"],
    ["PLANE ALTITUDE", "feet"]
], {
    period: PERIOD.SIM_FRAME,           // SIMCONNECT_PERIOD_ONCE
    objectId: OBJECT_ID.USER,           // SIMCONNECT_OBJECT_ID_USER
    flags: DATA_REQUEST_FLAG.CHANGED,   // SIMCONNECT_DATA_REQUEST_FLAG_DEFAULT
}, (data) => {
    console.log(
        "Latitude:  " + data["Plane Latitude"] + "\n" +
        "Longitude: " + data["Plane Longitude"] + "\n" +
        "Altitude:  " + data["PLANE ALTITUDE"] + " feet"
    );
});
```

## <a name="requestDataOnSimObjectType"></a>requestDataOnSimObjectType
Similar to `requestDataOnSimObject`. Used to retrieve information about simulation objects of a given type that are within a specified radius of the user's aircraft. See [SDK Reference](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SimConnect_RequestDataOnSimObjectType) for more details.

Definition:
```ts
requestDataOnSimObjectType(
    requestedValues: any[][] | number,
    options: {
        radius: number,
        type: SIMOBJECT_TYPE,      // SIMCONNECT_SIMOBJECT_TYPE_...
    },
    callback: (data: any) => void
) : void
```
Example: This will receive info about all aircraft within a 10 km radius. The callback will run one time for each identified aircraft. Notice that when `STRINGV` is requested, the unit should be `null`
```ts
client.requestDataOnSimObjectType([
    ["ATC MODEL", null, 11],        // SIMCONNECT_DATATYPE_STRINGV
    ["Plane Latitude", "degrees"],
    ["Plane Longitude", "degrees"]
], { 
    radius: 10000, 
    type: SIMOBJECT_TYPE.AIRCRAFT
}, (data) => {
    // Called for each aircraft
    console.log(data);
});
```

## <a name="createDataDefinition"></a>createDataDefinition
Used to create a data definition. Returns an id which can be used with `requestDataOnSimObject`/`requestDataOnSimObjectType` in place of the 2D array. This should be used when you have multiple requests for the same data - otherwise the app will crash after receiving too many requests. Example:

```ts
createDataDefinition(requestedValues: any[][]) : number
```

```ts
var navInfoDefId = client.createDataDefinition([
    ["NAV DME:1", "Nautical miles"],
    ["NAV GLIDE SLOPE ERROR:1", "Degrees"],
    ["NAV RADIAL ERROR:1", "Degrees"],
]);

setInterval(() => {
    client.requestDataOnSimObjectType(
        navInfoDefId, 
        {
            radius: 0,
            type: SIMOBJECT_TYPE.USER,      // SIMCONNECT_SIMOBJECT_TYPE_...
        }, 
        (data) => {
            console.log(data)
        }
    );
}, 1000);
```

## <a name="setDataOnSimObject"></a>setDataOnSimObject
Set a single [Simulation Variable](https://msdn.microsoft.com/en-us/library/cc526981.aspx) on user aircraft. First parameter is the datum name, second is the units name and last is the value.

Definition:
```ts
setDataOnSimObject(
    variableName: string, 
    unit: string, 
    value: number
) : void
```

Example:
```ts
client.setDataOnSimObject("GENERAL ENG THROTTLE LEVER POSITION:1", "Percent", 50);
```

## <a name="subscribeToSystemEvent"></a>subscribeToSystemEvent
Subscribe to a system event. See [SDK Reference](https://msdn.microsoft.com/en-us/library/cc526983.aspx#SimConnect_SubscribeToSystemEvent) for available events.

```ts
subscribeToSystemEvent(
    eventName: string, 
    callback: (value: number) => void
) : void
```

Example:
```ts
client.subscribeToSystemEvent("Pause", (paused) => { 
    // Called when the system event occurs
    console.log(paused ? "Sim paused" : "Sim un-paused");
});
```

## <a name="close"></a>close
Manually close the connection to SimConnect. Returns `false` if it fails.

```ts
close() : boolean
```

Example:
```ts
const success = client.close();
```

# Manual build 🔨
You might wish to build node-simconnect manually (eg. with the 64-bit SimConnect SDK that comes with Prepar3D v4). Due to the licensing of the SimConnect SDK the library files are not included in this repository, so you must provide these yourself.

## Requirements
* FSX or P3D SimConnect SDK files (.lib and .h). 
* Node.js (32 or 64 bit depending on which SDK you are using. FSX is 32 bit)
* Python and MSVS 2017 build tools or newer. Check out [windows-build-tools](https://www.npmjs.com/package/windows-build-tools).


## Build 
You must provide your own copy of the SDK files. By default these can be found here:

* Microsoft Flight Simulator ("2020")
  * `MSFS SDK/SimConnect SDK/include/SimConnect.h`
  * `MSFS SDK/SimConnect SDK/lib/static/SimConnect.lib`
* FSX Steam Edition
  * `FSX/SDK/Core Utilities Kit/SimConnect SDK/inc/SimConnect.h`
  * `FSX/SDK/Core Utilities Kit/SimConnect SDK/lib/SimConnect.lib`

Once you have located the SDK files

1. Navigate to `[your project]/node-modules/node-simconnect`
1. Create a folder named `SimConnect` and copy the two folders `inc` and `lib` from the SimConnect SDK installation over to the new directory. These should include `SimConnect.h` and `SimConnect.lib`, respectively.
1. Open a terminal in `[your project]/node-modules/node-simconnect` and run `npm run rebuild`.
1. Verify that the build is working by running the example program: `node examples/nodejs/example.js`.

**Note:** Your app will attempt to load the binary file in the following order:
1. `build/Release`
1. `build/Debug`
1. `bin/win_ia32` (included pre build)

# Using node-simconnect with Electron or NW.JS :electron:
To use `node-simconnect` with Electron or NW.JS, the package must be built specifically for those frameworks. Read more about using native addons here: [Electron](https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md),  [NW.JS](http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/) 

## To build native Electron (version 11 or newer) addon:

  ```HOME=~/.electron-gyp node-gyp rebuild --target=11.0.0 --arch=ia32 --msvs_version=2017 --dist-url=https://electronjs.org/headers```
  
  (where `--target` is the version of Electron and `--arch` is either `ia32` or `x64`).

## To build native NW.JS addon:
  
  ```nw-gyp rebuild --target=0.49.1 --arch=ia32 --msvs_version=2017``` 
  
  (where `--target` is the version of NW.JS).

# Development

1. Install [Microsoft Visual Studio 2019](https://visualstudio.microsoft.com/) (Community Edition is sufficient)
1. Run `npm run rebuild:dev`
1. Open `build\binding.sln` 

### Debugging with Microsoft Visual Studio

1. In the Solution Explorer right click on **node_simconnect** and select **Properties**
1. Select **Configuration: Debug** 
1. Open the **Debugging** page and set the following properties:
   * **Command**: `$(ProgramFiles)\nodejs\node.exe`
   * **Command Arguments**: `$(ProjectDir)..\examples\nodejs\example.js`

## Licence
[MIT](https://opensource.org/licenses/MIT)
