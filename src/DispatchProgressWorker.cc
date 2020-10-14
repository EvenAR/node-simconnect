#include "DispatchProgressWorker.h"
#include "commons.h"
#include "ISimulatorEventHandler.h"
#include "simconnect-handler.h"

#include <windows.h>
#include <iostream>

DispatchProgressWorker::DispatchProgressWorker(Napi::Env env, SimConnectHandler* simConnect, ISimulatorEventHandler* eventHandler) : AsyncProgressQueueWorker<Data>(env)  { 
    this->eventHandler = eventHandler;
    this->simConnect = simConnect;
}

DispatchProgressWorker::~DispatchProgressWorker() {

}

// This code will be executed on the worker thread
void DispatchProgressWorker::Execute(const ExecutionProgress& progress) {
    while (true) {
        Data nextDispatch = simConnect->NextDispatch();
        if (nextDispatch.type != PayloadType::Nothing) {
            progress.Send(&nextDispatch, 1);
        }
        Sleep(1);
    }
}

// This function is executed on the main (JS) thread
void DispatchProgressWorker::OnProgress(const Data* dispatch, size_t count) {
    switch (dispatch->type) {
        case PayloadType::Nothing: break;
        case PayloadType::Error: {
            ExceptionInfo* pEvent = (ExceptionInfo *)dispatch->payload;
            this->eventHandler->onException(pEvent);
            std::cout << pEvent->exceptionName << std::endl;
            delete pEvent;
        }
        break;
        case PayloadType::Open: {
            SimInfo* pSimInfo = (SimInfo *)dispatch->payload;
            this->eventHandler->onOpen(pSimInfo);
            delete pSimInfo;
        }
        break;
        case PayloadType::Quit: {
            this->eventHandler->onQuit();
        }
        break;
        case PayloadType::EventId: {
            SimEvent* pEvent = (SimEvent *)dispatch->payload;
            this->eventHandler->onEvent(pEvent);
            delete pEvent;
        }
        break;
        case PayloadType::SystemState: {
            SimSystemState* pSystemState = (SimSystemState *)dispatch->payload;
            this->eventHandler->onSystemState(pSystemState);
            delete pSystemState;
        }
        break;
        case PayloadType::SimobjectData: {
            SimobjectDataBatch* pDataBatch = (SimobjectDataBatch *)dispatch->payload;
            this->eventHandler->onSimobjectData(pDataBatch);
            delete pDataBatch;
        }
        break;
        default: {
            std::cout << "Got unknown event " << std::endl;
        }
        break;
    }
}