import React, { useEffect, useRef } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState.ts";
import Brush from "../tools/Brush.ts";
import toolState from "../store/toolState.ts";
import { useParams } from "react-router-dom";
import { drawFigure } from "../utils/drawFigure.ts";
import { useCanvasImage } from "../hooks/useCanvasImage.ts";
import ModalWindow from "./ModalWindow.tsx";

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useParams();

  const { saveImage } = useCanvasImage(canvasRef, params.id);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (canvasState.username && params.id) {
      console.log(canvasState);

      const socket = new WebSocket("ws://localhost:5000/");
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvas, socket, params.id));
      socket.onopen = () => {
        console.log("Подключение установлено");

        socket.send(
          JSON.stringify({
            id: params.id,
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
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg: any) => {
    const figure = msg.figure;

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;

    drawFigure(ctx, figure);
  };

  const mouseDownHandler = () => {
    if (!canvasRef.current) return;

    canvasState.pushToUndo(canvasRef.current.toDataURL());

    saveImage();
  };

  return (
    <div className="canvas">
      <ModalWindow />
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  );
});

export default Canvas;
