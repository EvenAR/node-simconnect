import { RawBuffer } from '../RawBuffer';
import { FacilityNDB } from './FacilityNDB';

export class FacilityVOR extends FacilityNDB {
    public static HAS_NAV_SIGNAL = 0x00000001;

    public static HAS_LOCALIZER = 0x00000002;

    public static HAS_GLIDE_SLOPE = 0x00000004;

    public static HAS_DME = 0x00000008;

    flags: number;

    localizer: number;

    glideLat: number;

    glideLon: number;

    glideAlt: number;

    glideSlipeAngle: number;

    constructor(data: RawBuffer) {
        super(data);
        this.flags = data.readInt();
        this.localizer = data.readFloat();
        this.glideLat = data.readDouble();
        this.glideLon = data.readDouble();
        this.glideAlt = data.readDouble();
        this.glideSlipeAngle = data.readFloat();
    }

    hasFlag(flag: number): boolean {
        return (this.flags & flag) !== 0;
    }

    hasNavSignal(): boolean {
        return this.hasFlag(FacilityVOR.HAS_NAV_SIGNAL);
    }

    hasLocalizer(): boolean {
        return this.hasFlag(FacilityVOR.HAS_LOCALIZER);
    }

    hasGlideSlope(): boolean {
        return this.hasFlag(FacilityVOR.HAS_GLIDE_SLOPE);
    }

    hasDME(): boolean {
        return this.hasFlag(FacilityVOR.HAS_DME);
    }
}
