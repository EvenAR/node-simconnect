export enum CommBusBroadcastTo {
    JS = 1 << 0,
    WASM = 1 << 1,
    SIMCONNECT = 1 << 3,
    SIMCONNECT_SELF_CALL = 1 << 4,
    DEFAULT = CommBusBroadcastTo.JS | CommBusBroadcastTo.WASM | CommBusBroadcastTo.SIMCONNECT,
    ALL_SIMCONNECT = CommBusBroadcastTo.SIMCONNECT | CommBusBroadcastTo.SIMCONNECT_SELF_CALL,
    ALL = CommBusBroadcastTo.JS |
        CommBusBroadcastTo.WASM |
        CommBusBroadcastTo.SIMCONNECT |
        CommBusBroadcastTo.SIMCONNECT_SELF_CALL,
}
