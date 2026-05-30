# node-simconnect

[![npm version](https://badge.fury.io/js/node-simconnect.svg)](https://badge.fury.io/js/node-simconnect)
[![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict 'Strict TypeScript Checked')](https://www.typescriptlang.org)

Integrate your Node.js application with Microsoft Flight Simulator (X, 2020, 2024) and Prepar3D.

- ⚡ **Pure SimConnect over TCP or Windows named pipes**: communicates directly with the SimConnect protocol. No additional server, SDK files or middleware is required.
- 🔌 **Cross-platform**: works on Windows, macOS, and Linux. The simulator must run on Windows, but your Node.js app can run anywhere Node.js runs (including Raspberry Pi and Electron).
- 🧩 **Full TypeScript implementation**: while many community clients are bindings to the official SimConnect SDK, `node-simconnect` implements the client side directly in TypeScript.

Typical use cases include flight tracking applications, virtual airline clients, traffic injection tools, and hardware integrations. 

✈️ Projects built with `node-simconnect` include:

- **[FSLTL Injector](https://fslivetrafficliveries.com/user-guide/)** – live traffic injection for Microsoft Flight Simulator.
- **[Virtual Norwegian Pilot Client](https://www.virtualnorwegian.net/client)** – cross-platform pilot client for the Virtual Norwegian virtual airline.
- **[External CDU for the Asobo ATR](https://flightsim.to/addon/78075/msfs-atr-cdu)**

🛠️ *Building something with `node-simconnect`? Feel free to open a PR and add your project to the list.*

> [!NOTE]
> `node-simconnect` is a community-developed, open-source project and is not an official Microsoft product. The SimConnect API evolves frequently with new Microsoft Flight Simulator releases, and this library aims to stay current with new features.

## Installation and use

1. `npm install node-simconnect`
2. Check out the [/samples](https://github.com/EvenAR/node-simconnect/tree/master/samples) folder for example scripts.
3. Refer to the [official SimConnect documentation](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_API_Reference.htm) for comprehensive details on SimConnect APIs and usage.

There are also [auto generated API-docs](https://evenar.github.io/node-simconnect/).

### Getting started

You always start by calling [`open(...)`](https://evenar.github.io/node-simconnect/functions/open.html) which will attempt to open a connection with the SimConnect server (your flight simulator). If this succeeds you will get access to:

-   [`recvOpen`](https://evenar.github.io/node-simconnect/classes/RecvOpen.html): contains simulator information
-   [`handle`](https://evenar.github.io/node-simconnect/classes/SimConnectConnection.html): used for accessing the SimConnect APIs

Example:

```js
import { open, Protocol } from 'node-simconnect';

const EVENT_ID_PAUSE = 1;

open('My SimConnect client', Protocol.FSX_SP2)
    .then(function ({ recvOpen, handle }) {
        console.log('Connected to', recvOpen.applicationName);

        // 1. Subscribe for pause event
        handle.subscribeToSystemEvent(EVENT_ID_PAUSE, 'Pause');

        // 2. Handle pause event 
        handle.on('event', function (recvEvent) {
            switch (recvEvent.clientEventId) {
                case EVENT_ID_PAUSE:
                    console.log(recvEvent.data === 1 ? 'Sim paused' : 'Sim unpaused');
                    break;
            }
        });

        handle.on('exception', function (recvException) {
            console.log(recvException);
        });
        handle.on('quit', function () {
            console.log('Simulator quit');
        });
        handle.on('close', function () {
            console.log('Connection closed unexpectedly (simulator CTD?)');
        });

    })
    .catch(function (error) {
        console.log('Connection failed:', error);
    });
```


> [!NOTE]
> The protocol is forward compatible, so you can use the same protocol version for all Microsoft Flight Simulator releases. For example, `Protocol.FSX_SP2` will work for MSFS 2020 and MSFS 2024, although it limits you to the features available in FSX SP2. See the table below for more details on protocol versions.
>
>| Protocol | Description |
>|---|---|
>| `FSX_SP1` | FSX SP1, FSX SP2, MSFS 2020, MSFS 2024 and newer. |
>| `FSX_SP2` | FSX SP2, MSFS 2020, MSFS 2024 and newer. |
>| `KittyHawk` | MSFS 2020, MSFS 2024 and newer. |
>| `SunRise` | MSFS 2024 and newer. |

## node-simconnect vs the official API

### Supported APIs

Most of the APIs described in the [official SimConnect documentation](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_API_Reference.htm) are implemented in `node-simconnect`. For information on how each feature works, please refer to the official documentation. If you are missing any features in `node-simconnect` feel free to [open a new issue](https://github.com/EvenAR/node-simconnect/issues) or create a pull request.

For a complete list of available API methods, please refer to the [`SimConnectConnection`](https://evenar.github.io/node-simconnect/classes/SimConnectConnection.html) class.

### Data unwrapping

A major feature used by C/C++/C# implementation of SimConnect client libraries is the ability to directly cast a memory block to a user-defined structure. This is technically impossible to do in JavaScript or TypeScript since memory layout of classes and types are not accessible. Consequently, the wrapping/unwrapping steps must be done by the user.

Example using the official SimConnect SDK (C++):

```C++
// C++ code ////////////////////

struct Struct1 {
    double  kohlsmann;
    double  altitude;
    double  latitude;
    double  longitude;
    int     verticalSpeed;
};

// ....
    hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_1, "Kohlsman setting hg", "inHg");
    hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_1, "Indicated Altitude", "feet");
    hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_1, "Plane Latitude", "degrees");
    hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_1, "Plane Longitude", "degrees");
    hr = SimConnect_AddToDataDefinition(hSimConnect, DEFINITION_1, "VERTICAL SPEED", "Feet per second", SimConnectDataType.INT32);

    SimConnect_RequestDataOnSimObject(hSimConnect, REQUEST_1, DEFINITION_1, SIMCONNECT_OBJECT_ID_USER, SIMCONNECT_PERIOD_SECOND);
// ....

void CALLBACK MyDispatchProc(SIMCONNECT_RECV* pData, DWORD cbData) {
    switch(pData->dwID) {
        case SIMCONNECT_RECV_ID_SIMOBJECT_DATA: {
            SIMCONNECT_RECV_SIMOBJECT_DATA *pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA*) pData;
            switch(pObjData->dwRequestID) {
                case REQUEST_1:
                    Struct1 *pS = (Struct1*)&pObjData->dwData;
                    break;
                }
            break;
        }
    }
}
```

The code below demonstrates how the same is achieved with `node-simconnect`:

```ts
// TypeScript code ////////////////////

const REQUEST_1 = 0;
const DEFINITION_1 = 0;
// ....
handle.addToDataDefinition(DEFINITION_1, 'Kohlsman setting hg', 'inHg', SimConnectDataType.FLOAT64);
handle.addToDataDefinition(DEFINITION_1, 'Indicated Altitude', 'feet', SimConnectDataType.FLOAT64);
handle.addToDataDefinition(DEFINITION_1, 'Plane Latitude', 'degrees', SimConnectDataType.FLOAT64);
handle.addToDataDefinition(DEFINITION_1, 'Plane Longitude', 'degrees', SimConnectDataType.FLOAT64);
handle.addToDataDefinition(DEFINITION_1, 'VERTICAL SPEED', 'Feet per second', SimConnectDataType.INT32);

handle.requestDataOnSimObject(REQUEST_1, DEFINITION_1, SimConnectConstants.OBJECT_ID_USER, SimConnectPeriod.SIM_FRAME);

// ....
handle.on('simObjectData', recvSimObjectData => {
    switch (recvSimObjectData.requestID) {
        case REQUEST_1: {
            const receivedData = {
                // Read order is important!
                kohlsmann: recvSimObjectData.data.readFloat64(),
                altitude: recvSimObjectData.data.readFloat64(),
                latitude: recvSimObjectData.data.readFloat64(),
                longitude: recvSimObjectData.data.readFloat64(),
                verticalSpeed: recvSimObjectData.data.readInt32(),
            }
            break;
        }
    }
});
```

When the `simObjectData` callback is triggered, the `recvSimObjectData.data` is used to extract the requested simulation variables. These values are stored as a single continuous binary data chunk/buffer, maintaining the order in which the simulation variables were added to the data definition. In this case, the buffer is 288 bits long (64 + 64 + 64 + 64 + 32), or 36 bytes.

The `read...()` functions are used to extract each value individually. When the correct function is used, the reading "cursor" (offset) automatically moves after each read, positioning it at the beginning of the next value in the buffer. Consequently, it is crucial to ensure that the values are read in the same order and using the same data type as initially requested.

## Running over network?

If the Node.js application runs on the same computer as the flight simulator you don't need to worry about this part.

To connect from an external computer you must configure SimConnect to accept connections from other hosts. This procedure is also described in the official docs, but here is the short version:

1. Open `SimConnect.xml`. Where this file is located depends on your sim version:
   - MSFS 2024: [refer to offical docs](https://docs.flightsimulator.com/msfs2024/flighting/html/6_Programming_APIs/SimConnect/SimConnect_XML_Definition.htm)
   - MSFS 2020: [refer to offical docs](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_XML_Definition.htm)
   - FSX steam edition: `C:\Users\<USER>\AppData\Roaming\Microsoft\FSX`

1. Set property `<Address>0.0.0.0</Address>`. Example of a working SimConnect.xml file:

    ```xml
    <?xml version="1.0" encoding="Windows-1252"?>
    <SimBase.Document Type="SimConnect" version="1,0">
        <Filename>SimConnect.xml</Filename>
        <SimConnect.Comm>
            <Protocol>IPv4</Protocol>
            <Scope>local</Scope>
            <Port>5111</Port>
            <MaxClients>64</MaxClients>
            <MaxRecvSize>41088</MaxRecvSize>
            <Address>0.0.0.0</Address>
        </SimConnect.Comm>
    </SimBase.Document>
    ```

Connecting from a remote script can be done by providing the IP address of the flight simulator PC and the port number when calling `open`:

```js
const options = { remote: { host: 'localhost', port: 5111 } };

open('My SimConnect client', Protocol.FSX_SP2, options).then(/* ... */).catch(/* try again? */);
```

Note that if no connection options are specified, `node-simconnect` will auto-discover connection details in the following order:

1. Look for a [`SimConnect.cfg`](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_CFG_Definition.htm) in the folder where Node.js is located. If the script is running in Electron, this will be the folder where the Electron executable is installed.
1. Look for a [`SimConnect.cfg`](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_CFG_Definition.htm) in the user's home directory (`%USERPROFILE%`, eg. `C:\Users\<username>`)
1. Look for a named pipe in the Windows registry, automatically set by the simulator
1. Look for a port number in the Windows registry, automatically set by the simulator. node-simconnect will then connect to `localhost:<port>`.


## Background

This project is a port of the Java client library
[jsimconnect](https://github.com/mharj/jsimconnect), originally written by
[lc0277](https://www.fsdeveloper.com/forum/members/lc0277.1581). Details about the SimConnect protocol can be found on [lc0277's old website](http://web.archive.org/web/20090620063532/http://lc0277.nerim.net/jsimconnect/doc/flightsim/simconnect/package-summary.html#package_description). A huge thanks to everyone involved in that project! 🙏

`node-simconnect` was originally created to power a cross-platform virtual-airline flight tracker, and later grew into a general-purpose SimConnect library for Node.js.

The `node-simconnect` API mirrors the official SimConnect C/C++ SDK closely. This means developers familiar with the official SDK docs will recognize the same method names and patterns, and new SimConnect features are straightforward to implement. Note that an optional higher-level API is under development. In the meantime, if you want a more user-friendly API (including less manual data unwrapping), check out [msfs-simconnect-api-wrapper](https://www.npmjs.com/package/msfs-simconnect-api-wrapper), which supports some of the features.
