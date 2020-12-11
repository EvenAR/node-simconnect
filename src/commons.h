#ifndef COMMONS_H
#define COMMONS_H
#include <string>
#include <optional>
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
    std::shared_ptr<void> payload;
};

enum DatumType {
    Text,
    Int32,
    Int64,
    Double,
    Float
};

struct SimobjectDataBatch {
    unsigned int id;
    std::map<std::string, std::pair<DatumType, std::shared_ptr<const void>>> values;
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
    std::optional<std::string> unitName;
    std::optional<unsigned int> datumType;
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
