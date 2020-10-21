#include "dispatch_queue_worker.h"
#include "commons.h"
#include "event_handler_interface.h"
#include "simconnect_session.h"

#include <windows.h>
#include <iostream>

DispatchQueueWorker::DispatchQueueWorker(Napi::Env env, SimConnectSession* simConnect, EventHandlerInterface* eventHandler) 
: AsyncProgressQueueWorker<DispatchContent>(env)
, eventHandler(eventHandler)
, simConnect(simConnect)  {  }

DispatchQueueWorker::~DispatchQueueWorker() {
    this->doWork = false;
}

void DispatchQueueWorker::Execute(const ExecutionProgress& progress) {
    this->doWork = true;

    // This code will be executed on the worker thread
    while (this->doWork) {
        DispatchContent nextDispatch = simConnect->NextDispatch();
        if (nextDispatch.type == DispatchContentType::Nothing) {
            Sleep(1);
        } else {
            progress.Send(&nextDispatch, 1);
        }
        if (nextDispatch.type == DispatchContentType::Error || nextDispatch.type == DispatchContentType::Quit) {
            this->doWork = false;
        }
    }
}

// This function is executed on the main (JS) thread
void DispatchQueueWorker::OnProgress(const DispatchContent* dispatch, size_t count) {
    switch (dispatch->type) {
        case DispatchContentType::Nothing: break;
        case DispatchContentType::Error: {
            ErrorInfo* pInfo = (ErrorInfo *)dispatch->payload;
            this->eventHandler->onError(pInfo);
            delete pInfo;
        }
        case DispatchContentType::Quit: {
            this->eventHandler->onQuit();
            this->doWork = false;
        }
        break;
        case DispatchContentType::Exception: {
            ExceptionInfo* pEvent = (ExceptionInfo *)dispatch->payload;
            this->eventHandler->onException(pEvent);
            delete pEvent;
        }
        break;
        case DispatchContentType::Open: {
            SimInfo* pSimInfo = (SimInfo *)dispatch->payload;
            this->eventHandler->onOpen(pSimInfo);
            delete pSimInfo;
        }
        break;
        case DispatchContentType::EventId: {
            SimEvent* pEvent = (SimEvent *)dispatch->payload;
            this->eventHandler->onEvent(pEvent);
            delete pEvent;
        }
        break;
        case DispatchContentType::SystemState: {
            SimSystemState* pSystemState = (SimSystemState *)dispatch->payload;
            this->eventHandler->onSystemState(pSystemState);
            delete pSystemState;
        }
        break;
        case DispatchContentType::SimobjectData: {
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