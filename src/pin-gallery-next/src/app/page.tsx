import Loading from '@/app/_components/loading/Loading';
import React, { Suspense } from 'react';

import Home from '@/app/_home/HomePage';
import List from '@/app/_list/ListPage';
import { pageTypeMain, pageTypeList } from '@/styles/pages.css';
import { CategoryProvider } from '@/app/_data/CategoryProvider';
import ApiService from '@/app/_services/ApiService';

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
      </div>,
    );
  });
  return pageFrameHTML;
};

export default async function Layout() {
  const resData = await ApiService.fetchCategory();
  const categories = resData.data;

  return (
    <div id="app">
      <CategoryProvider initialCategories={categories}>
        <Suspense fallback={<Loading name="app-loading" />}>
          <CreatePageFrames />
        </Suspense>
      </CategoryProvider>
    </div>
  );
}
