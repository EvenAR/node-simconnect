#include "addon.h"

//HANDLE ghMutex;
uv_loop_t *loop;
uv_async_t async;

//std::vector<HANDLE> simConnections;
std::map<int, DataRequest> dataRequests;
std::map<int, Nan::Callback*> systemEventCallbacks;
std::map<int, Nan::Callback*> systemStateCallbacks;

// Special events to listen for from the beginning
int openEventId;
int quitEventId;
int exceptionEventId;

// Counters for creating unique IDs for SimConnect
int defineIdCounter;
int eventIdCounter;
int requestIdCounter;

uv_cond_t cv;
uv_mutex_t mutex;

HANDLE ghSimConnect = NULL;

class DispatchWorker : public Nan::AsyncWorker {
public:
	DispatchWorker(Nan::Callback *callback) : AsyncWorker(callback) {

	}
	~DispatchWorker() {}

	void Execute() {

		uv_async_init(loop, &async, messageReceiver); // Must be called from worker thread

		while (true) {

			if (ghSimConnect) {
				SIMCONNECT_RECV* pData;
				DWORD cbData;

				HRESULT hr = SimConnect_GetNextDispatch(ghSimConnect, &pData, &cbData);

				if (SUCCEEDED(hr))
				{
					CallbackData data;
					data.pData = pData;
					data.cbData = cbData;
					async.data = &data;
					uv_mutex_lock(&mutex);
					uv_async_send(&async);

					// Wait for mainthread to process the dispatch
					uv_cond_wait(&cv, &mutex);
				}
				else {
					Sleep(1);
				}
			}
			else {
				Sleep(10);
			}
		}
	}
};


int getUniqueDefineId() {
	int id = defineIdCounter;
	defineIdCounter++;
	return id;
}

int getUniqueEventId() {
	int id = eventIdCounter;
	eventIdCounter++;
	return id;
}

int getUniqueRequestId() {
	int id = requestIdCounter;
	requestIdCounter++;
	return id;
}

// Runs on main thread after uv_async_send() is called
void messageReceiver(uv_async_t* handle) {

	Nan::HandleScope scope;
	v8::Isolate* isolate = v8::Isolate::GetCurrent();

	CallbackData* data = (CallbackData*)handle->data; //receivedDataQueue.front();

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

	default:
		printf("Unexpected message received!!!!!!!!!!!!!!!!!-> %i\n", data->pData->dwID);
		break;
	}

	// The dispatch-worker can now continue
	uv_mutex_unlock(&mutex);
	uv_cond_signal(&cv);
}

