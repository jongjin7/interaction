/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import { css, CSSObject } from "@emotion/react";
import Container from "@/components/common/Container";

const containerStyle = css``;

interface ContainerProps {
  customCss?: CSSObject;
  children: ReactNode;
}
const Main = ({ children, customCss, ...props }: ContainerProps) => {
  return (
    <main css={[containerStyle, customCss]} {...props}>
      <Container>{children}</Container>
    </main>
  );
};

export default Main;
