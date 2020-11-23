#ifndef SIM_HANDLER_H
#define SIM_HANDLER_H

#include <napi.h>
#include "simconnect_session.h"
#include "event_handler_interface.h"

class DispatchQueueWorker;

class ClientHandler : public Napi::ObjectWrap<ClientHandler>, EventHandlerInterface {

    public:
        ClientHandler(const Napi::CallbackInfo& info);
        static Napi::Object init(Napi::Env env);

        bool open(
            const std::string& appName, 
            const Napi::Function& onOpen,
            const Napi::Function& onQuit,
            const Napi::Function& onException,
            const Napi::Function& onError
        );

        Napi::Value subscribeToSystemEvent(const Napi::CallbackInfo& info);
        Napi::Value requestSystemState(const Napi::CallbackInfo& info);
        Napi::Value requestDataOnSimObject(const Napi::CallbackInfo& info);

        ~ClientHandler();

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
        std::vector<DatumRequest> toDatumRequests(Napi::Array requestedValues);

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
