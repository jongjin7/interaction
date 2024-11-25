/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import { css, Interpolation, Theme } from "@emotion/react";

const boxStyle = css``;

interface ContainerProps {
  customCss?: Interpolation<Theme>;
  children: ReactNode;
}
const Box = ({ children, customCss, ...props }: ContainerProps) => {
  return (
    <div css={[boxStyle, customCss]} {...props}>
      {children}
    </div>
  );
};

export default Box;
