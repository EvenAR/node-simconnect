export enum DataSetFlag {
    /** The data to be set is not in tagged format
     * @since 0.5
     */
    DEFAULT = 0x00000000,
    /** The data to be set is being sent in tagged format. Refer to {@link SimConnect#requestDataOnSimObject(int, int, int, SimConnectPeriod, int, int, int, int)} for more details on the tagged format. */
    TAGGED = 0x00000001,
}
