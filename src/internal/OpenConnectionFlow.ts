import { Protocol } from '../enums/Protocol';
import { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';

type OpenPacketData = {
    alias: string;
    buildMajor: number;
    buildMinor: number;
    major: number;
    minor: number;
};

const OPEN_TIMEOUT_MS = 5000;

const openPacketData: Record<Protocol, OpenPacketData> = {
    [Protocol.FSX_RTM]: {
        alias: 'XSF',
        buildMajor: 60905,
        buildMinor: 0,
        major: 0,
        minor: 0,
    },
    [Protocol.FSX_SP1]: {
        alias: 'XSF',
        buildMajor: 61355,
        buildMinor: 0,
        major: 10,
        minor: 0,
    },
    [Protocol.FSX_SP2]: {
        alias: 'XSF',
        buildMajor: 61259,
        buildMinor: 0,
        major: 10,
        minor: 0,
    },
    [Protocol.KittyHawk]: {
        alias: 'HK',
        buildMajor: 62651,
        buildMinor: 3,
        major: 11,
        minor: 0,
    },
    [Protocol.SunRise]: {
        alias: 'SR',
        buildMajor: 282174,
        buildMinor: 999,
        major: 12,
        minor: 2,
    },
};

export class OpenConnectionFlow {
    private openTimeout: NodeJS.Timeout | null = null;

    constructor(
        private readonly appName: string,
        private readonly protocol: Protocol,
        private readonly beginPacket: (packetTypeId: number) => SimConnectPacketBuilder,
        private readonly sendPacket: (builder: SimConnectPacketBuilder) => number,
        private readonly closeConnection: () => void,
        private readonly emitError: (error: Error) => void,
        private readonly invalidProtocolErrorMessage: string
    ) {}

    start(): void {
        this.clearOpenTimeout();

        const version = openPacketData[this.protocol];
        if (!version) {
            throw new Error(this.invalidProtocolErrorMessage);
        }

        this.openTimeout = setTimeout(() => {
            this.closeConnection();
            this.emitError(new Error('Open timeout'));
        }, OPEN_TIMEOUT_MS);

        this.sendPacket(
            this.beginPacket(0x01)
                .putString256(this.appName)
                .putInt32(0)
                .putByte(0x00)
                .putString(version.alias, 3)
                .putInt32(version.major)
                .putInt32(version.minor)
                .putInt32(version.buildMajor)
                .putInt32(version.buildMinor)
        );
    }

    complete(): void {
        this.clearOpenTimeout();
    }

    dispose(): void {
        this.clearOpenTimeout();
    }

    private clearOpenTimeout(): void {
        if (this.openTimeout !== null) {
            clearTimeout(this.openTimeout);
            this.openTimeout = null;
        }
    }
}
