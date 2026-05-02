---
mode: agent
description: Add a new SimConnect API method to node-simconnect
tools:
    - read_file
    - create_file
    - insert_edit_into_file
    - run_in_terminal
---

Add a new SimConnect API method following the steps below. Ask for the method name, packet IDs, and SDK struct/enum definitions before starting if they are not already provided.

**Before writing any code, look up the method in the official MSFS SDK documentation** to understand the exact function signature, parameter types, string field lengths, and any notes about JSON payloads. The authoritative reference is: <https://docs.flightsimulator.com/msfs2024/html/6_Programming_APIs/SimConnect/API_Reference/>

## Checklist

### 1. Recv struct (only if the server sends a response packet)

Create `src/recv/RecvXxx.ts`:

```ts
import { SimConnectConstants } from '../SimConnectConstants';
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
-   Read fields in the exact order they appear in the C++ struct.
-   Fixed-length string fields: `data.readString(N)` where **N is the exact byte length documented for that field in the SDK struct** — do not default to `SimConnectConstants.MAX_PATH` unless the SDK explicitly uses `MAX_PATH` for that field.
-   Variable-length text payloads: `data.readBytes(data.remaining()).toString('latin1')` typed as `string`.
-   Raw byte blobs that are not text: `data.readBytes(n)` typed as `Buffer`.

Then export the new class from `src/recv/index.ts`:

```ts
export { RecvXxx } from './RecvXxx';
```

### 2. RecvID (only if step 1 applies)

**Always look up the official SDK enum before adding a new value.**
The authoritative reference is the MSFS 2024 SDK documentation:
<https://docs.flightsimulator.com/msfs2024/html/6_Programming_APIs/SimConnect/API_Reference/Structures_And_Enumerations/SIMCONNECT_RECV_ID.htm>

Add the new value to the `RecvID` enum in `src/SimConnectSocket.ts` at the exact position it occupies in the SDK `SIMCONNECT_RECV_ID` enum — do **not** guess or append blindly to the end.

```ts
ID_XXX, // position must match SDK enum order
```

### 3. New enum (only if the method needs one)

Create `src/enums/XxxEnum.ts`, mirroring the exact C++ values from the SDK docs:

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

```ts
/**
 * JSDoc describing the method.
 *
 * @param foo - description
 * @returns sendId of packet
 */
methodName(foo: string): number {
    // guard for version-gated methods:
    if (this._ourProtocol < Protocol.SunRise) throw Error(SimConnectError.BadVersion);

    const packet = this._beginPacket(0xNN)
        .putString(foo, N) // N = exact byte length from SDK docs
        .putUint32(someFlag);
    return this._buildAndSend(packet);
}
```

Payload encoding rules:

-   All strings use **`latin1`**. Never use `utf8`.
-   Fixed-length strings: `.putString(value, N)` where **N is the exact byte length documented for that field in the SDK** — look it up in the official docs, do not default to `SimConnectConstants.MAX_PATH` unless the SDK says so.
-   If the SDK documentation explicitly states the string field carries **JSON**, accept `string | object`; objects are serialized with `JSON.stringify` before encoding. Otherwise the parameter type is plain `string`.
-   Variable-length bytes: `.putUint32(buf.length).putBytes(buf)`.

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
