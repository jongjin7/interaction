'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';
import ListDetail from '@/app/_list/ListDetail';
import { ShowDetailContext } from '@/app/_data/ShowDetailProvider';
import Tabs from './tab-nav/Tabs';
import TabContent from './tab-content/TabContent';

const ListPage: React.FC = () => {
  const showDetailClass = 'show-detail';
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { showDetail } = useContext(ShowDetailContext);
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  useEffect(() => {
    if (pageRef.current) {
      const parentElement = pageRef.current?.parentElement as HTMLElement | null;

      if (parentElement) {
        const pageFrame = parentElement;

        if (showDetail) {
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
  }, [showDetail]);

  return (
    <>
      <div ref={pageRef} className="page-container">
        <Tabs tabControl={{ currentTabIndex, setCurrentTabIndex }} />
        <TabContent tabControl={{ currentTabIndex, setCurrentTabIndex }} />
      </div>
      <ListDetail imageSrc={showDetail} />
    </>
  );
};

export default ListPage;
