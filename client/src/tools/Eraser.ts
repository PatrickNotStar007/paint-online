import Brush from "./Brush.ts";

export default class Eraser extends Brush {
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: number) {
    super(canvas, socket, id);
  }

  draw(x: number, y: number) {
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
