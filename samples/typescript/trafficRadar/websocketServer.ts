const WebSocketServer = require('ws').Server;

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
    process.platform == 'darwin'
        ? 'open'
        : process.platform == 'win32'
        ? 'start'
        : 'xdg-open';

require('child_process').exec(`${command} file:///${__dirname}/index.html`);

export { client };
