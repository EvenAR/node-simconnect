// https://stackoverflow.com/questions/34356686/how-to-convert-v8string-to-const-char

#include <map>
#include <string>
#include <sstream>
#include <nan.h>
#include <node.h>
#include <windows.h>
#include "SimConnect.h"

#include <queue>          // std::queue

std::map<SIMCONNECT_EXCEPTION, const char*> exceptionNames = {
	{ SIMCONNECT_EXCEPTION_NONE, "SIMCONNECT_EXCEPTION_NONE" },
	{ SIMCONNECT_EXCEPTION_ERROR, "SIMCONNECT_EXCEPTION_ERROR" },
	{ SIMCONNECT_EXCEPTION_SIZE_MISMATCH, "SIMCONNECT_EXCEPTION_SIZE_MISMATCH" },
	{ SIMCONNECT_EXCEPTION_UNRECOGNIZED_ID, "SIMCONNECT_EXCEPTION_UNRECOGNIZED_ID" },
	{ SIMCONNECT_EXCEPTION_UNOPENED, "SIMCONNECT_EXCEPTION_UNOPENED" },
	{ SIMCONNECT_EXCEPTION_VERSION_MISMATCH, "SIMCONNECT_EXCEPTION_VERSION_MISMATCH" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_GROUPS, "SIMCONNECT_EXCEPTION_TOO_MANY_GROUPS" },
	{ SIMCONNECT_EXCEPTION_NAME_UNRECOGNIZED, "SIMCONNECT_EXCEPTION_NAME_UNRECOGNIZED" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_EVENT_NAMES, "SIMCONNECT_EXCEPTION_TOO_MANY_EVENT_NAMES" },
	{ SIMCONNECT_EXCEPTION_EVENT_ID_DUPLICATE, "SIMCONNECT_EXCEPTION_EVENT_ID_DUPLICATE" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_MAPS, "SIMCONNECT_EXCEPTION_TOO_MANY_MAPS" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_OBJECTS, "SIMCONNECT_EXCEPTION_TOO_MANY_OBJECTS" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_REQUESTS, "SIMCONNECT_EXCEPTION_TOO_MANY_REQUESTS" },
	{ SIMCONNECT_EXCEPTION_WEATHER_INVALID_PORT, "SIMCONNECT_EXCEPTION_WEATHER_INVALID_PORT" },
	{ SIMCONNECT_EXCEPTION_WEATHER_INVALID_METAR, "SIMCONNECT_EXCEPTION_WEATHER_INVALID_METAR" },
	{ SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_GET_OBSERVATION, "SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_GET_OBSERVATION" },
	{ SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_CREATE_STATION, "SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_CREATE_STATION" },
	{ SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_REMOVE_STATION, "SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_REMOVE_STATION" },
	{ SIMCONNECT_EXCEPTION_INVALID_DATA_TYPE, "SIMCONNECT_EXCEPTION_INVALID_DATA_TYPE" },
	{ SIMCONNECT_EXCEPTION_INVALID_DATA_SIZE, "SIMCONNECT_EXCEPTION_INVALID_DATA_SIZE" },
	{ SIMCONNECT_EXCEPTION_DATA_ERROR, "SIMCONNECT_EXCEPTION_DATA_ERROR" },
	{ SIMCONNECT_EXCEPTION_INVALID_ARRAY, "SIMCONNECT_EXCEPTION_INVALID_ARRAY" },
	{ SIMCONNECT_EXCEPTION_CREATE_OBJECT_FAILED, "SIMCONNECT_EXCEPTION_CREATE_OBJECT_FAILED" },
	{ SIMCONNECT_EXCEPTION_OPERATION_INVALID_FOR_OBJECT_TYPE, "SIMCONNECT_EXCEPTION_OPERATION_INVALID_FOR_OBJECT_TYPE" },
	{ SIMCONNECT_EXCEPTION_ILLEGAL_OPERATION, "SIMCONNECT_EXCEPTION_ILLEGAL_OPERATION" },
	{ SIMCONNECT_EXCEPTION_ALREADY_SUBSCRIBED, "SIMCONNECT_EXCEPTION_ALREADY_SUBSCRIBED" },
	{ SIMCONNECT_EXCEPTION_INVALID_ENUM, "SIMCONNECT_EXCEPTION_INVALID_ENUM" },
	{ SIMCONNECT_EXCEPTION_DEFINITION_ERROR, "SIMCONNECT_EXCEPTION_DEFINITION_ERROR" },
	{ SIMCONNECT_EXCEPTION_DUPLICATE_ID, "SIMCONNECT_EXCEPTION_DUPLICATE_ID" },
	{ SIMCONNECT_EXCEPTION_DATUM_ID, "SIMCONNECT_EXCEPTION_DATUM_ID" },
	{ SIMCONNECT_EXCEPTION_OUT_OF_BOUNDS, "SIMCONNECT_EXCEPTION_OUT_OF_BOUNDS" },
	{ SIMCONNECT_EXCEPTION_ALREADY_CREATED, "SIMCONNECT_EXCEPTION_ALREADY_CREATED" },
	{ SIMCONNECT_EXCEPTION_OBJECT_OUTSIDE_REALITY_BUBBLE, "SIMCONNECT_EXCEPTION_OBJECT_OUTSIDE_REALITY_BUBBLE" },
	{ SIMCONNECT_EXCEPTION_OBJECT_CONTAINER, "SIMCONNECT_EXCEPTION_OBJECT_CONTAINER" },
	{ SIMCONNECT_EXCEPTION_OBJECT_AI, "SIMCONNECT_EXCEPTION_OBJECT_AI" },
	{ SIMCONNECT_EXCEPTION_OBJECT_ATC, "SIMCONNECT_EXCEPTION_OBJECT_ATC" },
	{ SIMCONNECT_EXCEPTION_OBJECT_SCHEDULE, "SIMCONNECT_EXCEPTION_OBJECT_SCHEDULE" }
};



