---
mode: agent
description: Add a new SimConnect API method to node-simconnect
tools:
    - read_file
    - create_file
    - insert_edit_into_file
    - run_in_terminal
---

Add a new SimConnect API method following the steps below.

**Before starting, ask the user to provide:**

1. The method name(s) to implement.
2. The contents of (or path to) their local `SimConnect.h` — this is the single authoritative source for function signatures, packet opcodes, struct field layouts, enum orderings, and string field sizes. Do **not** rely solely on the online docs, which may be outdated or incomplete.

The online SDK docs are a useful supplement but must never override what `SimConnect.h` says:
<https://docs.flightsimulator.com/>
<https://docs.flightsimulator.com/msfs2024/html/6_Programming_APIs/SimConnect/API_Reference/>

Before implementing, always determine whether the new request has a receive packet in `SIMCONNECT_RECV_ID` and capture the exact mapping in your plan.
Example: `SimConnect_CameraGet` maps to `SIMCONNECT_RECV_ID_CAMERA_DATA`.

## Checklist

### 0. Request → Recv mapping (always)

-   Identify the request function in `SimConnect.h` and verify whether it has a corresponding `SIMCONNECT_RECV_ID_*` response.
-   Use the online SDK API docs to verify whether the function produces recv messages, while keeping `SimConnect.h` as the authoritative source if docs and header disagree.
-   If a response exists, implement both request and receive paths in the same change.
-   Do not stop after adding only the request method when the SDK defines a recv packet for it.

### 1. Recv struct (only if the server sends a response packet)

Create `src/recv/RecvXxx.ts`:

```ts
import { RawBuffer } from '../RawBuffer';

export class RecvXxx {
    // one property per field in the C++ struct
    myField: number;

    constructor(data: RawBuffer) {
        // read fields in the exact order they appear in the C++ struct
        this.myField = data.readUint32();
    }
}
```

Rules:

-   Constructor takes a single `RawBuffer` argument.
-   **Check if the SDK struct inherits from a base struct** (e.g., `SIMCONNECT_RECV_LIST_TEMPLATE`). If it does, extend the corresponding TypeScript base class (e.g., `RecvListTemplate`) and call `super(data)` first.
-   Read fields in the exact order they appear in the C++ struct.
-   Fixed-length string fields: `data.readString(N)` where **N is the exact byte length from the SDK struct**.
-   Variable-length text payloads declared with the `SIMCONNECT_STRINGV(name)` macro (expands to `char name[1]`): use `data.readStringV()` typed as `string`.
-   Variable-length raw byte blobs that are not text: `data.readBytes(data.remaining())` typed as `Buffer`.
-   **Verify every field name and type against the SDK struct** — do not rename fields or change types based on assumptions.

Then export the new class from `src/recv/index.ts`:

```ts
export { RecvXxx } from './RecvXxx';
```

### 2. RecvID (only if step 1 applies)

Read the `SIMCONNECT_RECV_ID` enum directly from `SimConnect.h` and add the new value at the exact position it occupies there. Do **not** guess or append blindly to the end.

**Critical rules:**

-   Never assign explicit integer values to enum members (e.g. `ID_FOO = 40`) — rely on TypeScript's sequential auto-increment. Explicit values cause the entire subsequent sequence to shift if any entry is inserted before it.
-   Before adding entries, find the full `SIMCONNECT_RECV_ID` enum in `SimConnect.h` and verify the complete ordering. Pay attention to entries that may have been inserted between existing ones.

```ts
ID_XXX, // position must match SDK enum order, no explicit value
```

### 3. New enum (only if the method needs one)

Create `src/enums/XxxEnum.ts`, mirroring the exact C++ values from `SimConnect.h`:

```ts
export enum XxxEnum {
    VALUE_A = 1 << 0,
    VALUE_B = 1 << 1,
    COMBINED = XxxEnum.VALUE_A | XxxEnum.VALUE_B,
}
```

Rules:

-   File name: `PascalCase.ts`.
-   Member names: short `PascalCase` stripping the repetitive C++ prefix.
-   Values must exactly match the SDK definitions.

Then export from `src/enums/index.ts`:

```ts
export { XxxEnum } from './XxxEnum';
```

### 4. Method on SimConnectConnection

Add the public method to `src/SimConnectConnection.ts`.

**Before writing the method, determine:**

-   The exact packet opcode (hex ID) — **do not guess**. Opcodes are sequential based on the order functions appear in `SimConnect.h`. To find the correct opcode:
    1. Find the last implemented method in `src/SimConnectConnection.ts` and note its opcode.
    2. Locate that same function in `SimConnect.h` and count forward to the target function.
    3. Increment the last known opcode by the number of steps between them.
-   The exact parameter order as declared in the SDK function signature in `SimConnect.h`
-   The exact string field sizes

```ts
/**
 * @returns sendId of packet (can be used to identify packet when exception event occurs)
 */
// Only add @param / summary JSDoc if the description can be copied directly from the
// online SDK docs for the C function. Do NOT guess or paraphrase.
methodName(foo: string): number {
    // guard for version-gated methods:
    if (this._ourProtocol < Protocol.SunRise) throw Error(SimConnectError.BadVersion);

    const packet = this._beginPacket(0xNN)  // opcode = last known opcode + offset in SimConnect.h
        .putString256(foo)
        .putUint32(someFlag);
    return this._buildAndSend(packet);
}
```

Payload encoding rules:

-   All strings use **`latin1`**. Never use `utf8`.
-   **String field sizes**: use the correct `putStringN` helper matching the byte length in `SimConnect.h` (e.g. `.putString256(value)` for 256-byte fields). Always check the struct definition.
-   If `SimConnect.h` or the function's documentation comment explicitly states the payload carries **JSON**, accept `string | object`; objects are serialized with `JSON.stringify` before encoding. Otherwise the parameter type is plain `string`.
-   Variable-length string fields declared with `SIMCONNECT_STRINGV` in the SDK struct: `.putUint32(str.length).putString(str)` (no fixed-size argument to `putString`).
-   Variable-length byte blobs: `.putUint32(buf.length).putBytes(buf)`.

### 5. Event handler (only if step 1 applies)

In the `_handleMessage` switch in `src/SimConnectConnection.ts`, add a case for the new `RecvID` and emit the event:

```ts
case RecvID.ID_XXX: {
    const recv = new RecvXxx(packet);
    this.emit('xxxEvent', recv);
    break;
}
```

Also add the event to the `SimConnectRecvEvents` interface at the top of the file:

```ts
xxxEvent: (recv: RecvXxx) => void;
```

### 6. Validate

```bash
npm run build   # must produce no TypeScript errors
npm test        # all tests must pass
```
