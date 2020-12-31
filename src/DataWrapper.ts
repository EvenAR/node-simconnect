import ByteBuffer = require("bytebuffer");
import InitPosition from "./data/InitPosition";
import SimConnectData from "./data/SimConnectData";
import MarkerState from "./data/MarkerState";
import Waypoint from "./data/Waypoint";
import LatLonAlt from "./data/LatLonAlt";
import XYZ from "./data/XYZ";

class DataWrapper {
    private readonly buffer: ByteBuffer;

    constructor(b: Buffer | number) {
        if (typeof b === "number") {
            this.buffer = ByteBuffer.wrap(new Buffer(b)).LE(true);
        } else {
            this.buffer = ByteBuffer.wrap(b).LE(true);
        }
    }

	prepare() {
		this.buffer.clear()
		this.buffer.offset = 16;
	}
	readInt32(): number {
		return this.buffer.readInt32()
	}
	readInt64(): Long {
		return this.buffer.readInt64()
	}
	readFloat32(): number {
        return this.buffer.readFloat32()
	}
	readFloat64() {
        return this.buffer.readFloat64()
	}
	readString8() {
        return makeString(this.buffer, 8)
	}
	readString32() {
        return makeString(this.buffer, 32)
	}
	readString64() {
        return makeString(this.buffer, 64)
	}
	readString128() {
        return makeString(this.buffer, 128)
	}
	readString256() {
        return makeString(this.buffer, 256)
	}
	readString260() {
        return makeString(this.buffer, 260)
	}
	readStringV() {
        const offset = this.buffer.offset;
        let strLen = 0;
        while (this.buffer.offset < this.buffer.limit) {
            strLen++;
            if (this.buffer.readByte() === 0) break;
        }
        this.buffer.offset -= strLen
        return makeString(this.buffer, strLen)
    }
    readString(length: number) {
        return makeString(this.buffer, length)
    }
    getData<T extends SimConnectData>(obj: T, offset?: number): T {
        obj.read(this);
        return obj;
    }
	readInitPosition(): InitPosition {
        return this.getData(new InitPosition());
    }
    readMarkerState(): MarkerState {
        return this.getData(new MarkerState())
    }
    readWaypoint(): Waypoint {
        return this.getData(new Waypoint())
    }
    readLatLonAlt(): LatLonAlt {
        return this.getData(new LatLonAlt())
    }
    readXYZ(): XYZ {
        return this.getData(new XYZ())
    }
}

function makeString(bf: ByteBuffer, maxLength: number) {
    const length = bf.buffer.slice(bf.offset, bf.offset + maxLength).indexOf(0x00)
    const output = bf.readString(length)
    bf.skip(maxLength - length)
    return output;
}

export default DataWrapper