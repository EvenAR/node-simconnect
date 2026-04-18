import { ConnectionParameters } from '../../connectionParameters';
import { SimConnectMessage } from '../../SimConnectProtocolMessage';

export interface SimConnectTransportEvents {
    close: (hadError: boolean) => void;
    connect: () => void;
    data: (message: SimConnectMessage) => void;
    drain: () => void;
    end: () => void;
    error: (error: Error) => void;
    lookup: (error: Error | null, address: string, family: number, host: string) => void;
    ready: () => void;
    timeout: () => void;
}

export interface SimConnectTransport {
    close(): void;
    connect(address: ConnectionParameters): void;
    on<U extends keyof SimConnectTransportEvents>(
        event: U,
        listener: SimConnectTransportEvents[U]
    ): this;
    write(data: Buffer): boolean;
}
