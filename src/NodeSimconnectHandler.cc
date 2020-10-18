#include "NodeSimconnectHandler.h"
#include "DispatchProgressWorker.h"
#include <iostream>

// Napi utils
#define getOptionalProp(object, name, type, conversion, fallback) \
    object.Has(name) ? object.Get(name).As<type>().conversion() : fallback

#define getOptionalElement(array, index, type, conversion, fallback) \
    array.Length() > index ? array[index].As<type>().conversion() : fallback;
// Napi utils

NodeSimconnectHandler::NodeSimconnectHandler(const Napi::CallbackInfo& info) 
: Napi::ObjectWrap<NodeSimconnectHandler>(info) {
    std::cout << "Constr" << std::endl;
}

NodeSimconnectHandler::~NodeSimconnectHandler() {
}

void NodeSimconnectHandler::Open(const std::string& appName, Napi::FunctionReference* openCallback) {
    this->openCallback = openCallback;

    if (handler.Open(appName)) {
        wk = new DispatchProgressWorker(Env(), &handler, this);
        wk->Queue();
    } else {
        this->openCallback->Call({
            Napi::String::New(Env(), "Failed to connect")
        });
    }
}

Napi::Object NodeSimconnectHandler::Init(Napi::Env env) {
    return DefineClass(env, "NodeSimconnectHandler", {
        InstanceMethod("subscribeToSystemEvent", &NodeSimconnectHandler::SubscribeToSystemEvent, napi_enumerable),
        InstanceMethod("requestSystemState", &NodeSimconnectHandler::RequestSystemState, napi_enumerable),
        InstanceMethod("requestDataOnSimObject", &NodeSimconnectHandler::RequestDataOnSimObject, napi_enumerable),
    }).New({});
}

Napi::Value NodeSimconnectHandler::RequestSystemState(const Napi::CallbackInfo& info) {
    Napi::String stateName = info[0].As<Napi::String>();
    Napi::Function callback = info[1].As<Napi::Function>();
    
    auto requestId = handler.RequestSystemState(stateName.Utf8Value());
    systemStateCallbacks[requestId] = Persistent(callback);

    return info.Env().Undefined();
};

Napi::Value NodeSimconnectHandler::SubscribeToSystemEvent(const Napi::CallbackInfo& info) {
    Napi::String eventName = info[0].As<Napi::String>();
    Napi::Function callback = info[1].As<Napi::Function>();
    
    auto eventId = handler.SubscribeToSystemEvent(eventName.Utf8Value());
    systemEventCallbacks[eventId] = Persistent(callback);

    return info.Env().Undefined();
};

Napi::Value NodeSimconnectHandler::RequestDataOnSimObject(const Napi::CallbackInfo& info) {
    Napi::Function callback = info[1].As<Napi::Function>();
    auto objectId = getOptionalElement(info, 2, Napi::Number, Napi::Number::Uint32Value, 1);
    auto period = getOptionalElement(info, 3, Napi::Number, Napi::Number::Uint32Value, 0);
    auto flags = getOptionalElement(info, 4, Napi::Number, Napi::Number::Uint32Value, 0);

    uint32_t requestId;
    if (info[0].IsNumber()) {
        auto existingDataDefinitionId = info[0].As<Napi::Number>().Uint32Value();
        requestId = handler.RequestDataOnSimObject(existingDataDefinitionId, objectId, period, flags);
    } else {
        Napi::Array requestedValues = info[0].As<Napi::Array>();
        requestId = handler.RequestDataOnSimObject(ToDatumRequests(requestedValues), objectId, period, flags);
    }
    
    dataRequestCallbacks[requestId] = Persistent(callback);

    return info.Env().Undefined();
};


void NodeSimconnectHandler::onOpen(SimInfo* simInfo) {
    Napi::Object object = Napi::Object::New(Env());
    object.Set("name", Napi::String::New(Env(), simInfo->name));
    object.Set("version", Napi::String::New(Env(), simInfo->version));

    this->openCallback->Call({
        Env().Undefined(),
        object,
        this->Value()
    });
}

void NodeSimconnectHandler::onException(ExceptionInfo* exceptionInfo) {
    std::cout << "TODO: ExceptionInfo " << exceptionInfo->exceptionName << std::endl;
}

void NodeSimconnectHandler::onQuit() {
    std::cout << "TODO: Quit :(" << std::endl;
}

void NodeSimconnectHandler::onSystemState(SimSystemState* simSystemState) {
    Napi::Object obj = Napi::Object::New(Env());
    obj.Set("integer", Napi::Number::New(Env(), simSystemState->integerValue));
    obj.Set("float", Napi::Number::New(Env(), simSystemState->floatValue));
    obj.Set("string", Napi::String::New(Env(), simSystemState->stringValue.c_str()));
    
    systemStateCallbacks[simSystemState->requestId].Call({obj});
}

void NodeSimconnectHandler::onEvent(SimEvent* simEvent) {
    Napi::Number value = Napi::Number::New(Env(), simEvent->value);
    systemEventCallbacks[simEvent->type].Call({value});
}

void NodeSimconnectHandler::onSimobjectData(SimobjectDataBatch* simobjectDataBatch) {
    Napi::Object obj = Napi::Object::New(Env());                

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

void NodeSimconnectHandler::onSimobjectDataType(SimobjectDataBatch* simobjectDataBatch) {
    std::cout << "TODO: onSimobjectData 2" << std::endl;
}

std::vector<DatumRequest> NodeSimconnectHandler::ToDatumRequests(Napi::Array requestedValues) {
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