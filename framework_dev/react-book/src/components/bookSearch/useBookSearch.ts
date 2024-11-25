import React, {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";

interface useBookSearchProps {
  inputRef: React.RefObject<HTMLDivElement>;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  onSearch: (params: string) => void;
  resetFrom: boolean;
}

const MAX_HISTORY = 8;

const UseBookSearch = ({ ...props }: useBookSearchProps) => {
  const { inputRef, suggestionsRef, onSearch, resetFrom } = props;
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // Fetch search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    setQuery("");
  }, [resetFrom]);

  // Save search history to localStorage
  const saveHistory = (newHistory: string[]) => {
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // Add a new search term to the history
  const addToHistory = (term: string) => {
    const updatedHistory = [
      term,
      ...searchHistory.filter((item) => item !== term),
    ].slice(0, MAX_HISTORY);
    setSearchHistory(updatedHistory);
    saveHistory(updatedHistory);
  };

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      setIsFocused(false);
      setSelectedIndex(-1);
      addToHistory(suggestion);
      onSearch(suggestion);
    },
    [addToHistory, onSearch],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      if (value) {
        const filtered = searchHistory.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase()),
        );
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    },
    [searchHistory],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (query) {
      const filtered = searchHistory.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filtered);
    }
  }, [query, searchHistory]);

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.relatedTarget as Node) &&
        inputRef.current !== e.relatedTarget
      ) {
        setIsFocused(false);
      }
    },
    [suggestionsRef, inputRef],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      // if (!isFocused) return;
      switch (e.key) {
        case "ArrowDown":
          setSelectedIndex((prevIndex) =>
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex,
          );
          break;
        case "ArrowUp":
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex,
          );
          break;
        case "Enter":
          if (query) {
            if (selectedIndex !== -1) {
              handleSuggestionClick(suggestions[selectedIndex]);
            } else {
              addToHistory(query);
              onSearch(query);
            }
            setIsFocused(false);
          }
          break;
        default:
          break;
      }
    },
    [
      isFocused,
      suggestions,
      selectedIndex,
      query,
      addToHistory,
      onSearch,
      handleSuggestionClick,
    ],
  );

  return {
    query,
    handleInputChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
    handleSuggestionClick,
    isFocused,
    selectedIndex,
    suggestions,
  };
};
export default UseBookSearch;
