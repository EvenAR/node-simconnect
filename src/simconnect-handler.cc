#include <windows.h>
#include <winternl.h>
#include <SimConnect.h>
#include <iostream>

#include "simconnect-handler.h"

HANDLE ghSimConnect = NULL;

unsigned int eventIdCounter = 0;
unsigned int nextRequestId = 0;
unsigned int nextDataDefinitionId = 0;

struct DataBatchDefinition {
	SIMCONNECT_DATA_DEFINITION_ID id;
	unsigned int num_values;
	std::vector<std::string> datum_names;
	std::vector<SIMCONNECT_DATATYPE> datum_types;
};

std::map<DWORD, DataBatchDefinition> dataDefinitions;

SimConnectHandler::SimConnectHandler() { }

bool SimConnectHandler::Open(std::string appName) {
    HRESULT hr = SimConnect_Open(&ghSimConnect, appName.c_str(), NULL, 0, 0, 0);
    return SUCCEEDED(hr);
};

Data SimConnectHandler::NextDispatch() {
    SIMCONNECT_RECV *pData;
    DWORD cbData;

    HRESULT hr = SimConnect_GetNextDispatch(ghSimConnect, &pData, &cbData);
    if (SUCCEEDED(hr)) {
        return this->Process(pData, cbData);
    } else if(NT_ERROR(hr)) {
        return { PayloadType::Error, nullptr };
    } else {
        return { PayloadType::Unkn, nullptr };
    }    
}

Data SimConnectHandler::Process(SIMCONNECT_RECV* pData, DWORD cbData) {
    SIMCONNECT_RECV_ID eventId = (SIMCONNECT_RECV_ID)pData->dwID;

    switch (eventId) {
        case SIMCONNECT_RECV_ID_OPEN:
            return { PayloadType::Open, this->GetSimInfo(pData) };
        case SIMCONNECT_RECV_ID_EVENT:
            return { PayloadType::EventId, this->GetEvent(pData) };
        case SIMCONNECT_RECV_ID_SIMOBJECT_DATA: 
            return { PayloadType::SimobjectData, this->GetSimObjectData(pData, cbData) };
        default:
            return { PayloadType::Unkn, &eventId };
    }
}

unsigned int SimConnectHandler::SubscribeToSystemEvent(std::string eventName) {
    HRESULT hr = SimConnect_SubscribeToSystemEvent(ghSimConnect, eventIdCounter, eventName.c_str());

    // TODO: error handling

    return eventIdCounter++;
}


unsigned int SimConnectHandler::CreateDataDefinition(std::vector<DatumRequest> datumRequests) {
    DataBatchDefinition newDefinition = this->GenerateDataDefinition(datumRequests);
    dataDefinitions[newDefinition.id] = newDefinition;
    return newDefinition.id;
}

unsigned int SimConnectHandler::RequestDataOnSimObject(std::vector<DatumRequest> datumRequests) {
    
    DataBatchDefinition newDataDefinition = GenerateDataDefinition(datumRequests);
    
    dataDefinitions[newDataDefinition.id] = newDataDefinition;

    HRESULT hr = SimConnect_RequestDataOnSimObject(
        ghSimConnect, 
        nextRequestId, 
        newDataDefinition.id, 
        SIMCONNECT_OBJECT_ID_USER, 
        SIMCONNECT_PERIOD_SIM_FRAME
    );

    // TODO: error handling

    return nextRequestId++;
}

unsigned int SimConnectHandler::RequestDataOnSimObject(unsigned int existingDataDefinitionId) {
    
    HRESULT hr = SimConnect_RequestDataOnSimObject(
        ghSimConnect, 
        nextRequestId, 
        dataDefinitions[existingDataDefinitionId].id, 
        SIMCONNECT_OBJECT_ID_USER, 
        SIMCONNECT_PERIOD_SIM_FRAME
    );

    // TODO: error handling

    return nextRequestId++;
}

unsigned int SimConnectHandler::RequestDataOnSimObjectType(std::vector<DatumRequest> datumRequests, unsigned int radius, unsigned int simobjectType) {
    DataBatchDefinition newDataDefinition = GenerateDataDefinition(datumRequests);

    SimConnect_RequestDataOnSimObjectType(
        ghSimConnect, 
        nextRequestId, 
        newDataDefinition.id, 
        radius, 
        SIMCONNECT_SIMOBJECT_TYPE(simobjectType)
    );
    
    return nextRequestId++;
}

