/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

const SearchContainer = css`
  position: relative;
  margin: 0 auto;
  padding: 0;
  border: none;
  font-family: Arial, sans-serif;
  legend {
    display: none;
  }
`;

const SearchTitleStyle = css`
  text-align: center;
  font-size: 24px;
`;

const SearchFieldWrapStyle = css`
  position: relative;
  &:focus-within {
    button {
      color: ${theme.colors.primary};
    }
  }
`;
const SearchFieldStyle = css`
  position: relative;
  z-index: 1;
  width: 480px;
  height: 50px;
  padding-left: 50px;
  border-radius: 30px;
  border-color: #f2f4f6;
  background-color: #f2f4f6;
  &:focus {
    border-color: ${theme.colors.primary};
  }
`;
const SearchLabelStyle = css`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
`;
export const iconSearchBtnStyle = css`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
  width: 30px;
  height: 30px;
`;

export {
  SearchContainer,
  SearchTitleStyle,
  SearchLabelStyle,
  SearchFieldWrapStyle,
  SearchFieldStyle,
};
