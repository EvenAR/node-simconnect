# SimConnect Packet Inspector Proxy

This node.js script acts as a "man-in-the-middle" proxy for SimConnect,
allowing you to inspect the packets being sent between a client application
and the SimConnect server. It listens on a specified port and forwards the
packets to the actual SimConnect server while logging the contents of the packets to the console.

## How to use

Requires SimConnect network setup:

1. Copy the attached SimConnect.xml into the following directory:
    ```
    X:\Users\<USER>\AppData\Local\Packages\Microsoft.FlightSimulator_**********\LocalCache
    ```
2. Copy the SimConnect.cfg file into the folder of the client application you want to inspect (for instance an SDK demo application).

When your simulator is running, start the packet inspector proxy script using the following command:

```
npx ts-node packetInspectorProxy.ts
```

Then run the client application and watch the console output of the script.
