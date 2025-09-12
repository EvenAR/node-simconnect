export enum SimObjectType {
    /** Specifies the user's aircraft. */
    USER,
    /** Specifies all AI controlled objects. */
    ALL,
    /** Specifies all aircraft. */
    AIRCRAFT,
    /** Specifies all helicopters. */
    HELICOPTER,
    /** Specifies all AI controlled boats. */
    BOAT,
    /** Specifies all AI controlled ground vehicles */
    GROUND,
    /** MSFS 2024 onwards */
    HOT_AIR_BALLOON,
    ANIMAL,
    USER_AVATAR,
    USER_CURRENT,
}

module.exports = {
    SimObjectType,
};
