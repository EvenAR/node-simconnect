import ByteBuffer = require("bytebuffer");

interface InitPosition {
    latitude: number,
    longitude: number,
    altitude: number,
    pitch: number,
    bank: number,
    heading: number,
    onGround: boolean,
    airspeed: number
}

interface MarkerState {
    markerName: string,
	/** the marker state, set to 1 for on and 0 for off. */
	markerState: boolean
}

interface Waypoint {
    	/** latitude of waypoint, in degrees */
	latitude: number;   // degrees
	/** longitude of waypoint, in degrees */
    longitude: number;  // degrees
    /** altitude of waypoint in feets */
    altitude: number;   // feet   
    /** flags of waypoints
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_ON_GROUND
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_REVERSE
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_ALTITUDE_IS_AGL
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_COMPUTE_VERTICAL_SPEED
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_SPEED_REQUESTED
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_THROTTLE_REQUESTED
     * 
     */
    flags: number;
    /** speed, in kots. {@link flightsim.simconnect.SimConnectConstants#WAYPOINT_SPEED_REQUESTED} must be on */
    speed: number;
    /** throttle, in percent {@link flightsim.simconnect.SimConnectConstants#WAYPOINT_THROTTLE_REQUESTED} must be on */
    throttle: number;
}

interface LatLonAlt {
    latitude: number,
    longitude: number,
    altitude: number
}

interface XYZ {
    x: number,
    y: number,
    z: number
}

class RecvBuffer {
    buffer: ByteBuffer
    
    constructor(buffer: ByteBuffer) {
        this.buffer = buffer; //ByteBuffer.wrap(buffer).LE(true);
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
	getInitPosition(): InitPosition {
        return {
            latitude: this.readFloat64(),
            longitude: this.readFloat64(),
            altitude: this.readFloat64(),
            pitch: this.readFloat64(),
            bank: this.readFloat64(),
            heading: this.readFloat64(),
            onGround: this.readInt32() !== 0,
            airspeed: this.readInt32(),
        }
    }
    getMarkerState(): MarkerState {
        return {
            markerName: this.readString64(),
            markerState: this.readInt32() !== 0
        }
    }
    getWaypoint(): Waypoint {
        return {
            latitude: this.readFloat64(),
            longitude: this.readFloat64(),
            altitude: this.readFloat64(),
            flags: this.readInt32(),
            speed: this.readFloat64(),
            throttle: this.readFloat64()
        }
    }
    getLatLonAlt(): LatLonAlt {
        return {
            latitude: this.readFloat64(),
		    longitude: this.readFloat64(),
		    altitude: this.readFloat64()
        }
    }
    getXYZ(): XYZ {
        return {
            x: this.readFloat64(),
		    y: this.readFloat64(),
		    z: this.readFloat64()
        }
    }
    
}

function makeString(bf: ByteBuffer, maxLength: number) {
    const length = bf.buffer.slice(bf.offset, bf.offset + maxLength).indexOf(0x00)
    const output = bf.readString(length)
    bf.skip(maxLength - length)
    return output;
}

export { RecvBuffer }