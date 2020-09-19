#ifndef COMMONS_H
#define COMMONS_H
#include <string>
#include <map>

enum PayloadType {
    Error,
    Unkn,
    Open,
    EventId,
    SimobjectData
};

enum DatumType {
    Str,
    Num
};

struct SimInfo {
    std::string name;
    std::string version;
};

struct DatumRequest {
    std::string datumName;
    std::string unitName;
    unsigned int datumType;
    unsigned int epsilon;
    unsigned int datumId;
};

struct SimEvent {
    unsigned long type;
    unsigned long value;
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