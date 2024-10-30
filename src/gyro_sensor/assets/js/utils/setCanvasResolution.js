export default function setCanvasResolution(canvas, ctx, width, height) {
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
