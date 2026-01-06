export enum ToolTypes {
  BRUSH = "brush",
  RECT = "rect",
  CIRCLE = "circle",
  FINISH = "finish",
}

export interface BaseFigure {
  type: ToolTypes;
  x: number;
  y: number;
  fillColor: string;
  strokeColor: string;
}

export interface BrushFigure extends BaseFigure {
  type: ToolTypes.BRUSH;
}

export interface RectFigure extends BaseFigure {
  type: ToolTypes.RECT;
  width: number;
  height: number;
}

export interface CircleFigute extends BaseFigure {
  type: ToolTypes.CIRCLE;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
}

export interface FinishFigure extends BaseFigure {
  type: ToolTypes.FINISH;
}

export type Figure = BrushFigure | RectFigure | FinishFigure | CircleFigute;
