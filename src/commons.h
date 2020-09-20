#ifndef COMMONS_H
#define COMMONS_H
#include <string>
#include <map>

enum PayloadType {
    Nothing,
    Error,
    Unkn,
    Open,
    Quit,
    EventId,
    SimobjectData,
    SystemState
};

enum DatumType {
    Str,
    Num
};

struct SimInfo {
    std::string name;
    std::string version;
};

struct ExceptionInfo {
    int exception;
    int packetId;
    int parameterIndex;
    std::string exceptionName;
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

struct Data {
    PayloadType type;
    void* payload;
};

struct SimobjectDataBatch {
    unsigned int id;
    std::map<std::string, std::pair<DatumType, void*>> values;
};

#endif