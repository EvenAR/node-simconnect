import {Socket} from "net";
import * as ByteBuffer from "bytebuffer";
import {RecvBuffer} from "./RecvBuffer";
import {EventEmitter} from "events";

const RECEIVE_SIZE = 65536;

declare interface NetworkClient {
    on(event: "connect", handler: () => void): this;
    on(event: "message", handler: (message: RecvBuffer) => void): this;
}

class NetworkClient extends EventEmitter {
    client: Socket;
    readBuffer: ByteBuffer;
    _toReceive?: number;

    constructor() {
        super();
        this.client = new Socket();
        this.readBuffer = ByteBuffer.allocate(RECEIVE_SIZE, true);
    }

    openConnection(ip: string, port: number) {
        this.readBuffer = ByteBuffer.allocate(RECEIVE_SIZE, true);
        this._toReceive = undefined;

        this.client.setNoDelay(false);
        this.client.connect(port, "localhost");

        this.client.on("connect", () => {
            this.emit("connect");
        });
        this.client.on("close", console.log)
        this.client.on("data", data => {
            const bb = ByteBuffer.wrap(data).LE(true);
            this._onData(bb);
        });
        this.client.on("error", console.log)
        this.client.on("end", console.log)
    }

    write(data: Buffer) {
        this.client.write(data)
    }

    _onData(received: ByteBuffer) {
        if (this._toReceive === undefined) {
            this._toReceive = received.readInt32()
        }
        this.readBuffer.append(received)
        if (this.readBuffer.buffer.length >= this._toReceive) {
            const content = this.readBuffer.slice(0, this._toReceive)
            this.emit("message", new RecvBuffer(content))
            const rest = received.slice(this._toReceive)
            this.readBuffer.clear()
            this._toReceive = undefined
            if (rest.buffer.length > 0) {
                //this.handleData(rest)
            }
        }
    }
}

export default NetworkClient