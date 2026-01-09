import type { Request } from "express";
import type { WebSocket } from "ws";

import express from "express";
import cors from "cors";
import expressWs from "express-ws";
import drawingRouter from "./routes/drawingRouter";
import { WebSocketController } from "./controllers/webSocketController";

const baseApp = express();
const PORT = process.env.PORT || 5000;
const WSServer = expressWs(baseApp);
const app = WSServer.app;
const aWss = WSServer.getWss();
const wsController = new WebSocketController(aWss);

app.use(cors());
app.use(express.json());

app.ws("/", (ws: WebSocket, req: Request) => {
  ws.on("message", (rawMsg: string) => {
    wsController.messageHandler(ws, rawMsg);
  });
});

app.use("/", drawingRouter);

app.listen(PORT, () => console.log(PORT + " is working"));
