'use strict';

/**
 * tools/codegen/ts-gen.cjs
 * Generates TypeScript source files from spec/simconnect.yaml into src/generated/.
 *
 * Usage:  node tools/codegen/ts-gen.cjs [path/to/simconnect.yaml] [outputDir]
 * Defaults: spec/simconnect.yaml → src/generated/
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ── Helpers ───────────────────────────────────────────────────────────────────

const HEADER = `// AUTO-GENERATED — do not edit by hand.
// Re-generate with:  node tools/codegen/ts-gen.cjs
`;

function writeFile(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
}

/** Convert a numeric YAML value to a TypeScript literal (preserve hex if > 9) */
function numToTs(v) {
    if (typeof v === 'number') {
        if (v > 9 || v < 0) {
            const hex = (v >>> 0).toString(16);
            return `0x${hex.toUpperCase()}`;
        }
        return String(v);
    }
    // string expression like "1 << 0"
    return String(v);
}

/** Resolve a protocol-conditional length to a TS expression.
 *  If just a number, returns the number. Otherwise returns a ternary chain. */
function lengthExpr(length, protocolVar) {
    if (typeof length === 'number') return String(length);
    // { default: N, since: { ProtocolName: M } }
    const { default: def, since } = length;
    let expr = String(def);
    for (const [proto, len] of Object.entries(since)) {
        expr = `${protocolVar} >= Protocol.${proto} ? ${len} : ${expr}`;
    }
    return expr;
}

// ── Read expressions for each type ───────────────────────────────────────────

function readExpr(field, ctx) {
    switch (field.type) {
        case 'int8': return 'data.readInt8()';
        case 'int16': return 'data.readInt16()';
        case 'int32': return 'data.readInt32()';
        case 'uint32': return `data.readUint32()${field.ts_type ? ` as ${field.ts_type}` : ''}`;
        case 'int64': return 'data.readInt64()';
        case 'uint64': return 'data.readUint64()';
        case 'float32': return 'data.readFloat32()';
        case 'float64': return 'data.readFloat64()';
        case 'bool_int32': return 'data.readInt32() !== 0';
        case 'bool_uint32': return 'data.readUint32() !== 0';
        case 'string': {
            const le = lengthExpr(field.length, ctx.protocolVar || 'protocol');
            return `data.readString(${le})`;
        }
        case 'stringv': return 'data.readStringV()';
        case 'bytes': return `data.readBytes(${field.length})`;
        case 'enum': return `data.readUint32() as ${field.enum}`;
        case 'struct': {
            const needsProto = ctx.protocolAwareStructs && ctx.protocolAwareStructs.has(field.struct);
            const protoArg = needsProto ? `, ${ctx.protocolVar || 'protocol'}` : '';
            if (ctx.simconnectDataStructs && ctx.simconnectDataStructs.has(field.struct)) {
                // SimConnectData: instantiate then readFrom
                return null; // handled specially
            }
            return `new ${field.struct}(data${protoArg})`;
        }
        case 'rawbuffer': return null; // assigned directly, handled separately
        case 'derived': return null; // no bytes, handled separately
        case 'array': return null; // handled separately
        case 'list': return null; // handled separately
        default: return `/* unknown type ${field.type} */null`;
    }
}

// ── TS type for each field type ───────────────────────────────────────────────

function tsType(field, ctx) {
    if (field.ts_type) return field.ts_type;
    switch (field.type) {
        case 'int8':
        case 'int16':
        case 'int32':
        case 'uint32':
        case 'int64':
        case 'float32':
        case 'float64': return 'number';
        case 'uint64': return 'bigint';
        case 'bool_int32':
        case 'bool_uint32': return 'boolean';
        case 'string': return 'string';
        case 'stringv': return 'string';
        case 'bytes': return 'Buffer';
        case 'enum': return field.enum;
        case 'struct': return field.struct;
        case 'rawbuffer': return 'RawBuffer';
        case 'derived': return 'string'; // enum_name_lookup returns string; clamp_enum returns enum type
        case 'array': return `[${Array.from({length: field.length}, () => 'number').join(', ')}]`;
        case 'list': return `${field.item_type}[]`;
        default: return 'unknown';
    }
}

