import FluidBlob from '@/gyro_sensor/assets/js/bubble/FluidBlob';
// 점성 및 병합을 지원하는 유체 덩어리 클래스
export default class MergingBlob extends FluidBlob {
  constructor(x, y, radius, viscosity, options = {}) {
    super(x, y, radius, options);
    this.viscosity = viscosity;
    this.connections = [];
  }

  mergeWith(otherBlob) {
    // 병합 시 위치와 크기 조정
    this.x = (this.x + otherBlob.x) / 2;
    this.y = (this.y + otherBlob.y) / 2;
    this.radius = Math.sqrt(this.radius ** 2 + otherBlob.radius ** 2); // 면적 기준 병합
    otherBlob.isMerged = true; // 병합 상태 표시
  }

  draw(ctx) {
    super.draw(ctx);

    // 점성에 따른 연결선 그리기
    this.connections.forEach((otherBlob) => {
      const distance = this.distanceTo(otherBlob);
      const alpha = Math.max(0, 1 - distance / (100 * this.viscosity));
      if (alpha > 0) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(otherBlob.x, otherBlob.y);
        ctx.strokeStyle = `rgba(255, 204, 102, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
      }
    });
  }
}
