#ifndef DISPATCH_PROGRESS_WORKER_H
#define DISPATCH_PROGRESS_WORKER_H

#include <napi.h>

class EventHandlerInterface;
class SimConnectSession;
struct DispatchContent;

class DispatchQueueWorker : public Napi::AsyncProgressQueueWorker<DispatchContent> {

public:
    DispatchQueueWorker(Napi::Env env, SimConnectSession* simConnect, EventHandlerInterface* eventHandler);
    ~DispatchQueueWorker();
    void Execute(const ExecutionProgress& progress);
    void OnProgress(const DispatchContent* dispatch, size_t /* count */);

private:
    EventHandlerInterface* eventHandler;
    SimConnectSession* simConnect;
};

#endif