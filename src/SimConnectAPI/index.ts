import { ConnectionOptions, SimConnectConnection } from '../SimConnectConnection';
import { SimulationVariablesHelper } from './SimulationVariablesHelper';
import { SystemEventsHelper } from './SystemEventsHelper';
import { FacilitiesHelper } from './FacilitiesHelper';
import { Protocol } from '../enums/Protocol';
import { RecvOpen } from '../recv';
import { open } from '..';

type ApiHelperOptions = {
    minimumSim: Protocol;
    retryInterval: number;
    onConnect: (
        simInfo: RecvOpen,
        simConnectConnection: SimConnectConnection,
        apiHelpers: ApiHelpers
    ) => void;
    onRetry: (reason: string) => void;
    connectionOption?: ConnectionOptions;
};

export type ApiHelpers = {
    simulationVariables: SimulationVariablesHelper;
    systemEvents: SystemEventsHelper;
    facilities: FacilitiesHelper;
};

export class SimConnectAPI {
    private _appName: string;

    private _connectionTimeout: NodeJS.Timeout | undefined;

    constructor(appName: string) {
        this._appName = appName;
    }

    connect(options: ApiHelperOptions) {
        open(this._appName, options.minimumSim, options.connectionOption)
            .then(({ recvOpen, handle }) => {
                options.onConnect(recvOpen, handle, {
                    simulationVariables: new SimulationVariablesHelper(handle),
                    systemEvents: new SystemEventsHelper(handle),
                    facilities: new FacilitiesHelper(handle),
                });

                handle.on('close', () => this._retry('Connection closed', options));
            })
            .catch(e => this._retry(e, options));
    }

    private _retry(reason: string, options: ApiHelperOptions) {
        options.onRetry(reason);

        if (this._connectionTimeout) clearTimeout(this._connectionTimeout);
        this._connectionTimeout = setTimeout(() => {
            this.connect(options);
        }, options.retryInterval);
    }
}
