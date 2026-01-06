export enum ToolTypes {
  BRUSH = "brush",
  RECT = "rect",
  CIRCLE = "circle",
  ERASER = "eraser",
  LINE = "line",
  FINISH = "finish",
}

export interface BaseFigure {
  type: ToolTypes;
  x: number;
  y: number;
  fillColor: string;
  strokeColor: string;
  lineWidth: number;
}

export interface BrushFigure extends BaseFigure {
  type: ToolTypes.BRUSH;
}

export interface RectFigure extends BaseFigure {
  type: ToolTypes.RECT;
  width: number;
  height: number;
}

export interface CircleFigure extends BaseFigure {
  type: ToolTypes.CIRCLE;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
}

export interface FinishFigure extends BaseFigure {
  type: ToolTypes.FINISH;
}

export interface EraserFigure extends BaseFigure {
  type: ToolTypes.ERASER;
}

export interface LineFigure extends BaseFigure {
  type: ToolTypes.LINE;
  currentX: number;
  currentY: number;
}

export type Figure =
  | BrushFigure
  | RectFigure
  | CircleFigure
  | EraserFigure
  | LineFigure
  | FinishFigure;
