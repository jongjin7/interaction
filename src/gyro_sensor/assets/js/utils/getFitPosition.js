export default function getFitPosition(imageWidth, imageHeight, canvasWidth, canvasHeight) {
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
