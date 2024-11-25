/** @jsxImportSource @emotion/react */
import React, { forwardRef, ReactNode } from "react";
import { css, CSSObject } from "@emotion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customCss?: CSSObject;
}

const iconButtonStyle = css`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: inherit;

  svg {
    width: 100%;
    height: 100%;
    vertical-align: top;
    transition: color 0.15s ease;
  }
`;

const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, customCss, ...props }, ref) => {
    return (
      <button
        type="button"
        css={[iconButtonStyle, customCss]} // customCss 스타일 적용
        ref={ref}
        {...props} // 전달된 모든 props (onClick, onFocus 등)
      >
        {children}
      </button>
    );
  },
);

export default IconButton;
