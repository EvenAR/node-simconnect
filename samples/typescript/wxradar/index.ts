import {
    open,
    Protocol,
    readLatLonAlt,
    RecvCloudState,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
} from '../../../dist';

const WebSocketServer = require('ws').Server;

/**
 * Starts a websocket server, opens a browser and renders
 * surrounding clouds on a canvas.
 */

const wss = new WebSocketServer({
    port: 8080,
});

let client: WebSocket | undefined;

wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');
    client = ws;
});

const startCommand =
    process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
        ? 'start'
        : 'xdg-open';

require('child_process').exec(
    `${startCommand} file:///${__dirname}/index.html`
);

// SimConnect client ////////////////////

enum DefinitionID {
    POSITION,
}

enum RequestID {
    POSITION,
    CLOUD_STATE,
}

const RANGE = 0.5; // Degrees of lat/lng
const ALT_RANGE = 1000; // Feet

open('Clouds example', Protocol.FSX_SP2)
    .then(({ recvOpen, handle }) => {
        console.log(recvOpen);
        handle.addToDataDefinition(
            DefinitionID.POSITION,
            'STRUCT LATLONALT',
            null,
            SimConnectDataType.LATLONALT
        );
        handle.requestDataOnSimObject(
            RequestID.POSITION,
            DefinitionID.POSITION,
            SimConnectConstants.OBJECT_ID_USER,
            SimConnectPeriod.SECOND
        );

        handle.on('cloudState', (cloudState: RecvCloudState) => {
            client?.send(JSON.stringify(cloudState.data));
        });

        handle.on('simObjectData', (data) => {
            if (data.requestID === RequestID.POSITION) {
                const pos = readLatLonAlt(data.data);
                console.log(pos);
                const altFt = pos.altitude * 3.2808;

                handle.weatherRequestCloudState(
                    RequestID.CLOUD_STATE,
                    pos.latitude - RANGE,
                    pos.longitude - RANGE,
                    altFt - ALT_RANGE,
                    pos.latitude + RANGE,
                    pos.longitude + RANGE,
                    altFt + ALT_RANGE
                );
            }
        });
    })
    .catch((error) => {
        console.log('Failed to connect', error);
    });
