interface ConnectedCallback {
  (name: string, version: string): void;
}
interface Exception {
  readonly name: string;
  readonly dwException: string;
  readonly dwSendID: number;
  readonly dwIndex: number;
  readonly cbData: string;
}
type RequestDataObject = [variableName: string, units: string | null, dataType?: number];
interface Data { [key:string]: number | undefined }


export function open(
  appname: string,
  connectedCallback: ConnectedCallback,
  simExitedCallback: () => void,
  exceptionCallback: (exception: Exception) => void,
  errorCallback: (error: unknown) => void
): boolean;

export function requestDataOnSimObject(
  reqData: RequestDataObject[] | number,
  callback: (data: Data) => void,
  objectId: number,
  period: number,
  dataRequestFlag: number
): void

export function requestDataOnSimObjectType(
  reqData: RequestDataObject[] | number,
  callback: (data: Data) => void,
  radius: number,
  simobjectType: number
): void

export function createDataDefinition(
  reqData: RequestDataObject[],
): number;

export function setDataOnSimObject(
  variableName: string,
  unit: string | null,
  value: unknown
): void;

export function subscribeToSystemEvent(eventName: string, callback: (data: unknown) => void): void;

export function close(): boolean;
