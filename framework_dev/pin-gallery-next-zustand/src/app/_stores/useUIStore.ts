import { create } from 'zustand';
import React from 'react';

interface UIState {
  isFirstView: boolean;
  setFirstView: () => void;
  TabPanelContainerRef: React.RefObject<HTMLDivElement> | null; // HTMLDivElement 참조를 저장
  // eslint-disable-next-line no-unused-vars
  setTabPanelContainerRef: (current: HTMLDivElement | null) => void; // 참조를 설정하는 함수
  currentDetailLink: string | null;
  setCurrentDetailLink: React.Dispatch<React.SetStateAction<string | null>>;
  resetGalleryPanel: () => void;
}

const useUIStore = create<UIState>((set) => {
  return {
    isFirstView: !(localStorage.getItem('endOnboard') && localStorage.getItem('endOnboard') === 'true'),
    setIsFirstView: () => {
      localStorage.setItem('endOnboard', 'true');
      const isFirstView = useUIStore.getState();
      set(!isFirstView);
    },
    TabPanelContainerRef: null,
    setTabPanelContainerRef: (ref: HTMLDivElement | null) => {
      set({ TabPanelContainerRef: ref });
    },
    currentDetailLink: null,
    setCurrentDetailLink: (link) => set({ currentDetailLink: link }),
    resetGalleryPanel: () => {
      const { TabPanelContainerRef, currentDetailLink, setCurrentDetailLink } = useUIStore.getState();
      if (TabPanelContainerRef) {
        TabPanelContainerRef.scrollTo(0, 0); // 필요 시 스크롤 리셋

        const firstChild = TabPanelContainerRef.children[0];
        if (firstChild instanceof HTMLElement) {
          firstChild.scrollTo(0, 0);
        }

        if (TabPanelContainerRef.querySelector('.is-removable')) {
          TabPanelContainerRef.querySelector('.is-removable').querySelector('.btn-del-sel').click();
        }

        if (currentDetailLink) setCurrentDetailLink(null);
      } else {
        console.log('tabPanelContainerRef가 설정되지 않았습니다.');
      }
    },
  };
});

export default useUIStore;
