import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState.ts";
import Brush from "../tools/Brush.ts";
import canvasState from "../store/canvasState.ts";
import Rect from "../tools/Rect.ts";
import Circle from "../tools/Circle.ts";
import Eraser from "../tools/Eraser.ts";
import Line from "../tools/Line.ts";
import { restoreTypes } from "../types/restores.ts";
import { ITool } from "../types/tool.ts";

type ToolConstructor = new (
  canvas: HTMLCanvasElement,
  socket: WebSocket,
  id: string
) => ITool;

const Toolbar = () => {
  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value);
  };

  const download = () => {
    if (canvasState.canvas) {
      const dataUrl = canvasState.canvas.toDataURL();
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = canvasState.sessionId + ".jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const chooseToolHandler = (ToolClass: ToolConstructor) => {
    const { canvas, socket, sessionId } = canvasState;
    if (!canvas || !socket || !sessionId) return;
    toolState.setTool(new ToolClass(canvas, socket, sessionId));
  };

  const undoHandler = () => {
    const { canvas, socket, sessionId } = canvasState;
    if (!canvas || !socket || !sessionId) return;
    socket.send(
      JSON.stringify({
        method: "restore",
        id: sessionId,
        restoreType: restoreTypes.Undo,
      })
    );
  };

  const redoHandler = () => {
    const { canvas, socket, sessionId } = canvasState;
    if (!canvas || !socket || !sessionId) return;
    socket.send(
      JSON.stringify({
        method: "restore",
        id: sessionId,
        restoreType: restoreTypes.Redo,
      })
    );
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() => chooseToolHandler(Brush)}
      ></button>

      <button
        className="toolbar__btn rect"
        onClick={() => chooseToolHandler(Rect)}
      ></button>

      <button
        className="toolbar__btn circle"
        onClick={() => chooseToolHandler(Circle)}
      ></button>

      <button
        className="toolbar__btn eraser"
        onClick={() => chooseToolHandler(Eraser)}
      ></button>

      <button
        className="toolbar__btn line"
        onClick={() => chooseToolHandler(Line)}
      ></button>
      <input
        onChange={(e) => changeColor(e)}
        type="color"
        style={{ marginLeft: 10 }}
      />
      <button
        className="toolbar__btn undo"
        onClick={() => undoHandler()}
      ></button>

      <button
        className="toolbar__btn redo"
        onClick={() => redoHandler()}
      ></button>

      <button className="toolbar__btn save" onClick={() => download()}></button>
    </div>
  );
};

export default Toolbar;
