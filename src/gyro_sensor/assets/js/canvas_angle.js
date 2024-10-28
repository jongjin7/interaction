export default class CanvasAngle {
  constructor(selector) {
    this.canvas = selector;
  }

  init() {
    this.render();
  }

  draw() {
    console.log('draw!!!');
  }

  render() {
    console.log('랜더....');
    this.draw();
  }
}
