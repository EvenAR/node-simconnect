#ifndef SIMCONNECT_HANDLER_H
#define SIMCONNECT_HANDLER_H

#include <string>
#include <vector>
#include <map>
#include <windows.h>

#include "commons.h"

struct SIMCONNECT_RECV;
struct DataBatchDefinition;

class SimConnectSession {

public:
    SimConnectSession();
    bool Open(const std::string& appName);
    bool Close();

    DispatchContent NextDispatch();

    uint32_t SubscribeToSystemEvent(const std::string& eventName);
    uint32_t RequestDataOnSimObject(uint32_t existingDataDefinitionId, uint32_t objectId, uint32_t period, uint32_t flags);
    uint32_t RequestDataOnSimObject(std::vector<DatumRequest> datumRequests, uint32_t objectId, uint32_t period, uint32_t flags);
    uint32_t RequestDataOnSimObjectType(std::vector<DatumRequest> datumRequests, uint32_t radius, uint32_t simobjectType);
    uint32_t SetDataOnSimObject(std::string datumName, std::string unitsName, double value);
    uint32_t SetAircraftInitialPosition(
        double lat,
        double lng,
        double altitude,
        double pitch,
        double bank,
        double heading,
        bool onGround,
        unsigned long airspeed
    );
    uint32_t RequestSystemState(std::string stateName);
    uint32_t FlightLoad(std::string fileName);
    uint32_t TransmitClientEvent(std::string eventName, uint32_t objectId, int data);
    uint32_t CreateDataDefinition(std::vector<DatumRequest> datumRequests);

    void ErrorReported();
   
private:
    HANDLE hSimConnect;
    ErrorInfo* fatalError;

    DispatchContent Process(SIMCONNECT_RECV* pData, DWORD cbData);
    void HandleError(const std::string& name, NTSTATUS code);

    ExceptionInfo* GetExceptionInfo(SIMCONNECT_RECV *pData);
    SimEvent* GetEvent(SIMCONNECT_RECV *pData);
    SimInfo* GetSimInfo(SIMCONNECT_RECV *pData);
    SimSystemState* GetSystemState(SIMCONNECT_RECV *pData);
    SimobjectDataBatch* GetSimObjectData(SIMCONNECT_RECV *pData, DWORD cbData);
    DataBatchDefinition GenerateDataDefinition(std::vector<DatumRequest> datumRequests);
};



#endif