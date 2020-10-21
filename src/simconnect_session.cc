#include <windows.h>
#include <winternl.h>
#include <SimConnect.h>
#include <iostream>
#include <sstream>
#include <assert.h>

#include "simconnect_session.h"

#define check(hr) { if(hr != S_OK) HandleError(__FUNCTION__, hr); }

std::map<SIMCONNECT_EXCEPTION, const char*> exceptionNames = {
	{ SIMCONNECT_EXCEPTION_NONE, "SIMCONNECT_EXCEPTION_NONE" },
	{ SIMCONNECT_EXCEPTION_ERROR, "SIMCONNECT_EXCEPTION_ERROR" },
	{ SIMCONNECT_EXCEPTION_SIZE_MISMATCH, "SIMCONNECT_EXCEPTION_SIZE_MISMATCH" },
	{ SIMCONNECT_EXCEPTION_UNRECOGNIZED_ID, "SIMCONNECT_EXCEPTION_UNRECOGNIZED_ID" },
	{ SIMCONNECT_EXCEPTION_UNOPENED, "SIMCONNECT_EXCEPTION_UNOPENED" },
	{ SIMCONNECT_EXCEPTION_VERSION_MISMATCH, "SIMCONNECT_EXCEPTION_VERSION_MISMATCH" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_GROUPS, "SIMCONNECT_EXCEPTION_TOO_MANY_GROUPS" },
	{ SIMCONNECT_EXCEPTION_NAME_UNRECOGNIZED, "SIMCONNECT_EXCEPTION_NAME_UNRECOGNIZED" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_EVENT_NAMES, "SIMCONNECT_EXCEPTION_TOO_MANY_EVENT_NAMES" },
	{ SIMCONNECT_EXCEPTION_EVENT_ID_DUPLICATE, "SIMCONNECT_EXCEPTION_EVENT_ID_DUPLICATE" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_MAPS, "SIMCONNECT_EXCEPTION_TOO_MANY_MAPS" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_OBJECTS, "SIMCONNECT_EXCEPTION_TOO_MANY_OBJECTS" },
	{ SIMCONNECT_EXCEPTION_TOO_MANY_REQUESTS, "SIMCONNECT_EXCEPTION_TOO_MANY_REQUESTS" },
	{ SIMCONNECT_EXCEPTION_WEATHER_INVALID_PORT, "SIMCONNECT_EXCEPTION_WEATHER_INVALID_PORT" },
	{ SIMCONNECT_EXCEPTION_WEATHER_INVALID_METAR, "SIMCONNECT_EXCEPTION_WEATHER_INVALID_METAR" },
	{ SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_GET_OBSERVATION, "SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_GET_OBSERVATION" },
	{ SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_CREATE_STATION, "SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_CREATE_STATION" },
	{ SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_REMOVE_STATION, "SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_REMOVE_STATION" },
	{ SIMCONNECT_EXCEPTION_INVALID_DATA_TYPE, "SIMCONNECT_EXCEPTION_INVALID_DATA_TYPE" },
	{ SIMCONNECT_EXCEPTION_INVALID_DATA_SIZE, "SIMCONNECT_EXCEPTION_INVALID_DATA_SIZE" },
	{ SIMCONNECT_EXCEPTION_DATA_ERROR, "SIMCONNECT_EXCEPTION_DATA_ERROR" },
	{ SIMCONNECT_EXCEPTION_INVALID_ARRAY, "SIMCONNECT_EXCEPTION_INVALID_ARRAY" },
	{ SIMCONNECT_EXCEPTION_CREATE_OBJECT_FAILED, "SIMCONNECT_EXCEPTION_CREATE_OBJECT_FAILED" },
	{ SIMCONNECT_EXCEPTION_OPERATION_INVALID_FOR_OBJECT_TYPE, "SIMCONNECT_EXCEPTION_OPERATION_INVALID_FOR_OBJECT_TYPE" },
	{ SIMCONNECT_EXCEPTION_ILLEGAL_OPERATION, "SIMCONNECT_EXCEPTION_ILLEGAL_OPERATION" },
	{ SIMCONNECT_EXCEPTION_ALREADY_SUBSCRIBED, "SIMCONNECT_EXCEPTION_ALREADY_SUBSCRIBED" },
	{ SIMCONNECT_EXCEPTION_INVALID_ENUM, "SIMCONNECT_EXCEPTION_INVALID_ENUM" },
	{ SIMCONNECT_EXCEPTION_DEFINITION_ERROR, "SIMCONNECT_EXCEPTION_DEFINITION_ERROR" },
	{ SIMCONNECT_EXCEPTION_DUPLICATE_ID, "SIMCONNECT_EXCEPTION_DUPLICATE_ID" },
	{ SIMCONNECT_EXCEPTION_DATUM_ID, "SIMCONNECT_EXCEPTION_DATUM_ID" },
	{ SIMCONNECT_EXCEPTION_OUT_OF_BOUNDS, "SIMCONNECT_EXCEPTION_OUT_OF_BOUNDS" },
	{ SIMCONNECT_EXCEPTION_ALREADY_CREATED, "SIMCONNECT_EXCEPTION_ALREADY_CREATED" },
	{ SIMCONNECT_EXCEPTION_OBJECT_OUTSIDE_REALITY_BUBBLE, "SIMCONNECT_EXCEPTION_OBJECT_OUTSIDE_REALITY_BUBBLE" },
	{ SIMCONNECT_EXCEPTION_OBJECT_CONTAINER, "SIMCONNECT_EXCEPTION_OBJECT_CONTAINER" },
	{ SIMCONNECT_EXCEPTION_OBJECT_AI, "SIMCONNECT_EXCEPTION_OBJECT_AI" },
	{ SIMCONNECT_EXCEPTION_OBJECT_ATC, "SIMCONNECT_EXCEPTION_OBJECT_ATC" },
	{ SIMCONNECT_EXCEPTION_OBJECT_SCHEDULE, "SIMCONNECT_EXCEPTION_OBJECT_SCHEDULE" }
};

