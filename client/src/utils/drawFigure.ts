import Brush from "../tools/Brush.ts";
import Rect from "../tools/Rect.ts";
import { Figure, ToolTypes } from "../types/figures.ts";

export const drawFigure = (ctx: CanvasRenderingContext2D, figure: Figure) => {
  switch (figure.type) {
    case ToolTypes.BRUSH:
      Brush.draw(ctx, figure.x, figure.y);
      break;
    case ToolTypes.RECT:
      Rect.staticDraw(
        ctx,
        figure.x,
        figure.y,
        figure.width,
        figure.height,
        figure.color
      );
      break;
    case ToolTypes.FINISH:
      ctx.beginPath();
      break;
    default:
      const _exhaustiveCheck: never = figure;
      return _exhaustiveCheck;
  }
};