void handleReceived_Data(Isolate* isolate, SIMCONNECT_RECV* pData, DWORD cbData) {
	SIMCONNECT_RECV_SIMOBJECT_DATA *pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA*)pData;
	int numVars = dataRequests[pObjData->dwRequestID].num_values;
	std::vector<SIMCONNECT_DATATYPE> valTypes = dataRequests[pObjData->dwRequestID].value_types;

	Local<Array> result_list = Array::New(isolate);
	int offset = 0;

	for (int i = 0; i < numVars; i++) {
		int varSize = 0;

		if (valTypes[i] == SIMCONNECT_DATATYPE_STRINGV) {
			offset += 8;		// just a quick and ugly fix to this problem: "F-22 RapF-22 Raptor - 525th Fighter Squadron" (for example)
			char *pOutString;
			DWORD cbString;
			char * pStringv = ((char*)(&pObjData->dwData) + offset);
			SimConnect_RetrieveString(pData, cbData, pStringv, &pOutString, &cbString);

			result_list->Set(i, String::NewFromOneByte(isolate, (const uint8_t*)pOutString));
			varSize = cbString;
		}
		else {
			varSize = sizeMap[valTypes[i]];
			char* p = ((char*)(&pObjData->dwData) + offset);
			double *var = (double*)p;
			result_list->Set(i, Number::New(isolate, *var));
		}
		offset += varSize;
	}

	const int argc = 1;
	Local<Value> argv[argc] = {
		result_list
	};

	dataRequests[pObjData->dwRequestID].jsCallback->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_Event(Isolate* isolate, SIMCONNECT_RECV* pData, DWORD cbData) {
	SIMCONNECT_RECV_EVENT* myEvent = (SIMCONNECT_RECV_EVENT*)pData;

	const int argc = 1;
	Local<Value> argv[argc] = {
		Number::New(isolate, myEvent->dwData)
	};

	systemEventCallbacks[myEvent->uEventID]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_Exception(Isolate* isolate, SIMCONNECT_RECV* pData, DWORD cbData) {
	SIMCONNECT_RECV_EXCEPTION *except = (SIMCONNECT_RECV_EXCEPTION*)pData;
	// printf("\n\n***** EXCEPTION=%d  SendID=%d  uOffset=%d  cbData=%d\n", except->dwException, except->dwSendID, except->dwIndex, cbData);

	Local<Object> obj = Object::New(isolate);
	obj->Set(String::NewFromUtf8(isolate, "dwException"), Number::New(isolate, except->dwException));
	obj->Set(String::NewFromUtf8(isolate, "dwSendID"), Number::New(isolate, except->dwSendID));
	obj->Set(String::NewFromUtf8(isolate, "dwIndex"), Number::New(isolate, except->dwIndex));
	obj->Set(String::NewFromUtf8(isolate, "cbData"), Number::New(isolate, cbData));
	obj->Set(String::NewFromUtf8(isolate, "cbVersion"), Number::New(isolate, except->dwException));
	obj->Set(String::NewFromUtf8(isolate, "name"), String::NewFromUtf8(isolate, exceptionNames[SIMCONNECT_EXCEPTION(except->dwException)]));

	Local<Value> argv[1] = { obj };

	systemEventCallbacks[exceptionEventId]->Call(isolate->GetCurrentContext()->Global(), 1, argv);

}

void handleReceived_Filename(Isolate* isolate, SIMCONNECT_RECV* pData, DWORD cbData) {
	SIMCONNECT_RECV_EVENT_FILENAME* fileName = (SIMCONNECT_RECV_EVENT_FILENAME*)pData;
	const int argc = 1;
	Local<Value> argv[argc] = {
		String::NewFromUtf8(isolate, (const char*)fileName->szFileName)
	};

	systemEventCallbacks[fileName->uEventID]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_Open(Isolate* isolate, SIMCONNECT_RECV* pData, DWORD cbData) {
	SIMCONNECT_RECV_OPEN *pOpen = (SIMCONNECT_RECV_OPEN*)pData;

	char simconnVersion[32];
	sprintf(simconnVersion, "%d.%d.%d.%d", pOpen->dwSimConnectVersionMajor, pOpen->dwSimConnectVersionMinor, pOpen->dwSimConnectBuildMajor, pOpen->dwSimConnectBuildMinor);

	const int argc = 2;

	Local<Value> argv[argc] = {
		String::NewFromOneByte(isolate, (const uint8_t*)pOpen->szApplicationName),
		String::NewFromUtf8(isolate, simconnVersion)
	};

	systemEventCallbacks[openEventId]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_SystemState(Isolate* isolate, SIMCONNECT_RECV* pData, DWORD cbData) {
	SIMCONNECT_RECV_SYSTEM_STATE *pState = (SIMCONNECT_RECV_SYSTEM_STATE*)pData;

	Local<Object> obj = Object::New(isolate);
	obj->Set(String::NewFromUtf8(isolate, "integer"), Number::New(isolate, pState->dwInteger));
	obj->Set(String::NewFromUtf8(isolate, "float"), Number::New(isolate, pState->fFloat));
	obj->Set(String::NewFromUtf8(isolate, "string"), String::NewFromOneByte(isolate, (const uint8_t*)pState->szString));

	Local<Value> argv[1] = { obj };
	systemStateCallbacks[pState->dwRequestID]->Call(isolate->GetCurrentContext()->Global(), 1, argv);
}

void handleReceived_Quit(Isolate* isolate) {
	systemEventCallbacks[quitEventId]->Call(isolate->GetCurrentContext()->Global(), 0, NULL);
}



// Wrapped SimConnect-functions //////////////////////////////////////////////////////

void Open(const v8::FunctionCallbackInfo<v8::Value>& args) {
	uv_mutex_init(&mutex);
	uv_cond_init(&cv);


	defineIdCounter = 0;
	eventIdCounter = 0;
	requestIdCounter = 0;

	Isolate* isolate = args.GetIsolate();

	// Get arguments
	v8::String::Utf8Value appName(args[0]->ToString());

	openEventId = getUniqueEventId();
	systemEventCallbacks[openEventId] = { new Nan::Callback(args[1].As<Function>()) };
	quitEventId = getUniqueEventId();
	systemEventCallbacks[quitEventId] = { new Nan::Callback(args[2].As<Function>()) };
	exceptionEventId = getUniqueEventId();
	systemEventCallbacks[exceptionEventId] = { new Nan::Callback(args[3].As<Function>()) };

	// Create dispatch looper thread
	loop = uv_default_loop();
	Nan::AsyncQueueWorker(new DispatchWorker(NULL));

	// Open connection
	HRESULT hr = SimConnect_Open(&ghSimConnect, *appName, NULL, 0, 0, 0);

	// Return true if success
	Local<Boolean> retval = v8::Boolean::New(isolate, SUCCEEDED(hr));

	args.GetReturnValue().Set(retval);
}

void Close(const v8::FunctionCallbackInfo<v8::Value>& args) {
	if (ghSimConnect) {
		Isolate* isolate = args.GetIsolate();

		HRESULT hr = SimConnect_Close(&ghSimConnect);
		ghSimConnect = NULL;
		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	}
}

void RequestSystemState(const v8::FunctionCallbackInfo<v8::Value>& args) {
	if (ghSimConnect) {
		Isolate* isolate = args.GetIsolate();

		v8::String::Utf8Value stateName(args[0]->ToString());

		int id = getUniqueRequestId();
		systemStateCallbacks[id] = new Nan::Callback(args[1].As<Function>());
		HRESULT hr = SimConnect_RequestSystemState(ghSimConnect, id, *stateName);

		args.GetReturnValue().Set(v8::Number::New(isolate, id));
	}
}

void TransmitClientEvent(const v8::FunctionCallbackInfo<v8::Value>& args) {
	if (ghSimConnect) {
		Isolate* isolate = args.GetIsolate();

		v8::String::Utf8Value eventName(args[0]->ToString());
		DWORD data = args.Length() > 1 ? args[1]->Int32Value() : 0;

		int id = getUniqueEventId();
		SimConnect_MapClientEventToSimEvent(ghSimConnect, id, *eventName);
		HRESULT hr = SimConnect_TransmitClientEvent(ghSimConnect, SIMCONNECT_OBJECT_ID_USER, id, data, SIMCONNECT_GROUP_PRIORITY_HIGHEST, SIMCONNECT_EVENT_FLAG_GROUPID_IS_PRIORITY);

		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	}
}

void SubscribeToSystemEvent(const v8::FunctionCallbackInfo<v8::Value>& args) {
	if (ghSimConnect) {
		v8::Isolate* isolate = args.GetIsolate();

		int eventId = getUniqueEventId();

		v8::String::Utf8Value systemEventName(args[0]->ToString());
		systemEventCallbacks[eventId] = { new Nan::Callback(args[1].As<Function>()) };

		HANDLE hSimConnect = ghSimConnect;
		HRESULT hr = SimConnect_SubscribeToSystemEvent(hSimConnect, eventId, *systemEventName);
		args.GetReturnValue().Set(v8::Integer::New(isolate, eventId));
	}
}

void RequestDataOnSimObject(const v8::FunctionCallbackInfo<v8::Value>& args) {
	if (ghSimConnect) {
		v8::Isolate* isolate = args.GetIsolate();

		Local<Array> reqValues = v8::Local<v8::Array>::Cast(args[0]);
		auto callback = new Nan::Callback(args[1].As<Function>());

		int	objectId = args.Length() > 2 ? args[2]->Int32Value() : SIMCONNECT_OBJECT_ID_USER;
		int	periodId = args.Length() > 3 ? args[3]->Int32Value() : SIMCONNECT_PERIOD_SIM_FRAME;
		int	flags = args.Length() > 4 ? args[4]->Int32Value() : 0;
		int	origin = args.Length() > 5 ? args[5]->Int32Value() : 0;
		int	interval = args.Length() > 6 ? args[6]->Int32Value() : 0;
		DWORD limit = args.Length() > 7 ? args[7]->NumberValue() : 0;

		int reqId = getUniqueRequestId();

		DataRequest request = generateDataRequest(ghSimConnect, reqValues, callback);

		HRESULT hr = SimConnect_RequestDataOnSimObject(ghSimConnect, reqId, request.definition_id, objectId, SIMCONNECT_PERIOD(periodId), flags, origin, interval, limit);

		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));

		dataRequests[reqId] = request;
	}
}


void SetDataOnSimObject(const v8::FunctionCallbackInfo<v8::Value>& args) {
	if (ghSimConnect) {
		v8::Isolate* isolate = args.GetIsolate();

		v8::String::Utf8Value name(args[0]->ToString());
		v8::String::Utf8Value unit(args[1]->ToString());
		double value = args[2]->NumberValue();

		int	objectId = args.Length() > 3 ? args[3]->Int32Value() : SIMCONNECT_OBJECT_ID_USER;
		int	flags = args.Length() > 4 ? args[4]->Int32Value() : 0;

		int defId = getUniqueDefineId();

		SimConnect_AddToDataDefinition(ghSimConnect, defId, *name, *unit);
		HRESULT hr = SimConnect_SetDataOnSimObject(ghSimConnect, defId, SIMCONNECT_OBJECT_ID_USER, NULL, 0, sizeof(value), &value);

		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	}
}

// Generates a SimConnect data definition for the collection of requests.
DataRequest generateDataRequest(HANDLE hSimConnect, Local<Array> requestedValues, Nan::Callback* callback) {

	int definitionId = getUniqueDefineId();

	HRESULT hr = -1;
	bool success = true;
	int numValues = requestedValues->Length();

	std::vector<SIMCONNECT_DATATYPE> dataTypes;

	for (int i = 0; i < requestedValues->Length(); i++) {
		Local<Array> value = v8::Local<v8::Array>::Cast(requestedValues->Get(i));

		if (value->IsArray()) {
			int len = value->Length();

			if (len > 1) {
				v8::String::Utf8Value datumName(value->Get(0)->ToString());
				v8::String::Utf8Value unitsName(value->Get(1)->ToString());
				const char* sDatumName = *datumName;
				const char* sUnitsName = value->Get(1)->IsNull() ? NULL : *unitsName;

				SIMCONNECT_DATATYPE datumType = SIMCONNECT_DATATYPE_FLOAT64;	// Default type (double)
				double epsilon;
				float datumId;

				if (len > 1) {

					hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, sDatumName, sUnitsName);
				}
				if (len > 2) {
					int t = value->Get(2)->Int32Value();
					datumType = SIMCONNECT_DATATYPE(t);
					hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, sDatumName, sUnitsName, datumType);
				}
				if (len > 3) {
					epsilon = value->Get(3)->Int32Value();
					hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, sDatumName, sUnitsName, datumType, epsilon);
				}
				if (len > 4) {
					datumId = value->Get(4)->Int32Value();
					hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, sDatumName, sUnitsName, datumType, epsilon, datumId);
				}

				dataTypes.push_back(datumType);
			}
		}
	}

	return{ definitionId, numValues, callback, dataTypes };
}


