import { ToolTypes } from "../types/figures.ts";
import Brush from "./Brush.ts";
import Tool from "./Tool.ts";

export default class Eraser extends Tool {
  // constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
  //   super(canvas, socket, id);
  // }

  // draw(x: number, y: number) {
  //   this.ctx.strokeStyle = "#fff";
  //   this.ctx.lineTo(x, y);
  //   this.ctx.stroke();
  // }

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
            type: ToolTypes.ERASER,
            x: e.pageX - target.offsetLeft,
            y: e.pageY - target.offsetTop,
            lineWidth: this.ctx.lineWidth,
          },
        })
      );
    }
  }

  static draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    lineWidth: number
  ) {
    const tempStyle = {
      strokeStyle: ctx.strokeStyle,
      lineWidth: ctx.lineWidth,
    };

    ctx.strokeStyle = "white";
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.strokeStyle = tempStyle.strokeStyle;
    ctx.lineWidth = tempStyle.lineWidth;
  }
}
