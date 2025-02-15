import { create } from 'zustand';
import React, { useEffect } from 'react';
import { AlbumImage } from '@/app/_types/galleryType';

interface UIState {
  isFirstTimeUser: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsFirstTimeUser: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  TabPanelContainerRef: React.RefObject<HTMLDivElement> | null; // HTMLDivElement 참조를 저장
  // eslint-disable-next-line no-unused-vars
  setTabPanelContainerRef: (ref: HTMLDivElement | null) => void;
  currentDetailData: AlbumImage | null;
  setCurrentDetailData: React.Dispatch<React.SetStateAction<AlbumImage | null>>;
  resetGalleryPanel: () => void;
}

const useUIStore = create<UIState>((set) => {
  return {
    isFirstTimeUser: true, // 서버 렌더링 시 기본값 (클라이언트에서 초기화 예정)
    setIsFirstTimeUser: (value: boolean) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('isFirstTimeUser', value ? 'true' : 'false');
      }
      set({ isFirstTimeUser: value }); // `value`를 사용하여 상태 업데이트
    },
    TabPanelContainerRef: null,
    setTabPanelContainerRef: (ref) => {
      set({ TabPanelContainerRef: ref }); // `ref`를 사용하여 상태 업데이트
    },
    currentDetailData: null,
    setCurrentDetailData: (data) => {
      set({ currentDetailData: data });
    },
    resetGalleryPanel: () => {
      const { TabPanelContainerRef, currentDetailData, setCurrentDetailData } = useUIStore.getState();

      if (TabPanelContainerRef && TabPanelContainerRef.current) {
        TabPanelContainerRef.current.scrollTo(0, 0); // TabPanelContainerRef의 스크롤 리셋

        const firstChild = TabPanelContainerRef.current.children[0];
        if (firstChild instanceof HTMLElement) {
          firstChild.scrollTo(0, 0); // 첫 번째 자식 요소의 스크롤 리셋
        }

        // .is-removable 클래스가 있는 요소를 찾아서, 그 안에 있는 버튼 클릭
        const removableElement = TabPanelContainerRef.current.querySelector('.is-removable');
        if (removableElement) {
          const deleteButton = removableElement.querySelector('.btn-del-sel');
          if (deleteButton) {
            deleteButton.click(); // 버튼 클릭
          }
        }

        // currentDetailData가 있으면 null로 초기화
        if (currentDetailData) setCurrentDetailData(null);
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
    // 로컬 스토리지에서 값을 가져옴
    const firstView = localStorage.getItem('isFirstTimeUser');

    // 값이 없거나 'true'이면 첫 번째 사용자로 설정
    if (firstView === null || firstView === 'true') {
      setIsFirstUsed(true);
    }
    // 값이 'false'이면 두 번째 사용자로 설정
    else if (firstView === 'false') {
      setIsFirstUsed(false);
    }
  }, [setIsFirstUsed]); // 의존성에 상태 업데이트 함수 추가
};

export default useUIStore;
