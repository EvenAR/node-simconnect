#include "client_handler.h"
#include "dispatch_queue_worker.h"
#include <iostream>
#include <optional>

// Napi utils
#define getOptionalProp(object, name, type, conversion, fallback) \
    object.Has(name) ? object.Get(name).As<type>().conversion() : fallback

#define getOptionalElement(array, index, type, conversion, fallback) \
    array.Length() > index ? array[index].As<type>().conversion() : fallback;

ClientHandler::ClientHandler(const Napi::CallbackInfo& info) 
: Napi::ObjectWrap<ClientHandler>(info) {
    
}

ClientHandler::~ClientHandler() {

}

Napi::Object ClientHandler::init(Napi::Env env) {
    return DefineClass(env, "ClientHandler", {
        InstanceMethod("requestDataOnSimObject", &ClientHandler::requestDataOnSimObject, napi_enumerable),
        InstanceMethod("requestDataOnSimObjectType", &ClientHandler::requestDataOnSimObjectType, napi_enumerable),
        InstanceMethod("createDataDefinition", &ClientHandler::createDataDefinition, napi_enumerable),
        InstanceMethod("setDataOnSimObject", &ClientHandler::setDataOnSimObject, napi_enumerable),
        InstanceMethod("subscribeToSystemEvent", &ClientHandler::subscribeToSystemEvent, napi_enumerable),
        InstanceMethod("requestSystemState", &ClientHandler::requestSystemState, napi_enumerable),
        InstanceMethod("close", &ClientHandler::close, napi_enumerable),
    }).New({});
}

bool ClientHandler::open(
    const std::string& appName, 
    const Napi::Function& onOpen,
    const Napi::Function& onQuit,
    const Napi::Function& onException,
    const Napi::Function& onError
) {
    if (simConnectSession.open(appName)) {
        openCallback = Napi::Persistent(onOpen);
        quitCallback = Napi::Persistent(onQuit);
        exceptionCallback = Napi::Persistent(onException);
        errorCallback = Napi::Persistent(onError);

        dispatchQueueWorker = new DispatchQueueWorker(Env(), &simConnectSession, this);
        dispatchQueueWorker->Queue();

        return true;
    } 
    errorCallback.Call({
        Napi::String::New(Env(), "Failed to connect")
    });
    return false;
}

Napi::Value ClientHandler::requestSystemState(const Napi::CallbackInfo& info) {
    auto stateName = info[0].As<Napi::String>();
    auto callback = info[1].As<Napi::Function>();
    
    auto requestId = simConnectSession.requestSystemState(stateName.Utf8Value());
    systemStateCallbacks[requestId] = Persistent(callback);

    return info.Env().Undefined();
};

Napi::Value ClientHandler::subscribeToSystemEvent(const Napi::CallbackInfo& info) {
    auto eventName = info[0].As<Napi::String>();
    auto callback = info[1].As<Napi::Function>();
    
    auto eventId = simConnectSession.subscribeToSystemEvent(eventName.Utf8Value());
    systemEventCallbacks[eventId] = Persistent(callback);

    return info.Env().Undefined();
}

Napi::Value ClientHandler::requestDataOnSimObject(const Napi::CallbackInfo& info) {
    auto callback = info[1].As<Napi::Function>();
    auto objectId = getOptionalElement(info, 2, Napi::Number, Napi::Number::Uint32Value, 1);
    auto period = getOptionalElement(info, 3, Napi::Number, Napi::Number::Uint32Value, 0);
    auto flags = getOptionalElement(info, 4, Napi::Number, Napi::Number::Uint32Value, 0);

    unsigned int requestId;
    if (info[0].IsNumber()) {
        auto existingDataDefinitionId = info[0].As<Napi::Number>().Uint32Value();
        requestId = simConnectSession.requestDataOnSimObject(existingDataDefinitionId, objectId, period, flags);
    } else {
        auto requestedValues = info[0].As<Napi::Array>();
        requestId = simConnectSession.requestDataOnSimObject(toDatumRequests(requestedValues), objectId, period, flags);
    }
    
    dataRequestCallbacks[requestId] = Persistent(callback);

    return info.Env().Undefined();
}

Napi::Value ClientHandler::createDataDefinition(const Napi::CallbackInfo& info) {
    auto requestedValues = info[0].As<Napi::Array>();
    auto definitionId = simConnectSession.createDataDefinition(toDatumRequests(requestedValues));

    return Napi::Number::New(info.Env(), definitionId);
};

