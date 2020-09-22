#ifndef DISPATCH_WORKER_H
#define DISPATCH_WORKER_H

#include <napi.h>
#include <vector>
#include <map>

using namespace Napi;

class SimConnectHandler;
struct Data;

// TODO: Find a better way to manage callbacks
inline std::map<unsigned int, FunctionReference> systemEventCallbacks;
inline std::map<unsigned int, FunctionReference> dataRequestCallbacks;
inline bool gIsConnected;

class DispatchWorker : public AsyncProgressQueueWorker<Data> {
public:
    DispatchWorker(Function& callback, SimConnectHandler *pSimConnect);
    virtual ~DispatchWorker();
    virtual void Execute(const ExecutionProgress& progress);
    virtual void OnProgress(const Data* dispatch, size_t /* count */);

private:
    SimConnectHandler* pSimConnectHandler;
};

#endif