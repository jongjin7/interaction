/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

const SuggestionsListStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 58px 0 10px;
  border-radius: 30px;
  background-color: #f2f4f6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  ul {
    list-style-type: none;
    margin: 0;
    overflow-y: auto;
    max-height: 200px;
  }
`;

const SuggestionItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px 0 30px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #e7ebee;
    button {
      &:last-of-type {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
`;
const SuggestionButtonStyle = (selected: boolean) => css`
  width: 100%;
  height: 40px;
  padding: 0 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  text-align: left;
  color: ${selected? theme.colors.primary:''};
  background-color: transparent;
  &:hover {
    color: ${theme.colors.primary};
  }
`;
const SuggestionItemDeleteStyle = css`
  opacity: 0;
  width: 24px;
  height: 24px;
  pointer-events: none;
  transition: opacity 0.15s;
  &:hover {
    color: ${theme.colors.danger} !important;
  }
`;

export {
  SuggestionsListStyle,
  SuggestionItemStyle,
  SuggestionButtonStyle,
  SuggestionItemDeleteStyle,
};
