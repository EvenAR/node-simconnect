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
-   Fixed-length string fields: `data.readString(SimConnectConstants.MAX_PATH)`.
-   Variable-length text payloads: `data.readBytes(data.remaining()).toString('latin1')` typed as `string`.
-   Raw byte blobs that are not text: `data.readBytes(n)` typed as `Buffer`.

Then export the new class from `src/recv/index.ts`:

```ts
export { RecvXxx } from './RecvXxx';
```

### 2. RecvID (only if step 1 applies)

Add the new value to the `RecvID` enum in `src/SimConnectSocket.ts`. Values must follow the packet-ID order from the SimConnect header — do not guess; use the provided SDK information.

```ts
ID_XXX = <packet_id>,
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
        .putString(foo, SimConnectConstants.MAX_PATH)
        .putUint32(someFlag);
    return this._buildAndSend(packet);
}
```

Payload encoding rules:

-   All strings use **`latin1`**. Never use `utf8`.
-   Methods that send user-supplied text accept `string | object`; objects are serialized with `JSON.stringify` first, then encoded with `Buffer.from(str, 'latin1')`.
-   Fixed-length strings: `.putString(value, SimConnectConstants.MAX_PATH)`.
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
