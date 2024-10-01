import React, { useEffect, useState } from 'react';
import TabContentPanel from '@/app/(pages)/_list/tab-content/TabContentPanel';
import TabContentList from '@/app/(pages)/_list/tab-content/TabContentList';
import useAlbumStore from '@/app/_stores/useAlbumStore';

const TabContentFirstPanel: React.FC = () => {
  const { randomImages, largestAlbum } = useAlbumStore();
  const mockAlbumImages = [
    { id: '0', name: '', title: '', description: '', link: '', datetime: 1 },
    { id: '1', name: '', title: '', description: '', link: '', datetime: 1 },
    { id: '2', name: '', title: '', description: '', link: '', datetime: 1 },
    { id: '3', name: '', title: '', description: '', link: '', datetime: 1 },
  ];
  const [randomImagesFirst, setRandomImagesFirst] = useState(mockAlbumImages);
  const [largestAlbumFirst, setLargestAlbumFirst] = useState({ data: mockAlbumImages, subTitle: '' });

  useEffect(() => {
    setRandomImagesFirst(randomImages);
    setLargestAlbumFirst(largestAlbum);
  }, [randomImages]);

  return (
    <TabContentPanel>
      <TabContentList title={'전체 랜덤'} dataItem={randomImagesFirst} />
      <TabContentList title={'인기 카테고리'} subTitle={largestAlbumFirst.subTitle} dataItem={largestAlbumFirst.data} />
    </TabContentPanel>
  );
};

export default TabContentFirstPanel;