function tsDerivedType(field) {
    if (field.derived === 'clamp_enum') return field.enum;
    return 'string'; // enum_name_lookup
}

// ── Generate field read lines for constructor body ────────────────────────────

function genFieldReads(fields, indent, ctx) {
    const lines = [];
    const dv = ctx.dataVar || 'data';
    for (const f of fields) {
        if (f.type === 'derived') {
            if (f.derived === 'enum_name_lookup') {
                lines.push(`${indent}this.${f.name} = ${f.enum}[this.${f.source_field}] ?? ${f.fallback};`);
            } else if (f.derived === 'clamp_enum') {
                // Find max enum value
                const enumMax = ctx.enumMaxVal[f.enum];
                const maxExpr = enumMax !== undefined ? String(enumMax) : `/* max ${f.enum} */`;
                lines.push(`${indent}this.${f.name} = this.${f.source_field} < 0 || this.${f.source_field} > ${maxExpr} ? ${f.fallback} : this.${f.source_field} as ${f.enum};`);
            }
        } else if (f.type === 'array') {
            const items = Array.from({length: f.length}, () => `${dv}.readUint32()`);
            lines.push(`${indent}this.${f.name} = [${items.join(', ')}];`);
        } else if (f.type === 'list') {
            // handled at recv level
        } else if (f.type === 'rawbuffer') {
            lines.push(`${indent}this.${f.name} = ${dv};`);
        } else if (f.type === 'struct' && ctx.simconnectDataStructs && ctx.simconnectDataStructs.has(f.struct)) {
            lines.push(`${indent}this.${f.name} = new ${f.struct}();`);
            lines.push(`${indent}this.${f.name}.readFrom(${dv});`);
        } else {
            const expr = readExpr(f, ctx);
            if (expr !== null) {
                // Replace generic 'data.' with the actual variable name
                const line = expr.replace(/\bdata\./g, `${dv}.`);
                lines.push(`${indent}this.${f.name} = ${line};`);
            }
        }
    }
    return lines;
}

// ── Generate field write lines for writeTo ────────────────────────────────────

function genFieldWrites(fields, indent, ctx) {
    const lines = [];
    for (const f of fields) {
        if (f.type === 'derived') continue; // no bytes written
        if (f.type === 'array') {
            for (let i = 0; i < f.length; i++) {
                lines.push(`${indent}packetBuilder.putUint32(this.${f.name}[${i}]);`);
            }
        } else if (f.type === 'list') {
            // no writeTo for lists
        } else if (f.type === 'struct' && ctx.simconnectDataStructs && ctx.simconnectDataStructs.has(f.struct)) {
            lines.push(`${indent}this.${f.name}.writeTo(packetBuilder);`);
        } else {
            const wl = writeStmt(f, `this.${f.name}`, indent, ctx);
            if (wl) lines.push(wl);
        }
    }
    return lines;
}

function writeStmt(field, valExpr, indent, ctx) {
    const b = ctx.builderVar || 'packetBuilder';
    switch (field.type) {
        case 'int8': return `${indent}${b}.putInt8(${valExpr});`;
        case 'int16': return `${indent}${b}.putInt16(${valExpr});`;
        case 'int32': return `${indent}${b}.putInt32(${valExpr});`;
        case 'uint32': return `${indent}${b}.putUint32(${valExpr});`;
        case 'int64': return `${indent}${b}.putInt64(${valExpr});`;
        case 'uint64': return `${indent}${b}.putUint64(${valExpr});`;
        case 'float32': return `${indent}${b}.putFloat32(${valExpr});`;
        case 'float64': return `${indent}${b}.putFloat64(${valExpr});`;
        case 'bool_int32': return `${indent}${b}.putInt32(${valExpr} ? 1 : 0);`;
        case 'bool_uint32': return `${indent}${b}.putUint32(${valExpr} ? 1 : 0);`;
        case 'string': {
            const le = lengthExpr(field.length, ctx.protocolVar || 'protocol');
            return `${indent}${b}.putString(${valExpr}, ${le});`;
        }
        case 'enum': return `${indent}${b}.putUint32(${valExpr});`;
        case 'struct': return `${indent}${valExpr}.writeTo(${b});`;
        default: return null;
    }
}

// ── Build lookup maps from spec ───────────────────────────────────────────────

