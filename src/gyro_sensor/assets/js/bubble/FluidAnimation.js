// 애니메이션 제어 클래스
export default class FluidAnimation {
  constructor(ctx, blobOptions = {}) {
    this.ctx = ctx;
    this.blobs = [];
    this.blobCount = 10;
    this.viscosity = 1; // 기본 점성도
    this.isAnimating = false;
    this.blobOptions = blobOptions;
  }

  initializeBlobs() {
    this.blobs = [];
    for (let i = 0; i < this.blobCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * 0.5 * canvas.height; // 중간 지점에서 생성
      const radius = Math.random() * 5 + 5;
      this.blobs.push(new MergingBlob(x, y, radius, this.viscosity, this.blobOptions));
    }
  }

  startAnimation() {
    this.blobCount = parseInt(document.getElementById('blobCount').value, 10);
    this.viscosity = parseFloat(document.getElementById('viscosity').value);
    this.initializeBlobs();
    this.isAnimating = true;
    animate();
  }

  update() {
    this.blobs.forEach((blob) => {
      blob.update();

      // 다른 덩어리와 병합할지 결정
      this.blobs.forEach((otherBlob) => {
        if (blob !== otherBlob && !blob.isMerged && !otherBlob.isMerged) {
          const distance = blob.distanceTo(otherBlob);
          if (distance < blob.radius + otherBlob.radius) {
            blob.mergeWith(otherBlob);
          }
        }
      });

      // 점성 효과에 따른 연결 대상 덩어리 갱신
      blob.connections = this.blobs.filter((other) => other !== blob && blob.distanceTo(other) < 100 * this.viscosity);
    });

    // 병합된 덩어리 제거
    this.blobs = this.blobs.filter((blob) => !blob.isMerged);
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.blobs.forEach((blob) => blob.draw(this.ctx));
  }
}
