import {
    CameraAvailability,
    CameraData,
    CameraDataMask,
    CameraFlag,
    open,
    PositionReferential,
    Protocol,
    SimConnectConnection,
    XYZ,
} from '../../dist';

const APP_NAME = 'SimConnect Camera Sample';

type Mode = 'cycleCameraDefinitions' | 'moveCamera' | 'updateFov' | null;
let activeMode: Mode = null;

let cameraAcquired = false;
let gameControlled = false;
const cameraDefinitions: string[] = [];
let currentCameraDef = 0;
let frame = 0;

// moveCamera state
let moveDeg = -180;
let moveAxis = 0;

// updateFov state
let currentFov = 45.0;
let fovIncrement = true;

function printStatus() {
    console.log(
        `\nActive mode: ${
            activeMode ?? 'none'
        }  [1] cycleCameraDefinitions [2] moveCamera [3] updateFov  [q] quit`
    );
}

open(APP_NAME, Protocol.SunRise)
    .then(({ recvOpen, handle }) => {
        console.log('Connected:', recvOpen.applicationName);
        console.log('Press 1/2/3 to toggle modes, q to quit.');
        printStatus();

        handle.on('exception', recvException => {
            console.log('SimConnect exception:', recvException);
        });

        handle.on('cameraStatus', recvCameraStatus => {
            gameControlled = recvCameraStatus.gameControlled;
            console.log('Game Controlled =', gameControlled ? 1 : 0);
            console.log(
                'Camera Availability =',
                CameraAvailability[recvCameraStatus.acquiredState]
            );
            cameraAcquired = recvCameraStatus.acquiredState === CameraAvailability.ACQUIRED;
        });

        handle.on('cameraDefinitionList', recvCameraDefinitionList => {
            for (const cd of recvCameraDefinitionList.cameraDefinitions) {
                cameraDefinitions.push(cd.name);
            }
        });

        handle.subscribeToCameraStatusUpdate();
        handle.enumerateCameraDefinitions();
        handle.cameraAcquire(APP_NAME);
        handle.cameraDisableFlag(CameraFlag.INTERACTION | CameraFlag.ABOVE_GROUND);

        const loop = setInterval(() => {
            if (cameraAcquired && !gameControlled) {
                if (activeMode === 'cycleCameraDefinitions') switchToNextCameraDefinition(handle);
                if (activeMode === 'updateFov') doUpdateFov(handle);
                if (activeMode === 'moveCamera') doMoveCamera(handle);
            }
        }, 1);

        // Keyboard input
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (key: string) => {
            if (key === '1') {
                activeMode =
                    activeMode === 'cycleCameraDefinitions' ? null : 'cycleCameraDefinitions';
                printStatus();
            } else if (key === '2') {
                activeMode = activeMode === 'moveCamera' ? null : 'moveCamera';
                printStatus();
            } else if (key === '3') {
                activeMode = activeMode === 'updateFov' ? null : 'updateFov';
                printStatus();
            } else if (key === 'q' || key === '\u0003') {
                clearInterval(loop);
                handle.unsubscribeToCameraStatusUpdate();
                handle.close();
                process.exit(0);
            }
        });
    })
    .catch(error => {
        console.log('Failed to connect:', error);
    });

function doMoveCamera(handle: SimConnectConnection) {
    if (moveDeg === 180) {
        moveAxis = (moveAxis + 1) % 3;
        moveDeg = -180;
    }

    const data = new CameraData();
    data.position = new XYZ();
    data.pbh.pitch = moveAxis === 0 ? moveDeg : 0;
    data.pbh.bank = moveAxis === 1 ? moveDeg : 0;
    data.pbh.heading = moveAxis === 2 ? moveDeg : 0;
    data.rotationReferential = PositionReferential.EYEPOINT;

    handle.cameraSet(
        data,
        CameraDataMask.POSITION | CameraDataMask.REFERENTIAL | CameraDataMask.ROTATION
    );

    moveDeg++;
}

function doUpdateFov(handle: SimConnectConnection) {
    currentFov += fovIncrement ? 0.5 : -0.5;
    if (currentFov <= 1.0 || currentFov >= 160.0) {
        fovIncrement = !fovIncrement;
    }

    const data = new CameraData();
    data.rotationReferential = PositionReferential.EYEPOINT;
    data.fov = currentFov * (Math.PI / 180);

    handle.cameraSet(data, CameraDataMask.ALL_ROTATION);
}

function switchToNextCameraDefinition(handle: SimConnectConnection) {
    if (cameraDefinitions.length === 0) return;

    frame++;
    if (frame < 100) return;

    frame = 0;
    currentCameraDef = (currentCameraDef + 1) % cameraDefinitions.length;

    const name = cameraDefinitions[currentCameraDef]!;
    console.log('Switch to CameraDefinition', name);
    handle.cameraSetUsingCameraDefinition(name);
}
