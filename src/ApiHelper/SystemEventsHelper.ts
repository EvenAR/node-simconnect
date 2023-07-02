import { SimConnectConnection } from '../SimConnectConnection';
import { checkForExceptions } from './utils';

export class SystemEventsHelper {
    _nextClientEventId;

    _handle: SimConnectConnection;

    _subscriptions: { [systemEventName: string]: EventSubscription };

    constructor(handle: SimConnectConnection) {
        this._handle = handle;
        this._nextClientEventId = 0;
        this._subscriptions = {};

        handle.on('event', event => {
            Object.values(this._subscriptions).forEach(subscription => {
                if (event.clientEventId === subscription.clientEventId) {
                    subscription.eventHandlers.forEach(eventHandler => {
                        eventHandler(event.data);
                    });
                }
            });
        });
    }

    addEventListener(systemEventName: string, eventHandler: SystemEventHandler) {
        const existingSub = this._subscriptions[systemEventName];
        if (existingSub) {
            existingSub.eventHandlers.push(eventHandler);
        } else {
            this._subscriptions[systemEventName] = {
                clientEventId: this._nextClientEventId,
                eventHandlers: [eventHandler],
            };
            const sendId = this._handle.subscribeToSystemEvent(
                this._nextClientEventId,
                systemEventName
            );
            this._nextClientEventId++;
            checkForExceptions(this._handle, sendId, ex => {
                throw Error(`Subscription for system event '${systemEventName}' failed: ${ex}`);
            });
        }
    }

    removeEventListener(systemEventName: string, eventHandler?: SystemEventHandler) {
        const sub = this._subscriptions[systemEventName];
        if (!sub) {
            throw Error(`No subscription exists for system event '${systemEventName}'`);
        }

        sub.eventHandlers = eventHandler ? sub.eventHandlers.filter(cb => eventHandler !== cb) : [];
        if (sub.eventHandlers.length === 0) {
            const sendId = this._handle.unsubscribeFromSystemEvent(sub.clientEventId);
            delete this._subscriptions[systemEventName];
            checkForExceptions(this._handle, sendId, ex => {
                throw Error(`Unsubscription for system event '${systemEventName}' failed: ${ex}`);
            });
        }
    }
}

type SystemEventHandler = (data: number) => void;

type EventSubscription = {
    clientEventId: number;
    eventHandlers: SystemEventHandler[];
};
