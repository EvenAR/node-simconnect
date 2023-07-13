import { SimConnectConnection } from '../SimConnectConnection';
import { BaseHelper } from './BaseHelper';
import { ApiHelperError } from './utils';

export class SystemEventsHelper extends BaseHelper {
    private readonly _subscriptions: { [systemEventName: string]: EventSubscription };

    constructor(handle: SimConnectConnection) {
        super(handle);
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

    on(
        systemEventName: string,
        eventHandler: SystemEventHandler,
        errorHandler?: (err: ApiHelperError) => void
    ) {
        const existingSub = this._subscriptions[systemEventName];
        if (existingSub) {
            existingSub.eventHandlers.push(eventHandler);
        } else {
            const myEventId = this._handle.idFactory.nextClientEventId;
            this._subscriptions[systemEventName] = {
                clientEventId: myEventId,
                eventHandlers: [eventHandler],
            };
            const sendId = this._handle.subscribeToSystemEvent(myEventId, systemEventName);
            this._checkForException(sendId, ex => {
                const errMsg = `Subscription for system event '${systemEventName}' failed: ${ex}`;
                if (errorHandler) {
                    errorHandler({
                        message: errMsg,
                        exception: ex,
                    });
                } else {
                    throw Error(errMsg);
                }
            });
        }
    }

    off(systemEventName: string, eventHandler?: SystemEventHandler) {
        const sub = this._subscriptions[systemEventName];
        if (!sub) {
            throw Error(`No subscription exists for system event '${systemEventName}'`);
        }

        sub.eventHandlers = eventHandler ? sub.eventHandlers.filter(cb => eventHandler !== cb) : [];
        if (sub.eventHandlers.length === 0) {
            const sendId = this._handle.unsubscribeFromSystemEvent(sub.clientEventId);
            delete this._subscriptions[systemEventName];
            this._checkForException(sendId, ex => {
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