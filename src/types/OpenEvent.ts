import { RecvOpen } from "..";
import { SimConnectConnection } from "../SimConnectConnection";

export default interface OpenEvent {
    recvOpen: RecvOpen,
    handle: SimConnectConnection 
}