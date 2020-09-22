#include <napi.h>
#include <windows.h>
#include <iostream>

#include "simconnect-handler.h"
#include "dispatch-worker.h"
#include "commons.h"

using namespace Napi;

// Napi helpers
#define getOptionalProp(object, name, type, conversion, fallback) \
    object.Has(name) ? object.Get(name).As<type>().conversion() : fallback

#define getOptionalElement(array, index, type, conversion, fallback) \
    array.Length() > index ? array[index].As<type>().conversion() : fallback;

#define setFunction(env, object, name, function) \
    object.Set(String::New(env, name), Function::New(env, function));


SimConnectHandler* gpSimConnect = NULL;

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
    String appName = info[0].As<String>();
    Function emit = info[1].As<Function>();
    
    gpSimConnect = new SimConnectHandler();

    if (gpSimConnect->Open(appName.Utf8Value().c_str())) {
        DispatchWorker* wk = new DispatchWorker(emit, gpSimConnect);
        wk->Queue();
        return Boolean::New(env, true);
    }
    std::cout << "Failed to open connection with SimConnect" << std::endl;
    return Boolean::New(env, false);
};

Object Init(Env env, Object exports) {
    setFunction(env, exports, "init", RunCallback)
    setFunction(env, exports, "subscribeToSystemEvent", SubscribeToSystemEvent)
    setFunction(env, exports, "requestDataOnSimObject", RequestDataOnSimObject)
    setFunction(env, exports, "requestDataOnSimObjectType", RequestDataOnSimObjectType)
    setFunction(env, exports, "setDataOnSimObject", SetDataOnSimObject)
    setFunction(env, exports, "setAircraftInitialPosition", SetAircraftInitialPosition)
    setFunction(env, exports, "requestSystemState", RequestSystemState)
    setFunction(env, exports, "flightLoad", FlightLoad)
    setFunction(env, exports, "transmitClientEvent", TransmitClientEvent)
    setFunction(env, exports, "createDataDefinition", CreateDataDefinition)
    setFunction(env, exports, "isConnected", IsConnected)
    return exports;
}

NODE_API_MODULE(node_simconnect, Init);