function buildCtx(spec) {
    const simconnectDataStructs = new Set();
    const protocolAwareStructs = new Set();
    const enumMaxVal = {};

    for (const s of spec.structs || []) {
        if (s.simconnect_data) simconnectDataStructs.add(s.name);
        if (s.protocol_aware) protocolAwareStructs.add(s.name);
    }

    for (const e of [...(spec.enums || []), ...(spec.flags || [])]) {
        let max = 0;
        for (const m of e.members || []) {
            const v = typeof m.value === 'number' ? m.value : 0;
            if (v > max) max = v;
        }
        enumMaxVal[e.name] = max;
    }

    return { simconnectDataStructs, protocolAwareStructs, enumMaxVal, protocolVar: 'protocol' };
}

// ── Enum generation ───────────────────────────────────────────────────────────

function genEnum(e) {
    const isConst = e.const_enum ? 'const ' : '';
    const lines = [HEADER, `export ${isConst}enum ${e.name} {`];

    const resolved = {}; // name → numeric value for compose resolution
    for (const m of e.members) {
        if (typeof m.value === 'object' && m.value.compose) {
            const val = m.value.compose.reduce((acc, ref) => acc | (resolved[ref] || 0), 0);
            resolved[m.name] = val;
            lines.push(`    ${m.name} = ${numToTs(val)},`);
        } else if (typeof m.value === 'string') {
            // Evaluate simple bit-shift expressions at gen time
            const evaluated = evaluateExpr(m.value);
            resolved[m.name] = evaluated;
            lines.push(`    ${m.name} = ${m.value},`);
        } else {
            resolved[m.name] = m.value;
            lines.push(`    ${m.name} = ${numToTs(m.value)},`);
        }
    }

    lines.push('}');
    return lines.join('\n') + '\n';
}

function evaluateExpr(expr) {
    // Safe evaluation of simple expressions like "1 << 3"
    try {
        // Only allow digits, spaces, and shift/bitwise operators
        if (/^[\d\s|&^~<>+\-*()]+$/.test(expr)) {
            return Function('"use strict"; return (' + expr + ')')();
        }
    } catch {}
    return 0;
}

// ── Flag generation (same as enum) ───────────────────────────────────────────

function genFlag(f) {
    return genEnum(f);
}

// ── Struct imports ────────────────────────────────────────────────────────────

function collectStructImports(fields, ctx, fromDir) {
    const imports = new Set();
    for (const f of fields || []) {
        if (f.type === 'struct') imports.add(f.struct);
        if (f.type === 'enum') imports.add(f.enum);
    }
    return imports;
}

// ── SimConnectData DTO generation ─────────────────────────────────────────────

function genSimConnectDataStruct(s, spec, ctx) {
    const lines = [HEADER];
    const imports = new Set();

    // Collect imports
    for (const f of s.fields || []) {
        if (f.type === 'struct') imports.add(f.struct);
        if (f.type === 'enum') imports.add(f.enum);
    }

    lines.push(`import { RawBuffer } from '../../RawBuffer';`);
    lines.push(`import { SimConnectPacketBuilder } from '../../SimConnectPacketBuilder';`);
    lines.push(`import { SimConnectData } from '../../dto/SimConnectData';`);

    for (const imp of imports) {
        if (ctx.simconnectDataStructs.has(imp)) {
            lines.push(`import { ${imp} } from './${imp}';`);
        } else if (ctx.protocolAwareStructs.has(imp)) {
            lines.push(`import { ${imp} } from '../datastructures/${imp}';`);
        } else {
            lines.push(`import { ${imp} } from '../enums/${imp}';`);
        }
    }

    lines.push('');
    lines.push(`export class ${s.name} implements SimConnectData {`);

    // Field declarations with default values
    for (const f of s.fields) {
        const t = tsType(f, ctx);
        let def = defaultVal(f, ctx);
        lines.push(`    ${f.name}: ${t} = ${def};`);
    }

    // readFrom
    lines.push('');
    lines.push(`    readFrom(buffer: RawBuffer) {`);
    for (const line of genFieldReads(s.fields, '        ', { ...ctx, protocolVar: 'buffer', dataVar: 'buffer' })) {
        lines.push(line);
    }
    lines.push(`    }`);

    // writeTo
    lines.push('');
    lines.push(`    writeTo(packetBuilder: SimConnectPacketBuilder) {`);
    for (const line of genFieldWrites(s.fields, '        ', ctx)) {
        lines.push(line);
    }
    lines.push(`    }`);

    lines.push('}');
    return lines.join('\n') + '\n';
}