std::map<SIMCONNECT_DATATYPE, int> sizeMap = {
	{ SIMCONNECT_DATATYPE_INT32, 4 },
	{ SIMCONNECT_DATATYPE_INT64, 8 },
	{ SIMCONNECT_DATATYPE_FLOAT32, 4 },
	{ SIMCONNECT_DATATYPE_FLOAT64, 8 },
	{ SIMCONNECT_DATATYPE_STRING8, 8 },
	{ SIMCONNECT_DATATYPE_STRING32, 32 },
	{ SIMCONNECT_DATATYPE_STRING64, 64 },
	{ SIMCONNECT_DATATYPE_STRING128, 128 },
	{ SIMCONNECT_DATATYPE_STRING256, 256 },
	{ SIMCONNECT_DATATYPE_STRING260, 260 }
};

uint32_t nextEventId = 0;
uint32_t nextRequestId = 0;
uint32_t nextDataDefinitionId = 0;

struct DataBatchDefinition {
	SIMCONNECT_DATA_DEFINITION_ID id;
	uint32_t num_values;
	std::vector<std::string> datum_names;
	std::vector<SIMCONNECT_DATATYPE> datum_types;
};

std::map<DWORD, DataBatchDefinition> dataDefinitions;

SimConnectSession::SimConnectSession() {  }

bool SimConnectSession::Open(const std::string& appName) {
    this->hSimConnect = NULL;
    this->fatalError = nullptr;

    HRESULT hr = SimConnect_Open(&hSimConnect, appName.c_str(), NULL, 0, 0, 0);
    check(hr);
    
    return SUCCEEDED(hr);
};

DispatchContent SimConnectSession::NextDispatch() {
    if (this->fatalError != nullptr) {
        return { DispatchContentType::Error, this->fatalError };
    }

    SIMCONNECT_RECV *pData;
    DWORD cbData;

    HRESULT hr = SimConnect_GetNextDispatch(hSimConnect, &pData, &cbData);
    if (SUCCEEDED(hr)) {
        return this->Process(pData, cbData);
    } else if (NT_ERROR(hr)) {
        check(hr);
        return { DispatchContentType::Error, this->fatalError };
    } else {
        return { DispatchContentType::Nothing, nullptr };
    }    
}

