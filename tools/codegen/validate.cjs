'use strict';

/**
 * tools/codegen/validate.cjs
 * Validates spec/simconnect.yaml against spec/schema.json and performs
 * semantic cross-checks (duplicate names, unknown type refs, etc.).
 *
 * Usage:  node tools/codegen/validate.cjs [path/to/simconnect.yaml]
 * Exit 0 = valid, exit 1 = validation errors found.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadSpec(specPath) {
    const raw = fs.readFileSync(specPath, 'utf8');
    return yaml.load(raw);
}

function loadSchema(schemaPath) {
    return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
}

/** Minimal JSON Schema validator — checks type and required properties recursively. */
function validateSchema(value, schema, defs, path) {
    const errors = [];

    function resolve(ref) {
        const key = ref.replace('#/definitions/', '');
        return defs[key];
    }

    function check(val, s, p) {
        if (!s) return;
        if (s.$ref) { check(val, resolve(s.$ref), p); return; }

        if (s.oneOf) {
            const matched = s.oneOf.some(sub => {
                const errs = [];
                checkInto(val, sub, p, errs);
                return errs.length === 0;
            });
            if (!matched) errors.push(`${p}: does not match any oneOf schema`);
            return;
        }

        if (s.type === 'object') {
            if (val === null || typeof val !== 'object' || Array.isArray(val)) {
                errors.push(`${p}: expected object, got ${val === null ? 'null' : typeof val}`);
                return;
            }
            if (s.required) {
                for (const key of s.required) {
                    if (!(key in val)) errors.push(`${p}: missing required property "${key}"`);
                }
            }
            if (s.properties) {
                for (const [key, subSchema] of Object.entries(s.properties)) {
                    if (key in val) check(val[key], subSchema, `${p}.${key}`);
                }
            }
            if (s.additionalProperties === false && s.properties) {
                for (const key of Object.keys(val)) {
                    if (!(key in s.properties)) errors.push(`${p}: unexpected property "${key}"`);
                }
            }
            if (typeof s.additionalProperties === 'object') {
                for (const [key, v] of Object.entries(val)) {
                    check(v, s.additionalProperties, `${p}.${key}`);
                }
            }
        } else if (s.type === 'array') {
            if (!Array.isArray(val)) {
                errors.push(`${p}: expected array, got ${typeof val}`);
                return;
            }
            if (s.minItems !== undefined && val.length < s.minItems) {
                errors.push(`${p}: array too short (min ${s.minItems})`);
            }
            if (s.items) {
                val.forEach((item, i) => check(item, s.items, `${p}[${i}]`));
            }
        } else if (s.type === 'string') {
            if (typeof val !== 'string') errors.push(`${p}: expected string, got ${typeof val}`);
            if (s.enum && !s.enum.includes(val)) errors.push(`${p}: "${val}" not in enum`);
        } else if (s.type === 'number') {
            if (typeof val !== 'number') errors.push(`${p}: expected number, got ${typeof val}`);
        } else if (s.type === 'boolean') {
            if (typeof val !== 'boolean') errors.push(`${p}: expected boolean, got ${typeof val}`);
        } else if (s.type === 'null') {
            if (val !== null) errors.push(`${p}: expected null`);
        }
    }

    function checkInto(val, s, p, target) {
        const saved = errors.length;
        check(val, s, p);
        const added = errors.splice(saved);
        target.push(...added);
    }

    check(value, schema, path);
    return errors;
}

// ── Semantic checks ───────────────────────────────────────────────────────────

