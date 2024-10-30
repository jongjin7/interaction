import FallingMotion from '@/gyro_sensor/assets/js/utils/fallingMotion';
// 유체 덩어리 클래스
export default class FluidBlob {
  constructor(x, y, radius, options = {}) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.options = options;
    this.fallingMotion = new FallingMotion();
    this.isMerged = false;
  }

  update() {
    // 중력 적용 및 위치 갱신
    this.fallingMotion.applyGravity();
    this.y = this.fallingMotion.updatePosition(this.y);

    // 바닥 충돌 체크
    if (this.fallingMotion.checkFloorCollision(this.y, this.radius)) {
      this.y = canvas.height - this.radius;
      this.fallingMotion.reset();
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.options.color || 'rgba(255, 204, 102, 0.8)';
    ctx.fill();
    ctx.closePath();
  }

  distanceTo(otherBlob) {
    const dx = this.x - otherBlob.x;
    const dy = this.y - otherBlob.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
