import { SimConnectConnection } from '../SimConnectConnection';
import { SimConnectHelperBase } from './BaseHelper';

export type SystemEventHandler = (data: number) => void;

type Subscription = {
    id: number;
    listeners: SystemEventHandler[];
};

export class SystemEventsHelper extends SimConnectHelperBase {
    private _nextClientEventId = 0;
    private readonly _subscriptions = new Map<string, Subscription>();

    constructor(handle: SimConnectConnection) {
        super(handle);
        handle.on('event', event => {
            for (const [, sub] of this._subscriptions) {
                if (event.clientEventId === sub.id) {
                    sub.listeners.forEach(l => l(event.data));
                    break;
                }
            }
        });
    }

    on(eventName: string, listener: SystemEventHandler): this {
        const sub = this._subscriptions.get(eventName);
        if (sub) {
            sub.listeners.push(listener);
        } else {
            const id = this._nextClientEventId++;
            this._subscriptions.set(eventName, { id, listeners: [listener] });
            const sendId = this._handle.subscribeToSystemEvent(id, eventName);
            this._checkForException(sendId, ex => {
                throw Error(`Subscription for system event '${eventName}' failed: ${ex}`);
            });
        }
        return this;
    }

    off(eventName: string, listener: SystemEventHandler): this {
        const sub = this._subscriptions.get(eventName);
        if (!sub) return this;
        sub.listeners = sub.listeners.filter(l => l !== listener);
        if (sub.listeners.length === 0) {
            this._unsubscribe(eventName, sub.id);
        }
        return this;
    }

    once(eventName: string, listener: SystemEventHandler): this {
        const wrapped: SystemEventHandler = data => {
            listener(data);
            this.off(eventName, wrapped);
        };
        return this.on(eventName, wrapped);
    }

    removeAllListeners(eventName?: string): this {
        const names = eventName ? [eventName] : [...this._subscriptions.keys()];
        for (const name of names) {
            const sub = this._subscriptions.get(name);
            if (sub) this._unsubscribe(name, sub.id);
        }
        return this;
    }

    private _unsubscribe(eventName: string, id: number) {
        const sendId = this._handle.unsubscribeFromSystemEvent(id);
        this._subscriptions.delete(eventName);
        this._checkForException(sendId, ex => {
            throw Error(`Unsubscription for system event '${eventName}' failed: ${ex}`);
        });
    }
}
