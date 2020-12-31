import SimConnectData from "./SimConnectData";
import DataWrapper from "../DataWrapper";

class Waypoint implements SimConnectData {
    latitude: number = 0;   // degrees
    longitude: number = 0;  // degrees
    altitude: number = 0;   // feet
    /** flags of waypoints
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_ON_GROUND
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_REVERSE
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_ALTITUDE_IS_AGL
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_COMPUTE_VERTICAL_SPEED
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_SPEED_REQUESTED
     * @see flightsim.simconnect.SimConnectConstants#WAYPOINT_THROTTLE_REQUESTED
     *
     */
    flags: number = 0;
    speed: number = 0;      // knots
    throttle: number = 0;   // percent

    read(buffer: DataWrapper) {
        this.latitude = buffer.readFloat64();
        this.longitude = buffer.readFloat64();
        this.altitude = buffer.readFloat64();
        this.flags = buffer.readInt32();
        this.speed = buffer.readFloat64();
        this.throttle = buffer.readFloat64();
    };

    write(buffer: DataWrapper) {

    };
}

export default Waypoint;