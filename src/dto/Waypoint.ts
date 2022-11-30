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
        this.latitude = buffer.readDouble();
        this.longitude = buffer.readDouble();
        this.altitude = buffer.readDouble();
        this.flags = buffer.readInt();
        this.speed = buffer.readDouble();
        this.throttle = buffer.readDouble();
    }

    write(buffer: RawBuffer) {
        buffer.writeDouble(this.latitude);
        buffer.writeDouble(this.longitude);
        buffer.writeDouble(this.altitude);
        buffer.writeInt(this.flags);
        buffer.writeDouble(this.speed);
        buffer.writeDouble(this.throttle);
    }
}

export { Waypoint };
