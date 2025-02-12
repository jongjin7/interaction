'use client';

import React, { useEffect, useRef, useState } from 'react';
import TabContentPanel from '@/app/(pages)/_list/tab-content/TabContentPanel';
import TabContentList from '@/app/(pages)/_list/tab-content/TabContentList';
import TabContentFirstPanel from '@/app/(pages)/_list/tab-content/TabContentFirstPanel';
import useAlbumStore from '@/app/_stores/useAlbumStore';
import useUIStore from '@/app/_stores/useUIStore';

interface TabContentProps {
  tabControl: {
    currentTabIndex: number;
    setCurrentTabIndex: React.Dispatch<React.SetStateAction<number>>;
  };
}

const TabContent: React.FC<TabContentProps> = ({ tabControl }) => {
  const { categories, albumImages, isLoading, error } = useAlbumStore();
  const { setTabPanelContainerRef } = useUIStore();
  const { currentTabIndex, setCurrentTabIndex } = tabControl;
  const tabPanelContainerRef = useRef<HTMLDivElement | null>(null);
  const [tabPanelPositions, setTabPanelPositions] = useState<number[]>([]);
  const prevTabIndexRef = useRef(0);

  useEffect(() => {
    setTabPanelContainerRef(tabPanelContainerRef.current); // 컨테이너 요소 담기

    const updateTabPanelPositions = () => {
      const container = tabPanelContainerRef.current;
      if (container) {
        const positions = Array.from(container.children).map((child) => (child as HTMLElement).offsetLeft);
        setTabPanelPositions(positions);
      }
    };

    // 처음 로드될 때 한 번 실행
    updateTabPanelPositions();

    // 🔥 DOM 변경 감지해서 updateTabPanelPositions 실행
    const observer = new MutationObserver(updateTabPanelPositions);
    if (tabPanelContainerRef.current) {
      observer.observe(tabPanelContainerRef.current, { childList: true, subtree: true });
    }

    return () => observer.disconnect(); // 클린업

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', updateTabPanelPositions);

    // 클린업 함수: 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', updateTabPanelPositions);
    };
  }, [isLoading]);

  useEffect(() => {
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

    const container = tabPanelContainerRef.current as HTMLDivElement;
    container?.addEventListener('scroll', handleScrollTabPanelContainer);

    return () => {
      container?.removeEventListener('scroll', handleScrollTabPanelContainer);
    };
  }, [currentTabIndex, tabPanelPositions]);

  useEffect(() => {
    const container = tabPanelContainerRef.current;

    if (container && tabPanelPositions.length > 0) {
      container.scrollTo({
        left: tabPanelPositions[currentTabIndex] ?? 0,
        behavior: 'smooth',
      });
    }
  }, [currentTabIndex]);

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 처리
  }

  return (
    <div ref={tabPanelContainerRef} className="tab-contents">
      <TabContentFirstPanel />
      {albumImages.length > 0 &&
        albumImages.map((item, index) => {
          return (
            <TabContentPanel key={index} index={index + 1}>
              <TabContentList dataItem={item} title={categories[index].title} useToggleDel />
            </TabContentPanel>
          );
        })}
    </div>
  );
};

export default TabContent;
