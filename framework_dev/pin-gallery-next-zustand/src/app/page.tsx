'use client';

import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { pageTypeList, pageTypeMain } from '@/styles/pages.css';
import Home from '@/app/(pages)/_home/HomePage';
import List from '@/app/(pages)/_list/ListPage';
import PageFrame from '@/app/_components/layout/PageFrame';

import Loading from '@/app/_components/loading/Loading';

// QueryClient 생성
const queryClient = new QueryClient();

export default function RootPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading name="app-loading" />}>
        <div id="app">
          <PageFrame id="home" className={pageTypeMain}>
            <Home />
          </PageFrame>
          <PageFrame id="list" className={pageTypeList}>
            <List />
          </PageFrame>
        </div>
      </Suspense>
    </QueryClientProvider>
  );
}
