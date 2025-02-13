import { create } from 'zustand';
import React, { useEffect } from 'react';
import { AlbumImage } from '@/app/_types/galleryType';
interface UIState {
  isFirstTimeUser: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsFirstTimeUser: (value: boolean) => void;
  TabPanelContainerRef: React.RefObject<HTMLDivElement> | null; // HTMLDivElement 참조를 저장
  // eslint-disable-next-line no-unused-vars
  setTabPanelContainerRef: (current: HTMLDivElement | null) => void; // 참조를 설정하는 함수
  currentDetailData: AlbumImage;
  setCurrentDetailData: React.Dispatch<React.SetStateAction<object | null>>;
  resetGalleryPanel: () => void;
}

const useUIStore = create<UIState>((set) => {
  return {
    isFirstTimeUser: true, // 서버 렌더링 시 기본값 (클라이언트에서 초기화 예정)
    setIsFirstTimeUser: (value) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('isFirstTimeUser', value ? 'true' : 'false');
      }
      set({ isFirstTimeUser: value });
    },
    TabPanelContainerRef: null,
    setTabPanelContainerRef: (ref: HTMLDivElement | null) => {
      set({ TabPanelContainerRef: ref });
    },
    currentDetailData: null,
    setCurrentDetailData: (value) => set({ currentDetailData: value }),
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

// 클라이언트 측에서 상태 초기화
export const useInitializeUIStore = () => {
  const setIsFirstUsed = useUIStore((state) => state.setIsFirstTimeUser);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const firstView = window.localStorage.getItem('isFirstTimeUser');
      if (firstView === 'null' || firstView === null || firstView === 'true') {
        setIsFirstUsed(true);
      } else if (firstView === 'false') {
        setIsFirstUsed(false);
      }
    }
  }, []);
};

export default useUIStore;
