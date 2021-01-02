import {EventEmitter} from "events";
import {SimConnectDataType} from "./SimConnectDataType";
import {SimConnectPeriod} from "./SimConnectPeriod";
import {SimObjectType} from "./SimObjectType";
import {SimConnectConstants} from "./SimConnectConstants";
import DataWrapper from "./DataWrapper";
import {RecvID, SimConnectMessage, SimConnectSocket} from "./SimConnectSocket";
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
					exception: data.readInt(),
					sendId: data.readInt(),
					index: data.readInt(),
				})
				break;
			case RecvID.ID_OPEN:
				this.emit("open", {
					applicationName: data.readString256(),
					applicationVersionMajor: data.readInt(),
					applicationVersionMinor: data.readInt(),
					applicationBuildMajor: data.readInt(),
					applicationBuildMinor: data.readInt(),
					simConnectVersionMajor: data.readInt(),
					simConnectVersionMinor: data.readInt(),
					simConnectBuildMajor: data.readInt(),
					simConnectBuildMinor: data.readInt(),
					reserved1: data.readInt(),
					reserved2: data.readInt()
				})
				break;
			case RecvID.ID_EVENT:
				const recvEvent: RecvEvent = {
					groupID: data.readInt(),
					eventID: data.readInt(),
					data: data.readInt()
				}
				this.emit("event", recvEvent)
				break;
			case RecvID.ID_SIMOBJECT_DATA:
				//data.skip(8)
				const recvSimObjectData: RecvSimObjectData = {
					requestID: data.readInt(),
					objectID: data.readInt(),
					defineID: data.readInt(),
					flags: data.readInt(),
					entryNumber: data.readInt(),
					outOf: data.readInt(),
					defineCount: data.readInt(),
					data: data
				}
				
				this.emit("simObjectData", recvSimObjectData)
				break;
			case RecvID.ID_SIMOBJECT_DATA_BYTYPE:
				const recvSimObjectDataByType: RecvSimObjectData = {
					requestID: data.readInt(),
					objectID: data.readInt(),
					defineID: data.readInt(),
					flags: data.readInt(),
					entryNumber: data.readInt(),
					outOf: data.readInt(),
					defineCount: data.readInt(),
					data: data
				}
				this.emit("simObjectDataByType", recvSimObjectDataByType)
			break;
			case RecvID.ID_SYSTEM_STATE:
				const recvSystemState: RecvSystemState = {
					requestID: data.readInt(),
					dataInteger: data.readInt(),
					dataFloat: data.readFloat(),
					dataString: data.readString(SimConnectConstants.MAX_PATH)
				}
				this.emit("systemState", recvSystemState)
			break;
			default:
				console.log("UNK", data)
				break;
		}
	}

    sendPacket(type: number) {
		// finalize packet
		const packetSize = this.writeBuffer.getOffset();
		this.writeBuffer.writeInt(packetSize, 0);	// size
		this.writeBuffer.writeInt(this.ourProtocol, 4);
		this.writeBuffer.writeInt(0xF0000000 | type, 8);
		this.writeBuffer.writeInt(this.currentIndex++, 12);
		this.writeBuffer.flip();
		const data = this.writeBuffer.getBufferCopy();
		this.clientSocket.write(data);
		this.packetsSent++;
		this.bytesSent += packetSize;
		//console.log("Sent " + ok + ": " + this.writeBuffer.buffer)
	}

	//////////////////////////////////////

    _open() {
		this.writeBuffer.prepare();
		this.writeBuffer.writeString256(this.appName)
		this.writeBuffer.writeInt(0);
		this.writeBuffer.writeByte(0x00);
		this.writeBuffer.writeByte(0x58);	// X
		this.writeBuffer.writeByte(0x53);	// S
		this.writeBuffer.writeByte(0x46);	// F
		if (this.ourProtocol == 2) {
			this.writeBuffer.writeInt(0);		// major version
			this.writeBuffer.writeInt(0);		// minor version
			this.writeBuffer.writeInt(SimConnectBuild.SP0);	// major build
			this.writeBuffer.writeInt(0);		// minor build
		} else if (this.ourProtocol == 3) {
			this.writeBuffer.writeInt(10);		// major version
			this.writeBuffer.writeInt(0);		// minor version
			this.writeBuffer.writeInt(SimConnectBuild.SP1);	// major build
			this.writeBuffer.writeInt(0);		// minor build
		} else if (this.ourProtocol == 4) {
			this.writeBuffer.writeInt(10);		// major version
			this.writeBuffer.writeInt(0);		// minor version
			this.writeBuffer.writeInt(SimConnectBuild.SP2_XPACK);	// major build
			this.writeBuffer.writeInt(0);		// minor build
		} else {
			console.log("YEYE")
			//throw new IllegalArgumentException(Messages.getString("SimConnect.InvalidProtocol")); //$NON-NLS-1$
		}
		this.sendPacket(0x01);	
	}


	subscribeToSystemEvent(clientEventID: number, eventName: string) {
		this.writeBuffer.prepare();
		this.writeBuffer.writeInt(clientEventID);
		this.writeBuffer.writeString256(eventName);
		this.sendPacket(0x17);
	}

	_definitionIds = []

	addToDataDefinition(dataDefId: number, datumName: string, unitsName: string | null, dataType?: SimConnectDataType, epsilon?: number, datumId?: number) {
		this.writeBuffer.prepare();
		this.writeBuffer.writeInt(dataDefId);
		this.writeBuffer.writeString256(datumName);
		this.writeBuffer.writeString256(unitsName);
		this.writeBuffer.writeInt(dataType || SimConnectDataType.FLOAT64);
		this.writeBuffer.writeFloat(epsilon || 0);
		this.writeBuffer.writeInt(datumId || SimConnectConstants.UNUSED);
		this.sendPacket(0x0C);
	}

	requestDataOnSimObject(dataRequestId: number, dataDefinitionId: number, objectId: number, period: SimConnectPeriod, flags?: number, origin?: number, interval?: number, limit?: number) {
		this.writeBuffer.prepare();
		this.writeBuffer.writeInt(dataRequestId);
		this.writeBuffer.writeInt(dataDefinitionId);
		this.writeBuffer.writeInt(objectId);
		this.writeBuffer.writeInt(period);
		this.writeBuffer.writeInt(flags || 0);
		this.writeBuffer.writeInt(origin || 0);
		this.writeBuffer.writeInt(interval || 0);
		this.writeBuffer.writeInt(limit || 0);
		this.sendPacket(0x0E);
	}

	requestDataOnSimObjectType(dataRequestId: number, dataDefinitionId: number, radiusMeters: number, type: SimObjectType) {
		this.writeBuffer.prepare();
		this.writeBuffer.writeInt(dataRequestId);
		this.writeBuffer.writeInt(dataDefinitionId);
		this.writeBuffer.writeInt(radiusMeters);
		this.writeBuffer.writeInt(type);
		this.sendPacket(0x0f);
	}

	setDataOnSimObject(dataDefinitionID: number, objectID: number, data: SimConnectData[]) {
		this.writeBuffer.prepare();
		this.writeBuffer.writeInt(dataDefinitionID);
		this.writeBuffer.writeInt(objectID);
		this.writeBuffer.writeInt(SimConnectConstants.DATA_SET_FLAG_DEFAULT);
		this.writeBuffer.writeInt(data.length);
		this.writeBuffer.writeInt(0);		// size
		data.forEach(sd => {
			sd.write(this.writeBuffer);
		});
		this.writeBuffer.writeInt(32, this.writeBuffer.getOffset() - 36);
		this.sendPacket(0x10);
	}
}

module.exports = {
	SimConnect, SimConnectSocket
};