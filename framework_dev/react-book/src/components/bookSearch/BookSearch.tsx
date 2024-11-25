/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import {
  SearchContainer,
  SearchTitleStyle,
  SearchFieldWrapStyle,
  SearchFieldStyle,
  iconSearchBtnStyle,
} from "./BookSearch.styles";
import InputField from "@/components/common/InputField";
import IconButton from "@/components/common/IconButton";
import SuggestionsList from "@/components/bookSearch/SuggestionsList";
import { ReactComponent as IconZoom } from "@/imgs/icon_zoom.svg";
import useBookSearch from "@/components/bookSearch/useBookSearch";

interface BookSearchProps {
  onSearch: (params: string) => void;
  resetFrom: boolean;
}

const BookSearch = ({ onSearch, resetFrom }: BookSearchProps) => {
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    query,
    handleInputChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
    handleSuggestionClick,
    isFocused,
    selectedIndex,
    suggestions,
  } = useBookSearch({ inputRef, suggestionsRef, onSearch, resetFrom });

  return (
    <fieldset css={SearchContainer}>
      <legend css={SearchTitleStyle}>Quick Search</legend>
      <div css={SearchFieldWrapStyle}>
        <InputField
          type="search"
          customCss={SearchFieldStyle}
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          autoComplete="off"
        />
        <IconButton
          customCss={iconSearchBtnStyle}
          title="Search"
          onClick={() => onSearch(query)}
        >
          <IconZoom />
        </IconButton>
      </div>
      {isFocused && suggestions.length > 0 && (
        <SuggestionsList
          listData={suggestions}
          onSuggestionClick={handleSuggestionClick}
          selectedIndex={selectedIndex}
          ref={suggestionsRef}
        />
      )}
    </fieldset>
  );
};

export default BookSearch;
