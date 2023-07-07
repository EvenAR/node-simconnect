import { BaseHelper } from './BaseHelper';
import { SimConnectDataType } from '../enums/SimConnectDataType';
import { JavascriptDataType, readSimConnectValue } from './utils';
import { FacilityDataType } from '../enums/FacilityDataType';
import { RawBuffer } from '../RawBuffer';
import { IcaoType } from '../dto';
import { SimConnectError } from './SimulationVariablesHelper';
import { SimConnectException } from '../enums/SimConnectException';
import { DataDefinitionId } from '../Types';
import { FacilityListType } from '../enums/FacilityListType';
import { FacilityAirport } from '../facility/FacilityAirport';
import { FacilityWaypoint } from '../facility/FacilityWaypoint';
import { FacilityNDB } from '../facility/FacilityNDB';
import { FacilityVOR } from '../facility/FacilityVOR';

export class FacilitiesHelper extends BaseHelper {
    /**
     * @param icao
     * @param facilityDefinition
     */
    public async getAirport<T extends FacilityRequest>(icao: string, facilityDefinition: T) {
        return this._requestFacilityByEntryPoint('AIRPORT', icao, facilityDefinition);
    }

    /**
     * @param icao
     * @param facilityDefinition
     * @param options
     */
    public async getWaypoint<T extends FacilityRequest>(
        icao: string,
        facilityDefinition: T,
        options?: { region?: string; type?: IcaoType }
    ) {
        return this._requestFacilityByEntryPoint(
            'WAYPOINT',
            icao,
            facilityDefinition,
            options?.region,
            options?.type
        );
    }

    /**
     *
     * @param icao
     * @param facilityDefinition
     * @param options
     */
    public async getNdb<T extends FacilityRequest>(
        icao: string,
        facilityDefinition: T,
        options?: { region?: string; type?: IcaoType }
    ) {
        return this._requestFacilityByEntryPoint(
            'NDB',
            icao,
            facilityDefinition,
            options?.region,
            options?.type
        );
    }

    /**
     *
     * @param icao
     * @param facilityDefinition
     * @param options
     */
    public async getVor<T extends FacilityRequest>(
        icao: string,
        facilityDefinition: T,
        options?: { region?: string; type?: IcaoType }
    ) {
        return this._requestFacilityByEntryPoint(
            'VOR',
            icao,
            facilityDefinition,
            options?.region,
            options?.type
        );
    }

    public async getAirportList(includeWholeWorld = false) {
        return (await this._getFacilitiesList(
            FacilityListType.AIRPORT,
            includeWholeWorld
        )) as FacilityAirport[];
    }

    public async getWaypointList() {
        return (await this._getFacilitiesList(FacilityListType.WAYPOINT)) as FacilityWaypoint[];
    }

    public async getNdbList() {
        return (await this._getFacilitiesList(FacilityListType.NDB)) as FacilityNDB[];
    }

    public async getVorList() {
        return (await this._getFacilitiesList(FacilityListType.VOR)) as FacilityVOR[];
    }

    private _requestFacilityByEntryPoint<T extends FacilityRequest>(
        entryPoint: 'AIRPORT' | 'WAYPOINT' | 'NDB' | 'VOR',
        icao: string,
        facilityDefinition: T,
        region?: string,
        type?: IcaoType
    ) {
        return new Promise<FacilityOutput<T>>((resolve, reject) => {
            const defineId = this._globals.nextDataDefinitionId;
            const requestId = this._globals.nextDataRequestId;

            this._registerFacilityDefinitionRecursively(
                defineId,
                {
                    [entryPoint]: facilityDefinition,
                },
                err => {
                    reject(err);
                }
            );
            const sendId = this._handle.requestFacilityData(
                defineId,
                requestId,
                icao,
                region,
                type
            );
            this._checkForException(sendId, ex =>
                reject(
                    new Error(
                        `${
                            SimConnectException[ex]
                        }: Facility data request for '${icao}' (${entryPoint}) failed. ${
                            explainRequestFacilityDataError(ex) || ''
                        }`
                    )
                )
            );

            let output = {} as FacilityOutput<T>;

            this._handle.on('facilityData', recvFacilityData => {
                if (recvFacilityData.userRequestId === requestId) {
                    const propName = FacilityDataType[recvFacilityData.type];

                    if (propName === entryPoint) {
                        const airportData = readObject(facilityDefinition, recvFacilityData.data);
                        output = { ...output, ...airportData };
                    } else {
                        const object = readObject(
                            // @ts-ignore
                            facilityDefinition[propName],
                            recvFacilityData.data
                        );
                        output = {
                            ...output,
                            [propName]:
                                // @ts-ignore
                                propName in output ? [...output[propName], object] : [object],
                        };
                    }
                }
            });

            this._handle.on('facilityDataEnd', recvFacilityDataEnd => {
                if (recvFacilityDataEnd.userRequestId === requestId) {
                    resolve(output);
                }
            });
        });
    }

