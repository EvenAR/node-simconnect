import { SimConnectConnection } from '../SimConnectConnection';

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
            this._handle.subscribeToSystemEvent(this._nextClientEventId, systemEventName);
            this._nextClientEventId++;
        }
    }

    removeEventListener(systemEventName: string, eventHandler?: SystemEventHandler) {
        const sub = this._subscriptions[systemEventName];
        if (!sub) {
            throw Error(`No subscriptions exists for ${systemEventName}`);
        }

        sub.eventHandlers = eventHandler ? sub.eventHandlers.filter(cb => eventHandler !== cb) : [];
        if (sub.eventHandlers.length === 0) {
            this._handle.unsubscribeFromSystemEvent(sub.clientEventId);
            delete this._subscriptions[systemEventName];
        }
    }
}

type SystemEventHandler = (data: number) => void;

type EventSubscription = {
    clientEventId: number;
    eventHandlers: SystemEventHandler[];
};
