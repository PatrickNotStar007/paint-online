export enum ToolTypes {
  BRUSH = "brush",
  RECT = "rect",
  FINISH = "finish",
}

export interface BaseFigure {
  type: ToolTypes;
  x: number;
  y: number;
}

export interface BrushFigure extends BaseFigure {
  type: ToolTypes.BRUSH;
}

export interface RectFigure extends BaseFigure {
  type: ToolTypes.RECT;
  width: number;
  height: number;
  color: string;
}

export interface FinishFigure extends BaseFigure {
  type: ToolTypes.FINISH;
}

export type Figure = BrushFigure | RectFigure | FinishFigure;

export interface UserRequest extends Request {
  id: string;
  method: "connection" | "draw" | "restore";
  userName?: string;
  figure?: Figure;
}

export interface ImageRequest extends Request {
  id: string;
  img: string;
}
