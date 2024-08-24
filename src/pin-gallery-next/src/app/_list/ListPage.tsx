'use client';

import React, { useState } from 'react';
import ListDetail from '@/app/_list/ListDetail';
import Tabs from './tab-nav/Tabs';
import TabContent from './tab-content/TabContent';

const ListPage: React.FC = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  return (
    <>
      <div className="page-container">
        <Tabs tabControl={{ currentTabIndex, setCurrentTabIndex }} />
        <TabContent tabControl={{ currentTabIndex, setCurrentTabIndex }} />
      </div>
      <ListDetail />
    </>
  );
};

export default ListPage;
