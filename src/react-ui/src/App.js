import './App.scss';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const wheel = document.querySelector('.wheel');
    const items = document.querySelectorAll('.option');
    let rotation = 0;
    let isDragging = false;
    let startAngle = 0;
    let velocity = 0; // 회전 속도
    let lastAngle = 0; // 마지막 각도
    let momentumInterval = null; // 관성 효과를 위한 interval

    function getAngle(clientX, clientY) {
      const { left, top, width, height } = wheel.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      return Math.atan2(dy, dx) * (180 / Math.PI);
    }

    wheel.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startAngle = getAngle(e.clientX, e.clientY) - rotation;
      clearInterval(momentumInterval); // 관성 효과 멈추기
    });

    document.addEventListener('pointerup', () => {
      isDragging = false;

      // 관성 효과 시작 (속도가 남아 있을 때만)
      if (Math.abs(velocity) > 0.1) {
        momentumInterval = setInterval(() => {
          // 속도에 따라 회전 각도 변경
          rotation += velocity;
          wheel.style.setProperty('--rotate-angle', `${rotation}`);

          // 자식 요소 회전 업데이트
          updateItemsRotation();

          // 속도를 점차 줄이기 (감속)
          velocity *= 0.95; // 감속 비율 (0.95는 점점 줄어드는 정도를 의미)

          // 속도가 매우 작아지면 관성 멈춤
          if (Math.abs(velocity) < 0.1) {
            clearInterval(momentumInterval);
          }
        }, 16); // 약 60프레임/초로 실행
      }
    });

    document.addEventListener('pointermove', (e) => {
      if (isDragging) {
        const currentAngle = getAngle(e.clientX, e.clientY);
        const angleDifference = currentAngle - startAngle;

        // 회전 각도 업데이트
        rotation = angleDifference;

        // 속도 계산 (이전 각도와의 차이)
        velocity = currentAngle - lastAngle;
        lastAngle = currentAngle;

        // 큰 원 회전
        wheel.style.setProperty('--rotate-angle', `${rotation}`);

        // 자식 요소 회전 업데이트
        updateItemsRotation();
      }
    });

    // 자식 요소 회전 업데이트 함수
    function updateItemsRotation() {
      const itemCount = items.length;
      items.forEach((item, index) => {
        // 자식 요소의 초기 각도 (대관람차처럼 균일하게 분포)
        const anglePerItem = 360 / itemCount;
        const itemRotation = rotation * -1 - 50 * index; // 초기 위치 회전값
        //console.log('index', rotation, index, itemRotation, adjustedRotation);

        // 자식 요소의 위치는 회전하지만, 텍스트는 항상 수평을 유지
        //item.style.transform = `rotate(${adjustedRotation}deg) translateY(-200px)`; // 회전 후 translate로 배치

        // 자식의 텍스트가 회전하지 않도록 보정
        const textElement = item.querySelector('div');
        if (textElement) {
          //textElement.style.transform = `rotate(${itemRotation}deg)`; // 부모 회전과 반대 방향으로 회전
        }
      });
    }
  }, []);
  return (
    <div className="App">
      <div className="wheel">
        <div className="center-circle"></div>
        <div className="option" style={{ '--i': 0 }}>
          <div>음악</div>
        </div>
        <div className="option" style={{ '--i': 1 }}>
          <div>음성</div>
        </div>
        <div className="option" style={{ '--i': 2 }}>
          <div>내 주변</div>
        </div>
        <div className="option" style={{ '--i': 3 }}>
          <div>검색</div>
        </div>
        <div className="option" style={{ '--i': 4 }}>
          <div>파파고 번역</div>
        </div>
        <div className="option" style={{ '--i': 5 }}>
          <div>QR 코드</div>
        </div>
        <div className="option" style={{ '--i': 6 }}>
          <div>렌즈</div>
        </div>
      </div>
    </div>
  );
}

export default App;
