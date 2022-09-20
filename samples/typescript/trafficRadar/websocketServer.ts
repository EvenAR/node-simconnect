import childProcess = require('child_process');

import WebSocketServer = require('ws');
/**
 * Starts a websocket server and opens the default browser
 */

const wss = new WebSocketServer({
    port: 8080,
});

let client: WebSocket | undefined;

wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');
    client = ws;
});

const command =
    process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
        ? 'start'
        : 'xdg-open';

childProcess.exec(`${command} file:///${__dirname}/index.html`);

export { client };