using namespace v8;

HANDLE ghMutex;

struct StructVS
{
	char    strings[1];   // variable-length strings
};

struct CallbackData {
	DWORD cbData;
	SIMCONNECT_RECV* pData;
};

std::map<SIMCONNECT_DATATYPE, int> sizeMap = 
{ 
	{ SIMCONNECT_DATATYPE_INT32, 4 },
	{ SIMCONNECT_DATATYPE_INT64, 8 },
	{ SIMCONNECT_DATATYPE_FLOAT32, 4 },
	{ SIMCONNECT_DATATYPE_FLOAT64, 8 },
	{ SIMCONNECT_DATATYPE_STRING8, 8 },
	{ SIMCONNECT_DATATYPE_STRING32, 32 },
	{ SIMCONNECT_DATATYPE_STRING64, 64 },
	{ SIMCONNECT_DATATYPE_STRING128, 128 },
	{ SIMCONNECT_DATATYPE_STRING256, 256 },
	{ SIMCONNECT_DATATYPE_STRING260, 260 }
};

// Structs  ////////////////////////////////////////////////
struct SystemEventRequest {
	Nan::Callback* jsCallback;
};

struct DataRequest {
	int definition_id;
	int num_values;
	Nan::Callback* jsCallback;
	std::vector<SIMCONNECT_DATATYPE> value_types;
};


// Function declarations ///////////////////////////////////
void CALLBACK Dispatch(SIMCONNECT_RECV* pData, DWORD cbData, void* pContext);
DataRequest GenerateDataRequest(HANDLE hSimConnect, Local<Array> requestedValues, Nan::Callback* callback);
void handleReceived_Data(Isolate* isolate, SIMCONNECT_RECV* pData, DWORD cbData);
void handleReceived_Event(Isolate* isolate, SIMCONNECT_RECV* pData, DWORD cbData);

// Global variables ////////////////////////////////////////
std::map<int, DataRequest> dataRequests;
std::map<int, Nan::Callback*> systemEventCallbacks;
std::map<int, Nan::Callback*> systemStateCallbacks;


uv_async_t async; // keep this instance around for as long as we might need to do the periodic callback
std::vector<HANDLE> simConnections;

//int eventDefinitionCounter;
//int dataRequestCounter;
//int dataDefinitionCounter;
uv_loop_t *loop;

int gOpenEventId;
int gQuitEventId;
int gExceptionEventId;

