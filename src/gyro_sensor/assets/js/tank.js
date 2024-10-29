export default class Tank {
  constructor(ctx, tankX, tankY) {
    this.ctx = ctx;
    this.tankX = tankX;
    this.tankY = tankY;
    this.dpr = window.devicePixelRatio || 1;
  }

  draw() {
    this.update();
    this.drawFrame();
  }

  drawFrame() {
    const img = new Image();
    img.src = './assets/video/bg.jpg';
    img.onload = () => {
      // 여백을 적용한 그리기 영역 크기 설정
      const drawAreaWidth = this.tankWidth;
      const drawAreaHeight = this.tankHeight;

      // 이미지와 그리기 영역의 비율 비교
      const imgAspectRatio = img.width / img.height;
      const drawAreaAspectRatio = drawAreaWidth / drawAreaHeight;

      let drawWidth;
      let drawHeight;
      let cropX;
      let cropY;

      // `cover` 방식으로 비율 유지하며 크롭
      if (imgAspectRatio > drawAreaAspectRatio) {
        // 이미지가 더 넓을 경우: 높이를 맞추고 좌우 크롭
        drawHeight = drawAreaHeight;
        drawWidth = img.width * (drawAreaHeight / img.height);
        cropX = (drawWidth - drawAreaWidth) / 2;
        cropY = 0;
      } else {
        // 이미지가 더 좁을 경우: 너비를 맞추고 상하 크롭
        drawWidth = drawAreaWidth;
        drawHeight = img.height * (drawAreaWidth / img.width);
        cropX = 0;
        cropY = (drawHeight - drawAreaHeight) / 2;
      }

      // 여백을 두고 이미지 중앙에 맞추기
      const xOffset = window.innerWidth / 2 - drawWidth / 2;
      const yOffset = 50;
      console.log('offsetX=>', xOffset, window.innerWidth, drawAreaWidth);

      // 이미지 그리기
      this.ctx.drawImage(
        img,
        cropX,
        cropY, // 크롭 시작점 (이미지 원본 기준)
        drawAreaWidth * this.dpr,
        drawAreaHeight * this.dpr, // 크롭할 크기
        xOffset,
        yOffset, // 캔버스에 그릴 위치
        drawAreaWidth,
        drawAreaHeight, // 캔버스에 그릴 크기
      );

      // 기본 배경
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      this.ctx.fillRect(50, 50, this.tankWidth, this.tankHeight);

      this.createStyle();
    };
  }

  createStyle() {
    console.log('이것은 Tank 랜더입니다.');
    // this.ctx.save();
    // 수조 그라데이션 그리기
    const tankGradient = this.ctx.createLinearGradient(
      this.tankX,
      this.tankY,
      this.tankX + this.tankWidth,
      this.tankY + this.tankHeight,
    );
    tankGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    tankGradient.addColorStop(1, 'rgba(100, 149, 237, 0.8)');

    this.ctx.fillStyle = tankGradient;
    this.ctx.fillRect(this.tankX, this.tankY, this.tankWidth, this.tankHeight);
    // this.ctx.restore();
  }

  update() {
    console.log('---- tank Update -----');
    this.tankWidth = window.innerWidth - 100;
    this.tankHeight = window.innerHeight - 100;
  }
}
