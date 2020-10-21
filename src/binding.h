#ifndef NODE_SIMCONNECT_H
#define NODE_SIMCONNECT_H

#define NAPI_VERSION 6

#include <napi.h>
#include "commons.h"

class DispatchProgressWorker;

class NodeSimconnect : public Napi::ObjectWrap<NodeSimconnect> {
    public:
        NodeSimconnect(const Napi::CallbackInfo& info);
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
    private:
        Napi::ObjectReference simHandler;
        Napi::Value Open(const Napi::CallbackInfo& info);
};

#endif