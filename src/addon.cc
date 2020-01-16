#include "addon.h"

#include <winternl.h>
#include <stack>

uv_loop_t *loop;
uv_async_t async;

std::map<DWORD, DataDefinition> dataDefinitions;
std::map<DWORD, Nan::Callback *> systemEventCallbacks;
std::map<DWORD, Nan::Callback *> systemStateCallbacks;
std::map<DWORD, Nan::Callback *> dataRequestCallbacks;
Nan::Callback *errorCallback;

// Special events to listen for from the beginning
SIMCONNECT_CLIENT_EVENT_ID openEventId;
SIMCONNECT_CLIENT_EVENT_ID quitEventId;
SIMCONNECT_CLIENT_EVENT_ID exceptionEventId;

// Counters for creating unique IDs for SimConnect
SIMCONNECT_DATA_DEFINITION_ID defineIdCounter;
SIMCONNECT_CLIENT_EVENT_ID eventIdCounter;
SIMCONNECT_DATA_REQUEST_ID requestIdCounter;

std::stack<SIMCONNECT_DATA_REQUEST_ID> unusedReqIds;

// Semaphores
uv_sem_t workerSem;
uv_sem_t defineIdSem;
uv_sem_t eventIdSem;
uv_sem_t reqIdSem;

HANDLE ghSimConnect = NULL;

class DispatchWorker : public Nan::AsyncWorker
{
public:
	DispatchWorker(Nan::Callback *callback) : AsyncWorker(callback)
	{
	}
	~DispatchWorker() {}

	void Execute()
	{
		uv_async_init(loop, &async, messageReceiver); // Must be called from worker thread

		while (true)
		{

			if (ghSimConnect)
			{
				uv_sem_wait(&workerSem); // Wait for mainthread to process the previous dispatch

				SIMCONNECT_RECV *pData;
				DWORD cbData;

				HRESULT hr = SimConnect_GetNextDispatch(ghSimConnect, &pData, &cbData);

				if (SUCCEEDED(hr))
				{
					CallbackData data;
					data.pData = pData;
					data.cbData = cbData;
					data.ntstatus = 0;
					async.data = &data;
					uv_async_send(&async);
				}
				else if (NT_ERROR(hr))
				{
					CallbackData data;
					data.ntstatus = (NTSTATUS)hr;
					async.data = &data;
					uv_async_send(&async);
				}
				else
				{
					uv_sem_post(&workerSem); // Continue
					Sleep(1);
				}
			}
			else
			{
				Sleep(10);
			}
		}
	}
};

SIMCONNECT_DATA_DEFINITION_ID getUniqueDefineId()
{
	uv_sem_wait(&defineIdSem);
	SIMCONNECT_DATA_DEFINITION_ID id = defineIdCounter;
	defineIdCounter++;
	uv_sem_post(&defineIdSem);
	return id;
}

SIMCONNECT_CLIENT_EVENT_ID getUniqueEventId()
{
	uv_sem_wait(&eventIdSem);
	SIMCONNECT_CLIENT_EVENT_ID id = eventIdCounter;
	eventIdCounter++;
	uv_sem_post(&eventIdSem);
	return id;
}

SIMCONNECT_DATA_REQUEST_ID getUniqueRequestId()
{
	uv_sem_wait(&reqIdSem);
	SIMCONNECT_DATA_REQUEST_ID id;
	if (!unusedReqIds.empty())
	{
		id = unusedReqIds.top();
		unusedReqIds.pop();
	}
	else
	{
		id = requestIdCounter;
		requestIdCounter++;
	}
	uv_sem_post(&reqIdSem);
	return id;
}

