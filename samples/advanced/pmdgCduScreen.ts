/**
 * Prints the text that is currently displayed on the CDU of the PMDG 737
 * (captain side), and types "ABC" into the scratchpad using direct event
 * triggering.
 *
 * Assumes that CDU data broadcast is enabled in the PMDG 737 config.
 */

import {
    ClientDataPeriod,
    ClientDataRequestFlag,
    EventFlag,
    open,
    Protocol,
    RawBuffer,
    SimConnectConstants,
} from '../../dist';

// These consts were found in PMDG_NG3_SDK.h
const PMDG_NG3_CDU_0_NAME = 'PMDG_NG3_CDU_0';
const PMDG_NG3_CDU_0_ID = 0x4e473335;
const PMDG_NG3_CDU_0_DEFINITION = 0x4e473338;
const CDU_COLUMNS = 24;
const CDU_ROWS = 14;
const THIRD_PARTY_EVENT_ID_MIN = 0x00011000;

// Based on the PMDG_NG3_CDU_Screen struct found in PMDG_NG3_SDK.h. There are 3 bytes per character + 1 byte which tells if the CDU is powered.
const SCREEN_STATE_SIZE = CDU_COLUMNS * CDU_ROWS * (1 + 1 + 1) + 1;

// These event IDs are found in PMDG_NG3_SDK.h
enum PmdgEventID {
    CDU_A = THIRD_PARTY_EVENT_ID_MIN + 573,
    CDU_B = THIRD_PARTY_EVENT_ID_MIN + 574,
    CDU_C = THIRD_PARTY_EVENT_ID_MIN + 575,
}

enum MyEventID {
    CDU_A,
    CDU_B,
    CDU_C,
}

const enum RequestID {
    CDU_SCREEN_DATA_REQUEST,
}

(async function readCduScreen() {
    const { handle } = await open('My app', Protocol.KittyHawk);
    console.log('Connected!');

    handle.mapClientDataNameToID(PMDG_NG3_CDU_0_NAME, PMDG_NG3_CDU_0_ID);
    handle.addToClientDataDefinition(PMDG_NG3_CDU_0_DEFINITION, 0, SCREEN_STATE_SIZE);
    handle.requestClientData(
        PMDG_NG3_CDU_0_ID,
        RequestID.CDU_SCREEN_DATA_REQUEST,
        PMDG_NG3_CDU_0_DEFINITION,
        ClientDataPeriod.ON_SET,
        ClientDataRequestFlag.CLIENT_DATA_REQUEST_FLAG_CHANGED
    );

    handle.on('exception', ex => console.log(ex));

    handle.on('clientData', recvSimObjectData => {
        if (recvSimObjectData.requestID === RequestID.CDU_SCREEN_DATA_REQUEST) {
            const { powered, lines } = extractCduScreenState(recvSimObjectData.data);
            if (powered) {
                console.log(lines.join('\r\n'));
            } else {
                console.log('Not powered');
            }
        }
    });

    // Write "ABC" to the scratchpad
    handle.mapClientEventToSimEvent(MyEventID.CDU_A, '#' + PmdgEventID.CDU_A);
    handle.mapClientEventToSimEvent(MyEventID.CDU_B, '#' + PmdgEventID.CDU_B);
    handle.mapClientEventToSimEvent(MyEventID.CDU_C, '#' + PmdgEventID.CDU_C);
    handle.transmitClientEvent(
        SimConnectConstants.OBJECT_ID_USER,
        MyEventID.CDU_A,
        1,
        0,
        EventFlag.EVENT_FLAG_GROUPID_IS_PRIORITY
    );
    handle.transmitClientEvent(
        SimConnectConstants.OBJECT_ID_USER,
        MyEventID.CDU_B,
        1,
        0,
        EventFlag.EVENT_FLAG_GROUPID_IS_PRIORITY
    );
    handle.transmitClientEvent(
        SimConnectConstants.OBJECT_ID_USER,
        MyEventID.CDU_C,
        1,
        0,
        EventFlag.EVENT_FLAG_GROUPID_IS_PRIORITY
    );
})();

function extractCduScreenState(rawBuffer: RawBuffer): { lines: string[]; powered: boolean } {
    const screenText: string[] = Array(CDU_ROWS).fill('');

    for (let col = 0; col < CDU_COLUMNS; col++) {
        for (let row = 0; row < CDU_ROWS; row++) {
            // I tried readString(1) but that only works with zero-terminated strings, which doesn't seem to be used here
            const symbol = rawBuffer.readBytes(1).toString('utf-8');
            // These values are not used in this example
            const color = rawBuffer.readBytes(1)[0];
            const flags = rawBuffer.readBytes(1)[0];

            screenText[row] += symbol;
        }
    }
    const cduIsPowered = rawBuffer.readBytes(1)[0] === 1;

    return { lines: screenText, powered: cduIsPowered };
}