function defaultVal(f, ctx) {
    switch (f.type) {
        case 'bool_int32':
        case 'bool_uint32': return 'false';
        case 'string': return "''";
        case 'stringv': return "''";
        case 'uint64': return '0n';
        case 'bytes': return `Buffer.alloc(${f.length})`;
        case 'enum': return `0 as ${f.enum}`;
        case 'struct': {
            if (ctx.simconnectDataStructs && ctx.simconnectDataStructs.has(f.struct)) {
                return `new ${f.struct}()`;
            }
            return `null as unknown as ${f.struct}`;
        }
        case 'array': return `[${Array.from({length: f.length}, () => '0').join(', ')}] as [${Array.from({length: f.length}, () => 'number').join(', ')}]`;
        case 'list': return '[]';
        default: return '0';
    }
}

// ── Read-only struct / datastructure generation ───────────────────────────────

function genReadonlyStruct(s, spec, ctx) {
    const lines = [HEADER];
    const imports = new Set();
    const needsProtocol = s.protocol_aware || false;

    // Collect imports
    for (const f of s.fields || []) {
        if (f.type === 'struct') imports.add(f.struct);
        if (f.type === 'enum') imports.add(f.enum);
    }
    if (s.extends) imports.add(s.extends); // parent class

    lines.push(`import { RawBuffer } from '../../RawBuffer';`);
    if (needsProtocol) {
        lines.push(`import { Protocol } from '../enums/Protocol';`);
    }

    for (const imp of imports) {
        if (ctx.simconnectDataStructs.has(imp)) {
            lines.push(`import { ${imp} } from '../dto/${imp}';`);
        } else if (ctx.protocolAwareStructs.has(imp) || imp === s.extends || isStructName(imp, spec)) {
            lines.push(`import { ${imp} } from './${imp}';`);
        } else {
            lines.push(`import { ${imp} } from '../enums/${imp}';`);
        }
    }

    lines.push('');

    const extendsClause = s.extends ? ` extends ${s.extends}` : '';
    lines.push(`export class ${s.name}${extendsClause} {`);

    // Static flags
    if (s.static_flags) {
        for (const [name, val] of Object.entries(s.static_flags)) {
            lines.push(`    public static ${name} = ${numToTs(val)};`);
        }
        lines.push('');
    }

    // Field declarations
    for (const f of s.fields || []) {
        const t = tsType(f, ctx);
        lines.push(`    ${f.name}: ${t};`);
    }

    // Constructor
    const protoParam = needsProtocol ? ', protocol: Protocol' : '';
    const superCall = s.extends
        ? (ctx.protocolAwareStructs.has(s.extends) ? '        super(data, protocol);' : '        super(data);')
        : null;

    lines.push('');
    lines.push(`    constructor(data: RawBuffer${protoParam}) {`);
    if (superCall) lines.push(superCall);

    for (const line of genFieldReads(s.fields || [], '        ', { ...ctx, protocolVar: 'protocol' })) {
        lines.push(line);
    }

    lines.push(`    }`);

    // hasFlag for FacilityVOR
    if (s.static_flags) {
        lines.push('');
        lines.push(`    hasFlag(flag: number): boolean {`);
        lines.push(`        return (this.flags & flag) !== 0;`);
        lines.push(`    }`);
        for (const name of Object.keys(s.static_flags)) {
            // HAS_NAV_SIGNAL → hasNavSignal, HAS_DME → hasDme
            const words = name.split('_').filter(w => w !== 'HAS');
            const methodName = 'has' + words.map(w => w[0] + w.slice(1).toLowerCase()).join('');
            lines.push('');
            lines.push(`    ${methodName}(): boolean {`);
            lines.push(`        return this.hasFlag(${s.name}.${name});`);
            lines.push(`    }`);
        }
    }

    lines.push('}');
    return lines.join('\n') + '\n';
}

