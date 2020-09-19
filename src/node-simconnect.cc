#include <napi.h>
#include <windows.h>
#include <iostream>

#include "simconnect-handler.h"
#include "commons.h"

using namespace Napi;

SimConnectHandler* gpSimConnect;
std::map<unsigned int, FunctionReference> systemEventCallbacks;
std::map<unsigned int, FunctionReference> dataRequestCallbacks;

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
            case PayloadType::Open: {
                SimInfo* pSimInfo = (SimInfo *)dispatch->payload;
                
                Object obj = Object::New(Env());
                obj.Set("name", String::New(Env(), pSimInfo->name.c_str()));
                obj.Set("version", String::New(Env(), pSimInfo->version.c_str()));

                Callback().Call({ String::New(Env(), "open"), obj });

                delete pSimInfo;
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
                Callback().Call({String::New(Env(), "HOOO")});
            }
            break;
        }
    }

};

Value SubscribeToSystemEvent(const CallbackInfo& info) {
    if (gpSimConnect) {
        String eventName = info[0].As<String>();
        Function callback = info[1].As<Function>();
        
        unsigned int eventId = gpSimConnect->SubscribeToSystemEvent(eventName);
        systemEventCallbacks[eventId] = Persistent(callback);
    }
    return info.Env().Undefined();
};

std::vector<DatumRequest> ToDatumRequests(Array requestedValues) {
    std::vector<DatumRequest> datumRequests;
    for (unsigned int i = 0; i < requestedValues.Length(); i++) {
        if(requestedValues.Get(i).IsArray()) {
            auto options = requestedValues.Get(i).As<Array>();
            
            DatumRequest newRequest;
            newRequest.datumName = options.Get("0").As<String>().Utf8Value();
            newRequest.unitName = options.Get("1").As<String>().Utf8Value();
            newRequest.datumType = options.Get("2").IsNumber() ? options.Get("2").As<Number>().Uint32Value() : 0; 
            newRequest.epsilon = options.Get("3").IsNumber() ? options.Get("3").As<Number>().Uint32Value() : 0; 
            newRequest.datumId = options.Get("4").IsNumber() ? options.Get("4").As<Number>().Uint32Value() : 0; 

            datumRequests.push_back(newRequest);
        }
    }
    return datumRequests;
};

Value RequestDataOnSimObject(const CallbackInfo& info) {
    if (gpSimConnect) {
        unsigned int eventId;

        if (info[0].IsNumber()) {
            unsigned int existingDataDefinitionId = info[0].As<Number>().Uint32Value();
            std::cout << "Data ID requested " << existingDataDefinitionId << std::endl;
            eventId = gpSimConnect->RequestDataOnSimObject(existingDataDefinitionId);
        } else {
            Array requestedValues = info[0].As<Array>();
            eventId = gpSimConnect->RequestDataOnSimObject(ToDatumRequests(requestedValues));
        }
        
        Function callback = info[1].As<Function>();
        dataRequestCallbacks[eventId] = Persistent(callback);
        
        std::cout << "Event ID requested " << eventId << std::endl;
    }
    return info.Env().Undefined();
}

Value RequestDataOnSimObjectType(const CallbackInfo& info) {
    if (gpSimConnect) {
        Array requestedValues = info[0].As<Array>();
        Function callback = info[1].As<Function>();
        unsigned int radius = info.Length() > 2 ? info[2].As<Number>().Uint32Value()  : 0;
		unsigned int typeId = info.Length() > 3 ? info[3].As<Number>().Uint32Value() : 0; // 0 = SIMCONNECT_SIMOBJECT_TYPE_USER

        unsigned int eventId = gpSimConnect->RequestDataOnSimObjectType(
            ToDatumRequests(requestedValues),
            radius,
            typeId
        );
        dataRequestCallbacks[eventId] = Persistent(callback);
    }
    return info.Env().Undefined();
}

Value CreateDataDefinition(const CallbackInfo& info) {
    if (gpSimConnect) {
        Array requestedValues = info[0].As<Array>();
        unsigned int definitionId = gpSimConnect->CreateDataDefinition(ToDatumRequests(requestedValues));
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
        String::New(env, "createDataDefinition"),
        Function::New(env, CreateDataDefinition)
    );
    return exports;
}

NODE_API_MODULE(node_simconnect, Init);