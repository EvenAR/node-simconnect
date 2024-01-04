# node-simconnect

[![npm version](https://badge.fury.io/js/node-simconnect.svg)](https://badge.fury.io/js/node-simconnect)
[![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict 'Strict TypeScript Checked')](https://www.typescriptlang.org)

A non-official SimConnect client library written in TypeScript. Lets you write Node.js applications that communicates directly with Microsoft Flight Simulator, FSX and Prepar3D without need for additional SDK files. Runs on Windows, Linux and Mac.

This project is a port of the Java client library
[jsimconnect](https://github.com/mharj/jsimconnect), originally written by
[lc0277](https://www.fsdeveloper.com/forum/members/lc0277.1581). Details about the protocol can be found on [lc0277's old website](http://web.archive.org/web/20090620063532/http://lc0277.nerim.net/jsimconnect/doc/flightsim/simconnect/package-summary.html#package_description). A huge thanks to everyone involved in that project! :pray:

## Installation and use

> :bulb: Tip: check out the [msfs-simconnect-api-wrapper](https://www.npmjs.com/package/msfs-simconnect-api-wrapper) which provides a more user-friendly wrapper around some of the `node-simconnect` APIs.

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

        handle.subscribeToSystemEvent(EVENT_ID_PAUSE, 'Pause');
    })
    .catch(function (error) {
        console.log('Connection failed:', error);
    });
```

## node-simconnect vs the official API

### Supported APIs

Most of the APIs described in the [official SimConnect documentation](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_API_Reference.htm) are implemented in `node-simconnect`. For information on how each feature works, please refer to the official documentation.

Several new features have been added to the SimConnect API after the new Microsoft Flight Simulator was released, and more features are likely to come. Most of these will only be implemented on request. If you are missing any features in `node-simconnect` feel free to [open a new issue](https://github.com/EvenAR/node-simconnect/issues) or create a pull request.

Prepar3D support and Prepar3D-only-features will not be prioritized.

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

1. Open `SimConnect.xml`.

    - FSX: `X:\Users\<USER>\AppData\Roaming\Microsoft\FSX`
    - MSFS: `X:\Users\<USER>\AppData\Local\Packages\Microsoft.FlightSimulator_**********\LocalCache`.

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
