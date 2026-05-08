# Copilot Instructions

## Project overview

`node-simconnect` is a TypeScript/Node.js library that implements the SimConnect binary protocol used by Microsoft Flight Simulator (FSX through MSFS 2024). It communicates with the simulator over a TCP socket using little-endian binary packets.

Official MSFS docs home:
<https://docs.flightsimulator.com/>

## Encoding conventions

- **All strings** (both reading and writing) use **`latin1`** encoding — the same encoding used by `RawBuffer.readString()` / `writeString()`. Never use `utf8`.
- Fixed-length string field lengths vary per field — always check the SDK documentation for the exact size.
- Numbers are little-endian — handled automatically by `RawBuffer` helpers.
- Variable-length text payloads sent as bytes: `Buffer.from(str, 'latin1')`.
- Variable-length text payloads received as bytes: `data.readBytes(n).toString('latin1')`.

## Enum conventions

- File names: `PascalCase.ts` (e.g. `CommBusBroadcastTo.ts`), exported from `src/enums/index.ts`.
- Member names: `SCREAMING_SNAKE_CASE` stripping the repetitive C++ prefix (e.g. `SIMCONNECT_COMM_BUS_BROADCAST_TO_JS` → `JS`, `SIMCONNECT_CAMERA_AVAILABILITY_NOT_ACQUIRED` → `NOT_ACQUIRED`).
- Values must exactly match the SDK C++ definitions — use bit-shift literals (`1 << 0`) for flags and composite expressions for combined values.

## Build & test

```bash
npm install     # install dependencies
npm run build   # compile TypeScript (tsc -p tsconfig.build.json → dist/)
npm test        # run Jest tests
npm run lint    # ESLint + Prettier
```

- Pre-commit hook runs `lint-staged` (ESLint fix → Prettier → `tsc --noEmit`).

## Skills

See [`.github/skills/`](.github/skills/) for reusable Copilot skills.
