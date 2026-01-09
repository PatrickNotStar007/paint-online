import { makeAutoObservable } from "mobx";

class CanvasState {
  sessionHistories: Map<
    string,
    {
      undoList: string[];
      redoList: string[];
    }
  > = new Map();

  // tool: any = null; // TODO: исправить
  socket: WebSocket | null = null;
  sessionId: string | null = null;
  canvas: HTMLCanvasElement | null = null;
  protected ctx: CanvasRenderingContext2D | null = null;
  // undoList: string[] = [];
  // redoList: string[] = [];
  username = "";

  constructor() {
    makeAutoObservable(this);
  }

  get undoList(): string[] {
    if (!this.sessionId) return [];
    const history = this.sessionHistories.get(this.sessionId);
    return history?.undoList || [];
  }

  get redoList(): string[] {
    if (!this.sessionId) return [];
    const history = this.sessionHistories.get(this.sessionId);
    return history?.redoList || [];
  }

  setSocket(socket: WebSocket) {
    this.socket = socket;
  }

  setSessionId(id: string) {
    this.sessionId = id;

    if (!this.sessionHistories.has(this.sessionId)) {
      this.sessionHistories.set(id, { undoList: [], redoList: [] });
    }
  }

  setUsername(username: string) {
    this.username = username;
  }

  setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
    }
  }

  pushToUndo(data: string) {
    if (!this.sessionId) return;
    const history = this.sessionHistories.get(this.sessionId);
    history?.undoList.push(data);
    // this.undoList.push(data);
  }

  pushToRedo(data: string) {
    if (!this.sessionId) return;
    const history = this.sessionHistories.get(this.sessionId);
    history?.redoList.push(data);
    // this.redoList.push(data);
  }

  // undo() {
  // if (!this.canvas || !this.ctx) return;
  // const canvas = this.canvas;
  // const ctx = this.ctx;
  // if (this.undoList.length > 0) {
  //   let dataUrl = this.undoList.pop();
  //   this.redoList.push(canvas.toDataURL());
  //   let img = new Image();
  //   if (dataUrl) {
  //     img.src = dataUrl;
  //     img.onload = () => {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  //     };
  //   }
  // } else {
  //   this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  // }
  // }

  // redo() {
  // if (!this.canvas || !this.ctx) return;
  // const canvas = this.canvas;
  // const ctx = this.ctx;
  // if (this.redoList.length > 0) {
  //   let dataUrl = this.redoList.pop();
  //   this.undoList.push(canvas.toDataURL());
  //   let img = new Image();
  //   if (dataUrl) {
  //     img.src = dataUrl;
  //     img.onload = () => {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  //     };
  //   }
  // }
  // }
}

export default new CanvasState();
