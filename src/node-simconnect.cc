#include <napi.h>
#include <windows.h>
#include <iostream>

#include "simconnect-handler.h"
#include "commons.h"

using namespace Napi;

// Napi utils
#define getOptionalProp(object, name, type, conversion, fallback) \
    object.Has(name) ? object.Get(name).As<type>().conversion() : fallback

#define getOptionalElement(array, index, type, conversion, fallback) \
    array.Length() > index ? array[index].As<type>().conversion() : fallback;
// Napi utils

SimConnectHandler* gpSimConnect = NULL;
std::map<unsigned int, FunctionReference> systemEventCallbacks;
std::map<unsigned int, FunctionReference> dataRequestCallbacks;


bool gIsConnected = false;

class EchoWorker : public AsyncProgressQueueWorker<Data> {

public:
    EchoWorker(Function& callback) : AsyncProgressQueueWorker(callback) { }

    ~EchoWorker() { }
    
    // This code will be executed on the worker thread
    void Execute(const ExecutionProgress& progress) {
        gpSimConnect = new SimConnectHandler();
        
        if (gpSimConnect->Open("My app")) {
            while (true) {
                Data nextDispatch = gpSimConnect->NextDispatch();
                progress.Send(&nextDispatch, 1);
                Sleep(1);
            }
        } else {
            std::cout << "Not ok D:" << std::endl;
        }
    }

    void OnProgress(const Data* dispatch, size_t /* count */) {
        switch (dispatch->type) {
            case PayloadType::Nothing: break;
            case PayloadType::Error: {
                ExceptionInfo* pEvent = (ExceptionInfo *)dispatch->payload;
                std::cout << pEvent->exceptionName << std::endl;
                delete pEvent;
            }
            break;
            case PayloadType::Open: {
                gIsConnected = true;
                SimInfo* pSimInfo = (SimInfo *)dispatch->payload;
                
                Object obj = Object::New(Env());
                obj.Set("name", String::New(Env(), pSimInfo->name.c_str()));
                obj.Set("version", String::New(Env(), pSimInfo->version.c_str()));

                Callback().Call({ String::New(Env(), "open"), obj });

                delete pSimInfo;
            }
            break;
            case PayloadType::Quit: {
                gIsConnected = false;
                Callback().Call({ String::New(Env(), "quit") });
            }
            break;
            case PayloadType::SystemState: {
                SimSystemState* pSystemState = (SimSystemState *)dispatch->payload;

                Object obj = Object::New(Env());
                obj.Set("integer", Number::New(Env(), pSystemState->integerValue));
                obj.Set("float", Number::New(Env(), pSystemState->floatValue));
                obj.Set("string", String::New(Env(), pSystemState->stringValue.c_str()));

                dataRequestCallbacks[pSystemState->requestId].Call({obj});

                delete pSystemState;
            }
            break;
            case PayloadType::EventId: {
                SimEvent* pEvent = (SimEvent *)dispatch->payload;
                Number value = Number::New(Env(), pEvent->value);
                systemEventCallbacks[pEvent->type].Call({value});
                delete pEvent;
            }
            break;
            case PayloadType::SimobjectData: {
                SimobjectDataBatch* pDataBatch = (SimobjectDataBatch *)dispatch->payload;
                Object obj = Object::New(Env());                

                for ( auto const& [datumName, pair] : pDataBatch->values ) {
                    DatumType datumType = pair.first;
                    void* pDatumValue = pair.second;

                    switch (datumType) {
                        case DatumType::Num: {
                            double* pDouble = (double*)pDatumValue;
                            obj.Set(datumName, Number::New(Env(), *pDouble));
                        } break;
                        case DatumType::Str: {
                            std::string* pString = (std::string*)pDatumValue;
                            obj.Set(datumName, String::New(Env(), pString->c_str()));
                        } break;
                        default: {
                            obj.Set("UNKNOWN_VALUE", String::New(Env(), "?"));
                        } break;
                    }
                }
                dataRequestCallbacks[pDataBatch->id].Call({obj});

                delete pDataBatch;
            }
            break;
            default: {
                std::cout << "Got unknown event " << std::endl;
            }
            break;
        }
    }

};

Value SubscribeToSystemEvent(const CallbackInfo& info) {
    if (gpSimConnect) {
        String eventName = info[0].As<String>();
        Function callback = info[1].As<Function>();
        
        auto eventId = gpSimConnect->SubscribeToSystemEvent(eventName);
        systemEventCallbacks[eventId] = Persistent(callback);
    }
    return info.Env().Undefined();
};

std::vector<DatumRequest> ToDatumRequests(Array requestedValues) {
    std::vector<DatumRequest> datumRequests;
    for (uint32_t i = 0; i < requestedValues.Length(); i++) {
        if(requestedValues.Get(i).IsArray()) {
            auto options = requestedValues.Get(i).As<Array>();
            datumRequests.push_back({
                options.Get("0").As<String>().Utf8Value(),                      // Name
                options.Get("1").As<String>().Utf8Value(),                      // Unit name
                getOptionalProp(options, "2", Number, Number::Uint32Value, 4)   // Type (4 = SIMCONNECT_DATATYPE_FLOAT64)
            });
        }
    }
    return datumRequests;
};

