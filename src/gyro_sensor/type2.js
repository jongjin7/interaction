export default function test2() {
  let r = 0;
  let g = 0;
  let b = 0;
  let lastGamma = 0; // 이전 gamma 값 저장
  let lastBeta = 0; // 이전 beta 값 저장

  function handleOrientationEvent(event) {
    const { alpha } = event; // Z축 회전
    const { beta } = event; // X축 회전 (이미지의 Y축 움직임에 반영)
    const { gamma } = event; // Y축 회전 (이미지의 X축 움직임에 반영)

    // Convert to RGB
    r = Math.round((alpha / 360) * 255);
    g = Math.round(((beta + 180) / 360) * 255);
    b = Math.round(((gamma + 90) / 180) * 255);

    // Update sensor values on page
    document.getElementById('alpha').textContent = alpha.toFixed(2);
    document.getElementById('beta').textContent = beta.toFixed(2);
    document.getElementById('gamma').textContent = gamma.toFixed(2);
    const rgbHolder = document.getElementById('rgb');
    const alertHolder = document.querySelector('.alert');
    rgbHolder.textContent = `rgb(${r}, ${g}, ${b})`;

    lastGamma = gamma; // 이전 gamma 값 업데이트
    lastBeta = beta; // 이전 beta 값 업데이트

    // document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // 화면 높이에 따른 border 변경
    const screenHeight = window.innerHeight;
    let borderBottomThickness = 0;
    let borderTopThickness = 0;

    // 수평 기준(beta = 0) 아래로 기울어질수록 border-bottom 두께 증가
    if (beta > 45) {
      alertHolder.textContent = `아래쪽이 기울어질때 ${beta}`;
      borderTopThickness = 0;
      borderBottomThickness = Math.min(90, ((beta - 45) / 20) * 90); // 최대 50vh
    }
    // 수평 기준(beta = 0) 위로 기울어질수록 border-top 두께 증가
    else if (beta < -2) {
      alertHolder.textContent = '위쪽이 기울어질때';
      borderBottomThickness = 0;
      borderTopThickness = Math.min(90, (Math.abs(beta) / 20) * 90); // 최대 50vh
    } else {
      // borderTopThickness = 0;
      // borderBottomThickness = 0;
      alertHolder.textContent = '거의 수평';
    }

    // border-top과 border-bottom 적용
    document.body.style.borderBottom = `${borderBottomThickness}svh solid red`;
    document.body.style.borderTop = `${borderTopThickness}svh solid blue`;
  }

  // Check if iOS (or other browsers requiring permission)
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    const permissionButton = document.getElementById('permission-button');
    permissionButton.style.display = 'block';

    permissionButton.addEventListener('click', function () {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientationEvent);
            permissionButton.style.display = 'none'; // Hide button after granting permission
          } else {
            alert('Permission to access sensor was denied.');
          }
        })
        .catch(console.error);
    });
  } else {
    // If no permission required, just add the event listener
    window.addEventListener('deviceorientation', handleOrientationEvent);
  }
}
