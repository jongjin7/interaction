/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
interface PageTitleProps {
  title: string;
}
const pageTitleStyle = css`
  margin: 0 0 24px;
`;
const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 css={[theme.typography.h1, pageTitleStyle]}>{title}</h1>;
};

export default PageTitle;
