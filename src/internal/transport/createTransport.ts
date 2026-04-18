import { SimConnectSocket } from '../../SimConnectSocket';
import { SimConnectTransport } from './SimConnectTransport';

export function createTransport(): SimConnectTransport {
    return new SimConnectSocket();
}
