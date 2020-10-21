#ifndef COMMONS_H
#define COMMONS_H
#include <string>
#include <map>

enum DispatchContentType {
    Nothing,
    Exception,
    Error,
    Unkn,
    Open,
    Quit,
    EventId,
    SimobjectData,
    SystemState
};

struct DispatchContent {
    DispatchContentType type;
    void* payload;
};

enum DatumType {
    Str,
    Num
};

struct SimobjectDataBatch {
    uint32_t id;
    std::map<std::string, std::pair<DatumType, void*>> values;
};

struct SimInfo {
    std::string name;
    std::string version;
};

struct ExceptionInfo {
    uint32_t exception;
    uint32_t packetId;
    uint32_t parameterIndex;
    std::string exceptionName;
};

struct ErrorInfo {
    std::string code;
    std::string text;
};

struct DatumRequest {
    std::string datumName;
    std::string unitName;
    uint32_t datumType;
};

struct SimEvent {
    unsigned long type;
    unsigned long value;
};

struct SimSystemState {
    uint32_t requestId;
    uint32_t integerValue;
    float floatValue;
    std::string stringValue;
};



#endif