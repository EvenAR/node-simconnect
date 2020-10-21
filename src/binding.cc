#include "binding.h"
#include "simconnect_session.h"
#include "sim_handler.h"
#include <iostream>

NodeSimconnect::NodeSimconnect(const Napi::CallbackInfo& info) : Napi::ObjectWrap<NodeSimconnect>(info) { }

Napi::Object NodeSimconnect::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function classFunction = DefineClass(env, "SimConnect", {
        InstanceMethod<&NodeSimconnect::Open>("open")
    });

    auto constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(classFunction);
    exports.Set("SimConnect", classFunction);
    env.SetInstanceData<Napi::FunctionReference>(constructor);
    return exports;
}

Napi::Value NodeSimconnect::Open(const Napi::CallbackInfo& info) {
    auto appName = info[0].As<Napi::String>();

    auto onOpen = info[1].As<Napi::Function>();
    auto onQuit = info[2].As<Napi::Function>();
    auto onException = info[3].As<Napi::Function>();
    auto onError = info[4].As<Napi::Function>();

    simHandler = Napi::Persistent(SimHandler::Init(info.Env()));

    SimHandler* simHandlerInstance = SimHandler::Unwrap(simHandler.Value().ToObject());
    bool ok = simHandlerInstance->Open(appName.Utf8Value(), onOpen, onQuit, onException, onError);

    return Napi::Boolean::New(info.Env(), ok);
}

Napi::Object InitModule(Napi::Env env, Napi::Object exports) {
    NodeSimconnect::Init(env, exports);
    return exports;
}

NODE_API_MODULE(node_simconnect, InitModule);