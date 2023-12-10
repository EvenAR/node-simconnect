/**
 * To run this file: "npx ts-node .\utils\packetInspectorProxy.ts"
 *
 * Starts a proxy server that can be used to inspect packages sent between
 * the SimConnect server and a client application. Inspired by
 * https://github.com/Dragonlaird/SimConnect_Proxy
 *
 * Requires SimConnect network setup. Create a SimConnect.xml in the following directory:
 * X:\Users\<USER>\AppData\Local\Packages\Microsoft.FlightSimulator_**********\LocalCache
 *
 *          <?xml version="1.0" encoding="Windows-1252"?>
 *          <SimBase.Document Type="SimConnect" version="1,0">
 *              <Filename>SimConnect.xml</Filename>
 *              <SimConnect.Comm>
 *                  <Protocol>IPv4</Protocol>
 *                  <Scope>local</Scope>
 *                  <Port>500</Port>
 *                  <MaxClients>64</MaxClients>
 *                  <MaxRecvSize>41088</MaxRecvSize>
 *                  <Address>0.0.0.0</Address>
 *              </SimConnect.Comm>
 *          </SimBase.Document>
 *
 *
 * Create a SimConnect.cfg file next to the client application .exe:
 *
 *          [SimConnect]
 *          Protocol=Ipv4
 *          Port=1337            # Must match the proxy server's port number
 *          Address=127.0.0.1
 */

import * as net from 'net';

const proxyHost = '127.0.0.1';
const proxyPort = 1337;

const simConnectHost = '127.0.0.1';
const simConnectPort = 500; // Must match the port number in SimConnect.xml

const server = net.createServer(clientSocket => {
    const targetSocket = net.connect(simConnectPort, simConnectHost, () => {
        console.log(`Proxy connected to target server: ${simConnectHost}:${simConnectPort}`);

        clientSocket.on('data', data => {
            console.log(
                `[Application -> SimConnect] ${data.length} bytes ::::::::::::::::::::::::\n`
            );
            const hexString = formatAndPrint(data);

            targetSocket.write(data);
            targetSocket.write(Buffer.from(hexString, 'hex')); // Forwarding the data to the target server
        });

        targetSocket.on('data', data => {
            console.log(
                `[SimConnect -> Application] ${data.length} bytes ::::::::::::::::::::::::\n`
            );
            const hexString = formatAndPrint(data);

            clientSocket.write(data);
            clientSocket.write(Buffer.from(hexString, 'hex')); // Forwarding the data to the client
        });

        clientSocket.on('end', () => {
            console.log('Client disconnected');
            targetSocket.end();
        });

        targetSocket.on('end', () => {
            console.log('Target server disconnected');
            clientSocket.end();
        });

        clientSocket.on('error', err => console.error(`Client socket error: ${err.message}`));
        targetSocket.on('error', err => console.error(`Target socket error: ${err.message}`));
    });

    clientSocket.on('end', () => {
        console.log('Client disconnected');
        targetSocket.end();
    });

    clientSocket.on('error', err => console.error(`Client socket error: ${err.message}`));
});

server.listen(proxyPort, proxyHost, () => {
    console.log(`Proxy server listening on ${proxyHost}:${proxyPort}`);
});

function formatAndPrint(data: Buffer): string {
    const hexString = data.toString('hex');
    for (let i = 0; i < hexString.length; i += 32) {
        const slice = hexString.slice(i, i + 32);
        const utf8String = Buffer.from(slice, 'hex').toString('utf-8');
        console.log(`${slice.match(/.{1,8}/g)?.join(' ')}\t\t${utf8String}`);
    }
    console.log('\n\n');
    return hexString; // Return the original hex string for forwarding
}
