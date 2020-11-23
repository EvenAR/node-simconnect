#include "client_handler.h"
#include "dispatch_queue_worker.h"
#include <iostream>

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

Napi::Object ClientHandler::init(Napi::Env env) {
    return DefineClass(env, "ClientHandler", {
        InstanceMethod("subscribeToSystemEvent", &ClientHandler::subscribeToSystemEvent, napi_enumerable),
        InstanceMethod("requestSystemState", &ClientHandler::requestSystemState, napi_enumerable),
        InstanceMethod("requestDataOnSimObject", &ClientHandler::requestDataOnSimObject, napi_enumerable),
    }).New({});
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
};

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
