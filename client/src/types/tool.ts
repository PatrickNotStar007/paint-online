export interface ITool {
  fillColor: string;
  strokeColor: string;
  lineWidth: number;

  destroyEvents(): void;
}