int _defineIdCounter;
int _eventIdCounter;
int _requestIdCounter;

int getUniqueDefineId() {
	//ReleaseMutex(ghMutex);
	int id = _defineIdCounter;
	_defineIdCounter++;
	return id;
	//WaitForSingleObject(ghMutex, INFINITE);
}

int getUniqueEventId() {
	//ReleaseMutex(ghMutex);
	int id = _eventIdCounter;
	_eventIdCounter++;
	return id;
	//WaitForSingleObject(ghMutex, INFINITE);
}

int getUniqueRequestId() {
	//ReleaseMutex(ghMutex);
	int id = _requestIdCounter;
	_requestIdCounter++;
	return id;
	//WaitForSingleObject(ghMutex, INFINITE);
}


std::queue<CallbackData *> zqueue;

void messageReceiver(uv_async_t* handle) {
	// Called by UV in main thread after our worker thread calls uv_async_send()
	//    I.e. it's safe to callback to the CB we defined in node!

	Nan::HandleScope scope;
	v8::Isolate* isolate = v8::Isolate::GetCurrent();

	WaitForSingleObject(ghMutex, INFINITE);
	while (!zqueue.empty()) {
		CallbackData* data = zqueue.front();

		switch (data->pData->dwID)
		{
		case SIMCONNECT_RECV_ID_EVENT:
		{
			handleReceived_Event(isolate, data->pData, data->cbData);
		}
		break;

		case SIMCONNECT_RECV_ID_SIMOBJECT_DATA:
		{
			handleReceived_Data(isolate, data->pData, data->cbData);
		}
		break;

		case SIMCONNECT_RECV_ID_SIMOBJECT_DATA_BYTYPE:
		{

		}
		break;

		case SIMCONNECT_RECV_ID_QUIT:
		{
			systemEventCallbacks[gQuitEventId]->Call(isolate->GetCurrentContext()->Global(), 0, NULL);
			break;
		}
		break;
		case SIMCONNECT_RECV_ID_EXCEPTION:
		{
			SIMCONNECT_RECV_EXCEPTION *except = (SIMCONNECT_RECV_EXCEPTION*)data->pData;
			printf("\n\n***** EXCEPTION=%d  SendID=%d  uOffset=%d  cbData=%d\n", except->dwException, except->dwSendID, except->dwIndex, data->cbData);

			Local<Object> obj = Object::New(isolate);
			obj->Set(String::NewFromUtf8(isolate, "dwException"), Number::New(isolate, except->dwException));
			obj->Set(String::NewFromUtf8(isolate, "dwSendID"), Number::New(isolate, except->dwSendID));
			obj->Set(String::NewFromUtf8(isolate, "dwIndex"), Number::New(isolate, except->dwIndex));
			obj->Set(String::NewFromUtf8(isolate, "cbData"), Number::New(isolate, data->cbData));
			obj->Set(String::NewFromUtf8(isolate, "name"), String::NewFromUtf8(isolate, exceptionNames[SIMCONNECT_EXCEPTION(except->dwException)]));

			Local<Value> argv[1] = { obj };

			systemEventCallbacks[gExceptionEventId]->Call(isolate->GetCurrentContext()->Global(), 1, argv);

			break;
		}
		break;
		case SIMCONNECT_RECV_ID_EVENT_FILENAME:
		{
			SIMCONNECT_RECV_EVENT_FILENAME* fileName = (SIMCONNECT_RECV_EVENT_FILENAME*)data->pData;
			const int argc = 1;
			Local<Value> argv[argc] = {
				String::NewFromUtf8(isolate, (const char*)fileName->szFileName)
			};
			systemEventCallbacks[fileName->uEventID]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
		}
		break;
		case SIMCONNECT_RECV_ID_OPEN:
		{
			SIMCONNECT_RECV_OPEN *pOpen = (SIMCONNECT_RECV_OPEN*)data->pData;

			const int argc = 1;
			Local<Value> argv[argc] = {
				String::NewFromUtf8(isolate, (const char*)pOpen->szApplicationName)
			};

			systemEventCallbacks[gOpenEventId]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
			printf("Receive open\n");
		}
		break;
		case SIMCONNECT_RECV_ID_SYSTEM_STATE:
		{
			SIMCONNECT_RECV_SYSTEM_STATE *pState = (SIMCONNECT_RECV_SYSTEM_STATE*)data->pData;

			Local<Object> obj = Object::New(isolate);
			obj->Set(String::NewFromUtf8(isolate, "integer"), Number::New(isolate, pState->dwInteger));
			obj->Set(String::NewFromUtf8(isolate, "float"), Number::New(isolate, pState->fFloat));
			obj->Set(String::NewFromUtf8(isolate, "string"), String::NewFromUtf8(isolate, pState->szString));

			Local<Value> argv[1] = { obj };
			systemStateCallbacks[pState->dwRequestID]->Call(isolate->GetCurrentContext()->Global(), 1, argv);
		}
		break;
		default:
			printf("Unexpected message received!!!!!!!!!!!!!!!!!-> %i\n", data->pData->dwID);
			break;
		}

		zqueue.pop();
	}
	ReleaseMutex(ghMutex);
	/*Nan::HandleScope scope;
	v8::Isolate* isolate = v8::Isolate::GetCurrent();

	CallbackData* data = static_cast<CallbackData*>(handle->data);
	
	switch (data->pData->dwID)
	{
		case SIMCONNECT_RECV_ID_EVENT:
		{
			handleReceived_Event(isolate, data->pData, data->cbData);
		}
		break;

		case SIMCONNECT_RECV_ID_SIMOBJECT_DATA:
		{
			handleReceived_Data(isolate, data->pData, data->cbData);
		}
		break; 

		case SIMCONNECT_RECV_ID_SIMOBJECT_DATA_BYTYPE:
		{
			
		}
		break;

		case SIMCONNECT_RECV_ID_QUIT:
		{
			systemEventCallbacks[gQuitEventId]->Call(isolate->GetCurrentContext()->Global(), 0, NULL);
			break;
		}
		break;
		case SIMCONNECT_RECV_ID_EXCEPTION:
		{
			SIMCONNECT_RECV_EXCEPTION *except = (SIMCONNECT_RECV_EXCEPTION*)data->pData;
			printf("\n\n***** EXCEPTION=%d  SendID=%d  uOffset=%d  cbData=%d\n", except->dwException, except->dwSendID, except->dwIndex, data->cbData);

			Local<Object> obj = Object::New(isolate);
			obj->Set(String::NewFromUtf8(isolate, "dwException"), Number::New(isolate, except->dwException));
			obj->Set(String::NewFromUtf8(isolate, "dwSendID"), Number::New(isolate, except->dwSendID));
			obj->Set(String::NewFromUtf8(isolate, "dwIndex"), Number::New(isolate, except->dwIndex));
			obj->Set(String::NewFromUtf8(isolate, "cbData"), Number::New(isolate, data->cbData));
			obj->Set(String::NewFromUtf8(isolate, "name"), String::NewFromUtf8(isolate, exceptionNames[SIMCONNECT_EXCEPTION(except->dwException)]));

			Local<Value> argv[1] = { obj };

			systemEventCallbacks[gExceptionEventId]->Call(isolate->GetCurrentContext()->Global(), 1, argv);

			break;
		}
		break;
		case SIMCONNECT_RECV_ID_EVENT_FILENAME:
		{
			SIMCONNECT_RECV_EVENT_FILENAME* fileName = (SIMCONNECT_RECV_EVENT_FILENAME*)data->pData;
			const int argc = 1;
			Local<Value> argv[argc] = {
				String::NewFromUtf8(isolate, (const char*)fileName->szFileName)
			};
			systemEventCallbacks[fileName->uEventID]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
		}
		break;
		case SIMCONNECT_RECV_ID_OPEN:
		{
			SIMCONNECT_RECV_OPEN *pOpen = (SIMCONNECT_RECV_OPEN*)data->pData;
			
			const int argc = 1;
			Local<Value> argv[argc] = {
				String::NewFromUtf8(isolate, (const char*)pOpen->szApplicationName)
			};
			
			systemEventCallbacks[gOpenEventId]->Call(isolate->GetCurrentContext()->Global(), argc, argv);
			printf("Receive open\n");
		}
		break; 
		case SIMCONNECT_RECV_ID_SYSTEM_STATE:
		{
			SIMCONNECT_RECV_SYSTEM_STATE *pState = (SIMCONNECT_RECV_SYSTEM_STATE*)data->pData;
			
			Local<Object> obj = Object::New(isolate);
			obj->Set(String::NewFromUtf8(isolate, "integer"), Number::New(isolate, pState->dwInteger));
			obj->Set(String::NewFromUtf8(isolate, "float"), Number::New(isolate, pState->fFloat));
			obj->Set(String::NewFromUtf8(isolate, "string"), String::NewFromUtf8(isolate, pState->szString));

			Local<Value> argv[1] = { obj };
			systemStateCallbacks[pState->dwRequestID]->Call(isolate->GetCurrentContext()->Global(), 1, argv);
		}
		break;
		default:
			printf("Unexpected message received!!!!!!!!!!!!!!!!!-> %i\n", data->pData->dwID);
		break;
	}*/
} 