unsigned int SimConnectHandler::SetDataOnSimObject(std::string datumName, std::string unitsName, double value) {

    HRESULT hr = SimConnect_AddToDataDefinition(
        ghSimConnect, 
        nextDataDefinitionId, 
        datumName.c_str(), 
        unitsName.c_str()
    );

    // TODO: error handling

    hr = SimConnect_SetDataOnSimObject(
        ghSimConnect, 
        nextDataDefinitionId, 
        SIMCONNECT_OBJECT_ID_USER, 
        0, 
        0, 
        sizeof(value), 
        &value
    );

    // TODO: error handling

    return nextDataDefinitionId++;
}

SimEvent* SimConnectHandler::GetEvent(SIMCONNECT_RECV *pData) {
    SIMCONNECT_RECV_EVENT *myEvent = (SIMCONNECT_RECV_EVENT *)pData;
    SimEvent* info = new SimEvent;
    info->type = myEvent->uEventID;
    info->value = myEvent->dwData;
    return info;
}

SimInfo* SimConnectHandler::GetSimInfo(SIMCONNECT_RECV *pData) {
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


SimobjectDataBatch* SimConnectHandler::GetSimObjectData(SIMCONNECT_RECV *pData, DWORD cbData) {
    SIMCONNECT_RECV_SIMOBJECT_DATA *pObjData = (SIMCONNECT_RECV_SIMOBJECT_DATA *)pData;
    int numVars = dataDefinitions[pObjData->dwDefineID].num_values;
    std::vector<SIMCONNECT_DATATYPE> valTypes = dataDefinitions[pObjData->dwDefineID].datum_types;
	std::vector<std::string> valIds = dataDefinitions[pObjData->dwDefineID].datum_names;

    int dataValueOffset = 0;
    std::map<std::string, std::pair<DatumType, void*>> output;

    for (int i = 0; i < numVars; i++) {
        int varSize = 0;
        std::string datumName = valIds.at(i);

        if (valTypes[i] == SIMCONNECT_DATATYPE_STRINGV) {
            dataValueOffset += 8; // Not really sure why this is needed, but it fixes problems like this: "F-22 RapF-22 Raptor - 525th Fighter Squadron"
			char *pOutString;
			DWORD cbString;
			char *pStringv = ((char *)(&pObjData->dwData));
			HRESULT hr = SimConnect_RetrieveString(pData, cbData, dataValueOffset + pStringv, &pOutString, &cbString);

			// TODO: error handling
            
			try {
				output[datumName] = std::make_pair(
                    DatumType::Str, 
                    new std::string(pOutString)
                );
			}
			catch (...) {
				output[datumName] = std::make_pair(
                    DatumType::Str, 
                    new std::string("ERROR")
                );
			}

			varSize = cbString;
        } else {
			varSize = sizeMap[valTypes[i]];
			char *p = ((char *)(&pObjData->dwData) + dataValueOffset);
			double *var = (double *)p;
            output[datumName] = std::make_pair(DatumType::Num, var);
		}
		dataValueOffset += varSize;
    }
    SimobjectDataBatch* info = new SimobjectDataBatch;
    info->id = pObjData->dwDefineID;
    info->values = output;
    return info;
}

DataBatchDefinition SimConnectHandler::GenerateDataDefinition(std::vector<DatumRequest> datumRequests) {
    std::vector<std::string> requestedDatumNames;
    std::vector<SIMCONNECT_DATATYPE> requestedDatumTypes;

    for (auto &datumRequest : datumRequests) {
        SimConnect_AddToDataDefinition(
            ghSimConnect, 
            nextDataDefinitionId, 
            datumRequest.datumName.c_str(), 
            datumRequest.unitName.c_str()
        );
        requestedDatumNames.push_back(datumRequest.datumName);
        requestedDatumTypes.push_back(SIMCONNECT_DATATYPE_FLOAT64);
    }
    
    return { 
        nextDataDefinitionId++, 
        datumRequests.size(), 
        requestedDatumNames, 
        requestedDatumTypes 
    };
}
