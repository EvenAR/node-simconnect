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
}

void DispatchQueueWorker::Execute(const ExecutionProgress& progress) {
    // This code will be executed on the worker thread
    while (true) {
        DispatchContent nextDispatch = simConnect->NextDispatch();
        if (nextDispatch.type == DispatchContentType::Nothing) {
            Sleep(1);
        } else {
            progress.Send(&nextDispatch, 1);
        }
        if (nextDispatch.type == DispatchContentType::Error || nextDispatch.type == DispatchContentType::Quit) {
            break;  // This will make this worker destroy itself
        }
    }
}

// This function is executed on the main (JS) thread
void DispatchQueueWorker::OnProgress(const DispatchContent* dispatch, size_t count) {
    switch (dispatch->type) {
        case DispatchContentType::Nothing: break;
        case DispatchContentType::Error: {
            this->eventHandler->onError(std::static_pointer_cast<ErrorInfo>(dispatch->payload));
        }
        break;
        case DispatchContentType::Quit: {
            this->eventHandler->onQuit();
        }
        break;
        case DispatchContentType::Exception: {
            this->eventHandler->onException(std::static_pointer_cast<ExceptionInfo>(dispatch->payload));
        }
        break;
        case DispatchContentType::open: {
            this->eventHandler->onOpen(std::static_pointer_cast<SimInfo>(dispatch->payload));
        }
        break;
        case DispatchContentType::EventId: {
            this->eventHandler->onEvent(std::static_pointer_cast<SimEvent>(dispatch->payload));
        }
        break;
        case DispatchContentType::SystemState: {
            this->eventHandler->onSystemState(std::static_pointer_cast<SimSystemState>(dispatch->payload));
        }
        break;
        case DispatchContentType::SimobjectData: {
            this->eventHandler->onSimobjectData(std::static_pointer_cast<SimobjectDataBatch>(dispatch->payload));
        }
        break;
        default: {
            std::cout << "Got unknown event " << std::endl;
        }
        break;
    }
}
