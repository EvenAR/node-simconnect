#ifndef COMMONS_H
#define COMMONS_H
#include <string>
#include <map>

enum DispatchContentType {
    Nothing,
    Exception,
    Error,
    Unkn,
    open,
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
    unsigned int id;
    std::map<std::string, std::pair<DatumType, void*>> values;
};

struct SimInfo {
    std::string name;
    std::string version;
};

struct ExceptionInfo {
    unsigned int exception;
    unsigned int packetId;
    unsigned int parameterIndex;
    std::string exceptionName;
};

struct ErrorInfo {
    std::string code;
    std::string text;
};

struct DatumRequest {
    std::string datumName;
    std::string unitName;
    unsigned int datumType;
};

struct SimEvent {
    unsigned long type;
    unsigned long value;
};

struct SimSystemState {
    unsigned int requestId;
    unsigned int integerValue;
    float floatValue;
    std::string stringValue;
};



#endif