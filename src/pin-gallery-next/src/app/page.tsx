import Loading from '@/app/_components/loading/Loading';
import React, { Suspense } from 'react';

import Home from '@/app/_home/HomePage';
import List from '@/app/_list/ListPage';
import { pageTypeList, pageTypeMain } from '@/styles/pages.css';
import { AlbumProvider } from '@/app/_data/CategoryProvider';
import ApiService from '@/app/_services/ApiService';
import ListDetail from '@/app/_list/ListDetail';
import PageFrame from '@/app/_components/layout/PageFrame';

const CreatePageFrames: React.FC = async () => {
  const pageList = [
    { id: 'home', className: pageTypeMain },
    { id: 'list', className: pageTypeList },
  ];
  const pageFrameHTML = [];
  pageList.forEach((page) => {
    const { id, className } = page;
    pageFrameHTML.push(
      <div id={id} className={`${className} page-panel`} key={page.id}>
        <div className="page-container">{id === 'home' ? <Home /> : <List />}</div>
        {id === 'list' ? <ListDetail /> : null}
      </div>,
    );
  });
  return pageFrameHTML;
};

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
            <List />
          </PageFrame>
        </Suspense>
      </AlbumProvider>
    </div>
  );
}
