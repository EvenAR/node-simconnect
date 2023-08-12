import { ConnectionOptions, SimConnectConnection } from '../core/SimConnectConnection';
import { SimulationVariablesHelper } from './helpers/simulation-variables-helper';
import { EventsHelper } from './helpers/events-helper';
import { FacilitiesHelper } from './helpers/facilities-helper';
import { Protocol } from '../core/enums/Protocol';
import { open, RecvOpen } from '../core';

export type SimConnectAppOptions = {
    /** If you want your app to be backwards compatible with FSX, use FSX_SP2. Use KittyHawk to access the newest MSFS features (default) */
    minimumCompatability?: Protocol;
    /** Called whenever a connection attempt has failed or when the connection with the simulator is lost */
    onRetry?: (reason: string) => void;
    /** Called when connection with the flight simulator is established (also after a reconnect) */
    onConnect: (event: ConnectionEvent) => void;
    /** How long to wait before trying to connect again (in milliseconds). Defaults to 1000. */
    retryInterval?: number;
    /** How to connect with the sim */
    connectionOption?: ConnectionOptions;
};

export type ConnectionEvent = {
    /** Information about the connected simulator */
    simulatorInfo: RecvOpen;
    /** Contains different helper classes for interacting with SimConnect */
    apiHelpers: ApiHelpers;
    /** The connection object. Used in cases where none of the apiHelpers can help you */
    simConnectConnection: SimConnectConnection;
};

export type ApiHelpers = {
    simulationVariables: SimulationVariablesHelper;
    events: EventsHelper;
    facilities: FacilitiesHelper;
};

export class SimConnectApp {
    private _appName: string;

    private _connectionTimeout: NodeJS.Timeout | undefined;

    constructor(appName: string) {
        this._appName = appName;
    }

    /**
     *
     * @param options.baseProtocol The minimum protocol to support. Defaults to Kittyhawk (MSFS 2020)
     */
    connect(options: SimConnectAppOptions) {
        open(
            this._appName,
            options.minimumCompatability || Protocol.KittyHawk,
            options.connectionOption
        )
            .then(({ recvOpen, handle }) => {
                options.onConnect({
                    simulatorInfo: recvOpen,
                    simConnectConnection: handle,
                    apiHelpers: {
                        simulationVariables: new SimulationVariablesHelper(handle),
                        events: new EventsHelper(handle),
                        facilities: new FacilitiesHelper(handle),
                    },
                });

                handle.on('close', () => this._retry('Connection closed', options));
            })
            .catch(e => this._retry(e, options));
    }

    private _retry(reason: string, options: SimConnectAppOptions) {
        if (options.onRetry) {
            options.onRetry(reason);
        }

        if (this._connectionTimeout) clearTimeout(this._connectionTimeout);
        this._connectionTimeout = setTimeout(() => {
            this.connect(options);
        }, options.retryInterval || 1000);
    }
}