class DispatchCaller : public Nan::AsyncWorker {
public:
	DispatchCaller(Nan::Callback *callback, HANDLE hSimConnect) : AsyncWorker(callback), connection(hSimConnect) {

	}
	~DispatchCaller() {}

	void Execute() {
		CallbackData data;
		uv_async_init(loop, &async, messageReceiver); // Must be called from worker thread
		int count = 0;
		while (true) {
			SIMCONNECT_RECV* pData;
			DWORD cbData;

			HRESULT hr = SimConnect_GetNextDispatch(connection, &pData, &cbData);

			if (SUCCEEDED(hr))
			{
				data.pData = pData;
				data.cbData = cbData;
				//async.data = &data;

				WaitForSingleObject(ghMutex, INFINITE);
				zqueue.push(&data);
				uv_async_send(&async);
				ReleaseMutex(ghMutex);
				
				
			}
			Sleep(1);
		}
	}

private:
	HANDLE connection;
};


void handleReceived_Data(Isolate* isolate, SIMCONNECT_RECV* pData, DWORD cbData) {
	SIMCONNECT_RECV_SIMOBJECT_DATA *pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA*)pData;
	int numVars = dataRequests[pObjData->dwRequestID].num_values;
	std::vector<SIMCONNECT_DATATYPE> valTypes = dataRequests[pObjData->dwRequestID].value_types;

	Local<Array> result_list = Array::New(isolate);
	int offset = 0;

	for (int i = 0; i < numVars; i++) {
		int varSize = 0;

		if (valTypes[i] == SIMCONNECT_DATATYPE_STRINGV) {
			char *pString;
			DWORD cbString;
			StructVS *pS = (StructVS*)((char*)(&pObjData->dwData) + offset);
			SimConnect_RetrieveString(pData, cbData, &pS->strings, &pString, &cbString);
			result_list->Set(i, String::NewFromUtf8(isolate, (const char*)pString));

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

	systemEventCallbacks[myEvent->uEventID]->Call(isolate->GetCurrentContext()->Global(), 0, NULL);
} 


// JS: open(AppName, Callback)
void Open(const v8::FunctionCallbackInfo<v8::Value>& args) {
	ghMutex = CreateMutex(NULL, FALSE, NULL);

	_defineIdCounter = 0;
	_eventIdCounter = 0;
	_requestIdCounter = 0;

	Isolate* isolate = args.GetIsolate();

	// Get arguments
	const char*		appName = *String::Utf8Value(args[0]);

	gOpenEventId = getUniqueEventId();
	systemEventCallbacks[gOpenEventId] = { new Nan::Callback(args[1].As<Function>()) };
	gQuitEventId = getUniqueEventId();
	systemEventCallbacks[gQuitEventId] = { new Nan::Callback(args[2].As<Function>()) };
	gExceptionEventId = getUniqueEventId();
	systemEventCallbacks[gExceptionEventId] = { new Nan::Callback(args[3].As<Function>()) };

	// Open connection
	HANDLE hSimConnect;
	HRESULT hr = (SimConnect_Open(&hSimConnect, appName, NULL, 0, 0, 0));

	// Save connection handle if success
	Local<Integer> retval;
	if (SUCCEEDED(hr)) {
		simConnections.push_back(hSimConnect);
		retval = v8::Integer::New(isolate, simConnections.size() - 1);

		// Create dispatch looper thread
		loop = uv_default_loop();
		Nan::AsyncQueueWorker(new DispatchCaller(NULL, hSimConnect));
	}
	else {
		retval = v8::Integer::New(isolate, hr);
	}
	
	args.GetReturnValue().Set(retval);
}

void Close(const v8::FunctionCallbackInfo<v8::Value>& args) {
	Isolate* isolate = args.GetIsolate();
	HANDLE hSimConnect = simConnections[args[0]->IntegerValue()];

	HRESULT hr = SimConnect_Close(&hSimConnect);
	args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
}

void RequestSystemState(const v8::FunctionCallbackInfo<v8::Value>& args) {
	Isolate* isolate = args.GetIsolate();

	HANDLE hSimConnect = simConnections[args[0]->IntegerValue()];
	const char* stateName = *String::Utf8Value(args[1]);

	int id = getUniqueRequestId();
	systemStateCallbacks[id] = new Nan::Callback(args[2].As<Function>());

	HRESULT hr = SimConnect_RequestSystemState(hSimConnect, id, stateName);
	
	args.GetReturnValue().Set(v8::Number::New(isolate, id));
}

void SetAircraftInitialPosition(const v8::FunctionCallbackInfo<v8::Value>& args) {
	Isolate* isolate = args.GetIsolate();
	HANDLE hSimConnect = simConnections[args[0]->IntegerValue()];

	Local<Array> obj = Local<Array>::Cast(args[1]);


	SIMCONNECT_DATA_INITPOSITION init;
	init.Altitude = args[1]->NumberValue();
	init.Latitude = args[2]->NumberValue();
	init.Longitude = args[3]->NumberValue();
	init.Pitch = args[4]->NumberValue();
	init.Bank = args[5]->NumberValue();
	init.Heading = args[6]->NumberValue();
	init.OnGround = args[7]->IntegerValue();
	init.Airspeed = args[8]->IntegerValue();

	int id = getUniqueDefineId();
	SimConnect_AddToDataDefinition(hSimConnect, id, "Initial Position", NULL, SIMCONNECT_DATATYPE_INITPOSITION);
	HRESULT hr = SimConnect_SetDataOnSimObject(hSimConnect, id, SIMCONNECT_OBJECT_ID_USER, 0, 0, sizeof(init), &init);

	args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));

}

