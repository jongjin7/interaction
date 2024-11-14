import React, { useState } from 'react';
import InputField from '@components/InputField';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const SearchContainer = styled.fieldset`
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.legend`
  text-align: center;
  font-size: 24px;
`;
const SearchField = styled.div`
  position: relative;
`;
const SearchLabel = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid red;
  height: 48px;
  width: 48px;
  padding: 8px;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-top: none;
  background-color: #fff;
  list-style-type: none;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const QuickSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fruits = ['Apple', 'Banana', 'Orange', 'Grapes', 'Peach', 'Pineapple', 'Strawberry', 'Watermelon', 'Mango'];

  // 필터링된 제안 목록을 계산합니다.
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const filteredSuggestions = fruits.filter((fruit) => fruit.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // 사용자가 제안 항목을 클릭했을 때 입력 필드에 값을 넣습니다.
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };
  return (
    <SearchContainer>
      <Title>Quick Search</Title>
      <SearchLabel htmlFor="search">Search for a fruit:</SearchLabel>
      <SearchField>
        <InputField value={query} onChange={handleInputChange} id="search" placeholder="Start typing..." />
        <Button type={'button'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </Button>
      </SearchField>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </SearchContainer>
  );
};

export default QuickSearch;
