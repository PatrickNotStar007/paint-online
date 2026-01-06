import { ToolTypes } from "../types/figures.ts";
import Tool from "./Tool.ts";

export default class Line extends Tool {
  protected mouseDown = false;
  protected startX = 0;
  protected startY = 0;
  protected saved = "";

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
    const target = <HTMLElement>e.target;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: ToolTypes.LINE,
          x: this.startX,
          y: this.startY,
          currentX: e.pageX - target.offsetLeft,
          currentY: e.pageY - target.offsetTop,
          fillColor: this.ctx.fillStyle,
          strokeColor: this.ctx.strokeStyle,
          lineWidth: this.ctx.lineWidth,
        },
      })
    );
  }

  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;
    this.ctx.beginPath();
    const target = <HTMLElement>e.target;
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    this.ctx.moveTo(this.startX, this.startY);
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const target = <HTMLElement>e.target;
      let currentX = e.pageX - target.offsetLeft;
      let currentY = e.pageY - target.offsetTop;
      this.draw(currentX, currentY);
    }
  }

  draw(x: number, y: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    x: number,
    y: number,
    strokeColor: string,
    lineWidth: number
  ) {
    const tempStyle = {
      strokeStyle: ctx.strokeStyle,
      lineWidth: ctx.lineWidth,
    };

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    console.log(startX, startY, x, y);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.strokeStyle = tempStyle.strokeStyle;
    ctx.lineWidth = tempStyle.lineWidth;
  }
}
