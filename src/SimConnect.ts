import ByteBuffer = require("bytebuffer");
import { EventEmitter } from "events";
import { SimConnectDataType } from "./SimConnectDataType";
import { SimConnectPeriod } from "./SimConnectPeriod";
import { SimObjectType } from "./SimObjectType";
import { SimConnectConstants } from "./SimConnectConstants";
import { RecvBuffer } from "./RecvBuffer";
import { SimConnectSocket, RecvID, SimConnectMessage } from "./SimConnectSocket";

const regedit = require("regedit");

const RECEIVE_SIZE = 65536;
const PROTOCOL = 0x4;

const SIMCONNECT_BUILD_SP0		    = 60905;
const SIMCONNECT_BUILD_SP1		    = 61355;
const SIMCONNECT_BUILD_SP2_XPACK	= 61259;

interface RecvOpen {
	applicationName: string,
	applicationVersionMajor: number,
	applicationVersionMinor: number,
	applicationBuildMajor: number,
	applicationBuildMinor: number,
	simConnectVersionMajor: number,
	simConnectVersionMinor: number,
	simConnectBuildMajor: number,
	simConnectBuildMinor: number,
	reserved1: number,
	reserved2: number
}

interface RecvSimObjectData {
	requestID: number,
	objectID: number,
	defineID: number,
	flags: number,
	entryNumber: number,
	outOf: number,
	defineCount: number,
	data: RecvBuffer
}

interface RecvOpen {
    applicationName: string,
    applicationVersionMajor: number,
    applicationVersionMinor: number,
    applicationBuildMajor: number,
    applicationBuildMinor: number,
    simConnectVersionMajor: number,
    simConnectVersionMinor: number,
    simConnectBuildMajor: number,
    simConnectBuildMinor: number,
    reserved1: number,
    reserved2: number
}

interface RecvEvent {
    groupID: number,
    eventID: number,
    data: number
}

interface RecvSystemState {
	requestID: number,
	dataInteger: number,
	dataFloat: number,
	dataString: string
}

declare interface SimConnect {
    on(event: "open", handler: (recvOpen: RecvOpen) => void): this;
    on(event: "event", handler: (recvEvent: RecvEvent) => void): this;
    on(event: "simObjectData", handler: (recvSimObjectData: RecvSimObjectData) => void): this;
    on(event: "simObjectDataByType", handler: (recvSimObjectData: RecvSimObjectData) => void): this;
    on(event: "systemState", handler: (recvSystemState: RecvSystemState) => void): this;
}

class SimConnect extends EventEmitter {
	appName: string;
    writeBuffer: ByteBuffer;
    ourProtocol: number;
    packetsSent: number;
    bytesSent: number;
	currentIndex: number;
	clientSocket: SimConnectSocket;

    constructor(appName: string, config: any, simConnectProtocol: number) {
		super();
        this.appName = appName;
        this.packetsSent = 0;
        this.bytesSent = 0;
        this.currentIndex = 0;
        this.ourProtocol = simConnectProtocol;
		this.writeBuffer = ByteBuffer.allocate(RECEIVE_SIZE, true);

		this.clientSocket = new SimConnectSocket();

		readRegKey("SimConnect_Port_IPv4").then(port => {
			this.clientSocket.on("connect", () => this.onOpen());
			this.clientSocket.on("data", (data: SimConnectMessage) => this.handleMessage(data.id, data.data));
			this.clientSocket.connect({host: "localhost", port: parseInt(port, 10)})
		})
    }

	handleMessage(id: RecvID, data: RecvBuffer) {
		switch(id) {
			case RecvID.ID_EXCEPTION:
				console.log("Exception", {
					exception: data.readInt32(),
					sendId: data.readInt32(),
					index: data.readInt32(),
				})
				break;
			case RecvID.ID_OPEN:
				this.emit("open", {
					applicationName: data.readString256(),
					applicationVersionMajor: data.readInt32(),
					applicationVersionMinor: data.readInt32(),
					applicationBuildMajor: data.readInt32(),
					applicationBuildMinor: data.readInt32(),
					simConnectVersionMajor: data.readInt32(),
					simConnectVersionMinor: data.readInt32(),
					simConnectBuildMajor: data.readInt32(),
					simConnectBuildMinor: data.readInt32(),
					reserved1: data.readInt32(),
					reserved2: data.readInt32()
				})
				break;
			case RecvID.ID_EVENT:
				const recvEvent: RecvEvent = {
					groupID: data.readInt32(),
					eventID: data.readInt32(),
					data: data.readInt32()
				}
				this.emit("event", recvEvent)
				break;
			case RecvID.ID_SIMOBJECT_DATA:
				//data.skip(8)
				const recvSimObjectData: RecvSimObjectData = {
					requestID: data.readInt32(),
					objectID: data.readInt32(),
					defineID: data.readInt32(),
					flags: data.readInt32(),
					entryNumber: data.readInt32(),
					outOf: data.readInt32(),
					defineCount: data.readInt32(),
					data: data
				}
				
				this.emit("simObjectData", recvSimObjectData)
				break;
			case RecvID.ID_SIMOBJECT_DATA_BYTYPE:
				const recvSimObjectDataByType: RecvSimObjectData = {
					requestID: data.readInt32(),
					objectID: data.readInt32(),
					defineID: data.readInt32(),
					flags: data.readInt32(),
					entryNumber: data.readInt32(),
					outOf: data.readInt32(),
					defineCount: data.readInt32(),
					data: data
				}
				this.emit("simObjectDataByType", recvSimObjectDataByType)
			break;
			case RecvID.ID_SYSTEM_STATE:
				const recvSystemState: RecvSystemState = {
					requestID: data.readInt32(),
					dataInteger: data.readInt32(),
					dataFloat: data.readFloat32(),
					dataString: data.readString(SimConnectConstants.MAX_PATH)
				}
				this.emit("systemState", recvSystemState)
			break;
			default:
				console.log("UNK", data)
				break;
		}
	}

