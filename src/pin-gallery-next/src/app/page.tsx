import Loading from '@/app/_components/loading/Loading';
import React, { Suspense } from 'react';

import Home from '@/app/_home/HomePage';
import List from '@/app/_list/ListPage';
import { pageTypeMain, pageTypeList } from '@/styles/pages.css';
import { AlbumProvider } from '@/app/_data/CategoryProvider';
import ApiService from '@/app/_services/ApiService';
import ListDetail from '@/app/_list/ListDetail';

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
  const categories = await resAlbums.data;
  // const resAlbumImages = await ApiService.fetchGalleryList(categories.map((album) => album.data));
  console.log(
    'aaa',
    categories.map((album) => album.data),
  );
  const albumImages = categories;

  return (
    <div id="app">
      <AlbumProvider initialCategories={categories} initialAlbumImages={albumImages}>
        <Suspense fallback={<Loading name="app-loading" />}>
          <CreatePageFrames />
        </Suspense>
      </AlbumProvider>
    </div>
  );
}
