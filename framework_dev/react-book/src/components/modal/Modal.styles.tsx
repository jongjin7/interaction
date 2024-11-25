/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

// Modal 창 스타일
interface ModalPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const modalContentStyle = (position?: ModalPosition) => css`
  background-color: white;
  padding: 36px 24px;
  border-radius: 8px;
  width: 360px;
  max-width: 90%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  ${position &&
  css`
    top: ${position.top || "auto"};
    left: ${position.left || "auto"};
    right: ${position.right || "auto"};
    bottom: ${position.bottom || "auto"};
  `}
`;

// Close 버튼 스타일
export const closeButtonStyle = css`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

interface ModalOverlay {
  isOverlay: boolean | undefined;
}
// Overlay 스타일 (고정 배경)
export const overlayStyle = (isOverlay: boolean | undefined) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${isOverlay ? "rgba(0, 0, 0, 0.5)" : "transparent"};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 다른 콘텐츠 위에 오도록 설정 */
  pointer-events: ${isOverlay ? "auto" : "none"};
  & > div {
    pointer-events: auto;
  }
`;
