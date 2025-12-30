import Tool from "./Tool.ts";

export default class Brush extends Tool {
  protected mouseDown = false;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = (e) => this.mouseMoveHandler(e);
    this.canvas.onmousedown = (e) => this.mouseDownHandler(e);
    this.canvas.onmouseup = (e) => this.mouseUpHandler(e);
  }

  mouseUpHandler(e: MouseEvent) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    );
  }

  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;
    this.ctx.beginPath();
    const target = <HTMLElement>e.target;
    this.ctx.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const target = <HTMLElement>e.target;
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "brush",
            x: e.pageX - target.offsetLeft,
            y: e.pageY - target.offsetTop,
          },
        })
      );
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
