import { BaseHelper } from './BaseHelper';
import { SimConnectConnection } from '../SimConnectConnection';
import { SimConnectDataType } from '../enums/SimConnectDataType';
import { JavascriptDataType, readSimConnectValue } from './utils';
import { FacilityDataType } from '../enums/FacilityDataType';
import { RecvFacilityData } from '../recv';

export class FacilitiesHelper extends BaseHelper {
    private _nextFacilityDefinition: number;

    private _nextRequestId: number;

    constructor(handle: SimConnectConnection) {
        super(handle);
        this._nextFacilityDefinition = 0;
        this._nextRequestId = 0;
    }

    async get<T extends FacilityDefinition>(icao: string, facilityDefinition: T) {
        return new Promise<FacilityOutput<T>>(resolve => {
            const defineId = this._nextFacilityDefinition++;
            const requestId = this._nextRequestId++;
            this._registerObject(defineId, facilityDefinition);

            this._handle.requestFacilityData(defineId, requestId, icao);

            let output = {} as FacilityOutput<T>;

            this._handle.on('facilityData', recvFacilityData => {
                output = { ...output, ...readObject(facilityDefinition, recvFacilityData, output) };
            });

            this._handle.on('facilityDataEnd', recvFacilityDataEnd => {
                if (recvFacilityDataEnd.userRequestId === requestId) {
                    resolve(output);
                }
            });
        });
    }

    private _registerObject(defineId: number, definition: FacilityDefinition) {
        const names = Object.keys(definition);
        names.forEach((name, index) => {
            const value = definition[name];
            if (typeof value === 'object') {
                this._handle.addToFacilityDefinition(defineId, `OPEN ${name}`);
                this._registerObject(defineId, value);
            } else if (index === names.length - 1) {
                this._handle.addToFacilityDefinition(defineId, `CLOSE ${name}`);
            } else {
                this._handle.addToFacilityDefinition(defineId, name);
            }
        });
    }
}

/**
 * Reads the facility data recursively based on the user defined structure
 */
function readObject<T extends FacilityDefinition>(
    facilityDefinition: T,
    recvData: RecvFacilityData,
    accumulated: FacilityOutput<T>
): FacilityOutput<T> {
    const output = accumulated;

    Object.keys(facilityDefinition).forEach((propName: keyof T) => {
        const valueToRead: SimConnectDataType | FacilityDefinition = facilityDefinition[propName];
        if (typeof valueToRead === 'object') {
            /**
             * The data type we received should match one of the propnames of facilityDefinition (AIRPORT, RUNWAY, FREQUENCY, etc).
             * Does the current propname match?
             */
            if (propName === FacilityDataType[recvData.type]) {
                // We will be reading a facility data type
                output[propName] = readObject(
                    valueToRead,
                    recvData,
                    output
                ) as FacilityOutput<T>[typeof propName];
            }
            // Nope, check next propName
        } else {
            // The current prop is a value
            output[propName] = readSimConnectValue(
                recvData.data,
                valueToRead
            ) as FacilityOutput<T>[typeof propName];
        }
    });
    return output;
}

type FacilityOutput<T extends FacilityDefinition> = {
    [K in keyof T]: T[K] extends SimConnectDataType ? JavascriptDataType[T[K]] : FacilityOutput<T>;
};

type FacilityDefinition = {
    [dataName: string]: SimConnectDataType | FacilityDefinition;
};