// ── Recv message generation ───────────────────────────────────────────────────

function genRecvMessage(r, spec, ctx) {
    const lines = [HEADER];
    const imports = new Set();
    const needsProtocol = r.protocol_aware || false;
    const hasBase = !!r.base;
    const isList = !!r.list_field;
    const hasOwnFields = (r.fields || []).length > 0;

    // Collect imports
    for (const f of r.fields || []) {
        if (f.type === 'struct') imports.add(f.struct);
        if (f.type === 'enum') imports.add(f.enum);
        if (f.type === 'derived' && f.enum) imports.add(f.enum);
    }
    if (r.base) imports.add(r.base);
    if (r.item_type) imports.add(r.item_type);

    lines.push(`import { RawBuffer } from '../../RawBuffer';`);
    if (needsProtocol) {
        lines.push(`import { Protocol } from '../enums/Protocol';`);
    }

    for (const imp of [...imports]) {
        if (imp === r.base || isRecvName(imp, spec)) {
            lines.push(`import { ${imp} } from './${imp}';`);
        } else if (ctx.simconnectDataStructs.has(imp)) {
            lines.push(`import { ${imp} } from '../dto/${imp}';`);
        } else if (ctx.protocolAwareStructs.has(imp) || isStructName(imp, spec)) {
            lines.push(`import { ${imp} } from '../datastructures/${imp}';`);
        } else {
            lines.push(`import { ${imp} } from '../enums/${imp}';`);
        }
    }

    lines.push('');

    const extendsClause = hasBase ? ` extends ${r.base}` : '';
    lines.push(`export class ${r.name}${extendsClause} {`);

    // Own field declarations (non-list-field)
    for (const f of r.fields || []) {
        const t = f.type === 'derived' ? tsDerivedType(f) : tsType(f, ctx);
        lines.push(`    ${f.name}: ${t};`);
    }
    if (isList) {
        lines.push(`    ${r.list_field}: ${r.item_type}[];`);
    }

    // Constructor
    const protoParam = needsProtocol ? ', protocol: Protocol' : '';
    // Super call uses protocol only if the base class is also protocol_aware
    const baseIsProtocolAware = hasBase && (
        ctx.protocolAwareStructs.has(r.base) ||
        (spec.recv_messages || []).some(rm => rm.name === r.base && rm.protocol_aware)
    );
    const superCall = hasBase
        ? (baseIsProtocolAware ? `        super(data, protocol);` : `        super(data);`)
        : null;

    lines.push('');
    lines.push(`    constructor(data: RawBuffer${protoParam}) {`);
    if (superCall) lines.push(superCall);

    if (hasOwnFields) {
        for (const line of genFieldReads(r.fields, '        ', { ...ctx, protocolVar: 'protocol' })) {
            lines.push(line);
        }
    }

    if (isList) {
        const itemProtoArg = (ctx.protocolAwareStructs.has(r.item_type)) ? ', protocol' : '';
        lines.push(`        this.${r.list_field} = [];`);
        lines.push(`        for (let i = 0; i < this.arraySize; i++) {`);
        lines.push(`            this.${r.list_field}.push(new ${r.item_type}(data${itemProtoArg}));`);
        lines.push(`        }`);
    }

    lines.push(`    }`);
    lines.push('}');
    return lines.join('\n') + '\n';
}

function isRecvName(name, spec) {
    return (spec.recv_messages || []).some(r => r.name === name);
}

function isStructName(name, spec) {
    return (spec.structs || []).some(s => s.name === name);
}

// ── Encoder-specific helpers ──────────────────────────────────────────────────

/** TypeScript type for a packet-encoder field in the method signature */
function encTsType(field) {
    switch (field.type) {
        case 'int8': case 'int16': case 'int32': case 'uint32': case 'int64':
        case 'float32': case 'float64': case 'byte': return 'number';
        case 'uint64': return 'bigint';
        case 'bool_int32': case 'bool_uint32': case 'bool_byte': return 'boolean';
        case 'string': case 'stringv': return 'string';
        case 'string256': return field.nullable ? 'string | null' : 'string';
        case 'string256_nullable': return 'string | null';
        case 'bytes': return 'Buffer';
        case 'rawbuffer': return field.nullable ? 'RawBuffer | null' : 'RawBuffer';
        case 'array': {
            const primMap = { uint32: 'number', uint64: 'bigint', float32: 'number', float64: 'number', string: 'string' };
            return `${primMap[field.item_type] || field.item_type}[]`;
        }
        case 'float64_or_string': return 'number | string';
        case 'raw_or_simdata': return '{ buffer: RawBuffer; arrayCount: number; tagged: boolean } | SimConnectData[]';
        case 'enum': return field.enum;
        case 'struct': return field.struct;
        case 'const_uint32': return null; // no param generated
        default: return 'unknown';
    }
}