// Runs on main thread after uv_async_send() is called
void messageReceiver(uv_async_t *handle)
{

	Nan::HandleScope scope;
	v8::Isolate *isolate = v8::Isolate::GetCurrent();

	CallbackData *data = (CallbackData *)handle->data;

	if (NT_SUCCESS(data->ntstatus))
	{
		switch (data->pData->dwID)
		{
		case SIMCONNECT_RECV_ID_EVENT:
			handleReceived_Event(isolate, data->pData, data->cbData);
			break;
		case SIMCONNECT_RECV_ID_SIMOBJECT_DATA:
			handleReceived_Data(isolate, data->pData, data->cbData);
			break;
		case SIMCONNECT_RECV_ID_QUIT:
			handleReceived_Quit(isolate);
			break;
		case SIMCONNECT_RECV_ID_EXCEPTION:
			handleReceived_Exception(isolate, data->pData, data->cbData);
			break;
		case SIMCONNECT_RECV_ID_EVENT_FILENAME:
			handleReceived_Filename(isolate, data->pData, data->cbData);
			break;
		case SIMCONNECT_RECV_ID_OPEN:
			handleReceived_Open(isolate, data->pData, data->cbData);
			break;
		case SIMCONNECT_RECV_ID_SYSTEM_STATE:
			handleReceived_SystemState(isolate, data->pData, data->cbData);
			break;
		case SIMCONNECT_RECV_ID_SIMOBJECT_DATA_BYTYPE:
			handleReceived_DataByType(isolate, data->pData, data->cbData);
			break;
		case SIMCONNECT_RECV_ID_EVENT_FRAME:
			handleReceived_Frame(isolate, data->pData, data->cbData);
			break;
		default:
			printf("Unexpected message received (dwId: %i)\n", data->pData->dwID);
			break;
		}
	}
	else
	{
		handle_Error(isolate, data->ntstatus);
	}

	uv_sem_post(&workerSem); // The dispatch-worker can now continue
}

// Handles data requested with requestDataOnSimObject or requestDataOnSimObjectType
void handleReceived_Data(Isolate *isolate, SIMCONNECT_RECV *pData, DWORD cbData)
{

	SIMCONNECT_RECV_SIMOBJECT_DATA *pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA *)pData;
	int numVars = dataDefinitions[pObjData->dwDefineID].num_values;
	std::vector<SIMCONNECT_DATATYPE> valTypes = dataDefinitions[pObjData->dwDefineID].datum_types;
	std::vector<std::string> valIds = dataDefinitions[pObjData->dwDefineID].datum_names;

	Local<Object> result_list = Object::New(isolate);
	int dataValueOffset = 0;

	for (int i = 0; i < numVars; i++)
	{
		int varSize = 0;

		if (valTypes[i] == SIMCONNECT_DATATYPE_STRINGV)
		{
			dataValueOffset += 8; // Not really sure why this is needed, but it fixes problems like this: "F-22 RapF-22 Raptor - 525th Fighter Squadron"
			char *pOutString;
			DWORD cbString;
			char *pStringv = ((char *)(&pObjData->dwData));
			HRESULT hr = SimConnect_RetrieveString(pData, cbData, dataValueOffset + pStringv, &pOutString, &cbString);
			if (NT_ERROR(hr))
			{
				handle_Error(isolate, hr);
				return;
			}

			v8::Local<v8::String> key = String::NewFromUtf8(isolate, valIds.at(i).c_str());
			try
			{
				v8::Local<v8::String> value = String::NewFromOneByte(isolate, (const uint8_t *)pOutString, v8::NewStringType::kNormal).ToLocalChecked();
				result_list->Set(key, value);
			}
			catch (...)
			{
				v8::Local<v8::String> value = String::NewFromUtf8(isolate, "ERROR");
				result_list->Set(key, value);
			}

			varSize = cbString;
		}
		else
		{
			//printf("------ %s -----\n", valIds.at(i).c_str());
			varSize = sizeMap[valTypes[i]];
			char *p = ((char *)(&pObjData->dwData) + dataValueOffset);
			double *var = (double *)p;
			result_list->Set(String::NewFromUtf8(isolate, valIds.at(i).c_str()), Number::New(isolate, *var));
		}
		dataValueOffset += varSize;
	}

	const int argc = 1;
	Local<Value> argv[argc] = {
		result_list};
	dataRequestCallbacks[pObjData->dwRequestID]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_DataByType(Isolate *isolate, SIMCONNECT_RECV *pData, DWORD cbData)
{
	SIMCONNECT_RECV_SIMOBJECT_DATA *pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA *)pData;
	handleReceived_Data(isolate, pData, cbData);
	unusedReqIds.push(pObjData->dwRequestID); // The id can be re-used in next request
}

