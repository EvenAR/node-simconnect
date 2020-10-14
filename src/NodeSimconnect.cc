#include "NodeSimconnect.h"
#include "simconnect-handler.h"
#include "NodeSimconnectHandler.h"
#include <iostream>

NodeSimconnect::NodeSimconnect(const Napi::CallbackInfo& info) : Napi::ObjectWrap<NodeSimconnect>(info) { }

Napi::Object NodeSimconnect::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "SimConnect", {
        InstanceMethod<&NodeSimconnect::Open>("open")
    });

    Napi::FunctionReference* constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);
    exports.Set("SimConnect", func);
    env.SetInstanceData<Napi::FunctionReference>(constructor);
    return exports;
}

Napi::Value NodeSimconnect::Open(const Napi::CallbackInfo& info) {
    Napi::String appName = info[0].As<Napi::String>();
    Napi::Function callback = info[1].As<Napi::Function>();

    onOpen = Napi::Persistent(callback);
    simulator = Napi::Persistent(NodeSimconnectHandler::Init(info.Env()));

    NodeSimconnectHandler* s = NodeSimconnectHandler::Unwrap(simulator.Value().ToObject());

    s->Open(appName.Utf8Value(), &onOpen);

    return info.Env().Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    NodeSimconnect::Init(env, exports);
    return exports;
}

NODE_API_MODULE(node_simconnect, Init);