import { ApiHelperError, SimConnectApiHelper } from './sim-connect-api-helper';
import {
    DataDefinitionId,
    DataRequestId,
    FacilityAirport,
    FacilityDataType,
    FacilityListType,
    FacilityNDB,
    FacilityVOR,
    FacilityWaypoint,
    JavascriptDataType,
    RawBuffer,
    RecvAirportList,
    RecvNDBList,
    RecvVORList,
    RecvWaypointList,
    SimConnectDataType,
    SimConnectException,
} from '../../core';

type FacilityRequest = {
    [propName: string]: SimConnectDataType | { [propName: string]: SimConnectDataType };
};

type FacilityOutput<RequestStructure extends FacilityRequest> = {
    [PropName in keyof RequestStructure]: RequestStructure[PropName] extends SimConnectDataType
        ? JavascriptDataType[RequestStructure[PropName]]
        : RequestStructure[PropName][];
};

type RequestListOptions<T extends FacilityListType> = {
    facilityListType: T;
    includeWholeWorld?: boolean;
};

type FaciliyRequestOptions<T extends FacilityRequest> = {
    /** An object describing which values to include in the response. The object must match the structure described in the docs, or an error will be thrown. See {@link https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm} */
    facilityDefinition: T;
    /** Two letter region. Used if the requested facility does not have a unique ICAO code (like a lot of VORs) */
    region?: string;
};

type ObserveListOptions<T extends FacilityListType> = {
    /** Called whenever a facility leaves or enters the cache of surrounding facilities */
    onListUpdated: (list: FacilityResponseType[T][]) => void;
    onError: (err: ApiHelperError) => void;
};

export type FacilityResponseType = {
    [T in FacilityListType]: {
        [FacilityListType.WAYPOINT]: FacilityWaypoint;
        [FacilityListType.NDB]: FacilityNDB;
        [FacilityListType.AIRPORT]: FacilityAirport;
        [FacilityListType.VOR]: FacilityVOR;
        [FacilityListType.COUNT]: never;
    }[T];
};

export class FacilitiesHelper extends SimConnectApiHelper {
    /**
     * @param icao The airport's ICAO code
     * @param facilityDefinition An object describing which values to include in the response. The object must match the structure described in the docs, or an error will be thrown. See {@link https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm}
     */
    public async getAirportDetails<T extends FacilityRequest>(icao: string, facilityDefinition: T) {
        return this._getFacilityDataByEntryPoint('AIRPORT', icao, facilityDefinition);
    }

    public async getWaypointDetails<T extends FacilityRequest>(
        icao: string,
        options: FaciliyRequestOptions<T>
    ) {
        return this._getFacilityDataByEntryPoint(
            'WAYPOINT',
            icao,
            options.facilityDefinition,
            options.region
        );
    }

    public async getNdbDetails<T extends FacilityRequest>(
        icao: string,
        options: FaciliyRequestOptions<T>
    ) {
        return this._getFacilityDataByEntryPoint(
            'NDB',
            icao,
            options.facilityDefinition,
            options.region
        );
    }

    public async getVorDetails<T extends FacilityRequest>(
        icao: string,
        options: FaciliyRequestOptions<T>
    ) {
        return this._getFacilityDataByEntryPoint(
            'VOR',
            icao,
            options.facilityDefinition,
            options.region
        );
    }

    public async getAirports({ includeWholeWorld }: { includeWholeWorld?: boolean }) {
        return this._getList({ facilityListType: FacilityListType.AIRPORT, includeWholeWorld });
    }

    public async getVors() {
        return this._getList({ facilityListType: FacilityListType.VOR });
    }

    public async getNdbs() {
        return this._getList({ facilityListType: FacilityListType.NDB });
    }

    private async _getList<T extends FacilityListType>(options: RequestListOptions<T>) {
        return new Promise<FacilityResponseType[T][]>((resolve, reject) => {
            const requestId = this._handle.idFactory.nextDataRequestId;

            this._waitForFacilityList(options.facilityListType, requestId, true, data =>
                resolve(data)
            );

            const sendId = options.includeWholeWorld
                ? this._handle.requestFacilitiesList(options.facilityListType, requestId)
                : this._handle.requestFacilitiesListEx1(options.facilityListType, requestId);

            this._checkForException(sendId, ex =>
                reject(
                    Error(
                        `Failed to get facilities of type '${
                            FacilityListType[options.facilityListType]
                        }': ${SimConnectException[ex]}`
                    )
                )
            );
        });
    }

    /**
     * Subscribe for changes in the simulator's facility cache
     */
    public observeAirports(options: ObserveListOptions<FacilityListType.AIRPORT>) {
        return this._observeFacilityCache(FacilityListType.AIRPORT, options);
    }

