// https://stackoverflow.com/questions/34356686/how-to-convert-v8string-to-const-char

#include <map>
#include <string>
#include <sstream>
#include <nan.h>
#include <node.h>
#include <windows.h>
#include "SimConnect.h"

using namespace v8;


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
void handleReceived_Data(Isolate* isolate, SIMCONNECT_RECV* pData);
void handleReceived_Event(Isolate* isolate, SIMCONNECT_RECV* pData);

// Global variables ////////////////////////////////////////
std::map<int, DataRequest> dataRequest;
std::map<int, SystemEventRequest> systemEventRequests;


uv_async_t async; // keep this instance around for as long as we might need to do the periodic callback
std::vector<HANDLE> simConnections;

int eventRequestCounter;
int dataRequestCounter;
int dataDefinitionCounter;
uv_loop_t *loop;



void messageReceiver(uv_async_t* handle) {
	// Called by UV in main thread after our worker thread calls uv_async_send()
	//    I.e. it's safe to callback to the CB we defined in node!
	Nan::HandleScope scope;
	v8::Isolate* isolate = v8::Isolate::GetCurrent();

	SIMCONNECT_RECV* pData = static_cast<SIMCONNECT_RECV*>(handle->data);
	switch (pData->dwID)
	{
		case SIMCONNECT_RECV_ID_EVENT:
		{
			handleReceived_Event(isolate, pData);
		}
		break;

		case SIMCONNECT_RECV_ID_SIMOBJECT_DATA:
		{
			handleReceived_Data(isolate, pData);
		}
		break; 

		case SIMCONNECT_RECV_ID_SIMOBJECT_DATA_BYTYPE:
		{
			/*SIMCONNECT_RECV_SIMOBJECT_DATA_BYTYPE *pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA_BYTYPE*)pData;
			printf("Rec\n");
			switch (pObjData->dwRequestID)
			{

			default:
				break;
			}*/
		}
		break;

		case SIMCONNECT_RECV_ID_QUIT:
		{
			/*const int argc = 2;
			Local<Value> argv[argc] = {
				Number::New(isolate, -100)
			};
			cbPeriodic->Call(isolate->GetCurrentContext()->Global(), argc, argv);

			printf("SimConnect Quit Received\n");*/
		}
		break;
		case SIMCONNECT_RECV_ID_EXCEPTION:
		{
			/*SIMCONNECT_RECV_EXCEPTION *except = (SIMCONNECT_RECV_EXCEPTION*)pData;
			printf("\n\n***** EXCEPTION=%d  SendID=%d  Index=%d  cbData=%d\n", except->dwException, except->dwSendID, except->dwIndex, 0);

			// Locate the bad call and print it out 
			char* s = findSendRecord(except->dwSendID);
			printf("\n%s", s);

			if (except->dwException == SIMCONNECT_EXCEPTION_VERSION_MISMATCH) {
				printf("\nMinor: v%i", LOWORD(except->dwIndex));
				printf("\nMajor: v%i", HIWORD(except->dwIndex));
			}
			break;*/
		}
		break;
		default:
			printf("Unexpected message received!!!!!!!!!!!!!!!!!-> %i\n", pData->dwID);
		break;
	}
}

void handleReceived_Data(Isolate* isolate, SIMCONNECT_RECV* pData) {
	SIMCONNECT_RECV_SIMOBJECT_DATA *pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA*)pData;
	int numVars = dataRequest[pObjData->dwRequestID].num_values;
	std::vector<SIMCONNECT_DATATYPE> valTypes = dataRequest[pObjData->dwRequestID].value_types;

	Local<Array> result_list = Array::New(isolate);
	int offset = 0;

	for (int i = 0; i < numVars; i++) {
		int varSize = sizeMap[valTypes[i]];
		char* p = ((char*)(&pObjData->dwData) + offset);
		double *var = (double*)p;

		result_list->Set(i, Number::New(isolate, *var));

		offset += varSize;
	}

	const int argc = 1;
	Local<Value> argv[argc] = {
		result_list
	};

	dataRequest[pObjData->dwRequestID].jsCallback->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}

void handleReceived_Event(Isolate* isolate, SIMCONNECT_RECV* pData) {
	SIMCONNECT_RECV_EVENT* myEvent = (SIMCONNECT_RECV_EVENT*)pData;

	const int argc = 1;
	Local<Value> argv[argc] = {
		Number::New(isolate, myEvent->dwData)
	};

	systemEventRequests[myEvent->uEventID].jsCallback->Call(isolate->GetCurrentContext()->Global(), argc, argv);
}


// JS: open(AppName, Callback)
void Open(const v8::FunctionCallbackInfo<v8::Value>& args) {
	Isolate* isolate = args.GetIsolate();

	// Get arguments
	const char*		appName = *String::Utf8Value(args[0]);

	// Open connection
	HANDLE hSimConnect;
	HRESULT hr = (SimConnect_Open(&hSimConnect, appName, NULL, 0, 0, 0));

	// Save connection handle if success
	Local<Integer> retval;
	if (SUCCEEDED(hr)) {
		simConnections.push_back(hSimConnect);
		retval = v8::Integer::New(isolate, simConnections.size() - 1);
	}
	else {
		retval = v8::Integer::New(isolate, hr);
	}
	
	args.GetReturnValue().Set(retval);

	dataRequestCounter = 0;
	eventRequestCounter = 0;
	dataDefinitionCounter = 0;
}

void Close(const v8::FunctionCallbackInfo<v8::Value>& args) {
	Isolate* isolate = args.GetIsolate();
	HANDLE hSimConnect = simConnections[args[0]->IntegerValue()];

	HRESULT hr = SimConnect_Close(&hSimConnect);
	args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
}


