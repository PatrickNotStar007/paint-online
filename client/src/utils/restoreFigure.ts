import canvasState from "../store/canvasState.ts";
import { restoreTypes } from "../types/restores.ts";

export const restoreFigure = (ctx: CanvasRenderingContext2D, restore: any) => {
  switch (restore.type) {
    case restoreTypes.Undo:
      undoHandler(ctx);
      break;
    case restoreTypes.Redo:
      redoHandler(ctx);
      break;
  }
};

const undoHandler = (ctx: CanvasRenderingContext2D) => {
  if (!canvasState.canvas || !canvasState.sessionId) return;
  const canvas = canvasState.canvas;

  const history = canvasState.sessionHistories.get(canvasState.sessionId);
  if (!history) return;

  const { undoList, redoList } = history;

  if (undoList.length > 0) {
    let dataUrl = undoList.pop();
    redoList.push(canvas.toDataURL());

    canvasState.sessionHistories.set(canvasState.sessionId, {
      undoList: [...undoList],
      redoList: [...redoList],
    });

    console.log(canvasState.sessionHistories);

    if (dataUrl) {
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  } else {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

const redoHandler = (ctx: CanvasRenderingContext2D) => {
  if (!canvasState.canvas || !canvasState.sessionId) return;
  const canvas = canvasState.canvas;

  const history = canvasState.sessionHistories.get(canvasState.sessionId);
  if (!history) return;

  const { undoList, redoList } = history;

  if (redoList.length > 0) {
    let dataUrl = redoList.pop();
    undoList.push(canvas.toDataURL());

    canvasState.sessionHistories.set(canvasState.sessionId, {
      undoList: [...undoList],
      redoList: [...redoList],
    });

    console.log(canvasState.sessionHistories);

    if (dataUrl) {
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }
};
