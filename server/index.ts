import type { UserRequest } from "../shared/types";
import type { Request, Response } from "express";
import type { WebSocket } from "ws";

import express from "express";

import cors from "cors";
import expressWs from "express-ws";
import drawingRouter from "./routes/drawingRouter";

const app = express();
const PORT = process.env.PORT || 5000;
const WSServer = expressWs(app);
const aWss = WSServer.getWss();

interface ExtendedWebSocket extends WebSocket {
  id: string;
}

app.use(cors());
app.use(express.json());

(app as any).ws("/", (ws: ExtendedWebSocket, req: Request) => {
  ws.on("message", (rawMsg: string) => {
    try {
      const msg: UserRequest = JSON.parse(rawMsg);
      switch (msg.method) {
        case "connection":
          connectionHandler(ws, msg);
          break;
        case "draw":
          broadcastConnection(ws, msg);
          break;
      }
    } catch (e) {
      console.log("Ошибка парсинга", e);
    }
  });
});

app.use("/", drawingRouter);

app.listen(PORT, () => console.log(PORT + " is working"));

const connectionHandler = (ws: ExtendedWebSocket, msg: UserRequest) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws: ExtendedWebSocket, msg: UserRequest) => {
  aWss.clients.forEach((client: any) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
