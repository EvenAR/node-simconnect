#include "commons.h"

class EventHandlerInterface {
public:
    virtual void onException(ExceptionInfo* exception) = 0;
    virtual void onOpen(SimInfo* simInfo) = 0;
    virtual void onQuit() = 0;
    virtual void onSystemState(SimSystemState* exception) = 0;
    virtual void onEvent(SimEvent* exception) = 0;
    virtual void onSimobjectData(SimobjectDataBatch* exception) = 0;
    virtual void onSimobjectDataType(SimobjectDataBatch* exception) = 0;
};