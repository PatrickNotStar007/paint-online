export default class Tool {
  protected canvas: HTMLCanvasElement;
  protected socket: WebSocket;
  protected id: string;
  protected ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;

    const context = canvas.getContext("2d");
    if (!context) {
      throw Error("Не удалось получить контекст канваса");
    }
    this.ctx = context;

    this.destroyEvents();
  }

  set fillColor(color: string) {
    this.ctx.fillStyle = color;
  }

  set strokeColor(color: string) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
  }

  destroyEvents() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}
