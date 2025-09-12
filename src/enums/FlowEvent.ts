export enum FlowEvent {
    NONE,
    FLT_LOAD,
    FLT_LOADED,
    TELEPORT_START,
    TELEPORT_DONE,
    BACK_ON_TRACK_START,
    BACK_ON_TRACK_DONE,
    SKIP_START,
    SKIP_DONE,
    BACK_TO_MAIN_MENU,
    RTC_START,
    RTC_END,
    REPLAY_START,
    REPLAY_END,
    FLIGHT_START,
    FLIGHT_END,
    PLANE_CRASH,
}

module.exports = {
    FlowEvent,
};
