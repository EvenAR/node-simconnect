import { BaseHelper } from './BaseHelper';
import { SimConnectConnection } from '../SimConnectConnection';
import { SimConnectDataType } from '../enums/SimConnectDataType';
import { FacilityReturnType, JavascriptDataType, readSimConnectValue } from './utils';
import { FacilityDataType } from '../enums/FacilityDataType';
import { RawBuffer } from '../RawBuffer';
import { IcaoType } from '../dto';
import { SimConnectError } from './SimulationVariablesHelper';
import { SimConnectException } from '../enums/SimConnectException';
import { FacilityListType } from '../enums';
import {
    RecvAirportList,
    RecvFacilityData,
    RecvFacilityDataEnd,
    RecvNDBList,
    RecvVORList,
    RecvWaypointList,
} from '../recv';

export class FacilitiesHelper extends BaseHelper {
    private _nextFacilityDefinition: number;

    private _nextRequestId: number;

    constructor(handle: SimConnectConnection) {
        super(handle);
        this._nextFacilityDefinition = 0;
        this._nextRequestId = 0;
    }

    public async listAll<T extends FacilityListType>(
        facilityListType: T,
        closestOnly: boolean = true
    ): Promise<FacilityReturnType[T][]> {
        return new Promise((resolve, reject) => {
            const requestId = this._nextRequestId++;
            const result: FacilityReturnType[T][] = [];

            const removeListener = this._handle.off;

            const sendId = closestOnly
                ? this._handle.requestFacilitiesListEx1(facilityListType, requestId)
                : this._handle.requestFacilitiesList(facilityListType, requestId);

            this._checkForException(sendId, err => {
                reject(
                    Error(
                        `Failed to get facility list for type ${FacilityListType[facilityListType]}: ${SimConnectException[err]}`
                    )
                );
            });

            function processAirportListChunk({
                requestID,
                airports,
                entryNumber,
                outOf,
            }: RecvAirportList) {
                if (requestID === requestId) {
                    result.push(...(airports as FacilityReturnType[T][]));
                    if (entryNumber === outOf - 1) {
                        removeListener('airportList', processAirportListChunk);
                        resolve(result);
                    }
                }
            }

            function processVorListChunk({ requestID, vors, entryNumber, outOf }: RecvVORList) {
                if (requestID === requestId) {
                    result.push(...(vors as FacilityReturnType[T][]));
                    if (entryNumber === outOf - 1) {
                        removeListener('vorList', processVorListChunk);
                        resolve(result);
                    }
                }
            }

            function processNdbListChunk({ requestID, ndbs, entryNumber, outOf }: RecvNDBList) {
                if (requestID === requestId) {
                    result.push(...(ndbs as FacilityReturnType[T][]));
                    if (entryNumber === outOf - 1) {
                        removeListener('ndbList', processNdbListChunk);
                        resolve(result);
                    }
                }
            }

            function processWaypointListChunk({
                requestID,
                waypoints,
                entryNumber,
                outOf,
            }: RecvWaypointList) {
                if (requestID === requestId) {
                    result.push(...(waypoints as FacilityReturnType[T][]));
                    if (entryNumber === outOf - 1) {
                        removeListener('waypointList', processWaypointListChunk);
                        resolve(result);
                    }
                }
            }

            if (facilityListType === FacilityListType.AIRPORT) {
                this._handle.on('airportList', processAirportListChunk);
            }
            if (facilityListType === FacilityListType.VOR) {
                this._handle.on('vorList', processVorListChunk);
            }
            if (facilityListType === FacilityListType.NDB) {
                this._handle.on('ndbList', processNdbListChunk);
            }
            if (facilityListType === FacilityListType.WAYPOINT) {
                this._handle.on('waypointList', processWaypointListChunk);
            }
        });
    }

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
    public async getNDB<T extends FacilityRequest>(
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
    public async getVOR<T extends FacilityRequest>(
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

    private _requestFacilityByEntryPoint<T extends FacilityRequest>(
        entryPoint: 'AIRPORT' | 'WAYPOINT' | 'NDB' | 'VOR',
        icao: string,
        facilityDefinition: T,
        region?: string,
        type?: IcaoType
    ) {
        return new Promise<FacilityOutput<T>>((resolve, reject) => {
            const defineId = this._nextFacilityDefinition++;
            const requestId = this._nextRequestId++;
            const removeListener = this._handle.off;

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

            function handleFacilityData(recvFacilityData: RecvFacilityData) {
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
            }

            function handleEndOfFacilityData(recvFacilityDataEnd: RecvFacilityDataEnd) {
                if (recvFacilityDataEnd.userRequestId === requestId) {
                    removeListener('facilityData', handleFacilityData);
                    resolve(output);
                }
            }

            this._handle.on('facilityData', handleFacilityData);
            this._handle.once('facilityDataEnd', handleEndOfFacilityData);
        });
    }

    private _registerFacilityDefinitionRecursively(
        defineId: number,
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

type FacilityOutput<Def extends FacilityRequest> = {
    [EntryPoint in keyof Def]: {
        [Child in keyof Def[EntryPoint]]: Def[EntryPoint][Child] extends SimConnectDataType
            ? JavascriptDataType[Def[EntryPoint][Child]]
            : Def[EntryPoint][Child][];
    };
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
