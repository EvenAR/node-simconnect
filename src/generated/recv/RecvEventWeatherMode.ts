// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs

import { RawBuffer } from '../../RawBuffer';
import { WeatherMode } from '../enums/WeatherMode';
import { RecvEvent } from './RecvEvent';

export class RecvEventWeatherMode extends RecvEvent {
    mode: WeatherMode;

    constructor(data: RawBuffer) {
        super(data);
        this.mode = this.data < 0 || this.data > 3 ? WeatherMode.THEME : (this.data as WeatherMode);
    }
}
