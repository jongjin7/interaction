/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import { css, Interpolation, Theme } from "@emotion/react";

const imageBoxStyle = css`
  width: 48px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface ImageBoxProps {
  customCss?: Interpolation<Theme>;
  children: ReactNode;
}
const ImageBox = ({ children, customCss, ...props }: ImageBoxProps) => {
  return (
    <div css={[imageBoxStyle, customCss]} {...props}>
      {children}
    </div>
  );
};

export default ImageBox;
