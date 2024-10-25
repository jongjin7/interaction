export default class Particle {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.max = Math.random() * 5;
    this.fieldY = y;
  }

  update() {
    this.x = Math.sin(this.speed) * this.speed + this.x;
    this.speed++;
  }

  waveUpdate(vol) {
    this.y = this.fieldY + Math.sin(this.speed) * this.max - vol;
    this.speed += 0.1;
  }
}
