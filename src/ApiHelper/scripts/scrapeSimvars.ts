import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { outdent } from 'outdent'; // TODO: this should be part of dev dependencies
import { SimConnectDataType } from '../../index';

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
        'Helicopter_Variables.htm',
        'Camera_Variables.htm',
        'Miscellaneous_Variables.htm',
        'Services_Variables.htm',
    ];

    const results = await Promise.all(
        pages.map(async url =>
            extractTables(`https://docs.flightsimulator.com/html/Programming_Tools/SimVars/${url}`)
        )
    );

    const allSimvars: { [key: string]: SimvarSpecs } = {};

    results.forEach(page => {
        page.forEach(simvar => {
            allSimvars[simvar.name] = simvar;
        });
    });

    const fileContent = createOutputFile(allSimvars);

    fs.writeFile('generated/simvars.ts', fileContent, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

async function extractTables(url: string): Promise<SimvarSpecs[]> {
    const xml = await fetch(url).then(res => res.text());
    const $ = cheerio.load(xml);
    const rows = $('table:has(th:contains("Simulation Variable")) tr:has(td)');

    const output: SimvarSpecs[] = [];

    for (let i = 0; i < rows.length; i++) {
        // Process the rows and create arrays per row
        const cells = $(rows[i]).find('td');
        const settable = $(cells).find('span.checkmark_circle_red').length === 0;

        const simvarNames = $(cells[0]).text().split('\n');
        simvarNames.forEach(name =>
            output.push({
                name: name.trim(),
                description: $(cells[1]).html() || '',
                units: correctUnits($(cells[2]).text()),
                type: inferTypeFromUnit($(cells[2]).text()),
                settable,
            })
        );
    }

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
                /** ${simvar.description} */
                '${simvar.name}': {
                    name: '${simvar.name}',
                    units: '${simvar.units.split('\n')[0]}',
                    dataType: SimConnectDataType.${SimConnectDataType[simvar.type]},
                    settable: ${simvar.settable},
                },
            `;
    });

    return outdent`
        import { SimConnectDataType } from '../dist';
        
        export type PredefinedVariable = {
            name: string;
            units: string;
            dataType: SimConnectDataType;
            settable: boolean;
        };
        
        export const simvarPredefinitions = {
        ${output}
        } as const satisfies { [key: string]: PredefinedVariable };

        export type SimvarPredefinitions = typeof simvarPredefinitions;
        
    `;
}
