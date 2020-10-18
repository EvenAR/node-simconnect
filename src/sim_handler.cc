#include "sim_handler.h"
#include "dispatch_queue_worker.h"
#include <iostream>

// Napi utils
#define getOptionalProp(object, name, type, conversion, fallback) \
    object.Has(name) ? object.Get(name).As<type>().conversion() : fallback

#define getOptionalElement(array, index, type, conversion, fallback) \
    array.Length() > index ? array[index].As<type>().conversion() : fallback;

SimHandler::SimHandler(const Napi::CallbackInfo& info) 
: Napi::ObjectWrap<SimHandler>(info) {
    
}

SimHandler::~SimHandler() {
}

void SimHandler::Open(const std::string& appName, Napi::FunctionReference* openCallback) {
    this->openCallback = openCallback;

    if (simConnectSession.Open(appName)) {
        dispatchQueueWorker = new DispatchQueueWorker(Env(), &simConnectSession, this);
        dispatchQueueWorker->Queue();
    } else {
        this->openCallback->Call({
            Napi::String::New(Env(), "Failed to connect")
        });
    }
}

Napi::Object SimHandler::Init(Napi::Env env) {
    return DefineClass(env, "SimHandler", {
        InstanceMethod("subscribeToSystemEvent", &SimHandler::SubscribeToSystemEvent, napi_enumerable),
        InstanceMethod("requestSystemState", &SimHandler::RequestSystemState, napi_enumerable),
        InstanceMethod("requestDataOnSimObject", &SimHandler::RequestDataOnSimObject, napi_enumerable),
    }).New({});
}

Napi::Value SimHandler::RequestSystemState(const Napi::CallbackInfo& info) {
    auto stateName = info[0].As<Napi::String>();
    auto callback = info[1].As<Napi::Function>();
    
    auto requestId = simConnectSession.RequestSystemState(stateName.Utf8Value());
    systemStateCallbacks[requestId] = Persistent(callback);

    return info.Env().Undefined();
};

Napi::Value SimHandler::SubscribeToSystemEvent(const Napi::CallbackInfo& info) {
    auto eventName = info[0].As<Napi::String>();
    auto callback = info[1].As<Napi::Function>();
    
    auto eventId = simConnectSession.SubscribeToSystemEvent(eventName.Utf8Value());
    systemEventCallbacks[eventId] = Persistent(callback);

    return info.Env().Undefined();
};

Napi::Value SimHandler::RequestDataOnSimObject(const Napi::CallbackInfo& info) {
    auto callback = info[1].As<Napi::Function>();
    auto objectId = getOptionalElement(info, 2, Napi::Number, Napi::Number::Uint32Value, 1);
    auto period = getOptionalElement(info, 3, Napi::Number, Napi::Number::Uint32Value, 0);
    auto flags = getOptionalElement(info, 4, Napi::Number, Napi::Number::Uint32Value, 0);

    uint32_t requestId;
    if (info[0].IsNumber()) {
        auto existingDataDefinitionId = info[0].As<Napi::Number>().Uint32Value();
        requestId = simConnectSession.RequestDataOnSimObject(existingDataDefinitionId, objectId, period, flags);
    } else {
        auto requestedValues = info[0].As<Napi::Array>();
        requestId = simConnectSession.RequestDataOnSimObject(ToDatumRequests(requestedValues), objectId, period, flags);
    }
    
    dataRequestCallbacks[requestId] = Persistent(callback);

    return info.Env().Undefined();
};


void SimHandler::onOpen(SimInfo* simInfo) {
    auto object = Napi::Object::New(Env());
    object.Set("name", Napi::String::New(Env(), simInfo->name));
    object.Set("version", Napi::String::New(Env(), simInfo->version));

    this->openCallback->Call({
        Env().Undefined(),
        object,
        this->Value()
    });
}

void SimHandler::onException(ExceptionInfo* exceptionInfo) {
    std::cout << "TODO: ExceptionInfo " << exceptionInfo->exceptionName << std::endl;
}

void SimHandler::onQuit() {
    std::cout << "TODO: Quit :(" << std::endl;
}

void SimHandler::onSystemState(SimSystemState* simSystemState) {
    auto obj = Napi::Object::New(Env());
    obj.Set("integer", Napi::Number::New(Env(), simSystemState->integerValue));
    obj.Set("float", Napi::Number::New(Env(), simSystemState->floatValue));
    obj.Set("string", Napi::String::New(Env(), simSystemState->stringValue.c_str()));
    
    systemStateCallbacks[simSystemState->requestId].Call({obj});
}

void SimHandler::onEvent(SimEvent* simEvent) {
    auto value = Napi::Number::New(Env(), simEvent->value);
    systemEventCallbacks[simEvent->type].Call({value});
}

void SimHandler::onSimobjectData(SimobjectDataBatch* simobjectDataBatch) {
    auto obj = Napi::Object::New(Env());                

    for ( auto const& [datumName, pair] : simobjectDataBatch->values ) {
        DatumType datumType = pair.first;
        void* pDatumValue = pair.second;

        switch (datumType) {
            case DatumType::Num: {
                double* pDouble = (double*)pDatumValue;
                obj.Set(datumName, Napi::Number::New(Env(), *pDouble));
            } break;
            case DatumType::Str: {
                std::string* pString = (std::string*)pDatumValue;
                obj.Set(datumName, Napi::String::New(Env(), pString->c_str()));
            } break;
            default: {
                obj.Set("UNKNOWN_VALUE", Napi::String::New(Env(), "?"));
            } break;
        }
    }
    dataRequestCallbacks[simobjectDataBatch->id].Call({obj});
}

void SimHandler::onSimobjectDataType(SimobjectDataBatch* simobjectDataBatch) {
    std::cout << "TODO: onSimobjectData 2" << std::endl;
}

std::vector<DatumRequest> SimHandler::ToDatumRequests(Napi::Array requestedValues) {
    std::vector<DatumRequest> datumRequests;
    for (uint32_t i = 0; i < requestedValues.Length(); i++) {
        if(requestedValues.Get(i).IsArray()) {
            auto options = requestedValues.Get(i).As<Napi::Array>();
            datumRequests.push_back({
                options.Get("0").As<Napi::String>().Utf8Value(),                      // Name
                options.Get("1").As<Napi::String>().Utf8Value(),                      // Unit name
                getOptionalProp(options, "2", Napi::Number, Napi::Number::Uint32Value, 4)   // Type (4 = SIMCONNECT_DATATYPE_FLOAT64)
            });
        }
    }
    return datumRequests;
};