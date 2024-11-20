import { useEffect, useRef, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { fetchBooks } from '../api/book';

const BookSearchApp = () => {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const loaderRef = useRef(null);

  // SWR Infinite key generator
  const getKey = (pageIndex, previousPageData) => {
    if (!query) return null; // Don't fetch if no query is provided
    if (previousPageData && !previousPageData.documents?.length) return null; // End of data
    return {
      query,
      page: pageIndex + 1,
      size: 10,
    };
  };

  const { data = [], error, size, setSize, isValidating } = useSWRInfinite(getKey, fetchBooks);

  const books = data.flatMap((page) => page?.documents || []); // Handle undefined pages
  const isLoadingInitialData = !data.length && !error;
  const isLoadingMore = isValidating && size > 0 && typeof data[size - 1] === 'undefined';
  const isReachingEnd = data.length && data[data.length - 1]?.documents?.length < 10;

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && !isReachingEnd) {
          setSize(size + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [isLoadingMore, isReachingEnd, size]);

  return (
    <div>
      <fieldset>
        <legend>Book Search</legend>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Enter book title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>

        {isLoadingInitialData && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        {books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                <img src={book.thumbnail} alt={book.title} />
                <p>{book.title}</p>
                <p>{book.authors.join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          !isLoadingInitialData && query && <p>No results found for "{query}".</p>
        )}

        <div ref={loaderRef} style={{ height: '50px', backgroundColor: 'transparent' }}>
          {isLoadingMore && <p>Loading more...</p>}
        </div>

        {isReachingEnd && <p>No more books to load.</p>}
      </fieldset>
    </div>
  );
};

export default BookSearchApp;
