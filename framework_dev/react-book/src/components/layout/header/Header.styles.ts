/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import Converter from "@/utils/converter";

export const headerContainer = css`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${Converter.rgba(theme.colors.white, 0.95)};
  backdrop-filter: blur(2px);
`;
export const innerHeader = css`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 ${theme.spacing.large};
`;
export const logoStyle = css`
  flex-shrink: 0;
  font-size: 24px;
  font-weight: bold;
`;

export const menuStyle = css`
  display: flex;
  justify-content: center;
  gap: 56px;
  width: 100%;
`;

export const menuItemStyle = css`
  position: relative;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  transition: color 0.15s ease-in;
  //padding-bottom: 4px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: -6px;
    height: 1.5px;
    background-color: ${theme.colors.primary};
    width: 0;
    opacity: 0;
    transition:
      width 0.3s ease,
      opacity 0.3s ease;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }

  &:hover {
    &:before,
    &:after {
      width: 50%;
      opacity: 1;
    }
  }
`;
export const menuItemActive = css`
  pointer-events: none;
  &:before,
  &:after {
    width: 50%;
    opacity: 1;
  }
`;