void SetAircraftPosition(const v8::FunctionCallbackInfo<v8::Value>& args) {
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

	SimConnect_AddToDataDefinition(hSimConnect, dataDefinitionCounter, "Initial Position", NULL, SIMCONNECT_DATATYPE_INITPOSITION);
	HRESULT hr = SimConnect_SetDataOnSimObject(hSimConnect, dataDefinitionCounter, SIMCONNECT_OBJECT_ID_USER, 0, 0, sizeof(init), &init);


	args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));
	dataDefinitionCounter++;
}

// JS: subscribeToSystemEvent(SimConnectId, EventID, SystemEventName)
void SubscribeToSystemEvent(const v8::FunctionCallbackInfo<v8::Value>& args) {
	v8::Isolate* isolate = args.GetIsolate();
	
	int				connectionId = args[0]->Int32Value();
	const char*		systemEventName = *String::Utf8Value(args[1]);
	systemEventRequests[eventRequestCounter] = { new Nan::Callback(args[2].As<Function>()) };
	
	HANDLE hSimConnect = simConnections[connectionId];
	HRESULT hr = SimConnect_SubscribeToSystemEvent(hSimConnect, eventRequestCounter, systemEventName);
	args.GetReturnValue().Set(v8::Integer::New(isolate, eventRequestCounter));

	eventRequestCounter++;
}

void RequestDataOnSimObject(const v8::FunctionCallbackInfo<v8::Value>& args) {
	v8::Isolate* isolate = args.GetIsolate();

	int	connectionId = args[0]->Int32Value();
	Local<Array> reqValues = v8::Local<v8::Array>::Cast(args[1]);
	auto callback = new Nan::Callback(args[2].As<Function>());

	int	objectId = args.Length() > 3 ? args[3]->Int32Value() : SIMCONNECT_OBJECT_ID_USER;
	int	periodId = args.Length() > 4 ? args[4]->Int32Value() : SIMCONNECT_PERIOD_SECOND;
	int	flags = args.Length() > 5 ? args[5]->Int32Value() : 0;
	int	origin = args.Length() > 6 ? args[6]->Int32Value() : 0;
	int	interval = args.Length() > 7 ? args[7]->Int32Value() : 0;
	int	limit = args.Length() > 8 ? args[8]->Int32Value() : 0;

	HANDLE hSimConnect = simConnections[connectionId];

	DataRequest request = GenerateDataRequest(hSimConnect, reqValues, callback);

	HRESULT hr = SimConnect_RequestDataOnSimObject(hSimConnect, dataRequestCounter, request.definition_id, objectId, SIMCONNECT_PERIOD(periodId), flags, origin, interval, limit);

	args.GetReturnValue().Set(v8::Boolean::New(isolate, SUCCEEDED(hr)));

	dataRequest[dataRequestCounter] = request;
	dataRequestCounter++;
	dataDefinitionCounter++;

}

DataRequest GenerateDataRequest(HANDLE hSimConnect, Local<Array> requestedValues, Nan::Callback* callback) {

	int requestId = dataRequestCounter;
	int definitionId = dataDefinitionCounter;

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
			int datumType = SIMCONNECT_DATATYPE_FLOAT64;	// Default type (double)
			double epsilon;
			float datumId;
			
			if (len > 1) {
				datumName = *String::Utf8Value(value->Get(0));
				unitsName = *String::Utf8Value(value->Get(1));
				hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, datumName, unitsName);
			}
			if (len > 2) {
				datumType = value->Get(2)->Int32Value();
				hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, datumName, unitsName, SIMCONNECT_DATATYPE(datumType));
			}
			if (len > 3) {
				epsilon = value->Get(3)->Int32Value();
				hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, datumName, unitsName, SIMCONNECT_DATATYPE(datumType), epsilon);
			}
			if (len > 4) {
				datumId = value->Get(4)->Int32Value();
				hr = SimConnect_AddToDataDefinition(hSimConnect, definitionId, datumName, unitsName, SIMCONNECT_DATATYPE(datumType), epsilon, datumId);
			}

			dataTypes.push_back(SIMCONNECT_DATATYPE(datumType));
		}
	}	

	return{ dataDefinitionCounter, numValues, callback, dataTypes };
}

//////////////////////////////////////////////////////////////


class DispatchCaller : public Nan::AsyncWorker {
public:
	DispatchCaller(Nan::Callback *callback, HANDLE hSimConnect) : AsyncWorker(callback), connection(hSimConnect) {

	}
	~DispatchCaller() {}

	void Execute() {

		uv_async_init(loop, &async, messageReceiver); // Must be called from worker thread

		while (true) {
			SIMCONNECT_RECV* pData;
			DWORD cbData;

			HRESULT hr = SimConnect_GetNextDispatch(connection, &pData, &cbData);

			if (SUCCEEDED(hr))
			{
				async.data = pData;
				uv_async_send(&async);
			}

			Sleep(1);

		}
	}

private:
	HANDLE connection;

};

NAN_METHOD(StartDispatchWorker) {
	// Create the worker
	int	connectionId = info[0]->Int32Value();
	loop = uv_default_loop();
	Nan::AsyncQueueWorker(new DispatchCaller(NULL, simConnections[connectionId]));
}


void Initialize(v8::Local<v8::Object> exports) {
	NODE_SET_METHOD(exports, "open", Open);
	NODE_SET_METHOD(exports, "close", Close);
	NODE_SET_METHOD(exports, "subscribeToSystemEvent", SubscribeToSystemEvent);
	NODE_SET_METHOD(exports, "requestDataOnSimObject", RequestDataOnSimObject);
	NODE_SET_METHOD(exports, "setAircraftPosition", SetAircraftPosition);
	Nan::Export(exports, "startDispatchWorker", StartDispatchWorker);
}

NODE_MODULE(addon, Initialize);
