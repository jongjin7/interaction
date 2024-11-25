/** @jsxImportSource @emotion/react */
import React from "react";
import BookCard from "./BookCard";
import NoneData from "@/components/etc/NoneData";
import { css } from "@emotion/react";

const bookListStyle = css`
  padding: 20px 0;
`;

const BookList = ({ books }: { books: any[] }) => {
  if (books.length === 0) return <NoneData />;
  return (
    <div css={bookListStyle}>
      {books.map((book) => (
        <BookCard key={book.isbn} book={book} />
      ))}
    </div>
  );
};

export default BookList;
