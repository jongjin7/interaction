/** @jsxImportSource @emotion/react */
import React, { useRef } from "react";
import BookList from "@/components/bookList/BookList";
import TotalResults from "@/components/etc/TotalResults";
import Paper from "@/components/common/Paper";
import Main from "@/components/layout/main/Main";
import PageTitle from "@/components/common/PageTitle";
import { stickyBox } from "@/styles/utils.styles";
import SearchBar from "@/components/searchBar/SearchBar";
import useBooks from "@/pages/book/useBooks";

const Books = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { handleBookSearch, total, error, books } = useBooks({ loaderRef });

  // if (isLoadingInitialData) return <div>데이터를 로딩 중입니다...</div>;
  if (error) return <div>데이터를 가져오는 중 오류가 발생했습니다.</div>;

  return (
    <Main>
      <Paper>
        <div css={stickyBox}>
          <PageTitle title="도서검색" />
          <SearchBar handleBookSearch={handleBookSearch} />
          <TotalResults title="검색 결과" value={total} />
        </div>
        {error && <p>Error loading books: {error.message}</p>}
        <BookList books={books} />
        <div ref={loaderRef} style={{ height: "1px" }} />
      </Paper>
    </Main>
  );
};

export default Books;
