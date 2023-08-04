export enum TextResult {
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_1 = 0,
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_2 = 1,
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_3 = 2,
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_4 = 3,
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_5 = 4,
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_6 = 5,
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_7 = 6,
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_8 = 7,
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_9 = 8,
    /**   Specifies that the user has selected the menu item. */
    MENU_SELECT_10 = 9,
    /**   Specifies that the menu or text identified by the EventID is now on display. */
    DISPLAYED = 0x00010000,
    /**   Specifies that the menu or text identified by the EventID is waiting in a queue. */
    QUEUED = 0x00010001,
    /**   Specifies that the menu or text identified by the EventID has been removed from the queue. */
    REMOVED = 0x00010002,
    /**    Specifies that the menu or text identified by the EventID has been replaced in the queue. */
    REPLACED = 0x00010003,
    /**   Specifies that the menu or text identified by the EventID has timed-out and is no longer on display. */
    TIMEOUT = 0x00010004,
}

module.exports = {
    TextResult,
};