void TransmitClientEvent(const v8::FunctionCallbackInfo<v8::Value>& args) {
	Isolate* isolate = args.GetIsolate();
	HANDLE hSimConnect = simConnections[args[0]->IntegerValue()];
	

	const char* eventName = *String::Utf8Value(args[1]);
	DWORD data = args.Length() > 2 ? args[2]->Int32Value() : 0;

	int id = getUniqueEventId();
	SimConnect_MapClientEventToSimEvent(hSimConnect, id, eventName);
	HRESULT hr = SimConnect_TransmitClientEvent(hSimConnect, SIMCONNECT_OBJECT_ID_USER, id, data, SIMCONNECT_GROUP_PRIORITY_HIGHEST, SIMCONNECT_EVENT_FLAG_GROUPID_IS_PRIORITY);

	args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
}


// JS: subscribeToSystemEvent(SimConnectId, EventID, SystemEventName)
void SubscribeToSystemEvent(const v8::FunctionCallbackInfo<v8::Value>& args) {
	v8::Isolate* isolate = args.GetIsolate();

	int eventId = getUniqueEventId();

	int				connectionId = args[0]->Int32Value();
	const char*		systemEventName = *String::Utf8Value(args[1]);
	systemEventCallbacks[eventId] = { new Nan::Callback(args[2].As<Function>()) };
	
	HANDLE hSimConnect = simConnections[connectionId];
	HRESULT hr = SimConnect_SubscribeToSystemEvent(hSimConnect, eventId, systemEventName);
	args.GetReturnValue().Set(v8::Integer::New(isolate, eventId));
}

