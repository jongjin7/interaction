import React from 'react';
import TabContentPanel from '@/app/(pages)/_list/tab-content/TabContentPanel';
import TabContentList from '@/app/(pages)/_list/tab-content/TabContentList';
import useAlbumStore from '@/app/_stores/useAlbumStore';

const TabContentFirstPanel: React.FC = () => {
  const { randomImages, largestAlbum } = useAlbumStore();

  return (
    <TabContentPanel>
      {randomImages.length > 0 && (
        <>
          <TabContentList title={'전체 랜덤'} dataItem={randomImages} />
          <TabContentList title={'인기 카테고리'} subTitle={largestAlbum.subTitle} dataItem={largestAlbum.data} />
        </>
      )}
    </TabContentPanel>
  );
};

export default TabContentFirstPanel;
