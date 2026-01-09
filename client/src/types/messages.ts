import { Figure } from "./figures";

export interface DrawMessage {
  method: string;
  id: string;
  figure: Figure;
}