DispatchContent SimConnectSession::Process(SIMCONNECT_RECV* pData, DWORD cbData) {
    SIMCONNECT_RECV_ID eventId = (SIMCONNECT_RECV_ID)pData->dwID;

    switch (eventId) {
        case SIMCONNECT_RECV_ID_NULL:
            return { DispatchContentType::Nothing, nullptr };
        case SIMCONNECT_RECV_ID_EXCEPTION: 
            return { DispatchContentType::Exception, this->GetExceptionInfo(pData) };
        case SIMCONNECT_RECV_ID_OPEN:
            return { DispatchContentType::Open, this->GetSimInfo(pData) };
        case SIMCONNECT_RECV_ID_QUIT:
            return { DispatchContentType::Quit, nullptr };
        case SIMCONNECT_RECV_ID_SYSTEM_STATE:
            return { DispatchContentType::SystemState, this->GetSystemState(pData) };
        case SIMCONNECT_RECV_ID_EVENT:
            return { DispatchContentType::EventId, this->GetEvent(pData) };
        case SIMCONNECT_RECV_ID_SIMOBJECT_DATA: 
            return { DispatchContentType::SimobjectData, this->GetSimObjectData(pData, cbData) };
        case SIMCONNECT_RECV_ID_SIMOBJECT_DATA_BYTYPE: 
            return { DispatchContentType::SimobjectData, this->GetSimObjectData(pData, cbData) };
        default: {
            return { DispatchContentType::Unkn, nullptr };
        }
    }
}

uint32_t SimConnectSession::SubscribeToSystemEvent(const std::string& eventName) {
    HRESULT hr = SimConnect_SubscribeToSystemEvent(this->hSimConnect, nextEventId, eventName.c_str());
    check(hr);
    return nextEventId++;
}

uint32_t SimConnectSession::RequestSystemState(std::string stateName) {
    HRESULT hr = SimConnect_RequestSystemState(hSimConnect, nextRequestId, stateName.c_str());
    check(hr);
    return nextRequestId++;
}

uint32_t SimConnectSession::FlightLoad(std::string fileName) {
    HRESULT hr = SimConnect_FlightLoad(hSimConnect, fileName.c_str());
    check(hr);
    return SUCCEEDED(hr);
}

uint32_t SimConnectSession::TransmitClientEvent(std::string eventName, uint32_t objectId, int data) {
    HRESULT hr = SimConnect_MapClientEventToSimEvent(hSimConnect, nextEventId, eventName.c_str());
    
    check(hr);

    hr = SimConnect_TransmitClientEvent(
        hSimConnect, 
        objectId, 
        nextEventId, 
        data, 
        SIMCONNECT_GROUP_PRIORITY_HIGHEST, 
        SIMCONNECT_EVENT_FLAG_GROUPID_IS_PRIORITY
    );

    check(hr);

    return nextEventId++;
}

uint32_t SimConnectSession::CreateDataDefinition(std::vector<DatumRequest> datumRequests) {
    DataBatchDefinition newDefinition = this->GenerateDataDefinition(datumRequests);
    dataDefinitions[newDefinition.id] = newDefinition;
    return newDefinition.id;
}

uint32_t SimConnectSession::RequestDataOnSimObject(std::vector<DatumRequest> datumRequests, uint32_t objectId, uint32_t period, uint32_t flags) {
    
    DataBatchDefinition newDataDefinition = GenerateDataDefinition(datumRequests);
    
    dataDefinitions[newDataDefinition.id] = newDataDefinition;

    HRESULT hr = SimConnect_RequestDataOnSimObject(
        hSimConnect, 
        nextRequestId, 
        newDataDefinition.id, 
        objectId, 
        SIMCONNECT_PERIOD(period),
        flags
    );

    check(hr);

    return nextRequestId++;
}

