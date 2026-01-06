import Brush from "../tools/Brush.ts";
import Circle from "../tools/Circle.ts";
import Rect from "../tools/Rect.ts";
import { Figure, ToolTypes } from "../types/figures.ts";

export const drawFigure = (ctx: CanvasRenderingContext2D, figure: Figure) => {
  switch (figure.type) {
    case ToolTypes.BRUSH:
      Brush.draw(ctx, figure.x, figure.y, figure.fillColor);
      break;
    case ToolTypes.RECT:
      Rect.staticDraw(
        ctx,
        figure.x,
        figure.y,
        figure.width,
        figure.height,
        figure.fillColor,
        figure.strokeColor
      );
      break;
    case ToolTypes.CIRCLE:
      Circle.staticDraw(
        ctx,
        figure.x,
        figure.y,
        figure.radius,
        figure.startAngle,
        figure.endAngle,
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
