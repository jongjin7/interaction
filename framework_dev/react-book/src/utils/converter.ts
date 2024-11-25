// 단축 Hex 코드 확장 함수
const expandHex = (hex: string) => {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  return hex;
};

// Hex 값을 RGBA로 변환하는 함수
const rgba = (hex: string, alpha: number) => {
  const expandedHex = expandHex(hex);
  const r = parseInt(expandedHex.slice(1, 3), 16);
  const g = parseInt(expandedHex.slice(3, 5), 16);
  const b = parseInt(expandedHex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default {
  rgba,
};
