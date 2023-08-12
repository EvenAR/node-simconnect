# node-simconnect

[![npm version](https://badge.fury.io/js/node-simconnect.svg)](https://badge.fury.io/js/node-simconnect)
[![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict 'Strict TypeScript Checked')](https://www.typescriptlang.org)

A SimConnect client library for Node.js, written in TypeScript.

SimConnect is an API/SDK provided by Microsoft Flight Simulator and Lockheed Martin's Prepar3D, enabling external applications to exchange data with a running instance of the simulator. While official SDKs are exclusively available for C/C++/.Net, `node-simconnect` offers a streamlined approach for Node.js developers to access the same functionalities.

## Features

-   **Simplified API for Common Features**: The library introduces a simpler way to interact with frequently used SimConnect features, eliminating the need for complex boilerplate code.
-   **TypeScript Integration**: Developed using TypeScript, the library offers strong type checking, enhanced code completion, and improved code maintainability.
-   **Network Connectivity**: Just like the official SDK `node-simconnect` supports network connectivity, allowing applications to interact with the flight simulator over a network.
-   **Cross-Platform Compatibility**: While the official SDK only works on Windows, `node-simconnect` can be used to write applications for Linux and Mac as well (using network connectivity).

## Credits

The core functionality of this project is a result of a rewrite of the Java client library [jsimconnect](https://github.com/mharj/jsimconnect), initially developed by [lc0277](https://www.fsdeveloper.com/forum/members/lc0277.1581). [lc0277's archived website](http://web.archive.org/web/20090620063532/http://lc0277.nerim.net/jsimconnect/doc/flightsim/simconnect/package-summary.html#package_description) also describes the underlying protocol of SimConnect in detail, which has been very helpful.

A user-friendly interface has been written on top of this core functionality, making the library better resemble the modern coding style of JavaScript. The motivation for this work came from [Pomax/msfs-simconnect-api-wrapper](https://github.com/Pomax/msfs-simconnect-api-wrapper) and [Pomax's blogpost](https://pomax.github.io/are-we-flying/).

## Getting started

Install the library using npm:

```
npm install node-simconnect
```

The library introduces two primary APIs: `SimConnectApp` and `SimConnectConnection`.

### SimConnectApp

`SimConnectApp` offers a simplified interface for commonly used SimConnect features. Below is a basic example of using this class. For more detailed guidance, refer to the [/samples/simple](https://github.com/EvenAR/node-simconnect/tree/master/samples) directory.

```ts
import { ConnectionEvent, Protocol, SimConnectApp } from 'node-simconnect';

const app = new SimConnectApp('My App');

app.connect({
    minimumCompatability: Protocol.FSX_SP2,
    onConnect: onConnectedHandler,
    onRetry: reason => console.log('Retrying to connect', reason),
});

function onConnectedHandler({ apiHelpers }: ConnectionEvent) {
    /** Subscribe to a system event */
    apiHelpers.systemEvents.on(
        'Pause',
        data => {
            console.log(data === 0 ? 'Sim un-paused' : 'Sim Paused');
        },
        err => {
            console.log('Error subscribing to event:', err);
        }
    );

    /** Observe simulation variables */
    apiHelpers.simulationVariables.observe({
        changesOnly: true /** We don't need position updates when the aircraft doesn't move */,
        simulationVariables: {
            /**
             * All property names in this object must match a simulation
             * variable name found in the offical SimConnect docs.
             */
            PLANE_LATITUDE: {
                dataType: SimConnectDataType.FLOAT32,
                units: 'Degrees',
            },
            PLANE_LONGITUDE: {
                dataType: SimConnectDataType.FLOAT32,
                units: 'Degrees',
            },
        },
        onData: data => {
            /** The data object will have the same props as the input object (simulationVariables) */
            console.log(`Aircraft position: ${data.PLANE_LONGITUDE}, ${data.PLANE_LONGITUDE}`);
        },
        onError: err => {
            /** An error will for instance occur if you specify an unknown simulation variable */
            console.log(`Error:`, err);
        },
    });
}
```

### SimConnectConnection

For more advanced functionalities, developers can use the `SimConnectConnection` class. This provides greater control and access to a broader set of features, but it requires some knowledge of how SimConnect works. Things like registering data structures, managing event IDs, and de-structuring binary data must be handled manually similar to the official SDKs.

This class can be accessed through either the `ConnectionEvent` object from `SimConnectApp`, or in the `open` function's callback.

1. From the `SimConnectApp`'s `ConnectionEvent` object:

    ```ts
    const app = new SimConnectApp('My App');
    app.connect({
        minimumCompatability: Protocol.FSX_SP2,
        onConnect: connectionEvent => {
            const PAUSE_EVENT_ID = 0;
            connectionEvent.simConnectConnection.subscribeToSystemEvent(PAUSE_EVENT_ID, 'Pause');
            // ....
        },
        onRetry: reason => console.log('Retrying to connect', reason),
    });
    ```

1. From the callback when using `open`:
    ```ts
    open('My app', Protocol.FSX_SP2).then(openEvent => {
        const PAUSE_EVENT_ID = 0;
        openEvent.handle.simConnectConnection.subscribeToSystemEvent(PAUSE_EVENT_ID, 'Pause');
        // ....
    });
    ```

Several samples using this class can be found in the [/samples/advanced](https://github.com/EvenAR/node-simconnect/tree/master/samples) directory. Please refer to the [official SimConnect documentation](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_API_Reference.htm) for details on which features are available and how they work.

## Network Connectivity

To run node-simconnect over a network, follow these steps:

1. Open `SimConnect.xml`.

    - For FSX: `X:\Users\<USER>\AppData\Roaming\Microsoft\FSX`
    - For MSFS: `X:\Users\<USER>\AppData\Local\Packages\Microsoft.FlightSimulator_**********\LocalCache`.

1. Set the `<Address>` property to `0.0.0.0`. Here's an example configuration:

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

1. When calling the `open` function, provide the IP address of the simulator PC and the port number:

    ```js
    const options = { remote: { host: 'localhost', port: 5111 } };

    open('My SimConnect client', Protocol.FSX_SP2, options).then(/* ... */).catch(/* try again? */);
    ```

If no connection options are specified, `node-simconnect` will automatically discover connection details in the following order:

1. Look for a [`SimConnect.cfg`](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_CFG_Definition.htm) in the folder where Node.js is located. In the case of Electron applications, this will be the folder where the Electron executable is installed.
1. Search for a `SimConnect.cfg` in the user's home directory (`%USERPROFILE%`, e.g., `C:\Users\<username>`)
1. Check for a named pipe in the Windows registry, which is automatically set by the simulator.
1. Find a port number in the Windows registry, which is also automatically set by the simulator. In this case, `node-simconnect` will connect to `localhost:<port>`.

## New features

As Microsoft Flight Simulator continues to evolve, the SimConnect API has seen ongoing enhancements with new capabilities. The `node-simconnect` library strives to keep up with these developments. If there are any features absent from `node-simconnect`, feel free to contribute by opening a new issue or submitting a pull requests.

Note that Prepar3D support and Prepar3D-only feature requests will not be prioritized.
