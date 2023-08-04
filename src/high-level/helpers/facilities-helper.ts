import { SimConnectApiHelper } from './sim-connect-api-helper';
import {
    SimConnectDataType,
    SimConnectException,
    FacilityListType,
    FacilityDataType,
    RawBuffer,
    IcaoType,
    DataDefinitionId,
    DataRequestId,
    RecvAirportList,
    RecvNDBList,
    RecvVORList,
    RecvWaypointList,
} from '../../core';
import {
    ApiHelperError,
    FacilityResponseType,
    JavascriptDataType,
    readSimConnectValue,
} from '../utils';

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
    icao: string;
    facilityDefinition: T;
    /** Two letter region. Used if the requested facility does not have a unique ICAO code (like a lot of VORs) */
    region?: string;
    icaoType?: IcaoType;
};

type ObserveListOptions<T extends FacilityListType> = {
    facilityListType: T;
    onListUpdated: (list: FacilityResponseType[T][]) => void;
    onError: (err: ApiHelperError) => void;
};

export class FacilitiesHelper extends SimConnectApiHelper {
    public async requestAirport<T extends FacilityRequest>(icao: string, facilityDefinition: T) {
        return this._requestFacilityByEntryPoint('AIRPORT', icao, facilityDefinition);
    }

    public async requestWaypoint<T extends FacilityRequest>(options: FaciliyRequestOptions<T>) {
        return this._requestFacilityByEntryPoint(
            'WAYPOINT',
            options.icao,
            options.facilityDefinition,
            options.region,
            options.icaoType
        );
    }

    public async requestNdb<T extends FacilityRequest>(options: FaciliyRequestOptions<T>) {
        return this._requestFacilityByEntryPoint(
            'NDB',
            options.icao,
            options.facilityDefinition,
            options.region,
            options.icaoType
        );
    }

    public async requestVor<T extends FacilityRequest>(options: FaciliyRequestOptions<T>) {
        return this._requestFacilityByEntryPoint(
            'VOR',
            options.icao,
            options.facilityDefinition,
            options.region,
            options.icaoType
        );
    }

    public async requestList<T extends FacilityListType>(options: RequestListOptions<T>) {
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
    public observeList<T extends FacilityListType>(options: ObserveListOptions<T>) {
        const itemAddedRequestId = this._handle.idFactory.nextDataRequestId;
        const itemRemovedRequestId = this._handle.idFactory.nextDataRequestId;

        const sendId = this._handle.subscribeToFacilitiesEx1(
            options.facilityListType,
            itemAddedRequestId,
            itemRemovedRequestId
        );

        this._checkForException(sendId, ex =>
            options.onError({
                message: `Failed to subscribe for facility of type '${
                    FacilityListType[options.facilityListType]
                }': ${SimConnectException[ex]}`,
                exception: ex,
            })
        );

        this._waitForFacilityList(options.facilityListType, itemAddedRequestId, false, data =>
            options.onListUpdated(data)
        );

        this._waitForFacilityList(options.facilityListType, itemRemovedRequestId, false, data =>
            options.onListUpdated(data)
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
                [propName]: readSimConnectValue(rawBuffer, valueType),
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
