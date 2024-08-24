import TabContentListWrapper from '@/app/_list/tab-content/TabContentListWrapper';
import TabContentListTitle from '@/app/_list/tab-content/TabContentListTitle';
import React from 'react';
import TabContentPanel from '@/app/_list/tab-content/TabContentPanel';

const TabContentFirstPanel: React.FC = () => {
  return (
    <TabContentPanel>
      <TabContentListWrapper>
        <TabContentListTitle title="전체 랜덤" />
        {/* <GalleryList>리스트 항목</GalleryList> */}
      </TabContentListWrapper>

      <TabContentListWrapper>
        <TabContentListTitle title="인기 카테고리" subTitle="서브타이틀" itemLength="10" />
        {/* <GalleryList>리스트 항목</GalleryList> */}
      </TabContentListWrapper>
    </TabContentPanel>
  );
};

export default TabContentFirstPanel;
