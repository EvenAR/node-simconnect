#include "dispatch-worker.h"
#include "commons.h"
#include <iostream>
#include "simconnect-handler.h"
#include <windows.h>

using namespace Napi;


DispatchWorker::DispatchWorker(Function& callback, SimConnectHandler *pSimConnect) : AsyncProgressQueueWorker(callback), pSimConnectHandler(pSimConnect) {

}

DispatchWorker::~DispatchWorker() {

}

void DispatchWorker::Execute(const ExecutionProgress& progress) {
    while (true) {
        Data nextDispatch = pSimConnectHandler->NextDispatch();
        progress.Send(&nextDispatch, 1);
        Sleep(1);
    }
}

void DispatchWorker::OnProgress(const Data* dispatch, size_t /* count */) {
    switch (dispatch->type) {
        case PayloadType::Nothing: break;
        case PayloadType::Error: {
            ExceptionInfo* pEvent = (ExceptionInfo *)dispatch->payload;
            std::cout << pEvent->exceptionName << std::endl;
            delete pEvent;
        }
        break;
        case PayloadType::Open: {
            gIsConnected = true;
            SimInfo* pSimInfo = (SimInfo *)dispatch->payload;
            
            Object obj = Object::New(Env());
            obj.Set("name", String::New(Env(), pSimInfo->name.c_str()));
            obj.Set("version", String::New(Env(), pSimInfo->version.c_str()));

            Callback().Call({ String::New(Env(), "open"), obj });

            delete pSimInfo;
        }
        break;
        case PayloadType::Quit: {
            gIsConnected = false;
            Callback().Call({ String::New(Env(), "quit") });
        }
        break;
        case PayloadType::SystemState: {
            SimSystemState* pSystemState = (SimSystemState *)dispatch->payload;

            Object obj = Object::New(Env());
            obj.Set("integer", Number::New(Env(), pSystemState->integerValue));
            obj.Set("float", Number::New(Env(), pSystemState->floatValue));
            obj.Set("string", String::New(Env(), pSystemState->stringValue.c_str()));

            dataRequestCallbacks[pSystemState->requestId].Call({obj});

            delete pSystemState;
        }
        break;
        case PayloadType::EventId: {
            SimEvent* pEvent = (SimEvent *)dispatch->payload;
            Number value = Number::New(Env(), pEvent->value);
            systemEventCallbacks[pEvent->type].Call({value});
            delete pEvent;
        }
        break;
        case PayloadType::SimobjectData: {
            SimobjectDataBatch* pDataBatch = (SimobjectDataBatch *)dispatch->payload;
            Object obj = Object::New(Env());                

            for ( auto const& [datumName, pair] : pDataBatch->values ) {
                DatumType datumType = pair.first;
                void* pDatumValue = pair.second;

                switch (datumType) {
                    case DatumType::Num: {
                        double* pDouble = (double*)pDatumValue;
                        obj.Set(datumName, Number::New(Env(), *pDouble));
                    } break;
                    case DatumType::Str: {
                        std::string* pString = (std::string*)pDatumValue;
                        obj.Set(datumName, String::New(Env(), pString->c_str()));
                    } break;
                    default: {
                        obj.Set("UNKNOWN_VALUE", String::New(Env(), "?"));
                    } break;
                }
            }
            dataRequestCallbacks[pDataBatch->id].Call({obj});

            delete pDataBatch;
        }
        break;
        default: {
            std::cout << "Got unknown event " << std::endl;
        }
        break;
    }
}