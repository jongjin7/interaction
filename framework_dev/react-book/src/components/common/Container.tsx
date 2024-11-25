/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import { css, CSSObject } from "@emotion/react";

const containerStyle = css`
  max-width: var(--max-container-width);
  margin: 0 auto;
`;

interface ContainerProps {
  customCss?: CSSObject;
  children: ReactNode;
}

const Container = ({ children, customCss, ...props }: ContainerProps) => {
  return (
    <div css={[containerStyle, customCss]} {...props}>
      {children}
    </div>
  );
};

export default Container;
