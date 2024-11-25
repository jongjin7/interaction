/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Converter from "@/utils/converter";
import { theme } from "@/styles/theme";

// 공통적인 마진 및 패딩을 위한 유틸리티 클래스
export const marginY = (value: string | number) => css`
  margin-top: ${value};
  margin-bottom: ${value};
`;

export const marginX = (value: string | number) => css`
  margin-left: ${value};
  margin-right: ${value};
`;

export const paddingY = (value: string | number) => css`
  padding-top: ${value};
  padding-bottom: ${value};
`;

export const paddingX = (value: string | number) => css`
  padding-left: ${value};
  padding-right: ${value};
`;

// 텍스트 관련 스타일
export const textCenter = css`
  text-align: center;
`;

export const textBold = css`
  font-weight: bold;
`;

export const textLarge = css`
  font-size: 1.25rem; // 20px
`;

// 배경 색상, 테두리 색상 등 유틸리티 스타일
export const backgroundPrimary = css`
  background-color: #007bff;
`;

export const border = (color: string = "#ccc") => css`
  border: 1px solid ${color};
`;

// 박스 그림자
export const boxShadow = css`
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
`;

export const stickyBox = css`
  position: sticky;
  top: 80px;
  z-index: 10;
  padding: 0 0 16px;
  background-color: ${Converter.rgba(theme.colors.white, 0.95)};
  backdrop-filter: blur(2px);
`;
