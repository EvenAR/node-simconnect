import { BaseHelper } from './BaseHelper';
import { SimConnectDataType } from '../enums/SimConnectDataType';
import {
    ApiHelperError,
    FacilityResponseType,
    JavascriptDataType,
    readSimConnectValue,
} from './utils';
import { FacilityDataType } from '../enums/FacilityDataType';
import { RawBuffer } from '../RawBuffer';
import { IcaoType } from '../dto';
import { SimConnectException } from '../enums/SimConnectException';
import { DataDefinitionId, DataRequestId } from '../Types';
import { FacilityListType } from '../enums/FacilityListType';
import { RecvAirportList, RecvNDBList, RecvVORList, RecvWaypointList } from '../recv';

type FacilityRequest = {
    [propName: string]: SimConnectDataType | { [propName: string]: SimConnectDataType };
};

type FacilityOutput<RequestStructure extends FacilityRequest> = {
    [PropName in keyof RequestStructure]: RequestStructure[PropName] extends SimConnectDataType
        ? JavascriptDataType[RequestStructure[PropName]]
        : RequestStructure[PropName][];
};

export class FacilitiesHelper extends BaseHelper {
    /**
     * @param icao the airport ICAO code
     * @param facilityDefinition The property names and corresponding data types used in this object are defined here: https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm
     */
    public async getAirport<T extends FacilityRequest>(icao: string, facilityDefinition: T) {
        return this._requestFacilityByEntryPoint('AIRPORT', icao, facilityDefinition);
    }

    /**
     * @param icao the waypoint ICAO code
     * @param facilityDefinition the property names and corresponding data types used in this object are defined here: https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm
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
     * @param icao the NDB ICAO code
     * @param facilityDefinition the property names and corresponding data types used in this object are defined here: https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm
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
     * @param icao the VOR ICAO code
     * @param facilityDefinition the property names and corresponding data types used in this object are defined here: https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Facilities/SimConnect_AddToFacilityDefinition.htm
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

    /**
     * @param facilityListType
     * @param includeWholeWorld If you need airports outside the aircraft's reality bubble
     */
    public async getAll<T extends FacilityListType>(
        facilityListType: T,
        ...includeWholeWorld: T extends FacilityListType.AIRPORT ? [boolean] : [never?]
    ) {
        return new Promise<FacilityResponseType[T][]>((resolve, reject) => {
            const requestId = this._handle.idFactory.nextDataRequestId;

            this._waitForFacilityList(facilityListType, requestId, true, data => resolve(data));

            const sendId = includeWholeWorld
                ? this._handle.requestFacilitiesList(facilityListType, requestId)
                : this._handle.requestFacilitiesListEx1(facilityListType, requestId);

            this._checkForException(sendId, ex =>
                reject(
                    Error(
                        `Failed to get facilities of type '${FacilityListType[facilityListType]}': ${SimConnectException[ex]}`
                    )
                )
            );
        });
    }

    /**
     * Subscribe for changes in the simulator's facility cache
     * @param facilityListType
     * @param onListUpdated called whenever facilities are added/removed to/from the cache
     * @param onError
     */
    public monitorList<T extends FacilityListType>(
        facilityListType: T,
        onListUpdated: (list: FacilityResponseType[T][]) => void,
        onError: (err: ApiHelperError) => void
    ) {
        const itemAddedRequestId = this._handle.idFactory.nextDataRequestId;
        const itemRemovedRequestId = this._handle.idFactory.nextDataRequestId;

        const sendId = this._handle.subscribeToFacilitiesEx1(
            facilityListType,
            itemAddedRequestId,
            itemRemovedRequestId
        );

        this._checkForException(sendId, ex =>
            onError({
                message: `Failed to subscribe for facility of type '${FacilityListType[facilityListType]}': ${SimConnectException[ex]}`,
                exception: ex,
            })
        );

        this._waitForFacilityList(facilityListType, itemAddedRequestId, false, data =>
            onListUpdated(data)
        );

        this._waitForFacilityList(facilityListType, itemRemovedRequestId, false, data =>
            onListUpdated(data)
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
