#ifndef SIMCONNECT_SESSION_H
#define SIMCONNECT_SESSION_H

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
    bool open(const std::string& appName);
    bool close();

    DispatchContent NextDispatch();

    unsigned int subscribeToSystemEvent(const std::string& eventName);

    unsigned int requestDataOnSimObject(std::vector<DatumRequest> datumRequests, unsigned int objectId, unsigned int period, unsigned int flags);
    unsigned int requestDataOnSimObject(unsigned int existingDataDefinitionId, unsigned int objectId, unsigned int period, unsigned int flags);

    unsigned int requestDataOnSimObjectType(std::vector<DatumRequest> datumRequests, unsigned int radius, unsigned int simobjectType);
    unsigned int requestDataOnSimObjectType(unsigned int existingDataDefinitionId, unsigned int radius, unsigned int simobjectType);

    unsigned int setDataOnSimObject(std::string datumName, std::string unitsName, double value);

    unsigned int setAircraftInitialPosition(
        double lat,
        double lng,
        double altitude,
        double pitch,
        double bank,
        double heading,
        bool onGround,
        unsigned long airspeed
    );
    unsigned int requestSystemState(std::string stateName);
    unsigned int flightLoad(std::string fileName);
    unsigned int transmitClientEvent(std::string eventName, unsigned int objectId, int data);
    unsigned int createDataDefinition(std::vector<DatumRequest> datumRequests);
   
private:
    HANDLE hSimConnect;
    ErrorInfo* fatalError;

    DispatchContent process(SIMCONNECT_RECV* pData, DWORD cbData);
    void handleError(const std::string& name, NTSTATUS code);

    ExceptionInfo* getExceptionInfo(SIMCONNECT_RECV *pData);
    SimEvent* getEvent(SIMCONNECT_RECV *pData);
    SimInfo* getSimInfo(SIMCONNECT_RECV *pData);
    SimSystemState* getSystemState(SIMCONNECT_RECV *pData);
    SimobjectDataBatch* getSimObjectData(SIMCONNECT_RECV *pData, DWORD cbData);
    DataBatchDefinition generateDataDefinition(std::vector<DatumRequest> datumRequests);
};



#endif
