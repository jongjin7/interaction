import Particle from '@/gyro_sensor/particle';

export default class Water {
  constructor(ctx, stageWidth, stageHeight) {
    this.ctx = ctx;
    this.x = stageWidth / 4;
    this.y = stageHeight;
    this.endY = stageHeight;
    this.speed = 30; // 물이 떨어지는 속도
    this.volume = 0; // 차오른 물의 양

    this.particlesL = []; // 물줄기의 좌측 표면 파티클
    this.particlesR = []; // 물줄기의 우측 표면 파티클

    this.particlesW = []; // 차오른 물의 표면 파티클
    for (let i = 0; i < 20; i++) {
      this.particlesW.push(
        new Particle(this.ctx, (this.ctx.canvas.width / 20) * i, this.ctx.canvas.height, Math.PI / 10),
      );
    } // 20분할 하여 미리 파티클을 생성해준다.
  }

  draw(rad) {
    if (rad >= 0 && rad < 0.1) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.y = 0;
    } else {
      this.particlesL.splice(0);
      this.particlesR.splice(0);
      const numberOfParticles = Math.floor(this.y / (this.endY / 10)) + 1;
      for (let i = 0; i < numberOfParticles + 1; i++) {
        this.particlesL.push(
          new Particle(
            this.ctx,
            this.x - rad * 1.5,
            (this.y / numberOfParticles) * i + 1,
            Math.floor(Math.random() * 5),
          ),
        );
        this.particlesR.push(
          new Particle(
            this.ctx,
            this.x + rad * 1.5,
            (this.y / numberOfParticles) * i + 1,
            Math.floor(Math.random() * 5),
          ),
        );
      }
      this.particlesL.forEach((v, i) => {
        this.particlesL[i].update();
      });
      this.particlesR.forEach((v, i) => {
        this.particlesR[i].update();
      });

      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.beginPath();

      // 이전 좌표 기억
      let prevX = this.particlesL[0].x;
      let prevY = this.particlesL[0].y;

      // 붓을 시작점으로 이동시킴.
      this.ctx.moveTo(prevX, prevY);

      for (let i = 0; i < numberOfParticles + 1; i++) {
        // 이전 좌표와 현재 좌표의 중간 지점을 잡아줌 (자연스러운 곡선을 위함)
        const cx = (prevX + this.particlesL[i].x) / 2;
        const cy = (prevY + this.particlesL[i].y) / 2;

        // 각 좌표를 곡선으로 잇기. (선은 moveTo, 곡선은 quadraticCurveTo)
        this.ctx.quadraticCurveTo(prevX, prevY, cx, cy);

        // 이전 좌표 갱신
        prevX = this.particlesL[i].x;
        prevY = this.particlesL[i].y;
      }

      this.ctx.lineTo(prevX, prevY);
      this.ctx.lineTo(this.particlesL[0].x, this.particlesL[0].y);

      prevX = this.particlesR[0].x;
      prevY = this.particlesR[0].y;
      this.ctx.lineTo(this.particlesR[0].x, this.particlesR[0].y);

      for (let i = 0; i < numberOfParticles + 1; i++) {
        // 이전 좌표와 현재 좌표의 중간 지점을 잡아줌 (자연스러운 곡선을 위함)
        const cx = (prevX + this.particlesR[i].x) / 2;
        const cy = (prevY + this.particlesR[i].y) / 2;

        // 각 좌표를 곡선으로 잇기. (선은 moveTo, 곡선은 quadraticCurveTo)
        this.ctx.quadraticCurveTo(prevX, prevY, cx, cy);

        // 이전 좌표 갱신
        prevX = this.particlesR[i].x;
        prevY = this.particlesR[i].y;
      }

      this.ctx.lineTo(prevX, prevY);
      this.ctx.lineTo(this.particlesL[numberOfParticles].x, this.particlesL[numberOfParticles].y);

      this.ctx.fillStyle = 'rgba(74, 168, 216, 0.8)';
      this.ctx.fill();

      // 붓 끝내기
      this.ctx.closePath();

      this.volume += rad * 0.01;
    }

    this.ctx.beginPath();
    // 이전 좌표 기억
    let prevX = this.particlesW[0].x;
    let prevY = this.particlesW[0].y;

    // 붓을 시작점으로 이동시킴.
    this.ctx.moveTo(prevX, prevY);

    for (let i = 0; i < 20; i++) {
      // 이전 좌표와 현재 좌표의 중간 지점을 잡아줌 (자연스러운 곡선을 위함)
      const cx = (prevX + this.particlesW[i].x) / 2;
      const cy = (prevY + this.particlesW[i].y) / 2;

      // 각 좌표를 곡선으로 잇기. (선은 moveTo, 곡선은 quadraticCurveTo)
      this.ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      // 이전 좌표 갱신
      prevX = this.particlesW[i].x;
      prevY = this.particlesW[i].y;

      this.particlesW[i].waveUpdate(this.volume);
    }

    this.ctx.lineTo(prevX, prevY);
    this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.lineTo(0, this.ctx.canvas.height);
    this.ctx.lineTo(this.particlesW[0].x, this.particlesW[0].y);

    this.ctx.fillStyle = 'rgba(74, 168, 216, 0.8)';
    this.ctx.fill();

    // 붓 끝내기
    this.ctx.closePath();
  }
}
