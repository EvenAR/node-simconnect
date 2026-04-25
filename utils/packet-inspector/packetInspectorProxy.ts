/**
 * To run this file: "npx ts-node .\utils\packetInspectorProxy.ts"
 *
 * Starts a proxy server that can be used to inspect packages sent between
 * the SimConnect server and a client application. Inspired by
 * https://github.com/Dragonlaird/SimConnect_Proxy
 *
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

            targetSocket.write(Uint8Array.from(data));
            targetSocket.write(Uint8Array.from(Buffer.from(hexString, 'hex'))); // Forwarding the data to the target server
        });

        targetSocket.on('data', data => {
            console.log(
                `[SimConnect -> Application] ${data.length} bytes ::::::::::::::::::::::::\n`
            );
            const hexString = formatAndPrint(data);

            clientSocket.write(Uint8Array.from(data));
            clientSocket.write(Uint8Array.from(Buffer.from(hexString, 'hex'))); // Forwarding the data to the client
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
