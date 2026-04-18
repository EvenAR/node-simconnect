import { Protocol } from '../enums/Protocol';

/**
 * Centralized protocol version capability management.
 *
 * This class encapsulates protocol version checks to determine
 * which features are available in the current SimConnect protocol version.
 */
export class ProtocolCapabilities {
    private readonly _protocol: Protocol;

    constructor(protocol: Protocol) {
        this._protocol = protocol;
    }

    /**
     * Throws an error if the current protocol version doesn't support a feature.
     *
     * @param required - The minimum protocol version required for the feature
     * @param featureName - Human-readable name of the feature being accessed
     * @throws Error if the current protocol version is less than the required version
     */
    requiresProtocol(required: Protocol, featureName: string): void {
        if (this._protocol < required) {
            const currentVersion = Protocol[this._protocol];
            const requiredVersion = Protocol[required];
            throw new Error(
                `${featureName} requires protocol ${requiredVersion} (${required}) but current protocol is ${currentVersion} (${this._protocol})`
            );
        }
    }

    /**
     * Check if the current protocol version supports a minimum version.
     *
     * @param required - The minimum protocol version to check
     * @returns true if the current protocol is >= the required version
     */
    supports(required: Protocol): boolean {
        return this._protocol >= required;
    }

    /**
     * Get the current protocol version.
     */
    get version(): Protocol {
        return this._protocol;
    }
}
