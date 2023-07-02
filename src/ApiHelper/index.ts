import { SimConnectConnection } from '../SimConnectConnection';
import { SimulationVariablesHelper } from './SimulationVariablesHelper';
import { SystemEventsHelper } from './SystemEventsHelper';

export class ApiHelper {
    simulationVariables: SimulationVariablesHelper;

    systemEvents: SystemEventsHelper;

    constructor(handle: SimConnectConnection) {
        this.simulationVariables = new SimulationVariablesHelper(handle);
        this.systemEvents = new SystemEventsHelper(handle);
    }
}