void handleReceived_Frame(Isolate *isolate, SIMCONNECT_RECV *pData, DWORD cbData)
{
	SIMCONNECT_RECV_EVENT_FRAME *pFrame = (SIMCONNECT_RECV_EVENT_FRAME *)pData;
	// printf("frame data recived: %f FPS\n",pFrame->fFrameRate);

	const int argc = 2;

	Local<Value> argv[argc] = {
		Number::New(isolate, pFrame->fFrameRate),
		Number::New(isolate, pFrame->fSimSpeed)};

	systemEventCallbacks[pFrame->uEventID]->Call(isolate->GetCurrentContext()->Global(), argc, argv);

	// Local<Object> obj = Object::New(isolate);

	// float   fFrameRate;
	// float   fSimSpeed;
	// DWORD   dwFlags;

	// obj->Set(String::NewFromUtf8(isolate, "float"), Number::New(isolate, pFrame->fFrameRate));
	// obj->Set(String::NewFromUtf8(isolate, "float"), Number::New(isolate, pFrame->fSimSpeed));

	// Local<Value> argv[1] = { obj };
	// unusedReqIds.push(pFrame->dwRequestID);	// The id can be re-used in next request
}

void handle_Error(Isolate *isolate, NTSTATUS code)
{
	// Codes found so far: 0xC000014B, 0xC000020D, 0xC000013C
	ghSimConnect = NULL;
	char errorCode[32];
	sprintf(errorCode, "0x%08X", code);

	const int argc = 1;
	Local<Value> argv[argc] = {
		String::NewFromUtf8(isolate, errorCode)};

	errorCallback->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_Event(Isolate *isolate, SIMCONNECT_RECV *pData, DWORD cbData)
{
	SIMCONNECT_RECV_EVENT *myEvent = (SIMCONNECT_RECV_EVENT *)pData;

	const int argc = 1;
	Local<Value> argv[argc] = {
		Number::New(isolate, myEvent->dwData)};

	systemEventCallbacks[myEvent->uEventID]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_Exception(Isolate *isolate, SIMCONNECT_RECV *pData, DWORD cbData)
{
	SIMCONNECT_RECV_EXCEPTION *except = (SIMCONNECT_RECV_EXCEPTION *)pData;

	Local<Object> obj = Object::New(isolate);
	obj->Set(String::NewFromUtf8(isolate, "dwException"), Number::New(isolate, except->dwException));
	obj->Set(String::NewFromUtf8(isolate, "dwSendID"), Number::New(isolate, except->dwSendID));
	obj->Set(String::NewFromUtf8(isolate, "dwIndex"), Number::New(isolate, except->dwIndex));
	obj->Set(String::NewFromUtf8(isolate, "cbData"), Number::New(isolate, cbData));
	obj->Set(String::NewFromUtf8(isolate, "cbVersion"), Number::New(isolate, except->dwException));
	obj->Set(String::NewFromUtf8(isolate, "name"), String::NewFromUtf8(isolate, exceptionNames[SIMCONNECT_EXCEPTION(except->dwException)]));

	Local<Value> argv[1] = {obj};

	systemEventCallbacks[exceptionEventId]->Call(isolate->GetCurrentContext()->Global(), 1, argv);
}

void handleReceived_Filename(Isolate *isolate, SIMCONNECT_RECV *pData, DWORD cbData)
{
	SIMCONNECT_RECV_EVENT_FILENAME *fileName = (SIMCONNECT_RECV_EVENT_FILENAME *)pData;
	const int argc = 1;
	Local<Value> argv[argc] = {
		String::NewFromUtf8(isolate, (const char *)fileName->szFileName)};

	systemEventCallbacks[fileName->uEventID]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_Open(Isolate *isolate, SIMCONNECT_RECV *pData, DWORD cbData)
{
	SIMCONNECT_RECV_OPEN *pOpen = (SIMCONNECT_RECV_OPEN *)pData;

	char simconnVersion[32];
	sprintf(simconnVersion, "%d.%d.%d.%d", pOpen->dwSimConnectVersionMajor, pOpen->dwSimConnectVersionMinor, pOpen->dwSimConnectBuildMajor, pOpen->dwSimConnectBuildMinor);

	const int argc = 2;

	Local<Value> argv[argc] = {
		String::NewFromOneByte(isolate, (const uint8_t *)pOpen->szApplicationName, v8::NewStringType::kNormal).ToLocalChecked(),
		String::NewFromUtf8(isolate, simconnVersion)};

	systemEventCallbacks[openEventId]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_SystemState(Isolate *isolate, SIMCONNECT_RECV *pData, DWORD cbData)
{
	SIMCONNECT_RECV_SYSTEM_STATE *pState = (SIMCONNECT_RECV_SYSTEM_STATE *)pData;

	Local<Object> obj = Object::New(isolate);
	obj->Set(String::NewFromUtf8(isolate, "integer"), Number::New(isolate, pState->dwInteger));
	obj->Set(String::NewFromUtf8(isolate, "float"), Number::New(isolate, pState->fFloat));
	obj->Set(String::NewFromUtf8(isolate, "string"), String::NewFromUtf8(isolate, "string"));

	Local<Value> argv[1] = {obj};
	systemStateCallbacks[openEventId]->Call(isolate->GetCurrentContext()->Global(), 1, argv);
}

void handleReceived_Quit(Isolate *isolate)
{
	ghSimConnect = NULL;
	systemEventCallbacks[quitEventId]->Call(isolate->GetCurrentContext()->Global(), 0, NULL);
}

void handleSimDisconnect(Isolate *isolate)
{
}

// Wrapped SimConnect-functions //////////////////////////////////////////////////////
void Open(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	uv_sem_init(&workerSem, 1);
	uv_sem_init(&defineIdSem, 1);
	uv_sem_init(&eventIdSem, 1);
	uv_sem_init(&reqIdSem, 1);

	defineIdCounter = 0;
	eventIdCounter = 0;
	requestIdCounter = 0;

	Isolate *isolate = args.GetIsolate();
	v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

	// Get arguments
	v8::String::Utf8Value appName(isolate, args[0]->ToString(ctx).ToLocalChecked());

	openEventId = getUniqueEventId();
	systemEventCallbacks[openEventId] = {new Nan::Callback(args[1].As<Function>())};
	quitEventId = getUniqueEventId();
	systemEventCallbacks[quitEventId] = {new Nan::Callback(args[2].As<Function>())};
	exceptionEventId = getUniqueEventId();
	systemEventCallbacks[exceptionEventId] = {new Nan::Callback(args[3].As<Function>())};
	errorCallback = {new Nan::Callback(args[4].As<Function>())};

	// Create dispatch looper thread
	loop = uv_default_loop();

	Nan::AsyncQueueWorker(new DispatchWorker(NULL));

	// Open connection
	HRESULT hr = SimConnect_Open(&ghSimConnect, *appName, NULL, 0, 0, 0);

	// Return true if success
	Local<Boolean> retval = v8::Boolean::New(isolate, SUCCEEDED(hr));

	args.GetReturnValue().Set(retval);
}

void Close(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		Isolate *isolate = args.GetIsolate();
		printf("Trying to close..\n");
		HRESULT hr = SimConnect_Close(&ghSimConnect);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		printf("Closed: %i\n", hr);
		ghSimConnect = NULL;
		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	}
}

void isConnected(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	Isolate *isolate = args.GetIsolate();
	args.GetReturnValue().Set(v8::Boolean::New(isolate, ghSimConnect));
}

void RequestSystemState(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		Isolate *isolate = args.GetIsolate();
		v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

		v8::String::Utf8Value stateName(isolate, args[0]->ToString(ctx).ToLocalChecked());

		SIMCONNECT_DATA_REQUEST_ID reqId = getUniqueRequestId();
		systemStateCallbacks[reqId] = new Nan::Callback(args[1].As<Function>());
		HRESULT hr = SimConnect_RequestSystemState(ghSimConnect, reqId, *stateName);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}
		args.GetReturnValue().Set(v8::Number::New(isolate, reqId));
	}
}

void FlightLoad(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		Isolate *isolate = args.GetIsolate();
		v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

		v8::String::Utf8Value szFileName(isolate, args[0]->ToString(ctx).ToLocalChecked());
		HRESULT hr = SimConnect_FlightLoad(ghSimConnect, *szFileName);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}
		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	}
}

