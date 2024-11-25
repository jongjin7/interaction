/** @jsxImportSource @emotion/react */
import React, { KeyboardEventHandler, useEffect, useState } from "react";
import { css, CSSObject } from "@emotion/react";
import { theme } from "@/styles/theme";
import {
  formGroupStyle,
  formSearchStyle,
} from "@/components/searchBar/SearchBar.styles";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

// props 타입 정의
interface DetailSearchProps {
  onSubmit: (query: string) => void;
  isOpen: boolean;
}

const DetailSearch = ({ onSubmit, isOpen }: DetailSearchProps) => {
  const [categoryValue, setCategoryValue] = useState<
    "title" | "author" | "publish"
  >("title");
  const [inputValue, setInputValue] = useState<string>("");

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(e.target.value as "title" | "author" | "publish");
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickSubmit = () => {
    onSubmit(inputValue);
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && inputValue) {
      onSubmit(inputValue);
    }
  };

  return (
    <fieldset css={formSearchStyle}>
      <div css={formGroupStyle}>
        <select onChange={handleChangeSelect} value={categoryValue}>
          <option value="title">제목</option>
          <option value="author">저자명</option>
          <option value="publish">출판사</option>
        </select>
        <InputField
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          value={inputValue}
          placeholder="검색어를 입력하세요"
        />
      </div>
      <Button
        customCss={theme.button.primary("large")}
        style={{ width: "100%" }}
        onClick={handleClickSubmit}
      >
        검색하기
      </Button>
    </fieldset>
  );
};

export default DetailSearch;
