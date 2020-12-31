import ByteBuffer from "bytebuffer";
import DataWrapper from "../DataWrapper";

export default interface SimConnectData {
    readonly read: (buffer: DataWrapper) => void;
    readonly write: (buffer: ByteBuffer) => void;
}