import { Figure } from "./figures";

interface BasicMessage {
  method: string;
  id: string;
}

export interface DrawMessage extends BasicMessage {
  figure: Figure;
}

export interface RestoreMessage extends BasicMessage {
  restoreType: string;
}
