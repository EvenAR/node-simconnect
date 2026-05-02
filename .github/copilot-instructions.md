# Copilot Instructions

## Project overview

`node-simconnect` is a TypeScript/Node.js library that implements the SimConnect binary protocol used by Microsoft Flight Simulator (FSX through MSFS 2024). It communicates with the simulator over a TCP socket using little-endian binary packets.

## Repository structure

```
src/
  SimConnectConnection.ts    # Main class – all public API methods live here
  SimConnectSocket.ts        # Low-level socket + packet framing; houses RecvID enum
  SimConnectPacketBuilder.ts # Fluent builder for outbound packets
  RawBuffer.ts               # Binary read/write helper used by all Recv* classes
  SimConnectConstants.ts     # Shared constants (e.g. MAX_PATH = 260)
  enums/                     # One file per TypeScript enum, exported via index.ts
  recv/                      # One file per inbound packet type, exported via index.ts
  flags/                     # Bit-flag enums
  datastructures/            # Composite data types
  dto/                       # Data-transfer objects
tests/                       # Jest test suite
```

## Encoding conventions

-   **All strings** (both reading and writing) use **`latin1`** encoding — the same encoding used by `RawBuffer.readString()` / `writeString()`. Never use `utf8`.
-   Fixed-length string fields are written/read with `SimConnectConstants.MAX_PATH` (260 bytes).
-   Numbers are little-endian — handled automatically by `RawBuffer` helpers.
-   Variable-length text payloads sent as bytes: `Buffer.from(str, 'latin1')`.
-   Variable-length text payloads received as bytes: `data.readBytes(n).toString('latin1')`.

## Enum conventions

-   File names: `PascalCase.ts` (e.g. `CommBusBroadcastTo.ts`), exported from `src/enums/index.ts`.
-   Member names: short `PascalCase` stripping the repetitive C++ prefix (e.g. `SIMCONNECT_COMM_BUS_BROADCAST_TO_JS` → `JS`).
-   Values must exactly match the SDK C++ definitions — use bit-shift literals (`1 << 0`) for flags and composite expressions for combined values.

## Build & test

```bash
npm install     # install dependencies
npm run build   # compile TypeScript (tsc -p tsconfig.build.json → dist/)
npm test        # run Jest tests
npm run lint    # ESLint + Prettier
```

-   Pre-commit hook runs `lint-staged` (ESLint fix → Prettier → `tsc --noEmit`).

## Skills / prompt files

See [`.github/prompts/`](.github/prompts/) for reusable Copilot prompt files (skills).
