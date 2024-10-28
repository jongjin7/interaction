import { getFitPosition, setCanvasResolution } from './assets/js/canvas.utils.js';

export default class Wave {
  constructor(selector) {
    this.canvas = selector;
    this.ctx = this.canvas.getContext('2d');
    this.radius = 100;
    this.setCanvasSize();
    this.init();
    window.addEventListener('resize', this.setCanvasSize.bind(this));
  }

  init() {
    const { sourceWidth, sourceHeight } = getFitPosition(
      this.radius,
      this.radius,
      this.canvas.width,
      this.canvas.height,
    );

    console.log('source==>', sourceWidth, sourceHeight);
  }

  setCanvasSize() {
    const { canvasWidth, canvasHeight, canvasStyleWidth, canvasStyleHeight } = setCanvasResolution(
      this.canvas,
      this.ctx,
      window.innerWidth,
      window.innerHeight,
    );
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.canvas.style.width = canvasStyleWidth;
    this.canvas.style.height = canvasStyleHeight;
    this.drawFrame();
  }

  draw() {
    this.ctx.save(); // 기존 상태 저장
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2); // 캔버스 중앙으로 이동

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
    this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = '#9B1112';
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.restore(); // 캔버스 상태 복원
  }

  drawFrame() {
    // 이미지의 중앙 좌표 계산
    const x = (this.canvas.width - this.radius) / 2;
    const y = (this.canvas.height - this.radius) / 2;
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
    this.update();
  }

  update() {
    console.log('프레임은 업데이트가 되었습니다.');
  }
}
