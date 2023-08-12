import {
    EventFlag,
    NotificationPriority,
    SimConnectConnection,
    SimConnectConstants,
    SimConnectException,
} from '../../core';
import { ApiHelperError, SimConnectApiHelper } from './sim-connect-api-helper';

export type TriggerEventOptions = {
    value?: number | [number?, number?, number?, number?, number?];
    onError?: (err: ApiHelperError) => void;
};

type EventSubscription = {
    clientEventId: number;
    eventHandlers: SystemEventHandler[];
};

type SystemEventHandler = (data: number) => void;

export class EventsHelper extends SimConnectApiHelper {
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

    /**
     * Subscribe to a system event. You can find the available system event names in the SimConnect docs:
     * {@link https://docs.flightsimulator.com/html/Programming_Tools/SimConnect/API_Reference/Events_And_Data/SimConnect_SubscribeToSystemEvent.htm}
     *
     * @param systemEventName The sytem event name
     * @param eventHandler A function to be called when the event occurs.
     * @param errorHandler A function to be called if something goes wrong when the subscription is being registered.
     */
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

    /** *
     * Unsubscribe to a system event. If you provide the same event handler that was used when subscribing,
     * only that single subscription will be removed. If no event handler is specified, all subscriptions
     * that has been made for this system event will be removed.
     *
     * @param systemEventName The event to unsubscribe from
     * @param eventHandler The event handler that was used when subscribing to the system event.
     */
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

    /** *
     * Trigger an event on the user's aircraft. A complete list of events is found in the SimConnect documentation:
     * {@link https://docs.flightsimulator.com/html/Programming_Tools/Event_IDs/Event_IDs.htm}
     *
     * @param eventName
     * @param options
     */
    trigger(eventName: string, options?: TriggerEventOptions) {
        const eventId = this._handle.idFactory.nextClientEventId;

        const mappingSendId = this._handle.mapClientEventToSimEvent(eventId, eventName);
        this._checkForException(mappingSendId, ex => {
            if (options?.onError) {
                options.onError({
                    message: `Failed to map client event id ${eventId} to sim event '${eventName}': ${SimConnectException[ex]}`,
                    exception: ex,
                });
            }
        });

        let eventSendId;
        if (Array.isArray(options?.value)) {
            eventSendId = this._handle.transmitClientEventEx1(
                SimConnectConstants.OBJECT_ID_USER,
                eventId,
                NotificationPriority.HIGHEST,
                EventFlag.EVENT_FLAG_GROUPID_IS_PRIORITY,
                ...(options?.value || [])
            );
        } else {
            eventSendId = this._handle.transmitClientEvent(
                SimConnectConstants.OBJECT_ID_USER,
                eventId,
                options?.value || 0,
                NotificationPriority.HIGHEST,
                EventFlag.EVENT_FLAG_GROUPID_IS_PRIORITY
            );
        }

        this._checkForException(eventSendId, ex => {
            if (options?.onError) {
                options.onError({
                    message: `Failed to transmit client event '${eventName}': ${SimConnectException[ex]}`,
                    exception: ex,
                });
            }
        });
    }
}
