import { EventEmitter } from "events";
import { SimConnectDataType } from "./SimConnectDataType";
import { SimConnectPeriod } from "./SimConnectPeriod";
import { SimObjectType } from "./SimObjectType";
import { SimConnectConstants } from "./SimConnectConstants";
import DataWrapper from "./DataWrapper";
import { SimConnectSocket, RecvID, SimConnectMessage } from "./SimConnectSocket";
import {findSimConnectPortIPv4, SimConnectBuild} from "./configuration";
import SimConnectData from "./data/SimConnectData";

const RECEIVE_SIZE = 65536;

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
	data: DataWrapper
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
    writeBuffer: DataWrapper;
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
		this.writeBuffer = new DataWrapper(RECEIVE_SIZE);

		this.clientSocket = new SimConnectSocket();

		findSimConnectPortIPv4().then(port => {
			this.clientSocket.on("connect", this._open.bind(this));
			this.clientSocket.on("data", this.handleMessage.bind(this));
			this.clientSocket.connect({host: "localhost", port: port})
		})
    }

	handleMessage({id, data}: SimConnectMessage) {
		switch(id) {
			case RecvID.ID_EXCEPTION:
				this.emit("Exception", {
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
		this.writeBuffer.prepare();
    }

    sendPacket(type: number) {
		// finalize packet
		const packetSize = this.writeBuffer.getOffset();
		this.writeBuffer.writeInt32(packetSize, 0);	// size
		this.writeBuffer.writeInt32(this.ourProtocol, 4);
		this.writeBuffer.writeInt32(0xF0000000 | type, 8);
		this.writeBuffer.writeInt32(this.currentIndex++, 12);
		this.writeBuffer.flip();
		const data = this.writeBuffer.getBufferCopy();
		this.clientSocket.write(data);
		this.packetsSent++;
		this.bytesSent += packetSize;
		//console.log("Sent " + ok + ": " + this.writeBuffer.buffer)
	}

	//////////////////////////////////////

    _open() {
		this.clean();
		this.writeBuffer.writeString256(this.appName)
		this.writeBuffer.writeInt32(0);
		this.writeBuffer.writeByte(0x00);
		this.writeBuffer.writeByte(0x58);	// X
		this.writeBuffer.writeByte(0x53);	// S
		this.writeBuffer.writeByte(0x46);	// F
		if (this.ourProtocol == 2) {
			this.writeBuffer.writeInt32(0);		// major version
			this.writeBuffer.writeInt32(0);		// minor version
			this.writeBuffer.writeInt32(SimConnectBuild.SP0);	// major build
			this.writeBuffer.writeInt32(0);		// minor build
		} else if (this.ourProtocol == 3) {
			this.writeBuffer.writeInt32(10);		// major version
			this.writeBuffer.writeInt32(0);		// minor version
			this.writeBuffer.writeInt32(SimConnectBuild.SP1);	// major build
			this.writeBuffer.writeInt32(0);		// minor build
		} else if (this.ourProtocol == 4) {
			this.writeBuffer.writeInt32(10);		// major version
			this.writeBuffer.writeInt32(0);		// minor version
			this.writeBuffer.writeInt32(SimConnectBuild.SP2_XPACK);	// major build
			this.writeBuffer.writeInt32(0);		// minor build
		} else {
			console.log("YEYE")
			//throw new IllegalArgumentException(Messages.getString("SimConnect.InvalidProtocol")); //$NON-NLS-1$
		}
		this.sendPacket(0x01);	
	}


	subscribeToSystemEvent(clientEventID: number, eventName: string) {
		this.clean();
		this.writeBuffer.writeInt32(clientEventID);
		this.writeBuffer.writeString256(eventName);
		this.sendPacket(0x17);
	}

	_definitionIds = []

	addToDataDefinition(dataDefId: number, datumName: string, unitsName: string | null, dataType: SimConnectDataType, epsilon: number, datumId: number) {
		this.clean();
		this.writeBuffer.writeInt32(dataDefId);
		this.writeBuffer.writeString256(datumName);
		this.writeBuffer.writeString256(unitsName);
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

	setDataOnSimObject(dataDefinitionID: number, objectID: number, data: SimConnectData[]) {
		this.clean();
		this.writeBuffer.writeInt32(dataDefinitionID);
		this.writeBuffer.writeInt32(objectID);
		this.writeBuffer.writeInt32(SimConnectConstants.DATA_SET_FLAG_DEFAULT);
		this.writeBuffer.writeInt32(data.length);
		this.writeBuffer.writeInt32(0);		// size
		data.forEach(sd => {
			sd.write(this.writeBuffer);
		});
		this.writeBuffer.writeInt32(32, this.writeBuffer.getOffset() - 36);
		this.sendPacket(0x10);
	}
}

module.exports = {
	SimConnect, SimConnectSocket
};