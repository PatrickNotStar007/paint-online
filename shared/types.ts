export interface UserRequest extends Request {
  id: string;
  method: "connection" | "draw";
  userName?: string;
  figure?: Figure;
}

interface Figure {
  type: string;
  x: number;
  y: number;
}

export interface ImageRequest extends Request {
  id: string;
  img: string;
}
