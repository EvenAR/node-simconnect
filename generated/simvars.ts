import { SimConnectDataType } from '../dist';

export type PredefinedVariable = {
    name: string;
    units: string;
    dataType: SimConnectDataType;
    settable: boolean;
};

export const simvarPredefinitions = {
    /** <em>Currently not used within the simulation.</em> */
    'AUTOPILOT AIRSPEED ACQUISITION': {
        name: 'AUTOPILOT AIRSPEED ACQUISITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** returns whether airspeed hold is active (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT AIRSPEED HOLD': {
        name: 'AUTOPILOT AIRSPEED HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** <em>Currently not used within the simulation.</em> */
    'AUTOPILOT AIRSPEED HOLD CURRENT': {
        name: 'AUTOPILOT AIRSPEED HOLD CURRENT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the target holding airspeed for the autopilot. */
    'AUTOPILOT AIRSPEED HOLD VAR': {
        name: 'AUTOPILOT AIRSPEED HOLD VAR',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the maximum calculated airspeed (<a href="#" data-popovertext="This stands for 'Knots Calibrated AirSpeed' and is a unit of measurement for aircraft speed based on the 'knot' and corrected for instrument and position error." data-rhwidget="TextPopOver">kcas</a>) limit set for the autopilot. */
    'AUTOPILOT AIRSPEED MAX CALCULATED': {
        name: 'AUTOPILOT AIRSPEED MAX CALCULATED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the minimum calculated airspeed (<a href="#" data-popovertext="This stands for 'Knots Calibrated AirSpeed' and is a unit of measurement for aircraft speed based on the 'knot' and corrected for instrument and position error." data-rhwidget="TextPopOver">kcas</a>) limit set for the autopilot. */
    'AUTOPILOT AIRSPEED MIN CALCULATED': {
        name: 'AUTOPILOT AIRSPEED MIN CALCULATED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** If enabled the Autopilot will use the Radio Altitude rather than the Indicated Altitude. */
    'AUTOPILOT ALT RADIO MODE': {
        name: 'AUTOPILOT ALT RADIO MODE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot is in Altitude Arm mode (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT ALTITUDE ARM': {
        name: 'AUTOPILOT ALTITUDE ARM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Altitude hold active */
    'AUTOPILOT ALTITUDE LOCK': {
        name: 'AUTOPILOT ALTITUDE LOCK',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Set or get the slot index <span>which the altitude hold mode will track when captured. See <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#alt_mode_slot_index">alt_mode_slot_index</a></code> for more information.</span><span></span> */
    'AUTOPILOT ALTITUDE LOCK VAR': {
        name: 'AUTOPILOT ALTITUDE LOCK VAR',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the autopilot altitude is manually tunable or not. */
    'AUTOPILOT ALTITUDE MANUALLY TUNABLE': {
        name: 'AUTOPILOT ALTITUDE MANUALLY TUNABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Index of the slot that the autopilot will use for the altitude reference. Note that there are 3 slots (1, 2, 3) that you can set/get normally, however you can also target slot index 0. Writing to slot 0 will overwrite all other slots with the slot 0 value, and by default the autopilot will follow slot 0 if you have not selected any slot index.</p>
          <p><span>See <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#alt_mode_slot_index">alt_mode_slot_index</a></code> for more information.</span></p>
         */
    'AUTOPILOT ALTITUDE SLOT INDEX': {
        name: 'AUTOPILOT ALTITUDE SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** When true, the autopilot is currently flying the approach Flight Plan (the last legs). */
    'AUTOPILOT APPROACH ACTIVE': {
        name: 'AUTOPILOT APPROACH ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The stored COM 1/2/3 frequency value. */
    '': {
        name: '',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns true when the autopilot is active on the approach, once it reaches the adequate condition (in most cases, once it reaches the second-last waypoint of the flightplan). */
    'AUTOPILOT APPROACH ARM': {
        name: 'AUTOPILOT APPROACH ARM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true when the lateral NAV mode is engaged and the angular deviation with the current tuned navigation frequency is less than 5°. */
    'AUTOPILOT APPROACH CAPTURED': {
        name: 'AUTOPILOT APPROACH CAPTURED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether pproach mode is active (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT APPROACH HOLD': {
        name: 'AUTOPILOT APPROACH HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true if the current approach is using a localizer. */
    'AUTOPILOT APPROACH IS LOCALIZER': {
        name: 'AUTOPILOT APPROACH IS LOCALIZER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Attitude hold active */
    'AUTOPILOT ATTITUDE HOLD': {
        name: 'AUTOPILOT ATTITUDE HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Available flag */
    'AUTOPILOT AVAILABLE': {
        name: 'AUTOPILOT AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot has active managed avionics (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT AVIONICS MANAGED': {
        name: 'AUTOPILOT AVIONICS MANAGED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot back course mode is active (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT BACKCOURSE HOLD': {
        name: 'AUTOPILOT BACKCOURSE HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot bank hold mode is active (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT BANK HOLD': {
        name: 'AUTOPILOT BANK HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The current bank-hold bank reference.</p>
          <p>Note that if you set this, the next frame the value will be overwritten by the engine, so you may need to write to this every game frame to ensure it maintains the required value.</p>
         */
    'AUTOPILOT BANK HOLD REF': {
        name: 'AUTOPILOT BANK HOLD REF',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** <em>Currently not used within the simulation.</em> */
    'AUTOPILOT CRUISE SPEED HOLD': {
        name: 'AUTOPILOT CRUISE SPEED HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The current default pitch mode of the autopilot as configured in the plane configuration with the parameter <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#default_pitch_mode">default_pitch_mode</a></code>.</p>
         */
    'AUTOPILOT DEFAULT PITCH MODE': {
        name: 'AUTOPILOT DEFAULT PITCH MODE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current default roll mode of the autopilot as configured in the plane configuration with the parameter <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#default_bank_mode">default_bank_mode</a></code>. */
    'AUTOPILOT DEFAULT ROLL MODE': {
        name: 'AUTOPILOT DEFAULT ROLL MODE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot has been disengaged (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT DISENGAGED': {
        name: 'AUTOPILOT DISENGAGED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flight director active */
    'AUTOPILOT FLIGHT DIRECTOR ACTIVE': {
        name: 'AUTOPILOT FLIGHT DIRECTOR ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Reference bank angle */
    'AUTOPILOT FLIGHT DIRECTOR BANK': {
        name: 'AUTOPILOT FLIGHT DIRECTOR BANK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Raw reference bank angle */
    'AUTOPILOT FLIGHT DIRECTOR BANK EX1': {
        name: 'AUTOPILOT FLIGHT DIRECTOR BANK EX1',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Reference pitch angle */
    'AUTOPILOT FLIGHT DIRECTOR PITCH': {
        name: 'AUTOPILOT FLIGHT DIRECTOR PITCH',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Raw reference pitch angle */
    'AUTOPILOT FLIGHT DIRECTOR PITCH EX1': {
        name: 'AUTOPILOT FLIGHT DIRECTOR PITCH EX1',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Boolean, toggles the autopilot Flight Level Change mode */
    'AUTOPILOT FLIGHT LEVEL CHANGE': {
        name: 'AUTOPILOT FLIGHT LEVEL CHANGE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** When true, the autopilot is receiving a signal from the runway beacon and is following the slope to reach the ground. */
    'AUTOPILOT GLIDESLOPE ACTIVE': {
        name: 'AUTOPILOT GLIDESLOPE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true when the autopilot is active on the glide slope. */
    'AUTOPILOT GLIDESLOPE ARM': {
        name: 'AUTOPILOT GLIDESLOPE ARM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot glidslope hold is active (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT GLIDESLOPE HOLD': {
        name: 'AUTOPILOT GLIDESLOPE HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot heading lock is enabled (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT HEADING LOCK': {
        name: 'AUTOPILOT HEADING LOCK',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Specifies / Returns the locked in heading for the autopilot.&nbsp; */
    'AUTOPILOT HEADING LOCK DIR': {
        name: 'AUTOPILOT HEADING LOCK DIR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the autopilot heading is manually tunable or not. */
    'AUTOPILOT HEADING MANUALLY TUNABLE': {
        name: 'AUTOPILOT HEADING MANUALLY TUNABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Index of the slot that the autopilot will use for the heading reference. Note that there are 3 slots (1, 2, 3) that you can set/get normally, however you can also target slot index 0. Writing to slot 0 will overwrite all other slots with the slot 0 value, and by default the autopilot will follow slot 0 if you have not selected any slot index. */
    'AUTOPILOT HEADING SLOT INDEX': {
        name: 'AUTOPILOT HEADING SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Mach hold active */
    'AUTOPILOT MACH HOLD': {
        name: 'AUTOPILOT MACH HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the target holding mach airspeed&nbsp;for the autopilot. */
    'AUTOPILOT MACH HOLD VAR': {
        name: 'AUTOPILOT MACH HOLD VAR',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <em>Currently not used within the simulation.</em> */
    'AUTOPILOT MANAGED INDEX': {
        name: 'AUTOPILOT MANAGED INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns whether the managed speed is in mach (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT MANAGED SPEED IN MACH': {
        name: 'AUTOPILOT MANAGED SPEED IN MACH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot managed throttle is active (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT MANAGED THROTTLE ACTIVE': {
        name: 'AUTOPILOT MANAGED THROTTLE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** On/off flag */
    'AUTOPILOT MASTER': {
        name: 'AUTOPILOT MASTER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the maximum banking angle for the autopilot, in radians. */
    'AUTOPILOT MAX BANK': {
        name: 'AUTOPILOT MAX BANK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the index of the current maximum bank setting of the autopilot. */
    'AUTOPILOT MAX BANK ID': {
        name: 'AUTOPILOT MAX BANK ID',
        units: 'Integer',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <em>Currently not used within the simulation.</em> */
    'AUTOPILOT MAX SPEED HOLD': {
        name: 'AUTOPILOT MAX SPEED HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns TRUE (1) if the autopilot Nav1 lock is applied, or 0 (FALSE) otherwise. */
    'AUTOPILOT NAV1 LOCK': {
        name: 'AUTOPILOT NAV1 LOCK',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Index of Nav radio selected */
    'AUTOPILOT NAV SELECTED': {
        name: 'AUTOPILOT NAV SELECTED',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Set to True if the autopilot pitch hold has is engaged. */
    'AUTOPILOT PITCH HOLD': {
        name: 'AUTOPILOT PITCH HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the current autotpilot reference pitch. */
    'AUTOPILOT PITCH HOLD REF': {
        name: 'AUTOPILOT PITCH HOLD REF',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if autopilot rpm hold applied */
    'AUTOPILOT RPM HOLD': {
        name: 'AUTOPILOT RPM HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Selected rpm */
    'AUTOPILOT RPM HOLD VAR': {
        name: 'AUTOPILOT RPM HOLD VAR',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of the slot that the autopilot will use for the RPM reference. Note that there are 3 slots (1, 2, 3) that you can set/get normally, however you can also target slot index 0. Writing to slot 0 will overwrite all other slots with the slot 0 value, and by default the autopilot will follow slot 0 if you have not selected any slot index. */
    'AUTOPILOT RPM SLOT INDEX': {
        name: 'AUTOPILOT RPM SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <em>Currently not used within the simulation.</em> */
    'AUTOPILOT SPEED SETTING': {
        name: 'AUTOPILOT SPEED SETTING',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of the managed references */
    'AUTOPILOT SPEED SLOT INDEX': {
        name: 'AUTOPILOT SPEED SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Takeoff / Go Around power mode active */
    'AUTOPILOT TAKEOFF POWER ACTIVE': {
        name: 'AUTOPILOT TAKEOFF POWER ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the autopilot auto-throttle is armed (1, TRUE) or not (0, FALSE). */
    'AUTOPILOT THROTTLE ARM': {
        name: 'AUTOPILOT THROTTLE ARM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This can be used to set/get the thrust lever position for autopilot maximum thrust. */
    'AUTOPILOT THROTTLE MAX THRUST': {
        name: 'AUTOPILOT THROTTLE MAX THRUST',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if autopilot vertical hold applied */
    'AUTOPILOT VERTICAL HOLD': {
        name: 'AUTOPILOT VERTICAL HOLD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Selected vertical speed */
    'AUTOPILOT VERTICAL HOLD VAR': {
        name: 'AUTOPILOT VERTICAL HOLD VAR',
        units: 'Feet (ft)/minute',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Index of the slot that the autopilot will use for the VS reference. Note that there are 3 slots (1, 2, 3) that you can set/get normally, however you can also target slot index 0. Writing to slot 0 will overwrite all other slots with the slot 0 value, and by default the autopilot will follow slot 0 if you have not selected any slot index. */
    'AUTOPILOT VS SLOT INDEX': {
        name: 'AUTOPILOT VS SLOT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wing leveler active */
    'AUTOPILOT WING LEVELER': {
        name: 'AUTOPILOT WING LEVELER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Yaw damper active */
    'AUTOPILOT YAW DAMPER': {
        name: 'AUTOPILOT YAW DAMPER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether landing assistance has been enabled or not. */
    'ASSISTANCE LANDING ENABLED': {
        name: 'ASSISTANCE LANDING ENABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether takeoff assistance has been enabled or not. */
    'ASSISTANCE TAKEOFF ENABLED': {
        name: 'ASSISTANCE TAKEOFF ENABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current state of the AI anti-stall system. */
    'AI ANTISTALL STATE': {
        name: 'AI ANTISTALL STATE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the AI auto-trim system is enabled or not. */
    'AI AUTOTRIM ACTIVE': {
        name: 'AI AUTOTRIM ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the AI auto-trim system is enabled or not for AI controlled aircraft. */
    'AI AUTOTRIM ACTIVE AGAINST PLAYER': {
        name: 'AI AUTOTRIM ACTIVE AGAINST PLAYER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the AI control system is enabled or not. */
    'AI CONTROLS': {
        name: 'AI CONTROLS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the AI cursor mode is active or not. */
    'AI CURSOR MODE ACTIVE': {
        name: 'AI CURSOR MODE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** AI reference pitch reference bars */
    'ATTITUDE BARS POSITION': {
        name: 'ATTITUDE BARS POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** AI caged state */
    'ATTITUDE CAGE': {
        name: 'ATTITUDE CAGE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** AI bank indication */
    'ATTITUDE INDICATOR BANK DEGREES': {
        name: 'ATTITUDE INDICATOR BANK DEGREES',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** AI pitch indication */
    'ATTITUDE INDICATOR PITCH DEGREES': {
        name: 'ATTITUDE INDICATOR PITCH DEGREES',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns whether the AI control system is active or not. */
    'DELEGATE CONTROLS TO AI': {
        name: 'DELEGATE CONTROLS TO AI',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** When set with any value this will cancel the current flight assistant destination. */
    'FLY ASSISTANT CANCEL DESTINATION': {
        name: 'FLY ASSISTANT CANCEL DESTINATION',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** When set with any value this will cancel the display of the current flight assistant destination. */
    'FLY ASSISTANT CANCEL DESTINATION DISPLAY': {
        name: 'FLY ASSISTANT CANCEL DESTINATION DISPLAY',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns true when the copilot AI control is active and therefore COM AI is locked on active too. */
    'FLY ASSISTANT COM AI LOCKED': {
        name: 'FLY ASSISTANT COM AI LOCKED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** <span>Returns true when a destination has been set in the flight assistant.</span> */
    'FLY ASSISTANT HAVE DESTINATION': {
        name: 'FLY ASSISTANT HAVE DESTINATION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the <a href="#" data-popovertext="Stands for 'Pilots Operating Handbook' and is a manual that explains everything about the aircraft it is for. It usually includes the Aircraft Flight Manual (AFM), as well as other technical and operational information and is FAA (Federal Aviation Administration) approved." data-rhwidget="TextPopOver">POH</a> range or an estimated value for this speed. */
    'FLY ASSISTANT LANDING SPEED': {
        name: 'FLY ASSISTANT LANDING SPEED',
        units: '',
        dataType: SimConnectDataType.STRING32,
        settable: false,
    },
    /** Returns the display mode of the speed, CSS side (only STALL SPEED is working and will turn red when below). */
    'FLY ASSISTANT LANDING SPEED DISPLAY MODE': {
        name: 'FLY ASSISTANT LANDING SPEED DISPLAY MODE',
        units: '',
        dataType: SimConnectDataType.STRING32,
        settable: false,
    },
    /** Selected category */
    'FLY ASSISTANT NEAREST CATEGORY': {
        name: 'FLY ASSISTANT NEAREST CATEGORY',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Number of elements in this category */
    'FLY ASSISTANT NEAREST COUNT': {
        name: 'FLY ASSISTANT NEAREST COUNT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <em>Currently not used within the simulation.</em> */
    'FLY ASSISTANT NEAREST METADATA': {
        name: 'FLY ASSISTANT NEAREST METADATA',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the name of the element at the specified index. */
    'FLY ASSISTANT NEAREST NAME': {
        name: 'FLY ASSISTANT NEAREST NAME',
        units: '',
        dataType: SimConnectDataType.STRING256,
        settable: false,
    },
    /** Returns the index of the currently selected element. */
    'FLY ASSISTANT NEAREST SELECTED': {
        name: 'FLY ASSISTANT NEAREST SELECTED',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns true when both ribbon assistances are active (taxi and landing), and can also be used to set them. */
    'FLY ASSISTANT RIBBONS ACTIVE': {
        name: 'FLY ASSISTANT RIBBONS ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** When set with any value, it will set the selected element as the current destination. */
    'FLY ASSISTANT SET AS DESTINATION': {
        name: 'FLY ASSISTANT SET AS DESTINATION',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns the flight assistant stall speed. */
    'FLY ASSISTANT STALL SPEED': {
        name: 'FLY ASSISTANT STALL SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns the flight assistant stall speed display mode. */
    'FLY ASSISTANT STALL SPEED DISPLAY MODE': {
        name: 'FLY ASSISTANT STALL SPEED DISPLAY MODE',
        units: '',
        dataType: SimConnectDataType.STRING32,
        settable: false,
    },
    /** Returns the flight assistant takeoff speed. */
    'FLY ASSISTANT TAKEOFF SPEED': {
        name: 'FLY ASSISTANT TAKEOFF SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns the flight assistant takeoff speed display mode. */
    'FLY ASSISTANT TAKEOFF SPEED DISPLAY MODE': {
        name: 'FLY ASSISTANT TAKEOFF SPEED DISPLAY MODE',
        units: '',
        dataType: SimConnectDataType.STRING32,
        settable: false,
    },
    /** Can be set to override the estimated takeoff speed */
    'FLY ASSISTANT TAKEOFF SPEED ESTIMATED': {
        name: 'FLY ASSISTANT TAKEOFF SPEED ESTIMATED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if antiskid brakes active. This can be set using the <code class="inline"><a href="../../../Content_Configuration/Flights_And_Missions/Flight_Definitions.htm#AntiSkidActive">AntiSkidActive</a></code> parameter. */
    'ANTISKID BRAKES ACTIVE': {
        name: 'ANTISKID BRAKES ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the AutoBrakes are currently active. */
    'AUTOBRAKES ACTIVE': {
        name: 'AUTOBRAKES ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Auto brake switch position */
    'AUTO BRAKE SWITCH CB': {
        name: 'AUTO BRAKE SWITCH CB',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Brake dependent hydraulic pressure reading */
    'BRAKE DEPENDENT HYDRAULIC PRESSURE': {
        name: 'BRAKE DEPENDENT HYDRAULIC PRESSURE',
        units: 'Pounds per square foot (psf)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Brake on indication */
    'BRAKE INDICATOR': {
        name: 'BRAKE INDICATOR',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent left brake.</p>
          <p>Note that this SimVar no longer sets the right brake percent and simply triggers a brake pressure increase regardless of the value passed.</p>
         */
    'BRAKE LEFT POSITION': {
        name: 'BRAKE LEFT POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Triggers a brake pressure increase on the left brake regardless of the value passed. */
    'BRAKE LEFT POSITION EX1': {
        name: 'BRAKE LEFT POSITION EX1',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Parking brake indicator */
    'BRAKE PARKING INDICATOR': {
        name: 'BRAKE PARKING INDICATOR',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Gets the parking brake position - either on (true) or off (false).</p>
         */
    'BRAKE PARKING POSITION': {
        name: 'BRAKE PARKING POSITION',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Percent right brake.</p>
         */
    'BRAKE RIGHT POSITION': {
        name: 'BRAKE RIGHT POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Triggers a brake pressure increase on the right brake regardless of the value passed. */
    'BRAKE RIGHT POSITION EX1': {
        name: 'BRAKE RIGHT POSITION EX1',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the rejected takeoff brakes are currently active. */
    'REJECTED TAKEOFF BRAKES ACTIVE': {
        name: 'REJECTED TAKEOFF BRAKES ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if toe brakes are available */
    'TOE BRAKES AVAILABLE': {
        name: 'TOE BRAKES AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The percentage value representing the amount the contact point is compressed. Index is from 0-19. */
    'CONTACT POINT COMPRESSION:index': {
        name: 'CONTACT POINT COMPRESSION:index',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns true if the indexed contact point is on the ground, or will return false otherwise. Index is from 0 - 19. */
    'CONTACT POINT IS ON GROUND:index': {
        name: 'CONTACT POINT IS ON GROUND:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns true if the indexed contact point is skidding, or will return false otherwise. Index is from 0 - 19. */
    'CONTACT POINT IS SKIDDING:index': {
        name: 'CONTACT POINT IS SKIDDING:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The currently extended position of the (retractable) contact point, expressed as a percentage. Index is from 0 - 19. */
    'CONTACT POINT POSITION:index': {
        name: 'CONTACT POINT POSITION:index',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The skidding factor associated with the indexed contact point, from 0 to 1. Index is from 0 - 19. */
    'CONTACT POINT SKIDDING FACTOR:index': {
        name: 'CONTACT POINT SKIDDING FACTOR:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This returns the depth of the water for the indexed contact point. Index is from 0 - 19. */
    'CONTACT POINT WATER DEPTH:index': {
        name: 'CONTACT POINT WATER DEPTH:index',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Aux wheel rotation angle (rotation around the axis for the wheel). */
    'AUX WHEEL ROTATION ANGLE': {
        name: 'AUX WHEEL ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rpm of fourth set of gear wheels. */
    'AUX WHEEL RPM': {
        name: 'AUX WHEEL RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Center wheel rotation angle (rotation around the axis for the wheel).</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'CENTER WHEEL ROTATION ANGLE': {
        name: 'CENTER WHEEL ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Center landing gear rpm. */
    'CENTER WHEEL RPM': {
        name: 'CENTER WHEEL RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent indexed gear animation extended. <span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span> */
    'GEAR ANIMATION POSITION:index': {
        name: 'GEAR ANIMATION POSITION:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent auxiliary gear extended. */
    'GEAR AUX POSITION': {
        name: 'GEAR AUX POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Aux wheel angle, negative to the left, positive to the right. The aux wheel is the fourth set of landing gear, sometimes used on helicopters. */
    'GEAR AUX STEER ANGLE': {
        name: 'GEAR AUX STEER ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Aux steer angle as a percentage. */
    'GEAR AUX STEER ANGLE PCT': {
        name: 'GEAR AUX STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent center gear extended. */
    'GEAR CENTER POSITION': {
        name: 'GEAR CENTER POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Center wheel angle, negative to the left, positive to the right.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GEAR CENTER STEER ANGLE': {
        name: 'GEAR CENTER STEER ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Center steer angle as a percentage. */
    'GEAR CENTER STEER ANGLE PCT': {
        name: 'GEAR CENTER STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if gear has been damaged by excessive speed. */
    'GEAR DAMAGE BY SPEED': {
        name: 'GEAR DAMAGE BY SPEED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if gear emergency handle applied. */
    'GEAR EMERGENCY HANDLE POSITION': {
        name: 'GEAR EMERGENCY HANDLE POSITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The gear handle position, where 0 means the handle is retracted and 1 is the handle fully applied. */
    'GEAR HANDLE POSITION': {
        name: 'GEAR HANDLE POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Gear hydraulic pressure. */
    'GEAR HYDRAULIC PRESSURE': {
        name: 'GEAR HYDRAULIC PRESSURE',
        units: 'Pound force per square foot (psf)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the gear is on the ground. */
    'GEAR IS ON GROUND:index': {
        name: 'GEAR IS ON GROUND:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the gear is skidding. */
    'GEAR IS SKIDDING:index': {
        name: 'GEAR IS SKIDDING:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent left gear extended. */
    'GEAR LEFT POSITION': {
        name: 'GEAR LEFT POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Left wheel angle, negative to the left, positive to the right.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GEAR LEFT STEER ANGLE': {
        name: 'GEAR LEFT STEER ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Left steer angle as a percentage. */
    'GEAR LEFT STEER ANGLE PCT': {
        name: 'GEAR LEFT STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Position of landing gear.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GEAR POSITION:index': {
        name: 'GEAR POSITION:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Percent right gear extended. */
    'GEAR RIGHT POSITION': {
        name: 'GEAR RIGHT POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Right wheel angle, negative to the left, positive to the right.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GEAR RIGHT STEER ANGLE': {
        name: 'GEAR RIGHT STEER ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Right steer angle as a percentage. */
    'GEAR RIGHT STEER ANGLE PCT': {
        name: 'GEAR RIGHT STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The gear skidding factor, expressed as a value between 0 and 1. */
    'GEAR SKIDDING FACTOR': {
        name: 'GEAR SKIDDING FACTOR',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if safe speed limit for gear exceeded. */
    'GEAR SPEED EXCEEDED': {
        name: 'GEAR SPEED EXCEEDED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Alternative method of getting the steer angle.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GEAR STEER ANGLE:index': {
        name: 'GEAR STEER ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Alternative method of getting steer angle as a percentage. */
    'GEAR STEER ANGLE PCT:index': {
        name: 'GEAR STEER ANGLE PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent tail gear extended.</p>
          <p><span class="note"><strong>NOTE</strong>: This is a <strong>deprecated</strong> legacy SimVar and should not be used, as it will always return 0.</span></p>
         */
    'GEAR TAIL POSITION': {
        name: 'GEAR TAIL POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent total gear extended. */
    'GEAR TOTAL PCT EXTENDED': {
        name: 'GEAR TOTAL PCT EXTENDED',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Gear warnings.</p>
         */
    'GEAR WARNING:index': {
        name: 'GEAR WARNING:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The depth of the gear in the water. */
    'GEAR WATER DEPTH': {
        name: 'GEAR WATER DEPTH',
        units: 'Centimeters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if landing gear are floats */
    'IS GEAR FLOATS': {
        name: 'IS GEAR FLOATS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if gear can be retracted */
    'IS GEAR RETRACTABLE': {
        name: 'IS GEAR RETRACTABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if landing gear is skids */
    'IS GEAR SKIDS': {
        name: 'IS GEAR SKIDS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if landing gear is skis */
    'IS GEAR SKIS': {
        name: 'IS GEAR SKIS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if landing gear is wheels */
    'IS GEAR WHEELS': {
        name: 'IS GEAR WHEELS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Left wheel rotation angle (rotation around the axis for the wheel). */
    'LEFT WHEEL ROTATION ANGLE': {
        name: 'LEFT WHEEL ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Left landing gear rpm */
    'LEFT WHEEL RPM': {
        name: 'LEFT WHEEL RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the nosewheel lock is engaged. This can be set using the <code class="inline"><a href="../../../Content_Configuration/Flights_And_Missions/Flight_Definitions.htm#NosewheelLock">NosewheelLock</a></code> parameter. */
    'NOSEWHEEL LOCK ON': {
        name: 'NOSEWHEEL LOCK ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Can be used to get or set the maximum permitted steering angle for the nose wheel of the aircraft. */
    'NOSEWHEEL MAX STEERING ANGLE': {
        name: 'NOSEWHEEL MAX STEERING ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if retract float switch on */
    'RETRACT FLOAT SWITCH': {
        name: 'RETRACT FLOAT SWITCH',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** If aircraft has retractable floats. */
    'RETRACT LEFT FLOAT EXTENDED': {
        name: 'RETRACT LEFT FLOAT EXTENDED',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** If aircraft has retractable floats. */
    'RETRACT RIGHT FLOAT EXTENDED': {
        name: 'RETRACT RIGHT FLOAT EXTENDED',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Right wheel rotation angle (rotation around the axis for the wheel). */
    'RIGHT WHEEL ROTATION ANGLE': {
        name: 'RIGHT WHEEL ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Right landing gear rpm. */
    'RIGHT WHEEL RPM': {
        name: 'RIGHT WHEEL RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of steering tiller. */
    'STEER INPUT CONTROL': {
        name: 'STEER INPUT CONTROL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if tailwheel lock applied. This can be set using the <code class="inline"><a href="../../../Content_Configuration/Flights_And_Missions/Flight_Definitions.htm#TailwheelLock">TailwheelLock</a></code> parameter. */
    'TAILWHEEL LOCK ON': {
        name: 'TAILWHEEL LOCK ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent extended. */
    'WATER LEFT RUDDER EXTENDED': {
        name: 'WATER LEFT RUDDER EXTENDED',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Water left rudder angle, negative to the left, positive to the right. */
    'WATER LEFT RUDDER STEER ANGLE': {
        name: 'WATER LEFT RUDDER STEER ANGLE',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Water left rudder angle as a percentage. */
    'WATER LEFT RUDDER STEER ANGLE PCT': {
        name: 'WATER LEFT RUDDER STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent extended. */
    'WATER RIGHT RUDDER EXTENDED': {
        name: 'WATER RIGHT RUDDER EXTENDED',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Water right rudder angle, negative to the left, positive to the right. */
    'WATER RIGHT RUDDER STEER ANGLE': {
        name: 'WATER RIGHT RUDDER STEER ANGLE',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Water right rudder as a percentage. */
    'WATER RIGHT RUDDER STEER ANGLE PCT': {
        name: 'WATER RIGHT RUDDER STEER ANGLE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of the water rudder handle (0 handle retracted, 1 rudder handle applied). */
    'WATER RUDDER HANDLE POSITION': {
        name: 'WATER RUDDER HANDLE POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Wheel rotation angle (rotation around the axis for the wheel). */
    'WHEEL ROTATION ANGLE:index': {
        name: 'WHEEL ROTATION ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wheel rpm. */
    'WHEEL RPM:index': {
        name: 'WHEEL RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Angle deflection for the aileron. */
    'AILERON AVERAGE DEFLECTION': {
        name: 'AILERON AVERAGE DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Angle deflection for the aileron. */
    'AILERON LEFT DEFLECTION': {
        name: 'AILERON LEFT DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent deflection for the aileron.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer to all near aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'AILERON LEFT DEFLECTION PCT': {
        name: 'AILERON LEFT DEFLECTION PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent aileron input left/right. */
    'AILERON POSITION': {
        name: 'AILERON POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle deflection. */
    'AILERON RIGHT DEFLECTION': {
        name: 'AILERON RIGHT DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent deflection.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer to all near aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'AILERON RIGHT DEFLECTION PCT': {
        name: 'AILERON RIGHT DEFLECTION PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Angle deflection. */
    'AILERON TRIM': {
        name: 'AILERON TRIM',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the Aileron Trim has been disabled. */
    'AILERON TRIM DISABLED': {
        name: 'AILERON TRIM DISABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The trim position of the ailerons. Zero is fully retracted.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer to all near aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'AILERON TRIM PCT': {
        name: 'AILERON TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle deflection. */
    'ELEVATOR DEFLECTION': {
        name: 'ELEVATOR DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent deflection.</p>
          <p>NOTE: This is available in multiplayer. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</p>
         */
    'ELEVATOR DEFLECTION PCT': {
        name: 'ELEVATOR DEFLECTION PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent elevator input deflection. */
    'ELEVATOR POSITION': {
        name: 'ELEVATOR POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the Elevator Trim has been disabled. */
    'ELEVATOR TRIM DISABLED': {
        name: 'ELEVATOR TRIM DISABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the maximum elevator trim value. This corresponds to the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/geometry.htm#elevator_trim_down_limit">elevator_trim_down_limit</a></code> in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">Flight Model Config</a> file. */
    'ELEVATOR TRIM DOWN LIMIT': {
        name: 'ELEVATOR TRIM DOWN LIMIT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent elevator trim (for indication). */
    'ELEVATOR TRIM INDICATOR': {
        name: 'ELEVATOR TRIM INDICATOR',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Elevator trim neutral. */
    'ELEVATOR TRIM NEUTRAL': {
        name: 'ELEVATOR TRIM NEUTRAL',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent elevator trim. */
    'ELEVATOR TRIM PCT': {
        name: 'ELEVATOR TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Elevator trim deflection. */
    'ELEVATOR TRIM POSITION': {
        name: 'ELEVATOR TRIM POSITION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns the maximum elevator trim value. This corresponds to the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/geometry.htm#elevator_trim_up_limit">elevator_trim_up_limit</a></code> in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">Flight Model Config</a> file. */
    'ELEVATOR TRIM UP LIMIT': {
        name: 'ELEVATOR TRIM UP LIMIT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Elevon deflection. */
    'ELEVON DEFLECTION': {
        name: 'ELEVON DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if flaps are damaged by excessive speed. */
    'FLAP DAMAGE BY SPEED': {
        name: 'FLAP DAMAGE BY SPEED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Set the position of the flaps control. */
    'FLAP POSITION SET': {
        name: 'FLAP POSITION SET',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if safe speed limit for flaps exceeded. */
    'FLAP SPEED EXCEEDED': {
        name: 'FLAP SPEED EXCEEDED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if flaps available. */
    'FLAPS AVAILABLE': {
        name: 'FLAPS AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This returns the effective flaps handle index, <em>after</em> some of the conditions have potentially forced the state to change. */
    'FLAPS EFFECTIVE HANDLE INDEX:index': {
        name: 'FLAPS EFFECTIVE HANDLE INDEX:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of current flap position. */
    'FLAPS HANDLE INDEX:index': {
        name: 'FLAPS HANDLE INDEX:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Percent flap handle extended.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all near aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'FLAPS HANDLE PERCENT': {
        name: 'FLAPS HANDLE PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Number of available flap positions. */
    'FLAPS NUM HANDLE POSITIONS': {
        name: 'FLAPS NUM HANDLE POSITIONS',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Angle left leading edge flap extended. Use <code class="inline"><a href="Aircraft_Control_Variables.htm#LEADING_EDGE_FLAPS_LEFT_PERCENT">LEADING_EDGE_FLAPS_LEFT_PERCENT</a></code> to set a value. */
    'LEADING EDGE FLAPS LEFT ANGLE': {
        name: 'LEADING EDGE FLAPS LEFT ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of left leading edge flap position. */
    'LEADING EDGE FLAPS LEFT INDEX': {
        name: 'LEADING EDGE FLAPS LEFT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent left leading edge flap extended.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all near aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LEADING EDGE FLAPS LEFT PERCENT': {
        name: 'LEADING EDGE FLAPS LEFT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle right leading edge flap extended. Use <code class="inline"><a href="Aircraft_Control_Variables.htm#LEADING_EDGE_FLAPS_RIGHT_PERCENT">LEADING_EDGE_FLAPS_RIGHT_PERCENT</a></code> to set a value. */
    'LEADING EDGE FLAPS RIGHT ANGLE': {
        name: 'LEADING EDGE FLAPS RIGHT ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of right leading edge flap position. */
    'LEADING EDGE FLAPS RIGHT INDEX': {
        name: 'LEADING EDGE FLAPS RIGHT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent right leading edge flap extended.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer to all&nbsp;<strong>near</strong>&nbsp;aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LEADING EDGE FLAPS RIGHT PERCENT': {
        name: 'LEADING EDGE FLAPS RIGHT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle left trailing edge flap extended. Use <code class="inline"><a href="Aircraft_Control_Variables.htm#TRAILING_EDGE_FLAPS_LEFT_PERCENT">TRAILING_EDGE_FLAPS_LEFT_PERCENT</a></code> to set a value. */
    'TRAILING EDGE FLAPS LEFT ANGLE': {
        name: 'TRAILING EDGE FLAPS LEFT ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of left trailing edge flap position. */
    'TRAILING EDGE FLAPS LEFT INDEX': {
        name: 'TRAILING EDGE FLAPS LEFT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent left trailing edge flap extended.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all near aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'TRAILING EDGE FLAPS LEFT PERCENT': {
        name: 'TRAILING EDGE FLAPS LEFT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle right trailing edge flap extended. Use <code class="inline"><a href="#TRAILING_EDGE_FLAPS_RIGHT_PERCENT">TRAILING_EDGE_FLAPS_RIGHT_PERCENT</a></code> to set a value. */
    'TRAILING EDGE FLAPS RIGHT ANGLE': {
        name: 'TRAILING EDGE FLAPS RIGHT ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Index of right trailing edge flap position. */
    'TRAILING EDGE FLAPS RIGHT INDEX': {
        name: 'TRAILING EDGE FLAPS RIGHT INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent right trailing edge flap extended.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all near aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'TRAILING EDGE FLAPS RIGHT PERCENT': {
        name: 'TRAILING EDGE FLAPS RIGHT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns true if the fly-by-wire alpha protection is enabled or false otherwise. */
    'FLY BY WIRE ALPHA PROTECTION': {
        name: 'FLY BY WIRE ALPHA PROTECTION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the Elevators and Ailerons computer has failed. */
    'FLY BY WIRE ELAC FAILED': {
        name: 'FLY BY WIRE ELAC FAILED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the fly by wire Elevators and Ailerons computer is on. */
    'FLY BY WIRE ELAC SWITCH': {
        name: 'FLY BY WIRE ELAC SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the Flight Augmentation computer has failed. */
    'FLY BY WIRE FAC FAILED': {
        name: 'FLY BY WIRE FAC FAILED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the fly by wire Flight Augmentation computer is on. */
    'FLY BY WIRE FAC SWITCH': {
        name: 'FLY BY WIRE FAC SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the Spoilers and Elevators computer has failed. */
    'FLY BY WIRE SEC FAILED': {
        name: 'FLY BY WIRE SEC FAILED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the fly by wire Spoilers and Elevators computer is on. */
    'FLY BY WIRE SEC SWITCH': {
        name: 'FLY BY WIRE SEC SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the folding wing handle is engaged. */
    'FOLDING WING HANDLE POSITION': {
        name: 'FOLDING WING HANDLE POSITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Left folding wing position, 1.0 is fully folded. */
    'FOLDING WING LEFT PERCENT': {
        name: 'FOLDING WING LEFT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Right folding wing position, 1.0 is fully folded. */
    'FOLDING WING RIGHT PERCENT': {
        name: 'FOLDING WING RIGHT PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle deflection. */
    'RUDDER DEFLECTION': {
        name: 'RUDDER DEFLECTION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent deflection.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'RUDDER DEFLECTION PCT': {
        name: 'RUDDER DEFLECTION PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rudder pedal position. */
    'RUDDER PEDAL INDICATOR': {
        name: 'RUDDER PEDAL INDICATOR',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent rudder pedal deflection (for animation). */
    'RUDDER PEDAL POSITION': {
        name: 'RUDDER PEDAL POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent rudder input deflection. */
    'RUDDER POSITION': {
        name: 'RUDDER POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Angle deflection. */
    'RUDDER TRIM': {
        name: 'RUDDER TRIM',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the Rudder Trim has been disabled. */
    'RUDDER TRIM DISABLED': {
        name: 'RUDDER TRIM DISABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The trim position of the rudder. Zero is no trim. */
    'RUDDER TRIM PCT': {
        name: 'RUDDER TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Checks if autospoilers are armed (true) or not (false). */
    'SPOILERS ARMED': {
        name: 'SPOILERS ARMED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if spoiler system available. */
    'SPOILER AVAILABLE': {
        name: 'SPOILER AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Spoiler handle position. */
    'SPOILERS HANDLE POSITION': {
        name: 'SPOILERS HANDLE POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Percent left spoiler deflected.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'SPOILERS LEFT POSITION': {
        name: 'SPOILERS LEFT POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent right spoiler deflected.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'SPOILERS RIGHT POSITION': {
        name: 'SPOILERS RIGHT POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Indexed from 1, 100 is fully deployed, 0 flat on deck */
    'BLAST SHIELD POSITION:index': {
        name: 'BLAST SHIELD POSITION:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** A number 1 through 4 for the cable number caught by the tailhook. Cable 1 is the one closest to the stern of the carrier. A value of 0 indicates no cable was caught. */
    'CABLE CAUGHT BY TAILHOOK:index': {
        name: 'CABLE CAUGHT BY TAILHOOK:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Catapults are indexed from 1. This value will be 0 before the catapult fires, and then up to 100 as the aircraft is propelled down the catapult. The aircraft may takeoff before the value reaches 100 (depending on the aircraft weight, power applied, and other factors), in which case this value will not be further updated. This value could be used to drive a bogie animation. */
    'CATAPULT STROKE POSITION:index': {
        name: 'CATAPULT STROKE POSITION:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Holdback bars allow build up of thrust before takeoff from a catapult, and are installed by the deck crew of an aircraft carrier. */
    'HOLDBACK BAR INSTALLED': {
        name: 'HOLDBACK BAR INSTALLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be True if the launchbar is fully extended, and can be used, for example, to change the color of an instrument light. */
    'LAUNCHBAR HELD EXTENDED': {
        name: 'LAUNCHBAR HELD EXTENDED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Installed on aircraft before takeoff from a carrier catapult. Note that gear cannot retract with this extended. 100 = fully extended. */
    'LAUNCHBAR POSITION': {
        name: 'LAUNCHBAR POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** If this is set to True the launch bar switch has been engaged. */
    'LAUNCHBAR SWITCH': {
        name: 'LAUNCHBAR SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Maximum of 4. A model can contain more than 4 catapults, but only the first four will be read and recognized by the simulation. */
    'NUMBER OF CATAPULTS': {
        name: 'NUMBER OF CATAPULTS',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The nose angle, where 0 is fully up. */
    'CONCORDE NOSE ANGLE': {
        name: 'CONCORDE NOSE ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The visor nose handle position. */
    'CONCORDE VISOR NOSE HANDLE': {
        name: 'CONCORDE VISOR NOSE HANDLE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The visor position expressed as a percentage where 0.0 = up and 1.0 = extended/down.</p>
         */
    'CONCORDE VISOR POSITION PERCENT': {
        name: 'CONCORDE VISOR POSITION PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>This is a settable simvar meaning that it can both be read and set. Some of the simvars in this list are using this to lookup a value using two arguments (one argument in addition to the component index). For example to check the state of the connection between a "circuit.45" and the "bus.2" it would be written as follows:</p>
          <p><code class="inline">2 (&gt;A:BUS LOOKUP INDEX, Number) (A:CIRCUIT CONNECTION ON:45, Bool)</code></p>
          <p>It should be notes that when <code class="inline">BUS_LOOKUP_INDEX</code> is not set (ie: it is 0) then TRUE will be returned if <strong><em>any</em></strong> of your bus connections are on.</p>
         */
    'BUS LOOKUP INDEX': {
        name: 'BUS LOOKUP INDEX',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will be <code class="inline">true</code> if the bus breaker is pulled. Requires a <code class="inline"><a href="Aircraft_Electrics_Variables.htm#BUS_LOOKUP_INDEX">BUS_LOOKUP_INDEX</a></code> and a bus index. */
    'BUS BREAKER PULLED': {
        name: 'BUS BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This will be <code class="inline">true</code> if the bus is connected. Requires a <code class="inline"><a href="Aircraft_Electrics_Variables.htm#BUS_LOOKUP_INDEX">BUS_LOOKUP_INDEX</a></code> and a bus index. */
    'BUS CONNECTION ON': {
        name: 'BUS CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>This returns the percentage of the load output that is being consumed. This requires an alternator index when referencing.</p>
         */
    'ELECTRICAL GENALT LOAD': {
        name: 'ELECTRICAL GENALT LOAD',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The load handled by the alternator. This requires an alternator index when referencing. */
    'ELECTRICAL GENALT BUS AMPS': {
        name: 'ELECTRICAL GENALT BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** General alternator voltage. This requires an alternator index when referencing. */
    'ELECTRICAL GENALT BUS VOLTAGE': {
        name: 'ELECTRICAL GENALT BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The main bus voltage. Use a bus index when referencing. */
    'ELECTRICAL MAIN BUS VOLTAGE': {
        name: 'ELECTRICAL MAIN BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Avionics bus current */
    'ELECTRICAL AVIONICS BUS AMPS': {
        name: 'ELECTRICAL AVIONICS BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Avionics bus voltage */
    'ELECTRICAL AVIONICS BUS VOLTAGE': {
        name: 'ELECTRICAL AVIONICS BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Main bus current */
    'ELECTRICAL MAIN BUS AMPS': {
        name: 'ELECTRICAL MAIN BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p><strong>Deprecated, do not use!</strong></p>
          <p>Use ELECTRICAL BATTERY LOAD.</p>
         */
    'ELECTRICAL OLD CHARGING AMPS': {
        name: 'ELECTRICAL OLD CHARGING AMPS',
        units: 'Amps',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total load amps */
    'ELECTRICAL TOTAL LOAD AMPS': {
        name: 'ELECTRICAL TOTAL LOAD AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Is the aircraft using the new Electrical System or the legacy <span data-keyref="game_fx_short">FSX</span> one. */
    'NEW ELECTRICAL SYSTEM': {
        name: 'NEW ELECTRICAL SYSTEM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be <code class="inline">true</code> if the alternator breaker is pulled. Requires a <code class="inline"><a href="Aircraft_Electrics_Variables.htm#BUS_LOOKUP_INDEX">BUS_LOOKUP_INDEX</a></code> and an alternator index. */
    'ALTERNATOR BREAKER PULLED': {
        name: 'ALTERNATOR BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This will be <code class="inline">true</code> if the alternator is connected. Requires a <code class="inline"><a href="Aircraft_Electrics_Variables.htm#BUS_LOOKUP_INDEX">BUS_LOOKUP_INDEX</a></code> and an alternator index. */
    'ALTERNATOR CONNECTION ON': {
        name: 'ALTERNATOR CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The alternator (generator) switch position, <code class="inline">true</code> if the switch is ON. Requires an engine index, and the use of an alternator index when referencing. */
    'GENERAL ENG MASTER ALTERNATOR:index': {
        name: 'GENERAL ENG MASTER ALTERNATOR:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Bleed air pressure received by the engine from the <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a>. */
    'APU BLEED PRESSURE RECEIVED BY ENGINE': {
        name: 'APU BLEED PRESSURE RECEIVED BY ENGINE',
        units: 'Pounds per square inch (psi)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Set or get whether an <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a> is active (true) or not (false). Takes an index to be able to have multiple generators on a single <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a>. */
    'APU GENERATOR ACTIVE:index': {
        name: 'APU GENERATOR ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>Enables or disables the <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a> for an engine. Takes an index to be able to have multiple generators on a single <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a></p>
         */
    'APU GENERATOR SWITCH:index': {
        name: 'APU GENERATOR SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Will return true if the <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a> is on fire, or false otherwise. */
    'APU ON FIRE DETECTED': {
        name: 'APU ON FIRE DETECTED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Auxiliary power unit <a href="#" data-popovertext="This stands for 'Revolutions Per Minute' and is used to measure engine speed and power." data-rhwidget="TextPopOver">RPM</a>, as a percentage */
    'APU PCT RPM': {
        name: 'APU PCT RPM',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Auxiliary power unit starter, as a percentage */
    'APU PCT STARTER': {
        name: 'APU PCT STARTER',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Boolean, whether or not the <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a> is switched on. */
    'APU SWITCH': {
        name: 'APU SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>The volts from the <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a> to the selected engine. Takes an index to be able to have multiple generators on a single <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a>.</p>
         */
    'APU VOLTS:index': {
        name: 'APU VOLTS:index',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Boolean, returns whether or not the <a href="#" data-popovertext="This stands for 'Auxiliary Power Unit'  which is a device on an aircraft that provides energy for functions other than propulsion." data-rhwidget="TextPopOver">APU</a> attempts to provide Bleed Air. */
    'BLEED AIR APU': {
        name: 'BLEED AIR APU',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be <code class="inline">true</code> if the battery breaker is pulled. Requires a <code class="inline">BUS LOOKUP INDEX</code> and a battery index. */
    'BATTERY BREAKER PULLED': {
        name: 'BATTERY BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This will be <code class="inline">true</code> if the battery is connected. Requires a <code class="inline"><a href="Aircraft_Electrics_Variables.htm#BUS_LOOKUP_INDEX">BUS_LOOKUP_INDEX</a></code> and a battery index. */
    'BATTERY CONNECTION ON': {
        name: 'BATTERY CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Battery bus current */
    'ELECTRICAL BATTERY BUS AMPS': {
        name: 'ELECTRICAL BATTERY BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Battery bus voltage */
    'ELECTRICAL BATTERY BUS VOLTAGE': {
        name: 'ELECTRICAL BATTERY BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Battery capacity over max capacity, 100 is full. */
    'ELECTRICAL BATTERY ESTIMATED CAPACITY PCT': {
        name: 'ELECTRICAL BATTERY ESTIMATED CAPACITY PCT',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The load handled by the battery (negative values mean the battery is <em>receiving</em> current). Use a battery index when referencing. */
    'ELECTRICAL BATTERY LOAD': {
        name: 'ELECTRICAL BATTERY LOAD',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>The battery voltage. Use a battery index when referencing.</p>
         */
    'ELECTRICAL BATTERY VOLTAGE': {
        name: 'ELECTRICAL BATTERY VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current available when battery switch is turned off */
    'ELECTRICAL HOT BATTERY BUS AMPS': {
        name: 'ELECTRICAL HOT BATTERY BUS AMPS',
        units: 'Amperes',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Voltage available when battery switch is turned off */
    'ELECTRICAL HOT BATTERY BUS VOLTAGE': {
        name: 'ELECTRICAL HOT BATTERY BUS VOLTAGE',
        units: 'Volts',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The battery switch position, <code class="inline">true</code> if the switch is ON. Use a battery index when referencing. */
    'ELECTRICAL MASTER BATTERY': {
        name: 'ELECTRICAL MASTER BATTERY',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>All these SimVars can be used to get or set the breaker state for the electrical system (either true or false).</p>
          <p>If the breaker is popped (set to false), then the associated circuit will not receive electricity.</p>
         */
    'BREAKER ADF': {
        name: 'BREAKER ADF',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Bool */
    'BREAKER ALTFLD': {
        name: 'BREAKER ALTFLD',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER AUTOPILOT': {
        name: 'BREAKER AUTOPILOT',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER AVNBUS1': {
        name: 'BREAKER AVNBUS1',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER AVNBUS2': {
        name: 'BREAKER AVNBUS2',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER AVNFAN': {
        name: 'BREAKER AVNFAN',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER FLAP': {
        name: 'BREAKER FLAP',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER GPS': {
        name: 'BREAKER GPS',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER INST': {
        name: 'BREAKER INST',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER INSTLTS': {
        name: 'BREAKER INSTLTS',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER LTS PWR': {
        name: 'BREAKER LTS PWR',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Bool */
    'BREAKER NAVCOM1': {
        name: 'BREAKER NAVCOM1',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER NAVCOM2': {
        name: 'BREAKER NAVCOM2',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER NAVCOM3': {
        name: 'BREAKER NAVCOM3',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER TURNCOORD': {
        name: 'BREAKER TURNCOORD',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER WARN': {
        name: 'BREAKER WARN',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Bool */
    'BREAKER XPNDR': {
        name: 'BREAKER XPNDR',
        units: '   ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Is electrical power available to this circuit */
    'CIRCUIT AUTOPILOT ON': {
        name: 'CIRCUIT AUTOPILOT ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to this circuit */
    'CIRCUIT AUTO BRAKES ON': {
        name: 'CIRCUIT AUTO BRAKES ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Is electrical power available to this circuit. Please see the&nbsp;<a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#note_autofeather">Note On Autofeathering</a> for more information.</p>
         */
    'CIRCUIT AUTO FEATHER ON': {
        name: 'CIRCUIT AUTO FEATHER ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to this circuit */
    'CIRCUIT AVIONICS ON': {
        name: 'CIRCUIT AVIONICS ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be <code class="inline">true</code> if the circuit breaker is pulled. Requires a <code class="inline"><a href="Aircraft_Electrics_Variables.htm#BUS_LOOKUP_INDEX">BUS_LOOKUP_INDEX</a></code> and a circuit index. */
    'CIRCUIT BREAKER PULLED': {
        name: 'CIRCUIT BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>This will be <code class="inline">true</code> if the circuit is connected. Requires a <code class="inline"><a href="Aircraft_Electrics_Variables.htm#BUS_LOOKUP_INDEX">BUS_LOOKUP_INDEX</a></code> and a circuit index.</p>
         */
    'CIRCUIT CONNECTION ON': {
        name: 'CIRCUIT CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the flap motor circuit */
    'CIRCUIT FLAP MOTOR ON': {
        name: 'CIRCUIT FLAP MOTOR ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the gear motor circuit */
    'CIRCUIT GEAR MOTOR ON': {
        name: 'CIRCUIT GEAR MOTOR ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to gear warning circuit */
    'CIRCUIT GEAR WARNING ON': {
        name: 'CIRCUIT GEAR WARNING ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the general panel circuit */
    'CIRCUIT GENERAL PANEL ON': {
        name: 'CIRCUIT GENERAL PANEL ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the hydraulic pump circuit */
    'CIRCUIT HYDRAULIC PUMP ON': {
        name: 'CIRCUIT HYDRAULIC PUMP ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the marker beacon circuit */
    'CIRCUIT MARKER BEACON ON': {
        name: 'CIRCUIT MARKER BEACON ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not power is available to the NAVCOM1 circuit. */
    'CIRCUIT NAVCOM1 ON': {
        name: 'CIRCUIT NAVCOM1 ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not power is available to the NAVCOM2 circuit. */
    'CIRCUIT NAVCOM2 ON': {
        name: 'CIRCUIT NAVCOM2 ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not power is available to the NAVCOM3 circuit. */
    'CIRCUIT NAVCOM3 ON': {
        name: 'CIRCUIT NAVCOM3 ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be <code class="inline">true</code> if the given circuit is functioning. Use a circuit index when referencing. */
    'CIRCUIT ON': {
        name: 'CIRCUIT ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the pitot heat circuit */
    'CIRCUIT PITOT HEAT ON': {
        name: 'CIRCUIT PITOT HEAT ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This returns the percentage of use that the circuit is getting. This requires a circuit index when referencing. */
    'CIRCUIT POWER SETTING': {
        name: 'CIRCUIT POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Is electrical power available to the propeller sync circuit */
    'CIRCUIT PROP SYNC ON': {
        name: 'CIRCUIT PROP SYNC ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is electrical power available to the vacuum circuit */
    'CIRCUIT STANDBY VACUUM ON': {
        name: 'CIRCUIT STANDBY VACUUM ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The circuit switch position, <code class="inline">true</code> if the switch is ON. Use a circuit index when referencing. */
    'CIRCUIT SWITCH ON': {
        name: 'CIRCUIT SWITCH ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will be <code class="inline">true</code> if the given external power source is available. Use an external power index when referencing. */
    'EXTERNAL POWER AVAILABLE': {
        name: 'EXTERNAL POWER AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Boolean, The state of the breaker of an external power source */
    'EXTERNAL POWER BREAKER PULLED': {
        name: 'EXTERNAL POWER BREAKER PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Boolean, The state of the connection between a bus and an external power source */
    'EXTERNAL POWER CONNECTION ON': {
        name: 'EXTERNAL POWER CONNECTION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The external power switch position, <code class="inline">true</code> if the switch is ON. Use an external power index when referencing. */
    'EXTERNAL POWER ON': {
        name: 'EXTERNAL POWER ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether or not the indexed engine (see <a href="Aircraft_Engine_Variables.htm#note">note</a>) attempts to provide bleed air. */
    'BLEED AIR ENGINE:index': {
        name: 'BLEED AIR ENGINE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The bleed air system source controller for an indexed engine (see <a href="#note">note</a>). This will work as follows:</p>
          <ul>
            <li><span class="smallfont">When engines and APU are activated, it will return 0 because it is in Auto.</span></li>
            <li><span class="smallfont">If the APU is removed, it will return 3 for engines only.</span></li>
            <li><span class="smallfont">If instead the engines are removed, it would return 2 for the APU only.</span></li>
            <li><span class="smallfont">If the APU and engines are removed, it would return 1 (so, off).</span></li>
          </ul>
         */
    'BLEED AIR SOURCE CONTROL:index': {
        name: 'BLEED AIR SOURCE CONTROL:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'COWL FLAPS': {
        name: 'COWL FLAPS',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Selected engines (combination of bit flags) */
    'ENGINE CONTROL SELECT': {
        name: 'ENGINE CONTROL SELECT',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>True if engine mixture is available for prop engines. <strong>Deprecated, do not use (</strong><strong>mixture is always available)!</strong></p>
         */
    'ENGINE MIXURE AVAILABLE': {
        name: 'ENGINE MIXURE AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The engine primer position. */
    'ENGINE PRIMER': {
        name: 'ENGINE PRIMER',
        units: 'Position',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Engine type. */
    'ENGINE TYPE': {
        name: 'ENGINE TYPE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Anti-ice switch for the indexed engine (see <a href="#note">note</a>), true if enabled false otherwise. */
    'ENG ANTI ICE:index': {
        name: 'ENG ANTI ICE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the indexed engine (see <a href="#note">note</a>) is running, false otherwise. */
    'ENG COMBUSTION:index': {
        name: 'ENG COMBUSTION:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) cylinder head temperature. */
    'ENG CYLINDER HEAD TEMPERATURE:index': {
        name: 'ENG CYLINDER HEAD TEMPERATURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Exhaust gas temperature for the indexed engine (see <a href="#note">note</a>). */
    'ENG EXHAUST GAS TEMPERATURE:index': {
        name: 'ENG EXHAUST GAS TEMPERATURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Governed engine setting exhaust gas temperature for the indexed engine (see <a href="#note">note</a>). */
    'ENG EXHAUST GAS TEMPERATURE GES:index': {
        name: 'ENG EXHAUST GAS TEMPERATURE GES:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Failure flag for the indexed engine (see <a href="#note">note</a>) that has failed. */
    'ENG FAILED:index': {
        name: 'ENG FAILED:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Fuel flow reference in pounds per hour for the indexed engine (see <a href="#note">note</a>). */
    'ENG FUEL FLOW BUG POSITION:index': {
        name: 'ENG FUEL FLOW BUG POSITION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Engine fuel flow in gallons per hour for the indexed engine (see <a href="#note">note</a>). */
    'ENG FUEL FLOW GPH:index': {
        name: 'ENG FUEL FLOW GPH:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) fuel flow in pounds per hour. */
    'ENG FUEL FLOW PPH:index': {
        name: 'ENG FUEL FLOW PPH:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Engine fuel flow in pounds per hour.</p>
          <p><strong>Deprecated in favour of <code class="inline">ENG FUEL FLOW PPH</code>.</strong></p>
         */
    'ENG FUEL FLOW PPH SSL:index': {
        name: 'ENG FUEL FLOW PPH SSL:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) hydraulic pressure. */
    'ENG HYDRAULIC PRESSURE:index': {
        name: 'ENG HYDRAULIC PRESSURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>)hydraulic fluid quantity, as a percentage of total capacity */
    'ENG HYDRAULIC QUANTITY:index': {
        name: 'ENG HYDRAULIC QUANTITY:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) manifold pressure. */
    'ENG MANIFOLD PRESSURE:index': {
        name: 'ENG MANIFOLD PRESSURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) Maximum rpm. */
    'ENG MAX RPM': {
        name: 'ENG MAX RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) N1 rpm. */
    'ENG N1 RPM:index': {
        name: 'ENG N1 RPM:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) N2 rpm. */
    'ENG N2 RPM:index': {
        name: 'ENG N2 RPM:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) oil pressure. */
    'ENG OIL PRESSURE:index': {
        name: 'ENG OIL PRESSURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) oil quantity as a percentage of full capacity. */
    'ENG OIL QUANTITY:index': {
        name: 'ENG OIL QUANTITY:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) oil temperature. */
    'ENG OIL TEMPERATURE:index': {
        name: 'ENG OIL TEMPERATURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) on fire state. */
    'ENG ON FIRE:index': {
        name: 'ENG ON FIRE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) pressure ratio. */
    'ENG PRESSURE RATIO:index': {
        name: 'ENG PRESSURE RATIO:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Engine pressure ratio. <strong>Deprecated, do not use!</strong> */
    'ENG PRESSURE RATIO GES:index': {
        name: 'ENG PRESSURE RATIO GES:index',
        units: 'Scalar',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The indexed engine (see <a href="#note">note</a>) percentage maximum rated rpm - used for visual animation.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'ENG RPM ANIMATION PERCENT:index': {
        name: 'ENG RPM ANIMATION PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** RPM scalar value. <strong>Deprecated, do not use!</strong> */
    'ENG RPM SCALER:index': {
        name: 'ENG RPM SCALER:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) torque. */
    'ENG TORQUE:index': {
        name: 'ENG TORQUE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) vibration. */
    'ENG VIBRATION:index': {
        name: 'ENG VIBRATION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Estimated fuel flow to the indexed engine (see <a href="#note">note</a>) at cruise speed. */
    'ESTIMATED FUEL FLOW:index': {
        name: 'ESTIMATED FUEL FLOW:index',
        units: 'Pounds per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Full throttle thrust to weight ratio */
    'FULL THROTTLE THRUST TO WEIGHT RATIO': {
        name: 'FULL THROTTLE THRUST TO WEIGHT RATIO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) anti-ice switch state - 0 (FALSE) is off and 1 (TRUE) is on. */
    'GENERAL ENG ANTI ICE POSITION:index': {
        name: 'GENERAL ENG ANTI ICE POSITION:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Set the indexed engine (see <a href="#note">note</a>) combustion flag to TRUE or FALSE. Note that this will not only stop all combustion, but it will also set the engine <a href="#" data-popovertext="This stands for 'Revolutions Per Minute' and is used to measure engine speed and power." data-rhwidget="TextPopOver">RPM</a> to 0, regardless of the actual state of the simulation.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GENERAL ENG COMBUSTION:index': {
        name: 'GENERAL ENG COMBUSTION:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This SimVar is similar to <code class="inline">GENERAL ENG COMBUSTION</code>, in that it can also be used to enable or disable engine combustion. However this SimVar will <em>not</em> interfere with the current state of ths simulation. For example, if the aircraft has a turbine engine with <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#auto_ignition">auto_ignition</a></code> enabled or it's a propeller engine with magnetos, then in the subsequent simulation frames this SimVar may be set to 1 (TRUE) again as the engine restarts automatically. */
    'GENERAL ENG COMBUSTION EX1:index': {
        name: 'GENERAL ENG COMBUSTION EX1:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>Percent of maximum sound being created by the indexed engine (see <a href="#note">note</a>).</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GENERAL ENG COMBUSTION SOUND PERCENT:index': {
        name: 'GENERAL ENG COMBUSTION SOUND PERCENT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of total damage to the indexed engine (see <a href="#note">note</a>). */
    'GENERAL ENG DAMAGE PERCENT:index': {
        name: 'GENERAL ENG DAMAGE PERCENT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total elapsed time since the indexed engine (see <a href="#note">note</a>) was started. */
    'GENERAL ENG ELAPSED TIME:index': {
        name: 'GENERAL ENG ELAPSED TIME:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) exhaust gas temperature. */
    'GENERAL ENG EXHAUST GAS TEMPERATURE:index': {
        name: 'GENERAL ENG EXHAUST GAS TEMPERATURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) fail flag. */
    'GENERAL ENG FAILED:index': {
        name: 'GENERAL ENG FAILED:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Detects if a fire has been detected in an indexed engine (see <a href="#note">note</a>) or not. If 0 (FALSE) no fire has been detected and if 1 (TRUE) then it has. */
    'GENERAL ENG FIRE DETECTED:index': {
        name: 'GENERAL ENG FIRE DETECTED:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) fuel pressure. */
    'GENERAL ENG FUEL PRESSURE:index': {
        name: 'GENERAL ENG FUEL PRESSURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether the indexed engine (see <a href="#note">note</a>) fuel pump on (1, TRUE) or off (0, FALSE). */
    'GENERAL ENG FUEL PUMP ON:index': {
        name: 'GENERAL ENG FUEL PUMP ON:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Fuel pump switch state the indexed engine (see <a href="#note">note</a>). If 0 (FALSE) the pump is off and if 1 (TRUE) then it is on.</p>
         */
    'GENERAL ENG FUEL PUMP SWITCH:index': {
        name: 'GENERAL ENG FUEL PUMP SWITCH:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Equivalent to <code class="inline">GENERAL ENG FUEL PUMP SWITCH</code> but differentiates between ON and AUTO */
    'GENERAL ENG FUEL PUMP SWITCH EX1:index': {
        name: 'GENERAL ENG FUEL PUMP SWITCH EX1:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Fuel used since the indexed engine (see <a href="#note">note</a>) was last started. */
    'GENERAL ENG FUEL USED SINCE START:index': {
        name: 'GENERAL ENG FUEL USED SINCE START:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Fuel valve state for the indexed engine (see <a href="#note">note</a>). If 0 (FALSE) then the valve is closed and if 1 (TRUE) then it is open.</p>
         */
    'GENERAL ENG FUEL VALVE:index': {
        name: 'GENERAL ENG FUEL VALVE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Settable alternator (generator) on/off switch for the indexed engine (see <a href="#note">note</a>). */
    'GENERAL ENG GENERATOR ACTIVE:index': {
        name: 'GENERAL ENG GENERATOR ACTIVE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Alternator (generator) on/off switch state for the indexed engine (see <a href="#note">note</a>). */
    'GENERAL ENG GENERATOR SWITCH:index': {
        name: 'GENERAL ENG GENERATOR SWITCH:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This can be used to find the time since the indexed engine (see <a href="#note">note</a>) started running. Similar to <code class="inline">ElapsedTachometerTime</code>, this records the time the engine has been running, but instead of taking a % of the time based on the Pct/RPM this takes the full time, but only if a threshold RPM/speed is reached. You can set the thresholds using the <code class="inline">accumulated_time_hobbs_min_pct_rpm</code><br>
          and <code class="inline">accumulated_time_hobbs_min_knots</code> parameters in the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#GENERALENGINEDATA">[GENERALENGINEDATA]</a></code> section of the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm">engines.cfg</a></code> file. */
    'GENERAL ENG HOBBS ELAPSED TIME:index': {
        name: 'GENERAL ENG HOBBS ELAPSED TIME:index',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The alternator switch for a specific engine. Requires an engine index (1 - 4) when used. */
    'GENERAL ENG MASTER ALTERNATOR': {
        name: 'GENERAL ENG MASTER ALTERNATOR',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Maximum attained rpm for the indexed engine (see <a href="#note">note</a>). */
    'GENERAL ENG MAX REACHED RPM:index': {
        name: 'GENERAL ENG MAX REACHED RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent of max mixture lever position for the indexed engine (see <a href="#note">note</a>).</p>
         */
    'GENERAL ENG MIXTURE LEVER POSITION:index': {
        name: 'GENERAL ENG MIXTURE LEVER POSITION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of max oil capacity leaked for the indexed engine (see <a href="#note">note</a>). */
    'GENERAL ENG OIL LEAKED PERCENT:index': {
        name: 'GENERAL ENG OIL LEAKED PERCENT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) oil pressure. */
    'GENERAL ENG OIL PRESSURE:index': {
        name: 'GENERAL ENG OIL PRESSURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) oil temperature. */
    'GENERAL ENG OIL TEMPERATURE:index': {
        name: 'GENERAL ENG OIL TEMPERATURE:index',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Percent of max rated rpm for the indexed engine (see <a href="#note">note</a>).</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GENERAL ENG PCT MAX RPM:index': {
        name: 'GENERAL ENG PCT MAX RPM:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Percent of max prop lever position for the indexed engine (see <a href="#note">note</a>).</p>
         */
    'GENERAL ENG PROPELLER LEVER POSITION:index': {
        name: 'GENERAL ENG PROPELLER LEVER POSITION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will return 1 (TRUE) if the reverse thruster is engaged, or 0 (FALSE) otherwise. */
    'GENERAL ENG REVERSE THRUST ENGAGED': {
        name: 'GENERAL ENG REVERSE THRUST ENGAGED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The RPM for an indexed engine (see <a href="#note">note</a>).</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GENERAL ENG RPM:index': {
        name: 'GENERAL ENG RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) starter on/off state. */
    'GENERAL ENG STARTER:index': {
        name: 'GENERAL ENG STARTER:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>True if the indexed engine (see <a href="#note">note</a>) starter is active.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GENERAL ENG STARTER ACTIVE:index': {
        name: 'GENERAL ENG STARTER ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Percent of max throttle position for the indexed engine (see <a href="#note">note</a>). The lower limit will be clamped to the value set for <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#min_throttle_limit">min_throttle_limit</a></code>.</p>
         */
    'GENERAL ENG THROTTLE LEVER POSITION:index': {
        name: 'GENERAL ENG THROTTLE LEVER POSITION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current mode of the managed throttle for the indexed engine (see <a href="#note">note</a>). */
    'GENERAL ENG THROTTLE MANAGED MODE:index': {
        name: 'GENERAL ENG THROTTLE MANAGED MODE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Aircraft master ignition switch (grounds all engines magnetos). */
    'MASTER IGNITION SWITCH': {
        name: 'MASTER IGNITION SWITCH',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The maximum <a href="#" data-popovertext="This stands for 'Exhaust Gas Temperature'. In a piston engine, EGT is a measurement of the temperature of the exhaust gases at the exhaust manifold. In a turbine engine it is the temperature of the turbine exhaust gases as they leave the turbine unit. EGT gauges can be found on some aircraft for the pilot to monitor the vehicle's air-fuel ratio. " data-rhwidget="TextPopOver">EGT</a>, as set using the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#egt_peak_temperature">egt_peak_temperature</a></code> parameter in the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm">engines.cfg</a></code> file. */
    'MAX EGT': {
        name: 'MAX EGT',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The maximum oil temperature, as set using the parameter <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#oil_temp_heating_constant">oil_temp_heating_constant</a></code> in the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm">engines.cfg</a></code> file. */
    'MAX OIL TEMPERATURE': {
        name: 'MAX OIL TEMPERATURE',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum rated rpm for the indexed engine (see <a href="#note">note</a>). */
    'MAX RATED ENGINE RPM': {
        name: 'MAX RATED ENGINE RPM',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Number of engines (minimum 0, maximum 4) */
    'NUMBER OF ENGINES': {
        name: 'NUMBER OF ENGINES',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'OIL AMOUNT': {
        name: 'OIL AMOUNT',
        units: 'FS7 Oil Quantity',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Auto-feather arming switch for the indexed engine (see <a href="#note">note</a>). Please see the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#note_autofeather">Note On Autofeathering</a> for more information. */
    'PANEL AUTO FEATHER SWITCH:index': {
        name: 'PANEL AUTO FEATHER SWITCH:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if prop auto cruise active */
    'PROP AUTO CRUISE ACTIVE': {
        name: 'PROP AUTO CRUISE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Auto-feather armed state for the indexed engine (see <a href="#note">note</a>). */
    'PROP AUTO FEATHER ARMED:index': {
        name: 'PROP AUTO FEATHER ARMED:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The "prop beta" is the pitch of the blades of the propeller, and this can be used to retrieve the current pitch setting, per indexed engine (see <a href="#note">note</a>). */
    'PROP BETA:index': {
        name: 'PROP BETA:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This can be used to enable the propeller forced beta mode (1, TRUE) or disable it (0, FALSE), when being written to. When being read from, it will return TRUE (1) if the forced beta mode is enabled or FALSE (0) if it isn't. When enabled, the <code class="inline"><a href="Aircraft_Engine_Variables.htm#PROP BETA FORCED POSITION">PROP BETA FORCED POSITION</a></code> value will be used to drive the prop beta, while the internal coded simulation logic is used when this is disabled. */
    'PROP BETA FORCED ACTIVE': {
        name: 'PROP BETA FORCED ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Get or set the beta at which the prop is forced. Only valid when <code class="inline"><a href="Aircraft_Engine_Variables.htm#PROP BETA FORCED ACTIVE">PROP BETA FORCED ACTIVE</a></code> is TRUE (1). */
    'PROP BETA FORCED POSITION': {
        name: 'PROP BETA FORCED POSITION',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "prop beta" is the pitch of the blades of the propeller. This retrieves the maximum possible pitch value for <em>all </em>engines. */
    'PROP BETA MAX': {
        name: 'PROP BETA MAX',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "prop beta" is the pitch of the blades of the propeller. This retrieves the minimum possible pitch value for <em>all </em>engines. */
    'PROP BETA MIN': {
        name: 'PROP BETA MIN',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "prop beta" is the pitch of the blades of the propeller. This retrieves the minimum possible pitch value when the propeller is in reverse for <em>all </em>engines. */
    'PROP BETA MIN REVERSE': {
        name: 'PROP BETA MIN REVERSE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if prop deice switch on for the indexed engine (see <a href="#note">note</a>). */
    'PROP DEICE SWITCH:index': {
        name: 'PROP DEICE SWITCH:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This will return the feathered state of the propeller for an indexed engine (see <a href="#note">note</a>). The state is either feathered (true) or not (false). */
    'PROP FEATHERED:index': {
        name: 'PROP FEATHERED:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Feathering inhibit flag for the indexed engine (see <a href="#note">note</a>). */
    'PROP FEATHERING INHIBIT:index': {
        name: 'PROP FEATHERING INHIBIT:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Prop feather switch for the indexed engine (see <a href="#note">note</a>). */
    'PROP FEATHER SWITCH:index': {
        name: 'PROP FEATHER SWITCH:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Percent of max rated rpm for the indexed engine (see <a href="#note">note</a>).</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'PROP MAX RPM PERCENT:index': {
        name: 'PROP MAX RPM PERCENT:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Prop rotation angle.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'PROP ROTATION ANGLE': {
        name: 'PROP ROTATION ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Propeller rpm for the indexed engine (see <a href="#note">note</a>). */
    'PROP RPM:index': {
        name: 'PROP RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if prop sync is active the indexed engine (see <a href="#note">note</a>). */
    'PROP SYNC ACTIVE:index': {
        name: 'PROP SYNC ACTIVE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Corrected prop correction input on slaved engine for the indexed engine (see <a href="#note">note</a>). */
    'PROP SYNC DELTA LEVER:index': {
        name: 'PROP SYNC DELTA LEVER:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Propeller thrust for the indexed engine (see <a href="#note">note</a>).</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'PROP THRUST:index': {
        name: 'PROP THRUST:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'PROPELLER ADVANCED SELECTION': {
        name: 'PROPELLER ADVANCED SELECTION',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This checks if the shutoff valve to the engine has been pulled (true) or not (false). When pulled piston engines will be blocked from getting any fuel. */
    'SHUTOFF VALVE PULLED': {
        name: 'SHUTOFF VALVE PULLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent throttle defining lower limit (negative for reverse thrust equipped airplanes). This will be the value defined for the&nbsp;<code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#min_throttle_limit">min_throttle_limit</a></code> parameter. */
    'THROTTLE LOWER LIMIT': {
        name: 'THROTTLE LOWER LIMIT',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Afterburner state for the indexed engine (see <a href="#note">note</a>).</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'TURB ENG AFTERBURNER:index': {
        name: 'TURB ENG AFTERBURNER:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The percentage that the afterburner is running at.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'TURB ENG AFTERBURNER PCT ACTIVE:index': {
        name: 'TURB ENG AFTERBURNER PCT ACTIVE:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The stage of the afterburner, or 0 if the afterburner is not active.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'TURB ENG AFTERBURNER STAGE ACTIVE:index': {
        name: 'TURB ENG AFTERBURNER STAGE ACTIVE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Bleed air pressure for the indexed engine (see <a href="#note">note</a>). */
    'TURB ENG BLEED AIR:index': {
        name: 'TURB ENG BLEED AIR:index',
        units: 'Pounds per square inch (psi',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Effective commanded N1 for the indexed turbine engine (see <a href="#note">note</a>).</p>
         */
    'TURB ENG COMMANDED N1:index': {
        name: 'TURB ENG COMMANDED N1:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>When the throttle is on idle position, this sets the condition levers to one of 3 positions to define the idle N1 target for the indexed engine (see <a href="#note">note</a>):</p>
          <ul>
            <li>Down position is the cut-off position that cuts the fuel to the engine, effectively shutting down the engine.</li>
            <li>Middle position requires N1 to reach the low idle value when throttle is in idle position (low idle value can be checked using the <code class="inline"><a href="Aircraft_Engine_Variables.htm#TURB_ENG_LOW_IDLE">TURB_ENG_LOW_IDLE</a></code> SimVar).</li>
            <li>High position requires N1 to reach the high idle value when throttle is in idle position (high idle value can be checked using the <code class="inline"><a href="Aircraft_Engine_Variables.htm#TURB_ENG_HIGH_IDLE">TURB_ENG_HIGH_IDLE</a></code> SimVar).</li>
          </ul>
          <p>Note that this option requires several settings from the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm">engines.cfg</a> file to be set to specific values before working correctly:</p>
          <ul>
            <li><code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#DisableMixtureControls">DisableMixtureControls</a></code> needs to be set to 1 (TRUE).</li>
            <li><code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#tp_idle_range">tp_idle_range</a></code> should be set to 0 (since there is no mixture setting).</li>
            <li><code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#idle_fuel_flow">idle_fuel_flow</a></code> and <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#idle_high_fuel_flow">idle_high_fuel_flow</a></code> must be set to the same value (since there is no mixture setting to induce a variation between the 2).</li>
            <li><code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#low_idle_n1">low_idle_n1</a></code> and <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#high_idle_n1">high_idle_n1</a></code> to be correctly set.</li>
          </ul>
         */
    'TURB ENG CONDITION LEVER POSITION:index': {
        name: 'TURB ENG CONDITION LEVER POSITION:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Corrected fuel flow for the indexed engine (see <a href="#note">note</a>). */
    'TURB ENG CORRECTED FF:index': {
        name: 'TURB ENG CORRECTED FF:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>The indexed turbine engine (see <a href="#note">note</a>) corrected N1.</p>
         */
    'TURB ENG CORRECTED N1:index': {
        name: 'TURB ENG CORRECTED N1:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>The indexed turbine engine (see <a href="#note">note</a>) corrected N2.</p>
         */
    'TURB ENG CORRECTED N2:index': {
        name: 'TURB ENG CORRECTED N2:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The amount of free torque for the indexed turbine engine (see <a href="#note">note</a>). */
    'TURB ENG FREE TURBINE TORQUE:index': {
        name: 'TURB ENG FREE TURBINE TORQUE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if fuel is available for the indexed engine (see <a href="#note">note</a>). */
    'TURB ENG FUEL AVAILABLE:index': {
        name: 'TURB ENG FUEL AVAILABLE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is used to control the fuel efficiency loss of the indexed engine, from 0 - no fuel efficiency loss - to 100 - double the fuel consumption. */
    'TURB ENG FUEL EFFICIENCY LOSS:index': {
        name: 'TURB ENG FUEL EFFICIENCY LOSS:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) fuel flow rate. */
    'TURB ENG FUEL FLOW PPH:index': {
        name: 'TURB ENG FUEL FLOW PPH:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Retrieves the high idle N1 value to be reached by the the indexed turboprop engine (see <a href="#note">note</a>) with throttle in idle position and condition lever in high idle position (condition lever position can be checked or set using the <code class="inline"><a href="#TURB_ENG_CONDITION_LEVER_POSITION">TURB_ENG_CONDITION_LEVER_POSITION</a></code> SimVar). */
    'TURB ENG HIGH IDLE:index': {
        name: 'TURB ENG HIGH IDLE:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the the indexed turbine engine (see <a href="#note">note</a>) ignition switch is on. */
    'TURB ENG IGNITION SWITCH:index': {
        name: 'TURB ENG IGNITION SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Position of the the indexed turbine engine (see <a href="#note">note</a>) Ignition Switch. Similar to <code class="inline">TURB_ENG_IGNITION_SWITCH</code> but differentiates between ON and AUTO. */
    'TURB ENG IGNITION SWITCH EX1:index': {
        name: 'TURB ENG IGNITION SWITCH EX1:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the ignition system is currently running for the indexed engine (see <a href="#note">note</a>). Depends on <code class="inline">TURB_ENG_IGNITION_SWITCH_EX1</code> Enum, the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm">cfg</a> var <code class="inline">ignition_auto_type</code> and current state of the plane. */
    'TURB ENG IS IGNITING:index': {
        name: 'TURB ENG IS IGNITING:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Retrieve or set the <a href="#" data-popovertext="The 'Interstage Turbine Temperature' is the temperature of the exhaust gases between the high pressure and the low pressure turbines. The gas temperature is measured by a number of thermocouples mounted in the exhaust stream and is presented on a flight deck gauge in either degrees Fahrenheit or degrees Celcius." data-rhwidget="TextPopOver">ITT</a> for the indexed engine (see <a href="#note">note</a>). */
    'TURB ENG ITT:index': {
        name: 'TURB ENG ITT:index',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This is used to control the ITT cooling efficiency loss of the indexed engine, from 0 - no cooling efficiency loss - to 100 -engine recieves no ITT cooling. */
    'TURB ENG ITT COOLING EFFICIENCY LOSS:index': {
        name: 'TURB ENG ITT COOLING EFFICIENCY LOSS:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) jet thrust. */
    'TURB ENG JET THRUST:index': {
        name: 'TURB ENG JET THRUST:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Retrieves the low idle N1 value to be reached by the the indexed turboprop engine (see <a href="#note">note</a>) with throttle in idle position and condition lever in low idle position (condition lever position can be checked or set using the <code class="inline"><a href="Aircraft_Engine_Variables.htm#TURB_ENG_CONDITION_LEVER_POSITION">TURB_ENG_CONDITION_LEVER_POSITION</a></code> SimVar). */
    'TURB ENG LOW IDLE:index': {
        name: 'TURB ENG LOW IDLE:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the turbine engine master starter switch is on, false otherwise. */
    'TURB ENG MASTER STARTER SWITCH': {
        name: 'TURB ENG MASTER STARTER SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent of max rated torque for the indexed engine (see <a href="#note">note</a>). */
    'TURB ENG MAX TORQUE PERCENT:index': {
        name: 'TURB ENG MAX TORQUE PERCENT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>The indexed turbine engine (see <a href="#note">note</a>) N1 value.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'TURB ENG N1:index': {
        name: 'TURB ENG N1:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This is used to control the N1 loss of the indexed engine, from 0 - no N1 loss - to 100 - 100% N1 loss. */
    'TURB ENG N1 LOSS:index': {
        name: 'TURB ENG N1 LOSS:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>The indexed turbine engine (see <a href="#note">note</a>) N2 value.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'TURB ENG N2:index': {
        name: 'TURB ENG N2:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Number of tanks currently being used by the indexed engine (see <a href="#note">note</a>). */
    'TURB ENG NUM TANKS USED:index': {
        name: 'TURB ENG NUM TANKS USED:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) pressure ratio. */
    'TURB ENG PRESSURE RATIO:index': {
        name: 'TURB ENG PRESSURE RATIO:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent thrust of primary nozzle for the indexed engine (see <a href="#note">note</a>). */
    'TURB ENG PRIMARY NOZZLE PERCENT:index': {
        name: 'TURB ENG PRIMARY NOZZLE PERCENT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Percent thrust reverser nozzles deployed for the indexed engine (see <a href="#note">note</a>).</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'TURB ENG REVERSE NOZZLE PERCENT:index': {
        name: 'TURB ENG REVERSE NOZZLE PERCENT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Fuel tanks used by the indexed engine (see <a href="#note">note</a>), one or more of the following bit flags:
          <ol class="minitoc-list">
            <li>Center 1 Bit 0</li>
            <li>Center 2 Bit 1</li>
            <li>Center 3 Bit 2</li>
            <li>Left Main Bit 3</li>
            <li>Left Aux Bit 4</li>
            <li>Left Tip Bit 5</li>
            <li>Right Main Bit 6</li>
            <li>Right Aux Bit 7</li>
            <li>Right Tip Bit 8</li>
            <li>External 1 Bit 9</li>
            <li>External 2 Bit 10</li>
          </ol>
         */
    'TURB ENG TANKS USED:index': {
        name: 'TURB ENG TANKS USED:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Fuel tank selected for the indexed engine (see <a href="#note">note</a>). See <a href="Aircraft_Engine_Variables.htm#fuel-tank-selection">Fuel Tank Selection</a> for a list of values. */
    'TURB ENG TANK SELECTOR:index': {
        name: 'TURB ENG TANK SELECTOR:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The indexed turbine engine (see <a href="#note">note</a>) commanded N1 for current throttle position.</p>
         */
    'TURB ENG THROTTLE COMMANDED N1:index': {
        name: 'TURB ENG THROTTLE COMMANDED N1:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This can be used to control the thrust efficiency loss of the indexed engine, where a value of 0 is 100% of available thrust, and 100 is 0% available thrust. */
    'TURB ENG THRUST EFFICIENCY LOSS:index': {
        name: 'TURB ENG THRUST EFFICIENCY LOSS:index',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed turbine engine (see <a href="#note">note</a>) vibration value. */
    'TURB ENG VIBRATION:index': {
        name: 'TURB ENG VIBRATION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Retrieve the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#itt_peak_temperature">itt_peak_temperature</a> as set in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm">engines.cfg</a> file. */
    'TURB MAX ITT': {
        name: 'TURB MAX ITT',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Carburetor temperature the indexed engine (see <a href="#note">note</a>). */
    'RECIP CARBURETOR TEMPERATURE:index': {
        name: 'RECIP CARBURETOR TEMPERATURE:index',
        units: 'Celsius',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Alternate air control the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG ALTERNATE AIR POSITION:index': {
        name: 'RECIP ENG ALTERNATE AIR POSITION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The maximum quantity of water/methanol mixture in the <a href="#" data-popovertext="This stands for &quot;Anti-Detonation Injection&quot; system, which is a system that uses a water/methanol mix to cool the combustion event in an engine and slow the propagation of the flame front, preventing explosive detonation when the fuel/air mixture encounters the hot surfaces of cylinder walls, valves and pistons." data-rhwidget="TextPopOver">ADI</a> tank for the indexed engine (see <a href="#note">note</a>). This value is set as part of the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#ANTIDETONATION">[ANTIDETONATION_SYSTEM.N]</a></code> section in the aircraft configuration files. */
    'RECIP ENG ANTIDETONATION TANK MAX QUANTITY:index': {
        name: 'RECIP ENG ANTIDETONATION TANK MAX QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The quantity of water/methanol mixture currently in the <a href="#" data-popovertext="This stands for &quot;Anti-Detonation Injection&quot; system, which is a system that uses a water/methanol mix to cool the combustion event in an engine and slow the propagation of the flame front, preventing explosive detonation when the fuel/air mixture encounters the hot surfaces of cylinder walls, valves and pistons." data-rhwidget="TextPopOver">ADI</a> tank for the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG ANTIDETONATION TANK QUANTITY:index': {
        name: 'RECIP ENG ANTIDETONATION TANK QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The status of the <a href="#" data-popovertext="This stands for &quot;Anti-Detonation Injection&quot; system, which is a system that uses a water/methanol mix to cool the combustion event in an engine and slow the propagation of the flame front, preventing explosive detonation when the fuel/air mixture encounters the hot surfaces of cylinder walls, valves and pistons." data-rhwidget="TextPopOver">ADI</a> tank valve for the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG ANTIDETONATION TANK VALVE:index': {
        name: 'RECIP ENG ANTIDETONATION TANK VALVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This gives the actual flow rate of the Anti Detonation system for the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG ANTIDETONATION FLOW RATE:index': {
        name: 'RECIP ENG ANTIDETONATION FLOW RATE:index',
        units: 'Gallons per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Brake power produced by the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG BRAKE POWER:index': {
        name: 'RECIP ENG BRAKE POWER:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent coolant available for the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG COOLANT RESERVOIR PERCENT:index': {
        name: 'RECIP ENG COOLANT RESERVOIR PERCENT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Percent cowl flap opened for the indexed engine (see <a href="#note">note</a>).</p>
         */
    'RECIP ENG COWL FLAP POSITION:index': {
        name: 'RECIP ENG COWL FLAP POSITION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Engine cylinder head temperature for the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG CYLINDER HEAD TEMPERATURE:index': {
        name: 'RECIP ENG CYLINDER HEAD TEMPERATURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Index high 16 bits is engine number, low16 cylinder number, both indexed from 1. */
    'RECIP ENG CYLINDER HEALTH:index': {
        name: 'RECIP ENG CYLINDER HEALTH:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Set to 1 (TRUE) if the indexed engine (see <a href="#note">note</a>) is detonating. */
    'RECIP ENG DETONATING:index': {
        name: 'RECIP ENG DETONATING:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether emergency boost is active (1, TRUE) or not (0, FALSE) for the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG EMERGENCY BOOST ACTIVE:index': {
        name: 'RECIP ENG EMERGENCY BOOST ACTIVE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>The elapsed time that emergency boost has been active on the indexed engine (see <a href="#note">note</a>). The timer will start when boost is first activated.</p>
          <p><span class="note"><strong>IMPORTANT!</strong> This timer does not reset. So if you set your time limit in the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm">engines.cfg</a></code> file to 315s and you spend 2 minutes with boost active, then pull back on the throttle for 1 minute, then engage boost again for 2 minutes, the simulation will consider that you spent <strong>4</strong> minutes with boost active. The 1 minute pause is not taken into account.</span></p>
         */
    'RECIP ENG EMERGENCY BOOST ELAPSED TIME:index': {
        name: 'RECIP ENG EMERGENCY BOOST ELAPSED TIME:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the Engine Master switch is active on an indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG ENGINE MASTER SWITCH:index': {
        name: 'RECIP ENG ENGINE MASTER SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if fuel is available for the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG FUEL AVAILABLE:index': {
        name: 'RECIP ENG FUEL AVAILABLE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) fuel flow. */
    'RECIP ENG FUEL FLOW:index': {
        name: 'RECIP ENG FUEL FLOW:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Number of tanks currently being used by the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG FUEL NUMBER TANKS USED:index': {
        name: 'RECIP ENG FUEL NUMBER TANKS USED:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Fuel tanks used by the indexed engine (see <a href="#note">note</a>), one or more of the following bit flags:
          <ol class="minitoc-list">
            <li>Center 1 Bit 0</li>
            <li>Center 2 Bit 1</li>
            <li>Center 3 Bit 2</li>
            <li>Left Main Bit 3</li>
            <li>Left Aux Bit 4</li>
            <li>Left Tip Bit 5</li>
            <li>Right Main Bit 6</li>
            <li>Right Aux Bit 7</li>
            <li>Right Tip Bit 8</li>
            <li>External 1 Bit 9</li>
            <li>External 2 Bit 10</li>
          </ol>
         */
    'RECIP ENG FUEL TANKS USED:index': {
        name: 'RECIP ENG FUEL TANKS USED:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Fuel tank selected for the indexed engine (see <a href="#note">note</a>). See <a href="#fuel-tank-selection">Fuel Tank Selection</a> for a list of values. */
    'RECIP ENG FUEL TANK SELECTOR:index': {
        name: 'RECIP ENG FUEL TANK SELECTOR:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the Glow Plug is active on the indexed engine (see <a href="#note">note</a>).. */
    'RECIP ENG GLOW PLUG ACTIVE:index': {
        name: 'RECIP ENG GLOW PLUG ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Left magneto state for the indexed engine (see <a href="#note">note</a>).</p>
         */
    'RECIP ENG LEFT MAGNETO:index': {
        name: 'RECIP ENG LEFT MAGNETO:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) manifold pressure. */
    'RECIP ENG MANIFOLD PRESSURE:index': {
        name: 'RECIP ENG MANIFOLD PRESSURE:index',
        units: 'Pounds per square inch (psi',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The maximum quantity of nitrous permitted per indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG NITROUS TANK MAX QUANTITY:index': {
        name: 'RECIP ENG NITROUS TANK MAX QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The quantity of nitrous per indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG NITROUS TANK QUANTITY:index': {
        name: 'RECIP ENG NITROUS TANK QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The statte of the nitrous tank valve for the indexed engine (see <a href="#note">note</a>). Either 1 (TRUE) for open or 0 (FALSE) for closed. */
    'RECIP ENG NITROUS TANK VALVE': {
        name: 'RECIP ENG NITROUS TANK VALVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The number of cylinders for the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG NUM CYLINDERS:index': {
        name: 'RECIP ENG NUM CYLINDERS:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The number of cylinders that have failed in the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG NUM CYLINDERS FAILED:index': {
        name: 'RECIP ENG NUM CYLINDERS FAILED:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) primer state. */
    'RECIP ENG PRIMER:index': {
        name: 'RECIP ENG PRIMER:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) radiator temperature. */
    'RECIP ENG RADIATOR TEMPERATURE:index': {
        name: 'RECIP ENG RADIATOR TEMPERATURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>The indexed engine (see <a href="#note">note</a>) right magneto state.</p>
         */
    'RECIP ENG RIGHT MAGNETO:index': {
        name: 'RECIP ENG RIGHT MAGNETO:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Torque produced by the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG STARTER TORQUE:index': {
        name: 'RECIP ENG STARTER TORQUE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns which of the supercharger gears is engaged for the indexed engine (see <a href="#note">note</a>). */
    'RECIP ENG SUPERCHARGER ACTIVE GEAR:index': {
        name: 'RECIP ENG SUPERCHARGER ACTIVE GEAR:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indexed engine (see <a href="#note">note</a>) turbine inlet temperature. */
    'RECIP ENG TURBINE INLET TEMPERATURE:index': {
        name: 'RECIP ENG TURBINE INLET TEMPERATURE:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The indexed engine (see <a href="#note">note</a>) turbo failed state. */
    'RECIP ENG TURBOCHARGER FAILED:index': {
        name: 'RECIP ENG TURBOCHARGER FAILED:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** When the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm">engines.cfg</a></code> parameter <code class="inline">turbocharged</code> is TRUE, this SimVar will return the percentage that the turbo waste gate is closed for the indexed engine (see <a href="#note">note</a>). If the turbocharged variable is FALSE <em>and</em> the <code class="inline">manifold_pressure_regulator</code> parameter is TRUE, then this will return the percentage that the manifold pressure regulator is closed for the indexed engine. */
    'RECIP ENG WASTEGATE POSITION:index': {
        name: 'RECIP ENG WASTEGATE POSITION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will return the cylinder head temperature value set by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm#cht_heating_constant">cht_heating_constant</a></code> parameter in the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/engines_cfg.htm">engines.cfg</a></code> file. */
    'RECIP MAX CHT': {
        name: 'RECIP MAX CHT',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Fuel / Air mixture ratio for the indexed engine (see <a href="#note">note</a>). */
    'RECIP MIXTURE RATIO:index': {
        name: 'RECIP MIXTURE RATIO:index',
        units: 'Ratio',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Beta dot */
    'BETA DOT': {
        name: 'BETA DOT',
        units: 'Radians per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Design decision altitude above mean sea level */
    'DECISION ALTITUDE MSL': {
        name: 'DECISION ALTITUDE MSL',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Design decision height */
    'DECISION HEIGHT': {
        name: 'DECISION HEIGHT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>This design constant represents the optimal altitude the aircraft should maintain when in cruise. It is derived from the <code class="inline">cruise_alt</code> setting in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h2">[REFERENCE SPEEDS]</a> section of the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flightmodel.cfg</a>. Default is 1500ft.</span> */
    'DESIGN CRUISE ALT': {
        name: 'DESIGN CRUISE ALT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>This design constant represents the spawn altitude for the aircraft when spawning in cruise. It is derived from the <code class="inline">spawn_cruise_altitude</code> setting in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h2">[REFERENCE SPEEDS]</a> section of the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flightmodel.cfg</a>. Default is 1500ft.</span> */
    'DESIGN SPAWN ALTITUDE CRUISE': {
        name: 'DESIGN SPAWN ALTITUDE CRUISE',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>This design constant represents the spawn altitude for the aircraft when spawning in descent. It is derived from the <code class="inline">spawn_descent_altitude</code> setting in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h2">[REFERENCE SPEEDS]</a> section of the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flightmodel.cfg</a>. Default is 500ft.</span> */
    'DESIGN SPAWN ALTITUDE DESCENT': {
        name: 'DESIGN SPAWN ALTITUDE DESCENT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>This design constant represents the optimal climb speed for the aircraft. It is derived from the <code class="inline">climb_speed</code> setting in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h2">[REFERENCE SPEEDS]</a> section of the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flightmodel.cfg</a>. Default value is -1.</span> */
    'DESIGN SPEED CLIMB': {
        name: 'DESIGN SPEED CLIMB',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>This design constant represents the minimum speed required for aircraft rotation. It is derived from the <code class="inline">rotation_speed_min</code> setting in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h2">[REFERENCE SPEEDS]</a> section of the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flightmodel.cfg</a>. Default value is -1.</span> */
    'DESIGN SPEED MIN ROTATION': {
        name: 'DESIGN SPEED MIN ROTATION',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>This design constant represents the aircraft ideal cruising speed. It is derived from the <code class="inline">cruise_speed</code> setting in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h2">[REFERENCE SPEEDS]</a> section of the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flightmodel.cfg</a>. The default value is computed an internal function that uses the estimated cruise altitude and estimated cruise percent power, according of the engine type, the number of engines, the density, the wing area and some drag parameters. Normally this value is set in the CFG file and the default value is never used.</span> */
    'DESIGN SPEED VC': {
        name: 'DESIGN SPEED VC',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>This design constant represents the the stall speed when flaps are fully extended. It is derived from the <code class="inline">full_flaps_stall_speed</code> setting in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h2">[REFERENCE SPEEDS]</a> section of the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flightmodel.cfg</a>. Default value is 0.8 x VS.</span> */
    'DESIGN SPEED VS0': {
        name: 'DESIGN SPEED VS0',
        units: 'kias',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>This design constant represents the stall speed when flaps are fully retracted. It is derived from the <code class="inline">flaps_up_stall_speed</code> setting in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h2">[REFERENCE SPEEDS]</a> section of the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flightmodel.cfg</a>. Default value is 0.</span> */
    'DESIGN SPEED VS1': {
        name: 'DESIGN SPEED VS1',
        units: 'kias',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>This design constant represents the aircraft ideal takoff speed. It is derived from the <code class="inline">takeoff_speed</code> setting in the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h2">[REFERENCE SPEEDS]</a> section of the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flightmodel.cfg</a>.</span> */
    'DESIGN TAKEOFF SPEED': {
        name: 'DESIGN TAKEOFF SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Dynamic pressure */
    'DYNAMIC PRESSURE': {
        name: 'DYNAMIC PRESSURE',
        units: 'Pounds per square foot (psf)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Estimated cruise speed */
    'ESTIMATED CRUISE SPEED': {
        name: 'ESTIMATED CRUISE SPEED',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current g force */
    'G FORCE': {
        name: 'G FORCE',
        units: 'GForce',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This returns the setting of the G-limiter, as set using the <code class="inline"><a href="../../../Content_Configuration/Flights_And_Missions/Flight_Definitions.htm#GLimiterSetting">GLimiterSetting</a></code> parameter. */
    'G LIMITER SETTING': {
        name: 'G LIMITER SETTING',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Angle of attack */
    'INCIDENCE ALPHA': {
        name: 'INCIDENCE ALPHA',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Sideslip angle */
    'INCIDENCE BETA': {
        name: 'INCIDENCE BETA',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the aircraft is a taildragger */
    'IS TAIL DRAGGER': {
        name: 'IS TAIL DRAGGER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Linear CL alpha */
    'LINEAR CL ALPHA': {
        name: 'LINEAR CL ALPHA',
        units: 'Per radian',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum design mach */
    'MACH MAX OPERATE': {
        name: 'MACH MAX OPERATE',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum G force attained */
    'MAX G FORCE': {
        name: 'MAX G FORCE',
        units: 'Gforce',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Minimum drag velocity,&nbsp;<span>in clean, with no input and no gears, when at 10000ft.</span> */
    'MIN DRAG VELOCITY': {
        name: 'MIN DRAG VELOCITY',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Minimum G force attained */
    'MIN G FORCE': {
        name: 'MIN G FORCE',
        units: 'Gforce',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'SEMIBODY LOADFACTOR X': {
        name: 'SEMIBODY LOADFACTOR X',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration along the axis Y divided by the gravity constant g (usually around 9.81m.s²) */
    'SEMIBODY LOADFACTOR Y': {
        name: 'SEMIBODY LOADFACTOR Y',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Derivative of <code class="inline">SEMIBODY LOADFACTOR Y</code> in relation to time. */
    'SEMIBODY LOADFACTOR YDOT': {
        name: 'SEMIBODY LOADFACTOR YDOT',
        units: 'Per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'SEMIBODY LOADFACTOR Z': {
        name: 'SEMIBODY LOADFACTOR Z',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Sigma sqrt */
    'SIGMA SQRT': {
        name: 'SIGMA SQRT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Simulated radius */
    'SIMULATED RADIUS': {
        name: 'SIMULATED RADIUS',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The angle of attack which produces the maximum lift coefficient before entering into stall conditions. */
    'STALL ALPHA': {
        name: 'STALL ALPHA',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The angle at which static pitch stability is achieved. */
    'STATIC PITCH': {
        name: 'STATIC PITCH',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** the typical (normal) descent rate for the aircraft. */
    'TYPICAL DESCENT RATE': {
        name: 'TYPICAL DESCENT RATE',
        units: 'Feet (ft) per minute',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total wing area */
    'WING AREA': {
        name: 'WING AREA',
        units: 'Square feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current wing flex. Different values can be set for each wing (for example, during banking). Set an index of 1 for the left wing, and 2 for the right wing. */
    'WING FLEX PCT:index': {
        name: 'WING FLEX PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Total wing span */
    'WING SPAN': {
        name: 'WING SPAN',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The yaw string angle. Yaw strings are attached to gliders as visible indicators of the yaw angle. An animation of this is not implemented in ESP. */
    'YAW STRING ANGLE': {
        name: 'YAW STRING ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Yaw string angle as a percentage */
    'YAW STRING PCT EXTENDED': {
        name: 'YAW STRING PCT EXTENDED',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The angle of attack at which the wing has zero lift. */
    'ZERO LIFT ALPHA': {
        name: 'ZERO LIFT ALPHA',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Most backward authorized position of the <a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a> according to the <a href="#" data-popovertext="Stands for 'Pilots Operating Handbook' and is a manual that explains everything about the aircraft it is for. It usually includes the Aircraft Flight Manual (AFM), as well as other technical and operational information and is FAA (Federal Aviation Administration) approved." data-rhwidget="TextPopOver">POH</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>airplanes</strong>.</span></p>
         */
    'CG AFT LIMIT': {
        name: 'CG AFT LIMIT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The longitudinal <a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a> position relative to the <a href="../../../Developer_Mode/Aircraft_Editor/Tabs/The_Flight_Model_Tab.htm#Reference Datum Position">Reference Datum Position</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>helicopters</strong>.</span></p>
         */
    'CG FEET': {
        name: 'CG FEET',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The aft&nbsp;<a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a>&nbsp;limit position relative to the <a href="../../../Developer_Mode/Aircraft_Editor/Tabs/The_Flight_Model_Tab.htm#Reference Datum Position">Reference Datum Position</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>helicopters</strong>.</span></p>
         */
    'CG FEET AFT LIMIT': {
        name: 'CG FEET AFT LIMIT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The lateral&nbsp;<a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a> position relative to the <a href="../../../Developer_Mode/Aircraft_Editor/Tabs/The_Flight_Model_Tab.htm#Reference Datum Position">Reference Datum Position</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>helicopters</strong>.</span></p>
         */
    'CG FEET LATERAL': {
        name: 'CG FEET LATERAL',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The left hand lateral&nbsp;<a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a> position relative to the <a href="../../../Developer_Mode/Aircraft_Editor/Tabs/The_Flight_Model_Tab.htm#Reference Datum Position">Reference Datum Position</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>helicopters</strong>.</span></p>
         */
    'CG FEET LATERAL LEFT LIMIT': {
        name: 'CG FEET LATERAL LEFT LIMIT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The right hand lateral&nbsp;<a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a> position relative to the <a href="../../../Developer_Mode/Aircraft_Editor/Tabs/The_Flight_Model_Tab.htm#Reference Datum Position">Reference Datum Position</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>helicopters</strong>.</span></p>
         */
    'CG FEET LATERAL RIGHT LIMIT': {
        name: 'CG FEET LATERAL RIGHT LIMIT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The forward&nbsp;<a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a>&nbsp;limit position relative to the <a href="../../../Developer_Mode/Aircraft_Editor/Tabs/The_Flight_Model_Tab.htm#Reference Datum Position">Reference Datum Position</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>helicopters</strong>.</span></p>
         */
    'CG FEET FWD LIMIT': {
        name: 'CG FEET FWD LIMIT',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Most forward authorized position of the <a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a> according to the <a href="#" data-popovertext="Stands for 'Pilots Operating Handbook' and is a manual that explains everything about the aircraft it is for. It usually includes the Aircraft Flight Manual (AFM), as well as other technical and operational information and is FAA (Federal Aviation Administration) approved." data-rhwidget="TextPopOver">POH</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>airplanes</strong>.</span></p>
         */
    'CG FWD LIMIT': {
        name: 'CG FWD LIMIT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'CG MAX MACH': {
        name: 'CG MAX MACH',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'CG MIN MACH': {
        name: 'CG MIN MACH',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Longitudinal <a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a> position as a percent of reference <a href="#" data-popovertext="The Chord is the line stretching from the leading edge of the wing to the trailing edge, parallel to the centerline." data-rhwidget="TextPopOver">Chord</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>airplanes</strong>.</span></p>
         */
    'CG PERCENT': {
        name: 'CG PERCENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Lateral <a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a> position as a percent of reference <a href="#" data-popovertext="The Chord is the line stretching from the leading edge of the wing to the trailing edge, parallel to the centerline." data-rhwidget="TextPopOver">Chord</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>airplanes</strong>.</span></p>
         */
    'CG PERCENT LATERAL': {
        name: 'CG PERCENT LATERAL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Static <a href="#" data-popovertext="This stands for the 'Center Of Gravity'. The CG of an aircraft is the point over which the aircraft would balance. The center of gravity affects the stability of the aircraft and must fall within specified limits established by the aircraft manufacturer." data-rhwidget="TextPopOver">CG</a> position with reference to the ground.</p>
          <p><span class="note"><strong>NOTE</strong>: This is only valid for <strong>airplanes</strong>.</span></p>
         */
    'STATIC CG TO GROUND': {
        name: 'STATIC CG TO GROUND',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point orientation: Bank */
    'INTERACTIVE POINT BANK': {
        name: 'INTERACTIVE POINT BANK',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point orientation: Heading */
    'INTERACTIVE POINT HEADING': {
        name: 'INTERACTIVE POINT HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired left bend ratio of jetway hood */
    'INTERACTIVE POINT JETWAY LEFT BEND': {
        name: 'INTERACTIVE POINT JETWAY LEFT BEND',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired left deployment angle of jetway hood */
    'INTERACTIVE POINT JETWAY LEFT DEPLOYMENT': {
        name: 'INTERACTIVE POINT JETWAY LEFT DEPLOYMENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired right bend ratio of jetway hood */
    'INTERACTIVE POINT JETWAY RIGHT BEND': {
        name: 'INTERACTIVE POINT JETWAY RIGHT BEND',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired right deployment angle of jetway hood */
    'INTERACTIVE POINT JETWAY RIGHT DEPLOYMENT': {
        name: 'INTERACTIVE POINT JETWAY RIGHT DEPLOYMENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired top horizontal ratio of displacement of jetway hood */
    'INTERACTIVE POINT JETWAY TOP HORIZONTAL': {
        name: 'INTERACTIVE POINT JETWAY TOP HORIZONTAL',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Jetway constant, determining the desired top vertical ratio of displacement of jetway hood */
    'INTERACTIVE POINT JETWAY TOP VERTICAL': {
        name: 'INTERACTIVE POINT JETWAY TOP VERTICAL',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The Interactive Point goal percentage of opening (if it's for a door) or percentage of deployment (if it's for a hose or cable). */
    'INTERACTIVE POINT GOAL': {
        name: 'INTERACTIVE POINT GOAL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Interactive Point current percentage of opening (if door) or deployment (if hose/cable) */
    'INTERACTIVE POINT OPEN': {
        name: 'INTERACTIVE POINT OPEN',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Interactive Point orientation: Pitch */
    'INTERACTIVE POINT PITCH': {
        name: 'INTERACTIVE POINT PITCH',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point X position relative to datum reference point */
    'INTERACTIVE POINT POSX': {
        name: 'INTERACTIVE POINT POSX',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Y position relative to datum reference point */
    'INTERACTIVE POINT POSY': {
        name: 'INTERACTIVE POINT POSY',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Interactive Point Z position relative to datum reference point */
    'INTERACTIVE POINT POSZ': {
        name: 'INTERACTIVE POINT POSZ',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The type of interactive point */
    'INTERACTIVE POINT TYPE': {
        name: 'INTERACTIVE POINT TYPE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Empty weight of the aircraft */
    'EMPTY WEIGHT': {
        name: 'EMPTY WEIGHT',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Empty weight cross coupled moment of inertia */
    'EMPTY WEIGHT CROSS COUPLED MOI': {
        name: 'EMPTY WEIGHT CROSS COUPLED MOI',
        units: 'Slugs per feet squared (Slug sqft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Empty weight pitch moment of inertia */
    'EMPTY WEIGHT PITCH MOI': {
        name: 'EMPTY WEIGHT PITCH MOI',
        units: 'Slugs per feet squared (Slug sqft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Empty weight roll moment of inertia */
    'EMPTY WEIGHT ROLL MOI': {
        name: 'EMPTY WEIGHT ROLL MOI',
        units: 'Slugs per feet squared (Slug sqft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Empty weight yaw moment of inertia */
    'EMPTY WEIGHT YAW MOI': {
        name: 'EMPTY WEIGHT YAW MOI',
        units: 'Slugs per feet squared (Slug sqft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum gross weight of the aircaft */
    'MAX GROSS WEIGHT': {
        name: 'MAX GROSS WEIGHT',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight of the aircraft */
    'TOTAL WEIGHT': {
        name: 'TOTAL WEIGHT',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight cross coupled moment of inertia */
    'TOTAL WEIGHT CROSS COUPLED MOI': {
        name: 'TOTAL WEIGHT CROSS COUPLED MOI',
        units: 'Slugs per feet squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight pitch moment of inertia */
    'TOTAL WEIGHT PITCH MOI': {
        name: 'TOTAL WEIGHT PITCH MOI',
        units: 'Slugs per feet squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight roll moment of inertia */
    'TOTAL WEIGHT ROLL MOI': {
        name: 'TOTAL WEIGHT ROLL MOI',
        units: 'Slugs per feet squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total weight yaw moment of inertia */
    'TOTAL WEIGHT YAW MOI': {
        name: 'TOTAL WEIGHT YAW MOI',
        units: 'Slugs per feet squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Cross feed valve setting. This will return the current setting for the fuel crossfeed for the indexed engine, based on the current status of the simulation and the <a href="../../Event_IDs/Aircraft_Fuel_System_Events.htm#cross-feed">Cross Feed</a> key events. */
    'FUEL CROSS FEED:index': {
        name: 'FUEL CROSS FEED:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** If 1 (TRUE) then the aircraft can dump fuel. */
    'FUEL DUMP ACTIVE': {
        name: 'FUEL DUMP ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** If set to 1 (TRUE) then the aircraft will dump fuel at the rate set by <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#fuel_dump_rate">fuel_dump_rate</a></code> parameter in the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flight_model.cfg</a></code>&nbsp;file. */
    'FUEL DUMP SWITCH': {
        name: 'FUEL DUMP SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Maximum capacity in volume of <em>all</em> the tanks on the left side of the aircraft. */
    'FUEL LEFT CAPACITY': {
        name: 'FUEL LEFT CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current quantity in volume of <em>all</em> the tanks on the left side of the aircraft. */
    'FUEL LEFT QUANTITY': {
        name: 'FUEL LEFT QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <em>Currently not used within the simulation.</em> */
    'FUEL PUMP': {
        name: 'FUEL PUMP',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum capacity in volume of <em>all</em> the tanks on the right side of the aircraft. */
    'FUEL RIGHT CAPACITY': {
        name: 'FUEL RIGHT CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current quantity in volume of <em>all</em> the tanks on the right side of the aircraft. */
    'FUEL RIGHT QUANTITY': {
        name: 'FUEL RIGHT QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Quantity of fuel in the tank referenced by the indexed selector.&nbsp;When using the legacy fuel system, this SimVar will return the quantity of fuel in the tank pointed to by the selector you chose with the index. If passing an index higher than the number of selectors - or when using the modern fuel system - it will return the total fuel quantity available. */
    'FUEL SELECTED QUANTITY:index': {
        name: 'FUEL SELECTED QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent or capacity for the tank referenced by the indexed selector.&nbsp;When using the legacy fuel system, this SimVar will return the percentage of fuel in the tank pointed to by the selector you chose with the index. If passing an index higher than the number of selectors available - or when using the modern fuel system - it will return the percentage of total fuel quantity available. */
    'FUEL SELECTED QUANTITY PERCENT:index': {
        name: 'FUEL SELECTED QUANTITY PERCENT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The method of transfer for the fuel. Each of the available transfer options are explained below:</p>
          <ul>
            <li><strong>off</strong> - Fuel transfer is switched off.</li>
            <li><strong>auto</strong> - Automatically balance the fuel between the Center1 and Center2 tanks to maintain the center of gravity.</li>
            <li><strong>forward</strong> - Fuel will be transferred forwards from the Center1 tank to the Center2 tank.</li>
            <li><strong>aft</strong> - Fuel will be transferred aftwards from the Center2 tank to the Center1 tank.</li>
            <li><strong>manual</strong> - Fuel will be transferred for 1 second from the Center1 tank to the Center2 tank at a rate of 1<a href="#" data-popovertext="This stands for 'pounds' and is a way of measuring the mass of an object using the Imperial system. In metric it is aproximately 0.45 kilograms." data-rhwidget="TextPopOver">lbs</a>/s.</li>
            <li><strong>custom</strong> - This requires one or more pumps to have been defined using the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#fuel_transfer_pump.N">fuel_transfer_pump.N</a></code> parameter in the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm">flight_model.cfg</a></code> file, as well as their associated electrical circuits.</li>
          </ul>
         */
    'FUEL SELECTED TRANSFER MODE': {
        name: 'FUEL SELECTED TRANSFER MODE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Total fuel capacity of the aircraft for <em>all</em> tanks. */
    'FUEL TOTAL CAPACITY': {
        name: 'FUEL TOTAL CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current total quantity of fuel in volume for <em>all</em> tanks of the aircraft. */
    'FUEL TOTAL QUANTITY': {
        name: 'FUEL TOTAL QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Current total fuel weight for <em>all</em> tanks of the aircraft */
    'FUEL TOTAL QUANTITY WEIGHT': {
        name: 'FUEL TOTAL QUANTITY WEIGHT',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns 1 (TRUE) if the indexed pump is active. */
    'FUEL TRANSFER PUMP ON:index': {
        name: 'FUEL TRANSFER PUMP ON:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The weight of the fuel, per gallon. */
    'FUEL WEIGHT PER GALLON': {
        name: 'FUEL WEIGHT PER GALLON',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Will return 1 (TRUE) if the aircraft is using the modern <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h6">[FUEL_SYSTEM]</a></code> or 0 (FALSE) for the legacy <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h4">[FUEL]</a></code>. */
    'NEW FUEL SYSTEM': {
        name: 'NEW FUEL SYSTEM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The number of fuel selectors on the aircraft. */
    'NUM FUEL SELECTORS': {
        name: 'NUM FUEL SELECTORS',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Will return 1 (TRUE) if the unlimited fuel flag has been enabled, or 0 (FALSE) otherwise. */
    'UNLIMITED FUEL': {
        name: 'UNLIMITED FUEL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The total amount of fuel in <em>all</em> tanks of the aircraft which is not usable. */
    'UNUSABLE FUEL TOTAL QUANTITY': {
        name: 'UNUSABLE FUEL TOTAL QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The pressure of the fuel coming to the indexed engine. The index is the number of the engine <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Engine.N">Engine.N</a></code> parameter. */
    'FUELSYSTEM ENGINE PRESSURE:index': {
        name: 'FUELSYSTEM ENGINE PRESSURE:index',
        units: 'Kilo pascal',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This will return the current <em>Option</em> for the indexed junction. The index is the number of the line <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Junction.N">Junction.N</a></code> parameter. */
    'FUELSYSTEM JUNCTION SETTING:index': {
        name: 'FUELSYSTEM JUNCTION SETTING:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The fuel flowing through the indexed line in <a href="#" data-popovertext="This is an imperial unit of measurement for volume, equivalent to 3785 cubic centimetres in the metric system." data-rhwidget="TextPopOver">Gallon</a>s per Hour. The index is the number of the line <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Line.N">Line.N</a></code> parameter. */
    'FUELSYSTEM LINE FUEL FLOW:index': {
        name: 'FUELSYSTEM LINE FUEL FLOW:index',
        units: 'Gallons per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The level of fuel in the indexed line in <a href="#" data-popovertext="This is an imperial unit of measurement for volume, equivalent to 3785 cubic centimetres in the metric system." data-rhwidget="TextPopOver">Gallon</a>s. The index is the number of the line <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Line.N">Line.N</a></code> parameter. */
    'FUELSYSTEM LINE FUEL LEVEL:index': {
        name: 'FUELSYSTEM LINE FUEL LEVEL:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The pressure in the indexed fuel line, measured in KiloPascal. The index is the number of the line <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Line.N">Line.N</a></code> parameter. */
    'FUELSYSTEM LINE FUEL PRESSURE:index': {
        name: 'FUELSYSTEM LINE FUEL PRESSURE:index',
        units: 'Kilo pascal',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the indexed pump is actually active. The index is the number of the pump <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Pump.N">Pump.N</a></code> parameter. */
    'FUELSYSTEM PUMP ACTIVE:index': {
        name: 'FUELSYSTEM PUMP ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the indexed pump is enabled. The index is the number of the pump <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Pump.N">Pump.N</a></code> parameter. */
    'FUELSYSTEM PUMP SWITCH:index': {
        name: 'FUELSYSTEM PUMP SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Total capacity of the indexed fuel tank. The index is the number of the tank <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Tank.N">Tank.N</a></code> parameter.</p>
          <p><span class="note"><strong>NOTE</strong>: This SimVar can only be used with the modern <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm">Fuel System</a>.</span></p>
         */
    'FUELSYSTEM TANK CAPACITY:index': {
        name: 'FUELSYSTEM TANK CAPACITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Quantity of fuel available in the indexed fuel tank. The index is the number of the tank <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Tank.N">Tank.N</a></code> parameter.</p>
          <p><span class="note"><strong>NOTE</strong>: This SimVar can only be used with the modern <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm">Fuel System</a>.</span></p>
         */
    'FUELSYSTEM TANK LEVEL:index': {
        name: 'FUELSYSTEM TANK LEVEL:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Quantity of fuel currently available in the indexed fuel tank. The index is the number of the tank <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Tank.N">Tank.N</a></code> parameter.</p>
          <p><span class="note"><strong>NOTE</strong>: If the fuel system&nbsp;<a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Version">Version</a>&nbsp;is 2 or below, the index value will be one of the&nbsp;<a href="#fuel-tank-selection">Fuel Tank Selection</a>&nbsp;indices.</span></p>
         */
    'FUELSYSTEM TANK QUANTITY:index': {
        name: 'FUELSYSTEM TANK QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Total quantity of fuel available in the indexed fuel tank, including any unusable fuel. The index is the number of the tank <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Tank.N">Tank.N</a></code> parameter.</p>
          <p><span class="note"><strong>NOTE</strong>: If the fuel system&nbsp;<a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Version">Version</a>&nbsp;is 2 or below, the index value will be one of the&nbsp;<a href="#fuel-tank-selection">Fuel Tank Selection</a>&nbsp;indices.</span></p>
         */
    'FUELSYSTEM TANK TOTAL QUANTITY:index': {
        name: 'FUELSYSTEM TANK TOTAL QUANTITY:index',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Weight of fuel available in the indexed fuel tank. The index is the number of the tank <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Tank.N">Tank.N</a></code> parameter.</p>
          <p><span class="note"><strong>NOTE</strong>: If the fuel system&nbsp;<a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Version">Version</a>&nbsp;is 2 or below, the index value will be one of the&nbsp;<a href="#fuel-tank-selection">Fuel Tank Selection</a>&nbsp;indices.</span></p>
         */
    'FUELSYSTEM TANK WEIGHT:index': {
        name: 'FUELSYSTEM TANK WEIGHT:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the indexed trigger is active. The index is the number of the trigger <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Trigger.N">Trigger.N</a></code> parameter. */
    'FUELSYSTEM TRIGGER STATUS:index': {
        name: 'FUELSYSTEM TRIGGER STATUS:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the indexed valve is actually fully opened. The index is the number of the valve <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Valve.N">Valve.N</a></code> parameter. */
    'FUELSYSTEM VALVE OPEN:index': {
        name: 'FUELSYSTEM VALVE OPEN:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the indexed valve is set to be opened. The index is the number of the valve <em>N</em> component as defined by the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model/fuel_system.htm#Valve.N">Valve.N</a></code> parameter. */
    'FUELSYSTEM VALVE SWITCH:index': {
        name: 'FUELSYSTEM VALVE SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Maximum capacity in volume of&nbsp;center tank 1/2/3. */
    'FUEL TANK CENTER CAPACITY': {
        name: 'FUEL TANK CENTER CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum capacity in volume of&nbsp;center tank 1/2/3. */
    'FUEL TANK CENTER2 CAPACITY': {
        name: 'FUEL TANK CENTER2 CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum capacity in volume of&nbsp;center tank 1/2/3. */
    'FUEL TANK CENTER3 CAPACITY': {
        name: 'FUEL TANK CENTER3 CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of center tank 1/2/3. */
    'FUEL TANK CENTER LEVEL': {
        name: 'FUEL TANK CENTER LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of maximum capacity of center tank 1/2/3. */
    'FUEL TANK CENTER2 LEVEL': {
        name: 'FUEL TANK CENTER2 LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of maximum capacity of center tank 1/2/3. */
    'FUEL TANK CENTER3 LEVEL': {
        name: 'FUEL TANK CENTER3 LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of center tank 1/2/3. */
    'FUEL TANK CENTER QUANTITY': {
        name: 'FUEL TANK CENTER QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of center tank 1/2/3. */
    'FUEL TANK CENTER2 QUANTITY': {
        name: 'FUEL TANK CENTER2 QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of center tank 1/2/3. */
    'FUEL TANK CENTER3 QUANTITY': {
        name: 'FUEL TANK CENTER3 QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of external tank 1/2. */
    'FUEL TANK EXTERNAL1 CAPACITY': {
        name: 'FUEL TANK EXTERNAL1 CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Maximum capacity in volume of external tank 1/2. */
    'FUEL TANK EXTERNAL2 CAPACITY': {
        name: 'FUEL TANK EXTERNAL2 CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of texternal tank 1/2. */
    'FUEL TANK EXTERNAL1 LEVEL': {
        name: 'FUEL TANK EXTERNAL1 LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent of maximum capacity of texternal tank 1/2. */
    'FUEL TANK EXTERNAL2 LEVEL': {
        name: 'FUEL TANK EXTERNAL2 LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of external tank 1/2. */
    'FUEL TANK EXTERNAL1 QUANTITY': {
        name: 'FUEL TANK EXTERNAL1 QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of external tank 1/2. */
    'FUEL TANK EXTERNAL2 QUANTITY': {
        name: 'FUEL TANK EXTERNAL2 QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the left auxiliary tank. */
    'FUEL TANK LEFT AUX CAPACITY': {
        name: 'FUEL TANK LEFT AUX CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the left auxiliary tank. */
    'FUEL TANK LEFT AUX LEVEL': {
        name: 'FUEL TANK LEFT AUX LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the left auxiliary tank. */
    'FUEL TANK LEFT AUX QUANTITY': {
        name: 'FUEL TANK LEFT AUX QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the left main tank. */
    'FUEL TANK LEFT MAIN CAPACITY': {
        name: 'FUEL TANK LEFT MAIN CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the left main tank. */
    'FUEL TANK LEFT MAIN LEVEL': {
        name: 'FUEL TANK LEFT MAIN LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the left main tank. */
    'FUEL TANK LEFT MAIN QUANTITY': {
        name: 'FUEL TANK LEFT MAIN QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the left tip tank. */
    'FUEL TANK LEFT TIP CAPACITY': {
        name: 'FUEL TANK LEFT TIP CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the left tip tank. */
    'FUEL TANK LEFT TIP LEVEL': {
        name: 'FUEL TANK LEFT TIP LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the left tip tank. */
    'FUEL TANK LEFT TIP QUANTITY': {
        name: 'FUEL TANK LEFT TIP QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the right auxiliary tank. */
    'FUEL TANK RIGHT AUX CAPACITY': {
        name: 'FUEL TANK RIGHT AUX CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the right auxiliary tank. */
    'FUEL TANK RIGHT AUX LEVEL': {
        name: 'FUEL TANK RIGHT AUX LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the right auxiliary tank. */
    'FUEL TANK RIGHT AUX QUANTITY': {
        name: 'FUEL TANK RIGHT AUX QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the right main tank. */
    'FUEL TANK RIGHT MAIN CAPACITY': {
        name: 'FUEL TANK RIGHT MAIN CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the right main tank. */
    'FUEL TANK RIGHT MAIN LEVEL': {
        name: 'FUEL TANK RIGHT MAIN LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the right main tank. */
    'FUEL TANK RIGHT MAIN QUANTITY': {
        name: 'FUEL TANK RIGHT MAIN QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Maximum capacity in volume of the right tip tank. */
    'FUEL TANK RIGHT TIP CAPACITY': {
        name: 'FUEL TANK RIGHT TIP CAPACITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent of maximum capacity of the right tip tank. */
    'FUEL TANK RIGHT TIP LEVEL': {
        name: 'FUEL TANK RIGHT TIP LEVEL',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current quantity in volume of the right tip tank. */
    'FUEL TANK RIGHT TIP QUANTITY': {
        name: 'FUEL TANK RIGHT TIP QUANTITY',
        units: 'Gallons',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Which tank the indexed selector is set to. The index is the selector to check (from 1 to 4), and the return value will be the&nbsp;<a href="Aircraft_Fuel_Variables.htm#fuel-tank-selection">Fuel Tank Selection</a> index.</p>
          <p><span class="note">NOTE: This SimVar is only valid for the legacy <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#h4">[FUEL]</a>&nbsp;setup.</span></p>
         */
    'FUEL TANK SELECTOR:index': {
        name: 'FUEL TANK SELECTOR:index',
        units: 'Enum',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the aircraft is in a cloud. */
    'AMBIENT IN CLOUD': {
        name: 'AMBIENT IN CLOUD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the aircraft has met the conditions required to spawn the contrail VFX. */
    'CONTRAILS CONDITIONS MET': {
        name: 'CONTRAILS CONDITIONS MET',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if slew is active. */
    'IS SLEW ACTIVE': {
        name: 'IS SLEW ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if slew is enabled. */
    'IS SLEW ALLOWED': {
        name: 'IS SLEW ALLOWED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is this the user loaded aircraft. */
    'IS USER SIM': {
        name: 'IS USER SIM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the plane is currently on a runway. */
    'ON ANY RUNWAY': {
        name: 'ON ANY RUNWAY',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the plane is currently parked (true) or not (false). */
    'PLANE IN PARKING STATE': {
        name: 'PLANE IN PARKING STATE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The state of the surface directly under the aircraft. */
    'SURFACE CONDITION': {
        name: 'SURFACE CONDITION',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True indicates that the <code class="inline">SURFACE CONDITION</code> return value is meaningful. */
    'SURFACE INFO VALID': {
        name: 'SURFACE INFO VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The type of surface under the aircraft.</p>
         */
    'SURFACE TYPE': {
        name: 'SURFACE TYPE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Amount of ice on aircraft structure. 100 is fully iced. */
    'STRUCTURAL ICE PCT': {
        name: 'STRUCTURAL ICE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Title from <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/aircraft_cfg.htm">aircraft.cfg</a>. */
    TITLE: {
        name: 'TITLE',
        units: '',
        dataType: SimConnectDataType.STRING8,
        settable: false,
    },
    /** True if a towline is connected to both tow plane and glider. */
    'TOW CONNECTION': {
        name: 'TOW CONNECTION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is visual effect available on this aircraft. */
    'WINDSHIELD RAIN EFFECT AVAILABLE': {
        name: 'WINDSHIELD RAIN EFFECT AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Acceleration relative to aircraft X axis, in east/west direction. */
    'ACCELERATION BODY X': {
        name: 'ACCELERATION BODY X',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to aircraft Y axis, in vertical direction. */
    'ACCELERATION BODY Y': {
        name: 'ACCELERATION BODY Y',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to aircraft Z axis, in north/south direction. */
    'ACCELERATION BODY Z': {
        name: 'ACCELERATION BODY Z',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to the earth X axis, in east/west direction. */
    'ACCELERATION WORLD X': {
        name: 'ACCELERATION WORLD X',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to the earth Y axis, in vertical direction. */
    'ACCELERATION WORLD Y': {
        name: 'ACCELERATION WORLD Y',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Acceleration relative to the earth Z axis, in north/south direction. */
    'ACCELERATION WORLD Z': {
        name: 'ACCELERATION WORLD Z',
        units: 'Feet (ft) per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The speed of the aircraft relative to the speed of the first surface directly underneath it. Use this to retrieve, for example, an aircraft's taxiing speed while it is moving on a moving carrier. It also applies to airborne aircraft, for example when a helicopter is successfully hovering above a moving ship, this value should be zero. The returned value will be the same as <code class="inline">GROUND VELOCITY</code> if the first surface beneath it is not moving. */
    'SURFACE RELATIVE GROUND SPEED': {
        name: 'SURFACE RELATIVE GROUND SPEED',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Speed relative to the earths surface.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'GROUND VELOCITY': {
        name: 'GROUND VELOCITY',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Altitude of aircraft. */
    'PLANE ALTITUDE': {
        name: 'PLANE ALTITUDE',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude above the surface. */
    'PLANE ALT ABOVE GROUND': {
        name: 'PLANE ALT ABOVE GROUND',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude above the surface minus CG. */
    'PLANE ALT ABOVE GROUND MINUS CG': {
        name: 'PLANE ALT ABOVE GROUND MINUS CG',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Bank angle, although the name mentions degrees the units used are radians. */
    'PLANE BANK DEGREES': {
        name: 'PLANE BANK DEGREES',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Heading indicator (directional gyro) indication. */
    'PLANE HEADING DEGREES GYRO': {
        name: 'PLANE HEADING DEGREES GYRO',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Heading relative to magnetic north - although the name mentions degrees the units used are radians. */
    'PLANE HEADING DEGREES MAGNETIC': {
        name: 'PLANE HEADING DEGREES MAGNETIC',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Heading relative to true north - although the name mentions degrees the units used are radians. */
    'PLANE HEADING DEGREES TRUE': {
        name: 'PLANE HEADING DEGREES TRUE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Latitude of aircraft, North is positive, South negative. */
    'PLANE LATITUDE': {
        name: 'PLANE LATITUDE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Longitude of aircraft, East is positive, West negative. */
    'PLANE LONGITUDE': {
        name: 'PLANE LONGITUDE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Pitch angle, although the name mentions degrees the units used are radians. */
    'PLANE PITCH DEGREES': {
        name: 'PLANE PITCH DEGREES',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This float represents the bank of the player's plane from the last touchdown. */
    'PLANE TOUCHDOWN BANK DEGREES': {
        name: 'PLANE TOUCHDOWN BANK DEGREES',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the magnetic heading of the player's plane from the last touchdown. */
    'PLANE TOUCHDOWN HEADING DEGREES MAGNETIC': {
        name: 'PLANE TOUCHDOWN HEADING DEGREES MAGNETIC',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the true heading of the player's plane from the last touchdown. */
    'PLANE TOUCHDOWN HEADING DEGREES TRUE': {
        name: 'PLANE TOUCHDOWN HEADING DEGREES TRUE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the plane latitude for the last touchdown. */
    'PLANE TOUCHDOWN LATITUDE': {
        name: 'PLANE TOUCHDOWN LATITUDE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the plane longitude for the last touchdown. */
    'PLANE TOUCHDOWN LONGITUDE': {
        name: 'PLANE TOUCHDOWN LONGITUDE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the player's plane speed according to ground normal from the last touchdown. */
    'PLANE TOUCHDOWN NORMAL VELOCITY': {
        name: 'PLANE TOUCHDOWN NORMAL VELOCITY',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the pitch of the player's plane from the last touchdown. */
    'PLANE TOUCHDOWN PITCH DEGREES': {
        name: 'PLANE TOUCHDOWN PITCH DEGREES',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Lateral (X axis) speed relative to wind. */
    'RELATIVE WIND VELOCITY BODY X': {
        name: 'RELATIVE WIND VELOCITY BODY X',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Vertical (Y axis) speed relative to wind. */
    'RELATIVE WIND VELOCITY BODY Y': {
        name: 'RELATIVE WIND VELOCITY BODY Y',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Longitudinal (Z axis) speed relative to wind. */
    'RELATIVE WIND VELOCITY BODY Z': {
        name: 'RELATIVE WIND VELOCITY BODY Z',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Rotation acceleration relative to aircraft X axis. */
    'ROTATION ACCELERATION BODY X': {
        name: 'ROTATION ACCELERATION BODY X',
        units: 'Radians per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation acceleration relative to aircraft Y axis. */
    'ROTATION ACCELERATION BODY Y': {
        name: 'ROTATION ACCELERATION BODY Y',
        units: 'Radians per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation acceleration relative to aircraft Z axis. */
    'ROTATION ACCELERATION BODY Z': {
        name: 'ROTATION ACCELERATION BODY Z',
        units: 'Radians per second squared',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation velocity relative to aircraft X axis. */
    'ROTATION VELOCITY BODY X': {
        name: 'ROTATION VELOCITY BODY X',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation velocity relative to aircraft Y axis. */
    'ROTATION VELOCITY BODY Y': {
        name: 'ROTATION VELOCITY BODY Y',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Rotation velocity relative to aircraft Z axis. */
    'ROTATION VELOCITY BODY Z': {
        name: 'ROTATION VELOCITY BODY Z',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The slope between the plane and the expected landing position of the runway. Returns 0 if no runway is assigned. */
    'SLOPE TO ATC RUNWAY': {
        name: 'SLOPE TO ATC RUNWAY',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True lateral speed, relative to aircraft X axis. */
    'VELOCITY BODY X': {
        name: 'VELOCITY BODY X',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True vertical speed, relative to aircraft Y axis. */
    'VELOCITY BODY Y': {
        name: 'VELOCITY BODY Y',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True longitudinal speed, relative to aircraft Z axis. */
    'VELOCITY BODY Z': {
        name: 'VELOCITY BODY Z',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The current indicated vertical speed for the aircraft. */
    'VERTICAL SPEED': {
        name: 'VERTICAL SPEED',
        units: 'Feet (ft) per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The eyepoint position relative to the reference datum position for the aircraft. */
    'EYEPOINT POSITION': {
        name: 'EYEPOINT POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the various airspeed <a href="#" data-popovertext="A 'Proportional–Integral–Derivative' controller is a control loop mechanism employing feedback for systems requiring continuously modulated control. A PID controller continuously calculates an error value as the difference between a desired setpoint and a measured process variable and applies a correction based on proportional, integral, and derivative terms." data-rhwidget="TextPopOver">PID</a> constants. This is generally only used for AI controlled aircraft and boats, although it may be useful when working with RTCs and the user aircraft. */
    'STRUC AIRSPEED HOLD PID CONSTS': {
        name: 'STRUC AIRSPEED HOLD PID CONSTS',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the various airspeed <a href="#" data-popovertext="A 'Proportional–Integral–Derivative' controller is a control loop mechanism employing feedback for systems requiring continuously modulated control. A PID controller continuously calculates an error value as the difference between a desired setpoint and a measured process variable and applies a correction based on proportional, integral, and derivative terms." data-rhwidget="TextPopOver">PID</a> constants. This is generally only used for AI controlled aircraft and boats, although it may be useful when working with RTCs and the user aircraft. */
    'STRUC HEADING HOLD PID CONSTS': {
        name: 'STRUC HEADING HOLD PID CONSTS',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The body rotation acceleration. */
    'STRUCT BODY ROTATION ACCELERATION': {
        name: 'STRUCT BODY ROTATION ACCELERATION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The body rotation velocity. */
    'STRUCT BODY ROTATION VELOCITY': {
        name: 'STRUCT BODY ROTATION VELOCITY',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The object body velocity. */
    'STRUCT BODY VELOCITY': {
        name: 'STRUCT BODY VELOCITY',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The position of the indexed engine relative to the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/Aircraft.htm#h">Datum Reference Point</a> for the aircraft. */
    'STRUCT ENGINE POSITION:index': {
        name: 'STRUCT ENGINE POSITION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The angle of the eyepoint view. Zero, zero, zero is straight ahead. */
    'STRUCT EYEPOINT DYNAMIC ANGLE': {
        name: 'STRUCT EYEPOINT DYNAMIC ANGLE',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** A variable offset away from the EYEPOINT POSITION. */
    'STRUCT EYEPOINT DYNAMIC OFFSET': {
        name: 'STRUCT EYEPOINT DYNAMIC OFFSET',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the latitude, longitude and altitude of the user aircraft. */
    'STRUCT LATLONALT': {
        name: 'STRUCT LATLONALT',
        units: 'SIMCONNECT_DATA_LATLONALT',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the lattitude, longitude, altitude, pitch, bank and heading of the user aircraft. */
    'STRUCT LATLONALTPBH': {
        name: 'STRUCT LATLONALTPBH',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in aircraft lateral (X) axis. */
    'AIRCRAFT WIND X': {
        name: 'AIRCRAFT WIND X',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in aircraft vertical (Y) axis. */
    'AIRCRAFT WIND Y': {
        name: 'AIRCRAFT WIND Y',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Wind component in aircraft longitudinal (Z) axis. */
    'AIRCRAFT WIND Z': {
        name: 'AIRCRAFT WIND Z',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Redline airspeed (dynamic on some aircraft). */
    'AIRSPEED BARBER POLE': {
        name: 'AIRSPEED BARBER POLE',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Indicated airspeed. */
    'AIRSPEED INDICATED': {
        name: 'AIRSPEED INDICATED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current mach. */
    'AIRSPEED MACH': {
        name: 'AIRSPEED MACH',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The airspeed, whether true or indicated airspeed has been selected. */
    'AIRSPEED SELECT INDICATED OR TRUE': {
        name: 'AIRSPEED SELECT INDICATED OR TRUE',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True airspeed. */
    'AIRSPEED TRUE': {
        name: 'AIRSPEED TRUE',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Equivalent to <code class="inline">AIRSPEED TRUE</code>, but does not account for wind when used to Set Airspeed value */
    'AIRSPEED TRUE RAW': {
        name: 'AIRSPEED TRUE RAW',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Mach associated with maximum airspeed. */
    'BARBER POLE MACH': {
        name: 'BARBER POLE MACH',
        units: 'Mach',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Velocity regardless of direction. For example, if a helicopter is ascending vertically at 100 fps, getting this variable will return 100. */
    'TOTAL VELOCITY': {
        name: 'TOTAL VELOCITY',
        units: 'Feet (ft per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Longitudinal speed of wind on the windshield. */
    'WINDSHIELD WIND VELOCITY': {
        name: 'WINDSHIELD WIND VELOCITY',
        units: 'Feet (ft per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Outside temperature on the standard ATM scale. */
    'STANDARD ATM TEMPERATURE': {
        name: 'STANDARD ATM TEMPERATURE',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Total air temperature is the air temperature at the front of the aircraft where the ram pressure from the speed of the aircraft is taken into account. */
    'TOTAL AIR TEMPERATURE': {
        name: 'TOTAL AIR TEMPERATURE',
        units: 'Celsius',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The deflection control left / right, usually used for animation.&nbsp; */
    'ORNITHOPTER CONTROL LEVERS X': {
        name: 'ORNITHOPTER CONTROL LEVERS X',
        units: 'Position 16k',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The deflection control fore / aft, usually used for animation. */
    'ORNITHOPTER CONTROL LEVERS Y': {
        name: 'ORNITHOPTER CONTROL LEVERS Y',
        units: 'Position 16k',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns whether the ornithopter dive mode is enabled (TRUE) or not (FALSE). */
    'ORNITHOPTER DIVE MODE ENABLED': {
        name: 'ORNITHOPTER DIVE MODE ENABLED',
        units: 'Boolean',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the ornithopter glide mode&nbsp;is enabled (TRUE) or not (FALSE). */
    'ORNITHOPTER GLIDE MODE ENABLED': {
        name: 'ORNITHOPTER GLIDE MODE ENABLED',
        units: 'Boolean',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the ornithopter wing brake&nbsp;is enabled (TRUE) or not (FALSE). */
    'ORNITHOPTER WINGS BRAKE ENABLED': {
        name: 'ORNITHOPTER WINGS BRAKE ENABLED',
        units: 'Boolean',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether the ornithopter wing brake is active (TRUE) or not (FALSE). */
    'ORNITHOPTER WINGS BRAKE ACTIVE': {
        name: 'ORNITHOPTER WINGS BRAKE ACTIVE',
        units: 'Boolean',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The horizontal tilt of the indexed wing expressed as a value between 0 and 1. */
    'ORNITHOPTER WING HORIZONTAL TILT:index': {
        name: 'ORNITHOPTER WING HORIZONTAL TILT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The pitch of the indexed wing expressed as a value between 0 and 1. */
    'ORNITHOPTER WING PITCH:index': {
        name: 'ORNITHOPTER WING PITCH:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The vertical tilt of the indexed wing expressed as a value between 0 and 1. */
    'ORNITHOPTER WING VERTICAL TILT:index': {
        name: 'ORNITHOPTER WING VERTICAL TILT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current amount of blur applied to the animation of the ornithopter wings when flapping, expressed as a value between 0 (none) and 1 (maximum). */
    'ORNITHOPTER WINGS BLUR': {
        name: 'ORNITHOPTER WINGS BLUR',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current progress of engaging/disengaging the clutch on the wings when entering or leaving glide mode, expressed as a value between 0 and 1. */
    'ORNITHOPTER WINGS CLUTCH STATE': {
        name: 'ORNITHOPTER WINGS CLUTCH STATE',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Returns a value that defines the current folding operation of the wings, where:</p>
          <ol class="minitoc-list">
            <li>0 - stand by</li>
            <li>1 - parking (slow mode)</li>
            <li>2 - setting up (slow mode)</li>
            <li>3 - folding for diving (fast mode)</li>
            <li>4 - unfolding from a dive (fast mode)</li>
          </ol>
         */
    'ORNITHOPTER WINGS FOLDING OPERATION ID': {
        name: 'ORNITHOPTER WINGS FOLDING OPERATION ID',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the current total lift of the ornithopter. */
    'ORNITHOPTER WORLD LIFT': {
        name: 'ORNITHOPTER WORLD LIFT',
        units: 'Pounds (lbs)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <a href="#" data-popovertext="'Automatic Direction Finding' is an electronic aid to navigation that identifies the relative bearing of an aircraft from a radio beacon transmitting in the MF or LF bandwidth, such as an Non-Directional Beacon or commercial radio broadcast station." data-rhwidget="TextPopOver">ADF</a> frequency. Index of 1 or 2. */
    'ADF ACTIVE FREQUENCY:index': {
        name: 'ADF ACTIVE FREQUENCY:index',
        units: 'Frequency ADF BCD32',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if ADF is available */
    'ADF AVAILABLE:index': {
        name: 'ADF AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** ADF compass rose setting */
    'ADF CARD': {
        name: 'ADF CARD',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, use <code class="inline">ADF ACTIVE FREQUENCY</code> */
    'ADF EXT FREQUENCY': {
        name: 'ADF EXT FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Deprecated, use <code class="inline">ADF ACTIVE FREQUENCY</code> */
    'ADF FREQUENCY': {
        name: 'ADF FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <a href="#" data-popovertext="The 'International Civil Aviation Organization' code is a four digit code used to designate aerodromes around the world. These codes are used by air traffic control and airline operations for things such as flight planning.

" data-rhwidget="TextPopOver">ICAO code</a> */
    'ADF IDENT': {
        name: 'ADF IDENT',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Returns the latitude, longitude and altitude of the station the radio equipment is currently tuned to, or zeros if the radio is not tuned to any ADF station. Index of 1 or 2 for ADF 1 and ADF 2. */
    'ADF LATLONALT:index': {
        name: 'ADF LATLONALT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Descriptive name */
    'ADF NAME:index': {
        name: 'ADF NAME:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Current direction from <a href="#" data-popovertext="This stands for 'Non Directional Beacon' which is a radio transmitter at a known location, used as an aviation navigational aid. As the name implies, the signal transmitted does not include inherent directional information, in contrast to other navigational aids, like VOR." data-rhwidget="TextPopOver">NDB</a> station */
    'ADF RADIAL:index': {
        name: 'ADF RADIAL:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the magnetic bearing to the currently tuned ADF transmitter. */
    'ADF RADIAL MAG:index': {
        name: 'ADF RADIAL MAG:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Signal strength */
    'ADF SIGNAL:index': {
        name: 'ADF SIGNAL:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <a href="#" data-popovertext="'Automatic Direction Finding' is an electronic aid to navigation that identifies the relative bearing of an aircraft from a radio beacon transmitting in the MF or LF bandwidth, such as an Non-Directional Beacon or commercial radio broadcast station." data-rhwidget="TextPopOver">ADF</a> audio flag. Index of 0 or 1. */
    'ADF SOUND:index': {
        name: 'ADF SOUND:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if <a href="#" data-popovertext="'Automatic Direction Finding' is an electronic aid to navigation that identifies the relative bearing of an aircraft from a radio beacon transmitting in the MF or LF bandwidth, such as an Non-Directional Beacon or commercial radio broadcast station." data-rhwidget="TextPopOver">ADF</a> Standby is available */
    'ADF STANDBY AVAILABLE:index': {
        name: 'ADF STANDBY AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** <a href="#" data-popovertext="'Automatic Direction Finding' is an electronic aid to navigation that identifies the relative bearing of an aircraft from a radio beacon transmitting in the MF or LF bandwidth, such as an Non-Directional Beacon or commercial radio broadcast station." data-rhwidget="TextPopOver">ADF</a> standby frequency */
    'ADF STANDBY FREQUENCY:index': {
        name: 'ADF STANDBY FREQUENCY:index',
        units: 'Hz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the volume of the <a href="#" data-popovertext="'Automatic Direction Finding' is an electronic aid to navigation that identifies the relative bearing of an aircraft from a radio beacon transmitting in the MF or LF bandwidth, such as an Non-Directional Beacon or commercial radio broadcast station." data-rhwidget="TextPopOver">ADF</a> */
    'ADF VOLUME': {
        name: 'ADF VOLUME',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The name of the Airline used by ATC, as a string with a maximum length of 50 characters. */
    'ATC AIRLINE': {
        name: 'ATC AIRLINE',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** If the airport is controlled, this boolean is true. */
    'ATC AIRPORT IS TOWERED': {
        name: 'ATC AIRPORT IS TOWERED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns whether or not the user has filed an IFR flightplan that has been cleared by the sim ATC */
    'ATC CLEARED IFR': {
        name: 'ATC CLEARED IFR',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether the ATC has cleared the plane for landing. */
    'ATC CLEARED LANDING': {
        name: 'ATC CLEARED LANDING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether the ATC has cleared the plane for takeoff. */
    'ATC CLEARED TAKEOFF': {
        name: 'ATC CLEARED TAKEOFF',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether the ATC has cleared the plane for taxi. */
    'ATC CLEARED TAXI': {
        name: 'ATC CLEARED TAXI',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the target altitude for the current ATC flightplan waypoint. */
    'ATC CURRENT WAYPOINT ALTITUDE': {
        name: 'ATC CURRENT WAYPOINT ALTITUDE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flight Number used by ATC, as a string with a maximum number of 6 characters. */
    'ATC FLIGHT NUMBER': {
        name: 'ATC FLIGHT NUMBER',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** Altitude between the position of the aircraft and his closest waypoints in the flightplan. */
    'ATC FLIGHTPLAN DIFF ALT': {
        name: 'ATC FLIGHTPLAN DIFF ALT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>Returns the lateral distance the user's plane is from the ATC flight plan track.</span> */
    'ATC FLIGHTPLAN DIFF DISTANCE': {
        name: 'ATC FLIGHTPLAN DIFF DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Heading between the position of the aircraft and his closest waypoints in the flightplan. */
    'ATC FLIGHTPLAN DIFF HEADING': {
        name: 'ATC FLIGHTPLAN DIFF HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Is this aircraft recognized by ATC as heavy. */
    'ATC HEAVY': {
        name: 'ATC HEAVY',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** ID used by ATC, as a string with a maximum number of 10 characters. */
    'ATC ID': {
        name: 'ATC ID',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** <span>Returns true if the user has a valid IFR flight plan they can as for clearance for with ATC at the airport they are currently at.</span> */
    'ATC IFR FP TO REQUEST': {
        name: 'ATC IFR FP TO REQUEST',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Model used by ATC, as a string with a maximum number of 10 characters. */
    'ATC MODEL': {
        name: 'ATC MODEL',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Is ATC aircraft on parking spot. */
    'ATC ON PARKING SPOT': {
        name: 'ATC ON PARKING SPOT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the target altitude for the previous ATC flightplan waypoint. */
    'ATC PREVIOUS WAYPOINT ALTITUDE': {
        name: 'ATC PREVIOUS WAYPOINT ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The name of the airport of the runway assigned by the ATC. Returns "" if no runway is assigned. */
    'ATC RUNWAY AIRPORT NAME': {
        name: 'ATC RUNWAY AIRPORT NAME',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** This float represents the distance between the player's plane and the center of the runway selected by the ATC. */
    'ATC RUNWAY DISTANCE': {
        name: 'ATC RUNWAY DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a float corresponding to the horizontal distance between the player's plane and the end of the runway selected by the ATC. */
    'ATC RUNWAY END DISTANCE': {
        name: 'ATC RUNWAY END DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the true heading of the runway selected by the ATC. */
    'ATC RUNWAY HEADING DEGREES TRUE': {
        name: 'ATC RUNWAY HEADING DEGREES TRUE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The length of the runway assigned by the ATC. Returns -1 if no runway is assigned. */
    'ATC RUNWAY LENGTH': {
        name: 'ATC RUNWAY LENGTH',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a float corresponding to the player's main gear relative X (transverse) position on the runway selected by the ATC. */
    'ATC RUNWAY RELATIVE POSITION X': {
        name: 'ATC RUNWAY RELATIVE POSITION X',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a float corresponding to the player's main gear relative Y (height) position on the runway selected by the ATC. */
    'ATC RUNWAY RELATIVE POSITION Y': {
        name: 'ATC RUNWAY RELATIVE POSITION Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a float corresponding to the player's main gear relative Z (longitudinal) position on the runway selected by the ATC. */
    'ATC RUNWAY RELATIVE POSITION Z': {
        name: 'ATC RUNWAY RELATIVE POSITION Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is a boolean corresponding to whether or not the ATC has pre-selected a runway for the player's plane. If this is false, every other <code class="inline">ATC RUNWAY&nbsp;*</code>&nbsp;SimVar will return default values. */
    'ATC RUNWAY SELECTED': {
        name: 'ATC RUNWAY SELECTED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is a float corresponding to the horizontal distance between the player's plane and the start of the runway selected by the ATC. */
    'ATC RUNWAY START DISTANCE': {
        name: 'ATC RUNWAY START DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the player's main gear relative X (transverse) position according to the aiming point of the runway selected by the ATC. */
    'ATC RUNWAY TDPOINT RELATIVE POSITION X': {
        name: 'ATC RUNWAY TDPOINT RELATIVE POSITION X',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the player's main gear relative Y (height) position according to the aiming point of the runway selected by the ATC. */
    'ATC RUNWAY TDPOINT RELATIVE POSITION Y': {
        name: 'ATC RUNWAY TDPOINT RELATIVE POSITION Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This float represents the player's main relative Z (longitudinal) position according to the aiming point of the runway selected by the ATC. */
    'ATC RUNWAY TDPOINT RELATIVE POSITION Z': {
        name: 'ATC RUNWAY TDPOINT RELATIVE POSITION Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The width of the runway assigned by the ATC. Returns -1 if no runway is assigned. */
    'ATC RUNWAY WIDTH': {
        name: 'ATC RUNWAY WIDTH',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Suggested minimum runway length for landing. Used by ATC. */
    'ATC SUGGESTED MIN RWY LANDING': {
        name: 'ATC SUGGESTED MIN RWY LANDING',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Suggested minimum runway length for takeoff. Used by ATC. */
    'ATC SUGGESTED MIN RWY TAKEOFF': {
        name: 'ATC SUGGESTED MIN RWY TAKEOFF',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>Returns the lateral distance the user's plane is from the path of the currently issued ATC taxi instructions.</span> */
    'ATC TAXIPATH DISTANCE': {
        name: 'ATC TAXIPATH DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Type used by ATC. */
    'ATC TYPE': {
        name: 'ATC TYPE',
        units: 'String (30)',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The stored COM 1/2/3 frequency value. */
    'COM1 STORED FREQUENCY': {
        name: 'COM1 STORED FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The stored COM 1/2/3 frequency value. */
    'COM2 STORED FREQUENCY': {
        name: 'COM2 STORED FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The stored COM 1/2/3 frequency value. */
    'COM3 STORED FREQUENCY': {
        name: 'COM3 STORED FREQUENCY',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Gives the bearing (in degrees) of the active COM station (airport) or a value less than 0 if the station <span>does not belong to an </span>airport. Index is 1, 2 or 3. */
    'COM ACTIVE BEARING:index': {
        name: 'COM ACTIVE BEARING:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>Gives the distance (in meters) to the active COM station (airport) or a value less than -180° if the station does not belong to an airport. Index is 1, 2 or 3.</span> */
    'COM ACTIVE DISTANCE:index': {
        name: 'COM ACTIVE DISTANCE:index',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Com frequency. Index is 1, 2 or 3. */
    'COM ACTIVE FREQUENCY:index': {
        name: 'COM ACTIVE FREQUENCY:index',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The identity of the station that is tuned on the indexed active COM radio. Index is 1, 2, or 3. */
    'COM ACTIVE FREQ IDENT:index': {
        name: 'COM ACTIVE FREQ IDENT:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The type of COM frequency for the active indexed COM system. Index is 1, 2, or 3. */
    'COM ACTIVE FREQ TYPE:index': {
        name: 'COM ACTIVE FREQ TYPE:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** 
          <p>This will return the latitude, longitude and altitude corresponding to the indexed COM station associated with the active COM frequency. If the station is not associated with an airport, then the lat/lon/alt values returned will be <code class="inline">-15943°, 80°, -10000</code> (this means that you can simply check that the altitude value is greater than 0 to assure the validity of the returned struct).</p>
          <p>Index is 1, 2 or 3.</p>
         */
    'COM ACTIVE LATLONALT:index': {
        name: 'COM ACTIVE LATLONALT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if COM1, COM2 or COM3 is available (depending on the index, either 1, 2, or 3) */
    'COM AVAILABLE:index': {
        name: 'COM AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** <em>Not currently used in the simulation.</em> */
    'COM LATLONALT:index': {
        name: 'COM LATLONALT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the plane is receiving on the indexed com channel or not (either 1, 2, or 3 for the index). */
    'COM RECEIVE:index': {
        name: 'COM RECEIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Toggles all COM radios to receive on */
    'COM RECEIVE ALL': {
        name: 'COM RECEIVE ALL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the plane is receiving on the indexed com channel. Index is 1, 2 or 3. */
    'COM RECEIVE EX1:index': {
        name: 'COM RECEIVE EX1:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The COM radio frequency step. Index is 1, 2 or 3. */
    'COM SPACING MODE:index': {
        name: 'COM SPACING MODE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Com standby frequency. Index is 1, 2 or 3. */
    'COM STANDBY FREQUENCY:index': {
        name: 'COM STANDBY FREQUENCY:index',
        units: 'Frequency BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The identity of the station that is tuned on the indexed standby COM radio. Index is 1, 2, or 3. */
    'COM STANDBY FREQ IDENT:index': {
        name: 'COM STANDBY FREQ IDENT:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The type of COM frequency for the standby indexed COM system. Index is 1, 2, or 3. */
    'COM STANDBY FREQ TYPE:index': {
        name: 'COM STANDBY FREQ TYPE:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Radio status flag for the indexed com channel. Index is 1, 2 or 3. */
    'COM STATUS:index': {
        name: 'COM STATUS:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Enter an index of 1, 2 or 3. Will return <code class="inline">TRUE</code> if the COM system is working, <code class="inline">FALSE</code> otherwise. */
    'COM TEST:index': {
        name: 'COM TEST:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Audio panel com transmit state. Index of 1, 2 or 3. */
    'COM TRANSMIT:index': {
        name: 'COM TRANSMIT:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The volume of the COM Radio. */
    'COM VOLUME': {
        name: 'COM VOLUME',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether the FLARM is available (TRUE, 1) or not (FALSE, 0). */
    'FLARM AVAILABLE': {
        name: 'FLARM AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The bearing of the FLARM threat aircraft, relative to track. */
    'FLARM THREAT BEARING': {
        name: 'FLARM THREAT BEARING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The FLARM threat aircraft data structure, which contains data about the perceived threat, returned as a struct. Struct member variables are as follows:</p>
          <ol class="minitoc-list">
            <li><code class="inline">id</code>&nbsp;(U62): the network id of the intruding plane so that they are remembered in order to compute their trajectory.</li>
            <li><code class="inline">bearing</code>&nbsp;(FLOAT64): The threat bearing, in degrees (this is bearing from track axis and not bearing from the airplane axis).</li>
            <li><code class="inline">heading</code>&nbsp;(FLOAT64): The threat heading.</li>
            <li><code class="inline">distance</code>&nbsp;(FLOAT64):&nbsp;The distance between the aircraft and the threat, in meters.</li>
            <li><code class="inline">verticalBearing</code>&nbsp;(FLOAT64):&nbsp;The vertical bearing between the aircraft and the threat, in degrees.</li>
            <li><code class="inline">relativeAltitude</code>&nbsp;(FLOAT64):&nbsp;The relative altitude of the threat to the aircraft, in meters.</li>
            <li><code class="inline">timeToCollision</code>&nbsp;(FLOAT64):&nbsp;The estimated time to a collision, in seconds.</li>
          </ol>
         */
    'FLARM THREAT DATA': {
        name: 'FLARM THREAT DATA',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The distance to the FLARM threat object. */
    'FLARM THREAT DISTANCE': {
        name: 'FLARM THREAT DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The heading to the FLARM threat object. */
    'FLARM THREAT HEADING': {
        name: 'FLARM THREAT HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The relative altitude of the threat object. */
    'FLARM THREAT RELATIVE ALTITUDE': {
        name: 'FLARM THREAT RELATIVE ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The estimated time to a collision. */
    'FLARM THREAT TIME TO COLLISION': {
        name: 'FLARM THREAT TIME TO COLLISION',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The vertical bearing towards the threat. */
    'FLARM THREAT VERTICAL BEARING': {
        name: 'FLARM THREAT VERTICAL BEARING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** ID of airport. */
    'GPS APPROACH AIRPORT ID': {
        name: 'GPS APPROACH AIRPORT ID',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** ID of approach. */
    'GPS APPROACH APPROACH ID': {
        name: 'GPS APPROACH APPROACH ID',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Index of approach for given airport. */
    'GPS APPROACH APPROACH INDEX': {
        name: 'GPS APPROACH APPROACH INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Approach type. */
    'GPS APPROACH APPROACH TYPE': {
        name: 'GPS APPROACH APPROACH TYPE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is approach transition final approach segment. */
    'GPS APPROACH IS FINAL': {
        name: 'GPS APPROACH IS FINAL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is approach segment missed approach segment. */
    'GPS APPROACH IS MISSED': {
        name: 'GPS APPROACH IS MISSED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Waypoint is the runway. */
    'GPS APPROACH IS WP RUNWAY': {
        name: 'GPS APPROACH IS WP RUNWAY',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sub mode within approach mode. */
    'GPS APPROACH MODE': {
        name: 'GPS APPROACH MODE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Segment type within approach. */
    'GPS APPROACH SEGMENT TYPE': {
        name: 'GPS APPROACH SEGMENT TYPE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Deviation of local time from GMT. */
    'GPS APPROACH TIMEZONE DEVIATION': {
        name: 'GPS APPROACH TIMEZONE DEVIATION',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** ID of approach transition. */
    'GPS APPROACH TRANSITION ID': {
        name: 'GPS APPROACH TRANSITION ID',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Index of approach transition. */
    'GPS APPROACH TRANSITION INDEX': {
        name: 'GPS APPROACH TRANSITION INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Number of waypoints. */
    'GPS APPROACH WP COUNT': {
        name: 'GPS APPROACH WP COUNT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Index of current waypoint. */
    'GPS APPROACH WP INDEX': {
        name: 'GPS APPROACH WP INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Waypoint type within approach mode. */
    'GPS APPROACH WP TYPE': {
        name: 'GPS APPROACH WP TYPE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The course deviation of the needle for a CDI instrument. The SimVar displays the deviation from -127 to +127. It returns a value if a flight plan is set (otherwise it will return 0) even if the autopilot isn't on GPS mode. Scaling can also be set through the <code class="inline"><a href="Aircraft_RadioNavigation_Variables.htm#GPS CDI SCALING">GPS CDI SCALING</a></code> simvar. */
    'GPS CDI NEEDLE': {
        name: 'GPS CDI NEEDLE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The full scale deflection of the CDI due to GPS cross-track error, in meters. */
    'GPS CDI SCALING': {
        name: 'GPS CDI SCALING',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Suggested heading to steer (for autopilot). */
    'GPS COURSE TO STEER': {
        name: 'GPS COURSE TO STEER',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** GPS is driving Nav 1 indicator. Note this setting will also affect the SimVars <code class="inline"><a href="Aircraft_RadioNavigation_Variables.htm#HSI_STATION_IDENT">HSI_STATION_IDENT</a></code> and <code class="inline"><a href="Aircraft_RadioNavigation_Variables.htm#HSI_BEARING">HSI_BEARING</a></code>. */
    'GPS DRIVES NAV1': {
        name: 'GPS DRIVES NAV1',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Estimated time of arrival at destination. */
    'GPS ETA': {
        name: 'GPS ETA',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Estimated time en route to destination. */
    'GPS ETE': {
        name: 'GPS ETE',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This is the complete flightplan length from start to end. Essentially the cumulative length of all the flight plan legs added together. */
    'GPS FLIGHTPLAN TOTAL DISTANCE': {
        name: 'GPS FLIGHTPLAN TOTAL DISTANCE',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Number of waypoints. */
    'GPS FLIGHT PLAN WP COUNT': {
        name: 'GPS FLIGHT PLAN WP COUNT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Index of waypoint. */
    'GPS FLIGHT PLAN WP INDEX': {
        name: 'GPS FLIGHT PLAN WP INDEX',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current magnetic ground track. */
    'GPS GROUND MAGNETIC TRACK': {
        name: 'GPS GROUND MAGNETIC TRACK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current ground speed. */
    'GPS GROUND SPEED': {
        name: 'GPS GROUND SPEED',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current true heading. */
    'GPS GROUND TRUE HEADING': {
        name: 'GPS GROUND TRUE HEADING',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current true ground track. */
    'GPS GROUND TRUE TRACK': {
        name: 'GPS GROUND TRUE TRACK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The full scale deflection of the vertical GSI due to GPS glidepath deviation, in meters. */
    'GPS GSI SCALING': {
        name: 'GPS GSI SCALING',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the GPS system has a presently available glidepath for guidance. Only applicable with <code class="inline"><a href="Aircraft_RadioNavigation_Variables.htm#GPS_OVERRIDDEN">GPS_OVERRIDDEN</a></code>. When true and in <code class="inline">GPS OVERRIDDEN</code>, <code class="inline"><a href="Aircraft_RadioNavigation_Variables.htm#HSI_GSI_NEEDLE_VALID">HSI_GSI_NEEDLE_VALID</a></code> will also be true. */
    'GPS HAS GLIDEPATH': {
        name: 'GPS HAS GLIDEPATH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The glide deviation of the needle for a CDI instrument. The simvar displays the deviation from -127 to +127. It returns a value if a flight plan is set (otherwise it will return 0) even if the autopilot isn't on GPS mode. Scaling can also be set through the <code class="inline"><a href="#GPS CDI SCALING">GPS CDI SCALING</a></code> simvar. */
    'GPS HSI NEEDLE': {
        name: 'GPS HSI NEEDLE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Flight plan mode active. */
    'GPS IS ACTIVE FLIGHT PLAN': {
        name: 'GPS IS ACTIVE FLIGHT PLAN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Waypoint mode active. */
    'GPS IS ACTIVE WAY POINT': {
        name: 'GPS IS ACTIVE WAY POINT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is switching to next waypoint locked. */
    'GPS IS ACTIVE WP LOCKED': {
        name: 'GPS IS ACTIVE WP LOCKED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is approach mode active. */
    'GPS IS APPROACH ACTIVE': {
        name: 'GPS IS APPROACH ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is approach loaded. */
    'GPS IS APPROACH LOADED': {
        name: 'GPS IS APPROACH LOADED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is flight plan destination reached. */
    'GPS IS ARRIVED': {
        name: 'GPS IS ARRIVED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Is Direct To Waypoint mode active. */
    'GPS IS DIRECTTO FLIGHTPLAN': {
        name: 'GPS IS DIRECTTO FLIGHTPLAN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Current GPS magnetic variation. */
    'GPS MAGVAR': {
        name: 'GPS MAGVAR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Whether or not the OBS mode is currently active (disable the automatic sequencing of waypoints in GPS flight plan). */
    'GPS OBS ACTIVE': {
        name: 'GPS OBS ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This is the currently selected OBS course in degrees, from 0 to 360. */
    'GPS OBS VALUE': {
        name: 'GPS OBS VALUE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** When it is active, all sim GPS system updates are suspended. This must be set to TRUE to be able to correctly set to any other GPS SimVar. */
    'GPS OVERRIDDEN': {
        name: 'GPS OVERRIDDEN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Current GPS altitude. */
    'GPS POSITION ALT': {
        name: 'GPS POSITION ALT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current GPS latitude. */
    'GPS POSITION LAT': {
        name: 'GPS POSITION LAT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current GPS longitude. */
    'GPS POSITION LON': {
        name: 'GPS POSITION LON',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude of GPS target. */
    'GPS TARGET ALTITUDE': {
        name: 'GPS TARGET ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Distance to target. */
    'GPS TARGET DISTANCE': {
        name: 'GPS TARGET DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Glidepath in degrees. */
    'GPS VERTICAL ANGLE': {
        name: 'GPS VERTICAL ANGLE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Vertical error in degrees from GlidePath. */
    'GPS VERTICAL ANGLE ERROR': {
        name: 'GPS VERTICAL ANGLE ERROR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Vertical deviation in meters from GlidePath. */
    'GPS VERTICAL ERROR': {
        name: 'GPS VERTICAL ERROR',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Magnetic bearing to waypoint. */
    'GPS WP BEARING': {
        name: 'GPS WP BEARING',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Cross track distance. */
    'GPS WP CROSS TRK': {
        name: 'GPS WP CROSS TRK',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The required heading (magnetic) from the previous waypoint to the next waypoint. */
    'GPS WP DESIRED TRACK': {
        name: 'GPS WP DESIRED TRACK',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Distance to waypoint. */
    'GPS WP DISTANCE': {
        name: 'GPS WP DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Estimated time of arrival at waypoint. */
    'GPS WP ETA': {
        name: 'GPS WP ETA',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Estimated time en route to waypoint. */
    'GPS WP ETE': {
        name: 'GPS WP ETE',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude of next waypoint. */
    'GPS WP NEXT ALT': {
        name: 'GPS WP NEXT ALT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** ID of next GPS waypoint. */
    'GPS WP NEXT ID': {
        name: 'GPS WP NEXT ID',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** Latitude of next waypoint. */
    'GPS WP NEXT LAT': {
        name: 'GPS WP NEXT LAT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Longitude of next waypoint. */
    'GPS WP NEXT LON': {
        name: 'GPS WP NEXT LON',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Altitude of previous waypoint. */
    'GPS WP PREV ALT': {
        name: 'GPS WP PREV ALT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** ID of previous GPS waypoint. */
    'GPS WP PREV ID': {
        name: 'GPS WP PREV ID',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** Latitude of previous waypoint. */
    'GPS WP PREV LAT': {
        name: 'GPS WP PREV LAT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Longitude of previous waypoint. */
    'GPS WP PREV LON': {
        name: 'GPS WP PREV LON',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Is previous waypoint valid (i.e. current waypoint is not the first waypoint). */
    'GPS WP PREV VALID': {
        name: 'GPS WP PREV VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Tracking angle error to waypoint. */
    'GPS WP TRACK ANGLE ERROR': {
        name: 'GPS WP TRACK ANGLE ERROR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True bearing to waypoint. */
    'GPS WP TRUE BEARING': {
        name: 'GPS WP TRUE BEARING',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Required true heading to waypoint. */
    'GPS WP TRUE REQ HDG': {
        name: 'GPS WP TRUE REQ HDG',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Vertical speed to waypoint. */
    'GPS WP VERTICAL SPEED': {
        name: 'GPS WP VERTICAL SPEED',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** If the <code class="inline"><a href="Aircraft_RadioNavigation_Variables.htm#GPS_DRIVES_NAV1">GPS_DRIVES_NAV1</a></code> variable is true and the <code class="inline">HSI BEARING VALID</code> variable is true, this variable contains the HSI needle bearing. If the <code class="inline">GPS DRIVES NAV1</code> variable is false and the <code class="inline">HSI BEARING VALID</code> variable is true, this variable contains the ADF1 frequency. */
    'HSI BEARING': {
        name: 'HSI BEARING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This will return true if the <code class="inline">HSI BEARING</code> variable contains valid data. */
    'HSI BEARING VALID': {
        name: 'HSI BEARING VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Needle deflection (+/- 127). */
    'HSI CDI NEEDLE': {
        name: 'HSI CDI NEEDLE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Signal valid. */
    'HSI CDI NEEDLE VALID': {
        name: 'HSI CDI NEEDLE VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** DME/GPS distance. */
    'HSI DISTANCE': {
        name: 'HSI DISTANCE',
        units: 'Nautical miles',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Needle deflection (+/- 119). */
    'HSI GSI NEEDLE': {
        name: 'HSI GSI NEEDLE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Signal valid. */
    'HSI GSI NEEDLE VALID': {
        name: 'HSI GSI NEEDLE VALID',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Station is a localizer. */
    'HSI HAS LOCALIZER': {
        name: 'HSI HAS LOCALIZER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** DME/GPS speed. */
    'HSI SPEED': {
        name: 'HSI SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the ident of the the next GPS waypoint, if <code class="inline"><a href="#GPS_DRIVES_NAV1">GPS_DRIVES_NAV1</a></code> is true. If <code class="inline">GPS DRIVES NAV1</code> is false, it returns the identity of the station that is tuned on nav radio 1. */
    'HSI STATION IDENT': {
        name: 'HSI STATION IDENT',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Nav TO/FROM flag. */
    'HSI TF FLAGS': {
        name: 'HSI TF FLAGS',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Inner marker state. */
    'INNER MARKER': {
        name: 'INNER MARKER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns the latitude, longitude and altitude of the inner marker of an approach to a runway, if the aircraft is within the required proximity, otherwise it will return zeros. */
    'INNER MARKER LATLONALT': {
        name: 'INNER MARKER LATLONALT',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if Marker is available. */
    'MARKER AVAILABLE': {
        name: 'MARKER AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the Marker Beacon is in High Sensitivity mode. */
    'MARKER BEACON SENSITIVITY HIGH': {
        name: 'MARKER BEACON SENSITIVITY HIGH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Marker beacon state. */
    'MARKER BEACON STATE': {
        name: 'MARKER BEACON STATE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Whether or not the Marker Beacon is in Test/Mute mode. */
    'MARKER BEACON TEST MUTE': {
        name: 'MARKER BEACON TEST MUTE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Marker audio flag. */
    'MARKER SOUND': {
        name: 'MARKER SOUND',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Middle marker state. */
    'MIDDLE MARKER': {
        name: 'MIDDLE MARKER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns the latitude, longitude and altitude of the middle marker. */
    'MIDDLE MARKER LATLONALT': {
        name: 'MIDDLE MARKER LATLONALT',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Outer marker state. */
    'OUTER MARKER': {
        name: 'OUTER MARKER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns the latitude, longitude and altitude of the outer marker. */
    'OUTER MARKER LATLONALT': {
        name: 'OUTER MARKER LATLONALT',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Nav active frequency. Index is 1 or 2. */
    'NAV ACTIVE FREQUENCY:index': {
        name: 'NAV ACTIVE FREQUENCY:index',
        units: 'MHz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Flag if Nav equipped on aircraft. */
    'NAV AVAILABLE:index': {
        name: 'NAV AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the listed bit flags. */
    'NAV BACK COURSE FLAGS:index': {
        name: 'NAV BACK COURSE FLAGS:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** CDI needle deflection (+/- 127). */
    'NAV CDI:index': {
        name: 'NAV CDI:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Closest DME distance. Requires an index value from 1 to 4 to set which NAV to target.</p>
          <p>Note that this SimVar will only work if the <code class="inline"><a href="../../Event_IDs/Aircraft_Radio_Navigation_Events.htm#NAV1_CLOSE_FREQ_SET">NAV1_CLOSE_FREQ_SET</a></code> key event has been set to 1 (TRUE).</p>
         */
    'NAV CLOSE DME:index': {
        name: 'NAV CLOSE DME:index',
        units: 'Nautical miles',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Closest Localizer course frequency. Requires an index value from 1 to 4 to set which NAV to target.
          <p>Note that this SimVar will only work if the <code class="inline"><a href="../../Event_IDs/Aircraft_Radio_Navigation_Events.htm#NAV1_CLOSE_FREQ_SET">NAV1_CLOSE_FREQ_SET</a></code> key event has been set to 1 (TRUE).</p>
         */
    'NAV CLOSE FREQUENCY:index': {
        name: 'NAV CLOSE FREQUENCY:index',
        units: 'Hz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** ICAO code. Requires an index value from 1 to 4 to set which NAV to target.
          <p>Note that this SimVar will only work if the <code class="inline"><a href="../../Event_IDs/Aircraft_Radio_Navigation_Events.htm#NAV1_CLOSE_FREQ_SET">NAV1_CLOSE_FREQ_SET</a></code> key event has been set to 1 (TRUE).</p>
         */
    'NAV CLOSE IDENT:index': {
        name: 'NAV CLOSE IDENT:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Closest Localizer course heading. Requires an index value from 1 to 4 to set which NAV to target.
          <p>Note that this SimVar will only work if the <code class="inline"><a href="../../Event_IDs/Aircraft_Radio_Navigation_Events.htm#NAV1_CLOSE_FREQ_SET">NAV1_CLOSE_FREQ_SET</a></code> key event has been set to 1 (TRUE).</p>
         */
    'NAV CLOSE LOCALIZER:index': {
        name: 'NAV CLOSE LOCALIZER:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Descriptive name. Requires an index value from 1 to 4 to set which NAV to target.
          <p>Note that this SimVar will only work if the <code class="inline"><a href="../../Event_IDs/Aircraft_Radio_Navigation_Events.htm#NAV1_CLOSE_FREQ_SET">NAV1_CLOSE_FREQ_SET</a></code> key event has been set to 1 (TRUE).</p>
         */
    'NAV CLOSE NAME:index': {
        name: 'NAV CLOSE NAME:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Returns bit flags with the listed meaning. */
    'NAV CODES': {
        name: 'NAV CODES',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** DME distance. */
    'NAV DME': {
        name: 'NAV DME',
        units: 'Nautical miles',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** DME speed. */
    'NAV DMESPEED': {
        name: 'NAV DMESPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the DME station. */
    'NAV DME LATLONALT:index': {
        name: 'NAV DME LATLONALT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Localizer course frequency */
    'NAV FREQUENCY': {
        name: 'NAV FREQUENCY',
        units: 'Hz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The glide slope gradient. The value returned is an integer value formed as follows:</p>
          <pre class="codeblock">sin(slope) * 65536 * 2</pre>
          <p>So, for example, a glide slope of 2.7º would return a value of 6174. TO get the value in degrees, then use&nbsp;<code class="inline"><a href="Aircraft_RadioNavigation_Variables.htm#NAV_RAW_GLIDE_SLOPE">NAV_RAW_GLIDE_SLOPE</a></code> instead.</p>
         */
    'NAV GLIDE SLOPE': {
        name: 'NAV GLIDE SLOPE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Difference between current position and glideslope angle. Note that this provides 32 bit floating point precision, rather than the 8 bit integer precision of NAV GSI. */
    'NAV GLIDE SLOPE ERROR': {
        name: 'NAV GLIDE SLOPE ERROR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The distance between the plane and the Glide beacon. */
    'NAV GLIDE SLOPE LENGTH': {
        name: 'NAV GLIDE SLOPE LENGTH',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Glideslope needle deflection (+/- 119). Note that this provides only 8 bit precision, whereas NAV GLIDE SLOPE ERROR provides 32 bit floating point precision. */
    'NAV GSI': {
        name: 'NAV GSI',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Glideslope flag. */
    'NAV GS FLAG': {
        name: 'NAV GS FLAG',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns the glide slope. */
    'NAV GS LATLONALT:index': {
        name: 'NAV GS LATLONALT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Nav GS latitude, longitude, altitude. */
    'NAV GS LLAF64': {
        name: 'NAV GS LLAF64',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Flag if found a close station with a DME. */
    'NAV HAS CLOSE DME': {
        name: 'NAV HAS CLOSE DME',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if found a close localizer station. */
    'NAV HAS CLOSE LOCALIZER': {
        name: 'NAV HAS CLOSE LOCALIZER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if tuned station has a DME. */
    'NAV HAS DME': {
        name: 'NAV HAS DME',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if tuned station has a glideslope. */
    'NAV HAS GLIDE SLOPE': {
        name: 'NAV HAS GLIDE SLOPE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if tuned station is a localizer. */
    'NAV HAS LOCALIZER': {
        name: 'NAV HAS LOCALIZER',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if Nav has signal. */
    'NAV HAS NAV': {
        name: 'NAV HAS NAV',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Flag if Nav has a <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a>. */
    'NAV HAS TACAN': {
        name: 'NAV HAS TACAN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** ICAO code. */
    'NAV IDENT': {
        name: 'NAV IDENT',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Localizer course heading. */
    'NAV LOCALIZER': {
        name: 'NAV LOCALIZER',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The airport ICAO ident for the localizer that is currently tuned on the nav radio (like 'EGLL' or 'KJFK') */
    'NAV LOC AIRPORT IDENT': {
        name: 'NAV LOC AIRPORT IDENT',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The letter code for the runway that the currently tuned localizer is tuned to. */
    'NAV LOC RUNWAY DESIGNATOR': {
        name: 'NAV LOC RUNWAY DESIGNATOR',
        units: 'String',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** NAV LOC RUNWAY NUMBER - The number portion of the runway that the currently tuned localizer is tuned to (so if the runway was 15L, this would be 15). */
    'NAV LOC RUNWAY NUMBER': {
        name: 'NAV LOC RUNWAY NUMBER',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Magnetic variation of tuned Nav station. */
    'NAV MAGVAR': {
        name: 'NAV MAGVAR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Descriptive name. */
    'NAV NAME': {
        name: 'NAV NAME',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** OBS setting. Index of 1 or 2. */
    'NAV OBS': {
        name: 'NAV OBS',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Radial that aircraft is on. */
    'NAV RADIAL': {
        name: 'NAV RADIAL',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Difference between current radial and OBS tuned radial. */
    'NAV RADIAL ERROR': {
        name: 'NAV RADIAL ERROR',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The glide slope angle. */
    'NAV RAW GLIDE SLOPE': {
        name: 'NAV RAW GLIDE SLOPE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Relative bearing to station. */
    'NAV RELATIVE BEARING TO STATION': {
        name: 'NAV RELATIVE BEARING TO STATION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Nav signal strength. */
    'NAV SIGNAL': {
        name: 'NAV SIGNAL',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Nav audio flag. Index of 1 or 2. */
    'NAV SOUND:index': {
        name: 'NAV SOUND:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Nav standby frequency. Index is 1 or 2. */
    'NAV STANDBY FREQUENCY:index': {
        name: 'NAV STANDBY FREQUENCY:index',
        units: 'MHz',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns whether the Nav is going to or from the current radial (or is off). */
    'NAV TOFROM': {
        name: 'NAV TOFROM',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The volume of the Nav radio. */
    'NAV VOLUME': {
        name: 'NAV VOLUME',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Distance of the VOR beacon. */
    'NAV VOR DISTANCE': {
        name: 'NAV VOR DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns the VOR station latitude, longitude and altitude. */
    'NAV VOR LATLONALT:index': {
        name: 'NAV VOR LATLONALT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Nav VOR latitude, longitude, altitude. */
    'NAV VOR LLAF64': {
        name: 'NAV VOR LLAF64',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The active channel used by the indexed <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> receiver on the aircraft, from 1 to 127. */
    'TACAN ACTIVE CHANNEL:index': {
        name: 'TACAN ACTIVE CHANNEL:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The active mode used by the indexed <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> receiver on the aircraft, where 0 = <em>X</em> and 1 = <em>Y</em>. */
    'TACAN ACTIVE MODE:index': {
        name: 'TACAN ACTIVE MODE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Will be TRUE (1) if NAV1, NAV2, NAV3 or NAV4 can receive <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> (depending on the index - 1, 2, 3, or 4), or FALSE (0) otherwise. */
    'TACAN AVAILABLE:index': {
        name: 'TACAN AVAILABLE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Tells whether the <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> is driving the&nbsp;Nav 1 indicator (TRUE, 1) or not (FALSE, 0), for autopilot purposes. */
    'TACAN DRIVES NAV1:index': {
        name: 'TACAN DRIVES NAV1:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> OBS setting, in degrees. */
    'TACAN OBS:index': {
        name: 'TACAN OBS:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The standby channel used by the indexed <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> receiver on the aircraft, from 1 to 127. */
    'TACAN STANDBY CHANNEL:index': {
        name: 'TACAN STANDBY CHANNEL:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Indicates&nbsp;the indexed <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> receiver standby mode, where 0 = <em>X</em> and 1 = <em>Y</em>. */
    'TACAN STANDBY MODE:index': {
        name: 'TACAN STANDBY MODE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The CDI needle deflection amount(course deviation) to the station. Can be +/- 127. */
    'TACAN STATION CDI:index': {
        name: 'TACAN STATION CDI:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The distance between the <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> station position and the aircraft position. The index value refers to the Tacan receiver connected to the station (1 or 2). */
    'TACAN STATION DISTANCE:index': {
        name: 'TACAN STATION DISTANCE:index',
        units: 'Meter',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The tuned station identifier for the indexed <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a>. */
    'TACAN STATION IDENT:index': {
        name: 'TACAN STATION IDENT:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Retrieves the latitude, longitude and altitude of the <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> station. */
    'TACAN STATION LATLONALT:index': {
        name: 'TACAN STATION LATLONALT:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The radial between the <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> station and the aircraft. */
    'TACAN STATION RADIAL:index': {
        name: 'TACAN STATION RADIAL:index',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Difference between the current radial and OBS tuned radial, in degrees. */
    'TACAN STATION RADIAL ERROR:index': {
        name: 'TACAN STATION RADIAL ERROR:index',
        units: 'Degrees.',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns whether the indexed <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> is going <em>to</em> or <em>from</em> the current radial (or is off). */
    'TACAN STATION TOFROM:index': {
        name: 'TACAN STATION TOFROM:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The volume value of the indexed <a href="#" data-popovertext="This stands for Tactical Air Navigation system, and is a navigation system generally used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation." data-rhwidget="TextPopOver">Tacan</a> receiver on the aircraft. */
    'TACAN VOLUME:index': {
        name: 'TACAN VOLUME:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** On which channel the copilot is transmitting. */
    'COPILOT TRANSMITTER TYPE': {
        name: 'COPILOT TRANSMITTER TYPE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the copilot is transmitting. */
    'COPILOT TRANSMITTING': {
        name: 'COPILOT TRANSMITTING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** On which channel the pilot is transmitting. */
    'PILOT TRANSMITTER TYPE': {
        name: 'PILOT TRANSMITTER TYPE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the pilot is transmitting. */
    'PILOT TRANSMITTING': {
        name: 'PILOT TRANSMITTING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** <em>Currently not used within the simulation.</em> */
    'RADIOS AVAILABLE': {
        name: 'RADIOS AVAILABLE',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Radar altitude. */
    'RADIO HEIGHT': {
        name: 'RADIO HEIGHT',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if a transponder is available. */
    'TRANSPONDER AVAILABLE': {
        name: 'TRANSPONDER AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 4-digit code. */
    'TRANSPONDER CODE:index': {
        name: 'TRANSPONDER CODE:index',
        units: 'BCD16',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This can set the Ident transponder using the <code class="inline">KEY_XPNDR_IDENT_SET</code>, <code class="inline">KEY_XPNDR_IDENT_TOGGLE</code>, <code class="inline">KEY_XPNDR_IDENT_ON</code> or <code class="inline">KEY_XPNDR_IDENT_OFF</code> Event IDs (see <a href="../../Event_IDs/Aircraft_Radio_Navigation_Events.htm#Transponder">XPNDR (Transponder)</a> section for more information). When set to true, it will automatically turn false after 18 seconds. */
    'TRANSPONDER IDENT': {
        name: 'TRANSPONDER IDENT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Transponder State. */
    'TRANSPONDER STATE': {
        name: 'TRANSPONDER STATE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Angle of True calibration scale on airspeed indicator. */
    'AIRSPEED TRUE CALIBRATE': {
        name: 'AIRSPEED TRUE CALIBRATE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Alternate static air source. */
    'ALTERNATE STATIC SOURCE OPEN:index': {
        name: 'ALTERNATE STATIC SOURCE OPEN:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Anemometer rpm as a percentage. */
    'ANEMOMETER PCT RPM': {
        name: 'ANEMOMETER PCT RPM',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <a href="#" data-popovertext="This stands for the 'Angle of Attack', which specifies the angle between the chord line of the wing of a fixed-wing aircraft and the vector representing the relative motion between the aircraft and the atmosphere." data-rhwidget="TextPopOver">AoA</a> indication. */
    'ANGLE OF ATTACK INDICATOR': {
        name: 'ANGLE OF ATTACK INDICATOR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <em>Currently not used in the simulation.</em> */
    'ANNUNCIATOR SWITCH': {
        name: 'ANNUNCIATOR SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Used when too close to a fire. */
    'APPLY HEAT TO SYSTEMS': {
        name: 'APPLY HEAT TO SYSTEMS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if the audio panel is available. */
    'AUDIO PANEL AVAILABLE': {
        name: 'AUDIO PANEL AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The Volume of the Audio Panel. */
    'AUDIO PANEL VOLUME': {
        name: 'AUDIO PANEL VOLUME',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Auto-throttle active. */
    'AUTOTHROTTLE ACTIVE': {
        name: 'AUTOTHROTTLE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is auto-coordination active. */
    'AUTO COORDINATION': {
        name: 'AUTO COORDINATION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The avionics master switch position, <code class="inline">true</code> if the switch is ON. Use an avionics circuit index when referencing. */
    'AVIONICS MASTER SWITCH:index': {
        name: 'AVIONICS MASTER SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the No Smoking switch is on. */
    'CABIN NO SMOKING ALERT SWITCH': {
        name: 'CABIN NO SMOKING ALERT SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the Seatbelts switch is on. */
    'CABIN SEATBELTS ALERT SWITCH': {
        name: 'CABIN SEATBELTS ALERT SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent primary door/exit open. */
    'CANOPY OPEN': {
        name: 'CANOPY OPEN',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if carburetor&nbsp;heat available. */
    'CARB HEAT AVAILABLE': {
        name: 'CARB HEAT AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Rate of turn of heading indicator. */
    'DELTA HEADING RATE': {
        name: 'DELTA HEADING RATE',
        units: 'Radians per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** <a href="#" data-popovertext="This stands for 'Distance Measuring Equipment' and is a type of navigation beacon - usually coupled with VOR or ILS - to enable aircraft to measure their position relative to that beacon.  A 'DME arc' would then be a circle defined around the beacon at a given distance." data-rhwidget="TextPopOver">DME</a> audio flag. */
    'DME SOUND': {
        name: 'DME SOUND',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the Emergency Locator Transmitter is active. */
    'ELT ACTIVATED': {
        name: 'ELT ACTIVATED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Generic SimVar. */
    'EXTERNAL SYSTEM VALUE': {
        name: 'EXTERNAL SYSTEM VALUE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if the fire bottle is discharged. */
    'FIRE BOTTLE DISCHARGED': {
        name: 'FIRE BOTTLE DISCHARGED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the fire bottle switch is on. */
    'FIRE BOTTLE SWITCH': {
        name: 'FIRE BOTTLE SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This variable will return a value between 0 and 1 for the automatic brightness setting for glass cockpit displays, where 0 is the dimmest and 1 is the brightest. This value will vary depending on the time of day. */
    'GLASSCOCKPIT AUTOMATIC BRIGHTNESS': {
        name: 'GLASSCOCKPIT AUTOMATIC BRIGHTNESS',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the Ground Proximity Warning System is active. */
    'GPWS SYSTEM ACTIVE': {
        name: 'GPWS SYSTEM ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if Ground Proximity Warning System installed. */
    'GPWS WARNING': {
        name: 'GPWS WARNING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Angular error of heading indicator. */
    'GYRO DRIFT ERROR': {
        name: 'GYRO DRIFT ERROR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Will return whether the aircraft has stall protection (true) or not (false). */
    'HAS STALL PROTECTION': {
        name: 'HAS STALL PROTECTION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Heading indicator (directional gyro) indication. */
    'HEADING INDICATOR': {
        name: 'HEADING INDICATOR',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The indicated altitude. */
    'INDICATED ALTITUDE': {
        name: 'INDICATED ALTITUDE',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Indicated altitude with the altimeter calibrated to current sea level pressure. */
    'INDICATED ALTITUDE CALIBRATED': {
        name: 'INDICATED ALTITUDE CALIBRATED',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Similar to <code class="inline">INDICATED_ALTITUDE</code> but doesn't affect actual plane position when setting this variable. */
    'INDICATED ALTITUDE EX1': {
        name: 'INDICATED ALTITUDE EX1',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Inductor compass heading. */
    'INDUCTOR COMPASS HEADING REF': {
        name: 'INDUCTOR COMPASS HEADING REF',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Inductor compass deviation reading. */
    'INDUCTOR COMPASS PERCENT DEVIATION': {
        name: 'INDUCTOR COMPASS PERCENT DEVIATION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'INSTRUMENTS AVAILABLE': {
        name: 'INSTRUMENTS AVAILABLE',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Intercom Mode */
    'INTERCOM MODE': {
        name: 'INTERCOM MODE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Whether or not the intercom system is active. */
    'INTERCOM SYSTEM ACTIVE': {
        name: 'INTERCOM SYSTEM ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the altitude of the aircraft is frozen. */
    'IS ALTITUDE FREEZE ON': {
        name: 'IS ALTITUDE FREEZE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the attitude (pitch, bank and heading) of the aircraft is frozen. */
    'IS ATTITUDE FREEZE ON': {
        name: 'IS ATTITUDE FREEZE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the lat/lon of the aircraft (either user or AI controlled) is frozen. If this variable returns true, it means that the latitude and longitude of the aircraft are not being controlled by ESP, so enabling, for example, a SimConnect client to control the position of the aircraft. This can also apply to altitude and attitude.<br>
          <br>
          Also refer to the range of KEY_FREEZE..... Event IDs.
         */
    'IS LATITUDE LONGITUDE FREEZE ON': {
        name: 'IS LATITUDE LONGITUDE FREEZE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The value for the given altimeter index in inches of mercury.</p>
          <p><span class="note"><strong>IMPORTANT!</strong> In the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm">system.cfg</a> file, altimeters are indexed from 0, but the SimVar indexes from 1. So, altimeter 0 in that file is accessed using <code class="inline">KOHLSMAN SETTING HG:1</code>, 1 by <code class="inline">KOHLSMAN SETTING HG:2</code>, etc...</span></p>
         */
    'KOHLSMAN SETTING HG:index': {
        name: 'KOHLSMAN SETTING HG:index',
        units: 'Inches of Mercury, inHg',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The value for the given altimeter index in millibars.</p>
          <p><span class="note"><strong>IMPORTANT!</strong> In the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm">system.cfg</a> file, altimeters are indexed from 0, but the SimVar indexes from 1. So, altimeter 0 in that file is accessed using <code class="inline">KOHLSMAN SETTING MB:1</code>, 1 by <code class="inline">KOHLSMAN SETTING MB:2</code>, etc...</span></p>
         */
    'KOHLSMAN SETTING MB:index': {
        name: 'KOHLSMAN SETTING MB:index',
        units: 'Millibars',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>True if the indexed altimeter is in "Standard" mode, or false otherwise.</p>
          <p><span class="note"><strong>IMPORTANT!</strong> In the <a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm">system.cfg</a> file, altimeters are indexed from 0, but the SimVar indexes from 1. So, altimeter 0 in that file is accessed using <code class="inline">KOHLSMAN SETTING STD:1</code>, 1 by <code class="inline">KOHLSMAN SETTING STD:2</code>, etc...</span></p>
         */
    'KOHLSMAN SETTING STD:index': {
        name: 'KOHLSMAN SETTING STD:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Compass reading. */
    'MAGNETIC COMPASS': {
        name: 'MAGNETIC COMPASS',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of manual fuel pump handle. 1 is fully deployed. */
    'MANUAL FUEL PUMP HANDLE': {
        name: 'MANUAL FUEL PUMP HANDLE',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Overspeed warning state. */
    'OVERSPEED WARNING': {
        name: 'OVERSPEED WARNING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if panel anti-ice switch is on. */
    'PANEL ANTI ICE SWITCH': {
        name: 'PANEL ANTI ICE SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Amount of pitot ice. 100 is fully iced. */
    'PITOT ICE PCT': {
        name: 'PITOT ICE PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Pitot heat active. */
    'PITOT HEAT': {
        name: 'PITOT HEAT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Pitot heat switch state. */
    'PITOT HEAT SWITCH:index': {
        name: 'PITOT HEAT SWITCH:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** <span>Standard Altitude, ie: at a 1013.25 hPa (1 atmosphere) setting.</span> */
    'PRESSURE ALTITUDE': {
        name: 'PRESSURE ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The current altitude of the cabin pressurization.</p>
         */
    'PRESSURIZATION CABIN ALTITUDE': {
        name: 'PRESSURIZATION CABIN ALTITUDE',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The set altitude of the cabin pressurization as initialised from the <a href="../../../Developer_Mode/Aircraft_Editor/Tabs/The_Systems_Tab.htm#Design Cabin Pressure">Design Cabin Pressure</a> value in the <code class="inline">systems.cfg</code> file. Pressure is converted into an altitude using a standard condition table.</p>
          <p>You can adjust the goal pressure using the&nbsp;<code class="inline"><a href="../../Event_IDs/Aircraft_Misc_Events.htm#PRESSURIZATION_PRESSURE_ALT_INC">PRESSURIZATION_PRESSURE_ALT_INC</a></code> and&nbsp;<code class="inline"><a href="../../Event_IDs/Aircraft_Misc_Events.htm#PRESSURIZATION_PRESSURE_ALT_DEC">PRESSURIZATION_PRESSURE_ALT_DEC</a></code> events.</p>
         */
    'PRESSURIZATION CABIN ALTITUDE GOAL': {
        name: 'PRESSURIZATION CABIN ALTITUDE GOAL',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The rate at which cabin pressurization changes. */
    'PRESSURIZATION CABIN ALTITUDE RATE': {
        name: 'PRESSURIZATION CABIN ALTITUDE RATE',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the cabin pressurization dump switch is on. */
    'PRESSURIZATION DUMP SWITCH': {
        name: 'PRESSURIZATION DUMP SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The difference in pressure between the set altitude pressurization and the current pressurization. */
    'PRESSURIZATION PRESSURE DIFFERENTIAL': {
        name: 'PRESSURIZATION PRESSURE DIFFERENTIAL',
        units: 'Pounds per square foot, psf',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if Rad INS switch on. */
    'RAD INS SWITCH': {
        name: 'RAD INS SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Selected DME. */
    'SELECTED DME': {
        name: 'SELECTED DME',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Smoke system available.</p>
          <p><span class="note"><strong>NOTE</strong>: There is no default "smoke system" that this SimVar works on and this is a <em>legacy</em> variable that is available for use should you wish to use it but it affects nothing by default.</span></p>
         */
    'SMOKESYSTEM AVAILABLE': {
        name: 'SMOKESYSTEM AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Set to True to activate the smoke system, if one is available. Please see the notes for <code class="inline">SMOKESYSTEM AVAILABLE</code> for more information.</p>
         */
    'SMOKE ENABLE': {
        name: 'SMOKE ENABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Whether or not the speaker is active. */
    'SPEAKER ACTIVE': {
        name: 'SPEAKER ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if stall alarm available. */
    'STALL HORN AVAILABLE': {
        name: 'STALL HORN AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Alpha below which the Stall Protection can be disabled. See the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#STALLPROTECTION">[STALL PROTECTION]</a></code> section for more information. */
    'STALL PROTECTION OFF LIMIT': {
        name: 'STALL PROTECTION OFF LIMIT',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The alpha that the Stall Protection will attempt to reach when triggered. See the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#STALLPROTECTION">[STALL PROTECTION]</a></code> section for more information. */
    'STALL PROTECTION ON GOAL': {
        name: 'STALL PROTECTION ON GOAL',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Alpha above which the Stall Protection timer starts. See the <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/flight_model_cfg.htm#STALLPROTECTION">[STALL PROTECTION]</a></code> section for more information. */
    'STALL PROTECTION ON LIMIT': {
        name: 'STALL PROTECTION ON LIMIT',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Stall warning state. */
    'STALL WARNING': {
        name: 'STALL WARNING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the aircraft structure deice switch is on. */
    'STRUCTURAL DEICE SWITCH': {
        name: 'STRUCTURAL DEICE SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Vacuum system suction pressure. */
    'SUCTION PRESSURE': {
        name: 'SUCTION PRESSURE',
        units: 'Inches of Mercury, inHg',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'SYSTEMS AVAILABLE': {
        name: 'SYSTEMS AVAILABLE',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the tailhook handle is engaged. */
    'TAILHOOK HANDLE': {
        name: 'TAILHOOK HANDLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent tail hook extended. */
    'TAILHOOK POSITION': {
        name: 'TAILHOOK POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Position of tow release handle. 100 is fully deployed. */
    'TOW RELEASE HANDLE': {
        name: 'TOW RELEASE HANDLE',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if True Airspeed has been selected. */
    'TRUE AIRSPEED SELECTED': {
        name: 'TRUE AIRSPEED SELECTED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Turn coordinator ball position. */
    'TURN COORDINATOR BALL': {
        name: 'TURN COORDINATOR BALL',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Turn coordinator ball position inverted (upside down). */
    'TURN COORDINATOR BALL INV': {
        name: 'TURN COORDINATOR BALL INV',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Turn indicator reading.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer<span> to all&nbsp;<strong>near</strong>&nbsp;aircraft</span>. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'TURN INDICATOR RATE': {
        name: 'TURN INDICATOR RATE',
        units: 'Radians per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if turn indicator switch is on. */
    'TURN INDICATOR SWITCH': {
        name: 'TURN INDICATOR SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if the aircraft windshield deice switch is on. */
    'WINDSHIELD DEICE SWITCH': {
        name: 'WINDSHIELD DEICE SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p><strong>Deprecated, do not use!</strong></p>
          <p><strong></strong>Use <code class="inline"><a href="Aircraft_System_Variables.htm#MAGNETIC_COMPASS">MAGNETIC_COMPASS</a></code> instead.</p>
         */
    'WISKEY COMPASS INDICATION DEGREES': {
        name: 'WISKEY COMPASS INDICATION DEGREES',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The MacCready setting used to fly an optimal speed between thermals. */
    'VARIOMETER MAC CREADY SETTING': {
        name: 'VARIOMETER MAC CREADY SETTING',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Variometer rate using Netto (Total Energy - polar sinkRate). */
    'VARIOMETER NETTO': {
        name: 'VARIOMETER NETTO',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The variometer rate. */
    'VARIOMETER RATE': {
        name: 'VARIOMETER RATE',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Optimal speed to fly between thermals using polar curve and MacCready setting. */
    'VARIOMETER SPEED TO FLY': {
        name: 'VARIOMETER SPEED TO FLY',
        units: 'Kilometers per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The glide ratio at optimal speed to fly. */
    'VARIOMETER SPEED TO FLY GLIDE RATIO': {
        name: 'VARIOMETER SPEED TO FLY GLIDE RATIO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the variometer switch is on, false if it is not. */
    'VARIOMETER SWITCH': {
        name: 'VARIOMETER SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The variometer rate using total energy.</p>
          <pre class="codeblock">Total Energy = Potential Energy + Kinetic Energy</pre>
         */
    'VARIOMETER TOTAL ENERGY': {
        name: 'VARIOMETER TOTAL ENERGY',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The capacity of the indexed water ballast tank. */
    'WATER BALLAST TANK CAPACITY:index': {
        name: 'WATER BALLAST TANK CAPACITY:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The number of water ballast tank available. */
    'WATER BALLAST TANK NUMBER': {
        name: 'WATER BALLAST TANK NUMBER',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The quantity of water ballast in the indexed tank. */
    'WATER BALLAST TANK QUANTITY:index': {
        name: 'WATER BALLAST TANK QUANTITY:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True (1) if a water ballast valve is available, False (0) otherwise. */
    'WATER BALLAST VALVE': {
        name: 'WATER BALLAST VALVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The flow rate of the water ballast valve. */
    'WATER BALLAST VALVE FLOW RATE': {
        name: 'WATER BALLAST VALVE FLOW RATE',
        units: 'Gallons per hour',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This variable will return 1 (TRUE) if all the ballast tank valves are open, or 0 (FALSE) otherwise. */
    'WATER BALLAST EVERY VALVE OPEN': {
        name: 'WATER BALLAST EVERY VALVE OPEN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Will return true if any interior light is on or false otherwise. */
    'IS ANY INTERIOR LIGHT ON': {
        name: 'IS ANY INTERIOR LIGHT ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Landing light pitch bank and heading. */
    'LANDING LIGHT PBH': {
        name: 'LANDING LIGHT PBH',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Light switch state.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT BEACON': {
        name: 'LIGHT BEACON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target beacon light is functioning <em>or</em> if the switch is ON. Use beacon <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT BEACON ON': {
        name: 'LIGHT BEACON ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Vehicle backlights current intensity (0 = off, 1 = full intensity). */
    'LIGHT BACKLIGHT INTENSITY': {
        name: 'LIGHT BACKLIGHT INTENSITY',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target brake light is functioning or if the switch is ON. */
    'LIGHT BRAKE ON': {
        name: 'LIGHT BRAKE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state. */
    'LIGHT CABIN': {
        name: 'LIGHT CABIN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target cabin light is functioning <em>or </em>if the switch is ON. Use the cabin <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT CABIN ON': {
        name: 'LIGHT CABIN ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current cabin light power setting. Requires the cabin <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT CABIN POWER SETTING': {
        name: 'LIGHT CABIN POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Whether or not the Light switch for the Glareshield is enabled. */
    'LIGHT GLARESHIELD': {
        name: 'LIGHT GLARESHIELD',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target glareshield light is functioning <em>or</em> if the switch is ON. Use the glareshield <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT GLARESHIELD ON': {
        name: 'LIGHT GLARESHIELD ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current glareshield light power setting. Requires the glareshield <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT GLARESHIELD POWER SETTING': {
        name: 'LIGHT GLARESHIELD POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Vehicle gyrolights current intensity (0 = off, 1 = full intensity). */
    'LIGHT GYROLIGHT INTENSITY': {
        name: 'LIGHT GYROLIGHT INTENSITY',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target navigation light is functioning or if the switch is ON. */
    'LIGHT HEAD ON': {
        name: 'LIGHT HEAD ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Vehicle headlights current intensity (0 = off, 1 = full intensity). */
    'LIGHT HEADLIGHT INTENSITY': {
        name: 'LIGHT HEADLIGHT INTENSITY',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target landing light is functioning <em>or</em> if the switch is ON. Use landing <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT LANDING ON': {
        name: 'LIGHT LANDING ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Light switch state for landing light.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT LANDING': {
        name: 'LIGHT LANDING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>Light switch state for logo light.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT LOGO': {
        name: 'LIGHT LOGO',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target logo light is functioning <em>or</em> if the switch is ON. Use the logo <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT LOGO ON': {
        name: 'LIGHT LOGO ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Returns <code class="inline">true</code> if the target navigation light is functioning or if the switch is ON. Use navigation <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT NAV ON': {
        name: 'LIGHT NAV ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state for the NAV light. */
    'LIGHT NAV': {
        name: 'LIGHT NAV',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>Bit mask:[index]</p>
          <ol class="minitoc-list">
            <li>0x0001:[index] Nav</li>
            <li>0x0002:[index] Beacon</li>
            <li>0x0004:[index] Landing</li>
            <li>0x0008:[index] Taxi</li>
            <li>0x0010:[index] Strobe</li>
            <li>0x0020:[index] Panel</li>
            <li>0x0040:[index] Recognition</li>
            <li>0x0080:[index] Wing</li>
            <li>0x0100:[index] Logo</li>
            <li>0x0200:[index] Cabin</li>
          </ol>
         */
    'LIGHT ON STATES': {
        name: 'LIGHT ON STATES',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Light switch state of the panel light. */
    'LIGHT PANEL': {
        name: 'LIGHT PANEL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target panel light is functioning <em>or</em> if the switch is ON. Use the panel <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT PANEL ON': {
        name: 'LIGHT PANEL ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current panel light power setting. Requires the panel <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT PANEL POWER SETTING': {
        name: 'LIGHT PANEL POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Whether or not the Light switch for the Pedestal is enabled.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT PEDESTRAL': {
        name: 'LIGHT PEDESTRAL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>Returns <code class="inline">true</code> if the target pedestral light is functioning <em>or</em> if the switch is ON. Requires the pedestral <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index.</p>
         */
    'LIGHT PEDESTRAL ON': {
        name: 'LIGHT PEDESTRAL ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The current pedestral light power setting. Requires the pedestral <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT PEDESTRAL POWER SETTING': {
        name: 'LIGHT PEDESTRAL POWER SETTING',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Adjust the potentiometer of the indexed lighting. Index is defined in the appropriate <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> hashmap setting. */
    'LIGHT POTENTIOMETER:index': {
        name: 'LIGHT POTENTIOMETER:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Light switch state for the recognition light.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT RECOGNITION': {
        name: 'LIGHT RECOGNITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target recognition light is functioning <em>or</em> if the switch is ON. Use the recognition <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT RECOGNITION ON': {
        name: 'LIGHT RECOGNITION ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Same as <code class="inline"><a href="Aircraft_System_Variables.htm#LIGHT_ON_STATES">LIGHT_ON_STATES</a></code>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT STATES': {
        name: 'LIGHT STATES',
        units: 'Mask',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Light switch state for the strobe lights.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT STROBE': {
        name: 'LIGHT STROBE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>Returns <code class="inline">true</code> if the target strobe light is functioning <em>or</em> if the switch is ON. Use the strobe <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT STROBE ON': {
        name: 'LIGHT STROBE ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Light switch state for the taxi light.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT TAXI': {
        name: 'LIGHT TAXI',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target taxi light is functioning <em>or</em> if the switch is ON. Use taxi <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT TAXI ON': {
        name: 'LIGHT TAXI ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Light switch state for the wing lights.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="../Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'LIGHT WING': {
        name: 'LIGHT WING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns <code class="inline">true</code> if the target wing light is functioning <em>or</em> if the switch is ON. Use the wing <code class="inline"><a href="../../../Content_Configuration/SimObjects/Aircraft_SimO/systems_cfg.htm#lightdef">lightdef</a></code> index. */
    'LIGHT WING ON': {
        name: 'LIGHT WING ON',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if instrument lights are set manually. */
    'MANUAL INSTRUMENT LIGHTS': {
        name: 'MANUAL INSTRUMENT LIGHTS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True if strobe lights are available. */
    'STROBES AVAILABLE': {
        name: 'STROBES AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'STROBE FLASH': {
        name: 'STROBE FLASH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Hydraulic system pressure. Indexes start at 1. */
    'HYDRAULIC PRESSURE:index': {
        name: 'HYDRAULIC PRESSURE:index',
        units: 'Pound force per square foot',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Hydraulic pressure changes will follow changes to this variable. Indexes start at 1. */
    'HYDRAULIC RESERVOIR PERCENT:index': {
        name: 'HYDRAULIC RESERVOIR PERCENT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** True if hydraulic switch is on. */
    'HYDRAULIC SWITCH': {
        name: 'HYDRAULIC SWITCH',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Percent system functional. */
    'HYDRAULIC SYSTEM INTEGRITY': {
        name: 'HYDRAULIC SYSTEM INTEGRITY',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL ADF': {
        name: 'PARTIAL PANEL ADF',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL AIRSPEED': {
        name: 'PARTIAL PANEL AIRSPEED',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL ALTIMETER': {
        name: 'PARTIAL PANEL ALTIMETER',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL ATTITUDE': {
        name: 'PARTIAL PANEL ATTITUDE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL AVIONICS': {
        name: 'PARTIAL PANEL AVIONICS',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL COMM': {
        name: 'PARTIAL PANEL COMM',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL COMPASS': {
        name: 'PARTIAL PANEL COMPASS',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL ELECTRICAL': {
        name: 'PARTIAL PANEL ELECTRICAL',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL ENGINE': {
        name: 'PARTIAL PANEL ENGINE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL FUEL INDICATOR': {
        name: 'PARTIAL PANEL FUEL INDICATOR',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL HEADING': {
        name: 'PARTIAL PANEL HEADING',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL NAV': {
        name: 'PARTIAL PANEL NAV',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL PITOT': {
        name: 'PARTIAL PANEL PITOT',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL TRANSPONDER': {
        name: 'PARTIAL PANEL TRANSPONDER',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL TURN COORDINATOR': {
        name: 'PARTIAL PANEL TURN COORDINATOR',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL VACUUM': {
        name: 'PARTIAL PANEL VACUUM',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Gauge fail flag. */
    'PARTIAL PANEL VERTICAL VELOCITY': {
        name: 'PARTIAL PANEL VERTICAL VELOCITY',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The number of droppable objects at the station number identified by the index. */
    'DROPPABLE OBJECTS COUNT:index': {
        name: 'DROPPABLE OBJECTS COUNT:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The type of droppable object at the station number identified by the index. */
    'DROPPABLE OBJECTS TYPE:index': {
        name: 'DROPPABLE OBJECTS TYPE:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: true,
    },
    /** Descriptive name, used in User Interface dialogs, of a droppable object, identified by index. */
    'DROPPABLE OBJECTS UI NAME:index': {
        name: 'DROPPABLE OBJECTS UI NAME:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Number of payload stations (1 to 15). */
    'PAYLOAD STATION COUNT': {
        name: 'PAYLOAD STATION COUNT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Descriptive name for payload station. */
    'PAYLOAD STATION NAME:index': {
        name: 'PAYLOAD STATION NAME:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The number of objects at the payload station. */
    'PAYLOAD STATION NUM SIMOBJECTS:index': {
        name: 'PAYLOAD STATION NUM SIMOBJECTS:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Places the named object at the payload station identified by the index (starting from 1). The string is the Container name (refer to the title property of Simulation Object Configuration Files). */
    'PAYLOAD STATION OBJECT:index': {
        name: 'PAYLOAD STATION OBJECT:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Individual payload station weight. */
    'PAYLOAD STATION WEIGHT:index': {
        name: 'PAYLOAD STATION WEIGHT:index',
        units: 'Pounds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This is the current state of the fuel warning, either on (<code class="inline">true</code>) or off (<code class="inline">false</code>). */
    'WARNING FUEL': {
        name: 'WARNING FUEL',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the left fuel tank warning, either on (<code class="inline">true</code>) or off (<code class="inline">false</code>). */
    'WARNING FUEL LEFT': {
        name: 'WARNING FUEL LEFT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the right fuel tank warning, either on (<code class="inline">true</code>) or off (<code class="inline">false</code>). */
    'WARNING FUEL RIGHT': {
        name: 'WARNING FUEL RIGHT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the low height warning, either on (<code class="inline">true</code>) or off (<code class="inline">false</code>). */
    'WARNING LOW HEIGHT': {
        name: 'WARNING LOW HEIGHT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the oil pressure warning, either on (<code class="inline">true</code>) or off (<code class="inline">false</code>). */
    'WARNING OIL PRESSURE': {
        name: 'WARNING OIL PRESSURE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the vacuum system warning, either on (<code class="inline">true</code>) or off (<code class="inline">false</code>). */
    'WARNING VACUUM': {
        name: 'WARNING VACUUM',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the left vacuum system warning, either on (<code class="inline">true</code>) or off (<code class="inline">false</code>). */
    'WARNING VACUUM LEFT': {
        name: 'WARNING VACUUM LEFT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the right vacuum system warning, either on (<code class="inline">true</code>) or off (<code class="inline">false</code>). */
    'WARNING VACUUM RIGHT': {
        name: 'WARNING VACUUM RIGHT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is the current state of the electrical system voltage warning, either on (<code class="inline">true</code>) or off (<code class="inline">false</code>). */
    'WARNING VOLTAGE': {
        name: 'WARNING VOLTAGE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Yoke position in horizontal direction. */
    'YOKE X INIDICATOR': {
        name: 'YOKE X INIDICATOR',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent control deflection left/right (for animation). */
    'YOKE X POSITION': {
        name: 'YOKE X POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent control deflection left/right (for animation). Also includes AP's inputs. */
    'YOKE X POSITION WITH AP': {
        name: 'YOKE X POSITION WITH AP',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Yoke position in vertical direction. */
    'YOKE Y INIDICATOR': {
        name: 'YOKE Y INIDICATOR',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent control deflection fore/aft (for animation). */
    'YOKE Y POSITION': {
        name: 'YOKE Y POSITION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Percent control deflection fore/aft (for animation). Also includes AP's inputs. */
    'YOKE Y POSITION WITH AP': {
        name: 'YOKE Y POSITION WITH AP',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent door/exit open. */
    'EXIT OPEN:index': {
        name: 'EXIT OPEN:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Position of exit relative to datum reference point. */
    'EXIT POSX:index': {
        name: 'EXIT POSX:index',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of exit relative to datum reference point. */
    'EXIT POSY:index': {
        name: 'EXIT POSY:index',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position of exit relative to datum reference point. */
    'EXIT POSZ:index': {
        name: 'EXIT POSZ:index',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The exit type. */
    'EXIT TYPE:index': {
        name: 'EXIT TYPE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The position of the helicopter\'s collective. 0 is fully up, 100 fully depressed. */
    'COLLECTIVE POSITION': {
        name: 'COLLECTIVE POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Rotor bank angle of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'DISK BANK ANGLE:index': {
        name: 'DISK BANK ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Rotor bank percent of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'DISK BANK PCT:index': {
        name: 'DISK BANK PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Rotor coning percent of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'DISK CONING PCT:index': {
        name: 'DISK CONING PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Rotor pitch angle of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'DISK PITCH ANGLE:index': {
        name: 'DISK PITCH ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Rotor pitch percent of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'DISK PITCH PCT:index': {
        name: 'DISK PITCH PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Whether the rotor brake is active (1, TRUE) or not (0, FALSE).</p>
         */
    'ROTOR BRAKE ACTIVE': {
        name: 'ROTOR BRAKE ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The percentage actuated of the rotor brake handle.</p>
         */
    'ROTOR BRAKE HANDLE POS': {
        name: 'ROTOR BRAKE HANDLE POS',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Whether the rotor chip is detected (1,TRUE) or not (0, FALSE).</p>
         */
    'ROTOR CHIP DETECTED': {
        name: 'ROTOR CHIP DETECTED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>Whether the rotor clutch is active (1, TRUE) or not (0, FALSE).</p>
         */
    'ROTOR CLUTCH ACTIVE': {
        name: 'ROTOR CLUTCH ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The rotor clutch switch position, either on (1 TRUE) or off (0, FALSE).</p>
         */
    'ROTOR CLUTCH SWITCH POS': {
        name: 'ROTOR CLUTCH SWITCH POS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The rotor collective blade pitch.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'ROTOR COLLECTIVE BLADE PITCH PCT': {
        name: 'ROTOR COLLECTIVE BLADE PITCH PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The position (angle) at which blade has the maximum cyclic pitch.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'ROTOR CYCLIC BLADE MAX PITCH POSITION': {
        name: 'ROTOR CYCLIC BLADE MAX PITCH POSITION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The rotor cyclic blade (maximum) pitch.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'ROTOR CYCLIC BLADE PITCH PCT': {
        name: 'ROTOR CYCLIC BLADE PITCH PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Whether the rotor governor is active (1, TRUE) or not (0, FALSE).&nbsp;The SimVar takes an index value, which is the index of the engine to target.</p>
         */
    'ROTOR GOV ACTIVE:index': {
        name: 'ROTOR GOV ACTIVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The rotor governor switch position, either on (1 TRUE) or off (0, FALSE). The SimVar takes an index value, which is the index of the engine to target.</p>
         */
    'ROTOR GOV SWITCH POS:index': {
        name: 'ROTOR GOV SWITCH POS:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The rotor lateral trim percentage.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'ROTOR LATERAL TRIM PCT': {
        name: 'ROTOR LATERAL TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The rotor longitudinal trim percentage.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'ROTOR LONGITUDINAL TRIM PCT': {
        name: 'ROTOR LONGITUDINAL TRIM PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Rotor rotation angle of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'ROTOR ROTATION ANGLE:index': {
        name: 'ROTOR ROTATION ANGLE:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The indexed rotor&nbsp;<a href="#" data-popovertext="This stands for 'Revolutions Per Minute' and is used to measure engine speed and power." data-rhwidget="TextPopOver">RPM</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'ROTOR RPM:index': {
        name: 'ROTOR RPM:index',
        units: 'RPM',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent max rated rpm of the given rotor index. Index should be specified to 1 for main rotor and 2 for tail rotor. */
    'ROTOR RPM PCT:index': {
        name: 'ROTOR RPM PCT:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The main rotor transmission temperature.</p>
         */
    'ROTOR TEMPERATURE': {
        name: 'ROTOR TEMPERATURE',
        units: 'Rankine',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The position of the indexed rotor. */
    'STRUCT ROTOR POSITION:index': {
        name: 'STRUCT ROTOR POSITION:index',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The pitch position of the tailrotor blades. */
    'TAIL ROTOR BLADE PITCH PCT': {
        name: 'TAIL ROTOR BLADE PITCH PCT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Percent tail rotor pedal deflection. */
    'TAIL ROTOR PEDAL POSITION': {
        name: 'TAIL ROTOR PEDAL POSITION',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Returns the indexed rotor&nbsp;<a href="#" data-popovertext="This stands for 'Revolutions Per Minute' and is used to measure engine speed and power." data-rhwidget="TextPopOver">RPM</a>.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'ENG ROTOR RPM:index': {
        name: 'ENG ROTOR RPM:index',
        units: 'Percent scalar 16K (Max rpm * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Returns the indexed rotor torque.</p>
         */
    'ENG TORQUE PERCENT:index': {
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
    'IS ATTACHED TO SLING': {
        name: 'IS ATTACHED TO SLING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The number of sling cables (<em>not</em> hoists) that are configured for the helicopter. */
    'NUM SLING CABLES': {
        name: 'NUM SLING CABLES',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The payload station (identified by the parameter) where objects will be placed from the sling (identified by the index). */
    'SLING ACTIVE PAYLOAD STATION:index, param': {
        name: 'SLING ACTIVE PAYLOAD STATION:index, param',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** THis will be True (1) if the indexed cable is broken, or False (0) otherwise. */
    'SLING CABLE BROKEN:index': {
        name: 'SLING CABLE BROKEN:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The length of the indexed cable extending from the aircraft. */
    'SLING CABLE EXTENDED LENGTH:index': {
        name: 'SLING CABLE EXTENDED LENGTH:index',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The percentage of the full length of the sling cable deployed. */
    'SLING HOIST PERCENT DEPLOYED:index': {
        name: 'SLING HOIST PERCENT DEPLOYED:index',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This will be True (1) if the hoist is enabled or False (0) otherwise. */
    'SLING HOIST SWITCH:index': {
        name: 'SLING HOIST SWITCH:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This will be True (1) if the hook is in pickup mode or False (0) otherwise. When True, the hook will be capable of picking up another object. */
    'SLING HOOK IN PICKUP MODE': {
        name: 'SLING HOOK IN PICKUP MODE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>If the SimVar units are set as boolean, this will return True (1) if a sling object is attached, or False (0) otherwise.</p>
          <p>If the SimVar units are set as a string, tis will return the container title of the object.</p>
          <p>Note that there can be multiple sling positions, indexed from 1. The sling positions are set in the Aircraft Configuration File.</p>
         */
    'SLING OBJECT ATTACHED:index': {
        name: 'SLING OBJECT ATTACHED:index',
        units: 'Bool/String',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>The electrical load on the indexed engine.</p>
         */
    'ENG ELECTRICAL LOAD:index': {
        name: 'ENG ELECTRICAL LOAD:index',
        units: 'Percent scalar 16K (Max load * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The fuel pressure for the indexed engine.</p>
         */
    'ENG FUEL PRESSURE:index': {
        name: 'ENG FUEL PRESSURE:index',
        units: 'PSI scalar 16K (Psi * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The transmission pressure of the indexed engine.</p>
         */
    'ENG TRANSMISSION PRESSURE:index': {
        name: 'ENG TRANSMISSION PRESSURE:index',
        units: 'PSI scalar 16K (Psi * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The transmission temperature of the indexed engine.</p>
         */
    'ENG TRANSMISSION TEMPERATURE:index': {
        name: 'ENG TRANSMISSION TEMPERATURE:index',
        units: 'Celsius scalar 16K (Degrees * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The tubine temperature for the indexed engine.</p>
         */
    'ENG TURBINE TEMPERATURE:index': {
        name: 'ENG TURBINE TEMPERATURE:index',
        units: 'Celsius scalar 16K (degrees * 16384)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns either the pitch (<code class="inline">index 0</code>) or the yaw (<code class="inline">index 1</code>) of the current gameplay camera. */
    'CAMERA GAMEPLAY PITCH YAW:index': {
        name: 'CAMERA GAMEPLAY PITCH YAW:index',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** This can be used to have the currently active camera perform a predefined action. Currently only 1 action is supported, but more may be added over time. */
    'CAMERA REQUEST ACTION': {
        name: 'CAMERA REQUEST ACTION',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>This can be used to get or set the camera "state", which will be one of the listed enum values.</p>
          <p>Note that not ALL possible enum values are shown, since some values are internal only, and some values will do nothing, but have been reserved for future expansion of the camera system.</p>
          <p>Also note that the value "9" is a special case, generally used only when working with in-sim panels and is used to go to the showcase cameras, defaulting to the last selected camera within this section (Drone, Fixed or Environment).</p>
         */
    'CAMERA STATE': {
        name: 'CAMERA STATE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This variable can be used to get or set the camera "sub-state". The options here are generally only required when working with the in-sim panel UI. Note that the "locked" and "unlocked" state will be changed automatically if the following SimVars have their values changed: <code class="inline"><a href="Camera_Variables.htm#COCKPIT_CAMERA_HEADLOOK">COCKPIT_CAMERA_HEADLOOK</a></code>, <code class="inline"><a href="Camera_Variables.htm#CHASE_CAMERA_HEADLOOK">CHASE_CAMERA_HEADLOOK</a></code>. */
    'CAMERA SUBSTATE': {
        name: 'CAMERA SUBSTATE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>With this you can get or set both the type of view for the current camera, as well as the option index, which will be between 0 and the maximum index value (as retrieved using the <code class="inline">CAMERA VIEW TYPE AND INDEX MAX</code> SimVar). Supplying an index of 0 to the SimVar will get/set the type (from the selection of enum values listed), and using an index of 1 will get/set the option index, which is an integer value.</p>
          <p>&nbsp;</p>
          <p>Please see the <a href="Camera_Variables.htm#type_index_notes">Notes On View Types And Indices</a> section below for more information.</p>
         */
    'CAMERA VIEW TYPE AND INDEX:index': {
        name: 'CAMERA VIEW TYPE AND INDEX:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>This variable can get the number of option indices related to a specific camera view type. The index value supplied to the SimVar should be one of the camera view type Enum values (see <code class="inline">CAMERA VIEW TYPE AND INDEX</code>), and the SimVar will return the number of options available for that camera type (counting from 1, so - for example - if the camera view type is "Quickview" and has 8 quickview settings, then <code class="inline">CAMERA VIEW TYPE AND INDEX MAX:4</code> will return 8). Note that this value can be set after a flight has started, but it will have no effect since the number of camera options is initilaised once only and not updated (and the simulation may overwrite the value again even after setting it).</p>
          <p>&nbsp;</p>
          <p>Please see the <a href="#type_index_notes">Notes On View Types And Indices</a> section below for more information.<span style="background-color: rgba(255, 255, 255, 0.5); font-size: 0.85em; font-style: italic;"></span></p>
         */
    'CAMERA VIEW TYPE AND INDEX MAX:index': {
        name: 'CAMERA VIEW TYPE AND INDEX MAX:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This gets/sets the focus for the camera zoom, which can be either manual, or auto. The setting affects <em>both</em> the Cockpit and the External (Chase) cameras.<br>
          The following SimVars can be used to get/set the level of zoom: <code class="inline"><a href="Camera_Variables.htm#COCKPIT_CAMERA_ZOOM">COCKPIT_CAMERA_ZOOM</a></code> or <code class="inline"><a href="Camera_Variables.htm#CHASE_CAMERA_ZOOM">CHASE_CAMERA_ZOOM</a></code>. */
    'GAMEPLAY CAMERA FOCUS': {
        name: 'GAMEPLAY CAMERA FOCUS',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This SimVar is used to check for a collision along a ray from the center of the user&nbsp;<a href="#" data-popovertext="In games, the 'Field Of View' is the extent of the observable game world that is seen on the display at any given moment. It is typically measured as an angle." data-rhwidget="TextPopOver">FOV</a>&nbsp;and a model node. The available nodes that can be checked using this SimVar must be previously defined in the&nbsp;<code class="inline"><a href="../../Content_Configuration/Cameras/Cameras_CFG/cameras_cfg.htm#h">[CAMERA_RAY_NODE_COLLISION]</a></code>&nbsp;of the <code class="inline">cameras.cfg</code> file. The SimVar requires a node&nbsp;<em>index</em>&nbsp;value between 1 and 10, corresponding to the node defined in the CFG file, and the SimVar will return 1 (TRUE) if there is a collision along the camera ray or 0 (FALSE) otherwise. You may also supply an index of 0 to perform a collision check for&nbsp;<em>all</em>&nbsp;defined nodes, in which case the SimVar will return 1 (TRUE) if there is a collision between the ray and&nbsp;<em>any</em>&nbsp;of the defined nodes. Supplying an index outside of the range of 1 to 10, or supplying an index for which no node has been defined, will return 0 (FALSE).&nbsp; */
    'IS CAMERA RAY INTERSECT WITH NODE': {
        name: 'IS CAMERA RAY INTERSECT WITH NODE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This is used to get/set the look state of the chase (external) camera. Note that this value will also affect the <code class="inline"><a href="Camera_Variables.htm#CAMERA_SUBSTATE">CAMERA_SUBSTATE</a></code> value, when the <code class="inline"><a href="Camera_Variables.htm#CAMERA_STATE">CAMERA_STATE</a></code> is set to 3 (External/Chase). */
    'CHASE CAMERA HEADLOOK': {
        name: 'CHASE CAMERA HEADLOOK',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the momentum modifier of the chase (external) camera, which is controls how fast/slow the camera will stop moving when no longer being moved by the user. Default is 50%. */
    'CHASE CAMERA MOMENTUM': {
        name: 'CHASE CAMERA MOMENTUM',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the translation speed modifier of the chase (external) camara, as a percentage. Default is 50%. */
    'CHASE CAMERA SPEED': {
        name: 'CHASE CAMERA SPEED',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the zoom/<a href="#" data-popovertext="In games, the 'Field Of View' is the extent of the observable game world that is seen on the display at any given moment. It is typically measured as an angle." data-rhwidget="TextPopOver">FOV</a> modifier for the chase (external) camera. Note that when setting this value, it will affect the camera regardless of whether the <code class="inline"><a href="Camera_Variables.htm#GAMEPLAY_CAMERA_FOCUS">GAMEPLAY_CAMERA_FOCUS</a></code> is set to manual or automatic. Default is 50%. */
    'CHASE CAMERA ZOOM': {
        name: 'CHASE CAMERA ZOOM',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the speed modifier for when the zoom/<a href="#" data-popovertext="In games, the 'Field Of View' is the extent of the observable game world that is seen on the display at any given moment. It is typically measured as an angle." data-rhwidget="TextPopOver">FOV</a> chase (external) camera changes zoom/<a href="#" data-popovertext="In games, the 'Field Of View' is the extent of the observable game world that is seen on the display at any given moment. It is typically measured as an angle." data-rhwidget="TextPopOver">FOV</a> levels. Default is 50%. */
    'CHASE CAMERA ZOOM SPEED': {
        name: 'CHASE CAMERA ZOOM SPEED',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This can be used to reset the cockpit camera when the <code class="inline"><a href="#CAMERA_STATE">CAMERA_STATE</a></code> is set to 2 (Cockpit). Essentially the same as the user pressing the default reset keys <code class="inline">CTRL</code> + <code class="inline">Space</code>. */
    'CAMERA ACTION COCKPIT VIEW RESET': {
        name: 'CAMERA ACTION COCKPIT VIEW RESET',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This can be used to save a cockpit camera when the <code class="inline"><a href="#CAMERA_STATE">CAMERA_STATE</a></code> is set to 2 (Cockpit). The index value given is the save "slot" that will be used, from 0 to 9. Essentially this is the same as the user pressing the default save keys <code class="inline">CTRL</code> + <code class="button_grey">Alt</code> + <code class="inline">0-9</code>. */
    'CAMERA ACTION COCKPIT VIEW SAVE:index': {
        name: 'CAMERA ACTION COCKPIT VIEW SAVE:index',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This is used to get/set the look state of the cockpit camera. Note that this value will also affect the <code class="inline"><a href="Camera_Variables.htm#CAMERA_SUBSTATE">CAMERA_SUBSTATE</a></code> value, when the <code class="inline"><a href="Camera_Variables.htm#CAMERA_STATE">CAMERA_STATE</a></code> is set to 2 (Cockpit). */
    'COCKPIT CAMERA HEADLOOK': {
        name: 'COCKPIT CAMERA HEADLOOK',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** This can be used to get/set the cockpit camera height modifier expressed as a percentage. Default is 50%. */
    'COCKPIT CAMERA HEIGHT': {
        name: 'COCKPIT CAMERA HEIGHT',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This can be used to get or set the autoselect option for the cockpit camera when viewing the instruments (ie: the <code class="inline"><a href="#CAMERA_SUBSTATE">CAMERA_SUBSTATE</a></code> is 5). When enabled the camera will move automatically if the player mouse reaches the edge of the screen and there are instrument panels available on that side. */
    'COCKPIT CAMERA INSTRUMENT AUTOSELECT': {
        name: 'COCKPIT CAMERA INSTRUMENT AUTOSELECT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the momentum modifier of the cockpit camera, which is controls how fast/slow the camera will stop moving when no longer being moved by the user. Default is 50%. */
    'COCKPIT CAMERA MOMENTUM': {
        name: 'COCKPIT CAMERA MOMENTUM',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** <em>Not currently used in the simulation.</em> */
    'COCKPIT CAMERA SIDE': {
        name: 'COCKPIT CAMERA SIDE',
        units: 'Enum',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Sets/gets the translation speed modifier of the cockpit camara, as a percentage. Default is 50%. */
    'COCKPIT CAMERA SPEED': {
        name: 'COCKPIT CAMERA SPEED',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the current "upper position" cockpit camera toggle. When 1 (TRUE), the camera is is in the upper position, and when 0 (FALSE) it is in the default position. */
    'COCKPIT CAMERA UPPER POSITION': {
        name: 'COCKPIT CAMERA UPPER POSITION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the zoom/<a href="#" data-popovertext="In games, the 'Field Of View' is the extent of the observable game world that is seen on the display at any given moment. It is typically measured as an angle." data-rhwidget="TextPopOver">FOV</a> modifier for the cockpit camera. Note that when setting this value, it will affect the camera regardless of whether the <code class="inline"><a href="#GAMEPLAY_CAMERA_FOCUS">GAMEPLAY_CAMERA_FOCUS</a></code> is set to manual or automatic. Default is 50%. */
    'COCKPIT CAMERA ZOOM': {
        name: 'COCKPIT CAMERA ZOOM',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the speed modifier for when the zoom/<a href="#" data-popovertext="In games, the 'Field Of View' is the extent of the observable game world that is seen on the display at any given moment. It is typically measured as an angle." data-rhwidget="TextPopOver">FOV</a> cockpit camera changes zoom/<a href="#" data-popovertext="In games, the 'Field Of View' is the extent of the observable game world that is seen on the display at any given moment. It is typically measured as an angle." data-rhwidget="TextPopOver">FOV</a> levels. Default is 50%. */
    'COCKPIT CAMERA ZOOM SPEED': {
        name: 'COCKPIT CAMERA ZOOM SPEED',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the focus modifier for the drone camera. Default is 50%, and a lower value will set the drone focus to things in the foreground and a higher level will set the drone focus to things in the background. Note that this is only taken into account when the <code class="inline"><a href="Camera_Variables.htm#DRONE_CAMERA_FOCUS_MODE">DRONE_CAMERA_FOCUS_MODE</a></code> is set to 3 (manual). */
    'DRONE CAMERA FOCUS': {
        name: 'DRONE CAMERA FOCUS',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the current drone focus mode. When set to 3 (manual), the focus position will be based on the <code class="inline"><a href="Camera_Variables.htm#DRONE_CAMERA_FOCUS">DRONE_CAMERA_FOCUS</a></code> value. */
    'DRONE CAMERA FOCUS MODE': {
        name: 'DRONE CAMERA FOCUS MODE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the whether the drone camera is in follow mode or not. */
    'DRONE CAMERA FOLLOW': {
        name: 'DRONE CAMERA FOLLOW',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the zoom/<a href="#" data-popovertext="In games, the 'Field Of View' is the extent of the observable game world that is seen on the display at any given moment. It is typically measured as an angle." data-rhwidget="TextPopOver">FOV</a> modifier for the drone camera. Default is 50%. */
    'DRONE CAMERA FOV': {
        name: 'DRONE CAMERA FOV',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the whether the drone camera is locked or not. */
    'DRONE CAMERA LOCKED': {
        name: 'DRONE CAMERA LOCKED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Sets/gets the rotation speed modifier of the drone camara, as a percentage. Default is 50%. */
    'DRONE CAMERA SPEED ROTATION': {
        name: 'DRONE CAMERA SPEED ROTATION',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the translation speed modifier of the drone camara, as a percentage. Default is 50%. */
    'DRONE CAMERA SPEED TRAVELLING': {
        name: 'DRONE CAMERA SPEED TRAVELLING',
        units: 'Percentage',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Sets/gets the whether the smart camera is active or not. */
    'SMART CAMERA ACTIVE': {
        name: 'SMART CAMERA ACTIVE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>Gets information on the smartcam system. The index sets what kind of information will be returned (or set):</p>
          <ul>
            <li>0 = Gets the number of smartcam targets in the smart camera list</li>
            <li>1 = Gets or sets the index of the currently selected smartcam target, counting from 0 (so index 0 is the first target in the list).</li>
          </ul>
         */
    'SMART CAMERA INFO:index': {
        name: 'SMART CAMERA INFO:index',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Retrieves the type of target for the indexed position in the smartcam list, counting from 0 (so index 0 is the first target in the list). */
    'SMART CAMERA LIST:index': {
        name: 'SMART CAMERA LIST:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** This returns a localized string that represents the smartcam target specified by the given index. Indices count from 0 so index 0 is the first target in the list. */
    'SMART CAMERA LIST DESCRIPTION:index': {
        name: 'SMART CAMERA LIST DESCRIPTION:index',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** Difference of time between the current frame and the last frame where this SimObject has been animated */
    'ANIMATION DELTA TIME': {
        name: 'ANIMATION DELTA TIME',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** In case scenery is not loaded for AI planes, this variable can be used to set a default surface elevation. */
    'ARTIFICIAL GROUND ELEVATION': {
        name: 'ARTIFICIAL GROUND ELEVATION',
        units: 'Feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** One of the following:
          <ol class="minitoc-list">
            <li>"Airplane",</li>
            <li>"Helicopter",</li>
            <li>"Boat",</li>
            <li>"GroundVehicle",</li>
            <li>"ControlTower",</li>
            <li>"SimpleObject",</li>
            <li>"Viewer"</li>
          </ol>
         */
    CATEGORY: {
        name: 'CATEGORY',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** &nbsp; */
    CONTROLLABLE: {
        name: 'CONTROLLABLE',
        units: ' ',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Flag value that indicates the cause of a crash. */
    'CRASH FLAG': {
        name: 'CRASH FLAG',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The state of the crash event sequence. */
    'CRASH SEQUENCE': {
        name: 'CRASH SEQUENCE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Altitude of surface. */
    'GROUND ALTITUDE': {
        name: 'GROUND ALTITUDE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** What frame of the hand is currently used. */
    'HAND ANIM STATE': {
        name: 'HAND ANIM STATE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The ID of the idle animation for the sim object. */
    'IDLE ANIMATION ID': {
        name: 'IDLE ANIMATION ID',
        units: '',
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
    /** &nbsp; */
    'MISSION SCORE': {
        name: 'MISSION SCORE',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will be TRUE if the parachute has opened and FALSE otherwise. Currently this is only applied to the Parachute SimObject used by <a href="../../Content_Configuration/SimObjects/Ground_Vehicles/Winch_Parachute_Definition.htm">Winches</a>. */
    'PARACHUTE OPEN': {
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
    'REALISM CRASH DETECTION': {
        name: 'REALISM CRASH DETECTION',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** True indicates crashing with other aircraft is possible. */
    'REALISM CRASH WITH OTHERS': {
        name: 'REALISM CRASH WITH OTHERS',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Is sim disabled. */
    'SIM DISABLED': {
        name: 'SIM DISABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** 
          <p>On ground flag.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'SIM ON GROUND': {
        name: 'SIM ON GROUND',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** &nbsp; */
    'SIM SHOULD SET ON GROUND': {
        name: 'SIM SHOULD SET ON GROUND',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Returns true if <a href="https://www.trackir.fr/en/" target="_blank">Track IR</a> is enabled or not. */
    'TRACK IR ENABLE': {
        name: 'TRACK IR ENABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Speed relative to the earths center. */
    'TOTAL WORLD VELOCITY': {
        name: 'TOTAL WORLD VELOCITY',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Is input allowed from the user. */
    'USER INPUT ENABLED': {
        name: 'USER INPUT ENABLED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** Model radius. */
    'VISUAL MODEL RADIUS': {
        name: 'VISUAL MODEL RADIUS',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Speed relative to earth, in East/West direction.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'VELOCITY WORLD X': {
        name: 'VELOCITY WORLD X',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Speed relative to earth, in vertical direction.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'VELOCITY WORLD Y': {
        name: 'VELOCITY WORLD Y',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** 
          <p>Speed relative to earth, in North/South direction.</p>
          <p><span class="note"><strong>NOTE</strong>: This is available in multiplayer&nbsp;to all <strong>far</strong> aircraft. See here for more information:&nbsp;<a href="Simulation_Variables.htm#multiplayer">Note On SimVars In Multiplayer</a>.</span></p>
         */
    'VELOCITY WORLD Z': {
        name: 'VELOCITY WORLD Z',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Ambient density. */
    'AMBIENT DENSITY': {
        name: 'AMBIENT DENSITY',
        units: 'Slugs per cubic feet',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current precipitation rate. */
    'AMBIENT PRECIP RATE': {
        name: 'AMBIENT PRECIP RATE',
        units: 'millimeters of water',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current state of precipitation. */
    'AMBIENT PRECIP STATE': {
        name: 'AMBIENT PRECIP STATE',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Ambient pressure. */
    'AMBIENT PRESSURE': {
        name: 'AMBIENT PRESSURE',
        units: 'Inches of mercury, inHg',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Ambient temperature. */
    'AMBIENT TEMPERATURE': {
        name: 'AMBIENT TEMPERATURE',
        units: 'Celsius',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Ambient visibility (only measures ambient particle visibility - related to ambient density). */
    'AMBIENT VISIBILITY': {
        name: 'AMBIENT VISIBILITY',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind direction, relative to true north. */
    'AMBIENT WIND DIRECTION': {
        name: 'AMBIENT WIND DIRECTION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind velocity. */
    'AMBIENT WIND VELOCITY': {
        name: 'AMBIENT WIND VELOCITY',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in East/West direction. */
    'AMBIENT WIND X': {
        name: 'AMBIENT WIND X',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in vertical direction. */
    'AMBIENT WIND Y': {
        name: 'AMBIENT WIND Y',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Wind component in North/South direction. */
    'AMBIENT WIND Z': {
        name: 'AMBIENT WIND Z',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Barometric pressure. */
    'BAROMETER PRESSURE': {
        name: 'BAROMETER PRESSURE',
        units: 'Millibars',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>The density altitude is the altitude relative to standard atmospheric conditions at which the air density would be equal to the indicated air density at the place of observation. The calculation is as follows:</p>
          <p><code class="inline">density_altitude = pressure_altitude + 118.8 * (outside_air_temp&nbsp;- ISA_temp)</code></p>
         */
    'DENSITY ALTITUDE': {
        name: 'DENSITY ALTITUDE',
        units: 'ft',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Barometric pressure at sea level. */
    'SEA LEVEL PRESSURE': {
        name: 'SEA LEVEL PRESSURE',
        units: 'Millibars',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** X (latitude), Y (vertical) and Z (longitude) components of the wind. */
    'STRUCT AMBIENT WIND': {
        name: 'STRUCT AMBIENT WIND',
        units: 'Feet per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The desired speed of the AI object. */
    'AI DESIRED SPEED': {
        name: 'AI DESIRED SPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** A list of waypoints that an AI controlled object should follow. */
    'AI WAYPOINT LIST': {
        name: 'AI WAYPOINT LIST',
        units: 'SIMCONNECT_DATA_WAYPOINT',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The current waypoint in the list. */
    'AI CURRENT WAYPOINT': {
        name: 'AI CURRENT WAYPOINT',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The desired heading of the AI object. */
    'AI DESIRED HEADING': {
        name: 'AI DESIRED HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The time required by the AI aircraft to make a 90º turn. */
    'AI GROUNDTURNTIME': {
        name: 'AI GROUNDTURNTIME',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The ground cruising speed for the AI aircraft. */
    'AI GROUNDCRUISESPEED': {
        name: 'AI GROUNDCRUISESPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The ground turning speed for the AI aircraft. */
    'AI GROUNDTURNSPEED': {
        name: 'AI GROUNDTURNSPEED',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This can be used to request whether the AI aircraft is IFR or VFR. Note that if an aircraft does not have a flight plan, the value returned will be 0 (or false).&nbsp; */
    'AI TRAFFIC ISIFR': {
        name: 'AI TRAFFIC ISIFR',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** 
          <p>This will return a string describing an AI aircraft state. If the aircraft is under ATC control the string will be one of the following:</p>
          <ol class="minitoc-list">
            <li>"init"</li>
            <li>"sleep"</li>
            <li>"flt plan"</li>
            <li>"startup"</li>
            <li>"preflight support"</li>
            <li>"clearance"</li>
            <li>"push back 1"</li>
            <li>"push back 2"</li>
            <li>"pre taxi out"</li>
            <li>"taxi out"</li>
            <li>"takeoff 1"</li>
            <li>"takeoff 2"</li>
            <li>"T&amp;G depart"</li>
            <li>"enroute"</li>
            <li>"pattern"</li>
            <li>"landing"</li>
            <li>"rollout"</li>
            <li>"go around"</li>
            <li>"taxi in"</li>
            <li>"shutdown"</li>
            <li>"postflight support"&nbsp;</li>
          </ol>
          <p>&nbsp;</p>
          <p>If the aircraft is not under ATC control, the string will be one of these:</p>
          <ol class="minitoc-list">
            <li>"Sleep"</li>
            <li>"Waypoint"</li>
            <li>"Takeoff"</li>
            <li>"Landing"</li>
            <li>"Taxi"</li>
          </ol>
          <p>&nbsp;</p>
          <p>Note that if an aircraft does not have a flight plan, the value returned will be an empty string "".</p>
         */
    'AI TRAFFIC STATE': {
        name: 'AI TRAFFIC STATE',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The <a href="#" data-popovertext="The 'International Civil Aviation Organization' code is a four digit code used to designate aerodromes around the world. These codes are used by air traffic control and airline operations for things such as flight planning.

" data-rhwidget="TextPopOver">ICAO code</a> of the current airport.&nbsp;If an aircraft does not have a flight plan, the value returned will be an empty string "". */
    'AI TRAFFIC CURRENT AIRPORT': {
        name: 'AI TRAFFIC CURRENT AIRPORT',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** The assigned runway name (for example: "32R").&nbsp;If an aircraft does not have a flight plan, the value returned will be an empty string "". */
    'AI TRAFFIC ASSIGNED RUNWAY': {
        name: 'AI TRAFFIC ASSIGNED RUNWAY',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** 
          <p>The assigned parking name. The string will take the form:</p>
          <pre class="codeblock">Name + Number, Type ( radius )</pre>
          <p>For example:</p>
          <ul>
            <li>"Ramp 1, RAMP sml (10m)"</li>
            <li>"Gate G 4, RAMP lrg (18m)"</li>
          </ul>
          <p>If an aircraft does not have a flight plan, the value returned will be an empty string "".</p>
         */
    'AI TRAFFIC ASSIGNED PARKING': {
        name: 'AI TRAFFIC ASSIGNED PARKING',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** 
          <p>The <a href="#" data-popovertext="The 'International Civil Aviation Organization' code is a four digit code used to designate aerodromes around the world. These codes are used by air traffic control and airline operations for things such as flight planning.

" data-rhwidget="TextPopOver">ICAO code</a> of the departure airport in the current schedule.&nbsp;</p>
          <p>This variable is only valid for aircraft generated by the traffic database that have schedules. If an aircraft does not have a schedule, the value returned will an empty string"".</p>
         */
    'AI TRAFFIC FROMAIRPORT': {
        name: 'AI TRAFFIC FROMAIRPORT',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** 
          <p>The ICAO code of the destination airport in the current schedule.&nbsp;</p>
          <p>This variable is only valid for aircraft generated by the traffic database that have schedules. If an aircraft does not have a schedule, the value returned will an empty string"".</p>
         */
    'AI TRAFFIC TOAIRPORT': {
        name: 'AI TRAFFIC TOAIRPORT',
        units: '',
        dataType: SimConnectDataType.STRINGV,
        settable: false,
    },
    /** 
          <p>The estimated time of departure for the current schedule entry, given as the number of seconds difference from the current simulation time. This can be negative if ETD is earlier than the current simulation time</p>
          <p>This variable is only valid for aircraft generated by the traffic database that have schedules. If an aircraft does not have a schedule, the value returned will be 0.</p>
         */
    'AI TRAFFIC ETD': {
        name: 'AI TRAFFIC ETD',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Estimated time of arrival for the current schedule entry, given as the number of seconds difference from the current simulated time. This can be negative if ETA is earlier than the current simulated time.</p>
          <p>This variable is only valid for aircraft generated by the traffic database that have schedules. If an aircraft does not have a schedule, the value returned will be 0.</p>
         */
    'AI TRAFFIC ETA': {
        name: 'AI TRAFFIC ETA',
        units: 'Seconds',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <strong>Deprecated, do not use!</strong> */
    'STRUCT DAMAGEVISIBLE': {
        name: 'STRUCT DAMAGEVISIBLE',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Returns a pitch, bank and heading value (for what will depend on the SimVar being used). */
    'STRUCT PBH32': {
        name: 'STRUCT PBH32',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <em>Not currently used in the simulation.</em> */
    'STRUCT REALISM VARS': {
        name: 'STRUCT REALISM VARS',
        units: '-',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The relative surface velocity. */
    'STRUCT SURFACE RELATIVE VELOCITY': {
        name: 'STRUCT SURFACE RELATIVE VELOCITY',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The world velocity. */
    'STRUCT WORLDVELOCITY': {
        name: 'STRUCT WORLDVELOCITY',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The world acceleration for each axis. Individual world acceleration values are in the Aircraft Position and Speed section. */
    'STRUCT WORLD ACCELERATION': {
        name: 'STRUCT WORLD ACCELERATION',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The world rotation velocity. */
    'STRUCT WORLD ROTATION VELOCITY': {
        name: 'STRUCT WORLD ROTATION VELOCITY',
        units: '',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The amount of bomb ammunition available. */
    'BOMB AMMO': {
        name: 'BOMB AMMO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The amount of cannon ammunition available. */
    'CANNON AMMO': {
        name: 'CANNON AMMO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The amount of gun ammunition available. */
    'GUN AMMO': {
        name: 'GUN AMMO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The amount of rocket ammunition available. */
    'ROCKET AMMO': {
        name: 'ROCKET AMMO',
        units: 'Number',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Current angle of the baggage loader ramp, relative to the ground. */
    'BAGGAGELOADER ANGLE CURRENT': {
        name: 'BAGGAGELOADER ANGLE CURRENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Target angle of the baggage loader ramp, relative to the ground. */
    'BAGGAGELOADER ANGLE TARGET': {
        name: 'BAGGAGELOADER ANGLE TARGET',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** "Y" axis position of the end of the baggage loader ramp, relative to the ground. */
    'BAGGAGELOADER END RAMP Y': {
        name: 'BAGGAGELOADER END RAMP Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** "Z" axis position of the end of the baggage loader ramp, relative to the ground. */
    'BAGGAGELOADER END RAMP Z': {
        name: 'BAGGAGELOADER END RAMP Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** "Y" axis position of the baggage loader ramp pivot, relative to the ground. */
    'BAGGAGELOADER PIVOT Y': {
        name: 'BAGGAGELOADER PIVOT Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** "Z" axis position of the baggage loader ramp pivot, relative to the ground. */
    'BAGGAGELOADER PIVOT Z': {
        name: 'BAGGAGELOADER PIVOT Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current altitude&nbsp;<a href="#" data-popovertext="This means 'Above Ground Level' and describes the literal height above the ground over which an object is positioned." data-rhwidget="TextPopOver">AGL</a> of the top of the boarding ramp stairs. */
    'BOARDINGRAMP ELEVATION CURRENT': {
        name: 'BOARDINGRAMP ELEVATION CURRENT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target altitude <a href="#" data-popovertext="This means 'Above Ground Level' and describes the literal height above the ground over which an object is positioned." data-rhwidget="TextPopOver">AGL</a> of the top of the boarding ramp stairs. */
    'BOARDINGRAMP ELEVATION TARGET': {
        name: 'BOARDINGRAMP ELEVATION TARGET',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "Y" axis position of the top of the boarding ramp stairs when extended at maximal capacity, relative to the ground. */
    'BOARDINGRAMP END POSITION Y': {
        name: 'BOARDINGRAMP END POSITION Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis position of the top of the boarding ramp stairs when extended at maximal capacity, relative to the ground. */
    'BOARDINGRAMP END POSITION Z': {
        name: 'BOARDINGRAMP END POSITION Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current orientation of the boarding ramp stairs, where 0 is at rest and 1 is suited for boarding. */
    'BOARDINGRAMP ORIENTATION CURRENT': {
        name: 'BOARDINGRAMP ORIENTATION CURRENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target orientation of of the boarding ramp stairs, where 0 is at rest and 1 is suited for boarding. */
    'BOARDINGRAMP ORIENTATION TARGET': {
        name: 'BOARDINGRAMP ORIENTATION TARGET',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "Y" axis&nbsp;position of the top of the boarding ramp stairs when at minimal extension, relative to the ground. */
    'BOARDINGRAMP START POSITION Y': {
        name: 'BOARDINGRAMP START POSITION Y',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis&nbsp;position of the top of the boarding ramp stairs when at minimal extension, relative to the ground. */
    'BOARDINGRAMP START POSITION Z': {
        name: 'BOARDINGRAMP START POSITION Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis position of the point of contact between the catering truck and the bottom of the aircraft door, relative to the ground. */
    'CATERINGTRUCK AIRCRAFT DOOR CONTACT OFFSET Z': {
        name: 'CATERINGTRUCK AIRCRAFT DOOR CONTACT OFFSET Z',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current altitude <a href="#" data-popovertext="This means 'Above Ground Level' and describes the literal height above the ground over which an object is positioned." data-rhwidget="TextPopOver">AGL</a> of the bottom of the catering truck container. */
    'CATERINGTRUCK ELEVATION CURRENT': {
        name: 'CATERINGTRUCK ELEVATION CURRENT',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target altitude <a href="#" data-popovertext="This means 'Above Ground Level' and describes the literal height above the ground over which an object is positioned." data-rhwidget="TextPopOver">AGL</a> of the bottom of the catering truck container. */
    'CATERINGTRUCK ELEVATION TARGET': {
        name: 'CATERINGTRUCK ELEVATION TARGET',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The current state of the catering truck when opening the container and deploying the bridge, where 0 is fully closed and 1 is fully opened and deployed. */
    'CATERINGTRUCK OPENING CURRENT': {
        name: 'CATERINGTRUCK OPENING CURRENT',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target state of the catering truck the container is opene and the bridge deployed, where 0 is fully closed and 1 is fully opened and deployed. */
    'CATERINGTRUCK OPENING TARGET': {
        name: 'CATERINGTRUCK OPENING TARGET',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The current deployment amount of the fuel truck hose. Currently can only be set to 0 (not deployed) and 1 (deployed). */
    'FUELTRUCK HOSE DEPLOYED': {
        name: 'FUELTRUCK HOSE DEPLOYED',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "X" axis position of the end of the fuel truck hose when fully deployed, relative to the ground. */
    'FUELTRUCK HOSE END POSX': {
        name: 'FUELTRUCK HOSE END POSX',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis position of the end of the fuel truck hose when fully deployed, relative to the ground. */
    'FUELTRUCK HOSE END POSZ': {
        name: 'FUELTRUCK HOSE END POSZ',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The heading of the end of the fuel truck hose, relative to the vehicle heading. */
    'FUELTRUCK HOSE END RELATIVE HEADING': {
        name: 'FUELTRUCK HOSE END RELATIVE HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current deployment amount of the ground power unit hose. Currently can only be set to 0 (not deployed) and 1 (deployed). */
    'GROUNDPOWERUNIT HOSE DEPLOYED': {
        name: 'GROUNDPOWERUNIT HOSE DEPLOYED',
        units: 'Percent Over 100',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "X" axis position of the end of the ground power unit hose when fully deployed, relative to the ground. */
    'GROUNDPOWERUNIT HOSE END POSX': {
        name: 'GROUNDPOWERUNIT HOSE END POSX',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The "Z" axis position of the end of the ground power unit hose when fully deployed, relative to the ground. */
    'GROUNDPOWERUNIT HOSE END POSZ': {
        name: 'GROUNDPOWERUNIT HOSE END POSZ',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The heading of the end of the ground power unit hose, relative to the vehicle heading. */
    'GROUNDPOWERUNIT HOSE END RELATIVE HEADING': {
        name: 'GROUNDPOWERUNIT HOSE END RELATIVE HEADING',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The target position for the left bend animation of the jetway hood. */
    'JETWAY HOOD LEFT BEND': {
        name: 'JETWAY HOOD LEFT BEND',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target angle for the left deployment animation of the jetway hood, where 0 is considered vertical. */
    'JETWAY HOOD LEFT DEPLOYMENT': {
        name: 'JETWAY HOOD LEFT DEPLOYMENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target position for the right bend animation of the jetway hood. */
    'JETWAY HOOD RIGHT BEND': {
        name: 'JETWAY HOOD RIGHT BEND',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The target angle for the right deployment animation of the jetway hood, where 0 is considered vertical. */
    'JETWAY HOOD RIGHT DEPLOYMENT': {
        name: 'JETWAY HOOD RIGHT DEPLOYMENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Target position for the top horizontal animation of the jetway hood. Values can be between -100% and 100%. */
    'JETWAY HOOD TOP HORIZONTAL': {
        name: 'JETWAY HOOD TOP HORIZONTAL',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** Target position for the top vertical animation of the jetway hood. Values can be between -100% and 100%. */
    'JETWAY HOOD TOP VERTICAL': {
        name: 'JETWAY HOOD TOP VERTICAL',
        units: 'Percent',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** This will be 1 (TRUE) id the jetway&nbsp;<em>body</em>&nbsp;is currently moving (it will not include checks on hood animation). */
    'JETWAY MOVING': {
        name: 'JETWAY MOVING',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The current angle of the jetway wheels. */
    'JETWAY WHEEL ORIENTATION CURRENT': {
        name: 'JETWAY WHEEL ORIENTATION CURRENT',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The (approximate) target angle for the jetway wheels. */
    'JETWAY WHEEL ORIENTATION TARGET': {
        name: 'JETWAY WHEEL ORIENTATION TARGET',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The current speed of the jetway wheels. */
    'JETWAY WHEEL SPEED': {
        name: 'JETWAY WHEEL SPEED',
        units: 'Meters per second',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** <em>Currently not used in the simulation.</em> */
    'MARSHALLER AIRCRAFT DIRECTION PARKINGSPACE': {
        name: 'MARSHALLER AIRCRAFT DIRECTION PARKINGSPACE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** <span>The distance between the Marshaller and the aircraft.</span> */
    'MARSHALLER AIRCRAFT DISTANCE': {
        name: 'MARSHALLER AIRCRAFT DISTANCE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position on the X axis of the aircraft in the parking space (negative means the aircraft is on the left side and positive the right side). */
    'MARSHALLER AIRCRAFT DISTANCE DIRECTION X PARKINGSPACE': {
        name: 'MARSHALLER AIRCRAFT DISTANCE DIRECTION X PARKINGSPACE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Position on the Z axis of the aircraft in the parking space (negative means the aircraft is behind the parking space and positive is in front of the parking space). */
    'MARSHALLER AIRCRAFT DISTANCE DIRECTION Z PARKINGSPACE': {
        name: 'MARSHALLER AIRCRAFT DISTANCE DIRECTION Z PARKINGSPACE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if the engine(s) of the aircraft is (are) shut down. */
    'MARSHALLER AIRCRAFT ENGINE SHUTDOWN': {
        name: 'MARSHALLER AIRCRAFT ENGINE SHUTDOWN',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** Angle between the direction of the aircraft and the direction of the parking place. */
    'MARSHALLER AIRCRAFT HEADING PARKINGSPACE': {
        name: 'MARSHALLER AIRCRAFT HEADING PARKINGSPACE',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** 
          <p>Value in Z axis of the projection from the aircraft position following the heading of the aircraft.</p>
         */
    'MARSHALLER AIRCRAFT PROJECTION POINT PARKINGSPACE': {
        name: 'MARSHALLER AIRCRAFT PROJECTION POINT PARKINGSPACE',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The velocity of the aircraft. */
    'MARSHALLER AIRCRAFT VELOCITY': {
        name: 'MARSHALLER AIRCRAFT VELOCITY',
        units: 'Knots',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Pushback angle (the heading of the tug). */
    'PUSHBACK ANGLE': {
        name: 'PUSHBACK ANGLE',
        units: 'Radians',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** True if this vehicle is attached to an aircraft. */
    'PUSHBACK ATTACHED': {
        name: 'PUSHBACK ATTACHED',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if a push back is available on the parking space. */
    'PUSHBACK AVAILABLE': {
        name: 'PUSHBACK AVAILABLE',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** The towpoint position, relative to the aircrafts datum reference point. */
    'PUSHBACK CONTACTX': {
        name: 'PUSHBACK CONTACTX',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Pushback contact position in vertical direction. */
    'PUSHBACK CONTACTY': {
        name: 'PUSHBACK CONTACTY',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Pushback contact position in fore/aft direction. */
    'PUSHBACK CONTACTZ': {
        name: 'PUSHBACK CONTACTZ',
        units: 'Feet (ft)',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** Type of pushback. */
    'PUSHBACK STATE:index': {
        name: 'PUSHBACK STATE:index',
        units: '',
        dataType: SimConnectDataType.INT32,
        settable: true,
    },
    /** True if waiting for pushback. */
    'PUSHBACK WAIT': {
        name: 'PUSHBACK WAIT',
        units: 'Bool',
        dataType: SimConnectDataType.INT32,
        settable: false,
    },
    /** The length of the link at the back of the vehicle used to attach a wagon behind. */
    'WAGON BACK LINK LENGTH': {
        name: 'WAGON BACK LINK LENGTH',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current orientation of the link at the back of the vehicle used to attach a wagon behind. */
    'WAGON BACK LINK ORIENTATION': {
        name: 'WAGON BACK LINK ORIENTATION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "Z" axis position of the start of the link at the back of the vehicle used to attach a wagon behind, relative to the ground. */
    'WAGON BACK LINK START POSZ': {
        name: 'WAGON BACK LINK START POSZ',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The length of the link at the front of the vehicle used to be attached as wagon. */
    'WAGON FRONT LINK LENGTH': {
        name: 'WAGON FRONT LINK LENGTH',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
    /** The current orientation of the link at the front of the vehicle used to be attached as wagon. */
    'WAGON FRONT LINK ORIENTATION': {
        name: 'WAGON FRONT LINK ORIENTATION',
        units: 'Degrees',
        dataType: SimConnectDataType.FLOAT64,
        settable: true,
    },
    /** The "Z" axis position of the start of the link at the front of the vehicle used to be attached as wagon, relative to the ground. */
    'WAGON FRONT LINK START POSZ': {
        name: 'WAGON FRONT LINK START POSZ',
        units: 'Meters',
        dataType: SimConnectDataType.FLOAT64,
        settable: false,
    },
} as const satisfies { [key: string]: PredefinedVariable };

export type SimvarPredefinitions = typeof simvarPredefinitions;
