import { SimConnectData } from './SimConnectData';
import { RawBuffer } from '../RawBuffer';

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

    read(buffer: RawBuffer) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
        this.flags = buffer.readInt32();
        this.speed = buffer.readFloat64();
        this.throttle = buffer.readFloat64();
    }

    write(buffer: RawBuffer) {
        buffer.writeFloat64(this.latitude);
        buffer.writeFloat64(this.longitude);
        buffer.writeFloat64(this.altitude);
        buffer.writeInt32(this.flags);
        buffer.writeFloat64(this.speed);
        buffer.writeFloat64(this.throttle);
    }
}

export { Waypoint };
