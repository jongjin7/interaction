import Particle from './particle.js';

function bubble() {
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(10, 50);
      particle.vy = randomNumBetween(1, 5);
    }
  });
}

export const createWaterParticle = () => {
  const x = tankX + tankWidth / 2 + (Math.random() - 0.5) * 20; // 중앙에서 생성
  const y = tankY - 10; // 수조 위에서 떨어짐
  const speed = Math.random() * 1 + 1; // 물방울 속도 설정
  const particle = new Particle(x, y, speed, 'rgba(0, 100, 255, 0.5)'); // 물 색상
  waterParticles.push(particle);
};

export const createOilParticle = () => {
  const x = tankX + tankWidth / 2 + (Math.random() - 0.5) * 20; // 중앙에서 생성
  const y = tankY - 10; // 수조 위에서 떨어짐
  const speed = Math.random() * 1 + 1; // 기름 방울 속도 설정
  const particle = new Particle(x, y, speed, 'rgba(255, 99, 71, 0.4)'); // 기름 색상
  oilParticles.push(particle);
};
