import type { UserRequest } from "../../shared/types";
import type { ExtendedWebSocket } from "../types/types";

export class WebSocketController {
  private aWss: any;

  constructor(aWss: any) {
    this.aWss = aWss;
  }

  messageHandler(ws: any, rawMsg: string) {
    try {
      const msg: UserRequest = JSON.parse(rawMsg);
      switch (msg.method) {
        case "connection":
          this.connectionHandler(ws, msg);
          break;
        case "draw":
        case "restore":
          this.broadcastConnection(ws, msg);
          break;
      }
    } catch (e) {
      console.log("Ошибка парсинга", e);
    }
  }

  private connectionHandler = (ws: ExtendedWebSocket, msg: UserRequest) => {
    ws.id = msg.id;
    this.broadcastConnection(ws, msg);
  };

  private broadcastConnection = (ws: ExtendedWebSocket, msg: UserRequest) => {
    this.aWss.clients.forEach((client: any) => {
      if (client.id === msg.id) {
        client.send(JSON.stringify(msg));
      }
    });
  };
}
