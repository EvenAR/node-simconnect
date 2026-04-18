import { SimConnectConnection } from '../src/SimConnectConnection';
import { Protocol } from '../src/enums/Protocol';

describe('SimConnectConnection API Backward Compatibility', () => {
    let connection: SimConnectConnection;

    beforeEach(() => {
        connection = new SimConnectConnection('Test App', Protocol.KittyHawk);
    });

    afterEach(() => {
        connection.close();
    });

    describe('Connection lifecycle methods', () => {
        it('should have connect method', () => {
            expect(typeof connection.connect).toBe('function');
        });

        it('should have close method', () => {
            expect(typeof connection.close).toBe('function');
        });
    });

    describe('Data definition methods', () => {
        it('should have addToDataDefinition method', () => {
            expect(typeof connection.addToDataDefinition).toBe('function');
        });

        it('should have clearDataDefinition method', () => {
            expect(typeof connection.clearDataDefinition).toBe('function');
        });

        it('should have requestDataOnSimObject method', () => {
            expect(typeof connection.requestDataOnSimObject).toBe('function');
        });

        it('should have requestDataOnSimObjectType method', () => {
            expect(typeof connection.requestDataOnSimObjectType).toBe('function');
        });

        it('should have setDataOnSimObject method', () => {
            expect(typeof connection.setDataOnSimObject).toBe('function');
        });
    });

    describe('Event system methods', () => {
        it('should have mapClientEventToSimEvent method', () => {
            expect(typeof connection.mapClientEventToSimEvent).toBe('function');
        });

        it('should have transmitClientEvent method', () => {
            expect(typeof connection.transmitClientEvent).toBe('function');
        });

        it('should have transmitClientEventEx method', () => {
            expect(typeof connection.transmitClientEventEx).toBe('function');
        });

        it('should have setNotificationGroupPriority method', () => {
            expect(typeof connection.setNotificationGroupPriority).toBe('function');
        });

        it('should have clearNotificationGroup method', () => {
            expect(typeof connection.clearNotificationGroup).toBe('function');
        });

        it('should have requestNotificationGroup method', () => {
            expect(typeof connection.requestNotificationGroup).toBe('function');
        });

        it('should have addClientEventToNotificationGroup method', () => {
            expect(typeof connection.addClientEventToNotificationGroup).toBe('function');
        });

        it('should have removeClientEvent method', () => {
            expect(typeof connection.removeClientEvent).toBe('function');
        });
    });

    describe('Weather methods', () => {
        it('should have weatherSetModeGlobal method', () => {
            expect(typeof connection.weatherSetModeGlobal).toBe('function');
        });

        it('should have weatherSetModeTheme method', () => {
            expect(typeof connection.weatherSetModeTheme).toBe('function');
        });

        it('should have weatherSetModeCustom method', () => {
            expect(typeof connection.weatherSetModeCustom).toBe('function');
        });

        it('should have weatherSetDynamicUpdateRate method', () => {
            expect(typeof connection.weatherSetDynamicUpdateRate).toBe('function');
        });

        it('should have weatherRequestInterpolatedObservation method', () => {
            expect(typeof connection.weatherRequestInterpolatedObservation).toBe('function');
        });

        it('should have weatherRequestObservationAtStation method', () => {
            expect(typeof connection.weatherRequestObservationAtStation).toBe('function');
        });

        it('should have weatherRequestObservationAtNearestStation method', () => {
            expect(typeof connection.weatherRequestObservationAtNearestStation).toBe('function');
        });

        it('should have weatherCreateStation method', () => {
            expect(typeof connection.weatherCreateStation).toBe('function');
        });

        it('should have weatherRemoveStation method', () => {
            expect(typeof connection.weatherRemoveStation).toBe('function');
        });

        it('should have weatherSetObservation method', () => {
            expect(typeof connection.weatherSetObservation).toBe('function');
        });

        it('should have weatherRequestCloudState method', () => {
            expect(typeof connection.weatherRequestCloudState).toBe('function');
        });
    });

    describe('AI Traffic methods', () => {
        it('should have aICreateParkedATCAircraft method', () => {
            expect(typeof connection.aICreateParkedATCAircraft).toBe('function');
        });

        it('should have aICreateEnrouteATCAircraft method', () => {
            expect(typeof connection.aICreateEnrouteATCAircraft).toBe('function');
        });

        it('should have aICreateNonATCAircraft method', () => {
            expect(typeof connection.aICreateNonATCAircraft).toBe('function');
        });

        it('should have aICreateSimulatedObject method', () => {
            expect(typeof connection.aICreateSimulatedObject).toBe('function');
        });

        it('should have aIReleaseControl method', () => {
            expect(typeof connection.aIReleaseControl).toBe('function');
        });

        it('should have aIRemoveObject method', () => {
            expect(typeof connection.aIRemoveObject).toBe('function');
        });

        it('should have aISetAircraftFlightPlan method', () => {
            expect(typeof connection.aISetAircraftFlightPlan).toBe('function');
        });
    });

    describe('Facility methods', () => {
        it('should have subscribeToFacilities method', () => {
            expect(typeof connection.subscribeToFacilities).toBe('function');
        });

        it('should have unSubscribeToFacilities method', () => {
            expect(typeof connection.unSubscribeToFacilities).toBe('function');
        });

        it('should have requestFacilitiesList method', () => {
            expect(typeof connection.requestFacilitiesList).toBe('function');
        });

        it('should have addToFacilityDefinition method', () => {
            expect(typeof connection.addToFacilityDefinition).toBe('function');
        });

        it('should have requestFacilityData method', () => {
            expect(typeof connection.requestFacilityData).toBe('function');
        });

        it('should have subscribeToFacilitiesEx1 method', () => {
            expect(typeof connection.subscribeToFacilitiesEx1).toBe('function');
        });

        it('should have unSubscribeToFacilitiesEx1 method', () => {
            expect(typeof connection.unSubscribeToFacilitiesEx1).toBe('function');
        });

        it('should have requestFacilitiesListEx1 method', () => {
            expect(typeof connection.requestFacilitiesListEx1).toBe('function');
        });
    });

    describe('Input Event methods', () => {
        it('should have enumerateInputEvents method', () => {
            expect(typeof connection.enumerateInputEvents).toBe('function');
        });

        it('should have getInputEvent method', () => {
            expect(typeof connection.getInputEvent).toBe('function');
        });

        it('should have setInputEvent method', () => {
            expect(typeof connection.setInputEvent).toBe('function');
        });

        it('should have subscribeInputEvent method', () => {
            expect(typeof connection.subscribeInputEvent).toBe('function');
        });

        it('should have unsubscribeInputEvent method', () => {
            expect(typeof connection.unsubscribeInputEvent).toBe('function');
        });

        it('should have enumerateInputEventParams method', () => {
            expect(typeof connection.enumerateInputEventParams).toBe('function');
        });
    });

    describe('System state methods', () => {
        it('should have requestSystemState method', () => {
            expect(typeof connection.requestSystemState).toBe('function');
        });

        it('should have setSystemState method', () => {
            expect(typeof connection.setSystemState).toBe('function');
        });

        it('should have setSystemEventState method', () => {
            expect(typeof connection.setSystemEventState).toBe('function');
        });

        it('should have subscribeToSystemEvent method', () => {
            expect(typeof connection.subscribeToSystemEvent).toBe('function');
        });

        it('should have unsubscribeFromSystemEvent method', () => {
            expect(typeof connection.unsubscribeFromSystemEvent).toBe('function');
        });
    });

    describe('Client data methods', () => {
        it('should have createClientData method', () => {
            expect(typeof connection.createClientData).toBe('function');
        });

        it('should have addToClientDataDefinition method', () => {
            expect(typeof connection.addToClientDataDefinition).toBe('function');
        });

        it('should have clearClientDataDefinition method', () => {
            expect(typeof connection.clearClientDataDefinition).toBe('function');
        });

        it('should have requestClientData method', () => {
            expect(typeof connection.requestClientData).toBe('function');
        });

        it('should have setClientData method', () => {
            expect(typeof connection.setClientData).toBe('function');
        });
    });

    describe('Miscellaneous methods', () => {
        it('should have flightLoad method', () => {
            expect(typeof connection.flightLoad).toBe('function');
        });

        it('should have flightSave method', () => {
            expect(typeof connection.flightSave).toBe('function');
        });

        it('should have flightPlanLoad method', () => {
            expect(typeof connection.flightPlanLoad).toBe('function');
        });

        it('should have text method', () => {
            expect(typeof connection.text).toBe('function');
        });

        it('should have menu method', () => {
            expect(typeof connection.menu).toBe('function');
        });

        it('should have executeMissionAction method', () => {
            expect(typeof connection.executeMissionAction).toBe('function');
        });

        it('should have requestJetwayData method', () => {
            expect(typeof connection.requestJetwayData).toBe('function');
        });

        it('should have enumerateControllers method', () => {
            expect(typeof connection.enumerateControllers).toBe('function');
        });

        it('should have mapInputEventToClientEventEx1 method', () => {
            expect(typeof connection.mapInputEventToClientEventEx1).toBe('function');
        });

        it('should have executeAction method', () => {
            expect(typeof connection.executeAction).toBe('function');
        });

        it('should have addFacilityDataDefinitionFilter method', () => {
            expect(typeof connection.addFacilityDataDefinitionFilter).toBe('function');
        });

        it('should have clearAllFacilityDataDefinitionFilters method', () => {
            expect(typeof connection.clearAllFacilityDataDefinitionFilters).toBe('function');
        });
    });

    describe('SunRise (MSFS 2024) methods', () => {
        it('should have aICreateParkedATCAircraftEx1 method', () => {
            expect(typeof connection.aICreateParkedATCAircraftEx1).toBe('function');
        });

        it('should have aICreateEnrouteATCAircraftEx1 method', () => {
            expect(typeof connection.aICreateEnrouteATCAircraftEx1).toBe('function');
        });

        it('should have aICreateNonATCAircraftEx1 method', () => {
            expect(typeof connection.aICreateNonATCAircraftEx1).toBe('function');
        });

        it('should have aICreateSimulatedObjectEx1 method', () => {
            expect(typeof connection.aICreateSimulatedObjectEx1).toBe('function');
        });

        it('should have enumerateSimObjectsAndLiveries method', () => {
            expect(typeof connection.enumerateSimObjectsAndLiveries).toBe('function');
        });

        it('should have subscribeToFlowEvent method', () => {
            expect(typeof connection.subscribeToFlowEvent).toBe('function');
        });

        it('should have unsubscribeToFlowEvent method', () => {
            expect(typeof connection.unsubscribeToFlowEvent).toBe('function');
        });

        it('should have requestAllFacilities method', () => {
            expect(typeof connection.requestAllFacilities).toBe('function');
        });
    });

    describe('Event emitter interface', () => {
        it('should have on method', () => {
            expect(typeof connection.on).toBe('function');
        });

        it('should have once method', () => {
            expect(typeof connection.once).toBe('function');
        });

        it('should have off method', () => {
            expect(typeof connection.off).toBe('function');
        });

        it('should have removeListener method', () => {
            expect(typeof connection.removeListener).toBe('function');
        });

        it('should have removeAllListeners method', () => {
            expect(typeof connection.removeAllListeners).toBe('function');
        });

        it('should have addListener method', () => {
            expect(typeof connection.addListener).toBe('function');
        });

        it('should have emit method', () => {
            expect(typeof connection.emit).toBe('function');
        });
    });
});