/** Default value expression for an optional encoder field */
function encDefault(field) {
    if (Object.prototype.hasOwnProperty.call(field, 'default')) {
        const v = field.default;
        if (typeof v === 'string') return `'${v}'`;
        if (typeof v === 'boolean') return String(v);
        return String(v);
    }
    if (field.default_constant) return `SimConnectConstants.${field.default_constant}`;
    if (field.default_enum) return `${field.enum}.${field.default_enum}`;
    return 'undefined';
}

/** Write statement for a single encoder field, writing to `packet` variable */
function encWriteStmt(field, indent) {
    const b = 'packet';
    const v = field.name;
    switch (field.type) {
        case 'int8':  return `${indent}${b}.putInt8(${v});`;
        case 'int16': return `${indent}${b}.putInt16(${v});`;
        case 'int32': return `${indent}${b}.putInt32(${v});`;
        case 'uint32': return `${indent}${b}.putUint32(${v});`;
        case 'int64': return `${indent}${b}.putInt64(${v});`;
        case 'uint64': return `${indent}${b}.putUint64(${v});`;
        case 'float32': return `${indent}${b}.putFloat32(${v});`;
        case 'float64': return `${indent}${b}.putFloat64(${v});`;
        case 'bool_int32': return `${indent}${b}.putInt32(${v} ? 1 : 0);`;
        case 'bool_uint32': return `${indent}${b}.putUint32(${v} ? 1 : 0);`;
        case 'bool_byte': return `${indent}${b}.putByte(${v} ? 1 : 0);`;
        case 'byte': return `${indent}${b}.putByte(${v});`;
        case 'string256':
        case 'string256_nullable': return `${indent}${b}.putString256(${v});`;
        case 'string': return `${indent}${b}.putString(${v}, ${field.length});`;
        case 'bytes': return `${indent}${b}.putBytes(${v});`;
        case 'enum': return `${indent}${b}.putUint32(${v});`;
        case 'struct': return `${indent}${v}.writeTo(${b});`;
        case 'const_uint32': return `${indent}${b}.putUint32(${field.value});`;
        default: return `${indent}/* unknown encoder type: ${field.type} */`;
    }
}

/** Generate one method body for SimConnectApiBase */
function genApiMethod(enc) {
    const I = '    ';   // class indent (4 spaces)
    const II = '        '; // method body indent (8 spaces)
    const lines = [];

    const fields = enc.fields || [];
    // Only fields that produce a parameter (exclude const_uint32)
    const paramFields = fields.filter(f => f.type !== 'const_uint32');

    const paramParts = paramFields.map(f => {
        const tsT = encTsType(f);
        if (f.optional) {
            return `${f.name} = ${encDefault(f)}`;
        }
        return `${f.name}: ${tsT}`;
    });

    const returnType = enc.returns_void ? 'void' : 'number';
    lines.push(`${I}${enc.name}(${paramParts.join(', ')}): ${returnType} {`);

    if (enc.min_protocol) {
        lines.push(`${II}if (this._ourProtocol < Protocol.${enc.min_protocol}) throw Error(BAD_VERSION);`);
    }

    if (fields.length === 0) {
        const ret = enc.returns_void ? '' : 'return ';
        lines.push(`${II}${ret}this._buildAndSend(this._beginPacket(${numToTs(enc.opcode)}));`);
    } else {
        lines.push(`${II}const packet = this._beginPacket(${numToTs(enc.opcode)});`);
        for (const f of fields) {
            lines.push(encWriteStmt(f, II));
        }
        const ret = enc.returns_void ? '' : 'return ';
        lines.push(`${II}${ret}this._buildAndSend(packet);`);
    }

    lines.push(`${I}}`);
    return lines;
}

