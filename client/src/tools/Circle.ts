import Tool from "./Tool.ts";

export default class Circle extends Tool {
  protected mouseDown = false;
  protected startX = 0;
  protected startY = 0;
  protected radius = 0;
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
    console.log("ra" + this.radius);

    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "circle",
          x: this.startX,
          y: this.startY,
          radius: this.radius,
          startAngle: 0,
          endAngle: Math.PI * 2,
          color: this.ctx.fillStyle,
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
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const target = <HTMLElement>e.target;
      let currentX = e.pageX - target.offsetLeft;
      let currentY = e.pageY - target.offsetTop;

      this.radius = Math.sqrt(
        Math.pow(currentX - this.startX, 2) +
          Math.pow(currentY - this.startY, 2)
      );

      this.draw(this.startX, this.startY, this.radius, 0, Math.PI * 2);
    }
  }

  draw(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, startAngle, endAngle);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    color: string
  ) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
    ctx.stroke();
  }
}
