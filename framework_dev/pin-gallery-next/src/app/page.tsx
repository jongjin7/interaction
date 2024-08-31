import Loading from '@/app/_components/loading/Loading';
import React, { Suspense } from 'react';

import { pageTypeList, pageTypeMain } from '@/styles/pages.css';

import Home from '@/app/(pages)/_home/HomePage';
import List from '@/app/(pages)/_list/ListPage';
import PageFrame from '@/app/_components/layout/PageFrame';

import ApiService from '@/app/_services/ApiService';
import { AlbumProvider } from '@/app/_providers/AlbumProvider';
import { ShowDetailProvider } from '@/app/_providers/ShowDetailProvider';
import { randomArrayItem, largestArrayItem } from '@/app/_utils/RandomAndLongest';

export default async function Layout() {
  const resAlbums = await ApiService.fetchCategory();
  const categories = resAlbums.data;
  const resAlbumImages = await ApiService.fetchGalleryList(categories.map((album) => album.id));
  const randomImages = randomArrayItem(resAlbumImages) as [];
  const largestAlbum = largestArrayItem(resAlbumImages, categories);
  return (
    <div id="app">
      <AlbumProvider
        initialCategories={categories}
        initialAlbumImages={resAlbumImages}
        initialRandomImage={randomImages}
        initialLargestAlbum={largestAlbum}
      >
        <Suspense fallback={<Loading name="app-loading" />}>
          <ShowDetailProvider>
            <PageFrame id="home" className={pageTypeMain}>
              <Home />
            </PageFrame>
            <PageFrame id="list" className={pageTypeList}>
              <List />
            </PageFrame>
          </ShowDetailProvider>
        </Suspense>
      </AlbumProvider>
    </div>
  );
}
