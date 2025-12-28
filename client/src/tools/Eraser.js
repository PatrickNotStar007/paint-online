import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas) {
    super(canvas);
    // this.listen();
  }

  draw(x, y) {
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  // listen() {
  //   this.canvas.onmousemove = (e) => this.mouseMoveHandler(e);
  //   this.canvas.onmousedown = (e) => this.mouseDownHandler(e);
  //   this.canvas.onmouseup = (e) => this.mouseUpHandler(e);
  // }

  // mouseUpHandler(e) {
  //   this.mouseDown = false;
  //   this.ctx.strokeStyle = "#000";
  // }
  // mouseDownHandler(e) {
  //   this.mouseDown = true;
  //   this.ctx.strokeStyle = "#fff";
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(
  //     e.pageX - e.target.offsetLeft,
  //     e.pageY - e.target.offsetTop
  //   );
  // }
  // mouseMoveHandler(e) {
  //   if (this.mouseDown) {
  //     this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  //   }
  // }

  // draw(x, y) {
  //   this.ctx.lineTo(x, y);
  //   this.ctx.stroke();
  //   console.log("draw");
  // }
}
