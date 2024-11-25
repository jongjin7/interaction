import useSWRInfinite from "swr/infinite";
import {fetchBooks} from "@/api/books";
import React, {useCallback, useEffect, useState} from "react";
import {BookType} from "@/types/book";

interface ApiResponse {
  books: BookType[];
  total: number;
}

interface UseBooksProps {
  loaderRef: React.RefObject<HTMLDivElement>;
}

const useBooks = ({loaderRef}: UseBooksProps) => {
  const [query, setQuery] = useState<string>("");

  const getKey = useCallback(
    (pageIndex: number, previousPageData: ApiResponse | null): string | null => {
      if (!query) return null;  // 기본 값을 설정
      if (previousPageData && !previousPageData.books?.length) return null;
      return `/api/books?query=${query}&page=${pageIndex + 1}&size=10`;
    },
    [query],
  );

  const {
    data = [],
    error,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite<ApiResponse>(
    getKey,
    async (url: string) => {
      const [_, queryParams] = url.split("?");
      const params = new URLSearchParams(queryParams);
      return fetchBooks(
        params.get("query") || "",
        Number(params.get("page")),
        10,
      );
    },
    {
      revalidateOnFocus: false,
    },
  );

  const books = Array.from(
    new Map(
      data
        .flatMap((page) => page?.books || [])
        .map((book) => [book.isbn, book]),
    ).values(),
  );

  const total = data?.[0]?.total || 0;
  const isLoadingInitialData = !data.length && !error;
  const isLoadingMore =
    isValidating && size > 0 && typeof data[size - 1] === "undefined";
  const isReachingEnd =
    data.length && data[data.length - 1]?.books?.length < 10;

  const loadMore = useCallback(() => {
    if (!isLoadingMore && !isReachingEnd && getKey(size, null)) {
      setSize((prevSize) => prevSize + 1);
    }
  }, [isLoadingMore, isReachingEnd, setSize]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      {threshold: 0.99},
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, loadMore]);


  const handleBookSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery); // 검색어 업데이트
  }, []);

  return {
    books,
    error,
    total,
    getKey,
    handleBookSearch
  }
}
export default useBooks;