Napi::Value ClientHandler::requestDataOnSimObjectType(const Napi::CallbackInfo& info) {
    auto callback = info[1].As<Napi::Function>();
    auto radius = getOptionalElement(info, 2, Napi::Number, Napi::Number::Uint32Value, 0);
    auto type = getOptionalElement(info, 3, Napi::Number, Napi::Number::Uint32Value, 0);

    unsigned int requestId;
    if (info[0].IsNumber()) {
        auto existingDataDefinitionId = info[0].As<Napi::Number>().Uint32Value();
        requestId = simConnectSession.requestDataOnSimObjectType(existingDataDefinitionId, radius, type);
    } else {
        auto requestedValues = info[0].As<Napi::Array>();
        requestId = simConnectSession.requestDataOnSimObjectType(toDatumRequests(requestedValues), radius, type);
    }

    dataRequestCallbacks[requestId] = Persistent(callback);

    return info.Env().Undefined();
};

Napi::Value ClientHandler::setDataOnSimObject(const Napi::CallbackInfo& info) {
    auto datumName = info[0].As<Napi::String>();
    auto unitName = info[1].As<Napi::String>();
    auto value = info[2].As<Napi::Number>().DoubleValue();

    simConnectSession.setDataOnSimObject(datumName, unitName, value);

    return info.Env().Undefined();
};

Napi::Value ClientHandler::close(const Napi::CallbackInfo& info) {
    auto success = simConnectSession.close();

    return Napi::Boolean::New(info.Env(), success);
};

void ClientHandler::onOpen(SimInfo* simInfo) {
    auto object = Napi::Object::New(Env());
    object.Set("name", Napi::String::New(Env(), simInfo->name));
    object.Set("version", Napi::String::New(Env(), simInfo->version));

    openCallback.Call({
        object,
        Value()
    });
}

void ClientHandler::onException(ExceptionInfo* exceptionInfo) {
    auto obj = Napi::Object::New(Env());
    obj.Set("dwException", Napi::Number::New(Env(), exceptionInfo->exception));
    obj.Set("dwSendID", Napi::Number::New(Env(), exceptionInfo->packetId));
    obj.Set("dwIndex", Napi::Number::New(Env(), exceptionInfo->parameterIndex));
    obj.Set("name", Napi::String::New(Env(), exceptionInfo->exceptionName));
    exceptionCallback.Call({obj});
}

void ClientHandler::onError(ErrorInfo* errorInfo) {
    auto obj = Napi::Object::New(Env());
    obj.Set("NTSTATUS", Napi::String::New(Env(), errorInfo->code));
    obj.Set("message", Napi::String::New(Env(), errorInfo->text));
    errorCallback.Call({obj});
}

void ClientHandler::onQuit() {
    quitCallback.Call({});
}

void ClientHandler::onSystemState(SimSystemState* simSystemState) {
    auto obj = Napi::Object::New(Env());
    obj.Set("integer", Napi::Number::New(Env(), simSystemState->integerValue));
    obj.Set("float", Napi::Number::New(Env(), simSystemState->floatValue));
    obj.Set("string", Napi::String::New(Env(), simSystemState->stringValue.c_str()));
    
    systemStateCallbacks[simSystemState->requestId].Call({obj});
}

void ClientHandler::onEvent(SimEvent* simEvent) {
    auto value = Napi::Number::New(Env(), simEvent->value);
    systemEventCallbacks[simEvent->type].Call({value});
}

void ClientHandler::onSimobjectData(SimobjectDataBatch* simobjectDataBatch) {
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

void ClientHandler::onSimobjectDataType(SimobjectDataBatch* simobjectDataBatch) {
    std::cout << "TODO: onSimobjectData 2" << std::endl;
}

std::vector<DatumRequest> ClientHandler::toDatumRequests(Napi::Array requestedValues) {
    std::vector<DatumRequest> datumRequests;
    for (unsigned int i = 0; i < requestedValues.Length(); i++) {
        auto element = requestedValues.Get(i);
        if(element.IsArray()) {
            auto options = element.As<Napi::Array>();
            auto datumName = options.Get("0").As<Napi::String>().Utf8Value();
            auto unitName = options.Get("1").IsNull() ? std::nullopt : std::optional<std::string>{ options.Get("1").As<Napi::String>().Utf8Value() };
            auto dataType = options.Get("2").IsUndefined() ? std::nullopt : std::optional<unsigned int>{ options.Get("2").As<Napi::Number>().Uint32Value() }; 

            datumRequests.push_back({
                datumName,
                unitName,
                dataType
            });
        }
    }
    return datumRequests;
};
