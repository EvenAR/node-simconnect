# Copilot Instructions

## Project overview

`node-simconnect` is a TypeScript/Node.js library that implements the SimConnect binary protocol used by Microsoft Flight Simulator (FSX through MSFS 2024). It communicates with the simulator over a TCP socket using little-endian binary packets.

## Repository structure

```
src/
  SimConnectConnection.ts   # Main class – all public API methods live here
  SimConnectSocket.ts       # Low-level socket + packet framing; houses RecvID enum
  SimConnectPacketBuilder.ts# Fluent builder for outbound packets
  RawBuffer.ts              # Binary read/write helper used by all Recv* classes
  SimConnectConstants.ts    # Shared constants (e.g. MAX_PATH = 260)
  enums/                    # One file per TypeScript enum, exported via index.ts
  recv/                     # One file per inbound packet type, exported via index.ts
  flags/                    # Bit-flag enums
  datastructures/           # Composite data types
  dto/                      # Data-transfer objects
tests/                      # Jest test suite
```

## Adding a new API method

1. **Recv struct** – if the server sends a response packet, add `src/recv/RecvXxx.ts` and export it from `src/recv/index.ts`.
2. **RecvID** – add the new `ID_XXX` value to the `RecvID` enum in `SimConnectSocket.ts` (values follow the packet-ID order in the SimConnect header).
3. **Enum** – if the method needs a new enum, add `src/enums/XxxEnum.ts` and export it from `src/enums/index.ts`. Mirror the exact C++ enum values from the SDK docs (don't invent values).
4. **Method** – add the public method to `SimConnectConnection.ts`. Guard with `Protocol.XxxVersion` where required:
    ```ts
    if (this._ourProtocol < Protocol.SunRise) throw Error(SimConnectError.BadVersion);
    ```
5. **Event** – register the new `RecvID` case in the `_handleMessage` switch in `SimConnectConnection.ts` and emit the event on `this`.

## Encoding conventions

-   **All strings** (both reading and writing) use **`latin1`** encoding — the same encoding used by `RawBuffer.readString()` / `writeString()` and the helpers in `RawBuffer.ts`. Never use `utf8`.
-   Fixed-length string fields are written/read with `SimConnectConstants.MAX_PATH` (260 bytes).
-   Numbers are little-endian (`readUInt32LE`, `writeUInt32LE`, etc.) — this is handled by `RawBuffer` helpers.

## Enum conventions

-   Enum file names: `PascalCase.ts` (e.g. `CommBusBroadcastTo.ts`).
-   Enum member names: use short `PascalCase` names that strip the repetitive C++ prefix (e.g. `SIMCONNECT_COMM_BUS_BROADCAST_TO_JS` → `JS`).
-   Values must exactly match the SDK C++ definitions — use bit-shift literals (`1 << 0`) for flag enums and composite values for combined flags.

## Recv class conventions

-   Constructor takes a single `RawBuffer` argument.
-   Read fields in the exact order they appear in the C++ struct.
-   Fixed-length string fields: `data.readString(SimConnectConstants.MAX_PATH)`.
-   Variable-length byte payloads that represent text: `data.readBytes(data.remaining()).toString('latin1')`.
-   Typed as `string` (not `Buffer`) when the payload is known to be text.

## callCommBusEvent / payload helpers

-   Methods that send a text payload accept `string | object`. Objects are serialized with `JSON.stringify` before encoding.
-   Encode the resulting string with `Buffer.from(str, 'latin1')` before writing.

## Build & test

```bash
npm install        # install dependencies
npm run build      # compile TypeScript (tsc)
npm test           # run Jest tests
npm run lint       # ESLint + Prettier (via lint-staged on commit)
```

-   `tsconfig.build.json` is used for the production build (outputs to `dist/`).
-   Tests live in `tests/` and use Jest.
-   Pre-commit hook runs `lint-staged` (ESLint fix → Prettier → `tsc --noEmit`).
