import React, { useContext } from 'react';
import TabContentPanel from '@/app/_list/tab-content/TabContentPanel';
import TabContentList from '@/app/_list/tab-content/TabContentList';
import { AlbumContext } from '@/app/_data/CategoryProvider';

const TabContentFirstPanel: React.FC = () => {
  const { randomImages, largestAlbum } = useContext(AlbumContext);
  return (
    <TabContentPanel>
      <TabContentList title="전체 랜덤" dataItem={randomImages} />
      <TabContentList title="인기 카테고리" subTitle={largestAlbum.subTitle} dataItem={largestAlbum.data} />
    </TabContentPanel>
  );
};

export default TabContentFirstPanel;
