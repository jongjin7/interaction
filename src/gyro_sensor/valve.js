export default class Valve {
  constructor(canvas) {
    const dpr = window.devicePixelRatio || 1;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.radius = 100 * dpr;
    window.addEventListener('resize', this.setCanvasSize.bind(this));
  }

  setCanvasSize() {
    this.drawFrame();
  }

  init() {
    this.draw();
  }

  draw() {
    this.ctx.save(); // 기존 상태 저장
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2); // 캔버스 중앙으로 이동

    this.ctx.beginPath();

    // 먼저 회전을 시킨 후,
    this.ctx.rotate(this.radius);

    // 밸브를 그려줌 (이러면 밸브의 모양은 유지되면서 회전됨)
    this.ctx.arc(0, 0, 100, 0, Math.PI * 2);
    this.ctx.moveTo(20, 0);
    this.ctx.arc(0, 0, 20, 0, Math.PI * 2);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, 100);

    // 밸브의 팔을 그려줍니다 (회전 각도를 나누어 다섯 개의 팔을 그림)
    for (let i = 0; i < 5; i++) {
      this.ctx.rotate((Math.PI * 2) / 5);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(0, 100);
    }

    // 마지막으로 밸브 회전각만큼 돌려준 화면을 원래대로 돌려놓음.
    this.ctx.rotate(-this.radius);

    // 스타일 설정
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = '#9B1112';
    this.ctx.stroke();
    this.ctx.closePath();
    //
    this.ctx.restore(); // 캔버스 상태 복원
  }

  drawFrame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
  }

  update(rad) {
    this.radius = rad * 0.01;
    console.log('isUpdate', this.radius, rad);
    this.drawFrame();

    // if (this.radius + rad <= Math.PI * 6 && this.radius + rad >= 0) {
    //   if (Math.abs(rad) > 1) {
    //     this.radius += 0.1;
    //   } else {
    //     this.radius += rad;
    //   }
    // }
  }
}
