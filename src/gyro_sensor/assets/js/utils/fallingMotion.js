export default class FallingMotion {
  constructor(gravity = 0.1) {
    this.dy = 0; // 초기 낙하 속도
    this.gravity = gravity;
  }

  applyGravity() {
    // 중력에 따라 낙하 속도 증가
    this.dy += this.gravity;
  }

  updatePosition(y) {
    // 낙하 속도에 따른 y 좌표 갱신
    return y + this.dy;
  }

  checkFloorCollision(y, radius) {
    // 바닥에 닿으면 true 반환
    return y + radius >= canvas.height;
  }

  reset() {
    // 충돌 시 낙하 속도 초기화
    this.dy = 0;
  }
}
