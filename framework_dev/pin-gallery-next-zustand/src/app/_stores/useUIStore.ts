import { create } from 'zustand';
import React from 'react';

interface UIState {
  TabPanelContainerRef: React.RefObject<HTMLDivElement> | null; // HTMLDivElement 참조를 저장
  setTabPanelContainerRef: (ref: HTMLDivElement | null) => void; // 참조를 설정하는 함수
  tabContainerPosition: number;
  setTabContainerPosition: (newPosition: number) => void;
  resetGalleryPanel: () => void;
}

const useUIStore = create<UIState>((set) => {
  return {
    TabPanelContainerRef: null,
    setTabPanelContainerRef: (ref) => {
      set({ TabPanelContainerRef: ref });
    },
    tabContainerPosition: 0,
    setTabContainerPosition: (newPosition: number) => set({ tabContainerPosition: newPosition }),
    resetGalleryPanel: () => {
      const { TabPanelContainerRef } = useUIStore.getState();
      if (TabPanelContainerRef) {
        TabPanelContainerRef.scrollTo(0, 0); // 필요 시 스크롤 리셋
        const firstChild = TabPanelContainerRef.children[0];
        if (firstChild instanceof HTMLElement) {
          firstChild.scrollTo(0, 0);
        }
        // tabNavContainerRef.current?.scrollTo(0, 0);
      } else {
        console.log('tabPanelContainerRef가 설정되지 않았습니다.');
      }
    },
  };
});

export default useUIStore;
