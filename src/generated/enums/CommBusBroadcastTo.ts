// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

export enum CommBusBroadcastTo {
    JS = 1 << 0,
    WASM = 1 << 1,
    SIMCONNECT = 1 << 3,
    SIMCONNECT_SELF_CALL = 1 << 4,
    DEFAULT = 0xb,
    ALL_SIMCONNECT = 0x18,
    ALL = 0x1b,
}
