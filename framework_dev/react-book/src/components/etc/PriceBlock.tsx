/** @jsxImportSource @emotion/react */
import React, { ReactNode, useEffect, useState } from "react";
import { css, Interpolation, Theme } from "@emotion/react";
import { colors, theme } from "@/styles/theme";
import useFormattedPrice from "@/hooks/useFormattedPrice";

interface PriceProps {
  title: string;
  price: number;
  isDiscounted?: boolean;
  customCss?: Interpolation<Theme>;
}

const priceStyle = css`
  .title {
    position: relative;
    top: -2px;
    display: inline-block;
    width: 50px;
    margin-right: 8px;
    text-align: right;
    color: ${theme.colors.textTertiary};
  }
  .value {
    position: relative;
    font-weight: 700;
    font-size: 18px;
    span:last-child {
      margin-left: 2px;
    }
  }
  &.dcprice {
    .value {
      font-weight: 350;
      &:after {
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        border-top: 1.5px solid ${theme.colors.dark};
        content: "";
      }
    }
  }
`;

const PriceBlock = ({
  title,
  price = 0,
  isDiscounted = false,
  customCss,
}: PriceProps) => {
  const formattedPrice = useFormattedPrice(price);

  return (
    <div
      css={[priceStyle, customCss]}
      className={isDiscounted ? "dcprice" : ""}
    >
      <span css={theme.typography.small} className={"title"}>
        {title}
      </span>
      <span className={"value"}>
          {price === -1 ? (
              "품절"
          ) : (
              <>
                  <span>{formattedPrice}</span>
                  <span>원</span>
              </>
          )}

      </span>
    </div>
  );
};

export default PriceBlock;