void TransmitClientEvent(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		Isolate *isolate = args.GetIsolate();
		v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

		v8::String::Utf8Value eventName(isolate, args[0]->ToString(ctx).ToLocalChecked());
		DWORD data = args.Length() > 1 ? args[1]->Int32Value(ctx).ToChecked() : 0;

		SIMCONNECT_CLIENT_EVENT_ID id = getUniqueEventId();
		HRESULT hr = SimConnect_MapClientEventToSimEvent(ghSimConnect, id, *eventName);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		hr = SimConnect_TransmitClientEvent(ghSimConnect, SIMCONNECT_OBJECT_ID_USER, id, data, SIMCONNECT_GROUP_PRIORITY_HIGHEST, SIMCONNECT_EVENT_FLAG_GROUPID_IS_PRIORITY);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	}
}

void SubscribeToSystemEvent(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		v8::Isolate *isolate = args.GetIsolate();
		v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

		SIMCONNECT_CLIENT_EVENT_ID eventId = getUniqueEventId();

		v8::String::Utf8Value systemEventName(isolate, args[0]->ToString(ctx).ToLocalChecked());
		systemEventCallbacks[eventId] = {new Nan::Callback(args[1].As<Function>())};

		HANDLE hSimConnect = ghSimConnect;
		HRESULT hr = SimConnect_SubscribeToSystemEvent(hSimConnect, eventId, *systemEventName);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		args.GetReturnValue().Set(v8::Integer::New(isolate, eventId));
	}
}