void RequestDataOnSimObject(const v8::FunctionCallbackInfo<v8::Value>& args) {
	v8::Isolate* isolate = args.GetIsolate();

	int	connectionId = args[0]->Int32Value();
	Local<Array> reqValues = v8::Local<v8::Array>::Cast(args[1]);
	auto callback = new Nan::Callback(args[2].As<Function>());

	int	objectId = args.Length() > 3 ? args[3]->Int32Value() : SIMCONNECT_OBJECT_ID_USER;
	int	periodId = args.Length() > 4 ? args[4]->Int32Value() : SIMCONNECT_PERIOD_SIM_FRAME;
	int	flags = args.Length() > 5 ? args[5]->Int32Value() : 0;
	int	origin = args.Length() > 6 ? args[6]->Int32Value() : 0;
	int	interval = args.Length() > 7 ? args[7]->Int32Value() : 0;
	DWORD limit = args.Length() > 8 ? args[8]->NumberValue() : 0;

	HANDLE hSimConnect = simConnections[connectionId];

	int reqId = getUniqueRequestId();

	DataRequest request = GenerateDataRequest(hSimConnect, reqValues, callback);

	HRESULT hr = SimConnect_RequestDataOnSimObject(hSimConnect, reqId, request.definition_id, objectId, SIMCONNECT_PERIOD(periodId), flags, origin, interval, limit);

	args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));

	dataRequests[reqId] = request;
}

