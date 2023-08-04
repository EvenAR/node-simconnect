export enum ClientDataRequestFlag {
    /** The default, data will be sent strictly according to the defined period.
     */
    CLIENT_DATA_REQUEST_FLAG_DEFAULT = 0x00000000,
    /** Data will only be sent to the client when one or more values have changed. If
     * this is the only flag set, then all the variables in a data definition will be returned
     * if just one of the values changes.
     */
    CLIENT_DATA_REQUEST_FLAG_CHANGED = 0x00000001, // send requested data when value(s) change
    /** Requested data will be sent in tagged format (datum ID/value pairs). Tagged
     * format requires that a datum reference ID is returned along with the data value,
     * in order that the client code is able to identify the variable. This flag is
     * usually set in conjunction with the previous flag, but it can be used on its own to
     * return all the values in a data definition in datum ID/value pairs.
     */
    CLIENT_DATA_REQUEST_FLAG_TAGGED = 0x00000002, // send requested data in tagged format
}