void RequestDataOnSimObject(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		v8::Isolate *isolate = args.GetIsolate();
		v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

		Local<Array> reqValues = v8::Local<v8::Array>::Cast(args[0]);
		auto callback = new Nan::Callback(args[1].As<Function>());

		int objectId = args.Length() > 2 ? args[2]->Int32Value(ctx).ToChecked() : SIMCONNECT_OBJECT_ID_USER;
		int periodId = args.Length() > 3 ? args[3]->Int32Value(ctx).ToChecked() : SIMCONNECT_PERIOD_SIM_FRAME;
		int flags = args.Length() > 4 ? args[4]->Int32Value(ctx).ToChecked() : 0;
		int origin = args.Length() > 5 ? args[5]->Int32Value(ctx).ToChecked() : 0;
		int interval = args.Length() > 6 ? args[6]->Int32Value(ctx).ToChecked() : 0;
		DWORD limit = args.Length() > 7 ? args[7]->NumberValue(ctx).ToChecked() : 0;

		SIMCONNECT_DATA_REQUEST_ID reqId = getUniqueRequestId();

		DataDefinition definition = generateDataDefinition(isolate, ghSimConnect, reqValues);

		HRESULT hr = SimConnect_RequestDataOnSimObject(ghSimConnect, reqId, definition.id, objectId, SIMCONNECT_PERIOD(periodId), flags, origin, interval, limit);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));

		dataDefinitions[definition.id] = definition;
		dataRequestCallbacks[reqId] = callback;
	}
}

void RequestDataOnSimObjectType(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		v8::Isolate *isolate = args.GetIsolate();
		v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

		DataDefinition definition;

		if (args[0]->IsArray())
		{
			Local<Array> reqValues = v8::Local<v8::Array>::Cast(args[0]);
			definition = generateDataDefinition(isolate, ghSimConnect, reqValues);
		}
		else if (args[0]->IsNumber())
		{
			definition = dataDefinitions[args[0]->NumberValue(ctx).ToChecked()];
		}

		auto callback = new Nan::Callback(args[1].As<Function>());

		DWORD radius = args.Length() > 2 ? args[2]->Int32Value(ctx).ToChecked() : 0;
		int typeId = args.Length() > 3 ? args[3]->Int32Value(ctx).ToChecked() : SIMCONNECT_SIMOBJECT_TYPE_USER;

		SIMCONNECT_DATA_REQUEST_ID reqId = getUniqueRequestId();
		HRESULT hr = SimConnect_RequestDataOnSimObjectType(ghSimConnect, reqId, definition.id, radius, SIMCONNECT_SIMOBJECT_TYPE(typeId));
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));

		dataDefinitions[definition.id] = definition;
		dataRequestCallbacks[reqId] = callback;
	}
}