function semanticCheck(spec) {
    const errors = [];

    const protocolNames = new Set(Object.keys(spec.protocols || {}));
    const recvIdNames = new Set(Object.keys(spec.recv_ids || {}));
    const enumNames = new Set((spec.enums || []).map(e => e.name));
    const flagNames = new Set((spec.flags || []).map(f => f.name));
    const allEnumLike = new Set([...enumNames, ...flagNames]);
    const structNames = new Set((spec.structs || []).map(s => s.name));
    const recvNames = new Set((spec.recv_messages || []).map(r => r.name));
    const encoderNames = new Set((spec.packet_encoders || []).map(p => p.name));

    // Duplicate name checks
    function checkDupes(items, section) {
        const seen = new Set();
        for (const item of items || []) {
            if (seen.has(item.name)) errors.push(`${section}: duplicate name "${item.name}"`);
            seen.add(item.name);
        }
    }
    checkDupes(spec.enums, 'enums');
    checkDupes(spec.flags, 'flags');
    checkDupes(spec.structs, 'structs');
    checkDupes(spec.recv_messages, 'recv_messages');
    checkDupes(spec.packet_encoders, 'packet_encoders');

    // Enum member duplicate checks + compose ref checks
    for (const e of [...(spec.enums || []), ...(spec.flags || [])]) {
        const memberNames = new Set();
        for (const m of e.members || []) {
            if (memberNames.has(m.name)) errors.push(`enum ${e.name}: duplicate member "${m.name}"`);
            memberNames.add(m.name);
            if (m.value && typeof m.value === 'object' && m.value.compose) {
                for (const ref of m.value.compose) {
                    if (!memberNames.has(ref)) {
                        errors.push(`enum ${e.name}.${m.name}: compose ref "${ref}" not yet defined (must appear before this member)`);
                    }
                }
            }
        }
    }

    // Field validator helper
    function checkFields(fields, context, isEncoder = false) {
        for (const f of fields || []) {
            const p = `${context}.${f.name}`;
            if (f.type === 'string' && f.length === undefined) {
                errors.push(`${p}: type=string requires a length`);
            }
            if (f.type === 'bytes' && f.length === undefined && !isEncoder) {
                errors.push(`${p}: type=bytes requires a length`);
            }
            if (f.type === 'enum') {
                if (!f.enum) errors.push(`${p}: type=enum requires enum:`);
                else if (!allEnumLike.has(f.enum)) errors.push(`${p}: unknown enum "${f.enum}"`);
            }
            if (f.type === 'struct') {
                if (!f.struct) errors.push(`${p}: type=struct requires struct:`);
                else if (!structNames.has(f.struct)) errors.push(`${p}: unknown struct "${f.struct}"`);
            }
            if (f.type === 'list') {
                if (!f.count_field) errors.push(`${p}: type=list requires count_field`);
                if (!f.item_type) errors.push(`${p}: type=list requires item_type`);
                else if (!structNames.has(f.item_type)) errors.push(`${p}: unknown item_type "${f.item_type}"`);
            }
            if (f.type === 'array') {
                if (!f.length) errors.push(`${p}: type=array requires length (count)`);
                if (!f.item_type) errors.push(`${p}: type=array requires item_type`);
            }
            if (f.type === 'derived') {
                if (!f.derived) errors.push(`${p}: type=derived requires derived:`);
                if (!f.source_field) errors.push(`${p}: type=derived requires source_field:`);
                if (f.derived === 'enum_name_lookup' || f.derived === 'clamp_enum') {
                    if (!f.enum) errors.push(`${p}: derived=${f.derived} requires enum:`);
                    else if (!allEnumLike.has(f.enum)) errors.push(`${p}: unknown enum "${f.enum}"`);
                }
            }
            // Protocol-conditional length checks
            if (f.length && typeof f.length === 'object' && f.length.since) {
                for (const proto of Object.keys(f.length.since)) {
                    if (!protocolNames.has(proto)) {
                        errors.push(`${p}: length.since references unknown protocol "${proto}"`);
                    }
                }
            }
        }
    }

    // Struct validation
    for (const s of spec.structs || []) {
        if (s.extends && !structNames.has(s.extends)) {
            errors.push(`struct ${s.name}: extends unknown struct "${s.extends}"`);
        }
        checkFields(s.fields, `struct ${s.name}`);
    }

    // Recv validation
    for (const r of spec.recv_messages || []) {
        if (r.handwritten) continue;
        if (r.recv_id !== null && r.recv_id !== undefined && !recvIdNames.has(r.recv_id)) {
            errors.push(`recv ${r.name}: unknown recv_id "${r.recv_id}"`);
        }
        if (r.base) {
            if (!structNames.has(r.base) && !recvNames.has(r.base)) {
                errors.push(`recv ${r.name}: base "${r.base}" not found in structs or recv_messages`);
            }
        }
        if (r.list_field) {
            if (!r.item_type) errors.push(`recv ${r.name}: list_field requires item_type`);
            else if (!structNames.has(r.item_type)) errors.push(`recv ${r.name}: unknown item_type "${r.item_type}"`);
        }
        checkFields(r.fields, `recv ${r.name}`);
    }

    // Packet encoder validation
    for (const p of spec.packet_encoders || []) {
        if (typeof p.opcode !== 'number') errors.push(`encoder ${p.name}: opcode must be a number`);
        if (p.handwritten) continue; // fields are type-signature only, not encoding instructions
        checkFields(p.fields, `encoder ${p.name}`, true);
    }

    return errors;
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
    const specPath = process.argv[2] || path.resolve(__dirname, '../../spec/simconnect.yaml');
    const schemaPath = path.resolve(__dirname, '../../spec/schema.json');

    if (!fs.existsSync(specPath)) {
        console.error(`ERROR: spec file not found: ${specPath}`);
        process.exit(1);
    }
    if (!fs.existsSync(schemaPath)) {
        console.error(`ERROR: schema file not found: ${schemaPath}`);
        process.exit(1);
    }

    let spec;
    try {
        spec = loadSpec(specPath);
    } catch (e) {
        console.error(`ERROR: YAML parse failed: ${e.message}`);
        process.exit(1);
    }

    const schema = loadSchema(schemaPath);

    const schemaErrors = validateSchema(spec, schema, schema.definitions, 'spec');
    const semanticErrors = semanticCheck(spec);
    const allErrors = [...schemaErrors, ...semanticErrors];

    if (allErrors.length > 0) {
        console.error(`Spec validation FAILED (${allErrors.length} error${allErrors.length === 1 ? '' : 's'}):`);
        for (const e of allErrors) console.error(`  • ${e}`);
        process.exit(1);
    }

    console.log(`Spec validation OK — ${specPath}`);
    process.exit(0);
}

main();
