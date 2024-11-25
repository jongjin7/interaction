/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import useFavorites from "./useFavorites";
import BookList from "@/components/bookList/BookList";
import TotalResults from "@/components/etc/TotalResults";
import Paper from "@/components/common/Paper";
import Main from "@/components/layout/main/Main";
import PageTitle from "@/components/common/PageTitle";
import { stickyBox } from "@/styles/utils.styles";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <Main>
      <Paper>
        <div css={stickyBox}>
          <PageTitle title="내가 찜한 책" />
          <TotalResults title="찜한 책" value={favorites.length} />
        </div>
        <BookList books={favorites} />
      </Paper>
    </Main>
  );
};

export default Favorites;
