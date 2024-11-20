/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
const detailSearch = css`
  display: flex;
  select,
  input {
    height: 32px;
    width: 100%;
  }
  select {
    width: 160px;
  }
`;

const DetailSearch = ({ isOpen, onSubmit }) => {
  const [select, setSelect] = useState('title');
  const [inputValue, setInputValue] = useState('');
  const handleChangeSelect = (e) => {
    setSelect(e.target.value);
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log('modal', isOpen);
    // setSelect('');
    // setInputValue('');
  }, []);

  const handleClick = () => {
    onSubmit(inputValue);
  };

  return (
    <div>
      <div css={detailSearch}>
        <select onChange={handleChangeSelect} value={select}>
          <option value="title">제목</option>
          <option value="author">저자</option>
          <option value="publish">출판사</option>
        </select>
        <input type="text" onChange={handleChangeInput} value={inputValue} />
        <small>
          현재 선택된 셀렉트: {select} /// 필드: {inputValue}
        </small>
      </div>
      <button onClick={handleClick}>검색하기</button>
    </div>
  );
};

export default DetailSearch;
