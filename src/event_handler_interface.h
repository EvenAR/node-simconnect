#include "commons.h"

class EventHandlerInterface {
public:
    virtual void onOpen(SimInfo* data) = 0;
    virtual void onQuit() = 0;
    virtual void onException(ExceptionInfo* data) = 0;
    virtual void onError(ErrorInfo* data) = 0;
    virtual void onSystemState(SimSystemState* data) = 0;
    virtual void onEvent(SimEvent* data) = 0;
    virtual void onSimobjectData(SimobjectDataBatch* data) = 0;
    virtual void onSimobjectDataType(SimobjectDataBatch* data) = 0;
};