uint32_t SimConnectSession::RequestDataOnSimObject(uint32_t existingDataDefinitionId, uint32_t objectId, uint32_t period, uint32_t flags) {
    
    HRESULT hr = SimConnect_RequestDataOnSimObject(
        hSimConnect, 
        nextRequestId, 
        dataDefinitions[existingDataDefinitionId].id, 
        objectId, 
        SIMCONNECT_PERIOD(period),
        flags
    );

    check(hr);

    return nextRequestId++;
}

uint32_t SimConnectSession::RequestDataOnSimObjectType(std::vector<DatumRequest> datumRequests, uint32_t radius, uint32_t simobjectType) {
    DataBatchDefinition newDataDefinition = GenerateDataDefinition(datumRequests);

    dataDefinitions[newDataDefinition.id] = newDataDefinition;
    HRESULT hr = SimConnect_RequestDataOnSimObjectType(
        hSimConnect, 
        nextRequestId, 
        newDataDefinition.id, 
        radius, 
        SIMCONNECT_SIMOBJECT_TYPE(simobjectType)
    );

    check(hr);

    return nextRequestId++;
}

uint32_t SimConnectSession::SetDataOnSimObject(std::string datumName, std::string unitsName, double value) {

    HRESULT hr = SimConnect_AddToDataDefinition(
        hSimConnect, 
        nextDataDefinitionId, 
        datumName.c_str(), 
        unitsName.c_str()
    );

    check(hr);

    hr = SimConnect_SetDataOnSimObject(
        hSimConnect, 
        nextDataDefinitionId, 
        SIMCONNECT_OBJECT_ID_USER, 
        0, 
        0, 
        sizeof(value), 
        &value
    );

    check(hr);

    return nextDataDefinitionId++;
}

uint32_t SimConnectSession::SetAircraftInitialPosition(
    double lat,
    double lng,
    double altitude,
    double pitch,
    double bank,
    double heading,
    bool onGround,
    unsigned long airspeed
) {
    SIMCONNECT_DATA_INITPOSITION init = {
        lat,
        lng, 
        altitude,
        pitch,
        bank,
        heading,
        onGround ? 1UL : 0UL,
        airspeed
    };

    HRESULT hr = SimConnect_AddToDataDefinition(
        hSimConnect, 
        nextDataDefinitionId, 
        "Initial Position", 
        NULL, 
        SIMCONNECT_DATATYPE_INITPOSITION
    );

    check(hr);

    hr = SimConnect_SetDataOnSimObject(
        hSimConnect, 
        nextDataDefinitionId,
        SIMCONNECT_OBJECT_ID_USER,
        0, 
        0, 
        sizeof(init), 
        &init
    );

    check(hr);

    nextDataDefinitionId++;

    return SUCCEEDED(hr);
}

SimEvent* SimConnectSession::GetEvent(SIMCONNECT_RECV *pData) {
    SIMCONNECT_RECV_EVENT *myEvent = (SIMCONNECT_RECV_EVENT *)pData;
    SimEvent* info = new SimEvent;
    info->type = myEvent->uEventID;
    info->value = myEvent->dwData;
    return info;
}

SimSystemState* SimConnectSession::GetSystemState(SIMCONNECT_RECV *pData) {
    SIMCONNECT_RECV_SYSTEM_STATE *pState = (SIMCONNECT_RECV_SYSTEM_STATE *)pData;

    return new SimSystemState{
        pState->dwRequestID,
        pState->dwInteger,
        pState->fFloat,
        std::string(pState->szString)
    };
}

SimInfo* SimConnectSession::GetSimInfo(SIMCONNECT_RECV *pData) {
    SIMCONNECT_RECV_OPEN *pOpen = (SIMCONNECT_RECV_OPEN *)pData;

    char simconnVersion[32];
	sprintf(simconnVersion, "%d.%d.%d.%d", pOpen->dwSimConnectVersionMajor, pOpen->dwSimConnectVersionMinor, pOpen->dwSimConnectBuildMajor, pOpen->dwSimConnectBuildMinor);

    std::string version = std::string(simconnVersion);
    std::string simName = std::string(pOpen->szApplicationName);

    SimInfo* info = new SimInfo;
    info->name = std::string(pOpen->szApplicationName);
    info->version = std::string(simconnVersion);
    
    return info;
}

