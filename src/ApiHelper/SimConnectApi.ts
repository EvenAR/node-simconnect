import { ConnectionOptions, FlightSimulatorApi, open, Protocol } from '..';

export class SimConnectApi {
    appName: string;

    minimumCompatability: Protocol;

    constructor(appName: string, minimumCompatability: Protocol) {
        this.appName = appName;
        this.minimumCompatability = minimumCompatability;
    }

    connect = async (connectionOptions?: ConnectionOptions) => {
        const res = await open(this.appName, this.minimumCompatability, connectionOptions);
        return new FlightSimulatorApi(res.handle);
    };
}