void CreateDataDefinition(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		v8::Isolate *isolate = args.GetIsolate();
		Local<Array> reqValues = v8::Local<v8::Array>::Cast(args[0]);
		DataDefinition definition = generateDataDefinition(isolate, ghSimConnect, reqValues);
		args.GetReturnValue().Set(v8::Number::New(isolate, definition.id));
		dataDefinitions[definition.id] = definition;
	}
}

void SetDataOnSimObject(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		v8::Isolate *isolate = args.GetIsolate();
		v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

		v8::String::Utf8Value name(isolate, args[0]->ToString(ctx).ToLocalChecked());
		v8::String::Utf8Value unit(isolate, args[1]->ToString(ctx).ToLocalChecked());

		double value = args[2]->NumberValue(ctx).ToChecked();

		int objectId = args.Length() > 3 ? args[3]->Int32Value(ctx).FromMaybe(SIMCONNECT_OBJECT_ID_USER) : SIMCONNECT_OBJECT_ID_USER;
		int flags = args.Length() > 4 ? args[4]->Int32Value(ctx).ToChecked() : 0;

		SIMCONNECT_DATA_DEFINITION_ID defId = getUniqueDefineId();

		HRESULT hr = SimConnect_AddToDataDefinition(ghSimConnect, defId, *name, *unit);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		hr = SimConnect_SetDataOnSimObject(ghSimConnect, defId, SIMCONNECT_OBJECT_ID_USER, 0, 0, sizeof(value), &value);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	}
}

// Generates a SimConnect data definition for the collection of requests.
DataDefinition generateDataDefinition(Isolate *isolate, HANDLE hSimConnect, Local<Array> requestedValues)
{

	SIMCONNECT_DATA_DEFINITION_ID definitionId = getUniqueDefineId();
	v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

	HRESULT hr = -1;
	bool success = true;
	unsigned int numValues = requestedValues->Length();

	std::vector<std::string> datumNames;
	std::vector<SIMCONNECT_DATATYPE> datumTypes;

	for (unsigned int i = 0; i < requestedValues->Length(); i++)
	{
		Local<Array> value = v8::Local<v8::Array>::Cast(requestedValues->Get(i));

		if (value->IsArray())
		{
			int len = value->Length();

			if (len > 1)
			{
				v8::String::Utf8Value datumName(isolate, value->Get(0)->ToString(ctx).ToLocalChecked());
				const char *sDatumName = *datumName;
				const char *sUnitsName = NULL;

				if (!value->Get(1)->IsNull())
				{ // Should be NULL for string
					v8::String::Utf8Value unitsName(isolate, value->Get(1)->ToString(ctx).ToLocalChecked());
					sUnitsName = *unitsName;
				}

				SIMCONNECT_DATATYPE datumType = SIMCONNECT_DATATYPE_FLOAT64; // Default type (double)
				double epsilon;
				float datumId;

				if (len > 1)
				{
					hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, sDatumName, sUnitsName);
					if (NT_ERROR(hr))
					{
						handle_Error(isolate, hr);
						break;
					}
				}
				if (len > 2)
				{
					int t = value->Get(2)->Int32Value(ctx).ToChecked();
					datumType = SIMCONNECT_DATATYPE(t);
					hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, sDatumName, sUnitsName, datumType);
					if (NT_ERROR(hr))
					{
						handle_Error(isolate, hr);
						break;
					}
				}
				if (len > 3)
				{
					epsilon = value->Get(3)->Int32Value(ctx).ToChecked();
					hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, sDatumName, sUnitsName, datumType, epsilon);
					if (NT_ERROR(hr))
					{
						handle_Error(isolate, hr);
						break;
					}
				}
				if (len > 4)
				{
					datumId = value->Get(4)->Int32Value(ctx).ToChecked();
					hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, sDatumName, sUnitsName, datumType, epsilon, datumId);
					if (NT_ERROR(hr))
					{
						handle_Error(isolate, hr);
						break;
					}
				}

				std::string datumNameStr(sDatumName);
				datumNames.push_back(datumNameStr);
				datumTypes.push_back(datumType);
			}
		}
	}

	return {definitionId, numValues, datumNames, datumTypes};
}

