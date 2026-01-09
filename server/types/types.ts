import type { WebSocket } from "ws";

export interface ExtendedWebSocket extends WebSocket {
  id?: string;
}
