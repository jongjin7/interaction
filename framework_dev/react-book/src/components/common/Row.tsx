/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import { css, Interpolation, Theme } from "@emotion/react";

const rowStyle = css`
  display: flex;
  align-items: center;
`;

interface RowProps {
  customCss?: Interpolation<Theme>;
  children: ReactNode;
}
const Row = ({ children, customCss, ...props }: RowProps) => {
  return (
    <div css={[rowStyle, customCss]} {...props}>
      {children}
    </div>
  );
};

export default Row;