// Custom useful functions ////////////////////////////////////////////////////////////////////
void SetAircraftInitialPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
{
	if (ghSimConnect)
	{
		Isolate *isolate = args.GetIsolate();
		v8::Local<v8::Context> ctx = Nan::GetCurrentContext();

		SIMCONNECT_DATA_INITPOSITION init;
		Local<Object> json = args[0]->ToObject(ctx).ToLocalChecked();

		v8::Local<v8::String> altProp = Nan::New("altitude").ToLocalChecked();
		v8::Local<v8::String> latProp = Nan::New("latitude").ToLocalChecked();
		v8::Local<v8::String> lngProp = Nan::New("longitude").ToLocalChecked();
		v8::Local<v8::String> pitchProp = Nan::New("pitch").ToLocalChecked();
		v8::Local<v8::String> bankProp = Nan::New("bank").ToLocalChecked();
		v8::Local<v8::String> hdgProp = Nan::New("heading").ToLocalChecked();
		v8::Local<v8::String> gndProp = Nan::New("onGround").ToLocalChecked();
		v8::Local<v8::String> iasProp = Nan::New("airspeed").ToLocalChecked();

		init.Altitude = json->HasRealNamedProperty(ctx, altProp).ToChecked() ? json->Get(altProp)->NumberValue(ctx).ToChecked() : 0;
		init.Latitude = json->HasRealNamedProperty(ctx, latProp).ToChecked() ? json->Get(latProp)->NumberValue(ctx).ToChecked() : 0;
		init.Longitude = json->HasRealNamedProperty(ctx, lngProp).ToChecked() ? json->Get(lngProp)->NumberValue(ctx).ToChecked() : 0;
		init.Pitch = json->HasRealNamedProperty(ctx, pitchProp).ToChecked() ? json->Get(pitchProp)->NumberValue(ctx).ToChecked() : 0;
		init.Bank = json->HasRealNamedProperty(ctx, bankProp).ToChecked() ? json->Get(bankProp)->NumberValue(ctx).ToChecked() : 0;
		init.Heading = json->HasRealNamedProperty(ctx, hdgProp).ToChecked() ? json->Get(hdgProp)->NumberValue(ctx).ToChecked() : 0;
		init.OnGround = json->HasRealNamedProperty(ctx, gndProp).ToChecked() ? json->Get(gndProp)->IntegerValue(ctx).ToChecked() : 0;
		init.Airspeed = json->HasRealNamedProperty(ctx, iasProp).ToChecked() ? json->Get(iasProp)->IntegerValue(ctx).ToChecked() : 0;

		SIMCONNECT_DATA_DEFINITION_ID id = getUniqueDefineId();
		HRESULT hr = SimConnect_AddToDataDefinition(ghSimConnect, id, "Initial Position", NULL, SIMCONNECT_DATATYPE_INITPOSITION);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		hr = SimConnect_SetDataOnSimObject(ghSimConnect, id, SIMCONNECT_OBJECT_ID_USER, 0, 0, sizeof(init), &init);
		if (NT_ERROR(hr))
		{
			handle_Error(isolate, hr);
			return;
		}

		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	}
}

void Initialize(v8::Local<v8::Object> exports)
{
	NODE_SET_METHOD(exports, "open", Open);
	NODE_SET_METHOD(exports, "close", Close);
	NODE_SET_METHOD(exports, "subscribeToSystemEvent", SubscribeToSystemEvent);
	NODE_SET_METHOD(exports, "requestDataOnSimObject", RequestDataOnSimObject);
	NODE_SET_METHOD(exports, "setDataOnSimObject", SetDataOnSimObject);
	NODE_SET_METHOD(exports, "requestDataOnSimObjectType", RequestDataOnSimObjectType);
	NODE_SET_METHOD(exports, "setAircraftInitialPosition", SetAircraftInitialPosition);
	NODE_SET_METHOD(exports, "transmitClientEvent", TransmitClientEvent);
	NODE_SET_METHOD(exports, "requestSystemState", RequestSystemState);
	NODE_SET_METHOD(exports, "createDataDefinition", CreateDataDefinition);
	NODE_SET_METHOD(exports, "flightLoad", FlightLoad);
	NODE_SET_METHOD(exports, "isConnected", isConnected);
}

NODE_MODULE(addon, Initialize);
