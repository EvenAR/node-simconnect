export const enum NotificationPriority {
    /** The highest priority. */
    HIGHEST = (0x00000001),
    /**    The hightest priority that allows events to be masked. */
    HIGHEST_MASKABLE = (0x00989680),
    /** The standard priority. */
    STANDARD= (0x713fb300),
    /** The default priority. */
    DEFAULT = (0x77359400),
    /** Priorities lower than this will be ignored. */
    LOWEST = (0xee6b2800)
}