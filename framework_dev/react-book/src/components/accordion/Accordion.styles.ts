/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 아코디언 카드 스타일
export const accordionCardStyle = css`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  background-color: #fff;
`;

// 아코디언 콘텐츠 스타일 (기본적으로 숨겨짐)
export const accordionContentStyle = css`
  display: none;
  padding: 10px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
`;

// 아코디언이 열렸을 때 콘텐츠 표시
export const openAccordionContentStyle = css`
  display: block;
  animation: slide-down 0.3s ease-in-out;
`;

// 슬라이드 다운 애니메이션 (CSS 애니메이션)
export const slideDown = css`
  @keyframes slide-down {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 200px;
      opacity: 1;
    }
  }
`;
