import { open, Protocol } from '../../dist';

connectToSim();

function connectToSim() {
    open('My app', Protocol.FSX_SP2)
        .then(({ recvOpen, handle }) => {
            console.log('Connected to', recvOpen.applicationName);

            let simIsQuitting = false;

            handle.on('quit', () => {
                console.log('The simulator quit. Will try to reconnect.');
                handle.close();
                connectToSim();
                simIsQuitting = true;
            });
            handle.on('close', () => {
                if (!simIsQuitting) {
                    // if we are not trying to reconnect already
                    console.log('Connection closed unexpectedly. Will try to reconnect.');
                    handle.close();
                    connectToSim();
                }
            });
        })
        .catch(error => {
            console.log('Failed to connect. Will try again in 5 seconds. Details:', error.message);
            setTimeout(connectToSim, 5000);
        });
}
