/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import InputField from '@components/common/InputField';
import S from '@components/common/Button';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const addStyle = css`
  border: 2px dotted red;
  font-size: 32px;
`;

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
  padding: 2px;
`;
const SuggestionButton = styled.button`
  width: 100%;
  height: inherit;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#f0f0f0' : 'transparent')};

  &:hover {
    background-color: #f0f011;
  }
`;

const fruits = ['Apple', 'Banana', 'Orange', 'Grapes', 'Peach', 'Pineapple', 'Strawberry', 'Watermelon', 'Mango'];

const QuickSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(fruits);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Ref to detect clicks outside the suggestion list
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredSuggestions = fruits.filter((fruit) => fruit.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(fruits);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    // Delay the blur to check if the user clicked inside the suggestion list
    setTimeout(() => {
      // Check if the clicked target is inside the suggestions list or the input field itself
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.relatedTarget) &&
        inputRef.current !== e.relatedTarget
      ) {
        setIsFocused(false); // Close the suggestion list if clicked outside
      }
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (!isFocused) return;

    switch (e.key) {
      case 'ArrowDown':
        // 아래 방향키: 인덱스를 하나 증가시킴
        setSelectedIndex((prevIndex) => {
          // 목록의 끝을 넘어가지 않도록 제한
          return prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex;
        });
        break;
      case 'ArrowUp':
        // 위 방향키: 인덱스를 하나 감소시킴
        setSelectedIndex((prevIndex) => {
          // 인덱스가 0보다 작지 않도록 제한
          return prevIndex > 0 ? prevIndex - 1 : prevIndex;
        });
        break;
      case 'Enter':
        // Enter 키: 현재 선택된 항목을 선택
        if (selectedIndex !== -1) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      default:
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setQuery(suggestion); // Update input value with selected suggestion
    setIsFocused(false); // Close suggestions list
    setSelectedIndex(-1); // Reset selected index
  };

  return (
    <SearchContainer>
      <Title>Quick Search</Title>
      <SearchLabel htmlFor="search">Search for a fruit:</SearchLabel>
      <SearchField>
        <InputField
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search for a fruit..."
          autoComplete="off"
        />
        <S.IconButton css={addStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </S.IconButton>
      </SearchField>
      {isFocused && suggestions.length > 0 && (
        <SuggestionsList ref={suggestionsRef}>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem key={index}>
              <SuggestionButton onClick={() => handleSuggestionClick(suggestion)} selected={index === selectedIndex}>
                {suggestion}
              </SuggestionButton>
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}

      {selectedSuggestion && <div>You selected: {selectedSuggestion}</div>}
    </SearchContainer>
  );
};

export default QuickSearch;
