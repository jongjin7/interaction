import React, { useRef, useState } from 'react';
import TabContentListTitle from '@/app/(pages)/_list/tab-content/TabContentListTitle';
import TabContentListWrapper from '@/app/(pages)/_list/tab-content/TabContentListWrapper';
import { AlbumImage } from '@/app/_types/galleryType';
import ListToggleModeDeleteButton from './content-list/ListToggleModeDeleteButton';
import ListGallery from './content-list/ListGallery';

interface tabContentListProps {
  title: string;
  subTitle?: string;
  dataItem: AlbumImage[];
  useToggleDel?: boolean;
  url?: string;
  datetime?: number;
}

const TabContentList: React.FC<tabContentListProps> = ({ title, subTitle, dataItem, useToggleDel = false }) => {
  const [isToggleDel, setIsToggleDel] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const clickHandleToggleDeleteMode = () => {
    const currentPanel = listRef.current?.closest('.tab-panel');
    currentPanel?.classList.toggle('is-removable');
    setIsToggleDel(!isToggleDel);
  };

  return (
    <TabContentListWrapper>
      <div className="list-header" ref={listRef}>
        <TabContentListTitle title={title} subTitle={subTitle} itemLength={dataItem?.length} />
        {dataItem.length > 0 && useToggleDel && (
          <ListToggleModeDeleteButton isToggleDel={isToggleDel} clickHandleToggleMode={clickHandleToggleDeleteMode} />
        )}
      </div>
      <ListGallery data={dataItem} isToggleDel={isToggleDel} />
    </TabContentListWrapper>
  );
};

export default TabContentList;
