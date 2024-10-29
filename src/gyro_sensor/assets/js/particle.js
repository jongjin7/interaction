export default class Particle {
  constructor(x, y, speed, color) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.speed = speed;
    this.color = color;
    this.isMerged = false;
    this.isAtBottom = false; // 바닥에 도달했는지 여부
    this.opacity = 1; // 초기 투명도
  }

  update(bottomY) {
    // 파티클이 바닥에 닿기 전까지 아래로 떨어짐
    if (!this.isAtBottom && this.y < bottomY) {
      this.y += this.speed; // 중력 효과
      this.speed += 0.05; // 속도 증가
    } else {
      this.y = bottomY; // 바닥에서 정지
      this.isAtBottom = true; // 바닥에 도달한 상태
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  distanceTo(otherParticle) {
    const dx = this.x - otherParticle.x;
    const dy = this.y - otherParticle.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  mergeWith(otherParticle) {
    if (this.radius < 30 && otherParticle.radius > 0) {
      this.radius += 0.1;
      otherParticle.radius -= 0.1;

      // 다른 파티클의 반지름이 0보다 작지 않도록 제한
      if (otherParticle.radius < 0) {
        otherParticle.radius = 0;
      }
    }
  }

  fadeOut() {
    if (this.opacity > 0) {
      this.opacity -= 0.05; // 투명도 감소
      if (this.opacity < 0) this.opacity = 0; // 투명도 0으로 설정
    }
  }
}
