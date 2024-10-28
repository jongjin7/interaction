export function getFitPosition(imageWidth, imageHeight, canvasWidth, canvasHeight) {
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

export function setCanvasResolution(canvas, ctx, width, height) {
  // 장치의 픽셀 밀도(DPR)를 가져옴 (고해상도 디스플레이 대응)
  const dpr = window.devicePixelRatio || 1;

  // 캔버스의 크기를 설정 (물리적 크기를 dpr에 맞춰서 늘림)
  const canvasWidth = width * dpr;
  const canvasHeight = height * dpr;

  // CSS 크기는 원래 크기로 설정
  const canvasStyleWidth = `${width}px`;
  const canvasStyleHeight = `${height}px`;

  // 컨텍스트 스케일을 dpr에 맞춰 조정
  ctx.scale(dpr, dpr);
  return {
    canvasWidth,
    canvasHeight,
    canvasStyleWidth,
    canvasStyleHeight,
  };
}
