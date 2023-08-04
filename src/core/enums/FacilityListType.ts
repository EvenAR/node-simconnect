export enum FacilityListType {
    /** Specifies that the type of information is for an airport */
    AIRPORT,
    /**   Specifies that the type of information is for a waypoint */
    WAYPOINT,
    /** Specifies that the type of information is for an NDB */
    NDB,
    /**   Specifies that the type of information is for a VOR */
    VOR,
    COUNT,
}

module.exports = {
    FacilityListType,
};
