import { useEffect } from "react";
import canvasState from "../store/canvasState.ts";
import Brush from "../tools/Brush.ts";
import toolState from "../store/toolState.ts";
import { drawFigure } from "../utils/drawFigure.ts";
import { restoreFigure } from "../utils/restoreFigure.ts";
import { DrawMessage } from "../types/messages.ts";

export const useWebsocket = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sessionId: string | undefined
) => {
  const drawHandler = (msg: DrawMessage) => {
    const figure = msg.figure;

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;
    drawFigure(ctx, figure);
  };

  const restoreHandler = (msg: any) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    restoreFigure(ctx, msg.restore);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (canvasState.username && sessionId) {
      const socket = new WebSocket("ws://localhost:5000/");
      canvasState.setSocket(socket);
      canvasState.setSessionId(sessionId);
      toolState.setTool(new Brush(canvas, socket, sessionId));
      socket.onopen = () => {
        console.log("Подключение установлено");

        socket.send(
          JSON.stringify({
            id: sessionId,
            username: canvasState.username,
            method: "connection",
          })
        );
      };

      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`Пользователь ${msg.username} подключился`);
            break;
          case "draw":
            drawHandler(msg);
            break;
          case "restore":
            restoreHandler(msg);
            break;
        }
      };

      return () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }

        socket.onopen = null;
        socket.onmessage = null;
      };
    }
  }, [canvasState.username]);
};
