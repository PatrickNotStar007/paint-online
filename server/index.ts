import type { UserRequest } from "../shared/types.ts";
import type { Request, Response } from "express";
import type { WebSocket } from "ws";

import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import expressWs from "express-ws";

const currentDir = process.cwd();
const __dirname = path.join(currentDir);

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

app.post("/image", (req: Request, res: Response) => {
  const data = req.body.img.replace(`data:image/png;base64,`, "");

  fs.writeFileSync(
    path.resolve(__dirname, "files", `${req.query.id}.jpg`),
    data,
    "base64"
  );

  return res.status(200).json({ message: "Загружено" });
});

app.get("/image", (req: Request, res: Response) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = `data:image/png;base64,` + file.toString("base64");
    res.json(data);
  } catch (e) {
    console.log(e);
    // return res.status(500).json("error");
  }
});

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
