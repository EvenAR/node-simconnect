# node-simconnect

[![npm version](https://badge.fury.io/js/node-simconnect.svg)](https://badge.fury.io/js/node-simconnect)
[![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict 'Strict TypeScript Checked')](https://www.typescriptlang.org)

A SimConnect client library for Node.JS, written in TypeScript. Integrates directly with the SimConnect protocol and runs on Windows, Linux and Mac.

## Credits

This project is a rewrite of the Java client library
[jsimconnect](https://github.com/mharj/jsimconnect), originally written by
[lc0277](https://www.fsdeveloper.com/forum/members/lc0277.1581).
Details about the protocol can be found on [lc0277's old website](http://web.archive.org/web/20090620063532/http://lc0277.nerim.net/jsimconnect/doc/flightsim/simconnect/package-summary.html#package_description).

## Instructions

Please refer to the `/samples` folder for help.

The API works similar to the SimConnect API described in the [official documentation](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_API_Reference.htm).

### Quick start

```js
import { open, Protocol } from 'node-simconnect';

const EVENT_ID_PAUSE = 1;

open('My SimConnect client', Protocol.FSX_SP2)
    .then(function ({ recvOpen, handle }) {
        // recvOpen: object containing simulator information
        // handle: the SimConnect handle
        console.log('Connected to', recvOpen.applicationName);
        handle.subscribeToSystemEvent(EVENT_ID_PAUSE, 'Pause');
        handle.on('event', function (recvEvent) {
            switch (recvEvent.clientEventId) {
                case EVENT_ID_PAUSE:
                    console.log(recvEvent.data === 1 ? 'Sim paused' : 'Sim unpaused');
                    break;
            }
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

### Running over network?

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

1. Provide the IP address of the simulator PC and the port number when calling `open`:

    ```js
    const options = { remote: { host: 'localhost', port: 5111 } };

    open('My SimConnect client', Protocol.FSX_SP2, options).then(/* ... */).catch(/* try again? */);
    ```

If no connection options are specified, node-simconnect will auto-discover connection details in the following order:

1. Look for a [`SimConnect.cfg`](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_CFG_Definition.htm) in the folder where Node.js is located. If the script is running in Electron, this will be the folder where the Electron executable is installed.
1. Look for a `SimConnect.cfg` in the user's home directory (`%USERPROFILE%`, eg. `C:\Users\<username>`)
1. Look for a named pipe in the Windows registry, automatically set by the simulator
1. Look for a port number in the Windows registry, automatically set by the simulator. node-simconnect will then connect to `localhost:<port>`.

### Functionality

node-simconnect is supposed to behave more or less in the same way as the offical SDK. Please refer to the
[official SimConnect documentation](https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/SimConnect_API_Reference.htm)
for a description of the methods below and how to use them. Note that any features that are new to the new
Microsoft Flight Simulator ("MSFS 2020"), or Lockheed Martin's Prepar3D, are not implemented (yet) due to
the current lack of knowledge about the related API changes. These features will likely not be researched
or implemented unless there are specific requests.

| Method                                      | Implemented | Tested FSX | Tested P3D | Tested MSFS |
| ------------------------------------------- | ----------- | ---------- | ---------- | ----------- |
| Prepar3D specific methods                   | TODO ?      | n/a        |            | n/a         |
| MSFS specific methods (if any?)             | TODO        | n/a        | n/a        |             |
| `addToDataDefinition`                       | ✅          | ✅         |            |             |
| `requestDataOnSimObject`                    | ✅          | ✅         |            |             |
| `clearDataDefinition`                       | ✅          | ✅         |            |             |
| `requestDataOnSimObjectType`                | ✅          | ✅         |            |             |
| `subscribeToSystemEvent`                    | ✅          | ✅         |            |             |
| `unsubscribeFromSystemEvent`                | ✅          | ✅         |            |             |
| `menu`                                      | ✅          | ✅         |            |             |
| `requestSystemState`                        | ✅          | ✅         |            |             |
| `setDataOnSimObject`                        | ✅          | ✅         |            |             |
| `subscribeToFacilities`                     | ✅          | ✅         |            |             |
| `unSubscribeToFacilities`                   | ✅          | ✅         |            |             |
| `weatherRequestObservationAtNearestStation` | ✅          | ✅         |            |             |
| `weatherRequestCloudState`                  | ✅          | ✅         |            |             |
| `text`                                      | ✅          | ✅         |            |             |
| `requestFacilitiesList`                     | ✅          | ✅         |            |             |
| `setSystemState`                            | ✅          |            |            |             |
| `addClientEventToNotificationGroup`         | ✅          |            |            |             |
| `mapClientEventToSimEvent`                  | ✅          |            |            |             |
| `setSystemEventState`                       | ✅          |            |            |             |
| `removeClientEvent`                         | ✅          |            |            |             |
| `setNotificationGroupPriority`              | ✅          |            |            |             |
| `clearNotificationGroup`                    | ✅          |            |            |             |
| `requestNotificationGroup`                  | ✅          |            |            |             |
| `mapInputEventToClientEvent`                | ✅          |            |            |             |
| `setInputGroupPriority`                     | ✅          |            |            |             |
| `removeInputEvent`                          | ✅          |            |            |             |
| `clearInputGroup`                           | ✅          |            |            |             |
| `setInputGroupState`                        | ✅          |            |            |             |
| `requestReservedKey`                        | ✅          |            |            |             |
| `weatherRequestInterpolatedObservation`     | ✅          |            |            |             |
| `weatherRequestObservationAtStation`        | ✅          |            |            |             |
| `weatherCreateStation`                      | ✅          |            |            |             |
| `weatherSetObservation`                     | ✅          |            |            |             |
| `weatherSetModeServer`                      | ✅          |            |            |             |
| `weatherSetModeTheme`                       | ✅          |            |            |             |
| `weatherSetModeGlobal`                      | ✅          |            |            |             |
| `weatherSetModeCustom`                      | ✅          |            |            |             |
| `weatherSetDynamicUpdateRate`               | ✅          |            |            |             |
| `weatherCreateThermal`                      | ✅          |            |            |             |
| `weatherRemoveThermal`                      | ✅          |            |            |             |
| `aICreateParkedATCAircraft`                 | ✅          |            |            |             |
| `aICreateEnrouteATCAircraft`                | ✅          |            |            |             |
| `aICreateNonATCAircraft`                    | ✅          |            |            |             |
| `aICreateSimulatedObject`                   | ✅          |            |            |             |
| `aIReleaseControl`                          | ✅          |            |            |             |
| `aIRemoveObject`                            | ✅          |            |            |             |
| `aISetAircraftFlightPlan`                   | ✅          |            |            |             |
| `executeMissionAction`                      | ✅          |            |            |             |
| `completeCustomMissionAction`               | ✅          |            |            |             |
| `cameraSetRelative6DOF`                     | ✅          |            |            |             |
| `menuAddItem`                               | ✅          |            |            |             |
| `menuDeleteItem`                            | ✅          |            |            |             |
| `menuAddSubItem`                            | ✅          |            |            |             |
| `menuDeleteSubItem`                         | ✅          |            |            |             |
| `mapClientDataNameToID`                     | ✅          |            |            |             |
| `createClientData`                          | ✅          |            |            |             |
| `addToClientDataDefinition`                 | ✅          |            |            |             |
| `clearClientDataDefinition`                 | ✅          |            |            |             |
| `requestClientData`                         | ✅          |            |            |             |
| `setClientData`                             | ✅          |            |            |             |
| `flightLoad`                                | ✅          |            |            |             |
| `flightSave`                                | ✅          |            |            |             |
| `flightPlanLoad`                            | ✅          |            |            |             |
