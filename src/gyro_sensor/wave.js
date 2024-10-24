export default class Wave {
  constructor(selector) {
    this.canvas = selector;
    this.ctx = this.canvas.getContext('2d');
    this.rad = 100;
    this.setCanvasSize();
    window.addEventListener('resize', this.setCanvasSize);
    this.init();
    this.drawFrame();
  }

  setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.ctx.beginPath();
    // 먼저 회전을 시킨 후,
    this.ctx.rotate(this.rad);
    // 밸브를 그려줌 (이러면 밸브의 모양은 유지되면서 회전됨)
    this.ctx.arc(0, 0, 100, 0, Math.PI * 2);
    this.ctx.moveTo(0 + 20, 0);
    this.ctx.arc(0, 0, 20, 0, Math.PI * 2);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, 0 + 100);
    this.ctx.rotate((Math.PI * 2) / 5);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, 0 + 100);
    this.ctx.rotate((Math.PI * 2) / 5);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, 0 + 100);
    this.ctx.rotate((Math.PI * 2) / 5);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, 0 + 100);
    this.ctx.rotate((Math.PI * 2) / 5);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, 0 + 100);
    // 마지막으로 밸브 회전각 만큼 돌려준 화면을 원래대로 돌려놓음.
    // 아래는 밸브를 그릴때 288도 회전 시켰는데, 72도를 더 회전시킴으로써 360도를 맞추는 것.
    this.ctx.rotate((Math.PI * 2) / 5);
    // 아래는 처음 회전시킨 밸브 회전각만큼 뒤로 돌려 0도로 맞추는 것.
    this.ctx.rotate(-this.rad);
    this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = '#9B1112';
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawFrame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
  }

  update() {
    console.log('프레임은 업데이트가 되었습니다.');
  }
}
