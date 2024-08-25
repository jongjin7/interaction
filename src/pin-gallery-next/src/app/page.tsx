import Loading from '@/app/_components/loading/Loading';
import React, { Suspense } from 'react';

import Home from '@/app/_home/HomePage';
import List from '@/app/_list/ListPage';
import { pageTypeList, pageTypeMain } from '@/styles/pages.css';
import ApiService from '@/app/_services/ApiService';
import PageFrame from '@/app/_components/layout/PageFrame';

import { AlbumProvider } from '@/app/_data/CategoryProvider';
import { ShowDetailProvider } from '@/app/_data/ShowDetailProvider';

export default async function Layout() {
  const resAlbums = await ApiService.fetchCategory();
  const categories = resAlbums.data;
  const resAlbumImages = await ApiService.fetchGalleryList(categories.map((album) => album.id));
  return (
    <div id="app">
      <AlbumProvider initialCategories={categories} initialAlbumImages={resAlbumImages}>
        <Suspense fallback={<Loading name="app-loading" />}>
          <PageFrame id="home" className={pageTypeMain}>
            <Home />
          </PageFrame>
          <PageFrame id="list" className={pageTypeList}>
            <ShowDetailProvider>
              <List />
            </ShowDetailProvider>
          </PageFrame>
        </Suspense>
      </AlbumProvider>
    </div>
  );
}
