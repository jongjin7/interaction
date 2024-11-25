/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// 찜된 아이콘
const svgIconStyle = css`
  path {
    stroke: ${theme.colors.danger};
    fill: ${theme.colors.danger};
  }
`;

export const bookCardStyle = css`
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
`;
export const ListHeaderStyle = css`
  padding: 16px 16px 16px 48px;
`;

export const ListHeaderCell_1 = css`
  position: relative;
  margin-right: 48px;
  flex-shrink: 0;
  img {
    vertical-align: middle;
  }

  svg {
    position: absolute;
    right: 0;
    top: 0;
    width: 16px;
    height: 16px;
    path {
      stroke-width: 1px;
    }

    &[color="on"] {
      ${svgIconStyle}
    }
  }
`;
export const ListHeaderCell_2 = css`
  ${theme.typography.h3}
  max-width: 280px;
  margin-right: 16px;
  word-break: break-word;
  line-height: 1.3;
  flex-shrink: 0;
`;
export const ListHeaderCell_3 = css`
  ${theme.typography.p};
  margin-right: 16px;
  word-break: break-word;
`;
export const ListHeaderCell_4 = css`
  width: 132px;
  margin-left: auto;
  flex-shrink: 0;
`;
export const ListHeaderCell_5 = css`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  button {
    &:last-of-type {
      & svg {
        transition: transform 0.3s;
      }
    }
  }
`;
export const ListHeaderCell_6 = css`
  border: 1px solid blue;
`;
export const activeButtonStyle = css`
  & svg {
    transform: rotate(180deg);
  }
`;

export const ListBodyStyle = css`
  display: none;
`;
export const ListBodyInnerStyle = css`
  align-items: flex-start;
  padding: 70px 10px 70px 60px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
`;
export const ListBodyCell_1 = css`
  position: relative;
  flex-shrink: 0;
  margin-right: 32px;
  margin-bottom: 16px;

  button {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;

    svg {
      &[color="on"] {
        ${svgIconStyle}
      }
    }
  }
`;
export const ListBodyCell_2 = css`
  margin-right: 48px;
  padding-top: 20px;
  word-break: break-word;
  div:nth-of-type(1) {
    margin-bottom: 20px;
    h1 {
      display: inline-block;
      margin: 0 16px 0 0;
    }
  }
  div:nth-of-type(2) {
    margin-bottom: 16px;
  }
`;
export const PriceArea = css`
  margin-bottom: 28px;
  & > div:not(:first-of-type):last-child {
    margin-top: 8px;
  }
`;
export const ListBodyCell_3 = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-left: auto;
  padding-top: 168px;
`;

export const openAccordionStyle = css`
  display: block;
`;

export const ListBodyThumbStyle = css`
  width: 210px;
  height: 280px;
`;
