import { makeAutoObservable } from "mobx";
import { ITool } from "../types/tool";

class ToolState {
  tool: ITool | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: ITool) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    if (this.tool) this.tool.fillColor = color;
  }

  setStrokeColor(color: string) {
    if (this.tool) this.tool.strokeColor = color;
  }

  setLineWidth(width: number) {
    if (this.tool) this.tool.lineWidth = width;
  }
}

export default new ToolState();
