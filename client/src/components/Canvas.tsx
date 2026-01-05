import React, { useEffect, useRef } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState.ts";
import { useParams } from "react-router-dom";
import { useCanvasImage } from "../hooks/useCanvasImage.ts";
import ModalWindow from "./ModalWindow.tsx";
import { useWebsocket } from "../hooks/useWebsocket.ts";

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useParams();

  const { saveImage } = useCanvasImage(canvasRef, params.id);

  useWebsocket(canvasRef, params.id);

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
