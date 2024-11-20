/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';

const SearchContainer = css`
  position: relative;
  max-width: 400px;
  margin: 0 auto;

  font-family: Arial, sans-serif;
`;

const SearchField = css`
  position: relative;
  input {
    height: 40px;
  }
`;

const searchLabel = css`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
`;

const searchButton = css`
  height: 40px;
  cursor: pointer;
`;

const SuggestionsList = css`
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

const SuggestionItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const getSuggestionButtonStyle = (selected) => css`
  flex-grow: 1;
  padding: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: ${selected ? '#f0f0f0' : 'transparent'};
  text-align: left;
`;

const DeleteButton = css`
  padding: 5px 10px;
  font-size: 14px;
  color: white;
  background-color: red;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const MAX_HISTORY = 8;

const SearchComponent = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const suggestionsRef = useRef(null);

  // 로컬 스토리지에서 검색 기록 가져오기
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 검색 기록 저장
  const saveHistory = (newHistory) => {
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // 입력값과 매칭되는 검색 기록만 필터링
    if (value) {
      const filtered = searchHistory.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query) {
      const filtered = searchHistory.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(filtered);
    }
  };

  const handleBlur = (e) => {
    // onBlur가 클릭 동작에 영향을 주지 않도록 시간차 추가
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query) {
      console.log('aaaa', query.length);
      // 검색 기록에 추가
      const updatedHistory = [query, ...searchHistory.filter((item) => item !== query)];
      if (updatedHistory.length > MAX_HISTORY) {
        updatedHistory.pop();
      }
      setSearchHistory(updatedHistory);
      saveHistory(updatedHistory);

      sendQuery();
    }
  };

  const sendQuery = () => {
    setSelectedSuggestion(query);
    setSuggestions([]);
    setQuery('');

    // 부모 컴포넌트의 onSearch 핸들러 호출
    onSearch(query);
  };

  const handleClickBtn = () => {
    sendQuery();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); // 입력 필드에 반영
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
    setIsFocused(false); // 추천 목록 닫기
  };

  const handleSuggestionDeleteClick = (suggestion) => {
    // 검색 기록에서 아이템 제거
    const updatedHistory = searchHistory.filter((item) => item !== suggestion);
    setSearchHistory(updatedHistory);
    saveHistory(updatedHistory);

    // 현재 노출 중인 suggestions도 업데이트
    const updatedSuggestions = suggestions.filter((item) => item !== suggestion);
    setSuggestions(updatedSuggestions);

    // 현재 입력 값이 삭제된 추천 항목과 동일하면 초기화
    if (query === suggestion) {
      setQuery('');
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return [text];

    const regex = new RegExp(`(${query})`, 'gi');
    return text
      .split(regex)
      .map((part, index) => (part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part));
  };

  return (
    <div css={SearchContainer}>
      <label css={searchLabel} htmlFor="search">
        빠른 검색
      </label>
      <div css={SearchField}>
        <input
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요."
          autoComplete="off"
        />
        <button onClick={handleClickBtn} css={searchButton}>
          검색
        </button>
      </div>
      {isFocused && suggestions.length > 0 && (
        <ul css={SuggestionsList} ref={suggestionsRef}>
          {suggestions.map((suggestion, index) => (
            <li key={index} css={SuggestionItem}>
              <button css={getSuggestionButtonStyle(false)} onClick={() => handleSuggestionClick(suggestion)}>
                {highlightMatch(suggestion, query)}
              </button>
              <button css={DeleteButton} onClick={() => handleSuggestionDeleteClick(suggestion)}>
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      {/*{selectedSuggestion && <div className="selected-suggestion">You selected: {selectedSuggestion}</div>}*/}
    </div>
  );
};

export default SearchComponent;
