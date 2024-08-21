'use client';

import React from 'react';
import Tabs from './Tabs';
import TabContent from './TabContent';

const ListPage: React.FC = async () => {
  return (
    <>
      <Tabs />
      <TabContent />
    </>
  );
};

export default ListPage;
