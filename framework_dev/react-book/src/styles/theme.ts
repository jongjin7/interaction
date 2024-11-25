/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Converter from "@/utils/converter";

// 기본적인 색상 정의
export const colors = {
  primary: "#4880EE", // 주 색상 (파랑)
  secondary: "#6c757d", // 보조 색상 (회색)
  success: "#28a745", // 성공 색상 (녹색)
  danger: "#E84118", // 경고 색상 (빨강)
  warning: "#ffc107", // 경고 색상 (노랑)
  info: "#17a2b8", // 정보 색상 (파랑)
  light: "#F2F4F6", // 밝은 색상
  gray: "#DADADA", // 중간 색상
  dark: "#343a40", // 어두운 색상
  white: "#ffffff",
  tertiary: "#8D94A0",
  black: "#000",
  textPrimary: "#353C49",
  textSecondary: "#6D7582",
  textTertiary: "#8D94A0",
};

// 기본 폰트 정의
export const fonts = {
  primary: "Pretendard, sans-serif", // 기본 폰트
  heading: "Pretendard, sans-serif", // 헤딩 폰트
  body: "Pretendard, sans-serif", // 본문 폰트
};

// 기본적인 간격 정의
export const spacing = {
  small: "8px",
  medium: "10px",
  large: "28px",
  xlarge: "64px",
};

// 버튼 공통 스타일 정의
const commonButtonStyles = (
  size: "small" | "medium" | "large" = "medium",
) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: ${size === "small" ? "24px" : size === "large" ? "48px" : "36px"};
  gap: 4px;
  padding: 4px
    ${size === "small"
      ? spacing.small
      : size === "large"
        ? spacing.large
        : spacing.medium};
  border-radius: ${size === "small" ? "4px" : size === "large" ? "8px" : "8px"};
  background-color: #fff;
  border: 1px solid;
  cursor: pointer;
  font-size: ${size === "small" ? "12px" : size === "large" ? "16px" : "14px"};
  line-height: 1;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;

  &:disabled {
    cursor: not-allowed;
  }
`;

// 각 버튼의 변형 스타일
export const button = {
  default: (
    size: "small" | "medium" | "large",
    outlined: boolean = false,
  ) => css`
    ${commonButtonStyles(size)};
    border-color: ${outlined ? theme.colors.secondary : "transparent"};
  `,

  primary: (
    size: "small" | "medium" | "large",
    outlined: boolean = false,
  ) => css`
    ${commonButtonStyles(size)};
    border-color: ${colors.primary};
    background-color: ${outlined ? "transparent" : colors.primary};
    color: ${outlined ? colors.primary : "#fff"};

    &:hover {
      background-color: ${outlined ? colors.primary : "#336ad5"};
      color: ${colors.white};
      border-color: ${outlined ? colors.primary : "#336ad5"};
    }

    &:disabled {
      background-color: ${colors.light};
    }
  `,
  secondary: (
    size: "small" | "medium" | "large",
    outlined: boolean = false,
  ) => css`
    ${commonButtonStyles(size)};
    border-color: ${colors.secondary};
    background-color: ${outlined ? "transparent" : colors.secondary};
    color: ${outlined ? colors.textSecondary : "#fff"};

    &:hover {
      background-color: ${outlined ? "#565d64" : colors.dark};
      color: ${colors.white};
      border-color: ${outlined ? "#565d64" : colors.dark};
    }

    &:disabled {
      background-color: ${colors.light};
    }
  `,
  tertiary: (
    size: "small" | "medium" | "large",
    outlined: boolean = false,
  ) => css`
    ${commonButtonStyles(size)};
    border-color: ${colors.tertiary};
    background-color: ${outlined ? "transparent" : colors.tertiary};
    color: ${colors.textTertiary};

    &:hover {
      background-color: ${colors.dark};
    }

    &:disabled {
      background-color: ${colors.light};
      border-color: ${colors.light};
      color: ${colors.textSecondary};
    }
  `,
};

// 텍스트 스타일 (타이포그래피)
export const typography = {
  h1: css`
    font-size: 2.25rem;
    font-weight: 700;
    color: ${colors.textPrimary};
  `,
  h2: css`
    font-size: 1.625rem;
    font-weight: 700;
    color: ${colors.textPrimary};
  `,
  h3: css`
    font-size: 1.125rem;
    font-weight: 700;
    color: ${colors.textPrimary};
  `,
  h4: css`
    font-size: 1rem;
    font-weight: 700;
    color: ${colors.textPrimary};
  `,
  h5: css`
    font-size: 0.875rem;
    font-weight: 700;
    color: ${colors.textPrimary};
  `,
  p: css`
    font-size: 0.875rem;
    color: ${colors.textSecondary};
    line-height: 1.4;
    font-weight: 500;
  `,
  bodyTitle: css`
    font-size: 1rem;
  `,
  bodyCaption: css`
    font-size: 0.875rem;
    color: ${colors.textTertiary};
  `,
  strong: css`
    font-weight: 700;
  `,
  small: css`
    font-size: 0.625rem;
  `,
};

// 글로벌 스타일 정의
export const globalStyles = css`
  :root {
    --max-container-width: 1600px;
    --min-container-width: 1024px;
  }
  body {
    font-family: ${fonts.body};
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    background-color: ${colors.white};
    color: ${colors.textPrimary};
    min-width: var(--min-container-width);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${colors.textPrimary};
  }

  a {
    text-decoration: none;
    color: ${colors.textPrimary};

    &:hover {
      color: ${Converter.rgba(colors.primary, 0.9)};
    }
  }

  /* 기타 기본 스타일들 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// 기본적인 테마 설정
export const theme = {
  colors,
  fonts,
  spacing,
  button,
  typography,
};
