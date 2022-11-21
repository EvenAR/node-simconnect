import { Protocol, open } from '../../dist';
import { FacilityDataType } from '../../dist/enums/FacilityDataType';

/**
 * Reading navigational data from an airport (ASOBO only)
 */

const AIRPORT_ICAO = 'ENGM';

const enum DefinitionID {
    FACILITY_AIRPORT = 1000,
    FACILITY_VOR = 2000,
}

let requestId = 100;

const DESIGNATOR_VALUE = ['', 'L', 'R', 'C', 'WATER', 'A', 'B', 'LAST'];

open('SimConnect sample client', Protocol.ASOBO)
    .then(({ recvOpen, handle }) => {
        console.log('Connected to sim!');

        // Airport
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'OPEN AIRPORT'); // Open
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'LATITUDE');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'LONGITUDE');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'ALTITUDE');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'MAGVAR');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'NAME');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'N_RUNWAYS');
        // Runway
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'OPEN RUNWAY'); // Open
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'PRIMARY_NUMBER');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'PRIMARY_DESIGNATOR');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'PRIMARY_ILS_ICAO');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'PRIMARY_ILS_REGION');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'SECONDARY_NUMBER');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'SECONDARY_DESIGNATOR');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'SECONDARY_ILS_ICAO');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'SECONDARY_ILS_REGION');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'HEADING');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'CLOSE RUNWAY'); // Close
        // VOR
        handle.addToFacilityDefinition(DefinitionID.FACILITY_VOR, 'OPEN VOR'); // Open
        handle.addToFacilityDefinition(DefinitionID.FACILITY_VOR, 'NAME');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_VOR, 'FREQUENCY');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_VOR, 'LOCALIZER');
        handle.addToFacilityDefinition(DefinitionID.FACILITY_VOR, 'CLOSE VOR'); // Close

        handle.addToFacilityDefinition(DefinitionID.FACILITY_AIRPORT, 'CLOSE AIRPORT'); // Close

        handle.requestFacilityData(DefinitionID.FACILITY_AIRPORT, requestId++, AIRPORT_ICAO);

        handle.on('facilityData', recvFacilityData => {
            switch (recvFacilityData.type) {
                case FacilityDataType.AIRPORT:
                    // Reading order is important!
                    const lat = recvFacilityData.data.readDouble();
                    const lng = recvFacilityData.data.readDouble();
                    const alt = recvFacilityData.data.readDouble();
                    const magvar = recvFacilityData.data.readFloat();
                    const name = recvFacilityData.data.readString32();
                    const nRunways = recvFacilityData.data.readInt();
                    console.log({ lat, lng, alt, magvar, name, nRunways });
                    break;
                case FacilityDataType.RUNWAY:
                    // Reading order is important!
                    const number1 = recvFacilityData.data.readInt();
                    const designator1 = recvFacilityData.data.readInt();
                    const ilsIcao1 = recvFacilityData.data.readString8();
                    const ilsRegion1 = recvFacilityData.data.readString8();
                    const number2 = recvFacilityData.data.readInt();
                    const designator2 = recvFacilityData.data.readInt();
                    const ilsIcao2 = recvFacilityData.data.readString8();
                    const ilsRegion2 = recvFacilityData.data.readString8();

                    const heading = recvFacilityData.data.readFloat();

                    console.log({
                        runway:
                            number1 +
                            DESIGNATOR_VALUE[designator1] +
                            '/' +
                            number2 +
                            DESIGNATOR_VALUE[designator2],
                        heading,
                        ilsIcao1,
                        ilsIcao2,
                        ilsRegion1,
                        ilsRegion2,
                    });

                    handle.requestFacilityData(
                        DefinitionID.FACILITY_VOR,
                        requestId++,
                        ilsIcao1,
                        ilsRegion1
                    );
                    handle.requestFacilityData(
                        DefinitionID.FACILITY_VOR,
                        requestId++,
                        ilsIcao2,
                        ilsRegion2
                    );
                    break;
                case FacilityDataType.VOR:
                    const vorName = recvFacilityData.data.readString64();
                    const frequency = recvFacilityData.data.readInt() / 1_000_000;
                    const localizer = recvFacilityData.data.readFloat();
                    console.log({
                        vorName,
                        frequency,
                        localizer,
                    });
                    break;
            }
        });

        handle.on('facilityMinimalList', recvFacilityMinimalList => {
            console.log(recvFacilityMinimalList);
        });

        handle.on('facilityDataEnd', recvFacilityDataEnd => {
            console.log(
                `Finished reading data for request ID: ` + recvFacilityDataEnd.userRequestId
            );
        });

        handle.on('exception', exception => {
            console.log(exception);
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
