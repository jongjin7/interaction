export default class Tank {
  constructor(ctx, tankX, tankY) {
    this.ctx = ctx ?? 0;
    this.tankX = tankX ?? 0;
    this.tankY = tankY;
    this.dpr = window.devicePixelRatio || 1;
    this.waterHeight = 0;
    this.isMaxHeight = false;
    this.isLoadedImage = false;
    this.img = null;
  }

  draw() {
    this.drawFrame();
  }

  drawImage() {
    // 여백을 적용한 그리기 영역 크기 설정
    // 이미지와 그리기 영역의 비율 비교
    const imgAspectRatio = this.img.width / this.img.height;
    const drawAreaAspectRatio = this.tankWidth / this.tankHeight;

    let drawWidth;
    let drawHeight;
    let cropX;
    let cropY;

    // `cover` 방식으로 비율 유지하며 크롭
    if (imgAspectRatio > drawAreaAspectRatio) {
      // 이미지가 더 넓을 경우: 높이를 맞추고 좌우 크롭
      drawHeight = this.tankHeight;
      drawWidth = this.img.width * (this.tankHeight / this.img.height);
      cropX = (drawWidth - this.tankWidth) / 2;
      cropY = 0;
    } else {
      // 이미지가 이미지가 그려진 영역에 모두 채워져야해. 이 부분을 코드를 생성해
      drawWidth = this.tankWidth;
      drawHeight = this.img.height * (this.tankWidth / this.img.width);
      cropX = 0;
      cropY = (drawHeight - this.tankHeight) / 2;
    }

    // 여백을 두고 이미지 중앙에 맞추기
    const xOffset = window.innerWidth / 2 - drawWidth / 2;
    const yOffset = 0;
    // console.log('offsetX=>', xOffset, window.innerWidth, this.tankWidth);
    // console.log('crop', cropX, cropY, this.img.width);
    // 이미지 그리기
    this.ctx.drawImage(
      this.img,
      cropX,
      cropY, // 크롭 시작점 (이미지 원본 기준)
      // this.tankWidth * this.dpr,
      // this.tankHeight * this.dpr, // 크롭할 크기
      this.img.width - cropX * this.dpr, // 크롭할 너비
      this.img.height - cropY * this.dpr, // 크롭할 높이
      this.tankX, // 캔버스에 그릴 위치
      this.tankY,
      this.tankWidth,
      this.tankHeight, // 캔버스에 그릴 크기
    );
  }

  drawFrame() {
    if (!this.isLoadedImage) {
      this.img = new Image();
      this.img.src = './assets/video/bg.jpg';
      this.img.onload = this.drawImage.bind(this);
      this.isLoadedImage = !this.isLoadedImage;
    } else {
      this.drawImage();
      this.drawWater();
    }

    // 기본 배경
    // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    // this.ctx.fillRect(50, 50, this.tankWidth, this.tankHeight);

    // this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    // this.ctx.fillRect(this.tankX, this.tankY, this.tankWidth, this.tankHeight);
  }

  drawWater() {
    // this.ctx.save();

    // 수조 그라데이션 그리기
    const tankGradient = this.ctx.createLinearGradient(0, 10, 0, this.tankHeight + this.tankY);
    tankGradient.addColorStop(0, 'rgba(100, 149, 237, 0.8)');
    tankGradient.addColorStop(0.2, 'rgba(100, 149, 237, 0.6)');
    tankGradient.addColorStop(1, 'rgba(100, 149, 237, 0.1)');

    if (this.waterHeight <= this.tankHeight) {
      this.waterHeight += 1;
    } else {
      this.isMaxHeight = !this.isMaxHeight;
    }
    this.ctx.fillStyle = tankGradient;
    this.ctx.fillRect(this.tankX, this.tankY + this.tankHeight, this.tankWidth, -1 * this.waterHeight);
    // this.ctx.restore();
  }

  update() {
    console.log('---- tank Update -----');
    this.tankWidth = window.innerWidth - 100;
    this.tankHeight = window.innerHeight - 100;
  }
}