ExceptionInfo* SimConnectSession::GetExceptionInfo(SIMCONNECT_RECV *pData) {
    SIMCONNECT_RECV_EXCEPTION *exception = (SIMCONNECT_RECV_EXCEPTION *)pData; 

    ExceptionInfo* info = new ExceptionInfo;
    info->exception = exception->dwException;
    info->packetId = exception->dwSendID;
    info->parameterIndex = exception->dwIndex;
    info->exceptionName = exceptionNames[SIMCONNECT_EXCEPTION(info->exception)];

    return info;
}

SimobjectDataBatch* SimConnectSession::GetSimObjectData(SIMCONNECT_RECV *pData, DWORD cbData) {
    SIMCONNECT_RECV_SIMOBJECT_DATA *pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA *)pData;
    DataBatchDefinition batch = dataDefinitions[pObjData->dwDefineID];

    std::vector<SIMCONNECT_DATATYPE> datumTypes = batch.datum_types;
	std::vector<std::string> datumNames = batch.datum_names;
    std::map<std::string, std::pair<DatumType, void*>> output;

    uint32_t dataValueOffset = 0;

    for (uint32_t i = 0; i < batch.num_values; i++) {
        uint32_t datumSize = 0;
        std::string datumName = datumNames.at(i);
        SIMCONNECT_DATATYPE datumType = datumTypes.at(i);

        if (datumType == SIMCONNECT_DATATYPE_STRINGV) {
			DWORD cbString;
			char *pOutString;
			char *pStringv = ((char *)(&pObjData->dwData));

            HRESULT hr = SimConnect_RetrieveString(pData, cbData, dataValueOffset + pStringv, &pOutString, &cbString);
            
            check(hr);

            output[datumName] = std::make_pair(
                DatumType::Str, 
                new std::string(NT_ERROR(hr) ? "ERROR" : pOutString)
            );

			datumSize = cbString;
        } else {
			datumSize = sizeMap[datumType];
			char *p = ((char *)(&pObjData->dwData) + dataValueOffset);
			double *var = (double *)p;
            output[datumName] = std::make_pair(DatumType::Num, var);
		}
		dataValueOffset += datumSize;
    }
    return new SimobjectDataBatch {
        pObjData->dwRequestID,
        output
    };
}

DataBatchDefinition SimConnectSession::GenerateDataDefinition(std::vector<DatumRequest> datumRequests) {
    std::vector<std::string> requestedDatumNames;
    std::vector<SIMCONNECT_DATATYPE> requestedDatumTypes;

    for (auto &datumRequest : datumRequests) {
        const char* datumName = datumRequest.datumName.c_str();
        const char* unitsName = datumRequest.unitName.c_str();

        HRESULT hr = SimConnect_AddToDataDefinition(
            hSimConnect, 
            nextDataDefinitionId, 
            datumName, 
            unitsName,
            SIMCONNECT_DATATYPE(datumRequest.datumType)
        );

        check(hr);

        requestedDatumNames.push_back(datumName);
        requestedDatumTypes.push_back(SIMCONNECT_DATATYPE(datumRequest.datumType));
    }
    
    return { 
        nextDataDefinitionId++, 
        datumRequests.size(), 
        requestedDatumNames, 
        requestedDatumTypes 
    };
}

bool SimConnectSession::Close() {
    HRESULT hr = SimConnect_Close(hSimConnect);
    check(hr);
    return SUCCEEDED(hr);
}

void SimConnectSession::HandleError(const std::string& name, NTSTATUS code) {
	char errorCode[32];
	sprintf(errorCode, "0x%08X", code);     // Typically 0xC000014B, 0xC000020D or 0xC000013C
    std::stringstream errorMessage;
    errorMessage << "An error occured in " << name << ", NTSTATUS: " << errorCode;    
    std::cout << errorMessage.str() << std::endl;
    if (fatalError == nullptr) {
        fatalError = new ErrorInfo{errorCode, errorMessage.str()};
    }
}