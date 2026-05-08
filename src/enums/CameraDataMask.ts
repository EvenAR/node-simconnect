export enum CameraDataMask {
    NONE = 0,
    POSITION = 1 << 0,
    ROTATION = 1 << 1,
    TARGETED = 1 << 2,
    FOV = 1 << 3,
    REFERENTIAL = 1 << 4,
    ALL_ROTATION = POSITION | ROTATION | FOV,
    ALL_TARGETED = POSITION | TARGETED | FOV,
}
