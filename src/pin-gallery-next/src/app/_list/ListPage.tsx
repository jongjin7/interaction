'use client';

import React from 'react';
import ListDetail from '@/app/_list/ListDetail';
import Tabs from './Tabs';
import TabContent from './TabContent';

const ListPage: React.FC = async () => {
  return (
    <>
      <div className="page-container">
        <Tabs />
        <TabContent />
      </div>
      <ListDetail />
    </>
  );
};

export default ListPage;
