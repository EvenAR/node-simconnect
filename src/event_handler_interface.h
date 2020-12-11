#include "commons.h"

class EventHandlerInterface {
public:
    virtual void onOpen(std::shared_ptr<SimInfo> data) = 0;
    virtual void onQuit() = 0;
    virtual void onException(std::shared_ptr<ExceptionInfo> data) = 0;
    virtual void onError(std::shared_ptr<ErrorInfo> data) = 0;
    virtual void onSystemState(std::shared_ptr<SimSystemState> data) = 0;
    virtual void onEvent(std::shared_ptr<SimEvent> data) = 0;
    virtual void onSimobjectData(std::shared_ptr<SimobjectDataBatch> data) = 0;
};
