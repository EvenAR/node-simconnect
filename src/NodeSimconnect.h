#ifndef NODE_SIMCONNECT_H
#define NODE_SIMCONNECT_H

#define NAPI_VERSION 6

#include <napi.h>
#include "commons.h"

class SimConnectHandler;
class DispatchProgressWorker;

class NodeSimconnect : public Napi::ObjectWrap<NodeSimconnect> {
    public:
        NodeSimconnect(const Napi::CallbackInfo& info);
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        Napi::Value Open(const Napi::CallbackInfo& info);

        //Napi::Value SubscribeToSystemEvent(const Napi::CallbackInfo& info);

    private:
        Napi::ObjectReference simulator;
        Napi::FunctionReference onOpen;
};

#endif