export enum EventFlag {
    /** Do nothing. */
    EVENT_FLAG_DEFAULT = 0x00000000,
    /** The flag will effectively reset the repeat timer to simulate slow repeat. Use this flag to
     * reset the repeat timer that works with various keyboard events and mouse clicks. */
    EVENT_FLAG_FAST_REPEAT_TIMER = 0x00000001, // set event repeat timer to simulate fast repeat
    /** The flag will effectively reset the repeat timer to simulate slow repeat.
     Use this flag to reset the repeat timer that works with various keyboard events and mouse clicks. */
    EVENT_FLAG_SLOW_REPEAT_TIMER = 0x00000002, // set event repeat timer to simulate slow repeat
    /** Indicates to the SimConnect server to treat the GroupID as a priority value.
     If this parameter is set to {@link NotificationPriority.HIGHEST} then all
     client notification groups that have subscribed to the event will receive
     the notification (unless one of them masks it). The event will be transmitted
     to clients starting at the given priority, though this can result in the
     client that transmitted the event, receiving it again. */
    EVENT_FLAG_GROUPID_IS_PRIORITY = 0x00000010, // interpret GroupID parameter as priority value
}
