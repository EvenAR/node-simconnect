import { FlowEvent, open, Protocol } from '../../dist';

open('My app', Protocol.SunRise)
    .then(({ recvOpen, handle }) => {
        console.log('Connected: ', recvOpen);

        handle.subscribeToFlowEvent();

        handle.on('flowEvent', recvFlowEvent => {
            const eventName = FlowEvent[recvFlowEvent.flowEventID];
            console.log('Flow event:', eventName, recvFlowEvent.fltPath);
        });
    })
    .catch(error => {
        console.log('Failed to connect', error);
    });
