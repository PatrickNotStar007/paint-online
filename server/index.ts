import type { Request } from "express";
import type { ExtendedWebSocket } from "./types/types";

import express from "express";
import cors from "cors";
import expressWs from "express-ws";
import drawingRouter from "./routes/drawingRouter";
import { WebSocketController } from "./controllers/webSocketController";

const app = express();
const PORT = process.env.PORT || 5000;
const WSServer = expressWs(app);
const aWss = WSServer.getWss();
const wsController = new WebSocketController(aWss);

app.use(cors());
app.use(express.json());

(app as any).ws("/", (ws: ExtendedWebSocket, req: Request) => {
  ws.on("message", (rawMsg: string) => {
    wsController.messageHandler(ws, rawMsg);
  });
});

app.use("/", drawingRouter);

app.listen(PORT, () => console.log(PORT + " is working"));
