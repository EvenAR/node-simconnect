export enum DataSetFlag {
    /** The data to be set is not in tagged format
     */
    DEFAULT = 0x00000000,
    /** The data to be set is being sent in tagged format. Refer to {@link SimConnectConnection.requestDataOnSimObject} for more details on the tagged format. */
    TAGGED = 0x00000001,
}
