'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';
import ListDetail from '@/app/(pages)/_list/ListDetail';
import { ShowDetailContext } from '@/app/_providers/ShowDetailProvider';
import Tabs from './tab-nav/Tabs';
import TabContent from './tab-content/TabContent';

const ListPage: React.FC = () => {
  const detailContext = useContext(ShowDetailContext);
  if (!detailContext) {
    throw new Error(
      'ShowDetailContext를 찾을 수 없습니다. 컴포넌트가 ShowDetailProvider 내에서 사용되는지 확인하세요.',
    );
  }
  const { currentDetailLink } = detailContext;

  const pageRef = useRef<HTMLDivElement | null>(null);
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const showDetailClass = 'show-detail';

  useEffect(() => {
    if (pageRef.current) {
      const parentElement = pageRef.current?.parentElement as HTMLElement | null;

      if (parentElement) {
        const pageFrame = parentElement;

        if (currentDetailLink) {
          pageFrame.classList.add(showDetailClass);
        } else {
          pageFrame.classList.remove(showDetailClass);
        }
      } else {
        console.warn('Parent element is null.');
      }
    } else {
      console.warn('pageRef.current is null.');
    }
  }, [currentDetailLink]);

  return (
    <>
      <div ref={pageRef} className="page-container">
        <Tabs tabControl={{ currentTabIndex, setCurrentTabIndex }} />
        <TabContent tabControl={{ currentTabIndex, setCurrentTabIndex }} />
      </div>
      <ListDetail imageSrc={currentDetailLink} />
    </>
  );
};

export default ListPage;
