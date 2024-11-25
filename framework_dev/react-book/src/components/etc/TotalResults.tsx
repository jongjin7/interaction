/** @jsxImportSource @emotion/react */
import React, { ReactNode, useEffect, useState } from "react";
import { css, Interpolation, Theme } from "@emotion/react";
import { colors, theme } from "@/styles/theme";
import useFormattedPrice from "@/hooks/useFormattedPrice";

interface ResultProps {
  title: string;
  value: number;
  customCss?: Interpolation<Theme>;
}

const resultStyle = css`
  & > span {
    &:first-of-type {
      margin-right: 16px;
    }
  }
  .count {
    padding: 0 2px;
    color: ${theme.colors.primary};
  }
`;

const TotalResults = ({ title, value = 0, customCss }: ResultProps) => {
  const formattedPrice = useFormattedPrice(value);
  return (
    <div css={[resultStyle, customCss]}>
      <span>{title}</span>
      <span>
        <span>총</span>
        <span className={"count"}>{formattedPrice}</span>
        <span>건</span>
      </span>
    </div>
  );
};

export default TotalResults;
