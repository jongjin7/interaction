'use client';

import React, { useState, useRef, useEffect } from 'react';
import ListDetail from '@/app/(pages)/_list/ListDetail';
import useUIStore from '@/app/_stores/useUIStore';
import Tabs from './tab-nav/Tabs';
import TabContent from './tab-content/TabContent';

const ListPage: React.FC = () => {
  const { currentDetailData } = useUIStore();

  const pageRef = useRef<HTMLDivElement | null>(null);
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const showDetailClass = 'show-detail';

  useEffect(() => {
    if (pageRef.current) {
      const parentElement = pageRef.current?.parentElement as HTMLElement | null;

      if (parentElement) {
        const pageFrame = parentElement;

        if (currentDetailData) {
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
  }, [currentDetailData]);

  return (
    <>
      <div ref={pageRef} className="page-container">
        <Tabs tabControl={{ currentTabIndex, setCurrentTabIndex }} />
        <TabContent tabControl={{ currentTabIndex, setCurrentTabIndex }} />
      </div>
      <ListDetail imageData={currentDetailData} />
    </>
  );
};

export default ListPage;
