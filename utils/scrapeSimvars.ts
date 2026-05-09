import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { outdent } from 'outdent';
import { SimConnectDataType } from '../src/index';

/**
 * Running manually:
 *     npx ts-node .\src\ApiHelper\scripts\scrapeSimvars.ts
 */

type SimvarSpecs = {
    name: string;
    description: string;
    units: string;
    type: SimConnectDataType;
    settable: boolean;
    supportsIndex: boolean;
};

async function clone() {
    const pages = [
        'Aircraft_SimVars/Aircraft_AutopilotAssistant_Variables.htm',
        'Aircraft_SimVars/Aircraft_Brake_Landing_Gear_Variables.htm',
        'Aircraft_SimVars/Aircraft_Control_Variables.htm',
        'Aircraft_SimVars/Aircraft_Electrics_Variables.htm',
        'Aircraft_SimVars/Aircraft_Engine_Variables.htm',
        'Aircraft_SimVars/Aircraft_FlightModel_Variables.htm',
        'Aircraft_SimVars/Aircraft_Fuel_Variables.htm',
        'Aircraft_SimVars/Aircraft_Misc_Variables.htm',
        'Aircraft_SimVars/Aircraft_RadioNavigation_Variables.htm',
        'Aircraft_SimVars/Aircraft_System_Variables.htm',
        'Aircraft_SimVars/Helicopter_Variables.htm',
        'Aircraft_SimVars/Balloon_Variables.htm',
        'Miscellaneous_Variables.htm',
        'Services_Variables.htm',
        'Camera_Variables.htm',
    ];

    const results = await Promise.all(
        pages.map(async url =>
            extractTables(
                `https://docs.flightsimulator.com/msfs2024/html/6_Programming_APIs/SimVars/${url}`
            )
        )
    );

    const allSimvars: { [key: string]: SimvarSpecs } = {};

    results.forEach(page => {
        page.forEach(simvar => {
            allSimvars[simvar.name] = simvar;
        });
    });

    const fileContent = createOutputFile(allSimvars);

    fs.writeFile('src/generated/simvars.ts', fileContent, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

const EXPECTED_COLUMNS = [
    'Simulation Variable',
    'Index',
    'Description',
    'Units',
    'Settable',
] as const;
type ColumnName = (typeof EXPECTED_COLUMNS)[number];

async function extractTables(url: string): Promise<SimvarSpecs[]> {
    const xml = await fetch(url).then(res => res.text());
    const $ = cheerio.load(xml);
    const tables = $('table:has(th:contains("Simulation Variable"))');

    const output: SimvarSpecs[] = [];

    tables.each((_, table) => {
        // Build column name → index map from header row
        const colIndex: Partial<Record<ColumnName, number>> = {};
        $(table)
            .find('tr:has(th)')
            .first()
            .find('th')
            .each((i, th) => {
                const name = $(th).text().trim() as ColumnName;
                if (EXPECTED_COLUMNS.includes(name)) {
                    colIndex[name] = i;
                }
            });

        const missing = EXPECTED_COLUMNS.filter(col => colIndex[col] === undefined);
        if (missing.length > 0) {
            console.warn(`[${url}] Missing columns: ${missing.join(', ')}`);
        }

        $(table)
            .find('tr:has(td)')
            .each((_, row) => {
                const cells = $(row).find('td');
                const get = (col: ColumnName) => cells.eq(colIndex[col] ?? -1);

                const settable = get('Settable').find('span.checkmark_circle_red').length === 0;
                const unitsText = get('Units').text();
                const indexText = get('Index').text();

                const simvarNames = get('Simulation Variable').text().split('\n');
                simvarNames.forEach((name: string) => {
                    const trimmed = name.trim();
                    if (!trimmed) return;
                    output.push({
                        name: trimmed,
                        description: get('Description').html() || '',
                        units: correctUnits(unitsText),
                        type: inferTypeFromUnit(unitsText),
                        settable,
                        supportsIndex: indexText.trim() !== 'N/A',
                    });
                });
            });
    });

    return output;
}

function correctUnits(originalValue: string): string {
    if (originalValue.toUpperCase() === 'STRING') return '';
    if (originalValue.toUpperCase().includes('STRUCT')) return '';
    return originalValue;
}

function inferTypeFromUnit(type: string): SimConnectDataType {
    if (type.includes('Bool')) return SimConnectDataType.INT32;
    if (type.includes('Enum')) return SimConnectDataType.INT32;
    if (type.includes('Mask')) return SimConnectDataType.INT32;
    if (type.includes('String')) {
        if (type.includes('256')) return SimConnectDataType.STRING256;
        if (type.includes('64')) return SimConnectDataType.STRING64;
        if (type.includes('32')) return SimConnectDataType.STRING32;
        if (type.includes('8')) return SimConnectDataType.STRING8;
        return SimConnectDataType.STRINGV;
    }

    return SimConnectDataType.FLOAT64;
}

clone();

function createOutputFile(simvars: { [key: string]: SimvarSpecs }) {
    let output = '';
    Object.values(simvars).forEach(simvar => {
        output += outdent({ trimTrailingNewline: false })`
            ${outdent}
                '${simvar.name}': {
                    name: '${simvar.name}',
                    units: '${simvar.units.split('\n')[0]}',
                    dataType: SimConnectDataType.${SimConnectDataType[simvar.type]},
                    settable: ${simvar.settable},
                    supportsIndex: ${simvar.supportsIndex},
                },
            `;
    });

    return outdent`
        import { SimConnectDataType } from '../enums/SimConnectDataType';
        
        export type PredefinedVariable = {
            name: string;
            units: string;
            dataType: SimConnectDataType;
            settable: boolean;
            supportsIndex: boolean;
        };
        
        export const simvarPredefinitions = {
        ${output}
        } as const satisfies { [key: string]: PredefinedVariable };

        export type SimvarPredefinitions = typeof simvarPredefinitions;
        
    `;
}