Value RequestDataOnSimObject(const CallbackInfo& info) {
    if (gpSimConnect) {
        Function callback = info[1].As<Function>();
        auto objectId = getOptionalElement(info, 2, Number, Number::Uint32Value, 0);
		auto period = getOptionalElement(info, 3, Number, Number::Uint32Value, 0);
		auto flags = getOptionalElement(info, 4, Number, Number::Uint32Value, 0);

        unsigned int requestId;
        if (info[0].IsNumber()) {
            auto existingDataDefinitionId = info[0].As<Number>().Uint32Value();
            requestId = gpSimConnect->RequestDataOnSimObject(existingDataDefinitionId, objectId, period, flags);
        } else {
            Array requestedValues = info[0].As<Array>();
            requestId = gpSimConnect->RequestDataOnSimObject(ToDatumRequests(requestedValues), objectId, period, flags);
        }
        
        dataRequestCallbacks[requestId] = Persistent(callback);
    }
    return info.Env().Undefined();
}

Value RequestDataOnSimObjectType(const CallbackInfo& info) {
    if (gpSimConnect) {
        Array requestedValues = info[0].As<Array>();
        Function callback = info[1].As<Function>();
        auto radius = getOptionalElement(info, 2, Number, Number::Uint32Value, 0);
		auto typeId = getOptionalElement(info, 3, Number, Number::Uint32Value, 0); // 0 = SIMCONNECT_SIMOBJECT_TYPE_USER

        auto requestId = gpSimConnect->RequestDataOnSimObjectType(
            ToDatumRequests(requestedValues),
            radius,
            typeId
        );
        
        dataRequestCallbacks[requestId] = Persistent(callback);
    }
    return info.Env().Undefined();
}

Value CreateDataDefinition(const CallbackInfo& info) {
    if (gpSimConnect) {
        Array requestedValues = info[0].As<Array>();
        auto definitionId = gpSimConnect->CreateDataDefinition(ToDatumRequests(requestedValues));
        return Number::New(info.Env(), definitionId);
    }
    return info.Env().Undefined();
}

Value SetDataOnSimObject(const CallbackInfo& info) {
    String name = info[0].As<String>();
    String unit = info[1].As<String>();
    double value = info[2].As<Number>().DoubleValue();

    gpSimConnect->SetDataOnSimObject(name, unit, value);

    return info.Env().Undefined();
}

Value SetAircraftInitialPosition(const CallbackInfo& info) {
    if (gpSimConnect) {
        Object object = info[0].As<Object>();
        gpSimConnect->SetAircraftInitialPosition(
            getOptionalProp(object, "latitude", Number, Number::DoubleValue, 0.0F),
            getOptionalProp(object, "longitude", Number, Number::DoubleValue, 0.0F),
            getOptionalProp(object, "altitude", Number, Number::DoubleValue, 0.0F),
            getOptionalProp(object, "pitch", Number, Number::DoubleValue, 0.0F),
            getOptionalProp(object, "bank", Number, Number::DoubleValue, 0.0F),
            getOptionalProp(object, "heading", Number, Number::DoubleValue, 0.0F),
            getOptionalProp(object, "onGround", Boolean, Boolean::Value, false),
            getOptionalProp(object, "airspeed", Number, Number::Int64Value, 0.0F)
        );
    }
    return info.Env().Undefined();
}

Value RequestSystemState(const CallbackInfo& info) {
    if (gpSimConnect) {
        std::string stateName = info[0].As<String>();
        Function callback = info[1].As<Function>();
        auto requestId = gpSimConnect->RequestSystemState(stateName);
        dataRequestCallbacks[requestId] = Persistent(callback);
    }
	return info.Env().Undefined();
}

Value FlightLoad(const CallbackInfo& info) {
	if (gpSimConnect) {
		std::string filename = info[0].As<String>().Utf8Value();
        gpSimConnect->FlightLoad(filename);
	}
    return info.Env().Undefined();
}

Value TransmitClientEvent(const CallbackInfo& info) {
    if (gpSimConnect) {
        gpSimConnect->TransmitClientEvent(
            info[0].As<String>(),
            0, // SIMCONNECT_OBJECT_ID_USER
            info[1].As<Number>().Int32Value()
        );
    }
    return info.Env().Undefined();
}

Value IsConnected(const CallbackInfo& info) {
    return Boolean::New(info.Env(), gIsConnected);
}

Value RunCallback(const CallbackInfo& info) {
    Env env = info.Env();
    Function emit = info[0].As<Function>();
    EchoWorker* wk = new EchoWorker(emit);
    wk->Queue();
    return env.Undefined();
};

Object Init(Env env, Object exports) {
    exports.Set(
        String::New(env, "init"),
        Function::New(env, RunCallback)
    );
    exports.Set(
        String::New(env, "subscribeToSystemEvent"),
        Function::New(env, SubscribeToSystemEvent)
    );
    exports.Set(
        String::New(env, "requestDataOnSimObject"),
        Function::New(env, RequestDataOnSimObject)
    );
    exports.Set(
        String::New(env, "setDataOnSimObject"),
        Function::New(env, SetDataOnSimObject)
    );
    exports.Set(
        String::New(env, "requestDataOnSimObjectType"),
        Function::New(env, RequestDataOnSimObjectType)
    );
    exports.Set(
        String::New(env, "setAircraftInitialPosition"),
        Function::New(env, SetAircraftInitialPosition)
    );
    exports.Set(
        String::New(env, "requestSystemState"),
        Function::New(env, RequestSystemState)
    );
    exports.Set(
        String::New(env, "flightLoad"),
        Function::New(env, FlightLoad)
    );
    exports.Set(
        String::New(env, "transmitClientEvent"),
        Function::New(env, TransmitClientEvent)
    );
    exports.Set(
        String::New(env, "createDataDefinition"),
        Function::New(env, CreateDataDefinition)
    );
    exports.Set(
        String::New(env, "isConnected"),
        Function::New(env, CreateDataDefinition)
    );
    return exports;
}

NODE_API_MODULE(node_simconnect, Init);