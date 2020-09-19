#ifndef SIMCONNECT_HANDLER_H
#define SIMCONNECT_HANDLER_H

#include <string>
#include <vector>
#include <map>

#include "commons.h"

struct SIMCONNECT_RECV;
struct DataBatchDefinition;

class SimConnectHandler {

public:
    SimConnectHandler();
    bool Open(std::string appName);
    Data NextDispatch();

    unsigned int SubscribeToSystemEvent(std::string eventName);
    unsigned int RequestDataOnSimObject(unsigned int existingDataDefinitionId);
    unsigned int RequestDataOnSimObject(std::vector<DatumRequest> datumRequests);
    unsigned int RequestDataOnSimObjectType(std::vector<DatumRequest> datumRequests, unsigned int radius, unsigned int simobjectType);
    unsigned int SetDataOnSimObject(std::string datumName, std::string unitsName, double value);
    unsigned int CreateDataDefinition(std::vector<DatumRequest> datumRequests);
   
private:
    Data Process(SIMCONNECT_RECV* pData, DWORD cbData);

    SimEvent* GetEvent(SIMCONNECT_RECV *pData);
    SimInfo* GetSimInfo(SIMCONNECT_RECV *pData);
    SimobjectDataBatch* GetSimObjectData(SIMCONNECT_RECV *pData, DWORD cbData);
    DataBatchDefinition GenerateDataDefinition(std::vector<DatumRequest> datumRequests);
};



#endif