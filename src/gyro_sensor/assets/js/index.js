import Tank from './frames/tank';
import FluidBlob from '@/gyro_sensor/assets/js/bubble/FluidBlob';

function init() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'source-over';
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const tankX = 50; // 수조의 X 위치
  const tankY = 50; // 수조의 상단 위치
  const waterTank = new Tank(ctx, tankX, tankY);
  const bubble = new FluidBlob(ctx);

  waterTank.update();

  const isDragging = false;
  const startAngle = 0;
  const rotation = 0;
  const dpr = window.devicePixelRatio || 1;
  let centerX;
  let centerY;
  const radius = 100;

  // 물멍, 오일멍
  const waterParticles = [];
  const oilParticles = [];
  let waterHeight = 0; // 현재 물 높이
  let oilLayerHeight = 0; // 현재 기름 높이
  const waterMaxHeight = 100; // 최대 물 높이
  const oilLayerMaxHeight = 100; // 최대 기름 높이
  const isAnimating = true;
  // 수조의 위치와 크기

  const tankWidth = 400; // 수조 너비
  const tankHeight = 400; // 수조의 전체 높이

  function aaaTank() {
    // 물 그리기
    ctx.fillStyle = 'rgba(0, 100, 255, 0.5)';
    ctx.fillRect(tankX, tankY + tankHeight - waterHeight, tankWidth, waterHeight);

    // 기름 층 그리기
    ctx.fillStyle = 'rgba(255, 99, 71, 0.4)';
    ctx.fillRect(tankX, tankY + tankHeight - waterHeight - oilLayerHeight, tankWidth, oilLayerHeight);
  }

  const TOTAL = canvasWidth / 30;

  const randomNumBetween = (min, max) => {
    return Math.random() * (max - min + 1) + min;
  };

  const particles = [];
  // for (let i = 0; i < TOTAL; i++) {
  //   const x = randomNumBetween(0, canvasWidth)
  //   const y = randomNumBetween(0, canvasHeight)
  //   const radius = randomNumBetween(10, 50)
  //   const vy = randomNumBetween(1, 5)
  //   const myParticle = new bubbleParticle(x, y, radius, vy);
  //   particles.push(myParticle)
  // }

  let requestAnimationId;

  // 애니메이션
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 230, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    waterTank.draw();
    // bubble();

    // 물 방울 애니메이션
    waterParticles.forEach((particle, index) => {
      const bottomY = tankY + tankHeight - waterHeight; // 물의 바닥 Y 위치
      particle.update(bottomY);
      particle.draw(ctx);

      // 물방울이 물층에 도달하면 사라짐
      if (particle.isAtBottom) {
        waterParticles.splice(index, 1); // 배열에서 제거
        waterHeight += 1; // 물 높이 증가
      }
    });

    // 기름 방울 애니메이션
    oilParticles.forEach((particle, index) => {
      const bottomY = tankY + tankHeight - waterHeight - oilLayerHeight; // 기름의 바닥 Y 위치
      particle.update(bottomY);
      particle.draw(ctx);

      // 기름방울이 기름층에 도달하면 사라짐
      if (particle.isAtBottom) {
        oilParticles.splice(index, 1); // 배열에서 제거
        oilLayerHeight += 1; // 기름 높이 증가
      }
    });

    // 파티클 간 거리 확인 및 병합 효과
    for (let i = 0; i < waterParticles.length; i++) {
      for (let j = i + 1; j < waterParticles.length; j++) {
        const distance = waterParticles[i].distanceTo(waterParticles[j]);
        if (distance < 20) {
          waterParticles[i].mergeWith(waterParticles[j]);
        }
      }
    }

    for (let i = 0; i < oilParticles.length; i++) {
      for (let j = i + 1; j < oilParticles.length; j++) {
        const distance = oilParticles[i].distanceTo(oilParticles[j]);
        if (distance < 20) {
          oilParticles[i].mergeWith(oilParticles[j]);
        }
      }
    }

    // 새로운 물 및 기름 파티클 생성
    if (waterParticles.length < 100 && Math.random() < 0.1) {
      // createWaterParticle();
    }
    if (oilParticles.length < 100 && Math.random() < 0.1) {
      // createOilParticle();
    }

    // 물과 기름의 각각 최대 높이에 도달했는지 확인
    // const isMaxHeightReached = (waterHeight + oilLayerHeight >= waterMaxHeight + oilLayerMaxHeight);
    //
    // if (!isMaxHeightReached) {
    //   console.log('채워지는 중')
    if (!waterTank.isMaxHeight) requestAnimationId = requestAnimationFrame(animate);
    else {
      cancelAnimationFrame(requestAnimationId);
      requestAnimationId = null;
    }
    // } else {
    //   console.log('최대 수위')
    //   waterParticles = [];
    //   oilParticles = [];
    //   waterTank(); // 최종 상태 그리기
    // }
  }

  /// ///////////////////////////////////////////////////////////////////

  const handleResize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
    centerX = canvas.width / 2 / 2;
    centerY = canvas.height / 2 / 2;
    animate();
    console.log('canvasInfo ==>', window.innerWidth, centerX, centerY);
  };
  handleResize();
  window.addEventListener('resize', handleResize);

  function getAngle(clientX, clientY, target) {
    const { left, top, width, height } = target.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  /* canvas.addEventListener('pointerdown', (e) => {
     isDragging = true;

     // 원 그리기
     ctx.beginPath();
     ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
     ctx.strokeStyle = "black";
     ctx.lineWidth = 2;
     ctx.stroke();

     // 할선 그리기
     const angle = Math.PI / 3 * 1; // 45도 각도로 예시
     const startX = centerX + radius * Math.cos(angle);
     const startY = centerY + radius * Math.sin(angle);
     const endX = centerX + radius * Math.cos(Math.PI + angle);
     const endY = centerY + radius * Math.sin(Math.PI + angle);

     ctx.beginPath();
     ctx.moveTo(startX, startY);
     ctx.lineTo(endX, endY);
     ctx.strokeStyle = "red";
     ctx.lineWidth = 2;
     ctx.stroke();
   })

   canvas.addEventListener('pointerover', (e) => {
     console.log('pointerOver')
   })
   canvas.addEventListener('pointerup', () => {
     isDragging = false;
   })
   canvas.addEventListener('pointermove', (e) => {
     if (isDragging) {
       const rect = canvas.getBoundingClientRect();
       const mouseX = e.clientX - rect.left;
       const mouseY = e.clientY - rect.top;
       // 마우스 위치와 원의 중심 사이의 거리 계산
       const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
       const currentAngle = getAngle(e.clientX, e.clientY, canvas);
       console.log('canvasMove', currentAngle, distance)
     }
   })
   */
}

document.addEventListener('DOMContentLoaded', init);
