import { RawBuffer } from '../RawBuffer';
import { WeatherMode } from '../enums/WeatherMode';
import { RecvEvent } from './RecvEvent';

export class RecvEventWeatherMode extends RecvEvent {
    mode: WeatherMode;

    constructor(data: RawBuffer) {
        super(data);
        this.mode =
            this.data < 0 || this.data > WeatherMode.GLOBAL
                ? WeatherMode.THEME
                : this.data;
    }
}
