export default function test() {
  const fileInput = document.getElementById('fileInput');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const video = document.querySelector('video');
  video.style.position = 'absolute';
  video.style.border = '1px solid red';
  video.style.top = '0';
  video.style.left = '0';
  video.style.width = '100px';
  video.style.height = '100px';

  // Function to set canvas size based on device resolution
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  setCanvasSize();
  window.addEventListener('resize', setCanvasSize); // Resize event

  let r = 0;
  let g = 0;
  let b = 0; // RGB 값 저장
  let imgLoaded = false; // 이미지 로드 여부
  let currentImage = null; // 현재 이미지 저장
  let imageX = 0; // 이미지 X 위치
  let imageY = 0; // 이미지 Y 위치
  let lastGamma = 0; // 이전 gamma 값 저장
  let lastBeta = 0; // 이전 beta 값 저장

  // 포스터라이즈 단계를 정의
  const POSTERIZE_LEVELS = 10;

  // 포스터라이즈 효과 함수
  function posterize(value, levels) {
    const step = 255 / (levels - 1);
    return Math.round(value / step) * step;
  }

  // 색상을 혼합하는 함수
  function blendColor(baseColor, blendColor, blendFactor) {
    return Math.round(baseColor * (1 - blendFactor) + blendColor * blendFactor);
  }

  // Function to apply posterize effect and color overlay
  function applyPosterizeEffect() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;

    // Posterize 효과 적용
    for (let i = 0; i < data.length; i += 4) {
      data[i] = posterize(data[i], POSTERIZE_LEVELS); // Red
      data[i + 1] = posterize(data[i + 1], POSTERIZE_LEVELS); // Green
      data[i + 2] = posterize(data[i + 2], POSTERIZE_LEVELS); // Blue

      // 자이로센서로 변환된 색상 추가 (투명도 50%)
      data[i] = blendColor(data[i], r, 0.5);
      data[i + 1] = blendColor(data[i + 1], g, 0.5);
      data[i + 2] = blendColor(data[i + 2], b, 0.5);
    }

    ctx.putImageData(imageData, 0, 0);
  }

  // Function to draw video with posterize effect
  function drawVideoWithPosterize() {
    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { sourceX, sourceY, sourceWidth, sourceHeight, drawWidth, drawHeight } = getFitPosition(
        video.videoWidth,
        video.videoHeight,
        canvas.width,
        canvas.height,
      );

      ctx.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, drawWidth, drawHeight);
      applyPosterizeEffect();
      requestAnimationFrame(drawFrame); // 실시간 업데이트
    }
    video.play();
    drawFrame();
  }

  // Function to draw image with posterize effect
  function drawImageWithPosterize() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentImage) {
      const { sourceX, sourceY, sourceWidth, sourceHeight, drawWidth, drawHeight } = getFitPosition(
        currentImage.width,
        currentImage.height,
        canvas.width,
        canvas.height,
      );

      ctx.drawImage(
        currentImage,
        sourceX - imageX,
        sourceY - imageY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        drawWidth,
        drawHeight,
      );
      applyPosterizeEffect();
    }
  }

  // Function to handle file input (image/video)
  function handleFileInput(event) {
    const file = event.target.files[0];
    const fileType = file.type;

    if (!file) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (fileType.startsWith('image/')) {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = function () {
          imgLoaded = true;
          currentImage = img; // Load image
          imageX = 0;
          imageY = 0;
          drawImageWithPosterize(); // Draw initial image
        };
      };
      reader.readAsDataURL(file);
    } else if (fileType.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        video.src = e.target.result;
        // video.load();
        // video.autoplay = true;
        // video.muted = true;  // 비디오 무음
        // video.loop = true;

        video.onloadeddata = function () {
          imgLoaded = false; // 이미지 로드 상태 초기화
          video.play().catch((error) => {
            console.log('Autoplay was prevented. Use a play button to start playback.');
          });
          drawVideoWithPosterize(); // 비디오 그리기 시작
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert('지원하지 않는 파일 형식입니다.');
    }
  }

  // Function to calculate fit position for image
  function getFitPosition(imageWidth, imageHeight, canvasWidth, canvasHeight) {
    const canvasRatio = canvasWidth / canvasHeight;
    const imageRatio = imageWidth / imageHeight;

    let sourceX;
    let sourceY;
    let sourceWidth;
    let sourceHeight;
    let drawWidth;
    let drawHeight;

    if (canvasRatio > imageRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imageRatio;
      sourceWidth = imageWidth;
      sourceHeight = imageWidth / canvasRatio;
      sourceX = 0;
      sourceY = (imageHeight - sourceHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imageRatio;
      sourceHeight = imageHeight;
      sourceWidth = imageHeight * canvasRatio;
      sourceY = 0;
      sourceX = (imageWidth - sourceWidth) / 2;
    }

    return { sourceX, sourceY, sourceWidth, sourceHeight, drawWidth, drawHeight };
  }

  // Gyro sensor handler function
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
    document.getElementById('rgb').textContent = `rgb(${r}, ${g}, ${b})`;

    // 이미지의 위치를 조정하여 움직임 효과 추가
    if (imgLoaded) {
      const gammaChange = Math.abs(gamma - lastGamma); // X축 변화량 (Y축 회전)
      const betaChange = Math.abs(beta - lastBeta); // Y축 변화량 (X축 회전)

      // 움직임 계산 (최소 1px, 최대 10px)
      let movementX = Math.max(1, Math.min(gammaChange, 10));
      let movementY = Math.max(1, Math.min(betaChange, 10));

      // 부드러운 경계 제한 (캔버스 밖으로 넘어가지 않도록 제어)
      const { sourceWidth, sourceHeight } = getFitPosition(
        currentImage.width,
        currentImage.height,
        canvas.width,
        canvas.height,
      );

      // X축 움직임 (왼쪽 및 오른쪽 경계에서 감속 적용)
      if (imageX + (gamma - lastGamma) * movementX < 0) {
        movementX *= imageX / sourceWidth; // 경계에 가까워질수록 감속
      } else if (imageX + (gamma - lastGamma) * movementX > currentImage.width - sourceWidth) {
        movementX *= (currentImage.width - sourceWidth - imageX) / sourceWidth;
      }
      imageX += (gamma - lastGamma) * movementX; // X축 이동 적용

      // Y축 움직임 (상단 및 하단 경계에서 감속 적용)
      if (imageY + (beta - lastBeta) * movementY < 0) {
        movementY *= imageY / sourceHeight; // 경계에 가까워질수록 감속
      } else if (imageY + (beta - lastBeta) * movementY > currentImage.height - sourceHeight) {
        movementY *= (currentImage.height - sourceHeight - imageY) / sourceHeight;
      }
      imageY += (beta - lastBeta) * movementY; // Y축 이동 적용

      // 이미지 다시 그리기
      drawImageWithPosterize();
    }

    lastGamma = gamma; // 이전 gamma 값 업데이트
    lastBeta = beta; // 이전 beta 값 업데이트
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
  fileInput.addEventListener('change', handleFileInput);
}
