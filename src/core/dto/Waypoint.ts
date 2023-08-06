import type { SimConnectData } from './SimConnectData';
import type { RawBuffer } from '../RawBuffer';
import type { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';

class Waypoint implements SimConnectData {
    /** Latitude of waypoint, in degrees */
    latitude = 0;

    /** Longitude of waypoint, in degrees  */
    longitude = 0;

    /** Altitude of waypoint, in feet */
    altitude = 0;

    /** flags of waypoints
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_ON_GROUND
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_REVERSE
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_ALTITUDE_IS_AGL
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_COMPUTE_VERTICAL_SPEED
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_SPEED_REQUESTED
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_THROTTLE_REQUESTED
     *
     */
    flags = 0;

    /** Speed, in kots. {@link flightsim.simconnect.SimConnectConstants#WAYPOINT_SPEED_REQUESTED} must be on */
    speed = 0;

    /** Throttle, in percent {@link flightsim.simconnect.SimConnectConstants#WAYPOINT_THROTTLE_REQUESTED} must be on */
    throttle = 0;

    readFrom(buffer: RawBuffer) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
        this.flags = buffer.readInt32();
        this.speed = buffer.readFloat64();
        this.throttle = buffer.readFloat64();
    }

    writeTo(packetBuilder: SimConnectPacketBuilder) {
        packetBuilder
            .putFloat64(this.latitude)
            .putFloat64(this.longitude)
            .putFloat64(this.altitude)
            .putInt32(this.flags)
            .putFloat64(this.speed)
            .putFloat64(this.throttle);
    }
}

export { Waypoint };
