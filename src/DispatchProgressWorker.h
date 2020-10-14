#ifndef DISPATCH_PROGRESS_WORKER_H
#define DISPATCH_PROGRESS_WORKER_H

#include <napi.h>

class ISimulatorEventHandler;
class SimConnectHandler;
struct Data;

class DispatchProgressWorker : public Napi::AsyncProgressQueueWorker<Data> {

public:
    DispatchProgressWorker(Napi::Env env, SimConnectHandler* simConnect, ISimulatorEventHandler* eventHandler);
    ~DispatchProgressWorker();
    void Execute(const ExecutionProgress& progress);
    void OnProgress(const Data* dispatch, size_t /* count */);

private:
    ISimulatorEventHandler* eventHandler;
    SimConnectHandler* simConnect;
};

#endif