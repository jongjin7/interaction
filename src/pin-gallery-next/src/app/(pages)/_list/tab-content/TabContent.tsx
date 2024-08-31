'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { AlbumContext } from '@/app/_providers/AlbumProvider';
import TabContentPanel from '@/app/(pages)/_list/tab-content/TabContentPanel';
import TabContentList from '@/app/(pages)/_list/tab-content/TabContentList';
import TabContentFirstPanel from '@/app/(pages)/_list/tab-content/TabContentFirstPanel';

interface TabContentProps {
  tabControl: {
    currentTabIndex: number;
    setCurrentTabIndex: React.Dispatch<React.SetStateAction<number>>;
  };
}

const TabContent: React.FC<TabContentProps> = ({ tabControl }) => {
  const { categories, albumImages, tabPanelContainerRef } = useContext(AlbumContext);
  const { currentTabIndex, setCurrentTabIndex } = tabControl;

  // const tabPanelContainerRef = useRef<HTMLDivElement>(null);
  const [tabPanelPositions, setTabPanelPositions] = useState<number[]>([]);
  const prevTabIndexRef = useRef(0);

  useEffect(() => {
    const updateTabPanelPositions = () => {
      const container = tabPanelContainerRef.current;
      if (container) {
        const positions = Array.from(container.children).map((child) => (child as HTMLElement).offsetLeft);
        setTabPanelPositions(positions);
      }
    };

    // 처음 로드될 때 한 번 실행
    updateTabPanelPositions();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', updateTabPanelPositions);

    // 클린업 함수: 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', updateTabPanelPositions);
    };
  }, []);

  useEffect(() => {
    console.log('handleScrollTabPanelContainer');
    const handleScrollTabPanelContainer = () => {
      let isScrolling;
      const endDelayTime = 60;

      if (isScrolling) clearTimeout(isScrolling);

      isScrolling = setTimeout(() => {
        prevTabIndexRef.current = currentTabIndex;

        tabPanelPositions.forEach((position, index) => {
          if (tabPanelContainerRef.current?.scrollLeft === position) {
            setCurrentTabIndex(index);
            const prevTabPanel = tabPanelContainerRef.current?.children[prevTabIndexRef.current] as HTMLElement;
            if (prevTabPanel) {
              prevTabPanel.scrollTo({ top: 0, left: 0 });
            }
          }
        });

        isScrolling = null;
      }, endDelayTime);
    };

    const container = tabPanelContainerRef.current;
    container?.addEventListener('scroll', handleScrollTabPanelContainer);

    return () => {
      container?.removeEventListener('scroll', handleScrollTabPanelContainer);
    };
  }, [tabPanelPositions]);

  useEffect(() => {
    console.log('currentTabIndex');
    const container = tabPanelContainerRef.current;

    if (container && tabPanelPositions.length > 0) {
      container.scrollTo({
        left: tabPanelPositions[currentTabIndex] ?? 0,
        behavior: 'smooth',
      });
    }
  }, [currentTabIndex]);

  return (
    <div ref={tabPanelContainerRef} className="tab-contents">
      <TabContentFirstPanel />
      {albumImages.map((item, index) => {
        return (
          <TabContentPanel key={index} index={index + 1}>
            <TabContentList dataItem={item.data} title={categories[index].title} useToggleDel />
          </TabContentPanel>
        );
      })}
    </div>
  );
};

export default TabContent;
