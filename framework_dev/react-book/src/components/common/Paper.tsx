/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import { css, CSSObject } from "@emotion/react";

const paperStyle = css`
  width: 960px;
  margin: 80px auto;
`;

interface PaperProps {
  customCss?: CSSObject;
  children: ReactNode;
}

const Paper = ({ children, customCss, ...props }: PaperProps) => {
  return (
    <div css={[paperStyle, customCss]} {...props}>
      {children}
    </div>
  );
};

export default Paper;