    clean() {
		this.writeBuffer.clear();
		this.writeBuffer.offset = 16;
    }
    
    putString(bf: ByteBuffer, s: string | null, fixed: number) {
		if(s === null) s = "";
		bf.writeString(s)
		if (s.length < fixed) {
			for (let i = 0; i < (fixed - s.length); i++) {
				bf.writeByte(0x00);
			}
		}
	}

    sendPacket(type: number) {
		// finalize packet
		const packetSize = this.writeBuffer.offset;
		this.writeBuffer.writeInt32(packetSize, 0);	// size
		this.writeBuffer.writeInt32(this.ourProtocol, 4);
		this.writeBuffer.writeInt32(0xF0000000 | type, 8);
		this.writeBuffer.writeInt32(this.currentIndex++, 12);
		this.writeBuffer.flip();
		const data = this.writeBuffer.toBuffer(true);
		this.clientSocket.write(data);
		this.packetsSent++;
		this.bytesSent += packetSize;
		//console.log("Sent " + ok + ": " + this.writeBuffer.buffer)
	}

	//////////////////////////////////////

    onOpen() {
		this.clean();
		this.putString(this.writeBuffer, this.appName, 256);
		this.writeBuffer.writeInt(0);
		this.writeBuffer.writeByte(0x00);
		this.writeBuffer.writeByte(0x58);	// X
		this.writeBuffer.writeByte(0x53);	// S
		this.writeBuffer.writeByte(0x46);	// F
		if (this.ourProtocol == 2) {
			this.writeBuffer.writeInt(0);		// major version
			this.writeBuffer.writeInt(0);		// minor version
			this.writeBuffer.writeInt(SIMCONNECT_BUILD_SP0);	// major build
			this.writeBuffer.writeInt(0);		// minor build
		} else if (this.ourProtocol == 3) {
			this.writeBuffer.writeInt(10);		// major version
			this.writeBuffer.writeInt(0);		// minor version
			this.writeBuffer.writeInt(SIMCONNECT_BUILD_SP1);	// major build
			this.writeBuffer.writeInt(0);		// minor build
		} else if (this.ourProtocol == 4) {
			this.writeBuffer.writeInt(10);		// major version
			this.writeBuffer.writeInt(0);		// minor version
			this.writeBuffer.writeInt(SIMCONNECT_BUILD_SP2_XPACK);	// major build
			this.writeBuffer.writeInt(0);		// minor build
		} else {
			console.log("YEYE")
			//throw new IllegalArgumentException(Messages.getString("SimConnect.InvalidProtocol")); //$NON-NLS-1$
		}
		this.sendPacket(0x01);	
	}


	subscribeToSystemEvent(clientEventID: number, eventName: string) {
		this.clean();
		this.writeBuffer.writeInt32(clientEventID);
		this.putString(this.writeBuffer, eventName, 256);
		this.sendPacket(0x17);
	}

	_definitionIds = []

	addToDataDefinition(dataDefId: number, datumName: string, unitsName: string | null, dataType: SimConnectDataType, epsilon: number, datumId: number) {
		this.clean();
		this.writeBuffer.writeInt32(dataDefId);
		this.putString(this.writeBuffer, datumName, 256)
		this.putString(this.writeBuffer, unitsName, 256)
		this.writeBuffer.writeInt32(dataType)
		this.writeBuffer.writeFloat32(epsilon);
		this.writeBuffer.writeInt32(datumId);
		this.sendPacket(0x0C);
	}

	requestDataOnSimObject(dataRequestId: number, dataDefinitionId: number, objectId: number, period: SimConnectPeriod, flags: number, origin: number, interval: number, limit: number) {
		this.clean();
		this.writeBuffer.writeInt32(dataRequestId);
		this.writeBuffer.writeInt32(dataDefinitionId);
		this.writeBuffer.writeInt32(objectId);
		this.writeBuffer.writeInt32(period);
		this.writeBuffer.writeInt32(flags);
		this.writeBuffer.writeInt32(origin);
		this.writeBuffer.writeInt32(interval);
		this.writeBuffer.writeInt32(limit);
		this.sendPacket(0x0E);
	}

	requestDataOnSimObjectType(dataRequestId: number, dataDefinitionId: number, radiusMeters: number, type: SimObjectType) {
		this.clean();
		this.writeBuffer.writeInt32(dataRequestId);
		this.writeBuffer.writeInt32(dataDefinitionId);
		this.writeBuffer.writeInt32(radiusMeters);
		this.writeBuffer.writeInt32(type);
		this.sendPacket(0x0f);
	}
}

function readRegKey(subKey: string): Promise<string> {
	const FS_KEY = "HKCU\\Software\\Microsoft\\Microsoft Games\\Flight Simulator";
	return new Promise((resolve, reject) => {
		regedit.list(FS_KEY, (err: any, result: any) => {
			if(err) { 
				reject() 
			} else {
				console.log(result[FS_KEY].values[subKey].value)

				resolve(result[FS_KEY].values[subKey].value);
			}
		})
	})
	
}

module.exports = {
	SimConnect, SimConnectSocket
};