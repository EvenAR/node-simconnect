import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { SimConnectDataType } from '../src/core';

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
    ];

    const results = await Promise.all(
        pages.map(async url =>
            extractTables(`https://docs.flightsimulator.com/html/Programming_Tools/SimVars/${url}`)
        )
    );

    let outpStr = '';

    results.forEach(page => {
        page.forEach(simvar => {
            outpStr += `
    /** ${simvar.description} */
    '${simvar.name}': {
        name: '${simvar.name}',
        units: '${simvar.units.split('\n')[0]}',
        dataType: SimConnectDataType.${SimConnectDataType[simvar.type]},
        settable: ${simvar.settable},
    },
            `;
        });
    });

    const final = `
import { SimConnectDataType } from '..';
import {SimulationVariable} from "../src/wrapper/helpers/simulation-variables-helper";

export type SimvarDefinition = SimulationVariable & {
    settable: boolean,
};

export const simvarDefinitions: {[simvarName: string]: SimvarDefinition} = {
    ${outpStr}
} as const;

export type SimvarName = keyof typeof simvarDefinitions;
    `;

    fs.writeFile('generated/simvars.ts', final, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

async function extractTables(url: string) {
    const xml = await fetch(url).then(res => res.text());
    const $ = cheerio.load(xml);
    const rows = $('table:has(th:contains("Simulation Variable")) tr:has(td)');

    const output: {
        name: string;
        description: string;
        units: string;
        type: SimConnectDataType;
        settable: boolean;
    }[] = [];

    for (let i = 0; i < rows.length; i++) {
        // Process the rows and create arrays per row
        const cells = $(rows[i]).find('td');
        const settable = $(cells).find('span.checkmark_circle_red').length === 0;
        const rowCells = cells.map((_, cell) => $(cell).text().trim()).get();

        const simvarNames = rowCells[0].split('\n');
        simvarNames.forEach(name =>
            output.push({
                name: name.trim(),
                description: rowCells[1],
                units: rowCells[2],
                type: typeFromUnit(rowCells[2]),
                settable,
            })
        );
    }

    return output;
}

function typeFromUnit(type: string): SimConnectDataType {
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
