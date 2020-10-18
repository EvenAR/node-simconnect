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
    auto callback = info[1].As<Napi::Function>();

    onOpen = Napi::Persistent(callback);
    simulator = Napi::Persistent(SimHandler::Init(info.Env()));

    SimHandler* s = SimHandler::Unwrap(simulator.Value().ToObject());

    s->Open(appName.Utf8Value(), &onOpen);

    return info.Env().Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    NodeSimconnect::Init(env, exports);
    return exports;
}

NODE_API_MODULE(node_simconnect, Init);