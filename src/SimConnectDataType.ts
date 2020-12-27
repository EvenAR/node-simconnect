export enum SimConnectDataType {
	INVALID,        // invalid data type
	/** Integer */
	INT32,          // 32-bit integer number
	/** Integer */
    INT64,          // 64-bit integer number
    /** Floating point */
    FLOAT32,        // 32-bit floating-point number (float)
    /** Floating point */
    FLOAT64,        // 64-bit floating-point number (double)
    /** Fixed-length string */
    STRING8,        // 8-byte string
    /** Fixed-length string */
    STRING32,       // 32-byte string
    /** Fixed-length string */
    STRING64,       // 64-byte string
    /** Fixed-length string */
    STRING128,      // 128-byte string
    /** Fixed-length string */
    STRING256,      // 256-byte string
    /** Fixed-length string */
    STRING260,      // 260-byte string
    /** Variable-length string */
    STRINGV,        // variable-length string
    
    /** {@link InitPosition} data structure */
    INITPOSITION,   // see INITPOSITION
    /** {@link MarkerState} data structure */
    MARKERSTATE,    // see MARKERSTATE
    /** {@link Waypoint} data structure */
    WAYPOINT,       // see WAYPOINT
    /** {@link LatLonAlt} data structure */
    LATLONALT,      // see LATLONALT
    /** {@link XYZ} data structure */
    XYZ,            // see XYZ

    MAX             // enum limit
}