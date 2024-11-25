/** @jsxImportSource @emotion/react */
import React from "react";
import { css, CSSObject } from "@emotion/react";
import { theme } from "@/styles/theme";
import { ReactComponent as IconBook } from "@/imgs/icon_book.svg";

interface NoneDataProps {
  title?: string;
  useIcon?: boolean;
  customCss?: CSSObject;
}

const noneDataStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 100px 0;
  gap: 24px;
`;

const NoneData = ({ ...props }: NoneDataProps) => {
  const {
    title = "검색된 결과가 없습니다.",
    useIcon = true,
    customCss,
  } = props;
  return (
    <div css={[noneDataStyle, customCss]}>
      {useIcon ? <IconBook width={80} height={80} /> : ""}
      <div css={theme.typography.bodyTitle}>{title}</div>
    </div>
  );
};

export default NoneData;
