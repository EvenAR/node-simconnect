// Import the necessary type
import { ObjectId } from './Types';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SimConnectConstants {
    /** Specify the user aircraft in {@link SimConnectRecvEvents#simObjectDataByType} and {@link SimConnectConnection.requestDataOnSimObject} */
    export const OBJECT_ID_USER: ObjectId = 0 as ObjectId;

    export const UNUSED = 0xffffffff;

    /** current (and max) protocol version supported by this implementation of jsimconnect */
    export const PROTO_VERSION = 4;

    export const RECEIVE_SIZE = 65536;

    /** indicates that the value for the camera should be taken unmodified from the reference point. */
    // TODO: CAMERA_IGNORE_FIELD	: Float.MAX_VALUE,  //Used to tell the Camera API to NOT modify the value in this part of the argument.

    //	Weather observations Metar strings
    export const MAX_METAR_LENGTH = 2000;

    //	 Maximum thermal size is 100 km.
    export const MAX_THERMAL_SIZE = 100000;
    export const MAX_THERMAL_RATE = 1000;

    //	 SIMCONNECT_DATA_INITPOSITION.Airspeed
    /** The aircraft's design cruising speed. */
    export const INITPOSITION_AIRSPEED_CRUISE = -1;
    /** Maintain the current airspeed.  */
    export const INITPOSITION_AIRSPEED_KEEP = -2;

    /** a MS Windows constant */
    export const MAX_PATH = 260;

    /** Specifies requested speed is valid. */
    export const WAYPOINT_SPEED_REQUESTED = 0x04;
    /** Specifies requested throttle percentage is valid. */
    export const WAYPOINT_THROTTLE_REQUESTED = 0x08;
    /** Specifies that the vertical should be calculated to reach the required speed when crossing the waypoint. */
    export const WAYPOINT_COMPUTE_VERTICAL_SPEED = 0x10;
    /** Specifies the altitude specified is AGL (above ground level). */
    export const WAYPOINT_ALTITUDE_IS_AGL = 0x20;
    /** Specifies the waypoint should be on the ground. Make sure this flag is set if the aircraft is to taxi to this point. */
    export const WAYPOINT_ON_GROUND = 0x100000;
    /** Specifies that the aircraft should back up to this waypoint. This is only valid on the first waypoint. */
    export const WAYPOINT_REVERSE = 0x200000;
    /** Specifies that the next waypoint is the first waypoint. This is only valid on the last waypoint. */
    export const WAYPOINT_WRAP_TO_FIRST = 0x400000;

    /** When subscribed to event <code>MissionCompleted</code> */
    export const MISSION_FAILED = 0;
    /** When subscribed to event <code>MissionCompleted</code> */
    export const MISSION_CRASHED = 1;
    /** When subscribed to event <code>MissionCompleted</code> */
    export const MISSION_SUCCEEDED = 2;

    /** When subscribed to event <code>View</code>, 2D Panels in cockpit view */
    export const VIEW_SYSTEM_EVENT_DATA_COCKPIT_2D = 0x00000001;
    /** When subscribed to event <code>View</code>, Virtual (3D) panels in cockpit view */
    export const VIEW_SYSTEM_EVENT_DATA_COCKPIT_VIRTUAL = 0x00000002;
    /** When subscribed to event <code>View</code>, Orthogonal (Map) view */
    export const VIEW_SYSTEM_EVENT_DATA_ORTHOGONAL = 0x00000004;

    /** When subsribed to event <code>Sound</event> */
    export const SOUND_SYSTEM_EVENT_DATA_MASTER = 1;

    /** unknow group received */
    export const UNKNOWN_GROUP = 0xffffffff;

    /** automatically compute offset of the ClientData variable */
    export const CLIENTDATAOFFSET_AUTO = -1;

    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_1 = 0;
    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_2 = 1;
    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_3 = 2;
    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_4 = 3;
    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_5 = 4;
    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_6 = 5;
    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_7 = 6;
    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_8 = 7;
    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_9 = 8;
    /** Specifies that the user has selected the menu item. */
    export const TEXT_RESULT_MENU_SELECT_10 = 9;
    /** Specifies that the menu or text identified by the EventID is now on display. */
    export const TEXT_RESULT_DISPLAYED = 0x00010000;
    /** Specifies that the menu or text identified by the EventID is waiting in a queue. */
    export const TEXT_RESULT_QUEUED = 0x00010001;
    /** Specifies that the menu or text identified by the EventID has been removed from the queue. */
    export const TEXT_RESULT_REMOVED = 0x00010002;
    /**  Specifies that the menu or text identified by the EventID has been replaced in the queue. */
    export const TEXT_RESULT_REPLACED = 0x00010003;
    /** Specifies that the menu or text identified by the EventID has timed-out and is no longer on display. */
    export const TEXT_RESULT_TIMEOUT = 0x00010004;

    /** @see {@link SimConnectConnection.addToClientDataDefinition} */
    export const CLIENT_DATA_TYPE_INT8 = -1;
    /** @see {@link SimConnectConnection.addToClientDataDefinition} */
    export const CLIENT_DATA_TYPE_INT16 = -2;
    /** @see {@link SimConnectConnection.addToClientDataDefinition} */
    export const CLIENT_DATA_TYPE_INT32 = -3;
    /** @see {@link SimConnectConnection.addToClientDataDefinition} */
    export const CLIENT_DATA_TYPE_INT64 = -4;
    /** @see {@link SimConnectConnection.addToClientDataDefinition} */
    export const CLIENT_DATA_TYPE_FLOAT32 = -5;
    /** @see {@link SimConnectConnection.addToClientDataDefinition} */
    export const CLIENT_DATA_TYPE_FLOAT64 = -6;
}

module.exports = {
    SimConnectConstants,
};