    private _registerFacilityDefinitionRecursively(
        defineId: DataDefinitionId,
        definition: { [key: string]: FacilityRequest } | FacilityRequest,
        exceptionHandler: (err: SimConnectError) => void,
        objectName?: string
    ) {
        const names = Object.keys(definition);
        names.forEach((propName, index) => {
            let hasFailed = false;
            function handleException(ex: SimConnectException) {
                const explanation = explainAddToFacilityDefinitionError(ex);
                hasFailed = true;
                exceptionHandler({
                    message: `${
                        SimConnectException[ex]
                    }: Failed to add field name '${propName}' to the facility definition. ${
                        explanation || ''
                    }`,
                    exception: ex,
                });
            }

            const value = definition[propName];
            if (typeof value === 'object' && !hasFailed) {
                const sendId = this._handle.addToFacilityDefinition(defineId, `OPEN ${propName}`);
                this._checkForException(sendId, handleException);
                this._registerFacilityDefinitionRecursively(
                    defineId,
                    value,
                    exceptionHandler,
                    propName
                );
            } else if (!hasFailed) {
                const sendId = this._handle.addToFacilityDefinition(defineId, propName);
                this._checkForException(sendId, handleException);
            }
            if (index === names.length - 1 && objectName && !hasFailed) {
                const sendId = this._handle.addToFacilityDefinition(
                    defineId,
                    `CLOSE ${objectName}`
                );
                this._checkForException(sendId, handleException);
            }
        });
    }

    private async _getFacilitiesList(facilityListType: FacilityListType, wholeWorld = false) {
        const requestId = this._globals.nextDataRequestId;
        const sendId = wholeWorld
            ? this._handle.requestFacilitiesList(facilityListType, requestId)
            : this._handle.requestFacilitiesListEx1(facilityListType, requestId);

        return new Promise((resolve, reject) => {
            if (facilityListType === FacilityListType.AIRPORT) {
                this._handle.once('airportList', recvAirportList => {
                    if (recvAirportList.requestID === requestId) {
                        resolve(recvAirportList.airports);
                    }
                });
            } else if (facilityListType === FacilityListType.WAYPOINT) {
                this._handle.once('waypointList', recvWaypointList => {
                    if (recvWaypointList.requestID === requestId) {
                        resolve(recvWaypointList.waypoints);
                    }
                });
            } else if (facilityListType === FacilityListType.NDB) {
                this._handle.once('ndbList', recvNDBList => {
                    if (recvNDBList.requestID === requestId) {
                        resolve(recvNDBList.ndbs);
                    }
                });
            } else if (facilityListType === FacilityListType.VOR) {
                this._handle.once('vorList', recvVORList => {
                    if (recvVORList.requestID === requestId) {
                        resolve(recvVORList.vors);
                    }
                });
            }

            this._checkForException(sendId, ex =>
                reject(
                    new Error(
                        `Failed to get facilities of type '${FacilityListType[facilityListType]}': ${SimConnectException[ex]}`
                    )
                )
            );
        });
    }
}

/**
 * Reads the facility data recursively based on the user defined structure
 */
function readObject<T extends FacilityRequest>(
    facilityDefinition: T,
    rawBuffer: RawBuffer
): FacilityOutput<T> {
    let output = {};
    Object.keys(facilityDefinition).forEach((propName: keyof T) => {
        const valueType = facilityDefinition[propName];
        if (typeof valueType !== 'object') {
            output = {
                ...output,
                [propName]: readSimConnectValue(rawBuffer, valueType),
            };
        }
    });
    return output as FacilityOutput<T>;
}

type FacilityOutput<RequestStructure extends FacilityRequest> = {
    [PropName in keyof RequestStructure]: RequestStructure[PropName] extends SimConnectDataType
        ? JavascriptDataType[RequestStructure[PropName]]
        : RequestStructure[PropName][];
};

type FacilityRequest = {
    [propName: string]: SimConnectDataType | { [propName: string]: SimConnectDataType };
};

// https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_RequestFacilityData.htm
function explainRequestFacilityDataError(ex: SimConnectException): string | undefined {
    switch (ex) {
        case SimConnectException.ERROR:
            return 'Invalid ICAO and/or region parameter.';
        default:
            return undefined;
    }
}

// https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm
function explainAddToFacilityDefinitionError(ex: SimConnectException) {
    switch (ex) {
        case SimConnectException.DATA_ERROR:
            return 'This field name is not supported by this facility type.';
        default:
            return undefined;
    }
}
