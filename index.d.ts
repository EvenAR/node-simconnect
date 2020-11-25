export class SimConnect {
    open(
        appName: string, 
        onOpen: (client: Client) => void,
        onQuit: () => void, 
        onException: (details: Exception) => void,
        onError: (details: Error) => void
    ): boolean;
}

export class Client {
    name: string;
    version: string;

    requestDataOnSimObject(
        reqData: RequestDataObject[] | number,
        options: RequestDataOnSimObjectOptions,
        callback: (data: ResponseData) => void
    ): void;

    requestDataOnSimObjectType(
        reqData: RequestDataObject[] | number,
        options: RequestDataOnSimObjectTypeOptions,
        callback: (data: ResponseData) => void
    ): void;

    setDataOnSimObject(
        variableName: string, 
        unit: string, 
        value: number
    ): void;

    subscribeToSystemEvent(
        eventName: string, 
        callback: (value: number) => void
    ): void;

    createDataDefinition(
        reqData: RequestDataObject[]
    ): void;

    close(): boolean;
}

interface RequestDataOnSimObjectOptions {
    period: number,
    objectId: number,
    flags: number,
}

interface RequestDataOnSimObjectTypeOptions {
    radius: number,
    type: number,
}

type RequestDataObject = [
    variableName: string,
    units: string | null,
    dataType?: number
]

interface ResponseData { [key:string]: number | string | undefined }

interface Exception {
    readonly name: string;
    readonly dwException: number;
    readonly dwSendID: number;
    readonly dwIndex: number;
}

interface Error {
    readonly message: string;
    readonly NTSTATUS: number;
}