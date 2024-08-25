'use client';

import React, { useState, useContext } from 'react';
import ListDetail from '@/app/_list/ListDetail';
import { ShowDetailContext } from '@/app/_data/ShowDetailProvider';
import Tabs from './tab-nav/Tabs';
import TabContent from './tab-content/TabContent';

const ListPage: React.FC = () => {
  const { showDetail } = useContext(ShowDetailContext);
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  return (
    <>
      <div className="page-container">
        <Tabs tabControl={{ currentTabIndex, setCurrentTabIndex }} />
        <TabContent tabControl={{ currentTabIndex, setCurrentTabIndex }} setShowDetail />
      </div>
      {showDetail && <ListDetail imageSrc={showDetail} />}
    </>
  );
};

export default ListPage;
