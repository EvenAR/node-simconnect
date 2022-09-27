export enum SimConnectDataType {
    /** Invalid data type */
    INVALID,
    /** 32-bit integer number */
    INT32,
    /** 64-bit integer number */
    INT64,
    /** 32-bit floating-point number (float) */
    FLOAT32,
    /** 64-bit floating-point number (double) */
    FLOAT64,
    /** Fixed-length string, 8-byte */
    STRING8,
    /** Fixed-length string, 32-byte */
    STRING32,
    /** Fixed-length string, 64-byte */
    STRING64,
    /** Fixed-length string, 128-byte */
    STRING128,
    /** Fixed-length string, 256-byte */
    STRING256,
    /** Fixed-length string, 260-byte */
    STRING260,
    /** Variable-length string */
    STRINGV,

    /** {@link InitPosition} data structure */
    INITPOSITION,
    /** {@link MarkerState} data structure */
    MARKERSTATE,
    /** {@link Waypoint} data structure */
    WAYPOINT,
    /** {@link LatLonAlt} data structure */
    LATLONALT,
    /** {@link XYZ} data structure */
    XYZ,
    /** enum limit */
    MAX,
}

module.exports = {
    SimConnectDataType,
};