void SetDataOnSimObject(const v8::FunctionCallbackInfo<v8::Value>& args) {
	v8::Isolate* isolate = args.GetIsolate();

	int	connectionId = args[0]->Int32Value();
	const char* name = *String::Utf8Value(args[1]);
	const char* unit = *String::Utf8Value(args[2]);
	double value = args[3]->NumberValue();

	int	objectId = args.Length() > 4 ? args[4]->Int32Value() : SIMCONNECT_OBJECT_ID_USER;
	int	flags = args.Length() > 5 ? args[5]->Int32Value() : 0;
	
	HANDLE hSimConnect = simConnections[connectionId];

	int defId = getUniqueDefineId();

	SimConnect_AddToDataDefinition(hSimConnect, defId, name, unit);
	HRESULT hr = SimConnect_SetDataOnSimObject(hSimConnect, defId, SIMCONNECT_OBJECT_ID_USER, NULL, 0, sizeof(value), &value);

	args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
}

DataRequest GenerateDataRequest(HANDLE hSimConnect, Local<Array> requestedValues, Nan::Callback* callback) {

	int definitionId = getUniqueDefineId();

	HRESULT hr = -1;
	bool success = true;
	int numValues = requestedValues->Length();

	std::vector<SIMCONNECT_DATATYPE> dataTypes;

	for (int i = 0; i < requestedValues->Length(); i++) {
		Local<Array> value = v8::Local<v8::Array>::Cast(requestedValues->Get(i));
		
		if (value->IsArray()) {
			int len = value->Length();
			
			const char* datumName;
			const char* unitsName;

			SIMCONNECT_DATATYPE datumType = SIMCONNECT_DATATYPE_FLOAT64;	// Default type (double)
			double epsilon;
			float datumId;
			
			if (len > 1) {
				datumName = *String::Utf8Value(value->Get(0));
				unitsName = (value->Get(1)->IsNull()) ? NULL : *String::Utf8Value(value->Get(1));
				hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, datumName, unitsName);
			}
			if (len > 2) {
				int t = value->Get(2)->Int32Value();
				datumType = SIMCONNECT_DATATYPE(t);
				hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, datumName, unitsName, datumType);
			}
			if (len > 3) {
				epsilon = value->Get(3)->Int32Value();
				hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, datumName, unitsName, datumType, epsilon);
			}
			if (len > 4) {
				datumId = value->Get(4)->Int32Value();
				hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, datumName, unitsName, datumType, epsilon, datumId);
			}

			dataTypes.push_back(datumType);
		}
	}	

	return{ definitionId, numValues, callback, dataTypes };
}

//////////////////////////////////////////////////////////////




NAN_METHOD(StartDispatchWorker) {
	//int	connectionId = info[0]->Int32Value();
	//loop = uv_default_loop();
	//Nan::AsyncQueueWorker(new DispatchCaller(NULL, simConnections[connectionId]));
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
	//Nan::Export(exports, "startDispatchWorker", StartDispatchWorker);
}



NODE_MODULE(addon, Initialize);
