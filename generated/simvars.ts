import { SimConnectDataType } from '../src/enums/SimConnectDataType';

export type PredefinedVariable = {
    name: string;
    units: string;
    dataType: SimConnectDataType;
    settable: boolean;
};

export const simvarPredefinitions = {
    /** Currently not used within the simulation. */
    AUTOPILOT_AIRSPEED_ACQUISITION: {
        name: 'AUTOPILOT AIRSPEED ACQUISITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** returns whether airspeed hold is active (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_AIRSPEED_HOLD: {
        name: 'AUTOPILOT AIRSPEED HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Currently not used within the simulation. */
    AUTOPILOT_AIRSPEED_HOLD_CURRENT: {
        name: 'AUTOPILOT AIRSPEED HOLD CURRENT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the target holding airspeed for the autopilot. */
    AUTOPILOT_AIRSPEED_HOLD_VAR: {
        name: 'AUTOPILOT AIRSPEED HOLD VAR',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the maximum calculated airspeed (kcas) limit set for the autopilot. */
    AUTOPILOT_AIRSPEED_MAX_CALCULATED: {
        name: 'AUTOPILOT AIRSPEED MAX CALCULATED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the minimum calculated airspeed (kcas) limit set for the autopilot. */
    AUTOPILOT_AIRSPEED_MIN_CALCULATED: {
        name: 'AUTOPILOT AIRSPEED MIN CALCULATED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** If enabled the Autopilot will use the Radio Altitude rather than the Indicated Altitude. */
    AUTOPILOT_ALT_RADIO_MODE: {
        name: 'AUTOPILOT ALT RADIO MODE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot is in Altitude Arm mode (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_ALTITUDE_ARM: {
        name: 'AUTOPILOT ALTITUDE ARM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Altitude hold active */
    AUTOPILOT_ALTITUDE_LOCK: {
        name: 'AUTOPILOT ALTITUDE LOCK',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Set or get the slot index which the altitude hold mode will track when captured. See alt_mode_slot_index for more information. */
    AUTOPILOT_ALTITUDE_LOCK_VAR: {
        name: 'AUTOPILOT ALTITUDE LOCK VAR',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the autopilot altitude is manually tunable or not. */
    AUTOPILOT_ALTITUDE_MANUALLY_TUNABLE: {
        name: 'AUTOPILOT ALTITUDE MANUALLY TUNABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Index of the slot that the autopilot will use for the altitude reference. Note that there are 3 slots (1, 2, 3) that you can set/get normally, however you can also target slot index 0. Writing to slot 0 will overwrite all other slots with the slot 0 value, and by default the autopilot will follow slot 0 if you have not selected any slot index.
          See alt_mode_slot_index for more information. */
    AUTOPILOT_ALTITUDE_SLOT_INDEX: {
        name: 'AUTOPILOT ALTITUDE SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** When true, the autopilot is currently flying the approach Flight Plan (the last legs). */
    AUTOPILOT_APPROACH_ACTIVE: {
        name: 'AUTOPILOT APPROACH ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true when the autopilot is active on the approach, once it reaches the adequate condition (in most cases, once it reaches the second-last waypoint of the flightplan). */
    AUTOPILOT_APPROACH_ARM: {
        name: 'AUTOPILOT APPROACH ARM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true when the lateral NAV mode is engaged and the angular deviation with the current tuned navigation frequency is less than 5°. */
    AUTOPILOT_APPROACH_CAPTURED: {
        name: 'AUTOPILOT APPROACH CAPTURED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether pproach mode is active (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_APPROACH_HOLD: {
        name: 'AUTOPILOT APPROACH HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true if the current approach is using a localizer. */
    AUTOPILOT_APPROACH_IS_LOCALIZER: {
        name: 'AUTOPILOT APPROACH IS LOCALIZER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Attitude hold active */
    AUTOPILOT_ATTITUDE_HOLD: {
        name: 'AUTOPILOT ATTITUDE HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Available flag */
    AUTOPILOT_AVAILABLE: {
        name: 'AUTOPILOT AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot has active managed avionics (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_AVIONICS_MANAGED: {
        name: 'AUTOPILOT AVIONICS MANAGED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot back course mode is active (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_BACKCOURSE_HOLD: {
        name: 'AUTOPILOT BACKCOURSE HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot bank hold mode is active (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_BANK_HOLD: {
        name: 'AUTOPILOT BANK HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current bank-hold bank reference.
          Note that if you set this, the next frame the value will be overwritten by the engine, so you may need to write to this every game frame to ensure it maintains the required value. */
    AUTOPILOT_BANK_HOLD_REF: {
        name: 'AUTOPILOT BANK HOLD REF',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Currently not used within the simulation. */
    AUTOPILOT_CRUISE_SPEED_HOLD: {
        name: 'AUTOPILOT CRUISE SPEED HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current default pitch mode of the autopilot as configured in the plane configuration with the parameter default_pitch_mode. */
    AUTOPILOT_DEFAULT_PITCH_MODE: {
        name: 'AUTOPILOT DEFAULT PITCH MODE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current default roll mode of the autopilot as configured in the plane configuration with the parameter default_bank_mode. */
    AUTOPILOT_DEFAULT_ROLL_MODE: {
        name: 'AUTOPILOT DEFAULT ROLL MODE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot has been disengaged (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_DISENGAGED: {
        name: 'AUTOPILOT DISENGAGED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flight director active */
    AUTOPILOT_FLIGHT_DIRECTOR_ACTIVE: {
        name: 'AUTOPILOT FLIGHT DIRECTOR ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Reference bank angle */
    AUTOPILOT_FLIGHT_DIRECTOR_BANK: {
        name: 'AUTOPILOT FLIGHT DIRECTOR BANK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Raw reference bank angle */
    AUTOPILOT_FLIGHT_DIRECTOR_BANK_EX1: {
        name: 'AUTOPILOT FLIGHT DIRECTOR BANK EX1',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Reference pitch angle */
    AUTOPILOT_FLIGHT_DIRECTOR_PITCH: {
        name: 'AUTOPILOT FLIGHT DIRECTOR PITCH',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Raw reference pitch angle */
    AUTOPILOT_FLIGHT_DIRECTOR_PITCH_EX1: {
        name: 'AUTOPILOT FLIGHT DIRECTOR PITCH EX1',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Boolean, toggles the autopilot Flight Level Change mode */
    AUTOPILOT_FLIGHT_LEVEL_CHANGE: {
        name: 'AUTOPILOT FLIGHT LEVEL CHANGE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** When true, the autopilot is receiving a signal from the runway beacon and is following the slope to reach the ground. */
    AUTOPILOT_GLIDESLOPE_ACTIVE: {
        name: 'AUTOPILOT GLIDESLOPE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true when the autopilot is active on the glide slope. */
    AUTOPILOT_GLIDESLOPE_ARM: {
        name: 'AUTOPILOT GLIDESLOPE ARM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot glidslope hold is active (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_GLIDESLOPE_HOLD: {
        name: 'AUTOPILOT GLIDESLOPE HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot heading lock is enabled (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_HEADING_LOCK: {
        name: 'AUTOPILOT HEADING LOCK',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Specifies / Returns the locked in heading for the autopilot. */
    AUTOPILOT_HEADING_LOCK_DIR: {
        name: 'AUTOPILOT HEADING LOCK DIR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the autopilot heading is manually tunable or not. */
    AUTOPILOT_HEADING_MANUALLY_TUNABLE: {
        name: 'AUTOPILOT HEADING MANUALLY TUNABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Index of the slot that the autopilot will use for the heading reference. Note that there are 3 slots (1, 2, 3) that you can set/get normally, however you can also target slot index 0. Writing to slot 0 will overwrite all other slots with the slot 0 value, and by default the autopilot will follow slot 0 if you have not selected any slot index. */
    AUTOPILOT_HEADING_SLOT_INDEX: {
        name: 'AUTOPILOT HEADING SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Mach hold active */
    AUTOPILOT_MACH_HOLD: {
        name: 'AUTOPILOT MACH HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the target holding mach airspeed
for the autopilot. */
    AUTOPILOT_MACH_HOLD_VAR: {
        name: 'AUTOPILOT MACH HOLD VAR',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Currently not used within the simulation. */
    AUTOPILOT_MANAGED_INDEX: {
        name: 'AUTOPILOT MANAGED INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns whether the managed speed is in mach (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_MANAGED_SPEED_IN_MACH: {
        name: 'AUTOPILOT MANAGED SPEED IN MACH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot managed throttle is active (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_MANAGED_THROTTLE_ACTIVE: {
        name: 'AUTOPILOT MANAGED THROTTLE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** On/off flag */
    AUTOPILOT_MASTER: {
        name: 'AUTOPILOT MASTER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the maximum banking angle for the autopilot, in radians. */
    AUTOPILOT_MAX_BANK: {
        name: 'AUTOPILOT MAX BANK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the index of the current maximum bank setting of the autopilot. */
    AUTOPILOT_MAX_BANK_ID: {
        name: 'AUTOPILOT MAX BANK ID',
        units: 'Integer',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Currently not used within the simulation. */
    AUTOPILOT_MAX_SPEED_HOLD: {
        name: 'AUTOPILOT MAX SPEED HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns TRUE (1) if the autopilot Nav1 lock is applied, or 0 (FALSE) otherwise. */
    AUTOPILOT_NAV1_LOCK: {
        name: 'AUTOPILOT NAV1 LOCK',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Index of Nav radio selected */
    AUTOPILOT_NAV_SELECTED: {
        name: 'AUTOPILOT NAV SELECTED',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Set to True if the autopilot pitch hold has is engaged. */
    AUTOPILOT_PITCH_HOLD: {
        name: 'AUTOPILOT PITCH HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the current autotpilot reference pitch. */
    AUTOPILOT_PITCH_HOLD_REF: {
        name: 'AUTOPILOT PITCH HOLD REF',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if autopilot rpm hold applied */
    AUTOPILOT_RPM_HOLD: {
        name: 'AUTOPILOT RPM HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Selected rpm */
    AUTOPILOT_RPM_HOLD_VAR: {
        name: 'AUTOPILOT RPM HOLD VAR',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of the slot that the autopilot will use for the RPM reference. Note that there are 3 slots (1, 2, 3) that you can set/get normally, however you can also target slot index 0. Writing to slot 0 will overwrite all other slots with the slot 0 value, and by default the autopilot will follow slot 0 if you have not selected any slot index. */
    AUTOPILOT_RPM_SLOT_INDEX: {
        name: 'AUTOPILOT RPM SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Currently not used within the simulation. */
    AUTOPILOT_SPEED_SETTING: {
        name: 'AUTOPILOT SPEED SETTING',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of the managed references */
    AUTOPILOT_SPEED_SLOT_INDEX: {
        name: 'AUTOPILOT SPEED SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Takeoff / Go Around power mode active */
    AUTOPILOT_TAKEOFF_POWER_ACTIVE: {
        name: 'AUTOPILOT TAKEOFF POWER ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot auto-throttle is armed (1, TRUE) or not (0, FALSE). */
    AUTOPILOT_THROTTLE_ARM: {
        name: 'AUTOPILOT THROTTLE ARM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This can be used to set/get the thrust lever position for autopilot maximum thrust. */
    AUTOPILOT_THROTTLE_MAX_THRUST: {
        name: 'AUTOPILOT THROTTLE MAX THRUST',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if autopilot vertical hold applied */
    AUTOPILOT_VERTICAL_HOLD: {
        name: 'AUTOPILOT VERTICAL HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Selected vertical speed */
    AUTOPILOT_VERTICAL_HOLD_VAR: {
        name: 'AUTOPILOT VERTICAL HOLD VAR',
        units: 'Feet (ft)/minute',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Index of the slot that the autopilot will use for the VS reference. Note that there are 3 slots (1, 2, 3) that you can set/get normally, however you can also target slot index 0. Writing to slot 0 will overwrite all other slots with the slot 0 value, and by default the autopilot will follow slot 0 if you have not selected any slot index. */
    AUTOPILOT_VS_SLOT_INDEX: {
        name: 'AUTOPILOT VS SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wing leveler active */
    AUTOPILOT_WING_LEVELER: {
        name: 'AUTOPILOT WING LEVELER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Yaw damper active */
    AUTOPILOT_YAW_DAMPER: {
        name: 'AUTOPILOT YAW DAMPER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether landing assistance has been enabled or not. */
    ASSISTANCE_LANDING_ENABLED: {
        name: 'ASSISTANCE LANDING ENABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether takeoff assistance has been enabled or not. */
    ASSISTANCE_TAKEOFF_ENABLED: {
        name: 'ASSISTANCE TAKEOFF ENABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current state of the AI anti-stall system. */
    AI_ANTISTALL_STATE: {
        name: 'AI ANTISTALL STATE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the AI auto-trim system is enabled or not. */
    AI_AUTOTRIM_ACTIVE: {
        name: 'AI AUTOTRIM ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the AI auto-trim system is enabled or not for AI controlled aircraft. */
    AI_AUTOTRIM_ACTIVE_AGAINST_PLAYER: {
        name: 'AI AUTOTRIM ACTIVE AGAINST PLAYER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the AI control system is enabled or not. */
    AI_CONTROLS: {
        name: 'AI CONTROLS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the AI cursor mode is active or not. */
    AI_CURSOR_MODE_ACTIVE: {
        name: 'AI CURSOR MODE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** AI reference pitch reference bars */
    ATTITUDE_BARS_POSITION: {
        name: 'ATTITUDE BARS POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** AI caged state */
    ATTITUDE_CAGE: {
        name: 'ATTITUDE CAGE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** AI bank indication */
    ATTITUDE_INDICATOR_BANK_DEGREES: {
        name: 'ATTITUDE INDICATOR BANK DEGREES',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** AI pitch indication */
    ATTITUDE_INDICATOR_PITCH_DEGREES: {
        name: 'ATTITUDE INDICATOR PITCH DEGREES',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns whether the AI control system is active or not. */
    DELEGATE_CONTROLS_TO_AI: {
        name: 'DELEGATE CONTROLS TO AI',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** When set with any value this will cancel the current flight assistant destination. */
    FLY_ASSISTANT_CANCEL_DESTINATION: {
        name: 'FLY ASSISTANT CANCEL DESTINATION',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** When set with any value this will cancel the display of the current flight assistant destination. */
    FLY_ASSISTANT_CANCEL_DESTINATION_DISPLAY: {
        name: 'FLY ASSISTANT CANCEL DESTINATION DISPLAY',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns true when the copilot AI control is active and therefore COM AI is locked on active too. */
    FLY_ASSISTANT_COM_AI_LOCKED: {
        name: 'FLY ASSISTANT COM AI LOCKED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true when a destination has been set in the flight assistant. */
    FLY_ASSISTANT_HAVE_DESTINATION: {
        name: 'FLY ASSISTANT HAVE DESTINATION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the POH range or an estimated value for this speed. */
    FLY_ASSISTANT_LANDING_SPEED: {
        name: 'FLY ASSISTANT LANDING SPEED',
        units: 'String',
        dataType: SimConnectDataType.STRING32,
        settable: false,
    },
    /** Returns the display mode of the speed, CSS side (only STALL SPEED is working and will turn red when below). */
    FLY_ASSISTANT_LANDING_SPEED_DISPLAY_MODE: {
        name: 'FLY ASSISTANT LANDING SPEED DISPLAY MODE',
        units: 'String',
        dataType: SimConnectDataType.STRING32,
        settable: false,
    },
    /** Selected category */
    FLY_ASSISTANT_NEAREST_CATEGORY: {
        name: 'FLY ASSISTANT NEAREST CATEGORY',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Number of elements in this category */
    FLY_ASSISTANT_NEAREST_COUNT: {
        name: 'FLY ASSISTANT NEAREST COUNT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Currently not used within the simulation. */
    FLY_ASSISTANT_NEAREST_METADATA: {
        name: 'FLY ASSISTANT NEAREST METADATA',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the name of the element at the specified index. */
    FLY_ASSISTANT_NEAREST_NAME: {
        name: 'FLY ASSISTANT NEAREST NAME',
        units: 'String',
        dataType: SimConnectDataType.STRING256,
        settable: false,
    },
    /** Returns the index of the currently selected element. */
    FLY_ASSISTANT_NEAREST_SELECTED: {
        name: 'FLY ASSISTANT NEAREST SELECTED',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns true when both ribbon assistances are active (taxi and landing), and can also be used to set them. */
    FLY_ASSISTANT_RIBBONS_ACTIVE: {
        name: 'FLY ASSISTANT RIBBONS ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** When set with any value, it will set the selected element as the current destination. */
    FLY_ASSISTANT_SET_AS_DESTINATION: {
        name: 'FLY ASSISTANT SET AS DESTINATION',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns the flight assistant stall speed. */
    FLY_ASSISTANT_STALL_SPEED: {
        name: 'FLY ASSISTANT STALL SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns the flight assistant stall speed display mode. */
    FLY_ASSISTANT_STALL_SPEED_DISPLAY_MODE: {
        name: 'FLY ASSISTANT STALL SPEED DISPLAY MODE',
        units: 'String',
        dataType: SimConnectDataType.STRING32,
        settable: false,
    },
    /** Returns the flight assistant takeoff speed. */
    FLY_ASSISTANT_TAKEOFF_SPEED: {
        name: 'FLY ASSISTANT TAKEOFF SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns the flight assistant takeoff speed display mode. */
    FLY_ASSISTANT_TAKEOFF_SPEED_DISPLAY_MODE: {
        name: 'FLY ASSISTANT TAKEOFF SPEED DISPLAY MODE',
        units: 'String',
        dataType: SimConnectDataType.STRING32,
        settable: false,
    },
    /** Can be set to override the estimated takeoff speed */
    FLY_ASSISTANT_TAKEOFF_SPEED_ESTIMATED: {
        name: 'FLY ASSISTANT TAKEOFF SPEED ESTIMATED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if antiskid brakes active. This can be set using the AntiSkidActive parameter. */
    ANTISKID_BRAKES_ACTIVE: {
        name: 'ANTISKID BRAKES ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the AutoBrakes are currently active. */
    AUTOBRAKES_ACTIVE: {
        name: 'AUTOBRAKES ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Auto brake switch position */
    AUTO_BRAKE_SWITCH_CB: {
        name: 'AUTO BRAKE SWITCH CB',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Brake dependent hydraulic pressure reading */
    BRAKE_DEPENDENT_HYDRAULIC_PRESSURE: {
        name: 'BRAKE DEPENDENT HYDRAULIC PRESSURE',
        units: 'Pounds per square foot (psf)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Brake on indication */
    BRAKE_INDICATOR: {
        name: 'BRAKE INDICATOR',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent left brake.
          Note that this SimVar no longer sets the right brake percent and simply triggers a brake pressure increase regardless of the value passed. */
    BRAKE_LEFT_POSITION: {
        name: 'BRAKE LEFT POSITION',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Triggers a brake pressure increase on the left brake regardless of the value passed. */
    BRAKE_LEFT_POSITION_EX1: {
        name: 'BRAKE LEFT POSITION EX1',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Parking brake indicator */
    BRAKE_PARKING_INDICATOR: {
        name: 'BRAKE PARKING INDICATOR',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Gets the parking brake position - either on (true) or off (false). */
    BRAKE_PARKING_POSITION: {
        name: 'BRAKE PARKING POSITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent right brake. */
    BRAKE_RIGHT_POSITION: {
        name: 'BRAKE RIGHT POSITION',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Triggers a brake pressure increase on the right brake regardless of the value passed. */
    BRAKE_RIGHT_POSITION_EX1: {
        name: 'BRAKE RIGHT POSITION EX1',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the rejected takeoff brakes are currently active. */
    REJECTED_TAKEOFF_BRAKES_ACTIVE: {
        name: 'REJECTED TAKEOFF BRAKES ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if toe brakes are available */
    TOE_BRAKES_AVAILABLE: {
        name: 'TOE BRAKES AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The percentage value representing the amount the contact point is compressed. Index is from 0-19. */
    'CONTACT_POINT_COMPRESSION:index': {
        name: 'CONTACT POINT COMPRESSION:index',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns true if the indexed contact point is on the ground, or will return false otherwise. Index is from 0 - 19. */
    'CONTACT_POINT_IS_ON_GROUND:index': {
        name: 'CONTACT POINT IS ON GROUND:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true if the indexed contact point is skidding, or will return false otherwise. Index is from 0 - 19. */
    'CONTACT_POINT_IS_SKIDDING:index': {
        name: 'CONTACT POINT IS SKIDDING:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The currently extended position of the (retractable) contact point, expressed as a percentage. Index is from 0 - 19. */
    'CONTACT_POINT_POSITION:index': {
        name: 'CONTACT POINT POSITION:index',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The skidding factor associated with the indexed contact point, from 0 to 1. Index is from 0 - 19. */
    'CONTACT_POINT_SKIDDING_FACTOR:index': {
        name: 'CONTACT POINT SKIDDING FACTOR:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This returns the depth of the water for the indexed contact point. Index is from 0 - 19. */
    'CONTACT_POINT_WATER_DEPTH:index': {
        name: 'CONTACT POINT WATER DEPTH:index',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Aux wheel rotation angle (rotation around the axis for the wheel). */
    AUX_WHEEL_ROTATION_ANGLE: {
        name: 'AUX WHEEL ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rpm of fourth set of gear wheels. */
    AUX_WHEEL_RPM: {
        name: 'AUX WHEEL RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Center wheel rotation angle (rotation around the axis for the wheel).
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    CENTER_WHEEL_ROTATION_ANGLE: {
        name: 'CENTER WHEEL ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Center landing gear rpm. */
    CENTER_WHEEL_RPM: {
        name: 'CENTER WHEEL RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent indexed gear animation extended. NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'GEAR_ANIMATION_POSITION:index': {
        name: 'GEAR ANIMATION POSITION:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent auxiliary gear extended. */
    GEAR_AUX_POSITION: {
        name: 'GEAR AUX POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Aux wheel angle, negative to the left, positive to the right. The aux wheel is the fourth set of landing gear, sometimes used on helicopters. */
    GEAR_AUX_STEER_ANGLE: {
        name: 'GEAR AUX STEER ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Aux steer angle as a percentage. */
    GEAR_AUX_STEER_ANGLE_PCT: {
        name: 'GEAR AUX STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent center gear extended. */
    GEAR_CENTER_POSITION: {
        name: 'GEAR CENTER POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Center wheel angle, negative to the left, positive to the right.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    GEAR_CENTER_STEER_ANGLE: {
        name: 'GEAR CENTER STEER ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Center steer angle as a percentage. */
    GEAR_CENTER_STEER_ANGLE_PCT: {
        name: 'GEAR CENTER STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if gear has been damaged by excessive speed. */
    GEAR_DAMAGE_BY_SPEED: {
        name: 'GEAR DAMAGE BY SPEED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if gear emergency handle applied. */
    GEAR_EMERGENCY_HANDLE_POSITION: {
        name: 'GEAR EMERGENCY HANDLE POSITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The gear handle position, where 0 means the handle is retracted and 1 is the handle fully applied. */
    GEAR_HANDLE_POSITION: {
        name: 'GEAR HANDLE POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Gear hydraulic pressure. */
    GEAR_HYDRAULIC_PRESSURE: {
        name: 'GEAR HYDRAULIC PRESSURE',
        units: 'Pound force per square foot (psf)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the gear is on the ground. */
    'GEAR_IS_ON_GROUND:index': {
        name: 'GEAR IS ON GROUND:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the gear is skidding. */
    'GEAR_IS_SKIDDING:index': {
        name: 'GEAR IS SKIDDING:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent left gear extended. */
    GEAR_LEFT_POSITION: {
        name: 'GEAR LEFT POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Left wheel angle, negative to the left, positive to the right.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    GEAR_LEFT_STEER_ANGLE: {
        name: 'GEAR LEFT STEER ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Left steer angle as a percentage. */
    GEAR_LEFT_STEER_ANGLE_PCT: {
        name: 'GEAR LEFT STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of landing gear.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'GEAR_POSITION:index': {
        name: 'GEAR POSITION:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Percent right gear extended. */
    GEAR_RIGHT_POSITION: {
        name: 'GEAR RIGHT POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Right wheel angle, negative to the left, positive to the right.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    GEAR_RIGHT_STEER_ANGLE: {
        name: 'GEAR RIGHT STEER ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Right steer angle as a percentage. */
    GEAR_RIGHT_STEER_ANGLE_PCT: {
        name: 'GEAR RIGHT STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The gear skidding factor, expressed as a value between 0 and 1. */
    GEAR_SKIDDING_FACTOR: {
        name: 'GEAR SKIDDING FACTOR',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if safe speed limit for gear exceeded. */
    GEAR_SPEED_EXCEEDED: {
        name: 'GEAR SPEED EXCEEDED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Alternative method of getting the steer angle.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'GEAR_STEER_ANGLE:index': {
        name: 'GEAR STEER ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Alternative method of getting steer angle as a percentage. */
    'GEAR_STEER_ANGLE_PCT:index': {
        name: 'GEAR STEER ANGLE PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent tail gear extended.
          NOTE: This is a deprecated legacy SimVar and should not be used, as it will always return 0. */
    GEAR_TAIL_POSITION: {
        name: 'GEAR TAIL POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent total gear extended. */
    GEAR_TOTAL_PCT_EXTENDED: {
        name: 'GEAR TOTAL PCT EXTENDED',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Gear warnings. */
    'GEAR_WARNING:index': {
        name: 'GEAR WARNING:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The depth of the gear in the water. */
    GEAR_WATER_DEPTH: {
        name: 'GEAR WATER DEPTH',
        units: 'Centimeters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if landing gear are floats */
    IS_GEAR_FLOATS: {
        name: 'IS GEAR FLOATS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if gear can be retracted */
    IS_GEAR_RETRACTABLE: {
        name: 'IS GEAR RETRACTABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if landing gear is skids */
    IS_GEAR_SKIDS: {
        name: 'IS GEAR SKIDS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if landing gear is skis */
    IS_GEAR_SKIS: {
        name: 'IS GEAR SKIS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if landing gear is wheels */
    IS_GEAR_WHEELS: {
        name: 'IS GEAR WHEELS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Left wheel rotation angle (rotation around the axis for the wheel). */
    LEFT_WHEEL_ROTATION_ANGLE: {
        name: 'LEFT WHEEL ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Left landing gear rpm */
    LEFT_WHEEL_RPM: {
        name: 'LEFT WHEEL RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the nosewheel lock is engaged. This can be set using the NosewheelLock parameter. */
    NOSEWHEEL_LOCK_ON: {
        name: 'NOSEWHEEL LOCK ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Can be used to get or set the maximum permitted steering angle for the nose wheel of the aircraft. */
    NOSEWHEEL_MAX_STEERING_ANGLE: {
        name: 'NOSEWHEEL MAX STEERING ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if retract float switch on */
    RETRACT_FLOAT_SWITCH: {
        name: 'RETRACT FLOAT SWITCH',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** If aircraft has retractable floats. */
    RETRACT_LEFT_FLOAT_EXTENDED: {
        name: 'RETRACT LEFT FLOAT EXTENDED',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** If aircraft has retractable floats. */
    RETRACT_RIGHT_FLOAT_EXTENDED: {
        name: 'RETRACT RIGHT FLOAT EXTENDED',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Right wheel rotation angle (rotation around the axis for the wheel). */
    RIGHT_WHEEL_ROTATION_ANGLE: {
        name: 'RIGHT WHEEL ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Right landing gear rpm. */
    RIGHT_WHEEL_RPM: {
        name: 'RIGHT WHEEL RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of steering tiller. */
    STEER_INPUT_CONTROL: {
        name: 'STEER INPUT CONTROL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if tailwheel lock applied. This can be set using the TailwheelLock parameter. */
    TAILWHEEL_LOCK_ON: {
        name: 'TAILWHEEL LOCK ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent extended. */
    WATER_LEFT_RUDDER_EXTENDED: {
        name: 'WATER LEFT RUDDER EXTENDED',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Water left rudder angle, negative to the left, positive to the right. */
    WATER_LEFT_RUDDER_STEER_ANGLE: {
        name: 'WATER LEFT RUDDER STEER ANGLE',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Water left rudder angle as a percentage. */
    WATER_LEFT_RUDDER_STEER_ANGLE_PCT: {
        name: 'WATER LEFT RUDDER STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent extended. */
    WATER_RIGHT_RUDDER_EXTENDED: {
        name: 'WATER RIGHT RUDDER EXTENDED',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Water right rudder angle, negative to the left, positive to the right. */
    WATER_RIGHT_RUDDER_STEER_ANGLE: {
        name: 'WATER RIGHT RUDDER STEER ANGLE',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Water right rudder as a percentage. */
    WATER_RIGHT_RUDDER_STEER_ANGLE_PCT: {
        name: 'WATER RIGHT RUDDER STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of the water rudder handle (0 handle retracted, 1 rudder handle applied). */
    WATER_RUDDER_HANDLE_POSITION: {
        name: 'WATER RUDDER HANDLE POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Wheel rotation angle (rotation around the axis for the wheel). */
    'WHEEL_ROTATION_ANGLE:index': {
        name: 'WHEEL ROTATION ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wheel rpm. */
    'WHEEL_RPM:index': {
        name: 'WHEEL RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Angle deflection for the aileron. */
    AILERON_AVERAGE_DEFLECTION: {
        name: 'AILERON AVERAGE DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Angle deflection for the aileron. */
    AILERON_LEFT_DEFLECTION: {
        name: 'AILERON LEFT DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent deflection for the aileron.
          NOTE: This is available in multiplayer to all near aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    AILERON_LEFT_DEFLECTION_PCT: {
        name: 'AILERON LEFT DEFLECTION PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent aileron input left/right. */
    AILERON_POSITION: {
        name: 'AILERON POSITION',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle deflection. */
    AILERON_RIGHT_DEFLECTION: {
        name: 'AILERON RIGHT DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent deflection.
          NOTE: This is available in multiplayer to all near aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    AILERON_RIGHT_DEFLECTION_PCT: {
        name: 'AILERON RIGHT DEFLECTION PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Angle deflection. */
    AILERON_TRIM: {
        name: 'AILERON TRIM',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the Aileron Trim has been disabled. */
    AILERON_TRIM_DISABLED: {
        name: 'AILERON TRIM DISABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The trim position of the ailerons. Zero is fully retracted.
          NOTE: This is available in multiplayer to all near aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    AILERON_TRIM_PCT: {
        name: 'AILERON TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle deflection. */
    ELEVATOR_DEFLECTION: {
        name: 'ELEVATOR DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent deflection.
          NOTE: This is available in multiplayer. See here for more information:
Note On SimVars In Multiplayer. */
    ELEVATOR_DEFLECTION_PCT: {
        name: 'ELEVATOR DEFLECTION PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent elevator input deflection. */
    ELEVATOR_POSITION: {
        name: 'ELEVATOR POSITION',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the Elevator Trim has been disabled. */
    ELEVATOR_TRIM_DISABLED: {
        name: 'ELEVATOR TRIM DISABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the maximum elevator trim value. This corresponds to the elevator_trim_down_limit in the Flight Model Config file. */
    ELEVATOR_TRIM_DOWN_LIMIT: {
        name: 'ELEVATOR TRIM DOWN LIMIT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent elevator trim (for indication). */
    ELEVATOR_TRIM_INDICATOR: {
        name: 'ELEVATOR TRIM INDICATOR',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Elevator trim neutral. */
    ELEVATOR_TRIM_NEUTRAL: {
        name: 'ELEVATOR TRIM NEUTRAL',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent elevator trim. */
    ELEVATOR_TRIM_PCT: {
        name: 'ELEVATOR TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Elevator trim deflection. */
    ELEVATOR_TRIM_POSITION: {
        name: 'ELEVATOR TRIM POSITION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns the maximum elevator trim value. This corresponds to the elevator_trim_up_limit in the Flight Model Config file. */
    ELEVATOR_TRIM_UP_LIMIT: {
        name: 'ELEVATOR TRIM UP LIMIT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Elevon deflection. */
    ELEVON_DEFLECTION: {
        name: 'ELEVON DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if flaps are damaged by excessive speed. */
    FLAP_DAMAGE_BY_SPEED: {
        name: 'FLAP DAMAGE BY SPEED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Set the position of the flaps control. */
    FLAP_POSITION_SET: {
        name: 'FLAP POSITION SET',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if safe speed limit for flaps exceeded. */
    FLAP_SPEED_EXCEEDED: {
        name: 'FLAP SPEED EXCEEDED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if flaps available. */
    FLAPS_AVAILABLE: {
        name: 'FLAPS AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This returns the effective flaps handle index, after some of the conditions have potentially forced the state to change. */
    'FLAPS_EFFECTIVE_HANDLE_INDEX:index': {
        name: 'FLAPS EFFECTIVE HANDLE INDEX:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of current flap position. */
    'FLAPS_HANDLE_INDEX:index': {
        name: 'FLAPS HANDLE INDEX:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent flap handle extended.
          NOTE: This is available in multiplayer
to all near aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    FLAPS_HANDLE_PERCENT: {
        name: 'FLAPS HANDLE PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Number of available flap positions. */
    FLAPS_NUM_HANDLE_POSITIONS: {
        name: 'FLAPS NUM HANDLE POSITIONS',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Angle left leading edge flap extended. Use LEADING_EDGE_FLAPS_LEFT_PERCENT to set a value. */
    LEADING_EDGE_FLAPS_LEFT_ANGLE: {
        name: 'LEADING EDGE FLAPS LEFT ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of left leading edge flap position. */
    LEADING_EDGE_FLAPS_LEFT_INDEX: {
        name: 'LEADING EDGE FLAPS LEFT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent left leading edge flap extended.
          NOTE: This is available in multiplayer
to all near aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LEADING_EDGE_FLAPS_LEFT_PERCENT: {
        name: 'LEADING EDGE FLAPS LEFT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle right leading edge flap extended. Use LEADING_EDGE_FLAPS_RIGHT_PERCENT to set a value. */
    LEADING_EDGE_FLAPS_RIGHT_ANGLE: {
        name: 'LEADING EDGE FLAPS RIGHT ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of right leading edge flap position. */
    LEADING_EDGE_FLAPS_RIGHT_INDEX: {
        name: 'LEADING EDGE FLAPS RIGHT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent right leading edge flap extended.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LEADING_EDGE_FLAPS_RIGHT_PERCENT: {
        name: 'LEADING EDGE FLAPS RIGHT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle left trailing edge flap extended. Use TRAILING_EDGE_FLAPS_LEFT_PERCENT to set a value. */
    TRAILING_EDGE_FLAPS_LEFT_ANGLE: {
        name: 'TRAILING EDGE FLAPS LEFT ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of left trailing edge flap position. */
    TRAILING_EDGE_FLAPS_LEFT_INDEX: {
        name: 'TRAILING EDGE FLAPS LEFT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent left trailing edge flap extended.
          NOTE: This is available in multiplayer
to all near aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    TRAILING_EDGE_FLAPS_LEFT_PERCENT: {
        name: 'TRAILING EDGE FLAPS LEFT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle right trailing edge flap extended. Use TRAILING_EDGE_FLAPS_RIGHT_PERCENT to set a value. */
    TRAILING_EDGE_FLAPS_RIGHT_ANGLE: {
        name: 'TRAILING EDGE FLAPS RIGHT ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of right trailing edge flap position. */
    TRAILING_EDGE_FLAPS_RIGHT_INDEX: {
        name: 'TRAILING EDGE FLAPS RIGHT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent right trailing edge flap extended.
          NOTE: This is available in multiplayer
to all near aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    TRAILING_EDGE_FLAPS_RIGHT_PERCENT: {
        name: 'TRAILING EDGE FLAPS RIGHT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns true if the fly-by-wire alpha protection is enabled or false otherwise. */
    FLY_BY_WIRE_ALPHA_PROTECTION: {
        name: 'FLY BY WIRE ALPHA PROTECTION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the Elevators and Ailerons computer has failed. */
    FLY_BY_WIRE_ELAC_FAILED: {
        name: 'FLY BY WIRE ELAC FAILED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the fly by wire Elevators and Ailerons computer is on. */
    FLY_BY_WIRE_ELAC_SWITCH: {
        name: 'FLY BY WIRE ELAC SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the Flight Augmentation computer has failed. */
    FLY_BY_WIRE_FAC_FAILED: {
        name: 'FLY BY WIRE FAC FAILED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the fly by wire Flight Augmentation computer is on. */
    FLY_BY_WIRE_FAC_SWITCH: {
        name: 'FLY BY WIRE FAC SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the Spoilers and Elevators computer has failed. */
    FLY_BY_WIRE_SEC_FAILED: {
        name: 'FLY BY WIRE SEC FAILED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the fly by wire Spoilers and Elevators computer is on. */
    FLY_BY_WIRE_SEC_SWITCH: {
        name: 'FLY BY WIRE SEC SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the folding wing handle is engaged. */
    FOLDING_WING_HANDLE_POSITION: {
        name: 'FOLDING WING HANDLE POSITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Left folding wing position, 1.0 is fully folded. */
    FOLDING_WING_LEFT_PERCENT: {
        name: 'FOLDING WING LEFT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Right folding wing position, 1.0 is fully folded. */
    FOLDING_WING_RIGHT_PERCENT: {
        name: 'FOLDING WING RIGHT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle deflection. */
    RUDDER_DEFLECTION: {
        name: 'RUDDER DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent deflection.
          NOTE: This is available in multiplayer. See here for more information:
Note On SimVars In Multiplayer. */
    RUDDER_DEFLECTION_PCT: {
        name: 'RUDDER DEFLECTION PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rudder pedal position. */
    RUDDER_PEDAL_INDICATOR: {
        name: 'RUDDER PEDAL INDICATOR',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent rudder pedal deflection (for animation). */
    RUDDER_PEDAL_POSITION: {
        name: 'RUDDER PEDAL POSITION',
        units: 'Position (-16K to 0)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent rudder input deflection. */
    RUDDER_POSITION: {
        name: 'RUDDER POSITION',
        units: 'Position (-16K to 0)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle deflection. */
    RUDDER_TRIM: {
        name: 'RUDDER TRIM',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the Rudder Trim has been disabled. */
    RUDDER_TRIM_DISABLED: {
        name: 'RUDDER TRIM DISABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The trim position of the rudder. Zero is no trim. */
    RUDDER_TRIM_PCT: {
        name: 'RUDDER TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Checks if autospoilers are armed (true) or not (false). */
    SPOILERS_ARMED: {
        name: 'SPOILERS ARMED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if spoiler system available. */
    SPOILER_AVAILABLE: {
        name: 'SPOILER AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Spoiler handle position. */
    SPOILERS_HANDLE_POSITION: {
        name: 'SPOILERS HANDLE POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent left spoiler deflected.
          NOTE: This is available in multiplayer. See here for more information:
Note On SimVars In Multiplayer. */
    SPOILERS_LEFT_POSITION: {
        name: 'SPOILERS LEFT POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent right spoiler deflected.
          NOTE: This is available in multiplayer. See here for more information:
Note On SimVars In Multiplayer. */
    SPOILERS_RIGHT_POSITION: {
        name: 'SPOILERS RIGHT POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Indexed from 1, 100 is fully deployed, 0 flat on deck */
    'BLAST_SHIELD_POSITION:index': {
        name: 'BLAST SHIELD POSITION:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** A number 1 through 4 for the cable number caught by the tailhook. Cable 1 is the one closest to the stern of the carrier. A value of 0 indicates no cable was caught. */
    'CABLE_CAUGHT_BY_TAILHOOK:index': {
        name: 'CABLE CAUGHT BY TAILHOOK:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Catapults are indexed from 1. This value will be 0 before the catapult fires, and then up to 100 as the aircraft is propelled down the catapult. The aircraft may takeoff before the value reaches 100 (depending on the aircraft weight, power applied, and other factors), in which case this value will not be further updated. This value could be used to drive a bogie animation. */
    'CATAPULT_STROKE_POSITION:index': {
        name: 'CATAPULT STROKE POSITION:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Holdback bars allow build up of thrust before takeoff from a catapult, and are installed by the deck crew of an aircraft carrier. */
    HOLDBACK_BAR_INSTALLED: {
        name: 'HOLDBACK BAR INSTALLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be True if the launchbar is fully extended, and can be used, for example, to change the color of an instrument light. */
    LAUNCHBAR_HELD_EXTENDED: {
        name: 'LAUNCHBAR HELD EXTENDED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Installed on aircraft before takeoff from a carrier catapult. Note that gear cannot retract with this extended. 100 = fully extended. */
    LAUNCHBAR_POSITION: {
        name: 'LAUNCHBAR POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** If this is set to True the launch bar switch has been engaged. */
    LAUNCHBAR_SWITCH: {
        name: 'LAUNCHBAR SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Maximum of 4. A model can contain more than 4 catapults, but only the first four will be read and recognized by the simulation. */
    NUMBER_OF_CATAPULTS: {
        name: 'NUMBER OF CATAPULTS',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The nose angle, where 0 is fully up. */
    CONCORDE_NOSE_ANGLE: {
        name: 'CONCORDE NOSE ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The visor nose handle position. */
    CONCORDE_VISOR_NOSE_HANDLE: {
        name: 'CONCORDE VISOR NOSE HANDLE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The visor position expressed as a percentage where 0.0 = up and 1.0 = extended/down. */
    CONCORDE_VISOR_POSITION_PERCENT: {
        name: 'CONCORDE VISOR POSITION PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a settable simvar meaning that it can both be read and set. Some of the simvars in this list are using this to lookup a value using two arguments (one argument in addition to the component index). For example to check the state of the connection between a "circuit.45" and the "bus.2" it would be written as follows:
          2 (>A:BUS LOOKUP INDEX, Number) (A:CIRCUIT CONNECTION ON:45, Bool)
          It should be notes that when BUS_LOOKUP_INDEX is not set (ie: it is 0) then TRUE will be returned if any of your bus connections are on. */
    BUS_LOOKUP_INDEX: {
        name: 'BUS LOOKUP INDEX',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will be true if the bus breaker is pulled. Requires a BUS_LOOKUP_INDEX and a bus index. */
    BUS_BREAKER_PULLED: {
        name: 'BUS BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This will be true if the bus is connected. Requires a BUS_LOOKUP_INDEX and a bus index. */
    BUS_CONNECTION_ON: {
        name: 'BUS CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This returns the percentage of the load output that is being consumed. This requires an alternator index when referencing. */
    ELECTRICAL_GENALT_LOAD: {
        name: 'ELECTRICAL GENALT LOAD',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The load handled by the alternator. This requires an alternator index when referencing. */
    ELECTRICAL_GENALT_BUS_AMPS: {
        name: 'ELECTRICAL GENALT BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** General alternator voltage. This requires an alternator index when referencing. */
    ELECTRICAL_GENALT_BUS_VOLTAGE: {
        name: 'ELECTRICAL GENALT BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The main bus voltage. Use a bus index when referencing. */
    ELECTRICAL_MAIN_BUS_VOLTAGE: {
        name: 'ELECTRICAL MAIN BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Avionics bus current */
    ELECTRICAL_AVIONICS_BUS_AMPS: {
        name: 'ELECTRICAL AVIONICS BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Avionics bus voltage */
    ELECTRICAL_AVIONICS_BUS_VOLTAGE: {
        name: 'ELECTRICAL AVIONICS BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Main bus current */
    ELECTRICAL_MAIN_BUS_AMPS: {
        name: 'ELECTRICAL MAIN BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Deprecated, do not use!
          Use ELECTRICAL BATTERY LOAD. */
    ELECTRICAL_OLD_CHARGING_AMPS: {
        name: 'ELECTRICAL OLD CHARGING AMPS',
        units: 'Amps',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total load amps */
    ELECTRICAL_TOTAL_LOAD_AMPS: {
        name: 'ELECTRICAL TOTAL LOAD AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Is the aircraft using the new Electrical System or the legacy FSX one. */
    NEW_ELECTRICAL_SYSTEM: {
        name: 'NEW ELECTRICAL SYSTEM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be true if the alternator breaker is pulled. Requires a BUS_LOOKUP_INDEX and an alternator index. */
    ALTERNATOR_BREAKER_PULLED: {
        name: 'ALTERNATOR BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This will be true if the alternator is connected. Requires a BUS_LOOKUP_INDEX and an alternator index. */
    ALTERNATOR_CONNECTION_ON: {
        name: 'ALTERNATOR CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The alternator (generator) switch position, true if the switch is ON. Requires an engine index, and the use of an alternator index when referencing. */
    'GENERAL_ENG_MASTER_ALTERNATOR:index': {
        name: 'GENERAL ENG MASTER ALTERNATOR:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Bleed air pressure received by the engine from the APU. */
    APU_BLEED_PRESSURE_RECEIVED_BY_ENGINE: {
        name: 'APU BLEED PRESSURE RECEIVED BY ENGINE',
        units: 'Pounds per square inch (psi)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Set or get whether an APU is active (true) or not (false). Takes an index to be able to have multiple generators on a single APU. */
    'APU_GENERATOR_ACTIVE:index': {
        name: 'APU GENERATOR ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Enables or disables the APU for an engine. Takes an index to be able to have multiple generators on a single APU */
    'APU_GENERATOR_SWITCH:index': {
        name: 'APU GENERATOR SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Will return true if the APU is on fire, or false otherwise. */
    APU_ON_FIRE_DETECTED: {
        name: 'APU ON FIRE DETECTED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Auxiliary power unit RPM, as a percentage */
    APU_PCT_RPM: {
        name: 'APU PCT RPM',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Auxiliary power unit starter, as a percentage */
    APU_PCT_STARTER: {
        name: 'APU PCT STARTER',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Boolean, whether or not the APU is switched on. */
    APU_SWITCH: {
        name: 'APU SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The volts from the APU to the selected engine. Takes an index to be able to have multiple generators on a single APU. */
    'APU_VOLTS:index': {
        name: 'APU VOLTS:index',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Boolean, returns whether or not the APU attempts to provide Bleed Air. */
    BLEED_AIR_APU: {
        name: 'BLEED AIR APU',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be true if the battery breaker is pulled. Requires a BUS LOOKUP INDEX and a battery index. */
    BATTERY_BREAKER_PULLED: {
        name: 'BATTERY BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This will be true if the battery is connected. Requires a BUS_LOOKUP_INDEX and a battery index. */
    BATTERY_CONNECTION_ON: {
        name: 'BATTERY CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Battery bus current */
    ELECTRICAL_BATTERY_BUS_AMPS: {
        name: 'ELECTRICAL BATTERY BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Battery bus voltage */
    ELECTRICAL_BATTERY_BUS_VOLTAGE: {
        name: 'ELECTRICAL BATTERY BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Battery capacity over max capacity, 100 is full. */
    ELECTRICAL_BATTERY_ESTIMATED_CAPACITY_PCT: {
        name: 'ELECTRICAL BATTERY ESTIMATED CAPACITY PCT',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The load handled by the battery (negative values mean the battery is receiving current). Use a battery index when referencing. */
    ELECTRICAL_BATTERY_LOAD: {
        name: 'ELECTRICAL BATTERY LOAD',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The battery voltage. Use a battery index when referencing. */
    ELECTRICAL_BATTERY_VOLTAGE: {
        name: 'ELECTRICAL BATTERY VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current available when battery switch is turned off */
    ELECTRICAL_HOT_BATTERY_BUS_AMPS: {
        name: 'ELECTRICAL HOT BATTERY BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Voltage available when battery switch is turned off */
    ELECTRICAL_HOT_BATTERY_BUS_VOLTAGE: {
        name: 'ELECTRICAL HOT BATTERY BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The battery switch position, true if the switch is ON. Use a battery index when referencing. */
    ELECTRICAL_MASTER_BATTERY: {
        name: 'ELECTRICAL MASTER BATTERY',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** All these SimVars can be used to get or set the breaker state for the electrical system (either true or false).
          If the breaker is popped (set to false), then the associated circuit will not receive electricity. */
    BREAKER_ADF: {
        name: 'BREAKER ADF',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Bool */
    BREAKER_ALTFLD: {
        name: 'BREAKER ALTFLD',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_AUTOPILOT: {
        name: 'BREAKER AUTOPILOT',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_AVNBUS1: {
        name: 'BREAKER AVNBUS1',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_AVNBUS2: {
        name: 'BREAKER AVNBUS2',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_AVNFAN: {
        name: 'BREAKER AVNFAN',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_FLAP: {
        name: 'BREAKER FLAP',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_GPS: {
        name: 'BREAKER GPS',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_INST: {
        name: 'BREAKER INST',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_INSTLTS: {
        name: 'BREAKER INSTLTS',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_LTS_PWR: {
        name: 'BREAKER LTS PWR',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Bool */
    BREAKER_NAVCOM1: {
        name: 'BREAKER NAVCOM1',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_NAVCOM2: {
        name: 'BREAKER NAVCOM2',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_NAVCOM3: {
        name: 'BREAKER NAVCOM3',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_TURNCOORD: {
        name: 'BREAKER TURNCOORD',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_WARN: {
        name: 'BREAKER WARN',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    BREAKER_XPNDR: {
        name: 'BREAKER XPNDR',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Is electrical power available to this circuit */
    CIRCUIT_AUTOPILOT_ON: {
        name: 'CIRCUIT AUTOPILOT ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to this circuit */
    CIRCUIT_AUTO_BRAKES_ON: {
        name: 'CIRCUIT AUTO BRAKES ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to this circuit. Please see the
Note On Autofeathering for more information. */
    CIRCUIT_AUTO_FEATHER_ON: {
        name: 'CIRCUIT AUTO FEATHER ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to this circuit */
    CIRCUIT_AVIONICS_ON: {
        name: 'CIRCUIT AVIONICS ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be true if the circuit breaker is pulled. Requires a BUS_LOOKUP_INDEX and a circuit index. */
    CIRCUIT_BREAKER_PULLED: {
        name: 'CIRCUIT BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This will be true if the circuit is connected. Requires a BUS_LOOKUP_INDEX and a circuit index. */
    CIRCUIT_CONNECTION_ON: {
        name: 'CIRCUIT CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the flap motor circuit */
    CIRCUIT_FLAP_MOTOR_ON: {
        name: 'CIRCUIT FLAP MOTOR ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the gear motor circuit */
    CIRCUIT_GEAR_MOTOR_ON: {
        name: 'CIRCUIT GEAR MOTOR ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to gear warning circuit */
    CIRCUIT_GEAR_WARNING_ON: {
        name: 'CIRCUIT GEAR WARNING ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the general panel circuit */
    CIRCUIT_GENERAL_PANEL_ON: {
        name: 'CIRCUIT GENERAL PANEL ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the hydraulic pump circuit */
    CIRCUIT_HYDRAULIC_PUMP_ON: {
        name: 'CIRCUIT HYDRAULIC PUMP ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the marker beacon circuit */
    CIRCUIT_MARKER_BEACON_ON: {
        name: 'CIRCUIT MARKER BEACON ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not power is available to the NAVCOM1 circuit. */
    CIRCUIT_NAVCOM1_ON: {
        name: 'CIRCUIT NAVCOM1 ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not power is available to the NAVCOM2 circuit. */
    CIRCUIT_NAVCOM2_ON: {
        name: 'CIRCUIT NAVCOM2 ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not power is available to the NAVCOM3 circuit. */
    CIRCUIT_NAVCOM3_ON: {
        name: 'CIRCUIT NAVCOM3 ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be true if the given circuit is functioning. Use a circuit index when referencing. */
    CIRCUIT_ON: {
        name: 'CIRCUIT ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the pitot heat circuit */
    CIRCUIT_PITOT_HEAT_ON: {
        name: 'CIRCUIT PITOT HEAT ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This returns the percentage of use that the circuit is getting. This requires a circuit index when referencing. */
    CIRCUIT_POWER_SETTING: {
        name: 'CIRCUIT POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Is electrical power available to the propeller sync circuit */
    CIRCUIT_PROP_SYNC_ON: {
        name: 'CIRCUIT PROP SYNC ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the vacuum circuit */
    CIRCUIT_STANDBY_VACUUM_ON: {
        name: 'CIRCUIT STANDBY VACUUM ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The circuit switch position, true if the switch is ON. Use a circuit index when referencing. */
    CIRCUIT_SWITCH_ON: {
        name: 'CIRCUIT SWITCH ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be true if the given external power source is available. Use an external power index when referencing. */
    EXTERNAL_POWER_AVAILABLE: {
        name: 'EXTERNAL POWER AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Boolean, The state of the breaker of an external power source */
    EXTERNAL_POWER_BREAKER_PULLED: {
        name: 'EXTERNAL POWER BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Boolean, The state of the connection between a bus and an external power source */
    EXTERNAL_POWER_CONNECTION_ON: {
        name: 'EXTERNAL POWER CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The external power switch position, true if the switch is ON. Use an external power index when referencing. */
    EXTERNAL_POWER_ON: {
        name: 'EXTERNAL POWER ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether or not the indexed engine (see note) attempts to provide bleed air. */
    'BLEED_AIR_ENGINE:index': {
        name: 'BLEED AIR ENGINE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The bleed air system source controller for an indexed engine (see note). This will work as follows:
          
            When engines and APU are activated, it will return 0 because it is in Auto.
            If the APU is removed, it will return 3 for engines only.
            If instead the engines are removed, it would return 2 for the APU only.
            If the APU and engines are removed, it would return 1 (so, off). */
    'BLEED_AIR_SOURCE_CONTROL:index': {
        name: 'BLEED AIR SOURCE CONTROL:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Deprecated, do not use! */
    COWL_FLAPS: {
        name: 'COWL FLAPS',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Selected engines (combination of bit flags) */
    ENGINE_CONTROL_SELECT: {
        name: 'ENGINE CONTROL SELECT',
        units: 'Flags:',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if engine mixture is available for prop engines. Deprecated, do not use (mixture is always available)! */
    ENGINE_MIXURE_AVAILABLE: {
        name: 'ENGINE MIXURE AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The engine primer position. */
    ENGINE_PRIMER: {
        name: 'ENGINE PRIMER',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Engine type. */
    ENGINE_TYPE: {
        name: 'ENGINE TYPE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Anti-ice switch for the indexed engine (see note), true if enabled false otherwise. */
    'ENG_ANTI_ICE:index': {
        name: 'ENG ANTI ICE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the indexed engine (see note) is running, false otherwise. */
    'ENG_COMBUSTION:index': {
        name: 'ENG COMBUSTION:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The indexed engine (see note) cylinder head temperature. */
    'ENG_CYLINDER_HEAD_TEMPERATURE:index': {
        name: 'ENG CYLINDER HEAD TEMPERATURE:index',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Exhaust gas temperature for the indexed engine (see note). */
    'ENG_EXHAUST_GAS_TEMPERATURE:index': {
        name: 'ENG EXHAUST GAS TEMPERATURE:index',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Governed engine setting exhaust gas temperature for the indexed engine (see note). */
    'ENG_EXHAUST_GAS_TEMPERATURE_GES:index': {
        name: 'ENG EXHAUST GAS TEMPERATURE GES:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Failure flag for the indexed engine (see note) that has failed. */
    'ENG_FAILED:index': {
        name: 'ENG FAILED:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Fuel flow reference in pounds per hour for the indexed engine (see note). */
    'ENG_FUEL_FLOW_BUG_POSITION:index': {
        name: 'ENG FUEL FLOW BUG POSITION:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Engine fuel flow in gallons per hour for the indexed engine (see note). */
    'ENG_FUEL_FLOW_GPH:index': {
        name: 'ENG FUEL FLOW GPH:index',
        units: 'Gallons per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) fuel flow in pounds per hour. */
    'ENG_FUEL_FLOW_PPH:index': {
        name: 'ENG FUEL FLOW PPH:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Engine fuel flow in pounds per hour.
          Deprecated in favour of ENG FUEL FLOW PPH. */
    'ENG_FUEL_FLOW_PPH_SSL:index': {
        name: 'ENG FUEL FLOW PPH SSL:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) hydraulic pressure. */
    'ENG_HYDRAULIC_PRESSURE:index': {
        name: 'ENG HYDRAULIC PRESSURE:index',
        units: 'Pounds per square foot (psf)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note)hydraulic fluid quantity, as a percentage of total capacity */
    'ENG_HYDRAULIC_QUANTITY:index': {
        name: 'ENG HYDRAULIC QUANTITY:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) manifold pressure. */
    'ENG_MANIFOLD_PRESSURE:index': {
        name: 'ENG MANIFOLD PRESSURE:index',
        units: 'Inches of mercury (inHg)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) Maximum rpm. */
    ENG_MAX_RPM: {
        name: 'ENG MAX RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) N1 rpm. */
    'ENG_N1_RPM:index': {
        name: 'ENG N1 RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) N2 rpm. */
    'ENG_N2_RPM:index': {
        name: 'ENG N2 RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) oil pressure. */
    'ENG_OIL_PRESSURE:index': {
        name: 'ENG OIL PRESSURE:index',
        units: 'pounds per square foot (psf)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) oil quantity as a percentage of full capacity. */
    'ENG_OIL_QUANTITY:index': {
        name: 'ENG OIL QUANTITY:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) oil temperature. */
    'ENG_OIL_TEMPERATURE:index': {
        name: 'ENG OIL TEMPERATURE:index',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) on fire state. */
    'ENG_ON_FIRE:index': {
        name: 'ENG ON FIRE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The indexed engine (see note) pressure ratio. */
    'ENG_PRESSURE_RATIO:index': {
        name: 'ENG PRESSURE RATIO:index',
        units: 'Ratio',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Engine pressure ratio. Deprecated, do not use! */
    'ENG_PRESSURE_RATIO_GES:index': {
        name: 'ENG PRESSURE RATIO GES:index',
        units: 'Scalar',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) percentage maximum rated rpm - used for visual animation.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'ENG_RPM_ANIMATION_PERCENT:index': {
        name: 'ENG RPM ANIMATION PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** RPM scalar value. Deprecated, do not use! */
    'ENG_RPM_SCALER:index': {
        name: 'ENG RPM SCALER:index',
        units: 'Scalar',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) torque. */
    'ENG_TORQUE:index': {
        name: 'ENG TORQUE:index',
        units: 'Foot pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) vibration. */
    'ENG_VIBRATION:index': {
        name: 'ENG VIBRATION:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Estimated fuel flow to the indexed engine (see note) at cruise speed. */
    'ESTIMATED_FUEL_FLOW:index': {
        name: 'ESTIMATED FUEL FLOW:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Full throttle thrust to weight ratio */
    FULL_THROTTLE_THRUST_TO_WEIGHT_RATIO: {
        name: 'FULL THROTTLE THRUST TO WEIGHT RATIO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) anti-ice switch state - 0 (FALSE) is off and 1 (TRUE) is on. */
    'GENERAL_ENG_ANTI_ICE_POSITION:index': {
        name: 'GENERAL ENG ANTI ICE POSITION:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Set the indexed engine (see note) combustion flag to TRUE or FALSE. Note that this will not only stop all combustion, but it will also set the engine RPM to 0, regardless of the actual state of the simulation.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'GENERAL_ENG_COMBUSTION:index': {
        name: 'GENERAL ENG COMBUSTION:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This SimVar is similar to GENERAL ENG COMBUSTION, in that it can also be used to enable or disable engine combustion. However this SimVar will not interfere with the current state of ths simulation. For example, if the aircraft has a turbine engine with auto_ignition enabled or it's a propeller engine with magnetos, then in the subsequent simulation frames this SimVar may be set to 1 (TRUE) again as the engine restarts automatically. */
    'GENERAL_ENG_COMBUSTION_EX1:index': {
        name: 'GENERAL ENG COMBUSTION EX1:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Percent of maximum sound being created by the indexed engine (see note).
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'GENERAL_ENG_COMBUSTION_SOUND_PERCENT:index': {
        name: 'GENERAL ENG COMBUSTION SOUND PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of total damage to the indexed engine (see note). */
    'GENERAL_ENG_DAMAGE_PERCENT:index': {
        name: 'GENERAL ENG DAMAGE PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total elapsed time since the indexed engine (see note) was started. */
    'GENERAL_ENG_ELAPSED_TIME:index': {
        name: 'GENERAL ENG ELAPSED TIME:index',
        units: 'Hours',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) exhaust gas temperature. */
    'GENERAL_ENG_EXHAUST_GAS_TEMPERATURE:index': {
        name: 'GENERAL ENG EXHAUST GAS TEMPERATURE:index',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see note) fail flag. */
    'GENERAL_ENG_FAILED:index': {
        name: 'GENERAL ENG FAILED:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Detects if a fire has been detected in an indexed engine (see note) or not. If 0 (FALSE) no fire has been detected and if 1 (TRUE) then it has. */
    'GENERAL_ENG_FIRE_DETECTED:index': {
        name: 'GENERAL ENG FIRE DETECTED:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The indexed engine (see note) fuel pressure. */
    'GENERAL_ENG_FUEL_PRESSURE:index': {
        name: 'GENERAL ENG FUEL PRESSURE:index',
        units: 'Pounds per square inch (psi',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether the indexed engine (see note) fuel pump on (1, TRUE) or off (0, FALSE). */
    'GENERAL_ENG_FUEL_PUMP_ON:index': {
        name: 'GENERAL ENG FUEL PUMP ON:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Fuel pump switch state the indexed engine (see note). If 0 (FALSE) the pump is off and if 1 (TRUE) then it is on. */
    'GENERAL_ENG_FUEL_PUMP_SWITCH:index': {
        name: 'GENERAL ENG FUEL PUMP SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Equivalent to GENERAL ENG FUEL PUMP SWITCH but differentiates between ON and AUTO */
    'GENERAL_ENG_FUEL_PUMP_SWITCH_EX1:index': {
        name: 'GENERAL ENG FUEL PUMP SWITCH EX1:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Fuel used since the indexed engine (see note) was last started. */
    'GENERAL_ENG_FUEL_USED_SINCE_START:index': {
        name: 'GENERAL ENG FUEL USED SINCE START:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Fuel valve state for the indexed engine (see note). If 0 (FALSE) then the valve is closed and if 1 (TRUE) then it is open. */
    'GENERAL_ENG_FUEL_VALVE:index': {
        name: 'GENERAL ENG FUEL VALVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Settable alternator (generator) on/off switch for the indexed engine (see note). */
    'GENERAL_ENG_GENERATOR_ACTIVE:index': {
        name: 'GENERAL ENG GENERATOR ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Alternator (generator) on/off switch state for the indexed engine (see note). */
    'GENERAL_ENG_GENERATOR_SWITCH:index': {
        name: 'GENERAL ENG GENERATOR SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This can be used to find the time since the indexed engine (see note) started running. Similar to ElapsedTachometerTime, this records the time the engine has been running, but instead of taking a % of the time based on the Pct/RPM this takes the full time, but only if a threshold RPM/speed is reached. You can set the thresholds using the accumulated_time_hobbs_min_pct_rpm
          and accumulated_time_hobbs_min_knots parameters in the [GENERALENGINEDATA] section of the engines.cfg file. */
    'GENERAL_ENG_HOBBS_ELAPSED_TIME:index': {
        name: 'GENERAL ENG HOBBS ELAPSED TIME:index',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The alternator switch for a specific engine. Requires an engine index (1 - 4) when used. */
    GENERAL_ENG_MASTER_ALTERNATOR: {
        name: 'GENERAL ENG MASTER ALTERNATOR',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Maximum attained rpm for the indexed engine (see note). */
    'GENERAL_ENG_MAX_REACHED_RPM:index': {
        name: 'GENERAL ENG MAX REACHED RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of max mixture lever position for the indexed engine (see note). */
    'GENERAL_ENG_MIXTURE_LEVER_POSITION:index': {
        name: 'GENERAL ENG MIXTURE LEVER POSITION:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of max oil capacity leaked for the indexed engine (see note). */
    'GENERAL_ENG_OIL_LEAKED_PERCENT:index': {
        name: 'GENERAL ENG OIL LEAKED PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) oil pressure. */
    'GENERAL_ENG_OIL_PRESSURE:index': {
        name: 'GENERAL ENG OIL PRESSURE:index',
        units: 'Psf',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see note) oil temperature. */
    'GENERAL_ENG_OIL_TEMPERATURE:index': {
        name: 'GENERAL ENG OIL TEMPERATURE:index',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of max rated rpm for the indexed engine (see note).
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'GENERAL_ENG_PCT_MAX_RPM:index': {
        name: 'GENERAL ENG PCT MAX RPM:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of max prop lever position for the indexed engine (see note). */
    'GENERAL_ENG_PROPELLER_LEVER_POSITION:index': {
        name: 'GENERAL ENG PROPELLER LEVER POSITION:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will return 1 (TRUE) if the reverse thruster is engaged, or 0 (FALSE) otherwise. */
    GENERAL_ENG_REVERSE_THRUST_ENGAGED: {
        name: 'GENERAL ENG REVERSE THRUST ENGAGED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The RPM for an indexed engine (see note).
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'GENERAL_ENG_RPM:index': {
        name: 'GENERAL ENG RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see note) starter on/off state. */
    'GENERAL_ENG_STARTER:index': {
        name: 'GENERAL ENG STARTER:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the indexed engine (see note) starter is active.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'GENERAL_ENG_STARTER_ACTIVE:index': {
        name: 'GENERAL ENG STARTER ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent of max throttle position for the indexed engine (see note). */
    'GENERAL_ENG_THROTTLE_LEVER_POSITION:index': {
        name: 'GENERAL ENG THROTTLE LEVER POSITION:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current mode of the managed throttle for the indexed engine (see note). */
    'GENERAL_ENG_THROTTLE_MANAGED_MODE:index': {
        name: 'GENERAL ENG THROTTLE MANAGED MODE:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Aircraft master ignition switch (grounds all engines magnetos). */
    MASTER_IGNITION_SWITCH: {
        name: 'MASTER IGNITION SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The maximum EGT, as set using the egt_peak_temperature parameter in the engines.cfg file. */
    MAX_EGT: {
        name: 'MAX EGT',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The maximum oil temperature, as set using the parameter oil_temp_heating_constant in the engines.cfg file. */
    MAX_OIL_TEMPERATURE: {
        name: 'MAX OIL TEMPERATURE',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum rated rpm for the indexed engine (see note). */
    MAX_RATED_ENGINE_RPM: {
        name: 'MAX RATED ENGINE RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Number of engines (minimum 0, maximum 4) */
    NUMBER_OF_ENGINES: {
        name: 'NUMBER OF ENGINES',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, do not use! */
    OIL_AMOUNT: {
        name: 'OIL AMOUNT',
        units: 'FS7 Oil Quantity',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Auto-feather arming switch for the indexed engine (see note). Please see the Note On Autofeathering for more information. */
    'PANEL_AUTO_FEATHER_SWITCH:index': {
        name: 'PANEL AUTO FEATHER SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if prop auto cruise active */
    PROP_AUTO_CRUISE_ACTIVE: {
        name: 'PROP AUTO CRUISE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Auto-feather armed state for the indexed engine (see note). */
    'PROP_AUTO_FEATHER_ARMED:index': {
        name: 'PROP AUTO FEATHER ARMED:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The "prop beta" is the pitch of the blades of the propeller, and this can be used to retrieve the current pitch setting, per indexed engine (see note). */
    'PROP_BETA:index': {
        name: 'PROP BETA:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This can be used to enable the propeller forced beta mode (1, TRUE) or disable it (0, FALSE), when being written to. When being read from, it will return TRUE (1) if the forced beta mode is enabled or FALSE (0) if it isn't. When enabled, the PROP BETA FORCED POSITION value will be used to drive the prop beta, while the internal coded simulation logic is used when this is disabled. */
    PROP_BETA_FORCED_ACTIVE: {
        name: 'PROP BETA FORCED ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Get or set the beta at which the prop is forced. Only valid when PROP BETA FORCED ACTIVE is TRUE (1). */
    PROP_BETA_FORCED_POSITION: {
        name: 'PROP BETA FORCED POSITION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "prop beta" is the pitch of the blades of the propeller. This retrieves the maximum possible pitch value for all engines. */
    PROP_BETA_MAX: {
        name: 'PROP BETA MAX',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "prop beta" is the pitch of the blades of the propeller. This retrieves the minimum possible pitch value for all engines. */
    PROP_BETA_MIN: {
        name: 'PROP BETA MIN',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "prop beta" is the pitch of the blades of the propeller. This retrieves the minimum possible pitch value when the propeller is in reverse for all engines. */
    PROP_BETA_MIN_REVERSE: {
        name: 'PROP BETA MIN REVERSE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if prop deice switch on for the indexed engine (see note). */
    'PROP_DEICE_SWITCH:index': {
        name: 'PROP DEICE SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will return the feathered state of the propeller for an indexed engine (see note). The state is either feathered (true) or not (false). */
    'PROP_FEATHERED:index': {
        name: 'PROP FEATHERED:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Feathering inhibit flag for the indexed engine (see note). */
    'PROP_FEATHERING_INHIBIT:index': {
        name: 'PROP FEATHERING INHIBIT:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Prop feather switch for the indexed engine (see note). */
    'PROP_FEATHER_SWITCH:index': {
        name: 'PROP FEATHER SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent of max rated rpm for the indexed engine (see note).
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'PROP_MAX_RPM_PERCENT:index': {
        name: 'PROP MAX RPM PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Prop rotation angle.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    PROP_ROTATION_ANGLE: {
        name: 'PROP ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Propeller rpm for the indexed engine (see note). */
    'PROP_RPM:index': {
        name: 'PROP RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if prop sync is active the indexed engine (see note). */
    'PROP_SYNC_ACTIVE:index': {
        name: 'PROP SYNC ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Corrected prop correction input on slaved engine for the indexed engine (see note). */
    'PROP_SYNC_DELTA_LEVER:index': {
        name: 'PROP SYNC DELTA LEVER:index',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Propeller thrust for the indexed engine (see note).
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'PROP_THRUST:index': {
        name: 'PROP THRUST:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, do not use! */
    PROPELLER_ADVANCED_SELECTION: {
        name: 'PROPELLER ADVANCED SELECTION',
        units: 'Enum',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This checks if the shutoff valve to the engine has been pulled (true) or not (false). When pulled piston engines will be blocked from getting any fuel. */
    SHUTOFF_VALVE_PULLED: {
        name: 'SHUTOFF VALVE PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent throttle defining lower limit (negative for reverse thrust equipped airplanes). */
    THROTTLE_LOWER_LIMIT: {
        name: 'THROTTLE LOWER LIMIT',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Afterburner state for the indexed engine (see note).
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'TURB_ENG_AFTERBURNER:index': {
        name: 'TURB ENG AFTERBURNER:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The percentage that the afterburner is running at.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'TURB_ENG_AFTERBURNER_PCT_ACTIVE:index': {
        name: 'TURB ENG AFTERBURNER PCT ACTIVE:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The stage of the afterburner, or 0 if the afterburner is not active.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'TURB_ENG_AFTERBURNER_STAGE_ACTIVE:index': {
        name: 'TURB ENG AFTERBURNER STAGE ACTIVE:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Bleed air pressure for the indexed engine (see note). */
    'TURB_ENG_BLEED_AIR:index': {
        name: 'TURB ENG BLEED AIR:index',
        units: 'Pounds per square inch (psi',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Effective commanded N1 for the indexed turbine engine (see note). */
    'TURB_ENG_COMMANDED_N1:index': {
        name: 'TURB ENG COMMANDED N1:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** When the throttle is on idle position, this sets the condition levers to one of 3 positions to define the idle N1 target for the indexed engine (see note):
          
            Down position is the cut-off position that cuts the fuel to the engine, effectively shutting down the engine.
            Middle position requires N1 to reach the low idle value when throttle is in idle position (low idle value can be checked using the TURB_ENG_LOW_IDLE SimVar).
            High position requires N1 to reach the high idle value when throttle is in idle position (high idle value can be checked using the TURB_ENG_HIGH_IDLE SimVar).
          
          Note that this option requires several settings from the engines.cfg file to be set to specific values before working correctly:
          
            DisableMixtureControls needs to be set to 1 (TRUE).
            tp_idle_range should be set to 0 (since there is no mixture setting).
            idle_fuel_flow and idle_high_fuel_flow must be set to the same value (since there is no mixture setting to induce a variation between the 2).
            low_idle_n1 and high_idle_n1 to be correctly set. */
    'TURB_ENG_CONDITION_LEVER_POSITION:index': {
        name: 'TURB ENG CONDITION LEVER POSITION:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Corrected fuel flow for the indexed engine (see note). */
    'TURB_ENG_CORRECTED_FF:index': {
        name: 'TURB ENG CORRECTED FF:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed turbine engine (see note) corrected N1. */
    'TURB_ENG_CORRECTED_N1:index': {
        name: 'TURB ENG CORRECTED N1:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed turbine engine (see note) corrected N2. */
    'TURB_ENG_CORRECTED_N2:index': {
        name: 'TURB ENG CORRECTED N2:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The amount of free torque for the indexed turbine engine (see note). */
    'TURB_ENG_FREE_TURBINE_TORQUE:index': {
        name: 'TURB ENG FREE TURBINE TORQUE:index',
        units: 'Foot Pound',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if fuel is available for the indexed engine (see note). */
    'TURB_ENG_FUEL_AVAILABLE:index': {
        name: 'TURB ENG FUEL AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is used to control the fuel efficiency loss of the indexed engine, from 0 - no fuel efficiency loss - to 100 - double the fuel consumption. */
    'TURB_ENG_FUEL_EFFICIENCY_LOSS:index': {
        name: 'TURB ENG FUEL EFFICIENCY LOSS:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see note) fuel flow rate. */
    'TURB_ENG_FUEL_FLOW_PPH:index': {
        name: 'TURB ENG FUEL FLOW PPH:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Retrieves the high idle N1 value to be reached by the the indexed turboprop engine (see note) with throttle in idle position and condition lever in high idle position (condition lever position can be checked or set using the TURB_ENG_CONDITION_LEVER_POSITION SimVar). */
    'TURB_ENG_HIGH_IDLE:index': {
        name: 'TURB ENG HIGH IDLE:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the the indexed turbine engine (see note) ignition switch is on. */
    'TURB_ENG_IGNITION_SWITCH:index': {
        name: 'TURB ENG IGNITION SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Position of the the indexed turbine engine (see note) Ignition Switch. Similar to TURB_ENG_IGNITION_SWITCH but differentiates between ON and AUTO. */
    'TURB_ENG_IGNITION_SWITCH_EX1:index': {
        name: 'TURB ENG IGNITION SWITCH EX1:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the ignition system is currently running for the indexed engine (see note). Depends on TURB_ENG_IGNITION_SWITCH_EX1 Enum, the cfg var ignition_auto_type and current state of the plane. */
    'TURB_ENG_IS_IGNITING:index': {
        name: 'TURB ENG IS IGNITING:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Retrieve or set the ITT for the indexed engine (see note). */
    'TURB_ENG_ITT:index': {
        name: 'TURB ENG ITT:index',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This is used to control the ITT cooling efficiency loss of the indexed engine, from 0 - no cooling efficiency loss - to 100 -engine recieves no ITT cooling. */
    'TURB_ENG_ITT_COOLING_EFFICIENCY_LOSS:index': {
        name: 'TURB ENG ITT COOLING EFFICIENCY LOSS:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see note) jet thrust. */
    'TURB_ENG_JET_THRUST:index': {
        name: 'TURB ENG JET THRUST:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Retrieves the low idle N1 value to be reached by the the indexed turboprop engine (see note) with throttle in idle position and condition lever in low idle position (condition lever position can be checked or set using the TURB_ENG_CONDITION_LEVER_POSITION SimVar). */
    'TURB_ENG_LOW_IDLE:index': {
        name: 'TURB ENG LOW IDLE:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the turbine engine master starter switch is on, false otherwise. */
    TURB_ENG_MASTER_STARTER_SWITCH: {
        name: 'TURB ENG MASTER STARTER SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent of max rated torque for the indexed engine (see note). */
    'TURB_ENG_MAX_TORQUE_PERCENT:index': {
        name: 'TURB ENG MAX TORQUE PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed turbine engine (see note) N1 value.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'TURB_ENG_N1:index': {
        name: 'TURB ENG N1:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This is used to control the N1 loss of the indexed engine, from 0 - no N1 loss - to 100 - 100% N1 loss. */
    'TURB_ENG_N1_LOSS:index': {
        name: 'TURB ENG N1 LOSS:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed turbine engine (see note) N2 value.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'TURB_ENG_N2:index': {
        name: 'TURB ENG N2:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Number of tanks currently being used by the indexed engine (see note). */
    'TURB_ENG_NUM_TANKS_USED:index': {
        name: 'TURB ENG NUM TANKS USED:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) pressure ratio. */
    'TURB_ENG_PRESSURE_RATIO:index': {
        name: 'TURB ENG PRESSURE RATIO:index',
        units: 'Ratio',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent thrust of primary nozzle for the indexed engine (see note). */
    'TURB_ENG_PRIMARY_NOZZLE_PERCENT:index': {
        name: 'TURB ENG PRIMARY NOZZLE PERCENT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent thrust reverser nozzles deployed for the indexed engine (see note).
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'TURB_ENG_REVERSE_NOZZLE_PERCENT:index': {
        name: 'TURB ENG REVERSE NOZZLE PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Fuel tanks used by the indexed engine (see note), one or more of the following bit flags:
          
            Center 1 Bit 0
            Center 2 Bit 1
            Center 3 Bit 2
            Left Main Bit 3
            Left Aux Bit 4
            Left Tip Bit 5
            Right Main Bit 6
            Right Aux Bit 7
            Right Tip Bit 8
            External 1 Bit 9
            External 2 Bit 10 */
    'TURB_ENG_TANKS_USED:index': {
        name: 'TURB ENG TANKS USED:index',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Fuel tank selected for the indexed engine (see note). See Fuel Tank Selection for a list of values. */
    'TURB_ENG_TANK_SELECTOR:index': {
        name: 'TURB ENG TANK SELECTOR:index',
        units: 'Enum',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The indexed turbine engine (see note) commanded N1 for current throttle position. */
    'TURB_ENG_THROTTLE_COMMANDED_N1:index': {
        name: 'TURB ENG THROTTLE COMMANDED N1:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This can be used to control the thrust efficiency loss of the indexed engine, where a value of 0 is 100% of available thrust, and 100 is 0% available thrust. */
    'TURB_ENG_THRUST_EFFICIENCY_LOSS:index': {
        name: 'TURB ENG THRUST EFFICIENCY LOSS:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed turbine engine (see note) vibration value. */
    'TURB_ENG_VIBRATION:index': {
        name: 'TURB ENG VIBRATION:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Retrieve the itt_peak_temperature as set in the engines.cfg file. */
    TURB_MAX_ITT: {
        name: 'TURB MAX ITT',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Carburetor temperature the indexed engine (see note). */
    'RECIP_CARBURETOR_TEMPERATURE:index': {
        name: 'RECIP CARBURETOR TEMPERATURE:index',
        units: 'Celsius',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Alternate air control the indexed engine (see note). */
    'RECIP_ENG_ALTERNATE_AIR_POSITION:index': {
        name: 'RECIP ENG ALTERNATE AIR POSITION:index',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The maximum quantity of water/methanol mixture in the ADI tank for the indexed engine (see note). This value is set as part of the [ANTIDETONATION_SYSTEM.N] section in the aircraft configuration files. */
    'RECIP_ENG_ANTIDETONATION_TANK_MAX_QUANTITY:index': {
        name: 'RECIP ENG ANTIDETONATION TANK MAX QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The quantity of water/methanol mixture currently in the ADI tank for the indexed engine (see note). */
    'RECIP_ENG_ANTIDETONATION_TANK_QUANTITY:index': {
        name: 'RECIP ENG ANTIDETONATION TANK QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The status of the ADI tank valve for the indexed engine (see note). */
    'RECIP_ENG_ANTIDETONATION_TANK_VALVE:index': {
        name: 'RECIP ENG ANTIDETONATION TANK VALVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This gives the actual flow rate of the Anti Detonation system for the indexed engine (see note). */
    'RECIP_ENG_ANTIDETONATION_FLOW_RATE:index': {
        name: 'RECIP ENG ANTIDETONATION FLOW RATE:index',
        units: 'Gallons per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Brake power produced by the indexed engine (see note). */
    'RECIP_ENG_BRAKE_POWER:index': {
        name: 'RECIP ENG BRAKE POWER:index',
        units: 'Foot pounds (ftlbs) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent coolant available for the indexed engine (see note). */
    'RECIP_ENG_COOLANT_RESERVOIR_PERCENT:index': {
        name: 'RECIP ENG COOLANT RESERVOIR PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent cowl flap opened for the indexed engine (see note). */
    'RECIP_ENG_COWL_FLAP_POSITION:index': {
        name: 'RECIP ENG COWL FLAP POSITION:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Engine cylinder head temperature for the indexed engine (see note). */
    'RECIP_ENG_CYLINDER_HEAD_TEMPERATURE:index': {
        name: 'RECIP ENG CYLINDER HEAD TEMPERATURE:index',
        units: 'Celsius',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Index high 16 bits is engine number, low16 cylinder number, both indexed from 1. */
    'RECIP_ENG_CYLINDER_HEALTH:index': {
        name: 'RECIP ENG CYLINDER HEALTH:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Set to 1 (TRUE) if the indexed engine (see note) is detonating. */
    'RECIP_ENG_DETONATING:index': {
        name: 'RECIP ENG DETONATING:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether emergency boost is active (1, TRUE) or not (0, FALSE) for the indexed engine (see note). */
    'RECIP_ENG_EMERGENCY_BOOST_ACTIVE:index': {
        name: 'RECIP ENG EMERGENCY BOOST ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The elapsed time that emergency boost has been active on the indexed engine (see note). The timer will start when boost is first activated.
          IMPORTANT! This timer does not reset. So if you set your time limit in the engines.cfg file to 315s and you spend 2 minutes with boost active, then pull back on the throttle for 1 minute, then engage boost again for 2 minutes, the simulation will consider that you spent 4 minutes with boost active. The 1 minute pause is not taken into account. */
    'RECIP_ENG_EMERGENCY_BOOST_ELAPSED_TIME:index': {
        name: 'RECIP ENG EMERGENCY BOOST ELAPSED TIME:index',
        units: 'Hours',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the Engine Master switch is active on an indexed engine (see note). */
    'RECIP_ENG_ENGINE_MASTER_SWITCH:index': {
        name: 'RECIP ENG ENGINE MASTER SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if fuel is available for the indexed engine (see note). */
    'RECIP_ENG_FUEL_AVAILABLE:index': {
        name: 'RECIP ENG FUEL AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The indexed engine (see note) fuel flow. */
    'RECIP_ENG_FUEL_FLOW:index': {
        name: 'RECIP ENG FUEL FLOW:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Number of tanks currently being used by the indexed engine (see note). */
    'RECIP_ENG_FUEL_NUMBER_TANKS_USED:index': {
        name: 'RECIP ENG FUEL NUMBER TANKS USED:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Fuel tanks used by the indexed engine (see note), one or more of the following bit flags:
          
            Center 1 Bit 0
            Center 2 Bit 1
            Center 3 Bit 2
            Left Main Bit 3
            Left Aux Bit 4
            Left Tip Bit 5
            Right Main Bit 6
            Right Aux Bit 7
            Right Tip Bit 8
            External 1 Bit 9
            External 2 Bit 10 */
    'RECIP_ENG_FUEL_TANKS_USED:index': {
        name: 'RECIP ENG FUEL TANKS USED:index',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Fuel tank selected for the indexed engine (see note). See Fuel Tank Selection for a list of values. */
    'RECIP_ENG_FUEL_TANK_SELECTOR:index': {
        name: 'RECIP ENG FUEL TANK SELECTOR:index',
        units: 'Enum',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the Glow Plug is active on the indexed engine (see note).. */
    'RECIP_ENG_GLOW_PLUG_ACTIVE:index': {
        name: 'RECIP ENG GLOW PLUG ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Left magneto state for the indexed engine (see note). */
    'RECIP_ENG_LEFT_MAGNETO:index': {
        name: 'RECIP ENG LEFT MAGNETO:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The indexed engine (see note) manifold pressure. */
    'RECIP_ENG_MANIFOLD_PRESSURE:index': {
        name: 'RECIP ENG MANIFOLD PRESSURE:index',
        units: 'Pounds per square inch (psi',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The maximum quantity of nitrous permitted per indexed engine (see note). */
    'RECIP_ENG_NITROUS_TANK_MAX_QUANTITY:index': {
        name: 'RECIP ENG NITROUS TANK MAX QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The quantity of nitrous per indexed engine (see note). */
    'RECIP_ENG_NITROUS_TANK_QUANTITY:index': {
        name: 'RECIP ENG NITROUS TANK QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The statte of the nitrous tank valve for the indexed engine (see note). Either 1 (TRUE) for open or 0 (FALSE) for closed. */
    RECIP_ENG_NITROUS_TANK_VALVE: {
        name: 'RECIP ENG NITROUS TANK VALVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The number of cylinders for the indexed engine (see note). */
    'RECIP_ENG_NUM_CYLINDERS:index': {
        name: 'RECIP ENG NUM CYLINDERS:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The number of cylinders that have failed in the indexed engine (see note). */
    'RECIP_ENG_NUM_CYLINDERS_FAILED:index': {
        name: 'RECIP ENG NUM CYLINDERS FAILED:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) primer state. */
    'RECIP_ENG_PRIMER:index': {
        name: 'RECIP ENG PRIMER:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The indexed engine (see note) radiator temperature. */
    'RECIP_ENG_RADIATOR_TEMPERATURE:index': {
        name: 'RECIP ENG RADIATOR TEMPERATURE:index',
        units: 'Celsius',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see note) right magneto state. */
    'RECIP_ENG_RIGHT_MAGNETO:index': {
        name: 'RECIP ENG RIGHT MAGNETO:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Torque produced by the indexed engine (see note). */
    'RECIP_ENG_STARTER_TORQUE:index': {
        name: 'RECIP ENG STARTER TORQUE:index',
        units: 'Foot pound',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns which of the supercharger gears is engaged for the indexed engine (see note). */
    'RECIP_ENG_SUPERCHARGER_ACTIVE_GEAR:index': {
        name: 'RECIP ENG SUPERCHARGER ACTIVE GEAR:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see note) turbine inlet temperature. */
    'RECIP_ENG_TURBINE_INLET_TEMPERATURE:index': {
        name: 'RECIP ENG TURBINE INLET TEMPERATURE:index',
        units: 'Celsius',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see note) turbo failed state. */
    'RECIP_ENG_TURBOCHARGER_FAILED:index': {
        name: 'RECIP ENG TURBOCHARGER FAILED:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** When the engines.cfg parameter turbocharged is TRUE, this SimVar will return the percentage that the turbo waste gate is closed for the indexed engine (see note). If the turbocharged variable is FALSE and the manifold_pressure_regulator parameter is TRUE, then this will return the percentage that the manifold pressure regulator is closed for the indexed engine. */
    'RECIP_ENG_WASTEGATE_POSITION:index': {
        name: 'RECIP ENG WASTEGATE POSITION:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will return the cylinder head temperature value set by the cht_heating_constant parameter in the engines.cfg file. */
    RECIP_MAX_CHT: {
        name: 'RECIP MAX CHT',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Fuel / Air mixture ratio for the indexed engine (see note). */
    'RECIP_MIXTURE_RATIO:index': {
        name: 'RECIP MIXTURE RATIO:index',
        units: 'Ratio',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Beta dot */
    BETA_DOT: {
        name: 'BETA DOT',
        units: 'Radians per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Design decision altitude above mean sea level */
    DECISION_ALTITUDE_MSL: {
        name: 'DECISION ALTITUDE MSL',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Design decision height */
    DECISION_HEIGHT: {
        name: 'DECISION HEIGHT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This design constant represents the optimal altitude the aircraft should maintain when in cruise. It is derived from the cruise_alt setting in the [REFERENCE SPEEDS] section of the flightmodel.cfg. Default is 1500ft. */
    DESIGN_CRUISE_ALT: {
        name: 'DESIGN CRUISE ALT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This design constant represents the spawn altitude for the aircraft when spawning in cruise. It is derived from the spawn_cruise_altitude setting in the [REFERENCE SPEEDS] section of the flightmodel.cfg. Default is 1500ft. */
    DESIGN_SPAWN_ALTITUDE_CRUISE: {
        name: 'DESIGN SPAWN ALTITUDE CRUISE',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This design constant represents the spawn altitude for the aircraft when spawning in descent. It is derived from the spawn_descent_altitude setting in the [REFERENCE SPEEDS] section of the flightmodel.cfg. Default is 500ft. */
    DESIGN_SPAWN_ALTITUDE_DESCENT: {
        name: 'DESIGN SPAWN ALTITUDE DESCENT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This design constant represents the optimal climb speed for the aircraft. It is derived from the climb_speed setting in the [REFERENCE SPEEDS] section of the flightmodel.cfg. Default value is -1. */
    DESIGN_SPEED_CLIMB: {
        name: 'DESIGN SPEED CLIMB',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This design constant represents the minimum speed required for aircraft rotation. It is derived from the rotation_speed_min setting in the [REFERENCE SPEEDS] section of the flightmodel.cfg. Default value is -1. */
    DESIGN_SPEED_MIN_ROTATION: {
        name: 'DESIGN SPEED MIN ROTATION',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This design constant represents the aircraft ideal cruising speed. It is derived from the cruise_speed setting in the [REFERENCE SPEEDS] section of the flightmodel.cfg. The default value is computed an internal function that uses the estimated cruise altitude and estimated cruise percent power, according of the engine type, the number of engines, the density, the wing area and some drag parameters. Normally this value is set in the CFG file and the default value is never used. */
    DESIGN_SPEED_VC: {
        name: 'DESIGN SPEED VC',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This design constant represents the the stall speed when flaps are fully extended. It is derived from the full_flaps_stall_speed setting in the [REFERENCE SPEEDS] section of the flightmodel.cfg. Default value is 0.8 x VS. */
    DESIGN_SPEED_VS0: {
        name: 'DESIGN SPEED VS0',
        units: 'kias',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This design constant represents the stall speed when flaps are fully retracted. It is derived from the flaps_up_stall_speed setting in the [REFERENCE SPEEDS] section of the flightmodel.cfg. Default value is 0. */
    DESIGN_SPEED_VS1: {
        name: 'DESIGN SPEED VS1',
        units: 'kias',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This design constant represents the aircraft ideal takoff speed. It is derived from the takeoff_speed setting in the [REFERENCE SPEEDS] section of the flightmodel.cfg. */
    DESIGN_TAKEOFF_SPEED: {
        name: 'DESIGN TAKEOFF SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Dynamic pressure */
    DYNAMIC_PRESSURE: {
        name: 'DYNAMIC PRESSURE',
        units: 'Pounds per square foot (psf)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Estimated cruise speed */
    ESTIMATED_CRUISE_SPEED: {
        name: 'ESTIMATED CRUISE SPEED',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current g force */
    G_FORCE: {
        name: 'G FORCE',
        units: 'GForce',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This returns the setting of the G-limiter, as set using the GLimiterSetting parameter. */
    G_LIMITER_SETTING: {
        name: 'G LIMITER SETTING',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Angle of attack */
    INCIDENCE_ALPHA: {
        name: 'INCIDENCE ALPHA',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Sideslip angle */
    INCIDENCE_BETA: {
        name: 'INCIDENCE BETA',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the aircraft is a taildragger */
    IS_TAIL_DRAGGER: {
        name: 'IS TAIL DRAGGER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Linear CL alpha */
    LINEAR_CL_ALPHA: {
        name: 'LINEAR CL ALPHA',
        units: 'Per radian',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum design mach */
    MACH_MAX_OPERATE: {
        name: 'MACH MAX OPERATE',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum G force attained */
    MAX_G_FORCE: {
        name: 'MAX G FORCE',
        units: 'Gforce',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Minimum drag velocity,
in clean, with no input and no gears, when at 10000ft. */
    MIN_DRAG_VELOCITY: {
        name: 'MIN DRAG VELOCITY',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Minimum G force attained */
    MIN_G_FORCE: {
        name: 'MIN G FORCE',
        units: 'Gforce',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, do not use! */
    SEMIBODY_LOADFACTOR_X: {
        name: 'SEMIBODY LOADFACTOR X',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration along the axis Y divided by the gravity constant g (usually around 9.81m.s²) */
    SEMIBODY_LOADFACTOR_Y: {
        name: 'SEMIBODY LOADFACTOR Y',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Derivative of SEMIBODY LOADFACTOR Y in relation to time. */
    SEMIBODY_LOADFACTOR_YDOT: {
        name: 'SEMIBODY LOADFACTOR YDOT',
        units: 'Per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, do not use! */
    SEMIBODY_LOADFACTOR_Z: {
        name: 'SEMIBODY LOADFACTOR Z',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Sigma sqrt */
    SIGMA_SQRT: {
        name: 'SIGMA SQRT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Simulated radius */
    SIMULATED_RADIUS: {
        name: 'SIMULATED RADIUS',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The angle of attack which produces the maximum lift coefficient before entering into stall conditions. */
    STALL_ALPHA: {
        name: 'STALL ALPHA',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The angle at which static pitch stability is achieved. */
    STATIC_PITCH: {
        name: 'STATIC PITCH',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** the typical (normal) descent rate for the aircraft. */
    TYPICAL_DESCENT_RATE: {
        name: 'TYPICAL DESCENT RATE',
        units: 'Feet (ft) per minute',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total wing area */
    WING_AREA: {
        name: 'WING AREA',
        units: 'Square feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current wing flex. Different values can be set for each wing (for example, during banking). Set an index of 1 for the left wing, and 2 for the right wing. */
    'WING_FLEX_PCT:index': {
        name: 'WING FLEX PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Total wing span */
    WING_SPAN: {
        name: 'WING SPAN',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The yaw string angle. Yaw strings are attached to gliders as visible indicators of the yaw angle. An animation of this is not implemented in ESP. */
    YAW_STRING_ANGLE: {
        name: 'YAW STRING ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Yaw string angle as a percentage */
    YAW_STRING_PCT_EXTENDED: {
        name: 'YAW STRING PCT EXTENDED',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The angle of attack at which the wing has zero lift. */
    ZERO_LIFT_ALPHA: {
        name: 'ZERO LIFT ALPHA',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Most backward authorized position of the CG according to the POH.
          NOTE: This is only valid for airplanes. */
    CG_AFT_LIMIT: {
        name: 'CG AFT LIMIT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The longitudinal CG position relative to the Reference Datum Position.
          NOTE: This is only valid for helicopters. */
    CG_FEET: {
        name: 'CG FEET',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The aft
CG
limit position relative to the Reference Datum Position.
          NOTE: This is only valid for helicopters. */
    CG_FEET_AFT_LIMIT: {
        name: 'CG FEET AFT LIMIT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The lateral
CG position relative to the Reference Datum Position.
          NOTE: This is only valid for helicopters. */
    CG_FEET_LATERAL: {
        name: 'CG FEET LATERAL',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The left hand lateral
CG position relative to the Reference Datum Position.
          NOTE: This is only valid for helicopters. */
    CG_FEET_LATERAL_LEFT_LIMIT: {
        name: 'CG FEET LATERAL LEFT LIMIT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The right hand lateral
CG position relative to the Reference Datum Position.
          NOTE: This is only valid for helicopters. */
    CG_FEET_LATERAL_RIGHT_LIMIT: {
        name: 'CG FEET LATERAL RIGHT LIMIT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The forward
CG
limit position relative to the Reference Datum Position.
          NOTE: This is only valid for helicopters. */
    CG_FEET_FWD_LIMIT: {
        name: 'CG FEET FWD LIMIT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Most forward authorized position of the CG according to the POH.
          NOTE: This is only valid for airplanes. */
    CG_FWD_LIMIT: {
        name: 'CG FWD LIMIT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, do not use! */
    CG_MAX_MACH: {
        name: 'CG MAX MACH',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, do not use! */
    CG_MIN_MACH: {
        name: 'CG MIN MACH',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Longitudinal CG position as a percent of reference Chord.
          NOTE: This is only valid for airplanes. */
    CG_PERCENT: {
        name: 'CG PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Lateral CG position as a percent of reference Chord.
          NOTE: This is only valid for airplanes. */
    CG_PERCENT_LATERAL: {
        name: 'CG PERCENT LATERAL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Static CG position with reference to the ground.
          NOTE: This is only valid for airplanes. */
    STATIC_CG_TO_GROUND: {
        name: 'STATIC CG TO GROUND',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point orientation: Bank */
    INTERACTIVE_POINT_BANK: {
        name: 'INTERACTIVE POINT BANK',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point orientation: Heading */
    INTERACTIVE_POINT_HEADING: {
        name: 'INTERACTIVE POINT HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired left bend ratio of jetway hood */
    INTERACTIVE_POINT_JETWAY_LEFT_BEND: {
        name: 'INTERACTIVE POINT JETWAY LEFT BEND',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired left deployment angle of jetway hood */
    INTERACTIVE_POINT_JETWAY_LEFT_DEPLOYMENT: {
        name: 'INTERACTIVE POINT JETWAY LEFT DEPLOYMENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired right bend ratio of jetway hood */
    INTERACTIVE_POINT_JETWAY_RIGHT_BEND: {
        name: 'INTERACTIVE POINT JETWAY RIGHT BEND',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired right deployment angle of jetway hood */
    INTERACTIVE_POINT_JETWAY_RIGHT_DEPLOYMENT: {
        name: 'INTERACTIVE POINT JETWAY RIGHT DEPLOYMENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired top horizontal ratio of displacement of jetway hood */
    INTERACTIVE_POINT_JETWAY_TOP_HORIZONTAL: {
        name: 'INTERACTIVE POINT JETWAY TOP HORIZONTAL',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired top vertical ratio of displacement of jetway hood */
    INTERACTIVE_POINT_JETWAY_TOP_VERTICAL: {
        name: 'INTERACTIVE POINT JETWAY TOP VERTICAL',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The Interactive Point goal percentage of opening (if it's for a door) or percentage of deployment (if it's for a hose or cable). */
    INTERACTIVE_POINT_GOAL: {
        name: 'INTERACTIVE POINT GOAL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Interactive Point current percentage of opening (if door) or deployment (if hose/cable) */
    INTERACTIVE_POINT_OPEN: {
        name: 'INTERACTIVE POINT OPEN',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Interactive Point orientation: Pitch */
    INTERACTIVE_POINT_PITCH: {
        name: 'INTERACTIVE POINT PITCH',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point X position relative to datum reference point */
    INTERACTIVE_POINT_POSX: {
        name: 'INTERACTIVE POINT POSX',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Y position relative to datum reference point */
    INTERACTIVE_POINT_POSY: {
        name: 'INTERACTIVE POINT POSY',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Z position relative to datum reference point */
    INTERACTIVE_POINT_POSZ: {
        name: 'INTERACTIVE POINT POSZ',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The type of interactive point */
    INTERACTIVE_POINT_TYPE: {
        name: 'INTERACTIVE POINT TYPE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Empty weight of the aircraft */
    EMPTY_WEIGHT: {
        name: 'EMPTY WEIGHT',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Empty weight cross coupled moment of inertia */
    EMPTY_WEIGHT_CROSS_COUPLED_MOI: {
        name: 'EMPTY WEIGHT CROSS COUPLED MOI',
        units: 'Slugs per feet squared (Slug sqft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Empty weight pitch moment of inertia */
    EMPTY_WEIGHT_PITCH_MOI: {
        name: 'EMPTY WEIGHT PITCH MOI',
        units: 'Slugs per feet squared (Slug sqft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Empty weight roll moment of inertia */
    EMPTY_WEIGHT_ROLL_MOI: {
        name: 'EMPTY WEIGHT ROLL MOI',
        units: 'Slugs per feet squared (Slug sqft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Empty weight yaw moment of inertia */
    EMPTY_WEIGHT_YAW_MOI: {
        name: 'EMPTY WEIGHT YAW MOI',
        units: 'Slugs per feet squared (Slug sqft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum gross weight of the aircaft */
    MAX_GROSS_WEIGHT: {
        name: 'MAX GROSS WEIGHT',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight of the aircraft */
    TOTAL_WEIGHT: {
        name: 'TOTAL WEIGHT',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight cross coupled moment of inertia */
    TOTAL_WEIGHT_CROSS_COUPLED_MOI: {
        name: 'TOTAL WEIGHT CROSS COUPLED MOI',
        units: 'Slugs per feet squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight pitch moment of inertia */
    TOTAL_WEIGHT_PITCH_MOI: {
        name: 'TOTAL WEIGHT PITCH MOI',
        units: 'Slugs per feet squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight roll moment of inertia */
    TOTAL_WEIGHT_ROLL_MOI: {
        name: 'TOTAL WEIGHT ROLL MOI',
        units: 'Slugs per feet squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight yaw moment of inertia */
    TOTAL_WEIGHT_YAW_MOI: {
        name: 'TOTAL WEIGHT YAW MOI',
        units: 'Slugs per feet squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Cross feed valve setting. This will return the current setting for the fuel crossfeed for the indexed engine, based on the current status of the simulation and the Cross Feed key events. */
    'FUEL_CROSS_FEED:index': {
        name: 'FUEL CROSS FEED:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** If 1 (TRUE) then the aircraft can dump fuel. */
    FUEL_DUMP_ACTIVE: {
        name: 'FUEL DUMP ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** If set to 1 (TRUE) then the aircraft will dump fuel at the rate set by fuel_dump_rate parameter in the flight_model.cfg
file. */
    FUEL_DUMP_SWITCH: {
        name: 'FUEL DUMP SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Maximum capacity in volume of all the tanks on the left side of the aircraft. */
    FUEL_LEFT_CAPACITY: {
        name: 'FUEL LEFT CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current quantity in volume of all the tanks on the left side of the aircraft. */
    FUEL_LEFT_QUANTITY: {
        name: 'FUEL LEFT QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Currently not used within the simulation. */
    FUEL_PUMP: {
        name: 'FUEL PUMP',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum capacity in volume of all the tanks on the right side of the aircraft. */
    FUEL_RIGHT_CAPACITY: {
        name: 'FUEL RIGHT CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current quantity in volume of all the tanks on the right side of the aircraft. */
    FUEL_RIGHT_QUANTITY: {
        name: 'FUEL RIGHT QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Quantity of fuel in the tank referenced by the indexed selector.
When using the legacy fuel system, this SimVar will return the quantity of fuel in the tank pointed to by the selector you chose with the index. If passing an index higher than the number of selectors - or when using the modern fuel system - it will return the total fuel quantity available. */
    'FUEL_SELECTED_QUANTITY:index': {
        name: 'FUEL SELECTED QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent or capacity for the tank referenced by the indexed selector.
When using the legacy fuel system, this SimVar will return the percentage of fuel in the tank pointed to by the selector you chose with the index. If passing an index higher than the number of selectors available - or when using the modern fuel system - it will return the percentage of total fuel quantity available. */
    'FUEL_SELECTED_QUANTITY_PERCENT:index': {
        name: 'FUEL SELECTED QUANTITY PERCENT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The method of transfer for the fuel. Each of the available transfer options are explained below:
          
            off - Fuel transfer is switched off.
            auto - Automatically balance the fuel between the Center1 and Center2 tanks to maintain the center of gravity.
            forward - Fuel will be transferred forwards from the Center1 tank to the Center2 tank.
            aft - Fuel will be transferred aftwards from the Center2 tank to the Center1 tank.
            manual - Fuel will be transferred for 1 second from the Center1 tank to the Center2 tank at a rate of 1lbs/s.
            custom - This requires one or more pumps to have been defined using the fuel_transfer_pump.N parameter in the flight_model.cfg file, as well as their associated electrical circuits. */
    FUEL_SELECTED_TRANSFER_MODE: {
        name: 'FUEL SELECTED TRANSFER MODE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Total fuel capacity of the aircraft for all tanks. */
    FUEL_TOTAL_CAPACITY: {
        name: 'FUEL TOTAL CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current total quantity of fuel in volume for all tanks of the aircraft. */
    FUEL_TOTAL_QUANTITY: {
        name: 'FUEL TOTAL QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current total fuel weight for all tanks of the aircraft */
    FUEL_TOTAL_QUANTITY_WEIGHT: {
        name: 'FUEL TOTAL QUANTITY WEIGHT',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns 1 (TRUE) if the indexed pump is active. */
    'FUEL_TRANSFER_PUMP_ON:index': {
        name: 'FUEL TRANSFER PUMP ON:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The weight of the fuel, per gallon. */
    FUEL_WEIGHT_PER_GALLON: {
        name: 'FUEL WEIGHT PER GALLON',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Will return 1 (TRUE) if the aircraft is using the modern [FUEL_SYSTEM] or 0 (FALSE) for the legacy [FUEL]. */
    NEW_FUEL_SYSTEM: {
        name: 'NEW FUEL SYSTEM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The number of fuel selectors on the aircraft. */
    NUM_FUEL_SELECTORS: {
        name: 'NUM FUEL SELECTORS',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Will return 1 (TRUE) if the unlimited fuel flag has been enabled, or 0 (FALSE) otherwise. */
    UNLIMITED_FUEL: {
        name: 'UNLIMITED FUEL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The total amount of fuel in all tanks of the aircraft which is not usable. */
    UNUSABLE_FUEL_TOTAL_QUANTITY: {
        name: 'UNUSABLE FUEL TOTAL QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The pressure of the fuel coming to the indexed engine. The index is the number of the engine N component as defined by the Engine.N parameter. */
    'FUELSYSTEM_ENGINE_PRESSURE:index': {
        name: 'FUELSYSTEM ENGINE PRESSURE:index',
        units: 'Kilo pascal',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This will return the current Option for the indexed junction. The index is the number of the line N component as defined by the Junction.N parameter. */
    'FUELSYSTEM_JUNCTION_SETTING:index': {
        name: 'FUELSYSTEM JUNCTION SETTING:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The fuel flowing through the indexed line in Gallons per Hour. The index is the number of the line N component as defined by the Line.N parameter. */
    'FUELSYSTEM_LINE_FUEL_FLOW:index': {
        name: 'FUELSYSTEM LINE FUEL FLOW:index',
        units: 'Gallons per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The level of fuel in the indexed line in Gallons. The index is the number of the line N component as defined by the Line.N parameter. */
    'FUELSYSTEM_LINE_FUEL_LEVEL:index': {
        name: 'FUELSYSTEM LINE FUEL LEVEL:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The pressure in the indexed fuel line, measured in KiloPascal. The index is the number of the line N component as defined by the Line.N parameter. */
    'FUELSYSTEM_LINE_FUEL_PRESSURE:index': {
        name: 'FUELSYSTEM LINE FUEL PRESSURE:index',
        units: 'Kilo pascal',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the indexed pump is actually active. The index is the number of the pump N component as defined by the Pump.N parameter. */
    'FUELSYSTEM_PUMP_ACTIVE:index': {
        name: 'FUELSYSTEM PUMP ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the indexed pump is enabled. The index is the number of the pump N component as defined by the Pump.N parameter. */
    'FUELSYSTEM_PUMP_SWITCH:index': {
        name: 'FUELSYSTEM PUMP SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Total capacity of the indexed fuel tank. The index is the number of the tank N component as defined by the Tank.N parameter.
          NOTE: This SimVar can only be used with the modern Fuel System. */
    'FUELSYSTEM_TANK_CAPACITY:index': {
        name: 'FUELSYSTEM TANK CAPACITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Quantity of fuel available in the indexed fuel tank. The index is the number of the tank N component as defined by the Tank.N parameter.
          NOTE: This SimVar can only be used with the modern Fuel System. */
    'FUELSYSTEM_TANK_LEVEL:index': {
        name: 'FUELSYSTEM TANK LEVEL:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Quantity of fuel currently available in the indexed fuel tank. The index is the number of the tank N component as defined by the Tank.N parameter.
          NOTE: If the fuel system
Version
is 2 or below, the index value will be one of the
Fuel Tank Selection
indices. */
    'FUELSYSTEM_TANK_QUANTITY:index': {
        name: 'FUELSYSTEM TANK QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Total quantity of fuel available in the indexed fuel tank, including any unusable fuel. The index is the number of the tank N component as defined by the Tank.N parameter.
          NOTE: If the fuel system
Version
is 2 or below, the index value will be one of the
Fuel Tank Selection
indices. */
    'FUELSYSTEM_TANK_TOTAL_QUANTITY:index': {
        name: 'FUELSYSTEM TANK TOTAL QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Weight of fuel available in the indexed fuel tank. The index is the number of the tank N component as defined by the Tank.N parameter.
          NOTE: If the fuel system
Version
is 2 or below, the index value will be one of the
Fuel Tank Selection
indices. */
    'FUELSYSTEM_TANK_WEIGHT:index': {
        name: 'FUELSYSTEM TANK WEIGHT:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the indexed trigger is active. The index is the number of the trigger N component as defined by the Trigger.N parameter. */
    'FUELSYSTEM_TRIGGER_STATUS:index': {
        name: 'FUELSYSTEM TRIGGER STATUS:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the indexed valve is actually fully opened. The index is the number of the valve N component as defined by the Valve.N parameter. */
    'FUELSYSTEM_VALVE_OPEN:index': {
        name: 'FUELSYSTEM VALVE OPEN:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the indexed valve is set to be opened. The index is the number of the valve N component as defined by the Valve.N parameter. */
    'FUELSYSTEM_VALVE_SWITCH:index': {
        name: 'FUELSYSTEM VALVE SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Maximum capacity in volume of
center tank 1/2/3. */
    FUEL_TANK_CENTER_CAPACITY: {
        name: 'FUEL TANK CENTER CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum capacity in volume of
center tank 1/2/3. */
    FUEL_TANK_CENTER2_CAPACITY: {
        name: 'FUEL TANK CENTER2 CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum capacity in volume of
center tank 1/2/3. */
    FUEL_TANK_CENTER3_CAPACITY: {
        name: 'FUEL TANK CENTER3 CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of center tank 1/2/3. */
    FUEL_TANK_CENTER_LEVEL: {
        name: 'FUEL TANK CENTER LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of maximum capacity of center tank 1/2/3. */
    FUEL_TANK_CENTER2_LEVEL: {
        name: 'FUEL TANK CENTER2 LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of maximum capacity of center tank 1/2/3. */
    FUEL_TANK_CENTER3_LEVEL: {
        name: 'FUEL TANK CENTER3 LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of center tank 1/2/3. */
    FUEL_TANK_CENTER_QUANTITY: {
        name: 'FUEL TANK CENTER QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of center tank 1/2/3. */
    FUEL_TANK_CENTER2_QUANTITY: {
        name: 'FUEL TANK CENTER2 QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of center tank 1/2/3. */
    FUEL_TANK_CENTER3_QUANTITY: {
        name: 'FUEL TANK CENTER3 QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of external tank 1/2. */
    FUEL_TANK_EXTERNAL1_CAPACITY: {
        name: 'FUEL TANK EXTERNAL1 CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum capacity in volume of external tank 1/2. */
    FUEL_TANK_EXTERNAL2_CAPACITY: {
        name: 'FUEL TANK EXTERNAL2 CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of texternal tank 1/2. */
    FUEL_TANK_EXTERNAL1_LEVEL: {
        name: 'FUEL TANK EXTERNAL1 LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of maximum capacity of texternal tank 1/2. */
    FUEL_TANK_EXTERNAL2_LEVEL: {
        name: 'FUEL TANK EXTERNAL2 LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of external tank 1/2. */
    FUEL_TANK_EXTERNAL1_QUANTITY: {
        name: 'FUEL TANK EXTERNAL1 QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of external tank 1/2. */
    FUEL_TANK_EXTERNAL2_QUANTITY: {
        name: 'FUEL TANK EXTERNAL2 QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the left auxiliary tank. */
    FUEL_TANK_LEFT_AUX_CAPACITY: {
        name: 'FUEL TANK LEFT AUX CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the left auxiliary tank. */
    FUEL_TANK_LEFT_AUX_LEVEL: {
        name: 'FUEL TANK LEFT AUX LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the left auxiliary tank. */
    FUEL_TANK_LEFT_AUX_QUANTITY: {
        name: 'FUEL TANK LEFT AUX QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the left main tank. */
    FUEL_TANK_LEFT_MAIN_CAPACITY: {
        name: 'FUEL TANK LEFT MAIN CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the left main tank. */
    FUEL_TANK_LEFT_MAIN_LEVEL: {
        name: 'FUEL TANK LEFT MAIN LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the left main tank. */
    FUEL_TANK_LEFT_MAIN_QUANTITY: {
        name: 'FUEL TANK LEFT MAIN QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the left tip tank. */
    FUEL_TANK_LEFT_TIP_CAPACITY: {
        name: 'FUEL TANK LEFT TIP CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the left tip tank. */
    FUEL_TANK_LEFT_TIP_LEVEL: {
        name: 'FUEL TANK LEFT TIP LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the left tip tank. */
    FUEL_TANK_LEFT_TIP_QUANTITY: {
        name: 'FUEL TANK LEFT TIP QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the right auxiliary tank. */
    FUEL_TANK_RIGHT_AUX_CAPACITY: {
        name: 'FUEL TANK RIGHT AUX CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the right auxiliary tank. */
    FUEL_TANK_RIGHT_AUX_LEVEL: {
        name: 'FUEL TANK RIGHT AUX LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the right auxiliary tank. */
    FUEL_TANK_RIGHT_AUX_QUANTITY: {
        name: 'FUEL TANK RIGHT AUX QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the right main tank. */
    FUEL_TANK_RIGHT_MAIN_CAPACITY: {
        name: 'FUEL TANK RIGHT MAIN CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the right main tank. */
    FUEL_TANK_RIGHT_MAIN_LEVEL: {
        name: 'FUEL TANK RIGHT MAIN LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the right main tank. */
    FUEL_TANK_RIGHT_MAIN_QUANTITY: {
        name: 'FUEL TANK RIGHT MAIN QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the right tip tank. */
    FUEL_TANK_RIGHT_TIP_CAPACITY: {
        name: 'FUEL TANK RIGHT TIP CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the right tip tank. */
    FUEL_TANK_RIGHT_TIP_LEVEL: {
        name: 'FUEL TANK RIGHT TIP LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the right tip tank. */
    FUEL_TANK_RIGHT_TIP_QUANTITY: {
        name: 'FUEL TANK RIGHT TIP QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Which tank the indexed selector is set to. The index is the selector to check (from 1 to 4), and the return value will be the
Fuel Tank Selection index.
          NOTE: This SimVar is only valid for the legacy [FUEL]
setup. */
    'FUEL_TANK_SELECTOR:index': {
        name: 'FUEL TANK SELECTOR:index',
        units: 'Enum',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the aircraft is in a cloud. */
    AMBIENT_IN_CLOUD: {
        name: 'AMBIENT IN CLOUD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the aircraft has met the conditions required to spawn the contrail VFX. */
    CONTRAILS_CONDITIONS_MET: {
        name: 'CONTRAILS CONDITIONS MET',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if slew is active. */
    IS_SLEW_ACTIVE: {
        name: 'IS SLEW ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if slew is enabled. */
    IS_SLEW_ALLOWED: {
        name: 'IS SLEW ALLOWED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is this the user loaded aircraft. */
    IS_USER_SIM: {
        name: 'IS USER SIM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the plane is currently on a runway. */
    ON_ANY_RUNWAY: {
        name: 'ON ANY RUNWAY',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the plane is currently parked (true) or not (false). */
    PLANE_IN_PARKING_STATE: {
        name: 'PLANE IN PARKING STATE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The state of the surface directly under the aircraft. */
    SURFACE_CONDITION: {
        name: 'SURFACE CONDITION',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True indicates that the SURFACE CONDITION return value is meaningful. */
    SURFACE_INFO_VALID: {
        name: 'SURFACE INFO VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The type of surface under the aircraft. */
    SURFACE_TYPE: {
        name: 'SURFACE TYPE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Amount of ice on aircraft structure. 100 is fully iced. */
    STRUCTURAL_ICE_PCT: {
        name: 'STRUCTURAL ICE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Title from aircraft.cfg. */
    TITLE: {
        name: 'TITLE',
        units: 'String',
        dataType: SimConnectDataType.STRING8,
        settable: false,
    },
    /** True if a towline is connected to both tow plane and glider. */
    TOW_CONNECTION: {
        name: 'TOW CONNECTION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is visual effect available on this aircraft. */
    WINDSHIELD_RAIN_EFFECT_AVAILABLE: {
        name: 'WINDSHIELD RAIN EFFECT AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Acceleration relative to aircraft X axis, in east/west direction. */
    ACCELERATION_BODY_X: {
        name: 'ACCELERATION BODY X',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to aircraft Y axis, in vertical direction. */
    ACCELERATION_BODY_Y: {
        name: 'ACCELERATION BODY Y',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to aircraft Z axis, in north/south direction. */
    ACCELERATION_BODY_Z: {
        name: 'ACCELERATION BODY Z',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to the earth X axis, in east/west direction. */
    ACCELERATION_WORLD_X: {
        name: 'ACCELERATION WORLD X',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to the earth Y axis, in vertical direction. */
    ACCELERATION_WORLD_Y: {
        name: 'ACCELERATION WORLD Y',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to the earth Z axis, in north/south direction. */
    ACCELERATION_WORLD_Z: {
        name: 'ACCELERATION WORLD Z',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The speed of the aircraft relative to the speed of the first surface directly underneath it. Use this to retrieve, for example, an aircraft's taxiing speed while it is moving on a moving carrier. It also applies to airborne aircraft, for example when a helicopter is successfully hovering above a moving ship, this value should be zero. The returned value will be the same as GROUND VELOCITY if the first surface beneath it is not moving. */
    SURFACE_RELATIVE_GROUND_SPEED: {
        name: 'SURFACE RELATIVE GROUND SPEED',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Speed relative to the earths surface.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    GROUND_VELOCITY: {
        name: 'GROUND VELOCITY',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Altitude of aircraft. */
    PLANE_ALTITUDE: {
        name: 'PLANE ALTITUDE',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude above the surface. */
    PLANE_ALT_ABOVE_GROUND: {
        name: 'PLANE ALT ABOVE GROUND',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude above the surface minus CG. */
    PLANE_ALT_ABOVE_GROUND_MINUS_CG: {
        name: 'PLANE ALT ABOVE GROUND MINUS CG',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Bank angle, although the name mentions degrees the units used are radians. */
    PLANE_BANK_DEGREES: {
        name: 'PLANE BANK DEGREES',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Heading indicator (directional gyro) indication. */
    PLANE_HEADING_DEGREES_GYRO: {
        name: 'PLANE HEADING DEGREES GYRO',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Heading relative to magnetic north - although the name mentions degrees the units used are radians. */
    PLANE_HEADING_DEGREES_MAGNETIC: {
        name: 'PLANE HEADING DEGREES MAGNETIC',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Heading relative to true north - although the name mentions degrees the units used are radians. */
    PLANE_HEADING_DEGREES_TRUE: {
        name: 'PLANE HEADING DEGREES TRUE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Latitude of aircraft, North is positive, South negative. */
    PLANE_LATITUDE: {
        name: 'PLANE LATITUDE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Longitude of aircraft, East is positive, West negative. */
    PLANE_LONGITUDE: {
        name: 'PLANE LONGITUDE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Pitch angle, although the name mentions degrees the units used are radians. */
    PLANE_PITCH_DEGREES: {
        name: 'PLANE PITCH DEGREES',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This float represents the bank of the player's plane from the last touchdown. */
    PLANE_TOUCHDOWN_BANK_DEGREES: {
        name: 'PLANE TOUCHDOWN BANK DEGREES',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the magnetic heading of the player's plane from the last touchdown. */
    PLANE_TOUCHDOWN_HEADING_DEGREES_MAGNETIC: {
        name: 'PLANE TOUCHDOWN HEADING DEGREES MAGNETIC',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the true heading of the player's plane from the last touchdown. */
    PLANE_TOUCHDOWN_HEADING_DEGREES_TRUE: {
        name: 'PLANE TOUCHDOWN HEADING DEGREES TRUE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the plane latitude for the last touchdown. */
    PLANE_TOUCHDOWN_LATITUDE: {
        name: 'PLANE TOUCHDOWN LATITUDE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the plane longitude for the last touchdown. */
    PLANE_TOUCHDOWN_LONGITUDE: {
        name: 'PLANE TOUCHDOWN LONGITUDE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the player's plane speed according to ground normal from the last touchdown. */
    PLANE_TOUCHDOWN_NORMAL_VELOCITY: {
        name: 'PLANE TOUCHDOWN NORMAL VELOCITY',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the pitch of the player's plane from the last touchdown. */
    PLANE_TOUCHDOWN_PITCH_DEGREES: {
        name: 'PLANE TOUCHDOWN PITCH DEGREES',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Lateral (X axis) speed relative to wind. */
    RELATIVE_WIND_VELOCITY_BODY_X: {
        name: 'RELATIVE WIND VELOCITY BODY X',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Vertical (Y axis) speed relative to wind. */
    RELATIVE_WIND_VELOCITY_BODY_Y: {
        name: 'RELATIVE WIND VELOCITY BODY Y',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Longitudinal (Z axis) speed relative to wind. */
    RELATIVE_WIND_VELOCITY_BODY_Z: {
        name: 'RELATIVE WIND VELOCITY BODY Z',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rotation acceleration relative to aircraft X axis. */
    ROTATION_ACCELERATION_BODY_X: {
        name: 'ROTATION ACCELERATION BODY X',
        units: 'Radians per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation acceleration relative to aircraft Y axis. */
    ROTATION_ACCELERATION_BODY_Y: {
        name: 'ROTATION ACCELERATION BODY Y',
        units: 'Radians per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation acceleration relative to aircraft Z axis. */
    ROTATION_ACCELERATION_BODY_Z: {
        name: 'ROTATION ACCELERATION BODY Z',
        units: 'Radians per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation velocity relative to aircraft X axis. */
    ROTATION_VELOCITY_BODY_X: {
        name: 'ROTATION VELOCITY BODY X',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation velocity relative to aircraft Y axis. */
    ROTATION_VELOCITY_BODY_Y: {
        name: 'ROTATION VELOCITY BODY Y',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation velocity relative to aircraft Z axis. */
    ROTATION_VELOCITY_BODY_Z: {
        name: 'ROTATION VELOCITY BODY Z',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The slope between the plane and the expected landing position of the runway. Returns 0 if no runway is assigned. */
    SLOPE_TO_ATC_RUNWAY: {
        name: 'SLOPE TO ATC RUNWAY',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True lateral speed, relative to aircraft X axis. */
    VELOCITY_BODY_X: {
        name: 'VELOCITY BODY X',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True vertical speed, relative to aircraft Y axis. */
    VELOCITY_BODY_Y: {
        name: 'VELOCITY BODY Y',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True longitudinal speed, relative to aircraft Z axis. */
    VELOCITY_BODY_Z: {
        name: 'VELOCITY BODY Z',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The current indicated vertical speed for the aircraft. */
    VERTICAL_SPEED: {
        name: 'VERTICAL SPEED',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The eyepoint position relative to the reference datum position for the aircraft. */
    EYEPOINT_POSITION: {
        name: 'EYEPOINT POSITION',
        units: 'SIMCONNECT_DATA_XYZ',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** Returns the various airspeed PID constants. This is generally only used for AI controlled aircraft and boats, although it may be useful when working with RTCs and the user aircraft. */
    STRUC_AIRSPEED_HOLD_PID_CONSTS: {
        name: 'STRUC AIRSPEED HOLD PID CONSTS',
        units: 'PID_STRUCT',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the various airspeed PID constants. This is generally only used for AI controlled aircraft and boats, although it may be useful when working with RTCs and the user aircraft. */
    STRUC_HEADING_HOLD_PID_CONSTS: {
        name: 'STRUC HEADING HOLD PID CONSTS',
        units: 'PID_STRUCT',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The body rotation acceleration. */
    STRUCT_BODY_ROTATION_ACCELERATION: {
        name: 'STRUCT BODY ROTATION ACCELERATION',
        units: 'SIMCONNECT_DATA_XYZ',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** The body rotation velocity. */
    STRUCT_BODY_ROTATION_VELOCITY: {
        name: 'STRUCT BODY ROTATION VELOCITY',
        units: 'SIMCONNECT_DATA_XYZ',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** The object body velocity. */
    STRUCT_BODY_VELOCITY: {
        name: 'STRUCT BODY VELOCITY',
        units: 'SIMCONNECT_DATA_XYZ',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** The position of the indexed engine relative to the Datum Reference Point for the aircraft. */
    'STRUCT_ENGINE_POSITION:index': {
        name: 'STRUCT ENGINE POSITION:index',
        units: 'SIMCONNECT_DATA_XYZ',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** The angle of the eyepoint view. Zero, zero, zero is straight ahead. */
    STRUCT_EYEPOINT_DYNAMIC_ANGLE: {
        name: 'STRUCT EYEPOINT DYNAMIC ANGLE',
        units: 'SIMCONNECT_DATA_XYZ',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** A variable offset away from the EYEPOINT POSITION. */
    STRUCT_EYEPOINT_DYNAMIC_OFFSET: {
        name: 'STRUCT EYEPOINT DYNAMIC OFFSET',
        units: 'SIMCONNECT_DATA_XYZ',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** Returns the latitude, longitude and altitude of the user aircraft. */
    STRUCT_LATLONALT: {
        name: 'STRUCT LATLONALT',
        units: 'SIMCONNECT_DATA_LATLONALT',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** Returns the lattitude, longitude, altitude, pitch, bank and heading of the user aircraft. */
    STRUCT_LATLONALTPBH: {
        name: 'STRUCT LATLONALTPBH',
        units: 'Returns a struct with 6 values: lat, lon, alt, pitch, bank, heading',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in aircraft lateral (X) axis. */
    AIRCRAFT_WIND_X: {
        name: 'AIRCRAFT WIND X',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in aircraft vertical (Y) axis. */
    AIRCRAFT_WIND_Y: {
        name: 'AIRCRAFT WIND Y',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Wind component in aircraft longitudinal (Z) axis. */
    AIRCRAFT_WIND_Z: {
        name: 'AIRCRAFT WIND Z',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Redline airspeed (dynamic on some aircraft). */
    AIRSPEED_BARBER_POLE: {
        name: 'AIRSPEED BARBER POLE',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Indicated airspeed. */
    AIRSPEED_INDICATED: {
        name: 'AIRSPEED INDICATED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current mach. */
    AIRSPEED_MACH: {
        name: 'AIRSPEED MACH',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The airspeed, whether true or indicated airspeed has been selected. */
    AIRSPEED_SELECT_INDICATED_OR_TRUE: {
        name: 'AIRSPEED SELECT INDICATED OR TRUE',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True airspeed. */
    AIRSPEED_TRUE: {
        name: 'AIRSPEED TRUE',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Equivalent to AIRSPEED TRUE, but does not account for wind when used to Set Airspeed value */
    AIRSPEED_TRUE_RAW: {
        name: 'AIRSPEED TRUE RAW',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Mach associated with maximum airspeed. */
    BARBER_POLE_MACH: {
        name: 'BARBER POLE MACH',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Velocity regardless of direction. For example, if a helicopter is ascending vertically at 100 fps, getting this variable will return 100. */
    TOTAL_VELOCITY: {
        name: 'TOTAL VELOCITY',
        units: 'Feet (ft per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Longitudinal speed of wind on the windshield. */
    WINDSHIELD_WIND_VELOCITY: {
        name: 'WINDSHIELD WIND VELOCITY',
        units: 'Feet (ft per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Outside temperature on the standard ATM scale. */
    STANDARD_ATM_TEMPERATURE: {
        name: 'STANDARD ATM TEMPERATURE',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total air temperature is the air temperature at the front of the aircraft where the ram pressure from the speed of the aircraft is taken into account. */
    TOTAL_AIR_TEMPERATURE: {
        name: 'TOTAL AIR TEMPERATURE',
        units: 'Celsius',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** ADF frequency. Index of 1 or 2. */
    'ADF_ACTIVE_FREQUENCY:index': {
        name: 'ADF ACTIVE FREQUENCY:index',
        units: 'Frequency ADF BCD32',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if ADF is available */
    'ADF_AVAILABLE:index': {
        name: 'ADF AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** ADF compass rose setting */
    ADF_CARD: {
        name: 'ADF CARD',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, use ADF ACTIVE FREQUENCY */
    ADF_EXT_FREQUENCY: {
        name: 'ADF EXT FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, use ADF ACTIVE FREQUENCY */
    ADF_FREQUENCY: {
        name: 'ADF FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** ICAO code */
    ADF_IDENT: {
        name: 'ADF IDENT',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Returns the latitude, longitude and altitude of the station the radio equipment is currently tuned to, or zeros if the radio is not tuned to any ADF station. Index of 1 or 2 for ADF 1 and ADF 2. */
    'ADF_LATLONALT:index': {
        name: 'ADF LATLONALT:index',
        units: 'SIMCONNECT_DATA_LATLONALT',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** Descriptive name */
    'ADF_NAME:index': {
        name: 'ADF NAME:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Current direction from NDB station */
    'ADF_RADIAL:index': {
        name: 'ADF RADIAL:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the magnetic bearing to the currently tuned ADF transmitter. */
    'ADF_RADIAL_MAG:index': {
        name: 'ADF RADIAL MAG:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Signal strength */
    'ADF_SIGNAL:index': {
        name: 'ADF SIGNAL:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** ADF audio flag. Index of 0 or 1. */
    'ADF_SOUND:index': {
        name: 'ADF SOUND:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if ADF Standby is available */
    'ADF_STANDBY_AVAILABLE:index': {
        name: 'ADF STANDBY AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** ADF standby frequency */
    'ADF_STANDBY_FREQUENCY:index': {
        name: 'ADF STANDBY FREQUENCY:index',
        units: 'Hz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the volume of the ADF */
    ADF_VOLUME: {
        name: 'ADF VOLUME',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The name of the Airline used by ATC, as a string with a maximum length of 50 characters. */
    ATC_AIRLINE: {
        name: 'ATC AIRLINE',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** If the airport is controlled, this boolean is true. */
    ATC_AIRPORT_IS_TOWERED: {
        name: 'ATC AIRPORT IS TOWERED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether or not the user has filed an IFR flightplan that has been cleared by the sim ATC */
    ATC_CLEARED_IFR: {
        name: 'ATC CLEARED IFR',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether the ATC has cleared the plane for landing. */
    ATC_CLEARED_LANDING: {
        name: 'ATC CLEARED LANDING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether the ATC has cleared the plane for takeoff. */
    ATC_CLEARED_TAKEOFF: {
        name: 'ATC CLEARED TAKEOFF',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether the ATC has cleared the plane for taxi. */
    ATC_CLEARED_TAXI: {
        name: 'ATC CLEARED TAXI',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the target altitude for the current ATC flightplan waypoint. */
    ATC_CURRENT_WAYPOINT_ALTITUDE: {
        name: 'ATC CURRENT WAYPOINT ALTITUDE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flight Number used by ATC, as a string with a maximum number of 6 characters. */
    ATC_FLIGHT_NUMBER: {
        name: 'ATC FLIGHT NUMBER',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** Altitude between the position of the aircraft and his closest waypoints in the flightplan. */
    ATC_FLIGHTPLAN_DIFF_ALT: {
        name: 'ATC FLIGHTPLAN DIFF ALT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the lateral distance the user's plane is from the ATC flight plan track. */
    ATC_FLIGHTPLAN_DIFF_DISTANCE: {
        name: 'ATC FLIGHTPLAN DIFF DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Heading between the position of the aircraft and his closest waypoints in the flightplan. */
    ATC_FLIGHTPLAN_DIFF_HEADING: {
        name: 'ATC FLIGHTPLAN DIFF HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Is this aircraft recognized by ATC as heavy. */
    ATC_HEAVY: {
        name: 'ATC HEAVY',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** ID used by ATC, as a string with a maximum number of 10 characters. */
    ATC_ID: {
        name: 'ATC ID',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** Returns true if the user has a valid IFR flight plan they can as for clearance for with ATC at the airport they are currently at. */
    ATC_IFR_FP_TO_REQUEST: {
        name: 'ATC IFR FP TO REQUEST',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Model used by ATC, as a string with a maximum number of 10 characters. */
    ATC_MODEL: {
        name: 'ATC MODEL',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Is ATC aircraft on parking spot. */
    ATC_ON_PARKING_SPOT: {
        name: 'ATC ON PARKING SPOT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the target altitude for the previous ATC flightplan waypoint. */
    ATC_PREVIOUS_WAYPOINT_ALTITUDE: {
        name: 'ATC PREVIOUS WAYPOINT ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The name of the airport of the runway assigned by the ATC. Returns "" if no runway is assigned. */
    ATC_RUNWAY_AIRPORT_NAME: {
        name: 'ATC RUNWAY AIRPORT NAME',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** This float represents the distance between the player's plane and the center of the runway selected by the ATC. */
    ATC_RUNWAY_DISTANCE: {
        name: 'ATC RUNWAY DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a float corresponding to the horizontal distance between the player's plane and the end of the runway selected by the ATC. */
    ATC_RUNWAY_END_DISTANCE: {
        name: 'ATC RUNWAY END DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the true heading of the runway selected by the ATC. */
    ATC_RUNWAY_HEADING_DEGREES_TRUE: {
        name: 'ATC RUNWAY HEADING DEGREES TRUE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The length of the runway assigned by the ATC. Returns -1 if no runway is assigned. */
    ATC_RUNWAY_LENGTH: {
        name: 'ATC RUNWAY LENGTH',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a float corresponding to the player's main gear relative X (transverse) position on the runway selected by the ATC. */
    ATC_RUNWAY_RELATIVE_POSITION_X: {
        name: 'ATC RUNWAY RELATIVE POSITION X',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a float corresponding to the player's main gear relative Y (height) position on the runway selected by the ATC. */
    ATC_RUNWAY_RELATIVE_POSITION_Y: {
        name: 'ATC RUNWAY RELATIVE POSITION Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a float corresponding to the player's main gear relative Z (longitudinal) position on the runway selected by the ATC. */
    ATC_RUNWAY_RELATIVE_POSITION_Z: {
        name: 'ATC RUNWAY RELATIVE POSITION Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a boolean corresponding to whether or not the ATC has pre-selected a runway for the player's plane. If this is false, every other ATC RUNWAY
*
SimVar will return default values. */
    ATC_RUNWAY_SELECTED: {
        name: 'ATC RUNWAY SELECTED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is a float corresponding to the horizontal distance between the player's plane and the start of the runway selected by the ATC. */
    ATC_RUNWAY_START_DISTANCE: {
        name: 'ATC RUNWAY START DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the player's main gear relative X (transverse) position according to the aiming point of the runway selected by the ATC. */
    ATC_RUNWAY_TDPOINT_RELATIVE_POSITION_X: {
        name: 'ATC RUNWAY TDPOINT RELATIVE POSITION X',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the player's main gear relative Y (height) position according to the aiming point of the runway selected by the ATC. */
    ATC_RUNWAY_TDPOINT_RELATIVE_POSITION_Y: {
        name: 'ATC RUNWAY TDPOINT RELATIVE POSITION Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the player's main relative Z (longitudinal) position according to the aiming point of the runway selected by the ATC. */
    ATC_RUNWAY_TDPOINT_RELATIVE_POSITION_Z: {
        name: 'ATC RUNWAY TDPOINT RELATIVE POSITION Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The width of the runway assigned by the ATC. Returns -1 if no runway is assigned. */
    ATC_RUNWAY_WIDTH: {
        name: 'ATC RUNWAY WIDTH',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Suggested minimum runway length for landing. Used by ATC. */
    ATC_SUGGESTED_MIN_RWY_LANDING: {
        name: 'ATC SUGGESTED MIN RWY LANDING',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Suggested minimum runway length for takeoff. Used by ATC. */
    ATC_SUGGESTED_MIN_RWY_TAKEOFF: {
        name: 'ATC SUGGESTED MIN RWY TAKEOFF',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the lateral distance the user's plane is from the path of the currently issued ATC taxi instructions. */
    ATC_TAXIPATH_DISTANCE: {
        name: 'ATC TAXIPATH DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Type used by ATC. */
    ATC_TYPE: {
        name: 'ATC TYPE',
        units: 'String (30)',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The stored COM 1/2/3 frequency value. */
    COM1_STORED_FREQUENCY: {
        name: 'COM1 STORED FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The stored COM 1/2/3 frequency value. */
    COM2_STORED_FREQUENCY: {
        name: 'COM2 STORED FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The stored COM 1/2/3 frequency value. */
    COM3_STORED_FREQUENCY: {
        name: 'COM3 STORED FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Gives the bearing (in degrees) of the active COM station (airport) or a value less than 0 if the station does not belong to an airport. Index is 1, 2 or 3. */
    'COM_ACTIVE_BEARING:index': {
        name: 'COM ACTIVE BEARING:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Gives the distance (in meters) to the active COM station (airport) or a value less than -180° if the station does not belong to an airport. Index is 1, 2 or 3. */
    'COM_ACTIVE_DISTANCE:index': {
        name: 'COM ACTIVE DISTANCE:index',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Com frequency. Index is 1, 2 or 3. */
    'COM_ACTIVE_FREQUENCY:index': {
        name: 'COM ACTIVE FREQUENCY:index',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The identity of the station that is tuned on the indexed active COM radio. Index is 1, 2, or 3. */
    'COM_ACTIVE_FREQ_IDENT:index': {
        name: 'COM ACTIVE FREQ IDENT:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The type of COM frequency for the active indexed COM system. Index is 1, 2, or 3. */
    'COM_ACTIVE_FREQ_TYPE:index': {
        name: 'COM ACTIVE FREQ TYPE:index',
        units: 'String:',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** This will return the latitude, longitude and altitude corresponding to the indexed COM station associated with the active COM frequency. If the station is not associated with an airport, then the lat/lon/alt values returned will be -15943°, 80°, -10000 (this means that you can simply check that the altitude value is greater than 0 to assure the validity of the returned struct).
          Index is 1, 2 or 3. */
    'COM_ACTIVE_LATLONALT:index': {
        name: 'COM ACTIVE LATLONALT:index',
        units: 'Struct:',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** True if COM1, COM2 or COM3 is available (depending on the index, either 1, 2, or 3) */
    'COM_AVAILABLE:index': {
        name: 'COM AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Not currently used in the simulation. */
    'COM_LATLONALT:index': {
        name: 'COM LATLONALT:index',
        units: 'Struct:',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** Whether or not the plane is receiving on the indexed com channel or not (either 1, 2, or 3 for the index). */
    'COM_RECEIVE:index': {
        name: 'COM RECEIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Toggles all COM radios to receive on */
    COM_RECEIVE_ALL: {
        name: 'COM RECEIVE ALL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the plane is receiving on the indexed com channel. Index is 1, 2 or 3. */
    'COM_RECEIVE_EX1:index': {
        name: 'COM RECEIVE EX1:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The COM radio frequency step. Index is 1, 2 or 3. */
    'COM_SPACING_MODE:index': {
        name: 'COM SPACING MODE:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Com standby frequency. Index is 1, 2 or 3. */
    'COM_STANDBY_FREQUENCY:index': {
        name: 'COM STANDBY FREQUENCY:index',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The identity of the station that is tuned on the indexed standby COM radio. Index is 1, 2, or 3. */
    'COM_STANDBY_FREQ_IDENT:index': {
        name: 'COM STANDBY FREQ IDENT:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The type of COM frequency for the standby indexed COM system. Index is 1, 2, or 3. */
    'COM_STANDBY_FREQ_TYPE:index': {
        name: 'COM STANDBY FREQ TYPE:index',
        units: 'String:',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Radio status flag for the indexed com channel. Index is 1, 2 or 3. */
    'COM_STATUS:index': {
        name: 'COM STATUS:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Enter an index of 1, 2 or 3. Will return TRUE if the COM system is working, FALSE otherwise. */
    'COM_TEST:index': {
        name: 'COM TEST:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Audio panel com transmit state. Index of 1, 2 or 3. */
    'COM_TRANSMIT:index': {
        name: 'COM TRANSMIT:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The volume of the COM Radio. */
    COM_VOLUME: {
        name: 'COM VOLUME',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether the FLARM is available (TRUE, 1) or not (FALSE, 0). */
    FLARM_AVAILABLE: {
        name: 'FLARM AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The bearing of the FLARM threat aircraft, relative to track. */
    FLARM_THREAT_BEARING: {
        name: 'FLARM THREAT BEARING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The FLARM threat aircraft data structure, which contains data about the perceived threat, returned as a struct. Struct member variables are as follows:
          
            id
(U62): the network id of the intruding plane so that they are remembered in order to compute their trajectory.
            bearing
(FLOAT64): The threat bearing, in degrees (this is bearing from track axis and not bearing from the airplane axis).
            heading
(FLOAT64): The threat heading.
            distance
(FLOAT64):
The distance between the aircraft and the threat, in meters.
            verticalBearing
(FLOAT64):
The vertical bearing between the aircraft and the threat, in degrees.
            relativeAltitude
(FLOAT64):
The relative altitude of the threat to the aircraft, in meters.
            timeToCollision
(FLOAT64):
The estimated time to a collision, in seconds. */
    FLARM_THREAT_DATA: {
        name: 'FLARM THREAT DATA',
        units: 'Struct',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The distance to the FLARM threat object. */
    FLARM_THREAT_DISTANCE: {
        name: 'FLARM THREAT DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The heading to the FLARM threat object. */
    FLARM_THREAT_HEADING: {
        name: 'FLARM THREAT HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The relative altitude of the threat object. */
    FLARM_THREAT_RELATIVE_ALTITUDE: {
        name: 'FLARM THREAT RELATIVE ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The estimated time to a collision. */
    FLARM_THREAT_TIME_TO_COLLISION: {
        name: 'FLARM THREAT TIME TO COLLISION',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The vertical bearing towards the threat. */
    FLARM_THREAT_VERTICAL_BEARING: {
        name: 'FLARM THREAT VERTICAL BEARING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** ID of airport. */
    GPS_APPROACH_AIRPORT_ID: {
        name: 'GPS APPROACH AIRPORT ID',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** ID of approach. */
    GPS_APPROACH_APPROACH_ID: {
        name: 'GPS APPROACH APPROACH ID',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Index of approach for given airport. */
    GPS_APPROACH_APPROACH_INDEX: {
        name: 'GPS APPROACH APPROACH INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Approach type. */
    GPS_APPROACH_APPROACH_TYPE: {
        name: 'GPS APPROACH APPROACH TYPE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is approach transition final approach segment. */
    GPS_APPROACH_IS_FINAL: {
        name: 'GPS APPROACH IS FINAL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is approach segment missed approach segment. */
    GPS_APPROACH_IS_MISSED: {
        name: 'GPS APPROACH IS MISSED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Waypoint is the runway. */
    GPS_APPROACH_IS_WP_RUNWAY: {
        name: 'GPS APPROACH IS WP RUNWAY',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sub mode within approach mode. */
    GPS_APPROACH_MODE: {
        name: 'GPS APPROACH MODE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Segment type within approach. */
    GPS_APPROACH_SEGMENT_TYPE: {
        name: 'GPS APPROACH SEGMENT TYPE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Deviation of local time from GMT. */
    GPS_APPROACH_TIMEZONE_DEVIATION: {
        name: 'GPS APPROACH TIMEZONE DEVIATION',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** ID of approach transition. */
    GPS_APPROACH_TRANSITION_ID: {
        name: 'GPS APPROACH TRANSITION ID',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Index of approach transition. */
    GPS_APPROACH_TRANSITION_INDEX: {
        name: 'GPS APPROACH TRANSITION INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Number of waypoints. */
    GPS_APPROACH_WP_COUNT: {
        name: 'GPS APPROACH WP COUNT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Index of current waypoint. */
    GPS_APPROACH_WP_INDEX: {
        name: 'GPS APPROACH WP INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Waypoint type within approach mode. */
    GPS_APPROACH_WP_TYPE: {
        name: 'GPS APPROACH WP TYPE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The course deviation of the needle for a CDI instrument. The SimVar displays the deviation from -127 to +127. It returns a value if a flight plan is set (otherwise it will return 0) even if the autopilot isn't on GPS mode. Scaling can also be set through the GPS CDI SCALING simvar. */
    GPS_CDI_NEEDLE: {
        name: 'GPS CDI NEEDLE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The full scale deflection of the CDI due to GPS cross-track error, in meters. */
    GPS_CDI_SCALING: {
        name: 'GPS CDI SCALING',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Suggested heading to steer (for autopilot). */
    GPS_COURSE_TO_STEER: {
        name: 'GPS COURSE TO STEER',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** GPS is driving Nav 1 indicator. Note this setting will also affect the SimVars HSI_STATION_IDENT and HSI_BEARING. */
    GPS_DRIVES_NAV1: {
        name: 'GPS DRIVES NAV1',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Estimated time of arrival at destination. */
    GPS_ETA: {
        name: 'GPS ETA',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Estimated time en route to destination. */
    GPS_ETE: {
        name: 'GPS ETE',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is the complete flightplan length from start to end. Essentially the cumulative length of all the flight plan legs added together. */
    GPS_FLIGHTPLAN_TOTAL_DISTANCE: {
        name: 'GPS FLIGHTPLAN TOTAL DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Number of waypoints. */
    GPS_FLIGHT_PLAN_WP_COUNT: {
        name: 'GPS FLIGHT PLAN WP COUNT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Index of waypoint. */
    GPS_FLIGHT_PLAN_WP_INDEX: {
        name: 'GPS FLIGHT PLAN WP INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current magnetic ground track. */
    GPS_GROUND_MAGNETIC_TRACK: {
        name: 'GPS GROUND MAGNETIC TRACK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current ground speed. */
    GPS_GROUND_SPEED: {
        name: 'GPS GROUND SPEED',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current true heading. */
    GPS_GROUND_TRUE_HEADING: {
        name: 'GPS GROUND TRUE HEADING',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current true ground track. */
    GPS_GROUND_TRUE_TRACK: {
        name: 'GPS GROUND TRUE TRACK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The full scale deflection of the vertical GSI due to GPS glidepath deviation, in meters. */
    GPS_GSI_SCALING: {
        name: 'GPS GSI SCALING',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the GPS system has a presently available glidepath for guidance. Only applicable with GPS_OVERRIDDEN. When true and in GPS OVERRIDDEN, HSI_GSI_NEEDLE_VALID will also be true. */
    GPS_HAS_GLIDEPATH: {
        name: 'GPS HAS GLIDEPATH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The glide deviation of the needle for a CDI instrument. The simvar displays the deviation from -127 to +127. It returns a value if a flight plan is set (otherwise it will return 0) even if the autopilot isn't on GPS mode. Scaling can also be set through the GPS CDI SCALING simvar. */
    GPS_HSI_NEEDLE: {
        name: 'GPS HSI NEEDLE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Flight plan mode active. */
    GPS_IS_ACTIVE_FLIGHT_PLAN: {
        name: 'GPS IS ACTIVE FLIGHT PLAN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Waypoint mode active. */
    GPS_IS_ACTIVE_WAY_POINT: {
        name: 'GPS IS ACTIVE WAY POINT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is switching to next waypoint locked. */
    GPS_IS_ACTIVE_WP_LOCKED: {
        name: 'GPS IS ACTIVE WP LOCKED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is approach mode active. */
    GPS_IS_APPROACH_ACTIVE: {
        name: 'GPS IS APPROACH ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is approach loaded. */
    GPS_IS_APPROACH_LOADED: {
        name: 'GPS IS APPROACH LOADED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is flight plan destination reached. */
    GPS_IS_ARRIVED: {
        name: 'GPS IS ARRIVED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is Direct To Waypoint mode active. */
    GPS_IS_DIRECTTO_FLIGHTPLAN: {
        name: 'GPS IS DIRECTTO FLIGHTPLAN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Current GPS magnetic variation. */
    GPS_MAGVAR: {
        name: 'GPS MAGVAR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the OBS mode is currently active (disable the automatic sequencing of waypoints in GPS flight plan). */
    GPS_OBS_ACTIVE: {
        name: 'GPS OBS ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This is the currently selected OBS course in degrees, from 0 to 360. */
    GPS_OBS_VALUE: {
        name: 'GPS OBS VALUE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** When it is active, all sim GPS system updates are suspended. This must be set to TRUE to be able to correctly set to any other GPS SimVar. */
    GPS_OVERRIDDEN: {
        name: 'GPS OVERRIDDEN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Current GPS altitude. */
    GPS_POSITION_ALT: {
        name: 'GPS POSITION ALT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current GPS latitude. */
    GPS_POSITION_LAT: {
        name: 'GPS POSITION LAT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current GPS longitude. */
    GPS_POSITION_LON: {
        name: 'GPS POSITION LON',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude of GPS target. */
    GPS_TARGET_ALTITUDE: {
        name: 'GPS TARGET ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Distance to target. */
    GPS_TARGET_DISTANCE: {
        name: 'GPS TARGET DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Glidepath in degrees. */
    GPS_VERTICAL_ANGLE: {
        name: 'GPS VERTICAL ANGLE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Vertical error in degrees from GlidePath. */
    GPS_VERTICAL_ANGLE_ERROR: {
        name: 'GPS VERTICAL ANGLE ERROR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Vertical deviation in meters from GlidePath. */
    GPS_VERTICAL_ERROR: {
        name: 'GPS VERTICAL ERROR',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Magnetic bearing to waypoint. */
    GPS_WP_BEARING: {
        name: 'GPS WP BEARING',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Cross track distance. */
    GPS_WP_CROSS_TRK: {
        name: 'GPS WP CROSS TRK',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The required heading (magnetic) from the previous waypoint to the next waypoint. */
    GPS_WP_DESIRED_TRACK: {
        name: 'GPS WP DESIRED TRACK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Distance to waypoint. */
    GPS_WP_DISTANCE: {
        name: 'GPS WP DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Estimated time of arrival at waypoint. */
    GPS_WP_ETA: {
        name: 'GPS WP ETA',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Estimated time en route to waypoint. */
    GPS_WP_ETE: {
        name: 'GPS WP ETE',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude of next waypoint. */
    GPS_WP_NEXT_ALT: {
        name: 'GPS WP NEXT ALT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** ID of next GPS waypoint. */
    GPS_WP_NEXT_ID: {
        name: 'GPS WP NEXT ID',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** Latitude of next waypoint. */
    GPS_WP_NEXT_LAT: {
        name: 'GPS WP NEXT LAT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Longitude of next waypoint. */
    GPS_WP_NEXT_LON: {
        name: 'GPS WP NEXT LON',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude of previous waypoint. */
    GPS_WP_PREV_ALT: {
        name: 'GPS WP PREV ALT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** ID of previous GPS waypoint. */
    GPS_WP_PREV_ID: {
        name: 'GPS WP PREV ID',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** Latitude of previous waypoint. */
    GPS_WP_PREV_LAT: {
        name: 'GPS WP PREV LAT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Longitude of previous waypoint. */
    GPS_WP_PREV_LON: {
        name: 'GPS WP PREV LON',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Is previous waypoint valid (i.e. current waypoint is not the first waypoint). */
    GPS_WP_PREV_VALID: {
        name: 'GPS WP PREV VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Tracking angle error to waypoint. */
    GPS_WP_TRACK_ANGLE_ERROR: {
        name: 'GPS WP TRACK ANGLE ERROR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True bearing to waypoint. */
    GPS_WP_TRUE_BEARING: {
        name: 'GPS WP TRUE BEARING',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Required true heading to waypoint. */
    GPS_WP_TRUE_REQ_HDG: {
        name: 'GPS WP TRUE REQ HDG',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Vertical speed to waypoint. */
    GPS_WP_VERTICAL_SPEED: {
        name: 'GPS WP VERTICAL SPEED',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** If the GPS_DRIVES_NAV1 variable is true and the HSI BEARING VALID variable is true, this variable contains the HSI needle bearing. If the GPS DRIVES NAV1 variable is false and the HSI BEARING VALID variable is true, this variable contains the ADF1 frequency. */
    HSI_BEARING: {
        name: 'HSI BEARING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This will return true if the HSI BEARING variable contains valid data. */
    HSI_BEARING_VALID: {
        name: 'HSI BEARING VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Needle deflection (+/- 127). */
    HSI_CDI_NEEDLE: {
        name: 'HSI CDI NEEDLE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Signal valid. */
    HSI_CDI_NEEDLE_VALID: {
        name: 'HSI CDI NEEDLE VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** DME/GPS distance. */
    HSI_DISTANCE: {
        name: 'HSI DISTANCE',
        units: 'Nautical miles',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Needle deflection (+/- 119). */
    HSI_GSI_NEEDLE: {
        name: 'HSI GSI NEEDLE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Signal valid. */
    HSI_GSI_NEEDLE_VALID: {
        name: 'HSI GSI NEEDLE VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Station is a localizer. */
    HSI_HAS_LOCALIZER: {
        name: 'HSI HAS LOCALIZER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** DME/GPS speed. */
    HSI_SPEED: {
        name: 'HSI SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the ident of the the next GPS waypoint, if GPS_DRIVES_NAV1 is true. If GPS DRIVES NAV1 is false, it returns the identity of the station that is tuned on nav radio 1. */
    HSI_STATION_IDENT: {
        name: 'HSI STATION IDENT',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Nav TO/FROM flag. */
    HSI_TF_FLAGS: {
        name: 'HSI TF FLAGS',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Inner marker state. */
    INNER_MARKER: {
        name: 'INNER MARKER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns the latitude, longitude and altitude of the inner marker of an approach to a runway, if the aircraft is within the required proximity, otherwise it will return zeros. */
    INNER_MARKER_LATLONALT: {
        name: 'INNER MARKER LATLONALT',
        units: 'SIMCONNECT_DATA_LATLONALT',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** True if Marker is available. */
    MARKER_AVAILABLE: {
        name: 'MARKER AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the Marker Beacon is in High Sensitivity mode. */
    MARKER_BEACON_SENSITIVITY_HIGH: {
        name: 'MARKER BEACON SENSITIVITY HIGH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Marker beacon state. */
    MARKER_BEACON_STATE: {
        name: 'MARKER BEACON STATE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Whether or not the Marker Beacon is in Test/Mute mode. */
    MARKER_BEACON_TEST_MUTE: {
        name: 'MARKER BEACON TEST MUTE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Marker audio flag. */
    MARKER_SOUND: {
        name: 'MARKER SOUND',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Middle marker state. */
    MIDDLE_MARKER: {
        name: 'MIDDLE MARKER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns the latitude, longitude and altitude of the middle marker. */
    MIDDLE_MARKER_LATLONALT: {
        name: 'MIDDLE MARKER LATLONALT',
        units: 'SIMCONNECT_DATA_LATLONALT',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** Outer marker state. */
    OUTER_MARKER: {
        name: 'OUTER MARKER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns the latitude, longitude and altitude of the outer marker. */
    OUTER_MARKER_LATLONALT: {
        name: 'OUTER MARKER LATLONALT',
        units: 'SIMCONNECT_DATA_LATLONALT',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** Nav active frequency. Index is 1 or 2. */
    'NAV_ACTIVE_FREQUENCY:index': {
        name: 'NAV ACTIVE FREQUENCY:index',
        units: 'MHz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Flag if Nav equipped on aircraft. */
    'NAV_AVAILABLE:index': {
        name: 'NAV AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the listed bit flags. */
    'NAV_BACK_COURSE_FLAGS:index': {
        name: 'NAV BACK COURSE FLAGS:index',
        units: 'Flags:',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** CDI needle deflection (+/- 127). */
    'NAV_CDI:index': {
        name: 'NAV CDI:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Closest DME distance. Requires an index value from 1 to 4 to set which NAV to target.
          Note that this SimVar will only work if the NAV1_CLOSE_FREQ_SET key event has been set to 1 (TRUE). */
    'NAV_CLOSE_DME:index': {
        name: 'NAV CLOSE DME:index',
        units: 'Nautical miles',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Closest Localizer course frequency. Requires an index value from 1 to 4 to set which NAV to target.
          Note that this SimVar will only work if the NAV1_CLOSE_FREQ_SET key event has been set to 1 (TRUE). */
    'NAV_CLOSE_FREQUENCY:index': {
        name: 'NAV CLOSE FREQUENCY:index',
        units: 'Hz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** ICAO code. Requires an index value from 1 to 4 to set which NAV to target.
          Note that this SimVar will only work if the NAV1_CLOSE_FREQ_SET key event has been set to 1 (TRUE). */
    'NAV_CLOSE_IDENT:index': {
        name: 'NAV CLOSE IDENT:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Closest Localizer course heading. Requires an index value from 1 to 4 to set which NAV to target.
          Note that this SimVar will only work if the NAV1_CLOSE_FREQ_SET key event has been set to 1 (TRUE). */
    'NAV_CLOSE_LOCALIZER:index': {
        name: 'NAV CLOSE LOCALIZER:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Descriptive name. Requires an index value from 1 to 4 to set which NAV to target.
          Note that this SimVar will only work if the NAV1_CLOSE_FREQ_SET key event has been set to 1 (TRUE). */
    'NAV_CLOSE_NAME:index': {
        name: 'NAV CLOSE NAME:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Returns bit flags with the listed meaning. */
    NAV_CODES: {
        name: 'NAV CODES',
        units: 'Flags:',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** DME distance. */
    NAV_DME: {
        name: 'NAV DME',
        units: 'Nautical miles',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** DME speed. */
    NAV_DMESPEED: {
        name: 'NAV DMESPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the DME station. */
    'NAV_DME_LATLONALT:index': {
        name: 'NAV DME LATLONALT:index',
        units: 'SIMCONNECT_DATA_LATLONALT structure',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** Localizer course frequency */
    NAV_FREQUENCY: {
        name: 'NAV FREQUENCY',
        units: 'Hz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The glide slope gradient. The value returned is an integer value formed as follows:
          sin(slope) * 65536 * 2
          So, for example, a glide slope of 2.7º would return a value of 6174. TO get the value in degrees, then use
NAV_RAW_GLIDE_SLOPE instead. */
    NAV_GLIDE_SLOPE: {
        name: 'NAV GLIDE SLOPE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Difference between current position and glideslope angle. Note that this provides 32 bit floating point precision, rather than the 8 bit integer precision of NAV GSI. */
    NAV_GLIDE_SLOPE_ERROR: {
        name: 'NAV GLIDE SLOPE ERROR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The distance between the plane and the Glide beacon. */
    NAV_GLIDE_SLOPE_LENGTH: {
        name: 'NAV GLIDE SLOPE LENGTH',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Glideslope needle deflection (+/- 119). Note that this provides only 8 bit precision, whereas NAV GLIDE SLOPE ERROR provides 32 bit floating point precision. */
    NAV_GSI: {
        name: 'NAV GSI',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Glideslope flag. */
    NAV_GS_FLAG: {
        name: 'NAV GS FLAG',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the glide slope. */
    'NAV_GS_LATLONALT:index': {
        name: 'NAV GS LATLONALT:index',
        units: 'SIMCONNECT_DATA_LATLONALT structure',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** Nav GS latitude, longitude, altitude. */
    NAV_GS_LLAF64: {
        name: 'NAV GS LLAF64',
        units: 'SIMCONNECT_DATA_LATLONALT structure',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** Flag if found a close station with a DME. */
    NAV_HAS_CLOSE_DME: {
        name: 'NAV HAS CLOSE DME',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if found a close localizer station. */
    NAV_HAS_CLOSE_LOCALIZER: {
        name: 'NAV HAS CLOSE LOCALIZER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if tuned station has a DME. */
    NAV_HAS_DME: {
        name: 'NAV HAS DME',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if tuned station has a glideslope. */
    NAV_HAS_GLIDE_SLOPE: {
        name: 'NAV HAS GLIDE SLOPE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if tuned station is a localizer. */
    NAV_HAS_LOCALIZER: {
        name: 'NAV HAS LOCALIZER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if Nav has signal. */
    NAV_HAS_NAV: {
        name: 'NAV HAS NAV',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if Nav has a Tacan. */
    NAV_HAS_TACAN: {
        name: 'NAV HAS TACAN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** ICAO code. */
    NAV_IDENT: {
        name: 'NAV IDENT',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Localizer course heading. */
    NAV_LOCALIZER: {
        name: 'NAV LOCALIZER',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The airport ICAO ident for the localizer that is currently tuned on the nav radio (like 'EGLL' or 'KJFK') */
    NAV_LOC_AIRPORT_IDENT: {
        name: 'NAV LOC AIRPORT IDENT',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The letter code for the runway that the currently tuned localizer is tuned to. */
    NAV_LOC_RUNWAY_DESIGNATOR: {
        name: 'NAV LOC RUNWAY DESIGNATOR',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** NAV LOC RUNWAY NUMBER - The number portion of the runway that the currently tuned localizer is tuned to (so if the runway was 15L, this would be 15). */
    NAV_LOC_RUNWAY_NUMBER: {
        name: 'NAV LOC RUNWAY NUMBER',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Magnetic variation of tuned Nav station. */
    NAV_MAGVAR: {
        name: 'NAV MAGVAR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Descriptive name. */
    NAV_NAME: {
        name: 'NAV NAME',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** OBS setting. Index of 1 or 2. */
    NAV_OBS: {
        name: 'NAV OBS',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Radial that aircraft is on. */
    NAV_RADIAL: {
        name: 'NAV RADIAL',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Difference between current radial and OBS tuned radial. */
    NAV_RADIAL_ERROR: {
        name: 'NAV RADIAL ERROR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The glide slope angle. */
    NAV_RAW_GLIDE_SLOPE: {
        name: 'NAV RAW GLIDE SLOPE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Relative bearing to station. */
    NAV_RELATIVE_BEARING_TO_STATION: {
        name: 'NAV RELATIVE BEARING TO STATION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Nav signal strength. */
    NAV_SIGNAL: {
        name: 'NAV SIGNAL',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Nav audio flag. Index of 1 or 2. */
    'NAV_SOUND:index': {
        name: 'NAV SOUND:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Nav standby frequency. Index is 1 or 2. */
    'NAV_STANDBY_FREQUENCY:index': {
        name: 'NAV STANDBY FREQUENCY:index',
        units: 'MHz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns whether the Nav is going to or from the current radial (or is off). */
    NAV_TOFROM: {
        name: 'NAV TOFROM',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The volume of the Nav radio. */
    NAV_VOLUME: {
        name: 'NAV VOLUME',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Distance of the VOR beacon. */
    NAV_VOR_DISTANCE: {
        name: 'NAV VOR DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the VOR station latitude, longitude and altitude. */
    'NAV_VOR_LATLONALT:index': {
        name: 'NAV VOR LATLONALT:index',
        units: 'SIMCONNECT_DATA_LATLONALT structure',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** Nav VOR latitude, longitude, altitude. */
    NAV_VOR_LLAF64: {
        name: 'NAV VOR LLAF64',
        units: 'SIMCONNECT_DATA_LATLONALT structure',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** The active channel used by the indexed Tacan receiver on the aircraft, from 1 to 127. */
    'TACAN_ACTIVE_CHANNEL:index': {
        name: 'TACAN ACTIVE CHANNEL:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The active mode used by the indexed Tacan receiver on the aircraft, where 0 = X and 1 = Y. */
    'TACAN_ACTIVE_MODE:index': {
        name: 'TACAN ACTIVE MODE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Will be TRUE (1) if NAV1, NAV2, NAV3 or NAV4 can receive Tacan (depending on the index - 1, 2, 3, or 4), or FALSE (0) otherwise. */
    'TACAN_AVAILABLE:index': {
        name: 'TACAN AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Tells whether the Tacan is driving the
Nav 1 indicator (TRUE, 1) or not (FALSE, 0), for autopilot purposes. */
    'TACAN_DRIVES_NAV1:index': {
        name: 'TACAN DRIVES NAV1:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The Tacan OBS setting, in degrees. */
    'TACAN_OBS:index': {
        name: 'TACAN OBS:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The standby channel used by the indexed Tacan receiver on the aircraft, from 1 to 127. */
    'TACAN_STANDBY_CHANNEL:index': {
        name: 'TACAN STANDBY CHANNEL:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Indicates
the indexed Tacan receiver standby mode, where 0 = X and 1 = Y. */
    'TACAN_STANDBY_MODE:index': {
        name: 'TACAN STANDBY MODE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The CDI needle deflection amount(course deviation) to the station. Can be +/- 127. */
    'TACAN_STATION_CDI:index': {
        name: 'TACAN STATION CDI:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The distance between the Tacan station position and the aircraft position. The index value refers to the Tacan receiver connected to the station (1 or 2). */
    'TACAN_STATION_DISTANCE:index': {
        name: 'TACAN STATION DISTANCE:index',
        units: 'Meter',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The tuned station identifier for the indexed Tacan. */
    'TACAN_STATION_IDENT:index': {
        name: 'TACAN STATION IDENT:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Retrieves the latitude, longitude and altitude of the Tacan station. */
    'TACAN_STATION_LATLONALT:index': {
        name: 'TACAN STATION LATLONALT:index',
        units: 'SIMCONNECT_DATA_LATLONALT',
        dataType: SimConnectDataType.LATLONALT,
        settable: false,
    },
    /** The radial between the Tacan station and the aircraft. */
    'TACAN_STATION_RADIAL:index': {
        name: 'TACAN STATION RADIAL:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Difference between the current radial and OBS tuned radial, in degrees. */
    'TACAN_STATION_RADIAL_ERROR:index': {
        name: 'TACAN STATION RADIAL ERROR:index',
        units: 'Degrees.',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns whether the indexed Tacan is going to or from the current radial (or is off). */
    'TACAN_STATION_TOFROM:index': {
        name: 'TACAN STATION TOFROM:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The volume value of the indexed Tacan receiver on the aircraft. */
    'TACAN_VOLUME:index': {
        name: 'TACAN VOLUME:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** On which channel the copilot is transmitting. */
    COPILOT_TRANSMITTER_TYPE: {
        name: 'COPILOT TRANSMITTER TYPE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the copilot is transmitting. */
    COPILOT_TRANSMITTING: {
        name: 'COPILOT TRANSMITTING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** On which channel the pilot is transmitting. */
    PILOT_TRANSMITTER_TYPE: {
        name: 'PILOT TRANSMITTER TYPE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the pilot is transmitting. */
    PILOT_TRANSMITTING: {
        name: 'PILOT TRANSMITTING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Currently not used within the simulation. */
    RADIOS_AVAILABLE: {
        name: 'RADIOS AVAILABLE',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Radar altitude. */
    RADIO_HEIGHT: {
        name: 'RADIO HEIGHT',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if a transponder is available. */
    TRANSPONDER_AVAILABLE: {
        name: 'TRANSPONDER AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 4-digit code. */
    'TRANSPONDER_CODE:index': {
        name: 'TRANSPONDER CODE:index',
        units: 'BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This can set the Ident transponder using the KEY_XPNDR_IDENT_SET, KEY_XPNDR_IDENT_TOGGLE, KEY_XPNDR_IDENT_ON or KEY_XPNDR_IDENT_OFF Event IDs (see XPNDR (Transponder) section for more information). When set to true, it will automatically turn false after 18 seconds. */
    TRANSPONDER_IDENT: {
        name: 'TRANSPONDER IDENT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Transponder State. */
    TRANSPONDER_STATE: {
        name: 'TRANSPONDER STATE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Angle of True calibration scale on airspeed indicator. */
    AIRSPEED_TRUE_CALIBRATE: {
        name: 'AIRSPEED TRUE CALIBRATE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Alternate static air source. */
    'ALTERNATE_STATIC_SOURCE_OPEN:index': {
        name: 'ALTERNATE STATIC SOURCE OPEN:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Anemometer rpm as a percentage. */
    ANEMOMETER_PCT_RPM: {
        name: 'ANEMOMETER PCT RPM',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** AoA indication. */
    ANGLE_OF_ATTACK_INDICATOR: {
        name: 'ANGLE OF ATTACK INDICATOR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Currently not used in the simulation. */
    ANNUNCIATOR_SWITCH: {
        name: 'ANNUNCIATOR SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Used when too close to a fire. */
    APPLY_HEAT_TO_SYSTEMS: {
        name: 'APPLY HEAT TO SYSTEMS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if the audio panel is available. */
    AUDIO_PANEL_AVAILABLE: {
        name: 'AUDIO PANEL AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The Volume of the Audio Panel. */
    AUDIO_PANEL_VOLUME: {
        name: 'AUDIO PANEL VOLUME',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Auto-throttle active. */
    AUTOTHROTTLE_ACTIVE: {
        name: 'AUTOTHROTTLE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is auto-coordination active. */
    AUTO_COORDINATION: {
        name: 'AUTO COORDINATION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The avionics master switch position, true if the switch is ON. Use an avionics circuit index when referencing. */
    'AVIONICS_MASTER_SWITCH:index': {
        name: 'AVIONICS MASTER SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the No Smoking switch is on. */
    CABIN_NO_SMOKING_ALERT_SWITCH: {
        name: 'CABIN NO SMOKING ALERT SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the Seatbelts switch is on. */
    CABIN_SEATBELTS_ALERT_SWITCH: {
        name: 'CABIN SEATBELTS ALERT SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent primary door/exit open. */
    CANOPY_OPEN: {
        name: 'CANOPY OPEN',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if carburetor
heat available. */
    CARB_HEAT_AVAILABLE: {
        name: 'CARB HEAT AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Rate of turn of heading indicator. */
    DELTA_HEADING_RATE: {
        name: 'DELTA HEADING RATE',
        units: 'Radians per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** DME audio flag. */
    DME_SOUND: {
        name: 'DME SOUND',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the Emergency Locator Transmitter is active. */
    ELT_ACTIVATED: {
        name: 'ELT ACTIVATED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Generic SimVar. */
    EXTERNAL_SYSTEM_VALUE: {
        name: 'EXTERNAL SYSTEM VALUE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if the fire bottle is discharged. */
    FIRE_BOTTLE_DISCHARGED: {
        name: 'FIRE BOTTLE DISCHARGED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the fire bottle switch is on. */
    FIRE_BOTTLE_SWITCH: {
        name: 'FIRE BOTTLE SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This variable will return a value between 0 and 1 for the automatic brightness setting for glass cockpit displays, where 0 is the dimmest and 1 is the brightest. This value will vary depending on the time of day. */
    GLASSCOCKPIT_AUTOMATIC_BRIGHTNESS: {
        name: 'GLASSCOCKPIT AUTOMATIC BRIGHTNESS',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the Ground Proximity Warning System is active. */
    GPWS_SYSTEM_ACTIVE: {
        name: 'GPWS SYSTEM ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if Ground Proximity Warning System installed. */
    GPWS_WARNING: {
        name: 'GPWS WARNING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Angular error of heading indicator. */
    GYRO_DRIFT_ERROR: {
        name: 'GYRO DRIFT ERROR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Will return whether the aircraft has stall protection (true) or not (false). */
    HAS_STALL_PROTECTION: {
        name: 'HAS STALL PROTECTION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Heading indicator (directional gyro) indication. */
    HEADING_INDICATOR: {
        name: 'HEADING INDICATOR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indicated altitude. */
    INDICATED_ALTITUDE: {
        name: 'INDICATED ALTITUDE',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Indicated altitude with the altimeter calibrated to current sea level pressure. */
    INDICATED_ALTITUDE_CALIBRATED: {
        name: 'INDICATED ALTITUDE CALIBRATED',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Similar to INDICATED_ALTITUDE but doesn't affect actual plane position when setting this variable. */
    INDICATED_ALTITUDE_EX1: {
        name: 'INDICATED ALTITUDE EX1',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Inductor compass heading. */
    INDUCTOR_COMPASS_HEADING_REF: {
        name: 'INDUCTOR COMPASS HEADING REF',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Inductor compass deviation reading. */
    INDUCTOR_COMPASS_PERCENT_DEVIATION: {
        name: 'INDUCTOR COMPASS PERCENT DEVIATION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, do not use! */
    INSTRUMENTS_AVAILABLE: {
        name: 'INSTRUMENTS AVAILABLE',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Intercom Mode */
    INTERCOM_MODE: {
        name: 'INTERCOM MODE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the intercom system is active. */
    INTERCOM_SYSTEM_ACTIVE: {
        name: 'INTERCOM SYSTEM ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the altitude of the aircraft is frozen. */
    IS_ALTITUDE_FREEZE_ON: {
        name: 'IS ALTITUDE FREEZE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the attitude (pitch, bank and heading) of the aircraft is frozen. */
    IS_ATTITUDE_FREEZE_ON: {
        name: 'IS ATTITUDE FREEZE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the lat/lon of the aircraft (either user or AI controlled) is frozen. If this variable returns true, it means that the latitude and longitude of the aircraft are not being controlled by ESP, so enabling, for example, a SimConnect client to control the position of the aircraft. This can also apply to altitude and attitude.
          
          Also refer to the range of KEY_FREEZE..... Event IDs. */
    IS_LATITUDE_LONGITUDE_FREEZE_ON: {
        name: 'IS LATITUDE LONGITUDE FREEZE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The value for the given altimeter index in inches of mercury.
          IMPORTANT! In the system.cfg file, altimeters are indexed from 0, but the SimVar indexes from 1. So, altimeter 0 in that file is accessed using KOHLSMAN SETTING HG:1, 1 by KOHLSMAN SETTING HG:2, etc... */
    'KOHLSMAN_SETTING_HG:index': {
        name: 'KOHLSMAN SETTING HG:index',
        units: 'Inches of Mercury, inHg',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The value for the given altimeter index in millibars.
          IMPORTANT! In the system.cfg file, altimeters are indexed from 0, but the SimVar indexes from 1. So, altimeter 0 in that file is accessed using KOHLSMAN SETTING MB:1, 1 by KOHLSMAN SETTING MB:2, etc... */
    'KOHLSMAN_SETTING_MB:index': {
        name: 'KOHLSMAN SETTING MB:index',
        units: 'Millibars',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the indexed altimeter is in "Standard" mode, or false otherwise.
          IMPORTANT! In the system.cfg file, altimeters are indexed from 0, but the SimVar indexes from 1. So, altimeter 0 in that file is accessed using KOHLSMAN SETTING STD:1, 1 by KOHLSMAN SETTING STD:2, etc... */
    'KOHLSMAN_SETTING_STD:index': {
        name: 'KOHLSMAN SETTING STD:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Compass reading. */
    MAGNETIC_COMPASS: {
        name: 'MAGNETIC COMPASS',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of manual fuel pump handle. 1 is fully deployed. */
    MANUAL_FUEL_PUMP_HANDLE: {
        name: 'MANUAL FUEL PUMP HANDLE',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Overspeed warning state. */
    OVERSPEED_WARNING: {
        name: 'OVERSPEED WARNING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if panel anti-ice switch is on. */
    PANEL_ANTI_ICE_SWITCH: {
        name: 'PANEL ANTI ICE SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Amount of pitot ice. 100 is fully iced. */
    PITOT_ICE_PCT: {
        name: 'PITOT ICE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Pitot heat active. */
    PITOT_HEAT: {
        name: 'PITOT HEAT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Pitot heat switch state. */
    'PITOT_HEAT_SWITCH:index': {
        name: 'PITOT HEAT SWITCH:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Standard Altitude, ie: at a 1013.25 hPa (1 atmosphere) setting. */
    PRESSURE_ALTITUDE: {
        name: 'PRESSURE ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current altitude of the cabin pressurization. */
    PRESSURIZATION_CABIN_ALTITUDE: {
        name: 'PRESSURIZATION CABIN ALTITUDE',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The set altitude of the cabin pressurization as initialised from the Design Cabin Pressure value in the systems.cfg file. Pressure is converted into an altitude using a standard condition table.
          You can adjust the goal pressure using the
PRESSURIZATION_PRESSURE_ALT_INC and
PRESSURIZATION_PRESSURE_ALT_DEC events. */
    PRESSURIZATION_CABIN_ALTITUDE_GOAL: {
        name: 'PRESSURIZATION CABIN ALTITUDE GOAL',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The rate at which cabin pressurization changes. */
    PRESSURIZATION_CABIN_ALTITUDE_RATE: {
        name: 'PRESSURIZATION CABIN ALTITUDE RATE',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the cabin pressurization dump switch is on. */
    PRESSURIZATION_DUMP_SWITCH: {
        name: 'PRESSURIZATION DUMP SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The difference in pressure between the set altitude pressurization and the current pressurization. */
    PRESSURIZATION_PRESSURE_DIFFERENTIAL: {
        name: 'PRESSURIZATION PRESSURE DIFFERENTIAL',
        units: 'Pounds per square foot, psf',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if Rad INS switch on. */
    RAD_INS_SWITCH: {
        name: 'RAD INS SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Selected DME. */
    SELECTED_DME: {
        name: 'SELECTED DME',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Smoke system available.
          NOTE: There is no default "smoke system" that this SimVar works on and this is a legacy variable that is available for use should you wish to use it but it affects nothing by default. */
    SMOKESYSTEM_AVAILABLE: {
        name: 'SMOKESYSTEM AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Set to True to activate the smoke system, if one is available. Please see the notes for SMOKESYSTEM AVAILABLE for more information. */
    SMOKE_ENABLE: {
        name: 'SMOKE ENABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Whether or not the speaker is active. */
    SPEAKER_ACTIVE: {
        name: 'SPEAKER ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if stall alarm available. */
    STALL_HORN_AVAILABLE: {
        name: 'STALL HORN AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Alpha below which the Stall Protection can be disabled. See the [STALL PROTECTION] section for more information. */
    STALL_PROTECTION_OFF_LIMIT: {
        name: 'STALL PROTECTION OFF LIMIT',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The alpha that the Stall Protection will attempt to reach when triggered. See the [STALL PROTECTION] section for more information. */
    STALL_PROTECTION_ON_GOAL: {
        name: 'STALL PROTECTION ON GOAL',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Alpha above which the Stall Protection timer starts. See the [STALL PROTECTION] section for more information. */
    STALL_PROTECTION_ON_LIMIT: {
        name: 'STALL PROTECTION ON LIMIT',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Stall warning state. */
    STALL_WARNING: {
        name: 'STALL WARNING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the aircraft structure deice switch is on. */
    STRUCTURAL_DEICE_SWITCH: {
        name: 'STRUCTURAL DEICE SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Vacuum system suction pressure. */
    SUCTION_PRESSURE: {
        name: 'SUCTION PRESSURE',
        units: 'Inches of Mercury, inHg',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Deprecated, do not use! */
    SYSTEMS_AVAILABLE: {
        name: 'SYSTEMS AVAILABLE',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the tailhook handle is engaged. */
    TAILHOOK_HANDLE: {
        name: 'TAILHOOK HANDLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent tail hook extended. */
    TAILHOOK_POSITION: {
        name: 'TAILHOOK POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Position of tow release handle. 100 is fully deployed. */
    TOW_RELEASE_HANDLE: {
        name: 'TOW RELEASE HANDLE',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if True Airspeed has been selected. */
    TRUE_AIRSPEED_SELECTED: {
        name: 'TRUE AIRSPEED SELECTED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Turn coordinator ball position. */
    TURN_COORDINATOR_BALL: {
        name: 'TURN COORDINATOR BALL',
        units: 'Position 128',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Turn coordinator ball position inverted (upside down). */
    TURN_COORDINATOR_BALL_INV: {
        name: 'TURN COORDINATOR BALL INV',
        units: 'Position 128',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Turn indicator reading.
          NOTE: This is available in multiplayer to all
near
aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    TURN_INDICATOR_RATE: {
        name: 'TURN INDICATOR RATE',
        units: 'Radians per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if turn indicator switch is on. */
    TURN_INDICATOR_SWITCH: {
        name: 'TURN INDICATOR SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the aircraft windshield deice switch is on. */
    WINDSHIELD_DEICE_SWITCH: {
        name: 'WINDSHIELD DEICE SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Deprecated, do not use!
          Use MAGNETIC_COMPASS instead. */
    WISKEY_COMPASS_INDICATION_DEGREES: {
        name: 'WISKEY COMPASS INDICATION DEGREES',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The MacCready setting used to fly an optimal speed between thermals. */
    VARIOMETER_MAC_CREADY_SETTING: {
        name: 'VARIOMETER MAC CREADY SETTING',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Variometer rate using Netto (Total Energy - polar sinkRate). */
    VARIOMETER_NETTO: {
        name: 'VARIOMETER NETTO',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The variometer rate. */
    VARIOMETER_RATE: {
        name: 'VARIOMETER RATE',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Optimal speed to fly between thermals using polar curve and MacCready setting. */
    VARIOMETER_SPEED_TO_FLY: {
        name: 'VARIOMETER SPEED TO FLY',
        units: 'Kilometers per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The glide ratio at optimal speed to fly. */
    VARIOMETER_SPEED_TO_FLY_GLIDE_RATIO: {
        name: 'VARIOMETER SPEED TO FLY GLIDE RATIO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the variometer switch is on, false if it is not. */
    VARIOMETER_SWITCH: {
        name: 'VARIOMETER SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The variometer rate using total energy.
          Total Energy = Potential Energy + Kinetic Energy */
    VARIOMETER_TOTAL_ENERGY: {
        name: 'VARIOMETER TOTAL ENERGY',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The capacity of the indexed water ballast tank. */
    'WATER_BALLAST_TANK_CAPACITY:index': {
        name: 'WATER BALLAST TANK CAPACITY:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The number of water ballast tank available. */
    WATER_BALLAST_TANK_NUMBER: {
        name: 'WATER BALLAST TANK NUMBER',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The quantity of water ballast in the indexed tank. */
    'WATER_BALLAST_TANK_QUANTITY:index': {
        name: 'WATER BALLAST TANK QUANTITY:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True (1) if a water ballast valve is available, False (0) otherwise. */
    WATER_BALLAST_VALVE: {
        name: 'WATER BALLAST VALVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The flow rate of the water ballast valve. */
    WATER_BALLAST_VALVE_FLOW_RATE: {
        name: 'WATER BALLAST VALVE FLOW RATE',
        units: 'Gallons per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This variable will return 1 (TRUE) if all the ballast tank valves are open, or 0 (FALSE) otherwise. */
    WATER_BALLAST_EVERY_VALVE_OPEN: {
        name: 'WATER BALLAST EVERY VALVE OPEN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Will return true if any interior light is on or false otherwise. */
    IS_ANY_INTERIOR_LIGHT_ON: {
        name: 'IS ANY INTERIOR LIGHT ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Landing light pitch bank and heading. */
    LANDING_LIGHT_PBH: {
        name: 'LANDING LIGHT PBH',
        units: 'SIMCONNECT_DATA_XYZ structure',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** Light switch state.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_BEACON: {
        name: 'LIGHT BEACON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target beacon light is functioning or if the switch is ON. Use beacon lightdef index. */
    LIGHT_BEACON_ON: {
        name: 'LIGHT BEACON ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Vehicle backlights current intensity (0 = off, 1 = full intensity). */
    LIGHT_BACKLIGHT_INTENSITY: {
        name: 'LIGHT BACKLIGHT INTENSITY',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns true if the target brake light is functioning or if the switch is ON. */
    LIGHT_BRAKE_ON: {
        name: 'LIGHT BRAKE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state. */
    LIGHT_CABIN: {
        name: 'LIGHT CABIN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target cabin light is functioning or if the switch is ON. Use the cabin lightdef index. */
    LIGHT_CABIN_ON: {
        name: 'LIGHT CABIN ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current cabin light power setting. Requires the cabin lightdef index. */
    LIGHT_CABIN_POWER_SETTING: {
        name: 'LIGHT CABIN POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the Light switch for the Glareshield is enabled. */
    LIGHT_GLARESHIELD: {
        name: 'LIGHT GLARESHIELD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target glareshield light is functioning or if the switch is ON. Use the glareshield lightdef index. */
    LIGHT_GLARESHIELD_ON: {
        name: 'LIGHT GLARESHIELD ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current glareshield light power setting. Requires the glareshield lightdef index. */
    LIGHT_GLARESHIELD_POWER_SETTING: {
        name: 'LIGHT GLARESHIELD POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Vehicle gyrolights current intensity (0 = off, 1 = full intensity). */
    LIGHT_GYROLIGHT_INTENSITY: {
        name: 'LIGHT GYROLIGHT INTENSITY',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns true if the target navigation light is functioning or if the switch is ON. */
    LIGHT_HEAD_ON: {
        name: 'LIGHT HEAD ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Vehicle headlights current intensity (0 = off, 1 = full intensity). */
    LIGHT_HEADLIGHT_INTENSITY: {
        name: 'LIGHT HEADLIGHT INTENSITY',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns true if the target landing light is functioning or if the switch is ON. Use landing lightdef index. */
    LIGHT_LANDING_ON: {
        name: 'LIGHT LANDING ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state for landing light.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_LANDING: {
        name: 'LIGHT LANDING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Light switch state for logo light.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_LOGO: {
        name: 'LIGHT LOGO',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target logo light is functioning or if the switch is ON. Use the logo lightdef index. */
    LIGHT_LOGO_ON: {
        name: 'LIGHT LOGO ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true if the target navigation light is functioning or if the switch is ON. Use navigation lightdef index. */
    LIGHT_NAV_ON: {
        name: 'LIGHT NAV ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state for the NAV light. */
    LIGHT_NAV: {
        name: 'LIGHT NAV',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Bit mask:[index]
          
            0x0001:[index] Nav
            0x0002:[index] Beacon
            0x0004:[index] Landing
            0x0008:[index] Taxi
            0x0010:[index] Strobe
            0x0020:[index] Panel
            0x0040:[index] Recognition
            0x0080:[index] Wing
            0x0100:[index] Logo
            0x0200:[index] Cabin */
    LIGHT_ON_STATES: {
        name: 'LIGHT ON STATES',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state of the panel light. */
    LIGHT_PANEL: {
        name: 'LIGHT PANEL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target panel light is functioning or if the switch is ON. Use the panel lightdef index. */
    LIGHT_PANEL_ON: {
        name: 'LIGHT PANEL ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current panel light power setting. Requires the panel lightdef index. */
    LIGHT_PANEL_POWER_SETTING: {
        name: 'LIGHT PANEL POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the Light switch for the Pedestal is enabled.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_PEDESTRAL: {
        name: 'LIGHT PEDESTRAL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target pedestral light is functioning or if the switch is ON. Requires the pedestral lightdef index. */
    LIGHT_PEDESTRAL_ON: {
        name: 'LIGHT PEDESTRAL ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current pedestral light power setting. Requires the pedestral lightdef index. */
    LIGHT_PEDESTRAL_POWER_SETTING: {
        name: 'LIGHT PEDESTRAL POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Adjust the potentiometer of the indexed lighting. Index is defined in the appropriate lightdef hashmap setting. */
    'LIGHT_POTENTIOMETER:index': {
        name: 'LIGHT POTENTIOMETER:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Light switch state for the recognition light.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_RECOGNITION: {
        name: 'LIGHT RECOGNITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target recognition light is functioning or if the switch is ON. Use the recognition lightdef index. */
    LIGHT_RECOGNITION_ON: {
        name: 'LIGHT RECOGNITION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Same as LIGHT_ON_STATES.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_STATES: {
        name: 'LIGHT STATES',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state for the strobe lights.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_STROBE: {
        name: 'LIGHT STROBE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target strobe light is functioning or if the switch is ON. Use the strobe lightdef index.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_STROBE_ON: {
        name: 'LIGHT STROBE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state for the taxi light.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_TAXI: {
        name: 'LIGHT TAXI',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target taxi light is functioning or if the switch is ON. Use taxi lightdef index. */
    LIGHT_TAXI_ON: {
        name: 'LIGHT TAXI ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state for the wing lights.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    LIGHT_WING: {
        name: 'LIGHT WING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if the target wing light is functioning or if the switch is ON. Use the wing lightdef index. */
    LIGHT_WING_ON: {
        name: 'LIGHT WING ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if instrument lights are set manually. */
    MANUAL_INSTRUMENT_LIGHTS: {
        name: 'MANUAL INSTRUMENT LIGHTS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if strobe lights are available. */
    STROBES_AVAILABLE: {
        name: 'STROBES AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Deprecated, do not use! */
    STROBE_FLASH: {
        name: 'STROBE FLASH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Hydraulic system pressure. Indexes start at 1. */
    'HYDRAULIC_PRESSURE:index': {
        name: 'HYDRAULIC PRESSURE:index',
        units: 'Pound force per square foot',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Hydraulic pressure changes will follow changes to this variable. Indexes start at 1. */
    'HYDRAULIC_RESERVOIR_PERCENT:index': {
        name: 'HYDRAULIC RESERVOIR PERCENT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if hydraulic switch is on. */
    HYDRAULIC_SWITCH: {
        name: 'HYDRAULIC SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent system functional. */
    HYDRAULIC_SYSTEM_INTEGRITY: {
        name: 'HYDRAULIC SYSTEM INTEGRITY',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_ADF: {
        name: 'PARTIAL PANEL ADF',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_AIRSPEED: {
        name: 'PARTIAL PANEL AIRSPEED',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_ALTIMETER: {
        name: 'PARTIAL PANEL ALTIMETER',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_ATTITUDE: {
        name: 'PARTIAL PANEL ATTITUDE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_AVIONICS: {
        name: 'PARTIAL PANEL AVIONICS',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_COMM: {
        name: 'PARTIAL PANEL COMM',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_COMPASS: {
        name: 'PARTIAL PANEL COMPASS',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_ELECTRICAL: {
        name: 'PARTIAL PANEL ELECTRICAL',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_ENGINE: {
        name: 'PARTIAL PANEL ENGINE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_FUEL_INDICATOR: {
        name: 'PARTIAL PANEL FUEL INDICATOR',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_HEADING: {
        name: 'PARTIAL PANEL HEADING',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_NAV: {
        name: 'PARTIAL PANEL NAV',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_PITOT: {
        name: 'PARTIAL PANEL PITOT',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_TRANSPONDER: {
        name: 'PARTIAL PANEL TRANSPONDER',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_TURN_COORDINATOR: {
        name: 'PARTIAL PANEL TURN COORDINATOR',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_VACUUM: {
        name: 'PARTIAL PANEL VACUUM',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    PARTIAL_PANEL_VERTICAL_VELOCITY: {
        name: 'PARTIAL PANEL VERTICAL VELOCITY',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The number of droppable objects at the station number identified by the index. */
    'DROPPABLE_OBJECTS_COUNT:index': {
        name: 'DROPPABLE OBJECTS COUNT:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The type of droppable object at the station number identified by the index. */
    'DROPPABLE_OBJECTS_TYPE:index': {
        name: 'DROPPABLE OBJECTS TYPE:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** Descriptive name, used in User Interface dialogs, of a droppable object, identified by index. */
    'DROPPABLE_OBJECTS_UI_NAME:index': {
        name: 'DROPPABLE OBJECTS UI NAME:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Number of payload stations (1 to 15). */
    PAYLOAD_STATION_COUNT: {
        name: 'PAYLOAD STATION COUNT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Descriptive name for payload station. */
    'PAYLOAD_STATION_NAME:index': {
        name: 'PAYLOAD STATION NAME:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The number of objects at the payload station. */
    'PAYLOAD_STATION_NUM_SIMOBJECTS:index': {
        name: 'PAYLOAD STATION NUM SIMOBJECTS:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Places the named object at the payload station identified by the index (starting from 1). The string is the Container name (refer to the title property of Simulation Object Configuration Files). */
    'PAYLOAD_STATION_OBJECT:index': {
        name: 'PAYLOAD STATION OBJECT:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Individual payload station weight. */
    'PAYLOAD_STATION_WEIGHT:index': {
        name: 'PAYLOAD STATION WEIGHT:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This is the current state of the fuel warning, either on (true) or off (false). */
    WARNING_FUEL: {
        name: 'WARNING FUEL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the left fuel tank warning, either on (true) or off (false). */
    WARNING_FUEL_LEFT: {
        name: 'WARNING FUEL LEFT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the right fuel tank warning, either on (true) or off (false). */
    WARNING_FUEL_RIGHT: {
        name: 'WARNING FUEL RIGHT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the low height warning, either on (true) or off (false). */
    WARNING_LOW_HEIGHT: {
        name: 'WARNING LOW HEIGHT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the oil pressure warning, either on (true) or off (false). */
    WARNING_OIL_PRESSURE: {
        name: 'WARNING OIL PRESSURE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the vacuum system warning, either on (true) or off (false). */
    WARNING_VACUUM: {
        name: 'WARNING VACUUM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the left vacuum system warning, either on (true) or off (false). */
    WARNING_VACUUM_LEFT: {
        name: 'WARNING VACUUM LEFT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the right vacuum system warning, either on (true) or off (false). */
    WARNING_VACUUM_RIGHT: {
        name: 'WARNING VACUUM RIGHT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the electrical system voltage warning, either on (true) or off (false). */
    WARNING_VOLTAGE: {
        name: 'WARNING VOLTAGE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Yoke position in horizontal direction. */
    YOKE_X_INIDICATOR: {
        name: 'YOKE X INIDICATOR',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent control deflection left/right (for animation). */
    YOKE_X_POSITION: {
        name: 'YOKE X POSITION',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent control deflection left/right (for animation). Also includes AP's inputs. */
    YOKE_X_POSITION_WITH_AP: {
        name: 'YOKE X POSITION WITH AP',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Yoke position in vertical direction. */
    YOKE_Y_INIDICATOR: {
        name: 'YOKE Y INIDICATOR',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent control deflection fore/aft (for animation). */
    YOKE_Y_POSITION: {
        name: 'YOKE Y POSITION',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent control deflection fore/aft (for animation). Also includes AP's inputs. */
    YOKE_Y_POSITION_WITH_AP: {
        name: 'YOKE Y POSITION WITH AP',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent door/exit open. */
    'EXIT_OPEN:index': {
        name: 'EXIT OPEN:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Position of exit relative to datum reference point. */
    'EXIT_POSX:index': {
        name: 'EXIT POSX:index',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of exit relative to datum reference point. */
    'EXIT_POSY:index': {
        name: 'EXIT POSY:index',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of exit relative to datum reference point. */
    'EXIT_POSZ:index': {
        name: 'EXIT POSZ:index',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The exit type. */
    'EXIT_TYPE:index': {
        name: 'EXIT TYPE:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The position of the helicopter\'s collective. 0 is fully up, 100 fully depressed. */
    COLLECTIVE_POSITION: {
        name: 'COLLECTIVE POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rotor bank angle of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'DISK_BANK_ANGLE:index': {
        name: 'DISK BANK ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rotor bank percent of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'DISK_BANK_PCT:index': {
        name: 'DISK BANK PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rotor coning percent of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'DISK_CONING_PCT:index': {
        name: 'DISK CONING PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rotor pitch angle of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'DISK_PITCH_ANGLE:index': {
        name: 'DISK PITCH ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rotor pitch percent of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'DISK_PITCH_PCT:index': {
        name: 'DISK PITCH PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether the rotor brake is active (1, TRUE) or not (0, FALSE). */
    ROTOR_BRAKE_ACTIVE: {
        name: 'ROTOR BRAKE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The percentage actuated of the rotor brake handle. */
    ROTOR_BRAKE_HANDLE_POS: {
        name: 'ROTOR BRAKE HANDLE POS',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether the rotor chip is detected (1,TRUE) or not (0, FALSE). */
    ROTOR_CHIP_DETECTED: {
        name: 'ROTOR CHIP DETECTED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether the rotor clutch is active (1, TRUE) or not (0, FALSE). */
    ROTOR_CLUTCH_ACTIVE: {
        name: 'ROTOR CLUTCH ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The rotor clutch switch position, either on (1 TRUE) or off (0, FALSE). */
    ROTOR_CLUTCH_SWITCH_POS: {
        name: 'ROTOR CLUTCH SWITCH POS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The rotor collective blade pitch.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    ROTOR_COLLECTIVE_BLADE_PITCH_PCT: {
        name: 'ROTOR COLLECTIVE BLADE PITCH PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The position (angle) at which blade has the maximum cyclic pitch.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    ROTOR_CYCLIC_BLADE_MAX_PITCH_POSITION: {
        name: 'ROTOR CYCLIC BLADE MAX PITCH POSITION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The rotor cyclic blade (maximum) pitch.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    ROTOR_CYCLIC_BLADE_PITCH_PCT: {
        name: 'ROTOR CYCLIC BLADE PITCH PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether the rotor governor is active (1, TRUE) or not (0, FALSE). */
    ROTOR_GOV_ACTIVE: {
        name: 'ROTOR GOV ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The rotor governor switch position, either on (1 TRUE) or off (0, FALSE). */
    ROTOR_GOV_SWITCH_POS: {
        name: 'ROTOR GOV SWITCH POS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The rotor lateral trim percentage.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    ROTOR_LATERAL_TRIM_PCT: {
        name: 'ROTOR LATERAL TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The rotor longitudinal trim percentage.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    ROTOR_LONGITUDINAL_TRIM_PCT: {
        name: 'ROTOR LONGITUDINAL TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rotor rotation angle of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'ROTOR_ROTATION_ANGLE:index': {
        name: 'ROTOR ROTATION ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed rotor
RPM.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'ROTOR_RPM:index': {
        name: 'ROTOR RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent max rated rpm of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor. */
    'ROTOR_RPM_PCT:index': {
        name: 'ROTOR RPM PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The main rotor transmission temperature. */
    ROTOR_TEMPERATURE: {
        name: 'ROTOR TEMPERATURE',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The position of the indexed rotor. */
    'STRUCT_ROTOR_POSITION:index': {
        name: 'STRUCT ROTOR POSITION:index',
        units: 'SIMCONNECT_DATA_XYZ',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** The pitch position of the tailrotor blades. */
    TAIL_ROTOR_BLADE_PITCH_PCT: {
        name: 'TAIL ROTOR BLADE PITCH PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent tail rotor pedal deflection. */
    TAIL_ROTOR_PEDAL_POSITION: {
        name: 'TAIL ROTOR PEDAL POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the indexed rotor
RPM.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    'ENG_ROTOR_RPM:index': {
        name: 'ENG ROTOR RPM:index',
        units: 'Percent scalar 16K (Max rpm * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the indexed rotor torque. */
    'ENG_TORQUE_PERCENT:index': {
        name: 'ENG TORQUE PERCENT:index',
        units: 'Percent scalar 16K (Ft/lbs * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the position of the master throttle as a value between 0 and 1. */
    HELICOPTER_MASTER_THROTTLE_POSITION: {
        name: 'HELICOPTER_MASTER_THROTTLE_POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Set to true if this object is attached to a sling. */
    IS_ATTACHED_TO_SLING: {
        name: 'IS ATTACHED TO SLING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The number of sling cables (not hoists) that are configured for the helicopter. */
    NUM_SLING_CABLES: {
        name: 'NUM SLING CABLES',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The payload station (identified by the parameter) where objects will be placed from the sling (identified by the index). */
    'SLING_ACTIVE_PAYLOAD_STATION:index,_param': {
        name: 'SLING ACTIVE PAYLOAD STATION:index, param',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** THis will be True (1) if the indexed cable is broken, or False (0) otherwise. */
    'SLING_CABLE_BROKEN:index': {
        name: 'SLING CABLE BROKEN:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The length of the indexed cable extending from the aircraft. */
    'SLING_CABLE_EXTENDED_LENGTH:index': {
        name: 'SLING CABLE EXTENDED LENGTH:index',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The percentage of the full length of the sling cable deployed. */
    'SLING_HOIST_PERCENT_DEPLOYED:index': {
        name: 'SLING HOIST PERCENT DEPLOYED:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This will be True (1) if the hoist is enabled or False (0) otherwise. */
    'SLING_HOIST_SWITCH:index': {
        name: 'SLING HOIST SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This will be True (1) if the hook is in pickup mode or False (0) otherwise. When True, the hook will be capable of picking up another object. */
    SLING_HOOK_IN_PICKUP_MODE: {
        name: 'SLING HOOK IN PICKUP MODE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** If the SimVar units are set as boolean, this will return True (1) if a sling object is attached, or False (0) otherwise.
          If the SimVar units are set as a string, tis will return the container title of the object.
          Note that there can be multiple sling positions, indexed from 1. The sling positions are set in the Aircraft Configuration File. */
    'SLING_OBJECT_ATTACHED:index': {
        name: 'SLING OBJECT ATTACHED:index',
        units: 'Bool/String',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The electrical load on the indexed engine. */
    'ENG_ELECTRICAL_LOAD:index': {
        name: 'ENG ELECTRICAL LOAD:index',
        units: 'Percent scalar 16K (Max load * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The fuel pressure for the indexed engine. */
    'ENG_FUEL_PRESSURE:index': {
        name: 'ENG FUEL PRESSURE:index',
        units: 'PSI scalar 16K (Psi * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The transmission pressure of the indexed engine. */
    'ENG_TRANSMISSION_PRESSURE:index': {
        name: 'ENG TRANSMISSION PRESSURE:index',
        units: 'PSI scalar 16K (Psi * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The transmission temperature of the indexed engine. */
    'ENG_TRANSMISSION_TEMPERATURE:index': {
        name: 'ENG TRANSMISSION TEMPERATURE:index',
        units: 'Celsius scalar 16K (Degrees * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The tubine temperature for the indexed engine. */
    'ENG_TURBINE_TEMPERATURE:index': {
        name: 'ENG TURBINE TEMPERATURE:index',
        units: 'Celsius scalar 16K (degrees * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns either the pitch (index 0) or the yaw (index 1) of the current gameplay camera. */
    'CAMERA_GAMEPLAY_PITCH_YAW:index': {
        name: 'CAMERA GAMEPLAY PITCH YAW:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This can be used to have the currently active camera perform a predefined action. Currently only 1 action is supported, but more may be added over time. */
    CAMERA_REQUEST_ACTION: {
        name: 'CAMERA REQUEST ACTION',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This can be used to get or set the camera "state", which will be one of the listed enum values.
          Note that not ALL possible enum values are shown, since some values are internal only, and some values will do nothing, but have been reserved for future expansion of the camera system.
          Also note that the value "9" is a special case, generally used only when working with in-sim panels and is used to go to the showcase cameras, defaulting to the last selected camera within this section (Drone, Fixed or Environment). */
    CAMERA_STATE: {
        name: 'CAMERA STATE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This variable can be used to get or set the camera "sub-state". The options here are generally only required when working with the in-sim panel UI. Note that the "locked" and "unlocked" state will be changed automatically if the following SimVars have their values changed: COCKPIT_CAMERA_HEADLOOK, CHASE_CAMERA_HEADLOOK. */
    CAMERA_SUBSTATE: {
        name: 'CAMERA SUBSTATE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** With this you can get or set both the type of view for the current camera, as well as the option index, which will be between 0 and the maximum index value (as retrieved using the CAMERA VIEW TYPE AND INDEX MAX SimVar). Supplying an index of 0 to the SimVar will get/set the type (from the selection of enum values listed), and using an index of 1 will get/set the option index, which is an integer value.
          

          Please see the Notes On View Types And Indices section below for more information. */
    'CAMERA_VIEW_TYPE_AND_INDEX:index': {
        name: 'CAMERA VIEW TYPE AND INDEX:index',
        units: 'Enum (index = 0):',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This variable can get the number of option indices related to a specific camera view type. The index value supplied to the SimVar should be one of the camera view type Enum values (see CAMERA VIEW TYPE AND INDEX), and the SimVar will return the number of options available for that camera type (counting from 1, so - for example - if the camera view type is "Quickview" and has 8 quickview settings, then CAMERA VIEW TYPE AND INDEX MAX:4 will return 8). Note that this value can be set after a flight has started, but it will have no effect since the number of camera options is initilaised once only and not updated (and the simulation may overwrite the value again even after setting it).
          

          Please see the Notes On View Types And Indices section below for more information. */
    'CAMERA_VIEW_TYPE_AND_INDEX_MAX:index': {
        name: 'CAMERA VIEW TYPE AND INDEX MAX:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This gets/sets the focus for the camera zoom, which can be either manual, or auto. The setting affects both the Cockpit and the External (Chase) cameras.
          The following SimVars can be used to get/set the level of zoom: COCKPIT_CAMERA_ZOOM or CHASE_CAMERA_ZOOM. */
    GAMEPLAY_CAMERA_FOCUS: {
        name: 'GAMEPLAY CAMERA FOCUS',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This SimVar is used to check for a collision along a ray from the center of the user
FOV
and a model node. The available nodes that can be checked using this SimVar must be previously defined in the
[CAMERA_RAY_NODE_COLLISION]
of the cameras.cfg file. The SimVar requires a node
index
value between 1 and 10, corresponding to the node defined in the CFG file, and the SimVar will return 1 (TRUE) if there is a collision along the camera ray or 0 (FALSE) otherwise. You may also supply an index of 0 to perform a collision check for
all
defined nodes, in which case the SimVar will return 1 (TRUE) if there is a collision between the ray and
any
of the defined nodes. Supplying an index outside of the range of 1 to 10, or supplying an index for which no node has been defined, will return 0 (FALSE). */
    IS_CAMERA_RAY_INTERSECT_WITH_NODE: {
        name: 'IS CAMERA RAY INTERSECT WITH NODE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is used to get/set the look state of the chase (external) camera. Note that this value will also affect the CAMERA_SUBSTATE value, when the CAMERA_STATE is set to 3 (External/Chase). */
    CHASE_CAMERA_HEADLOOK: {
        name: 'CHASE CAMERA HEADLOOK',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the momentum modifier of the chase (external) camera, which is controls how fast/slow the camera will stop moving when no longer being moved by the user. Default is 50%. */
    CHASE_CAMERA_MOMENTUM: {
        name: 'CHASE CAMERA MOMENTUM',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the translation speed modifier of the chase (external) camara, as a percentage. Default is 50%. */
    CHASE_CAMERA_SPEED: {
        name: 'CHASE CAMERA SPEED',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the zoom/FOV modifier for the chase (external) camera. Note that when setting this value, it will affect the camera regardless of whether the GAMEPLAY_CAMERA_FOCUS is set to manual or automatic. Default is 50%. */
    CHASE_CAMERA_ZOOM: {
        name: 'CHASE CAMERA ZOOM',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the speed modifier for when the zoom/FOV chase (external) camera changes zoom/FOV levels. Default is 50%. */
    CHASE_CAMERA_ZOOM_SPEED: {
        name: 'CHASE CAMERA ZOOM SPEED',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This can be used to reset the cockpit camera when the CAMERA_STATE is set to 2 (Cockpit). Essentially the same as the user pressing the default reset keys CTRL + Space. */
    CAMERA_ACTION_COCKPIT_VIEW_RESET: {
        name: 'CAMERA ACTION COCKPIT VIEW RESET',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This can be used to save a cockpit camera when the CAMERA_STATE is set to 2 (Cockpit). The index value given is the save "slot" that will be used, from 0 to 9. Essentially this is the same as the user pressing the default save keys CTRL + Alt + 0-9. */
    'CAMERA_ACTION_COCKPIT_VIEW_SAVE:index': {
        name: 'CAMERA ACTION COCKPIT VIEW SAVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This is used to get/set the look state of the cockpit camera. Note that this value will also affect the CAMERA_SUBSTATE value, when the CAMERA_STATE is set to 2 (Cockpit). */
    COCKPIT_CAMERA_HEADLOOK: {
        name: 'COCKPIT CAMERA HEADLOOK',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This can be used to get/set the cockpit camera height modifier expressed as a percentage. Default is 50%. */
    COCKPIT_CAMERA_HEIGHT: {
        name: 'COCKPIT CAMERA HEIGHT',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This can be used to get or set the autoselect option for the cockpit camera when viewing the instruments (ie: the CAMERA_SUBSTATE is 5). When enabled the camera will move automatically if the player mouse reaches the edge of the screen and there are instrument panels available on that side. */
    COCKPIT_CAMERA_INSTRUMENT_AUTOSELECT: {
        name: 'COCKPIT CAMERA INSTRUMENT AUTOSELECT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the momentum modifier of the cockpit camera, which is controls how fast/slow the camera will stop moving when no longer being moved by the user. Default is 50%. */
    COCKPIT_CAMERA_MOMENTUM: {
        name: 'COCKPIT CAMERA MOMENTUM',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Not currently used in the simulation. */
    COCKPIT_CAMERA_SIDE: {
        name: 'COCKPIT CAMERA SIDE',
        units: 'Enum',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Sets/gets the translation speed modifier of the cockpit camara, as a percentage. Default is 50%. */
    COCKPIT_CAMERA_SPEED: {
        name: 'COCKPIT CAMERA SPEED',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the current "upper position" cockpit camera toggle. When 1 (TRUE), the camera is is in the upper position, and when 0 (FALSE) it is in the default position. */
    COCKPIT_CAMERA_UPPER_POSITION: {
        name: 'COCKPIT CAMERA UPPER POSITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the zoom/FOV modifier for the cockpit camera. Note that when setting this value, it will affect the camera regardless of whether the GAMEPLAY_CAMERA_FOCUS is set to manual or automatic. Default is 50%. */
    COCKPIT_CAMERA_ZOOM: {
        name: 'COCKPIT CAMERA ZOOM',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the speed modifier for when the zoom/FOV cockpit camera changes zoom/FOV levels. Default is 50%. */
    COCKPIT_CAMERA_ZOOM_SPEED: {
        name: 'COCKPIT CAMERA ZOOM SPEED',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the focus modifier for the drone camera. Default is 50%, and a lower value will set the drone focus to things in the foreground and a higher level will set the drone focus to things in the background. Note that this is only taken into account when the DRONE_CAMERA_FOCUS_MODE is set to 3 (manual). */
    DRONE_CAMERA_FOCUS: {
        name: 'DRONE CAMERA FOCUS',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the current drone focus mode. When set to 3 (manual), the focus position will be based on the DRONE_CAMERA_FOCUS value. */
    DRONE_CAMERA_FOCUS_MODE: {
        name: 'DRONE CAMERA FOCUS MODE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the whether the drone camera is in follow mode or not. */
    DRONE_CAMERA_FOLLOW: {
        name: 'DRONE CAMERA FOLLOW',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the zoom/FOV modifier for the drone camera. Default is 50%. */
    DRONE_CAMERA_FOV: {
        name: 'DRONE CAMERA FOV',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the whether the drone camera is locked or not. */
    DRONE_CAMERA_LOCKED: {
        name: 'DRONE CAMERA LOCKED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the rotation speed modifier of the drone camara, as a percentage. Default is 50%. */
    DRONE_CAMERA_SPEED_ROTATION: {
        name: 'DRONE CAMERA SPEED ROTATION',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the translation speed modifier of the drone camara, as a percentage. Default is 50%. */
    DRONE_CAMERA_SPEED_TRAVELLING: {
        name: 'DRONE CAMERA SPEED TRAVELLING',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the whether the smart camera is active or not. */
    SMART_CAMERA_ACTIVE: {
        name: 'SMART CAMERA ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gets information on the smartcam system. The index sets what kind of information will be returned (or set):
          
            0 = Gets the number of smartcam targets in the smart camera list
            1 = Gets or sets the index of the currently selected smartcam target, counting from 0 (so index 0 is the first target in the list). */
    'SMART_CAMERA_INFO:index': {
        name: 'SMART CAMERA INFO:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Retrieves the type of target for the indexed position in the smartcam list, counting from 0 (so index 0 is the first target in the list). */
    'SMART_CAMERA_LIST:index': {
        name: 'SMART CAMERA LIST:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This returns a localized string that represents the smartcam target specified by the given index. Indices count from 0 so index 0 is the first target in the list. */
    'SMART_CAMERA_LIST_DESCRIPTION:index': {
        name: 'SMART CAMERA LIST DESCRIPTION:index',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Difference of time between the current frame and the last frame where this SimObject has been animated */
    ANIMATION_DELTA_TIME: {
        name: 'ANIMATION DELTA TIME',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** In case scenery is not loaded for AI planes, this variable can be used to set a default surface elevation. */
    ARTIFICIAL_GROUND_ELEVATION: {
        name: 'ARTIFICIAL GROUND ELEVATION',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** One of the following:
          
            "Airplane",
            "Helicopter",
            "Boat",
            "GroundVehicle",
            "ControlTower",
            "SimpleObject",
            "Viewer" */
    CATEGORY: {
        name: 'CATEGORY',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /**  */
    CONTROLLABLE: {
        name: 'CONTROLLABLE',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Flag value that indicates the cause of a crash. */
    CRASH_FLAG: {
        name: 'CRASH FLAG',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The state of the crash event sequence. */
    CRASH_SEQUENCE: {
        name: 'CRASH SEQUENCE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Altitude of surface. */
    GROUND_ALTITUDE: {
        name: 'GROUND ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** What frame of the hand is currently used. */
    HAND_ANIM_STATE: {
        name: 'HAND ANIM STATE',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The ID of the idle animation for the sim object. */
    IDLE_ANIMATION_ID: {
        name: 'IDLE ANIMATION ID',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Magnetic variation. */
    MAGVAR: {
        name: 'MAGVAR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /**  */
    MISSION_SCORE: {
        name: 'MISSION SCORE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will be TRUE if the parachute has opened and FALSE otherwise. Currently this is only applied to the Parachute SimObject used by Winches. */
    PARACHUTE_OPEN: {
        name: 'PARACHUTE OPEN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** General realism percent. */
    REALISM: {
        name: 'REALISM',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True indicates crash detection is turned on. */
    REALISM_CRASH_DETECTION: {
        name: 'REALISM CRASH DETECTION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True indicates crashing with other aircraft is possible. */
    REALISM_CRASH_WITH_OTHERS: {
        name: 'REALISM CRASH WITH OTHERS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is sim disabled. */
    SIM_DISABLED: {
        name: 'SIM DISABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** On ground flag.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    SIM_ON_GROUND: {
        name: 'SIM ON GROUND',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /**  */
    SIM_SHOULD_SET_ON_GROUND: {
        name: 'SIM SHOULD SET ON GROUND',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if Track IR is enabled or not. */
    TRACK_IR_ENABLE: {
        name: 'TRACK IR ENABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Speed relative to the earths center. */
    TOTAL_WORLD_VELOCITY: {
        name: 'TOTAL WORLD VELOCITY',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Is input allowed from the user. */
    USER_INPUT_ENABLED: {
        name: 'USER INPUT ENABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Model radius. */
    VISUAL_MODEL_RADIUS: {
        name: 'VISUAL MODEL RADIUS',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Speed relative to earth, in East/West direction.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    VELOCITY_WORLD_X: {
        name: 'VELOCITY WORLD X',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Speed relative to earth, in vertical direction.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    VELOCITY_WORLD_Y: {
        name: 'VELOCITY WORLD Y',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Speed relative to earth, in North/South direction.
          NOTE: This is available in multiplayer
to all far aircraft. See here for more information:
Note On SimVars In Multiplayer. */
    VELOCITY_WORLD_Z: {
        name: 'VELOCITY WORLD Z',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Ambient density. */
    AMBIENT_DENSITY: {
        name: 'AMBIENT DENSITY',
        units: 'Slugs per cubic feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current precipitation rate. */
    AMBIENT_PRECIP_RATE: {
        name: 'AMBIENT PRECIP RATE',
        units: 'millimeters of water',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current state of precipitation. */
    AMBIENT_PRECIP_STATE: {
        name: 'AMBIENT PRECIP STATE',
        units: 'Mask:',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Ambient pressure. */
    AMBIENT_PRESSURE: {
        name: 'AMBIENT PRESSURE',
        units: 'Inches of mercury, inHg',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Ambient temperature. */
    AMBIENT_TEMPERATURE: {
        name: 'AMBIENT TEMPERATURE',
        units: 'Celsius',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Ambient visibility (only measures ambient particle visibility - related to ambient density). */
    AMBIENT_VISIBILITY: {
        name: 'AMBIENT VISIBILITY',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind direction, relative to true north. */
    AMBIENT_WIND_DIRECTION: {
        name: 'AMBIENT WIND DIRECTION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind velocity. */
    AMBIENT_WIND_VELOCITY: {
        name: 'AMBIENT WIND VELOCITY',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in East/West direction. */
    AMBIENT_WIND_X: {
        name: 'AMBIENT WIND X',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in vertical direction. */
    AMBIENT_WIND_Y: {
        name: 'AMBIENT WIND Y',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in North/South direction. */
    AMBIENT_WIND_Z: {
        name: 'AMBIENT WIND Z',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Barometric pressure. */
    BAROMETER_PRESSURE: {
        name: 'BAROMETER PRESSURE',
        units: 'Millibars',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The density altitude is the altitude relative to standard atmospheric conditions at which the air density would be equal to the indicated air density at the place of observation. The calculation is as follows:
          density_altitude = pressure_altitude + 118.8 * (outside_air_temp
- ISA_temp) */
    DENSITY_ALTITUDE: {
        name: 'DENSITY ALTITUDE',
        units: 'ft',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Barometric pressure at sea level. */
    SEA_LEVEL_PRESSURE: {
        name: 'SEA LEVEL PRESSURE',
        units: 'Millibars',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** X (latitude), Y (vertical) and Z (longitude) components of the wind. */
    STRUCT_AMBIENT_WIND: {
        name: 'STRUCT AMBIENT WIND',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The desired speed of the AI object. */
    AI_DESIRED_SPEED: {
        name: 'AI DESIRED SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** A list of waypoints that an AI controlled object should follow. */
    AI_WAYPOINT_LIST: {
        name: 'AI WAYPOINT LIST',
        units: 'SIMCONNECT_DATA_WAYPOINT',
        dataType: SimConnectDataType.WAYPOINT,
        settable: true,
    },
    /** The current waypoint in the list. */
    AI_CURRENT_WAYPOINT: {
        name: 'AI CURRENT WAYPOINT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The desired heading of the AI object. */
    AI_DESIRED_HEADING: {
        name: 'AI DESIRED HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The time required by the AI aircraft to make a 90º turn. */
    AI_GROUNDTURNTIME: {
        name: 'AI GROUNDTURNTIME',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The ground cruising speed for the AI aircraft. */
    AI_GROUNDCRUISESPEED: {
        name: 'AI GROUNDCRUISESPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The ground turning speed for the AI aircraft. */
    AI_GROUNDTURNSPEED: {
        name: 'AI GROUNDTURNSPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This can be used to request whether the AI aircraft is IFR or VFR. Note that if an aircraft does not have a flight plan, the value returned will be 0 (or false). */
    AI_TRAFFIC_ISIFR: {
        name: 'AI TRAFFIC ISIFR',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will return a string describing an AI aircraft state. If the aircraft is under ATC control the string will be one of the following:
          
            "init"
            "sleep"
            "flt plan"
            "startup"
            "preflight support"
            "clearance"
            "push back 1"
            "push back 2"
            "pre taxi out"
            "taxi out"
            "takeoff 1"
            "takeoff 2"
            "T&G depart"
            "enroute"
            "pattern"
            "landing"
            "rollout"
            "go around"
            "taxi in"
            "shutdown"
            "postflight support"

          
          

          If the aircraft is not under ATC control, the string will be one of these:
          
            "Sleep"
            "Waypoint"
            "Takeoff"
            "Landing"
            "Taxi"
          
          

          Note that if an aircraft does not have a flight plan, the value returned will be an empty string "". */
    AI_TRAFFIC_STATE: {
        name: 'AI TRAFFIC STATE',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The ICAO code of the current airport.
If an aircraft does not have a flight plan, the value returned will be an empty string "". */
    AI_TRAFFIC_CURRENT_AIRPORT: {
        name: 'AI TRAFFIC CURRENT AIRPORT',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The assigned runway name (for example: "32R").
If an aircraft does not have a flight plan, the value returned will be an empty string "". */
    AI_TRAFFIC_ASSIGNED_RUNWAY: {
        name: 'AI TRAFFIC ASSIGNED RUNWAY',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The assigned parking name. The string will take the form:
          Name + Number, Type ( radius )
          For example:
          
            "Ramp 1, RAMP sml (10m)"
            "Gate G 4, RAMP lrg (18m)"
          
          If an aircraft does not have a flight plan, the value returned will be an empty string "". */
    AI_TRAFFIC_ASSIGNED_PARKING: {
        name: 'AI TRAFFIC ASSIGNED PARKING',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The ICAO code of the departure airport in the current schedule.

          This variable is only valid for aircraft generated by the traffic database that have schedules. If an aircraft does not have a schedule, the value returned will an empty string"". */
    AI_TRAFFIC_FROMAIRPORT: {
        name: 'AI TRAFFIC FROMAIRPORT',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The ICAO code of the destination airport in the current schedule.

          This variable is only valid for aircraft generated by the traffic database that have schedules. If an aircraft does not have a schedule, the value returned will an empty string"". */
    AI_TRAFFIC_TOAIRPORT: {
        name: 'AI TRAFFIC TOAIRPORT',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The estimated time of departure for the current schedule entry, given as the number of seconds difference from the current simulation time. This can be negative if ETD is earlier than the current simulation time
          This variable is only valid for aircraft generated by the traffic database that have schedules. If an aircraft does not have a schedule, the value returned will be 0. */
    AI_TRAFFIC_ETD: {
        name: 'AI TRAFFIC ETD',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Estimated time of arrival for the current schedule entry, given as the number of seconds difference from the current simulated time. This can be negative if ETA is earlier than the current simulated time.
          This variable is only valid for aircraft generated by the traffic database that have schedules. If an aircraft does not have a schedule, the value returned will be 0. */
    AI_TRAFFIC_ETA: {
        name: 'AI TRAFFIC ETA',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, do not use! */
    STRUCT_DAMAGEVISIBLE: {
        name: 'STRUCT DAMAGEVISIBLE',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns a pitch, bank and heading value (for what will depend on the SimVar being used). */
    STRUCT_PBH32: {
        name: 'STRUCT PBH32',
        units: 'SIMCONNECT_DATA_XYZ',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** Not currently used in the simulation. */
    STRUCT_REALISM_VARS: {
        name: 'STRUCT REALISM VARS',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The relative surface velocity. */
    STRUCT_SURFACE_RELATIVE_VELOCITY: {
        name: 'STRUCT SURFACE RELATIVE VELOCITY',
        units: 'SIMCONNECT_DATA_XYZ structure, feet per second',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** The world velocity. */
    STRUCT_WORLDVELOCITY: {
        name: 'STRUCT WORLDVELOCITY',
        units: 'SIMCONNECT_DATA_XYZ structure, feet per second',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** The world acceleration for each axis. Individual world acceleration values are in the Aircraft Position and Speed section. */
    STRUCT_WORLD_ACCELERATION: {
        name: 'STRUCT WORLD ACCELERATION',
        units: 'SIMCONNECT_DATA_XYZ structure, feet per second squared',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** The world rotation velocity. */
    STRUCT_WORLD_ROTATION_VELOCITY: {
        name: 'STRUCT WORLD ROTATION VELOCITY',
        units: 'SIMCONNECT_DATA_XYZ structure, radians per second',
        dataType: SimConnectDataType.XYZ,
        settable: false,
    },
    /** The amount of bomb ammunition available. */
    BOMB_AMMO: {
        name: 'BOMB AMMO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The amount of cannon ammunition available. */
    CANNON_AMMO: {
        name: 'CANNON AMMO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The amount of gun ammunition available. */
    GUN_AMMO: {
        name: 'GUN AMMO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The amount of rocket ammunition available. */
    ROCKET_AMMO: {
        name: 'ROCKET AMMO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current angle of the baggage loader ramp, relative to the ground. */
    BAGGAGELOADER_ANGLE_CURRENT: {
        name: 'BAGGAGELOADER ANGLE CURRENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Target angle of the baggage loader ramp, relative to the ground. */
    BAGGAGELOADER_ANGLE_TARGET: {
        name: 'BAGGAGELOADER ANGLE TARGET',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** "Y" axis position of the end of the baggage loader ramp, relative to the ground. */
    BAGGAGELOADER_END_RAMP_Y: {
        name: 'BAGGAGELOADER END RAMP Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** "Z" axis position of the end of the baggage loader ramp, relative to the ground. */
    BAGGAGELOADER_END_RAMP_Z: {
        name: 'BAGGAGELOADER END RAMP Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** "Y" axis position of the baggage loader ramp pivot, relative to the ground. */
    BAGGAGELOADER_PIVOT_Y: {
        name: 'BAGGAGELOADER PIVOT Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** "Z" axis position of the baggage loader ramp pivot, relative to the ground. */
    BAGGAGELOADER_PIVOT_Z: {
        name: 'BAGGAGELOADER PIVOT Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current altitude
AGL of the top of the boarding ramp stairs. */
    BOARDINGRAMP_ELEVATION_CURRENT: {
        name: 'BOARDINGRAMP ELEVATION CURRENT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target altitude AGL of the top of the boarding ramp stairs. */
    BOARDINGRAMP_ELEVATION_TARGET: {
        name: 'BOARDINGRAMP ELEVATION TARGET',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "Y" axis position of the top of the boarding ramp stairs when extended at maximal capacity, relative to the ground. */
    BOARDINGRAMP_END_POSITION_Y: {
        name: 'BOARDINGRAMP END POSITION Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis position of the top of the boarding ramp stairs when extended at maximal capacity, relative to the ground. */
    BOARDINGRAMP_END_POSITION_Z: {
        name: 'BOARDINGRAMP END POSITION Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current orientation of the boarding ramp stairs, where 0 is at rest and 1 is suited for boarding. */
    BOARDINGRAMP_ORIENTATION_CURRENT: {
        name: 'BOARDINGRAMP ORIENTATION CURRENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target orientation of of the boarding ramp stairs, where 0 is at rest and 1 is suited for boarding. */
    BOARDINGRAMP_ORIENTATION_TARGET: {
        name: 'BOARDINGRAMP ORIENTATION TARGET',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "Y" axis
position of the top of the boarding ramp stairs when at minimal extension, relative to the ground. */
    BOARDINGRAMP_START_POSITION_Y: {
        name: 'BOARDINGRAMP START POSITION Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis
position of the top of the boarding ramp stairs when at minimal extension, relative to the ground. */
    BOARDINGRAMP_START_POSITION_Z: {
        name: 'BOARDINGRAMP START POSITION Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis position of the point of contact between the catering truck and the bottom of the aircraft door, relative to the ground. */
    CATERINGTRUCK_AIRCRAFT_DOOR_CONTACT_OFFSET_Z: {
        name: 'CATERINGTRUCK AIRCRAFT DOOR CONTACT OFFSET Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current altitude AGL of the bottom of the catering truck container. */
    CATERINGTRUCK_ELEVATION_CURRENT: {
        name: 'CATERINGTRUCK ELEVATION CURRENT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target altitude AGL of the bottom of the catering truck container. */
    CATERINGTRUCK_ELEVATION_TARGET: {
        name: 'CATERINGTRUCK ELEVATION TARGET',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The current state of the catering truck when opening the container and deploying the bridge, where 0 is fully closed and 1 is fully opened and deployed. */
    CATERINGTRUCK_OPENING_CURRENT: {
        name: 'CATERINGTRUCK OPENING CURRENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target state of the catering truck the container is opene and the bridge deployed, where 0 is fully closed and 1 is fully opened and deployed. */
    CATERINGTRUCK_OPENING_TARGET: {
        name: 'CATERINGTRUCK OPENING TARGET',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The current deployment amount of the fuel truck hose. Currently can only be set to 0 (not deployed) and 1 (deployed). */
    FUELTRUCK_HOSE_DEPLOYED: {
        name: 'FUELTRUCK HOSE DEPLOYED',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "X" axis position of the end of the fuel truck hose when fully deployed, relative to the ground. */
    FUELTRUCK_HOSE_END_POSX: {
        name: 'FUELTRUCK HOSE END POSX',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis position of the end of the fuel truck hose when fully deployed, relative to the ground. */
    FUELTRUCK_HOSE_END_POSZ: {
        name: 'FUELTRUCK HOSE END POSZ',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The heading of the end of the fuel truck hose, relative to the vehicle heading. */
    FUELTRUCK_HOSE_END_RELATIVE_HEADING: {
        name: 'FUELTRUCK HOSE END RELATIVE HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current deployment amount of the ground power unit hose. Currently can only be set to 0 (not deployed) and 1 (deployed). */
    GROUNDPOWERUNIT_HOSE_DEPLOYED: {
        name: 'GROUNDPOWERUNIT HOSE DEPLOYED',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "X" axis position of the end of the ground power unit hose when fully deployed, relative to the ground. */
    GROUNDPOWERUNIT_HOSE_END_POSX: {
        name: 'GROUNDPOWERUNIT HOSE END POSX',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis position of the end of the ground power unit hose when fully deployed, relative to the ground. */
    GROUNDPOWERUNIT_HOSE_END_POSZ: {
        name: 'GROUNDPOWERUNIT HOSE END POSZ',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The heading of the end of the ground power unit hose, relative to the vehicle heading. */
    GROUNDPOWERUNIT_HOSE_END_RELATIVE_HEADING: {
        name: 'GROUNDPOWERUNIT HOSE END RELATIVE HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The target position for the left bend animation of the jetway hood. */
    JETWAY_HOOD_LEFT_BEND: {
        name: 'JETWAY HOOD LEFT BEND',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target angle for the left deployment animation of the jetway hood, where 0 is considered vertical. */
    JETWAY_HOOD_LEFT_DEPLOYMENT: {
        name: 'JETWAY HOOD LEFT DEPLOYMENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target position for the right bend animation of the jetway hood. */
    JETWAY_HOOD_RIGHT_BEND: {
        name: 'JETWAY HOOD RIGHT BEND',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target angle for the right deployment animation of the jetway hood, where 0 is considered vertical. */
    JETWAY_HOOD_RIGHT_DEPLOYMENT: {
        name: 'JETWAY HOOD RIGHT DEPLOYMENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Target position for the top horizontal animation of the jetway hood. Values can be between -100% and 100%. */
    JETWAY_HOOD_TOP_HORIZONTAL: {
        name: 'JETWAY HOOD TOP HORIZONTAL',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Target position for the top vertical animation of the jetway hood. Values can be between -100% and 100%. */
    JETWAY_HOOD_TOP_VERTICAL: {
        name: 'JETWAY HOOD TOP VERTICAL',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will be 1 (TRUE) id the jetway
body
is currently moving (it will not include checks on hood animation). */
    JETWAY_MOVING: {
        name: 'JETWAY MOVING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The current angle of the jetway wheels. */
    JETWAY_WHEEL_ORIENTATION_CURRENT: {
        name: 'JETWAY WHEEL ORIENTATION CURRENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The (approximate) target angle for the jetway wheels. */
    JETWAY_WHEEL_ORIENTATION_TARGET: {
        name: 'JETWAY WHEEL ORIENTATION TARGET',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The current speed of the jetway wheels. */
    JETWAY_WHEEL_SPEED: {
        name: 'JETWAY WHEEL SPEED',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Currently not used in the simulation. */
    MARSHALLER_AIRCRAFT_DIRECTION_PARKINGSPACE: {
        name: 'MARSHALLER AIRCRAFT DIRECTION PARKINGSPACE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The distance between the Marshaller and the aircraft. */
    MARSHALLER_AIRCRAFT_DISTANCE: {
        name: 'MARSHALLER AIRCRAFT DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position on the X axis of the aircraft in the parking space (negative means the aircraft is on the left side and positive the right side). */
    MARSHALLER_AIRCRAFT_DISTANCE_DIRECTION_X_PARKINGSPACE: {
        name: 'MARSHALLER AIRCRAFT DISTANCE DIRECTION X PARKINGSPACE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position on the Z axis of the aircraft in the parking space (negative means the aircraft is behind the parking space and positive is in front of the parking space). */
    MARSHALLER_AIRCRAFT_DISTANCE_DIRECTION_Z_PARKINGSPACE: {
        name: 'MARSHALLER AIRCRAFT DISTANCE DIRECTION Z PARKINGSPACE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the engine(s) of the aircraft is (are) shut down. */
    MARSHALLER_AIRCRAFT_ENGINE_SHUTDOWN: {
        name: 'MARSHALLER AIRCRAFT ENGINE SHUTDOWN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Angle between the direction of the aircraft and the direction of the parking place. */
    MARSHALLER_AIRCRAFT_HEADING_PARKINGSPACE: {
        name: 'MARSHALLER AIRCRAFT HEADING PARKINGSPACE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Value in Z axis of the projection from the aircraft position following the heading of the aircraft. */
    MARSHALLER_AIRCRAFT_PROJECTION_POINT_PARKINGSPACE: {
        name: 'MARSHALLER AIRCRAFT PROJECTION POINT PARKINGSPACE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The velocity of the aircraft. */
    MARSHALLER_AIRCRAFT_VELOCITY: {
        name: 'MARSHALLER AIRCRAFT VELOCITY',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Pushback angle (the heading of the tug). */
    PUSHBACK_ANGLE: {
        name: 'PUSHBACK ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if this vehicle is attached to an aircraft. */
    PUSHBACK_ATTACHED: {
        name: 'PUSHBACK ATTACHED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if a push back is available on the parking space. */
    PUSHBACK_AVAILABLE: {
        name: 'PUSHBACK AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The towpoint position, relative to the aircrafts datum reference point. */
    PUSHBACK_CONTACTX: {
        name: 'PUSHBACK CONTACTX',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Pushback contact position in vertical direction. */
    PUSHBACK_CONTACTY: {
        name: 'PUSHBACK CONTACTY',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Pushback contact position in fore/aft direction. */
    PUSHBACK_CONTACTZ: {
        name: 'PUSHBACK CONTACTZ',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Type of pushback. */
    'PUSHBACK_STATE:index': {
        name: 'PUSHBACK STATE:index',
        units: 'Enum:',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if waiting for pushback. */
    PUSHBACK_WAIT: {
        name: 'PUSHBACK WAIT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The length of the link at the back of the vehicle used to attach a wagon behind. */
    WAGON_BACK_LINK_LENGTH: {
        name: 'WAGON BACK LINK LENGTH',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current orientation of the link at the back of the vehicle used to attach a wagon behind. */
    WAGON_BACK_LINK_ORIENTATION: {
        name: 'WAGON BACK LINK ORIENTATION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "Z" axis position of the start of the link at the back of the vehicle used to attach a wagon behind, relative to the ground. */
    WAGON_BACK_LINK_START_POSZ: {
        name: 'WAGON BACK LINK START POSZ',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The length of the link at the front of the vehicle used to be attached as wagon. */
    WAGON_FRONT_LINK_LENGTH: {
        name: 'WAGON FRONT LINK LENGTH',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current orientation of the link at the front of the vehicle used to be attached as wagon. */
    WAGON_FRONT_LINK_ORIENTATION: {
        name: 'WAGON FRONT LINK ORIENTATION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "Z" axis position of the start of the link at the front of the vehicle used to be attached as wagon, relative to the ground. */
    WAGON_FRONT_LINK_START_POSZ: {
        name: 'WAGON FRONT LINK START POSZ',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
} as const satisfies { [key: string]: PredefinedVariable };

export type SimvarPredefinitions = typeof simvarPredefinitions;
