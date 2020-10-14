#ifndef NODE_SIMCONNECT_HANDLER_H
#define NODE_SIMCONNECT_HANDLER_H

#include <napi.h>
#include "simconnect-handler.h"
#include "ISimulatorEventHandler.h"

class DispatchProgressWorker;

class NodeSimconnectHandler : public Napi::ObjectWrap<NodeSimconnectHandler>, ISimulatorEventHandler {

    public:
        NodeSimconnectHandler(const Napi::CallbackInfo& info);
        static Napi::Object Init(Napi::Env env);
        void Open(const std::string& appName, Napi::FunctionReference* openCallback);

        Napi::Value SubscribeToSystemEvent(const Napi::CallbackInfo& info);
        Napi::Value RequestSystemState(const Napi::CallbackInfo& info);
        Napi::Value RequestDataOnSimObject(const Napi::CallbackInfo& info);

        ~NodeSimconnectHandler();

    private:
        std::unordered_map<int32_t, Napi::FunctionReference> systemStateCallbacks;
        std::unordered_map<int32_t, Napi::FunctionReference> systemEventCallbacks;
        std::unordered_map<int32_t, Napi::FunctionReference> dataRequestCallbacks;
        Napi::FunctionReference* openCallback;
        SimConnectHandler handler;
        DispatchProgressWorker* wk;

        void onOpen(SimInfo* simInfo);
        void onQuit();
        void onException(ExceptionInfo* exceptionInfo);
        void onSystemState(SimSystemState* simSystemState);
        void onEvent(SimEvent* simEvent);
        void onSimobjectData(SimobjectDataBatch* simobjectDataBatch);
        void onSimobjectDataType(SimobjectDataBatch* simobjectDataBatch);

        // Utils
        std::vector<DatumRequest> ToDatumRequests(Napi::Array requestedValues);
};


#endif