// ── SimConnectApiBase generation ───────────────────────────────────────────────

function genApiBase(spec, ctx) {
    const encoders = (spec.packet_encoders || []).filter(e => !e.handwritten);
    const handwrittenWithFields = (spec.packet_encoders || []).filter(e => e.handwritten && e.fields && e.fields.length > 0);

    // Collect all imports needed
    const enumImports = new Set(['Protocol']);
    const structDtoImports = new Set();
    const structDsImports = new Set();
    let needsConstants = false;
    let needsRawBuffer = false;
    let needsSimConnectData = false;

    for (const enc of encoders) {
        for (const f of enc.fields || []) {
            if (f.type === 'enum') enumImports.add(f.enum);
            if (f.type === 'struct') {
                if (ctx.simconnectDataStructs.has(f.struct)) {
                    structDtoImports.add(f.struct);
                } else {
                    structDsImports.add(f.struct);
                }
            }
            if (f.default_constant) needsConstants = true;
            if (f.default_enum && f.enum) enumImports.add(f.enum);
        }
    }

    for (const enc of handwrittenWithFields) {
        for (const f of enc.fields || []) {
            if (f.type === 'enum') enumImports.add(f.enum);
            if (f.type === 'rawbuffer' || f.type === 'raw_or_simdata') needsRawBuffer = true;
            if (f.type === 'raw_or_simdata') needsSimConnectData = true;
        }
    }

    const lines = [HEADER];
    lines.push(`import { EventEmitter } from 'events';`);
    lines.push(`import { SimConnectPacketBuilder } from '../SimConnectPacketBuilder';`);
    if (needsRawBuffer) lines.push(`import { RawBuffer } from '../RawBuffer';`);
    if (needsSimConnectData) lines.push(`import type { SimConnectData } from '../dto/SimConnectData';`);
    for (const e of [...enumImports].sort()) {
        lines.push(`import { ${e} } from './enums/${e}';`);
    }
    for (const s of [...structDtoImports].sort()) {
        lines.push(`import { ${s} } from './dto/${s}';`);
    }
    for (const s of [...structDsImports].sort()) {
        lines.push(`import { ${s} } from './datastructures/${s}';`);
    }
    if (needsConstants) {
        lines.push(`import { SimConnectConstants } from './SimConnectConstants';`);
    }
    lines.push('');
    lines.push(`const BAD_VERSION = 'Unsupported protocol version';`);
    lines.push('');
    lines.push(`export abstract class SimConnectApiBase extends EventEmitter {`);
    lines.push(`    protected abstract _ourProtocol: Protocol;`);
    lines.push(`    protected abstract _beginPacket(packetId: number): SimConnectPacketBuilder;`);
    lines.push(`    protected abstract _buildAndSend(builder: SimConnectPacketBuilder): number;`);

    for (const enc of handwrittenWithFields) {
        const params = (enc.fields || []).map(f => {
            const tsT = encTsType(f);
            if (f.variadic) return `...${f.name}: ${tsT}[]`;
            if (f.optional) return `${f.name}?: ${tsT}`;
            return `${f.name}: ${tsT}`;
        }).join(', ');
        const returnType = enc.returns_void ? 'void' : 'number';
        lines.push('');
        lines.push(`    abstract ${enc.name}(${params}): ${returnType};`);
    }

    for (const enc of encoders) {
        lines.push('');
        lines.push(...genApiMethod(enc));
    }

    lines.push('}');
    return lines.join('\n') + '\n';
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

// ── Constants generation ───────────────────────────────────────────────────────

function genConstants(constants) {
    const lines = [HEADER];
    lines.push(`export const SimConnectConstants = {`);
    for (const [name, val] of Object.entries(constants)) {
        lines.push(`    ${name}: ${numToTs(val)},`);
    }
    lines.push(`} as const;`);
    return lines.join('\n') + '\n';
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
    const repoRoot = path.resolve(__dirname, '../..');
    const specPath = process.argv[2] || path.join(repoRoot, 'spec/simconnect.yaml');
    const outDir = process.argv[3] || path.join(repoRoot, 'src/generated');

    const spec = yaml.load(fs.readFileSync(specPath, 'utf8'));
    const ctx = buildCtx(spec);

    // ── Enums ────────────────────────────────────────────────────────────────
    const enumIndexExports = [];
    for (const e of spec.enums || []) {
        const content = genEnum(e);
        writeFile(path.join(outDir, 'enums', `${e.name}.ts`), content);
        enumIndexExports.push(e.name);
    }
    for (const f of spec.flags || []) {
        const content = genFlag(f);
        writeFile(path.join(outDir, 'enums', `${f.name}.ts`), content);
        enumIndexExports.push(f.name);
    }
    const enumIndex = [HEADER, ...enumIndexExports.map(n => `export * from './${n}';`), ''].join('\n');
    writeFile(path.join(outDir, 'enums', 'index.ts'), enumIndex);
    console.log(`Generated ${enumIndexExports.length} enum/flag files`);

    // ── DTOs (SimConnectData) ────────────────────────────────────────────────
    const dtoNames = [];
    for (const s of spec.structs || []) {
        if (!s.simconnect_data) continue;
        const content = genSimConnectDataStruct(s, spec, ctx);
        writeFile(path.join(outDir, 'dto', `${s.name}.ts`), content);
        dtoNames.push(s.name);
    }
    const dtoIndex = [HEADER, ...dtoNames.map(n => `export * from './${n}';`), ''].join('\n');
    writeFile(path.join(outDir, 'dto', 'index.ts'), dtoIndex);
    console.log(`Generated ${dtoNames.length} DTO files`);

    // ── Datastructures (read-only) ───────────────────────────────────────────
    const dsNames = [];
    for (const s of spec.structs || []) {
        if (s.simconnect_data) continue;
        const content = genReadonlyStruct(s, spec, ctx);
        writeFile(path.join(outDir, 'datastructures', `${s.name}.ts`), content);
        dsNames.push(s.name);
    }
    const dsIndex = [HEADER, ...dsNames.map(n => `export * from './${n}';`), ''].join('\n');
    writeFile(path.join(outDir, 'datastructures', 'index.ts'), dsIndex);
    console.log(`Generated ${dsNames.length} datastructure files`);

    // ── Recv messages ────────────────────────────────────────────────────────
    const recvNames = [];
    for (const r of spec.recv_messages || []) {
        if (r.handwritten) continue;
        const content = genRecvMessage(r, spec, ctx);
        writeFile(path.join(outDir, 'recv', `${r.name}.ts`), content);
        recvNames.push(r.name);
    }
    const recvIndex = [HEADER, ...recvNames.map(n => `export * from './${n}';`), ''].join('\n');
    writeFile(path.join(outDir, 'recv', 'index.ts'), recvIndex);
    console.log(`Generated ${recvNames.length} recv message files`);

    // ── SimConnectApiBase ────────────────────────────────────────────────────
    const apiBaseContent = genApiBase(spec, ctx);
    writeFile(path.join(outDir, 'SimConnectApiBase.ts'), apiBaseContent);
    const generatedCount = (spec.packet_encoders || []).filter(e => !e.handwritten).length;
    const handwrittenCount = (spec.packet_encoders || []).filter(e => e.handwritten).length;
    const abstractCount = (spec.packet_encoders || []).filter(e => e.handwritten && e.fields && e.fields.length > 0).length;
    console.log(`Generated SimConnectApiBase.ts (${generatedCount} concrete, ${abstractCount} abstract, ${handwrittenCount - abstractCount} handwritten skipped)`);

    // ── Constants ────────────────────────────────────────────────────────────
    const constantsContent = genConstants(spec.constants || {});
    writeFile(path.join(outDir, 'SimConnectConstants.ts'), constantsContent);
    console.log('Generated SimConnectConstants.ts');

    // ── Top-level index ──────────────────────────────────────────────────────
    const topIndex = [
        HEADER,
        `export * from './enums/index';`,
        `export * from './dto/index';`,
        `export * from './datastructures/index';`,
        `export * from './recv/index';`,
        `export * from './SimConnectApiBase';`,
        `export * from './SimConnectConstants';`,
        '',
    ].join('\n');
    writeFile(path.join(outDir, 'index.ts'), topIndex);

    console.log(`\nAll files written to ${outDir}`);
}

main();
