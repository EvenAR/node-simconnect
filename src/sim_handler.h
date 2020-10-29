#ifndef SIM_HANDLER_H
#define SIM_HANDLER_H

#include <napi.h>
#include "simconnect_session.h"
#include "event_handler_interface.h"

class DispatchQueueWorker;

class SimHandler : public Napi::ObjectWrap<SimHandler>, EventHandlerInterface {

    public:
        SimHandler(const Napi::CallbackInfo& info);
        static Napi::Object Init(Napi::Env env);

        bool Open(
            const std::string& appName, 
            const Napi::Function& onOpen,
            const Napi::Function& onQuit,
            const Napi::Function& onException,
            const Napi::Function& onError
        );

        Napi::Value SubscribeToSystemEvent(const Napi::CallbackInfo& info);
        Napi::Value RequestSystemState(const Napi::CallbackInfo& info);
        Napi::Value RequestDataOnSimObject(const Napi::CallbackInfo& info);

        ~SimHandler();

    private:
        SimConnectSession simConnectSession;

        Napi::FunctionReference openCallback;
        Napi::FunctionReference quitCallback;
        Napi::FunctionReference exceptionCallback;
        Napi::FunctionReference errorCallback;

        std::unordered_map<int32_t, Napi::FunctionReference> systemStateCallbacks;
        std::unordered_map<int32_t, Napi::FunctionReference> systemEventCallbacks;
        std::unordered_map<int32_t, Napi::FunctionReference> dataRequestCallbacks;

        DispatchQueueWorker* dispatchQueueWorker;
        std::vector<DatumRequest> ToDatumRequests(Napi::Array requestedValues);

        // Required functions defined EventHandlerInterface
        void onOpen(SimInfo* simInfo);
        void onQuit();
        void onException(ExceptionInfo* exceptionInfo);
        void onError(ErrorInfo* errorInfo);
        void onSystemState(SimSystemState* simSystemState);
        void onEvent(SimEvent* simEvent);
        void onSimobjectData(SimobjectDataBatch* simobjectDataBatch);
        void onSimobjectDataType(SimobjectDataBatch* simobjectDataBatch);
};


#endif