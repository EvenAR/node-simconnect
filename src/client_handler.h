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

        Napi::Value requestSystemState(const Napi::CallbackInfo& info);
        Napi::Value requestDataOnSimObject(const Napi::CallbackInfo& info);
        Napi::Value createDataDefinition(const Napi::CallbackInfo& info);
        Napi::Value requestDataOnSimObjectType(const Napi::CallbackInfo& info);
        Napi::Value setDataOnSimObject(const Napi::CallbackInfo& info);
        Napi::Value subscribeToSystemEvent(const Napi::CallbackInfo& info);
        Napi::Value close(const Napi::CallbackInfo& info);

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

        DispatchQueueWorker* dispatchQueueWorker = nullptr;
        std::vector<DatumRequest> toDatumRequests(Napi::Array requestedValues);

        // Required functions defined EventHandlerInterface
        void onOpen(std::shared_ptr<SimInfo> simInfo);
        void onQuit();
        void onException(std::shared_ptr<ExceptionInfo> exceptionInfo);
        void onError(std::shared_ptr<ErrorInfo> errorInfo);
        void onSystemState(std::shared_ptr<SimSystemState> simSystemState);
        void onEvent(std::shared_ptr<SimEvent> simEvent);
        void onSimobjectData(std::shared_ptr<SimobjectDataBatch> simobjectDataBatch);
};


#endif
