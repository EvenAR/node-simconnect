const WebSocketServer = require('ws').Server;
import {
    Protocol,
    RecvCloudState,
    SimConnect,
    SimConnectConstants,
    SimConnectDataType,
    SimConnectPeriod,
} from '../../dist';

// WebSocket server ////////////////////

const wss = new WebSocketServer({
    port: 8080,
});

let client: WebSocket | undefined;

wss.on('connection', (ws: WebSocket) => {
    console.log('CONNECTED');
    client = ws;
});

const start =
    process.platform == 'darwin'
        ? 'open'
        : process.platform == 'win32'
        ? 'start'
        : 'xdg-open';
require('child_process').exec(
    start +
        ' file:///Users/evenrognlien/Documents/simconnect-js-client/examples/wxradar/index.html'
);

// SimConnect client ////////////////////

enum DEF_ID {
    POSITION,
}

enum REQ_ID {
    POSITION,
    CLOUD_STATE,
}

const sc = new SimConnect('Clouds example', Protocol.FSX_SP2);

sc.on('open', (recvOpen) => {
    console.log(recvOpen);

    sc.addToDataDefinition(
        DEF_ID.POSITION,
        'STRUCT LATLONALT',
        null,
        SimConnectDataType.LATLONALT
    );
    sc.requestDataOnSimObject(
        REQ_ID.POSITION,
        DEF_ID.POSITION,
        SimConnectConstants.OBJECT_ID_USER,
        SimConnectPeriod.SECOND
    );

    sc.on('cloudState', (cloudState: RecvCloudState) => {
        client?.send(JSON.stringify(cloudState.data));
    });

    sc.on('simObjectData', (data) => {
        if (data.requestID === REQ_ID.POSITION) {
            const pos = data.data.readLatLonAlt();

            const altFt = pos.altitude * 3.2808;
            const range = 10;
            const altRange = 100;
            sc.weatherRequestCloudState(
                REQ_ID.CLOUD_STATE,
                pos.latitude - range,
                pos.longitude - range,
                altFt - altRange,
                pos.latitude + range,
                pos.longitude + range,
                altFt + altRange
            );
        }
    });
});
