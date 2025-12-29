import { makeAutoObservable } from "mobx";

class CanvasState {
  tool: any = null; // TODO: исправить
  socket: WebSocket | null = null;
  sessionId: number | null = null;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  undoList: string[] = [];
  redoList: string[] = [];
  username = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSocket(socket: WebSocket) {
    this.socket = socket;
  }

  setSessionId(id: number) {
    this.sessionId = id;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  pushToUndo(data: string) {
    this.undoList.push(data);
  }

  pushToRedo(data: string) {
    this.redoList.push(data);
  }

  undo() {
    if (!this.canvas || !this.ctx) return;

    const canvas = this.canvas;
    const ctx = this.ctx;

    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();
      this.redoList.push(canvas.toDataURL());
      let img = new Image();

      if (dataUrl) {
        img.src = dataUrl;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    } else {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  redo() {
    if (!this.canvas || !this.ctx) return;

    const canvas = this.canvas;
    const ctx = this.ctx;

    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();
      this.undoList.push(canvas.toDataURL());
      let img = new Image();

      if (dataUrl) {
        img.src = dataUrl;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }
}

export default new CanvasState();
