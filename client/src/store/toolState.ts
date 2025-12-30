import { makeAutoObservable } from "mobx";

class ToolState {
  tool: any = null; // TODO: исправить

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: any) {
    // TODO: исправить
    this.tool = tool;
  }

  setFillColor(color: string) {
    this.tool.fillColor = color;
  }

  setStrokeColor(color: string) {
    this.tool.strokeColor = color;
  }

  setLineWidth(width: number) {
    this.tool.lineWidth = width;
  }
}

export default new ToolState();
