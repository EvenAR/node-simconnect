import { SimConnectConnection } from '../SimConnectConnection';
import { SimulationVariablesHelper } from './SimulationVariablesHelper';
import { SystemEventsHelper } from './SystemEventsHelper';
import { FacilitiesHelper } from './FacilitiesHelper';

export class ApiHelper {
    simulationVariables: SimulationVariablesHelper;

    systemEvents: SystemEventsHelper;

    facilities: FacilitiesHelper;

    constructor(handle: SimConnectConnection) {
        this.simulationVariables = new SimulationVariablesHelper(handle);
        this.systemEvents = new SystemEventsHelper(handle);
        this.facilities = new FacilitiesHelper(handle);
    }
}
