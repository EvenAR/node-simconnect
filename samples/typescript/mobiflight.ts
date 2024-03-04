/**
 * Reads LVARS from Mobiflight WASM module
 */

import {
    ClientDataPeriod,
    ClientDataRequestFlag,
    Protocol,
    RawBuffer,
    SimConnectConnection,
    open,
} from '../..';

const enum MobiFlightArea {
    COMMAND = 0,
    RESPONSE,
    __length,
}

const enum MyClientArea {
    LVARS = MobiFlightArea.__length,
    COMMANDS,
    RESPONSE,
    STRING_SIMVARS,
}

const enum DefineId {
    MOBI,
    MY_APP,
}

const enum RequestId {
    MOBI_DATA,
    MY_APP_DATA,
}

const MOBIFLIGHT_MESSAGE_SIZE = 1024;
const REQUEST_ID = 0;
const RESPONSE_OFFSET = 0;

const CLIENT_NAME = 'MyClient3';

open(CLIENT_NAME, Protocol.KittyHawk)
    .then(({ handle }) => {
        const collectedLvars: string[] = [];
        let readLvars = false;

        handle.on('clientData', data => {
            switch (data.defineID) {
                case DefineId.MOBI:
                    {
                        const message = data.data.readString(1024);
                        switch (message) {
                            case 'MF.Pong':
                                break;
                            case `MF.Clients.Add.${CLIENT_NAME}.Finished`:
                                {
                                    handle.mapClientDataNameToID(
                                        `${CLIENT_NAME}.LVars`,
                                        MyClientArea.LVARS
                                    );
                                    handle.mapClientDataNameToID(
                                        `${CLIENT_NAME}.Command`,
                                        MyClientArea.COMMANDS
                                    );
                                    handle.mapClientDataNameToID(
                                        `${CLIENT_NAME}.Response`,
                                        MyClientArea.RESPONSE
                                    );

                                    handle.addToClientDataDefinition(
                                        DefineId.MY_APP,
                                        RESPONSE_OFFSET,
                                        MOBIFLIGHT_MESSAGE_SIZE,
                                        0,
                                        0
                                    );
                                    handle.requestClientData(
                                        MyClientArea.RESPONSE,
                                        RequestId.MY_APP_DATA,
                                        DefineId.MY_APP,
                                        ClientDataPeriod.ON_SET,
                                        ClientDataRequestFlag.CLIENT_DATA_REQUEST_FLAG_CHANGED
                                    );

                                    sendWasmCmd(
                                        handle,
                                        DefineId.MY_APP,
                                        MyClientArea.COMMANDS,
                                        `MF.DummyCmd`
                                    );
                                    sendWasmCmd(
                                        handle,
                                        DefineId.MY_APP,
                                        MyClientArea.COMMANDS,
                                        `MF.LVars.List`
                                    );
                                }
                                break;
                            default:
                                console.log('Unknown message from MobiFlight:', message);
                        }
                    }
                    break;
                case DefineId.MY_APP:
                    {
                        const message = data.data.readString(1024);
                        if (message === 'MF.LVars.List.Start') {
                            readLvars = true;
                        } else if (message === 'MF.LVars.List.End') {
                            readLvars = false;
                            console.log('All LVars:', collectedLvars);
                        } else {
                            collectedLvars.push(message);
                        }
                    }
                    break;
            }
        });

        handle.on('error', err => {
            console.error(err);
        });

        handle.on('exception', err => {
            console.error(err);
        });

        handle.mapClientDataNameToID(`MobiFlight.Command`, MobiFlightArea.COMMAND);
        handle.mapClientDataNameToID(`MobiFlight.Response`, MobiFlightArea.RESPONSE);

        handle.addToClientDataDefinition(
            DefineId.MOBI,
            RESPONSE_OFFSET,
            MOBIFLIGHT_MESSAGE_SIZE,
            0,
            0
        );

        handle.requestClientData(
            MobiFlightArea.RESPONSE,
            RequestId.MOBI_DATA,
            DefineId.MOBI,
            ClientDataPeriod.ON_SET,
            ClientDataRequestFlag.CLIENT_DATA_REQUEST_FLAG_CHANGED
        );

        sendWasmCmd(handle, DefineId.MOBI, MobiFlightArea.COMMAND, `MF.Ping`);
        sendWasmCmd(handle, DefineId.MOBI, MobiFlightArea.COMMAND, `MF.DummyCmd`);
        sendWasmCmd(handle, DefineId.MOBI, MobiFlightArea.COMMAND, `MF.Clients.Add.${CLIENT_NAME}`);
    })
    .catch(err => {
        console.error(err);
    });

function sendWasmCmd(
    handle: SimConnectConnection,
    defineId: DefineId,
    channelId: number,
    command: string
) {
    const rawBuffer = new RawBuffer(MOBIFLIGHT_MESSAGE_SIZE);

    rawBuffer.writeString(command, MOBIFLIGHT_MESSAGE_SIZE);

    return handle.setClientData(
        channelId,
        defineId,
        ClientDataRequestFlag.CLIENT_DATA_REQUEST_FLAG_DEFAULT,
        0,
        MOBIFLIGHT_MESSAGE_SIZE,
        rawBuffer.getBuffer()
    );
}