// Custom useful functions ////////////////////////////////////////////////////////////////////
void SetAircraftInitialPosition(const v8::FunctionCallbackInfo<v8::Value>& args) {
	if (ghSimConnect) {
		Isolate* isolate = args.GetIsolate();

		SIMCONNECT_DATA_INITPOSITION init;
		init.Altitude = args[0]->NumberValue();
		init.Latitude = args[1]->NumberValue();
		init.Longitude = args[2]->NumberValue();
		init.Pitch = args[3]->NumberValue();
		init.Bank = args[4]->NumberValue();
		init.Heading = args[5]->NumberValue();
		init.OnGround = args[6]->IntegerValue();
		init.Airspeed = args[7]->IntegerValue();

		int id = getUniqueDefineId();
		SimConnect_AddToDataDefinition(ghSimConnect, id, "Initial Position", NULL, SIMCONNECT_DATATYPE_INITPOSITION);
		HRESULT hr = SimConnect_SetDataOnSimObject(ghSimConnect, id, SIMCONNECT_OBJECT_ID_USER, 0, 0, sizeof(init), &init);

		args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	}
}

void Initialize(v8::Local<v8::Object> exports) {
	NODE_SET_METHOD(exports, "open", Open);
	NODE_SET_METHOD(exports, "close", Close);
	NODE_SET_METHOD(exports, "subscribeToSystemEvent", SubscribeToSystemEvent);
	NODE_SET_METHOD(exports, "requestDataOnSimObject", RequestDataOnSimObject);
	NODE_SET_METHOD(exports, "setDataOnSimObject", SetDataOnSimObject);
	NODE_SET_METHOD(exports, "setAircraftInitialPosition", SetAircraftInitialPosition);
	NODE_SET_METHOD(exports, "transmitClientEvent", TransmitClientEvent);
	NODE_SET_METHOD(exports, "requestSystemState", RequestSystemState);
}

NODE_MODULE(addon, Initialize);