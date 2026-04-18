import { RawBuffer } from '../RawBuffer';

type Decoder<T> = (data: RawBuffer) => T;

export function readFields<T extends Record<string, unknown>>(
    data: RawBuffer,
    decoders: { [K in keyof T]: Decoder<T[K]> }
): T {
    return Object.fromEntries(
        (Object.keys(decoders) as Array<keyof T>).map(key => [key, decoders[key](data)])
    ) as T;
}