    /**
     * Subscribe for changes in the simulator's facility cache
     */
    public observeVors(options: ObserveListOptions<FacilityListType.VOR>) {
        return this._observeFacilityCache(FacilityListType.VOR, options);
    }

    /**
     * Subscribe for changes in the simulator's facility cache
     */
    public observeNdbs(options: ObserveListOptions<FacilityListType.NDB>) {
        return this._observeFacilityCache(FacilityListType.NDB, options);
    }

    /**
     * Subscribe for changes in the simulator's facility cache
     */
    public observeWaypoints(options: ObserveListOptions<FacilityListType.WAYPOINT>) {
        return this._observeFacilityCache(FacilityListType.WAYPOINT, options);
    }

    private _observeFacilityCache<T extends FacilityListType>(
        facilityListType: T,
        options: ObserveListOptions<T>
    ) {
        const itemAddedRequestId = this._handle.idFactory.nextDataRequestId;
        const itemRemovedRequestId = this._handle.idFactory.nextDataRequestId;

        const sendId = this._handle.subscribeToFacilitiesEx1(
            facilityListType,
            itemAddedRequestId,
            itemRemovedRequestId
        );

        this._checkForException(sendId, ex =>
            options.onError({
                message: `Failed to subscribe for facility of type '${FacilityListType[facilityListType]}': ${SimConnectException[ex]}`,
                exception: ex,
            })
        );

        this._waitForFacilityList(facilityListType, itemAddedRequestId, false, data =>
            options.onListUpdated(data)
        );

        this._waitForFacilityList(facilityListType, itemRemovedRequestId, false, data =>
            options.onListUpdated(data)
        );
    }

    private _getFacilityDataByEntryPoint<T extends FacilityRequest>(
        entryPoint: 'AIRPORT' | 'WAYPOINT' | 'NDB' | 'VOR',
        icao: string,
        facilityDefinition: T,
        region?: string
    ) {
        return new Promise<FacilityOutput<T>>((resolve, reject) => {
            const defineId = this._handle.idFactory.nextDataDefinitionId;
            const requestId = this._handle.idFactory.nextDataRequestId;

            this._registerFacilityDefinitionRecursively(
                defineId,
                {
                    [entryPoint]: facilityDefinition,
                },
                err => {
                    reject(err);
                }
            );
            const sendId = this._handle.requestFacilityData(defineId, requestId, icao, region);
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
        exceptionHandler: (err: ApiHelperError) => void,
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

    private _waitForFacilityList<T extends FacilityListType>(
        facilityListType: T,
        requestId: DataRequestId,
        isOnetimeRequest: boolean,
        onData: (data: FacilityResponseType[T][]) => void
    ) {
        const output: FacilityResponseType[T][] = [];

        const airportsListHandler = ({
            requestID,
            entryNumber,
            outOf,
            airports,
        }: RecvAirportList) => {
            output.push(...(airports as FacilityResponseType[T][]));
            if (requestID === requestId && entryNumber === outOf - 1) {
                onData(output);
                if (isOnetimeRequest) this._handle.off('airportList', airportsListHandler);
            }
        };

        const waypointListHandler = ({
            requestID,
            entryNumber,
            outOf,
            waypoints,
        }: RecvWaypointList) => {
            output.push(...(waypoints as FacilityResponseType[T][]));
            if (requestID === requestId && entryNumber === outOf - 1) {
                onData(output);
                if (isOnetimeRequest) this._handle.off('waypointList', waypointListHandler);
            }
        };

        const ndbListHandler = ({ requestID, entryNumber, outOf, ndbs }: RecvNDBList) => {
            output.push(...(ndbs as FacilityResponseType[T][]));
            if (requestID === requestId && entryNumber === outOf - 1) {
                onData(output);
                if (isOnetimeRequest) this._handle.off('ndbList', ndbListHandler);
            }
        };

        const vorListHandler = ({ requestID, entryNumber, outOf, vors }: RecvVORList) => {
            output.push(...(vors as FacilityResponseType[T][]));
            if (requestID === requestId && entryNumber === outOf - 1) {
                onData(output);
                if (isOnetimeRequest) this._handle.off('vorList', vorListHandler);
            }
        };

        // We use "on" because there could be multiple chunks
        if (facilityListType === FacilityListType.AIRPORT) {
            this._handle.on('airportList', airportsListHandler);
        } else if (facilityListType === FacilityListType.WAYPOINT) {
            this._handle.on('waypointList', waypointListHandler);
        } else if (facilityListType === FacilityListType.NDB) {
            this._handle.on('ndbList', ndbListHandler);
        } else if (facilityListType === FacilityListType.VOR) {
            this._handle.on('vorList', vorListHandler);
        }
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
                [propName]: rawBuffer.readSimConnectValue(valueType),
            };
        }
    });
    return output as FacilityOutput<T>;
}

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
