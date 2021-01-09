# simconnect-js-client

A JavaScript implementation of a SimConnect client library.

### Credits

This project is greatly inspired by https://github.com/mharj/jsimconnect:

-   [Docs](http://web.archive.org/web/20090620063532/http://lc0277.nerim.net/jsimconnect/doc/flightsim/simconnect/package-summary.html#package_description) (discovered thanks to [this](https://www.fsdeveloper.com/forum/threads/jsimconnect.140243/) thread on the FSDeveloper forum)

### TODOs:

-   **MSFS**: find a good way to discover port number. Somewhere in registry? Can be found manually in `SimConnect.xml` under `C:\Users\<USER>\AppData\Local\Packages\Microsoft.FlightSimulator_**********\LocalCache`.

### Running over network?

Set property `<Address>0.0.0.0</Address>` in `SimConnect.xml`

```xml
<SimConnect.Comm>
    <Descr>IP4 Server</Descr>
    <Protocol>IPv4</Protocol>
    <Scope>local</Scope>
    <Port>501</Port>
    <MaxClients>64</MaxClients>
    <MaxRecvSize>41088</MaxRecvSize>
    <Address>0.0.0.0</Address>
</SimConnect.Comm>
```

## TODO

Tested ok:

-   `addToDataDefinition`
-   `requestDataOnSimObject`
-   `clearDataDefinition`
-   `requestDataOnSimObjectType`
-   `subscribeToSystemEvent`
-   `unsubscribeFromSystemEvent`
-   `requestSystemState`
-   `setDataOnSimObject`
-   `weatherRequestObservationAtNearestStation`
-   `weatherRequestCloudState`
-   `text`
-   `requestFacilitiesList`

Implemented but not tested:

-   `setSystemState`
-   `addClientEventToNotificationGroup`
-   `mapClientEventToSimEvent`
-   `setSystemEventState`
-   `removeClientEvent`
-   `setNotificationGroupPriority`
-   `clearNotificationGroup`
-   `requestNotificationGroup`
-   `mapInputEventToClientEvent`
-   `setInputGroupPriority`
-   `removeInputEvent`
-   `clearInputGroup`
-   `setInputGroupState`
-   `requestReservedKey`
-   `weatherRequestInterpolatedObservation`
-   `weatherRequestObservationAtStation`
-   `weatherCreateStation`
-   `weatherSetObservation`
-   `weatherSetModeServer`
-   `weatherSetModeTheme`
-   `weatherSetModeGlobal`
-   `weatherSetModeCustom`
-   `weatherSetDynamicUpdateRate`
-   `weatherCreateThermal`
-   `weatherRemoveThermal`
-   `aICreateParkedATCAircraft`
-   `aICreateEnrouteATCAircraft`
-   `aICreateNonATCAircraft`
-   `aICreateSimulatedObject`
-   `aIReleaseControl`
-   `aIRemoveObject`
-   `aISetAircraftFlightPlan`
-   `executeMissionAction`
-   `completeCustomMissionAction`
-   `cameraSetRelative6DOF`
-   `menuAddItem`
-   `menuDeleteItem`
-   `menuAddSubItem`
-   `menuDeleteSubItem`
-   `mapClientDataNameToID`
-   `createClientData`
-   `addToClientDataDefinition`
-   `clearClientDataDefinition`
-   `requestClientData`
-   `setClientData`
-   `flightLoad`
-   `flightSave`
-   `flightPlanLoad`
-   `menu`
-   `subscribeToFacilities`
-   `unSubscribeToFacilities`
