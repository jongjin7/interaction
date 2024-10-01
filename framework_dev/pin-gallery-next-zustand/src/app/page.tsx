import React, { Suspense } from 'react';

import { pageTypeList, pageTypeMain } from '@/styles/pages.css';

import Home from '@/app/(pages)/_home/HomePage';
import List from '@/app/(pages)/_list/ListPage';
import PageFrame from '@/app/_components/layout/PageFrame';

import { ShowDetailProvider } from '@/app/_providers/ShowDetailProvider';
import Loading from '@/app/_components/loading/Loading';

export default async function RootPage() {
  return (
    <div id="app">
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
    </div>
  );
}
